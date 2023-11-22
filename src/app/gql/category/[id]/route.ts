import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id || (typeof id === 'string' && isNaN(Number(id)))) {
        return Response.json({ message: 'Id is required!!!' }, { status: 500 });
    }
    try {
        const client = useApolloClient();
        const { data } = await client.query({
            query: gql`
                query {
                    category(id: ${id}) {
                        id
                        name
                        image
                    }
                }
            `,
        });
        return Response.json({ ...data.category });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to get a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
