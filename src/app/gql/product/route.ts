import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';
import { ProductSchema, ProductInsertSchema } from '@/types/product.type';

const client = useApolloClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const filterTitle = searchParams.get('title');
    const filterPrice = searchParams.get('price');
    const filterPriceMin = searchParams.get('price_min');
    const filterPriceMax = searchParams.get('price_max');
    const filterCategory = searchParams.get('category');
    const fields = [];
    if (filterTitle) {
        fields.push(`title: ${JSON.stringify(filterTitle)}`);
    }
    if (filterPrice) {
        fields.push(`price: ${JSON.stringify(filterPrice)}`);
    } else if (filterPriceMin && filterPriceMax) {
        fields.push(`price_min: ${JSON.stringify(filterPriceMin)}`);
        fields.push(`price_max: ${JSON.stringify(filterPriceMax)}`);
    }
    if (filterCategory) {
        fields.push(`categoryId: ${JSON.stringify(filterCategory)}`);
    }
    if (page && limit) {
        const offsetValue =
            Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0;
        fields.push(`offset: ${JSON.stringify(offsetValue)}`);
        fields.push(`limit: ${JSON.stringify(Number(limit))}`);
    }
    const text = fields.length > 0 ? `(${fields.join(', ')})` : '';
    try {
        const { data } = await client.query({
            query: gql`
                query {
                    products ${text} {
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
        const result: ProductSchema | any = data.products;
        return Response.json({ data: result });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to get data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const bodies: ProductInsertSchema | any = await request.json();
        const fields = [];
        if (bodies && typeof bodies == 'object') {
            for (const key in bodies) {
                const element = bodies[key];
                fields.push(`${key}: ${JSON.stringify(element)}`);
            }
        }
        const { data } = await client.mutate({
            mutation: gql`
                mutation
                addProduct(
                    data: {
                        ${fields.join('\n')}
                    }
                ) {
                    title
                    price
                    images
                    category {
                        id
                        name
                        image
                    }
                }
            `,
        });
        const result: ProductInsertSchema | any = data.addProduct;
        return Response.json({ ...result });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to post a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
