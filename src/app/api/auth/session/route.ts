import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    if (refreshToken) {
      // Set the refresh token as an HttpOnly cookie
      // This ensures it is not accessible via client-side JS.
      response.cookies.set({
        name: 'refreshToken',
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days (604800 seconds)
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  );

  // Clear the refresh token cookie
  response.cookies.delete('refreshToken');
  
  return response;
}
