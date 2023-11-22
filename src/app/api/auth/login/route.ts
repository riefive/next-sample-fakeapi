import cookie from 'cookie';
import { cookies } from 'next/headers';
import {
    AuthLoginRequestSchema,
    AuthLoginResponseSchema,
} from '@/types/auth.type';

const pathName = 'auth/login';
const optionsHeaders = {
    'Content-Type': 'application/json',
};
const optionsCookie: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 24 * 60 * 60 * 20, // 20 days
    sameSite: 'lax',
    path: '/',
};

export async function POST(request: Request) {
    const cookieStore = cookies();
    try {
        const bodies: AuthLoginRequestSchema | any = await request.json();
        const res = await fetch(`${process.env.API_FAKE_REST}/${pathName}`, {
            headers: optionsHeaders,
            method: 'POST',
            body: JSON.stringify({ ...bodies }),
        });
        const data: AuthLoginResponseSchema = await res.json();
        cookieStore.set('token', data.access_token);
        cookieStore.set('refresh', data.refresh_token);
        return new Response(JSON.stringify(data), {
            status: 200,
            // @ts-ignore
            headers: {
                'Set-Cookie': [
                    cookie.serialize(
                        'token',
                        data.access_token || '',
                        optionsCookie
                    ),
                    cookie.serialize('refresh', data.refresh_token || '', {
                        ...optionsCookie,
                        maxAge: 10 * 60 * 60, // 10 hours
                    }),
                ],
            },
        });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to login!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
