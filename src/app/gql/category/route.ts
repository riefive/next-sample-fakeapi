import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';
import { CategorySchema, CategoryInsertSchema } from '@/types/category.type';

export async function GET() {
    const client = useApolloClient();
    try {
        const { data } = await client.query({
            query: gql`
                query {
                    categories {
                        id
                        name
                        image
                    }
                }
            `,
        });
        const result: CategorySchema | any = data.categories;
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
        const bodies: CategoryInsertSchema | any = await request.json();
        const { data } = await client.mutate({
            mutation: gql`
                mutation AddCategory($name: String!, $image: String!) {
                    addCategory(data: { name: $name, image: $image }) {
                        id
                        name
                        image
                    }
                }
            `,
            variables: { name: bodies.name, image: bodies.image },
        });
        const result: CategorySchema | any = data.addCategory;
        return Response.json({ ...result });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to post a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
