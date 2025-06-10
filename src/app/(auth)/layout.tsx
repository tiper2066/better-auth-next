import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='p-5 bg-zinc-50 '>
            <Button className='fixed top-5' variant='outline' asChild>
                <Link href='/'>
                    <ArrowLeft size={16} /> Back
                </Link>
            </Button>
            {children}
        </div>
    );
};
export default AuthLayout;
