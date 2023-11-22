'use client';

import { useEffect } from 'react';
import { useCookies } from 'next-client-cookies';

async function doLogin(token: string) {
    if (token) {
        return null;
    }
    const result = await fetch(`/api/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({ email: 'john@mail.com', password: 'changeme' }),
    });
    if (result) {
        console.log(await result.json());
    }
    return result;
}

export default function AppLoginTest() {
    const cookies = useCookies();
    const token: string | any = cookies.get('token');
    console.log(cookies.get('version'));

    useEffect(() => {
        doLogin(token);
    }, []);

    return (
        <div>
            <h1>Login Test Client</h1>
        </div>
    );
}
