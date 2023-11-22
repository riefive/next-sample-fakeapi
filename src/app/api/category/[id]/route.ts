import { CategorySchema, CategoryUpdateSchema } from '@/types/category.type';

const pathName = 'categories';
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
            `${process.env.API_FAKE_REST}/${pathName}/${id}`,
            {
                headers: optionsHeaders,
            }
        );
        const data: CategorySchema = await res.json();
        return Response.json(data);
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
        const res = await fetch(
            `${process.env.API_FAKE_REST}/${pathName}/${id}`,
            {
                headers: optionsHeaders,
                method: 'PUT',
                body: JSON.stringify({ ...bodies }),
            }
        );
        const data: CategorySchema = await res.json();
        return Response.json(data);
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
        const res = await fetch(
            `${process.env.API_FAKE_REST}/${pathName}/${id}`,
            {
                headers: optionsHeaders,
                method: 'DELETE',
            }
        );
        const data: any = await res.json();
        return Response.json(data);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to delete a data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
