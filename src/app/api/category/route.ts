import { CategorySchema } from '@/types/category.type';

const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET(request: Request) {
    try {
        const res = await fetch(`${process.env.API_FAKE_REST}/categories`, {
            headers: optionsHeaders,
        });
        const data: CategorySchema[] = await res.json();
        return Response.json({ data });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to fetch!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
