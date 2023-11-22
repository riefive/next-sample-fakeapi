import { ProductSchema, ProductInsertSchema } from '@/types/product.type';

const pathName = 'products';
const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const newParams = new URLSearchParams();
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const filterTitle = searchParams.get('title');
    const filterPrice = searchParams.get('price');
    const filterPriceMin = searchParams.get('price_min');
    const filterPriceMax = searchParams.get('price_max');
    const filterCategory = searchParams.get('category');
    let urlNext = `${process.env.API_FAKE_REST}/${pathName}`;
    if (filterTitle) {
        newParams.append('title', filterTitle);
    }
    if (filterPrice) {
        newParams.append('price', filterPrice);
    } else if (filterPriceMin && filterPriceMax) {
        newParams.append('price_min', filterPriceMin);
        newParams.append('price_max', filterPriceMax);
    }
    if (filterCategory) {
        newParams.append('categoryId', filterCategory);
    }
    if (page && limit) {
        const offsetValue =
            Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0;
        newParams.append('offset', offsetValue.toString());
        newParams.append('limit', Number(limit).toString());
    }
    if (newParams.size > 0) {
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
