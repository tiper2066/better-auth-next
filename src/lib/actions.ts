'use server';

import { auth } from './auth';
import { APIError } from 'better-auth/api'; //  주석 제거
import { redirect } from 'next/navigation';
// import { prisma } from './prisma';

//  State 변수 타입 선언
interface State {
    errorMessage?: string | null;
}

// FormData 로 사용자가 입력한 폼 요소 값들을 가져온다.
export async function signUp(prevState: State, formData: FormData) {
    // console.log('RawFormData', formData);

    // 폼 요소의 name 속성 값을 객체로 가져옴
    const rawFormData = {
        email: formData.get('email') as string, // input 타입이 text 가 아니라서
        password: formData.get('pwd') as string,
        firstName: formData.get('firstname'),
        lastName: formData.get('lastname'),
    };

    const { email, password, firstName, lastName } = rawFormData; // 폼에서 가져온 값 추출

    try {
        await auth.api.signUpEmail({
            body: {
                name: `${firstName} ${lastName}`,
                email,
                password,
            },
        });
    } catch (error) {
        //  API 에서 제공하는 오류 처리
        if (error instanceof APIError) {
            switch (error.status) {
                case 'UNPROCESSABLE_ENTITY': // 처리할 수 없는 오류
                    return { errorMessage: 'User already exists.' };
                case 'BAD_REQUEST': // 존재하는 오류
                    return { errorMessage: 'Invalid email.' };
                default: // 콘솔 오류
                    return { errorMessage: 'Something went wrong.' };
            }
        }
        // 커스텀 오류 처리
        console.error('sign up with email and password has not worked', error);
    }
    redirect('/dashboard'); // 회원가입에 문제없이 성공했다면 대시보드 페이지로 이동
}

// LoginForm 으로 입력한 폼 요소 값들을 가져온다.
export async function signIn(prevState: State, formData: FormData) {
    const rawFormData = {
        email: formData.get('email') as string,
        password: formData.get('pwd') as string,
    };

    const { email, password } = rawFormData;

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });
    } catch (error) {
        //  API 에서 제공하는 오류 처리 (주석제거)
        if (error instanceof APIError) {
            switch (error.status) {
                case 'UNAUTHORIZED': // 승인되지 않은 오류
                    return { errorMessage: 'User Not Found.' };
                case 'BAD_REQUEST': // 존재하는 오류
                    return { errorMessage: 'Invalid email.' };
                default: // 콘솔 오류
                    return { errorMessage: 'Something went wrong.' };
            }
        }
        // 커스텀 오류 처리
        console.error('sign in with email has not worked', error);
        // throw error;
    }
    redirect('/dashboard'); // 로그인에 문제없이 성공했다면 대시보드 페이지로 이동
}
/*
export async function searchAccount(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    return !!user;
}
*/
