import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from './prisma';

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: 'sqlite', // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8, // 최소 자리수
        maxPasswordLength: 128, // 최대 자리수
        autoSignIn: true, // 자동 로그인 여부
    },
    accounts: {
        accountLinking: {
            enabled: true, // 계정 연결 활성화, 이메일/비번으로 계정생성 후 구글계정로그인하면 동일사용자에게 링크 연결됨
        },
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});
