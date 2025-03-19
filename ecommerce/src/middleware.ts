import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

const protectedRoutes: string[] = [];
const protectedLoggedRoutes = ['/auth/login', '/auth/register']

export async function middleware(req: NextRequest) {
    const authToken = await getCookie('Authentication', { cookies });
    console.log(authToken)

    if (protectedRoutes.includes(req.nextUrl.pathname) && !authToken) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    } else if (authToken && protectedLoggedRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Configurar en qué rutas debe ejecutarse el middleware
export const config = {
    matcher: ['/shop', '/auth/login', '/auth/register'], // Rutas protegidas
};