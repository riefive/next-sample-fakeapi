import { ProductSchema, ProductInsertSchema } from '@/types/product.type';

const pathName = 'products';
const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    let urlNext = `${process.env.API_FAKE_REST}/${pathName}`;
    if (page && limit) {
        const newParams = new URLSearchParams();
        const offsetValue =
            Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0;
        newParams.append('offset', offsetValue.toString());
        newParams.append('limit', Number(limit).toString());
        urlNext = `${
            process.env.API_FAKE_REST
        }/${pathName}?${newParams.toString()}`;
    }
    try {
        const res = await fetch(`${urlNext}`, {
            headers: optionsHeaders,
        });
        const data: ProductSchema[] = await res.json();
        return Response.json({ data });
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
        const res = await fetch(`${process.env.API_FAKE_REST}/${pathName}`, {
            headers: optionsHeaders,
            method: 'POST',
            body: JSON.stringify({ ...bodies }),
        });
        const data: ProductSchema = await res.json();
        return Response.json(data);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to post a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
