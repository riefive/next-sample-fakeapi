import { CategorySchema, CategoryInsertSchema } from '@/types/category.type';

const pathName = 'categories';
const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET() {
    try {
        const res = await fetch(`${process.env.API_FAKE_REST}/${pathName}`, {
            headers: optionsHeaders,
        });
        const data: CategorySchema[] = await res.json();
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
        const bodies: CategoryInsertSchema | any = await request.json();
        const res = await fetch(`${process.env.API_FAKE_REST}/${pathName}`, {
            headers: optionsHeaders,
            method: 'POST',
            body: JSON.stringify({
                name: bodies.name,
                image: bodies.image,
            }),
        });
        const data: CategorySchema = await res.json();
        return Response.json(data);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to post a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
