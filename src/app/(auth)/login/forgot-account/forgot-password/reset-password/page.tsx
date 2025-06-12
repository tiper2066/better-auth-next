'use client'; //  추가
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter } from 'next/navigation'; //  next.js useRouter() 추가
import { resetPassword } from '@/lib/auth-client'; //  auth-client 객체에서 resetPassword 함수 가져옴

const ResetPasswordPage = () => {
    const router = useRouter(); //  router 객체 생성
    const searchParams = useSearchParams(); // params 찾는 객체 생성
    const [password, setPassword] = useState(''); // 비번값 상태 변수
    const [message, setMessage] = useState(''); // 오류메시지 출력 상태변수
    const token = searchParams.get('token'); // params에서 token 찾아서 추출

    // token 이 없다면... login 페이지로 이동하는 함수
    useEffect(() => {
        if (!token) {
            setMessage('Invalid or missing token'); // 토큰이 없거나 유효하지 않음 메시지 출력
        }
    }, [token]);

    //  서밋 버튼 클릭 시 토큰을 갖고 있다면 비밀번호를 재설정한다.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return; // 토큰이 없다면 실행 중단함
        // 토큰이 있다면. 비번재설정하고 에러 발생시 메시지 저장
        const { error } = await resetPassword({
            token,
            newPassword: password,
        });
        // 에러 처리
        if (error) {
            setMessage('Failed to reset password.');
        }
        // 비번 재설정 후에 에러가 없다면 재설정 성공 메시지 출력 후 /login 페이지로 이동
        else {
            setMessage('Password reset! You can now sign in.');
            setTimeout(() => router.push('/login'), 3000);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='p-6 max-w-md mx-auto space-y-4 container'
        >
            <h1 className='text-xl font-bold'>Reset Password</h1>
            {message && <p>{message}</p>}
            <Input
                type='password'
                placeholder='New password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border p-2'
            />
            <Button type='submit'>Reset Password</Button>
        </form>
    );
};
export default ResetPasswordPage;
