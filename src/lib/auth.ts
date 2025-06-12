import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from './prisma';
import { nextCookies } from 'better-auth/next-js'; //  nextCookies 가져옴
import { sendEmail } from './email'; // ************************* 이메일 전송 로직 함수 가져옴

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: 'sqlite', // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8, // 최소 자리수
        maxPasswordLength: 128, // 최대 자리수
        autoSignIn: true, // 자동 로그인 여부
        // ************************************************** 비번 재설정 이메일 전송 기능 추가
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: 'Reset your password',
                text: `Click the link to reset your password: ${url}`,
            });
        },
        resetPasswordTokenExpiresIn: 3600, // 비번 재설정 토큰 만료시간 설정 , 1시간 = 3600
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
    plugins: [nextCookies()], //  미들웨어 사용을 위한 플러그인 추가
});
