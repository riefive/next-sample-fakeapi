import { cookies } from 'next/headers';
import { UserSchema } from '@/types/user.type';

const pathName = 'auth/profile';
const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return Response.json(
            { message: 'Forbidden Access!!!' },
            { status: 403 }
        );
    }
    try {
        const res = await fetch(`${process.env.API_FAKE_REST}/${pathName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...optionsHeaders,
            },
        });
        const data: UserSchema = await res.json();
        return Response.json(data);
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to get profile!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
