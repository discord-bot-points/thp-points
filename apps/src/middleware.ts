// src/middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login'; // Rediriger vers la page de login si pas de token
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Continuer si l'utilisateur est authentifié
}

export const config = {
  matcher: ['/profile/:path*'], // Routes protégées
};
