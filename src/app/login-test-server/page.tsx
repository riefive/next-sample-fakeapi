'use server';

import { headers, cookies } from 'next/headers';

export default async function AppLoginTest() {
    const headersList = headers();
    const urlHost = `http://${headersList.get('host')}`;
    const result = await fetch(`${urlHost}/api/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ email: 'john@mail.com', password: 'changeme' }),
    });
    if (result) {
        console.log(await result.json());
        console.log(result.headers.get('set-cookie'));
    }
    console.log(cookies().get('token'))
    return (
        <div>
            <h1>Login Test at Server</h1>
        </div>
    );
}
