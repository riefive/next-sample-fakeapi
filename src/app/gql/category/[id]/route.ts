import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';
import { CategorySchema, CategoryUpdateSchema } from '@/types/category.type';

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

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id || (typeof id === 'string' && isNaN(Number(id)))) {
        return Response.json({ message: 'Id is required!!!' }, { status: 500 });
    }
    try {
        const bodies: CategoryUpdateSchema | any = await request.json();
        const client = useApolloClient();
        const fields = [];
        if (bodies && typeof bodies == 'object') {
            for (const key in bodies) {
                const element = bodies[key];
                fields.push(`${key}: ${JSON.stringify(element)}`);
            }
        }
        const { data } = await client.mutate({
            mutation: gql`
                mutation {
                    updateCategory(
                        id: ${id}, 
                        changes: { 
                            ${fields.join(',')}
                        }
                    ) {
                        id
                        name
                        image
                    }
                }
           `,
        });
        const result: CategorySchema | any = data.updateCategory;
        return Response.json({ ...result });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to change a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id || (typeof id === 'string' && isNaN(Number(id)))) {
        return Response.json({ message: 'Id is required!!!' }, { status: 500 });
    }
    try {
        const client = useApolloClient();
        const { data } = await client.mutate({
            mutation: gql`
                mutation {
                    deleteCategory(id: ${id})
                }
           `,
        });
        const result: any = data.deleteCategory;
        return Response.json(result);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to delete a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
