import { signOut } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
    const router = useRouter();
    const handleClick = async () => {
        // Better-Auth에서 제공하는 AuthClient 객체의 signOut 함수 추출
        await signOut({
            // fetch 수행 후 로그아웃 성공 시 로직 구현
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login'); // 로그인 페이지로 이동
                },
            },
        });
    };

    return (
        <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={handleClick}
        >
            <LogOut /> Log out
        </div>
    );
};
export default SignOutButton;
