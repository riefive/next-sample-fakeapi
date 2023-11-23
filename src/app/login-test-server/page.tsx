'use server';

import cookie from 'cookie';
import { cookies, headers } from 'next/headers';
import { Flex, Skeleton } from 'antd';

async function doLogin(urlHost: string, token: string) {
    if (token) {
        return null;
    }
    const result = await fetch(`${urlHost}/api/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
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
        headers: headers(),
    });
    if (result) {
        console.log(await result.json());
    }
    return result;
}

export default async function AppLoginTestServer() {
    const headersList = headers();
    const protocol = headersList.get('x-forwarded-proto') ?? 'http';
    const urlHost = `${protocol}://${headersList.get('host')}`;
    const token: string | any = cookies().get('token');
    await doLogin(urlHost, token);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await doProfile(urlHost);

    const flexStyle: React.CSSProperties = {
        marginTop: '1em',
        padding: '1em',
    };

    return (
        <Flex
            vertical
            justify='center'
            align='center'
            gap='large'
            style={flexStyle}
        >
            <h1>Login Test at Server</h1>
            {Array(3)
                .fill(0)
                .map((_item, i) => {
                    return <Skeleton key={i}></Skeleton>;
                })}
        </Flex>
    );
}
