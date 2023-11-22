import { cookies } from 'next/headers';
import React from 'react';
import { Flex, Button } from 'antd';

export default function AppHome() {
    console.log(cookies().get('token'))
    const flexStyle: React.CSSProperties = {
        marginTop: '1em',
    };
    const buttonStyle: React.CSSProperties = {
        width: '120px',
    };
    return (
        <Flex justify='center' align='center' style={flexStyle}>
            <Button size='large' type='primary' style={buttonStyle}>
                Hello World
            </Button>
        </Flex>
    );
}
