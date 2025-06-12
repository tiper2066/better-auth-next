'use client'; //  추가
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { forgetPassword } from '@/lib/auth-client'; //  우리가 만든 auth-client 객체
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ForgotPasswordPage = () => {
    const params = useSearchParams(); // next.js useSearchParams() 사용 전달된 prams 저장
    const emailFromQuery = params.get('email') || ''; // params 에서 email 추출
    const [email, setEmail] = useState(emailFromQuery); // 추출된 이메일을 상태값에 저장
    const [message, setMessage] = useState(''); // 비번 업데이트 여부에 대한 메시지 상태 변수

    //  비번 재설정 페이지로 이동하는 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 추출된 email 이 맞다면.. 이것을 가지고 비번 재설정 페이지로 이동한다.
        const { error } = await forgetPassword({
            email,
            redirectTo: `${window.location.origin}/login/forgot-account/forgot-password/reset-password`, // 이 비번 재설정 페이지는 나중에 만들것임
        });

        // 에러 처리
        if (error) {
            setMessage('Something went wrong. Please try again.');
        } else {
            setMessage('Check your email for the reset link.');
        }
        setEmail(''); // 이메일 상태값 제거(초기화)
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='p-6 max-w-md mx-auto space-y-4 container'
        >
            <h1 className='text-xl font-bold'>Forgot Password?</h1>
            <Input
                type='email'
                required
                value={email}
                placeholder='Your email'
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border p-2'
            />
            <div className='grid grid-cols-3 gap-2'>
                <Button type='submit'>Send Reset Link</Button>
                <Button asChild variant={'outline'}>
                    <Link href='/login'>Sign In</Link>
                </Button>
            </div>
            {message && <p>{message}</p>}
        </form>
    );
};
export default ForgotPasswordPage;
