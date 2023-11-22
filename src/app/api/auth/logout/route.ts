import cookie from 'cookie';
import { cookies } from 'next/headers';

const optionsCookie: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    sameSite: 'lax',
    path: '/',
};

export async function POST() {
    const cookieStore = cookies();
    cookieStore.delete('token');
    cookieStore.delete('refresh');
    return new Response(JSON.stringify({ message: 'logout success!!' }), {
        status: 200,
        // @ts-ignore
        headers: {
            'Set-Cookie': [
                cookie.serialize('token', '', optionsCookie),
                cookie.serialize('refresh', '', optionsCookie),
            ],
        },
    });
}
