import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';
import { Inter } from 'next/font/google';
import { Flex, Anchor } from 'antd';
import ComponentsStyledRegistry from '@/systems/components.styled.antd';

const inter = Inter({ subsets: ['latin'] });

const flexStyle: React.CSSProperties = {
    marginTop: '1em',
    padding: '1em',
};

export const metadata: Metadata = {
    title: 'Route Group',
    description: 'Testing route group',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <CookiesProvider>
                    <ComponentsStyledRegistry>
                        <Flex
                            justify='start'
                            align='center'
                            gap='small'
                            style={flexStyle}
                        >
                            <Anchor
                                direction='horizontal'
                                items={[
                                    {
                                        key: 'test-client',
                                        href: '/login-test-client',
                                        title: 'Test Client',
                                    },
                                    {
                                        key: 'test-server',
                                        href: '/login-test-server',
                                        title: 'Test Server',
                                    },
                                ]}
                            />
                        </Flex>
                        <Flex
                            vertical
                            justify='center'
                            align='center'
                            gap='large'
                            style={flexStyle}
                        >
                            {children}
                        </Flex>
                    </ComponentsStyledRegistry>
                </CookiesProvider>
            </body>
        </html>
    );
}
