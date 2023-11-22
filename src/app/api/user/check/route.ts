const pathName = 'users';
const optionsHeaders = {
    'Content-Type': 'application/json',
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const emailValid = email && typeof email === 'string' && new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig).test(email)
    if (!email || !emailValid) {
        return Response.json({ message: 'Email is required!!!' }, { status: 500 });
    }
    try {
        const res = await fetch(`${process.env.API_FAKE_REST}/${pathName}/is-available`, {
            headers: optionsHeaders,
            method: 'POST',
            body: JSON.stringify({ email }),
        });
        const data: any = await res.json();
        return Response.json({ ...data, email });
    } catch (error: any) {
        return Response.json(
            { message: 'Failed to get data!!!', error: error.toString() },
            { status: 500 }
        );
    }
}
