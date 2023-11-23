import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';

export async function GET(request: Request) {
    const client = useApolloClient();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const emailValid =
        email &&
        typeof email === 'string' &&
        new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi).test(email);
    if (!email || !emailValid) {
        return Response.json(
            { message: 'Email is required!!!' },
            { status: 500 }
        );
    }
    try {
        const { data } = await client.query({
            query: gql`
                query {
                    isAvailable(email: ${JSON.stringify(email)})
                }
            `,
        });
        return Response.json({ ...data, email });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to get data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
