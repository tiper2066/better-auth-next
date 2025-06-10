'use client'; // ********************************************* client 컴포넌트 선언
import { OctagonAlert, School } from 'lucide-react'; // ******************************************** OctagonAlert 아이콘
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signUp } from '@/lib/actions'; //  server action 가져옴
import { useActionState, useEffect } from 'react'; // ******************************************** useEffect
import { toast } from 'sonner'; // ******************************************** sonner

const SignUpForm = () => {
    const initialState = { errorMessage: '' }; //  에러 메시지 객체
    const [state, formAction, pending] = useActionState(signUp, initialState); //  useActionState 활용

    // ******************************************** 에러 메시지 출력 로직
    useEffect(() => {
        if (state.errorMessage.length) {
            // toast.error(state.errorMessage); // 토스트로 메시지 출력
            toast.error('에러 발생', {
                description: state.errorMessage,
                duration: 3000,
                position: 'top-right',
                icon: <OctagonAlert />,
            });
        }
    }, [state.errorMessage]); // 종속배열 errorMessage

    return (
        <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent'>
            <form
                action={formAction} //  useActionState 의 signUp action 이 할당된 formAction 적용
                className='bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]'
            >
                <div className='p-8 pb-6'>
                    <div>
                        <Link href='/' aria-label='go home'>
                            <School size={32} />
                        </Link>
                        <h1 className='text-title mb-1 mt-4 text-xl font-semibold'>
                            Sign Up to Better-Auth Starter Example.
                        </h1>
                        <p className='text-sm'>
                            Welcome! Create an account to get started
                        </p>
                    </div>

                    <div className='mt-6 grid grid-cols-2 gap-3'>
                        <Button type='button' variant='outline'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='0.98em'
                                height='1em'
                                viewBox='0 0 256 262'
                            >
                                <path
                                    fill='#4285f4'
                                    d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
                                ></path>
                                <path
                                    fill='#34a853'
                                    d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
                                ></path>
                                <path
                                    fill='#fbbc05'
                                    d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'
                                ></path>
                                <path
                                    fill='#eb4335'
                                    d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
                                ></path>
                            </svg>
                            <span>Google</span>
                        </Button>
                        <Button type='button' variant='outline'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='1em'
                                height='1em'
                                viewBox='0 0 16 16'
                                fill='currentColor'
                                className='bi bi-github'
                            >
                                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8' />
                            </svg>
                            <span>GitHub</span>
                        </Button>
                    </div>

                    <hr className='my-4 border-dashed' />

                    <div className='space-y-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='space-y-2'>
                                <Label
                                    htmlFor='firstname'
                                    className='block text-sm'
                                >
                                    Firstname
                                </Label>
                                <Input
                                    type='text'
                                    required
                                    name='firstname'
                                    id='firstname'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label
                                    htmlFor='lastname'
                                    className='block text-sm'
                                >
                                    Lastname
                                </Label>
                                <Input
                                    type='text'
                                    required
                                    name='lastname'
                                    id='lastname'
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='email' className='block text-sm'>
                                Email
                            </Label>
                            <Input
                                type='email'
                                required
                                name='email'
                                id='email'
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='pwd' className='text-title text-sm'>
                                Password
                            </Label>
                            <Input
                                type='password'
                                required
                                name='pwd'
                                id='pwd'
                                className='input sz-md variant-mixed'
                            />
                        </div>
                        {/*  disabled 에 pending 할당  */}
                        <Button
                            className='w-full'
                            disabled={pending}
                            aria-disabled={pending}
                        >
                            Continue
                        </Button>
                    </div>
                </div>

                <div className='bg-muted rounded-(--radius) border p-3'>
                    <p className='text-accent-foreground text-center text-sm'>
                        Have an account ?
                        <Button asChild variant='link' className='px-2'>
                            <Link href='/login'>Sign In</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    );
};
export default SignUpForm;
