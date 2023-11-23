import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';
import { ProductSchema, ProductUpdateSchema } from '@/types/product.type';

const client = useApolloClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id || (typeof id === 'string' && isNaN(Number(id)))) {
        return Response.json({ message: 'Id is required!!!' }, { status: 500 });
    }
    try {
        const { data } = await client.query({
            query: gql`
                query {
                    product(id: ${id}) {
                        id
                        title
                        price
                        description
                        images
                        category {
                            id
                            name
                            image
                        }
                    }
                }
            `,
        });
        return Response.json({ ...data.product });
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
        const bodies: ProductUpdateSchema | any = await request.json();
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
                    updateProduct(
                        id: ${id}, 
                        changes: { 
                            ${fields.join(',')}
                        }
                    ) {
                        id
                        title
                        price
                        description
                        images
                        category {
                            id
                            name
                            image
                        }
                    }
                }
           `,
        });
        const result: ProductSchema | any = data.updateProduct;
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
        const { data } = await client.mutate({
            mutation: gql`
                mutation {
                    deleteProduct(id: ${id})
                }
           `,
        });
        const result: any = data.deleteProduct;
        return Response.json(result);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to delete a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
