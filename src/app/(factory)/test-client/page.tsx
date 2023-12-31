'use client';

import { useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import { Skeleton } from 'antd';

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

    useEffect(() => {
        doLogin(token);
    }, [token]);

    return (
        <>
            <h1>Login Test Client</h1>
            {Array(3)
                .fill(0)
                .map((_item, i) => {
                    return <Skeleton key={i}></Skeleton>;
                })}
        </>
    );
}
