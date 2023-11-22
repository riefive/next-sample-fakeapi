import { CategorySchema } from '@/types/category.type';

const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id) {
        return Response.json({ message: 'Id is required!!!' }, { status: 500 });
    }
    try {
        const res = await fetch(
            `${process.env.API_FAKE_REST}/categories/${id}`,
            {
                headers: optionsHeaders,
            }
        );
        const data: CategorySchema = await res.json();
        return Response.json(data);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to fetch!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
