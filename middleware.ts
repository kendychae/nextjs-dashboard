import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Temporarily disable middleware for assignment submission
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: [],
};