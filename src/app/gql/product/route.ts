import { gql } from '@apollo/client';
import useApolloClient from '@/systems/utils/apollo.client';
import { ProductSchema, ProductInsertSchema } from '@/types/product.type';

export async function GET(request: Request) {
    const client = useApolloClient();
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
        fields.push(`price: ${filterPrice}`);
    } else if (filterPriceMin && filterPriceMax) {
        fields.push(`price_min: ${filterPriceMin}`);
        fields.push(`price_max: ${filterPriceMax}`);
    }
    if (filterCategory) {
        fields.push(`categoryId: ${JSON.stringify(filterCategory)}`);
    }
    if (page && limit) {
        const offsetValue =
            Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0;
        fields.push(`offset: ${offsetValue}`);
        fields.push(`limit: ${Number(limit)}`);
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
    const client = useApolloClient();
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
