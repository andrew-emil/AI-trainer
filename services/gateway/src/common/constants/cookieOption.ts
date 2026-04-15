import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
};

export const accessTokenCookieOptions: CookieOptions = {
    ...cookieOptions,
    maxAge: 60 * 60 * 1000, // 1 hour
};

export const refreshTokenCookieOptions: CookieOptions = {
    ...cookieOptions,
    maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
};