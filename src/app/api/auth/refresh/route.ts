import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh-token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token found in session' }, { status: 401 });
  }

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';
    
    // Forward the refresh token as a proper cookie to the Spring backend
    // The backend reads it via httpServletRequest.getCookies()
    const externalResponse = await fetch(`${apiBase}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh-token=${refreshToken}`,
      },
    });

    if (!externalResponse.ok) {
      const errorData = await externalResponse.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || 'Token refresh rejected by backend' }, 
        { status: externalResponse.status }
      );
    }

    const data = await externalResponse.json();

    const response = NextResponse.json(data, { status: 200 });

    // The backend returns a new refresh token via Set-Cookie header,
    // but since this is server-to-server, we need to manually extract and re-set it.
    // Also check if the response body contains a new refresh token.
    const newRefreshToken = data.data?.refreshToken;

    if (newRefreshToken) {
      response.cookies.set({
        name: 'refresh-token',
        value: newRefreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error) {
    console.error('Refresh API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error refreshing token' }, { status: 500 });
  }
}
