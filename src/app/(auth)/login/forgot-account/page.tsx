'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { searchAccount } from '@/lib/actions'; // **************************** 추가
import { useRouter } from 'next/navigation';

const ForgotAccountPage = () => {
    const router = useRouter(); // **************************** 추가
    const [email, setEmail] = useState('');
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const found = await searchAccount(email); // **************************** 추가, 이메일을 찾아서 저장
        // 이메일이 있다면...
        if (found) {
            // forgot-account 페이지 아래 이메일을 복호화해서 비번 찾는 페이지로 전달한다.
            router.push(
                `/login/forgot-account/forgot-password?email=${encodeURIComponent(
                    email
                )}`
            );
        }
        // 회원 정보가 없다면... 회원가입페이지로 이동함
        else {
            router.push('/sign-up');
        }
    };
    return (
        <form
            onSubmit={handleSearch}
            className='p-6 max-w-md mx-auto space-y-4 container'
        >
            <h1 className='text-xl font-semibold'>Find Your Account</h1>
            <Input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full p-2 border rounded'
            />
            <Button type='submit'>Search</Button>
        </form>
    );
};
export default ForgotAccountPage;
