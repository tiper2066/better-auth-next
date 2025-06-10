import { NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import type { auth } from '@/lib/auth';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>(
        '/api/auth/get-session',
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get('cookie') || '', // Forward the cookies from the request
            },
        }
    );

    // ************************** 세션이 없어서 로그인 페이지로 리다이렉션함
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'], // *********************** 보안되어야 할 페이지를 설정(세션 체크할 페이지)
};
