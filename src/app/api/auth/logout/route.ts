import cookie from 'cookie';

const optionsCookie: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    sameSite: 'strict',
    path: '/',
};

export async function POST() {
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
