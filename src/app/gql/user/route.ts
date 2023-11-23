import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';
import { UserSchema, UserInsertSchema } from '@/types/user.type';

export async function GET() {
    const client = useApolloClient();
    try {
        const { data } = await client.query({
            query: gql`
                query {
                    users {
                        id
                        name
                        email
                        role
                    }
                }
            `,
        });
        const result: UserSchema | any = data.users;
        return Response.json({ data: result });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to get data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const client = useApolloClient();
    try {
        const bodies: UserInsertSchema | any = await request.json();
        const { data } = await client.mutate({
            mutation: gql`
                mutation AddUser(
                    $name: String!
                    $email: String!
                    $password: String!
                    $avatar: String!
                ) {
                    addUser(
                        data: {
                            name: $name
                            email: $email
                            password: $password
                            avatar: $avatar
                        }
                    ) {
                        id
                        name
                        email
                        avatar
                    }
                }
            `,
            variables: { ...bodies },
        });
        const result: UserSchema | any = data.addCategory;
        return Response.json({ ...result });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to post a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
