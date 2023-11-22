import { CategorySchema } from '@/types/category.type';

const pathName = 'categories';
const pathNameChild = 'products';
const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id || (typeof id === 'string' && isNaN(Number(id)))) {
        return Response.json({ message: 'Id is required!!!' }, { status: 500 });
    }
    try {
        const res = await fetch(
            `${process.env.API_FAKE_REST}/${pathName}/${id}/${pathNameChild}`,
            {
                headers: optionsHeaders,
            }
        );
        const data: CategorySchema[] = await res.json();
        return Response.json({ data });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to get data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
