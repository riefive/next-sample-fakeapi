import { AuthLoginRequestSchema, AuthLoginResponseSchema } from '@/types/auth.type'

const pathName = 'auth/login';
const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function POST(request: Request) {
    try {
        const bodies: AuthLoginRequestSchema | any = await request.json();
        const res = await fetch(`${process.env.API_FAKE_REST}/${pathName}`, {
            headers: optionsHeaders,
            method: 'POST',
            body: JSON.stringify({ ...bodies }),
        });
        const data: AuthLoginResponseSchema = await res.json();
        return Response.json(data);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to login!!!', error: error.toString() },
            { status: 500 }
        );
    }
}