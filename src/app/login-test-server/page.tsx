'use server';

import cookie from 'cookie';
import { cookies, headers } from 'next/headers';

async function doLogin(urlHost: string, token: string) {
    if (token) {
        return null;
    }
    const result = await fetch(`${urlHost}/api/auth/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: 'john@mail.com', password: 'changeme' }),
    });
    if (result) {
        console.log(result.headers.get('set-cookie'));
        console.log(await result.json());
    }
    return result;
}

async function doProfile(urlHost: string) {
    const result = await fetch(`${urlHost}/api/auth/profile`, {
        headers: headers()
    });
    if (result) {
        console.log(await result.json());
    }
    return result;
}

export default async function AppLoginTestServer() {
    const headersList = headers();
    const urlHost = `http://${headersList.get('host')}`;
    const token: string | any = cookies().get('token');
    await doLogin(urlHost, token);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await doProfile(urlHost);
    return (
        <div>
            <h1>Login Test at Server</h1>
        </div>
    );
}
