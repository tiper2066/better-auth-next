import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth'; //  auth
import { headers } from 'next/headers'; //  headers 세션에서

//  세션 처리를 위해서 비동기함수로 전환
export default async function Page() {
    // header 에서 세션을 가져옴
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    // 현재 세션이 없고 로그아웃 상태면 다른 요소 표시
    if (!session) {
        return <div>Not authenticated</div>;
    }

    const user = session.user; // ********************** 현재 세션을 갖는 사용자 정보 가져오기

    return (
        <SidebarProvider>
            {/* ************************** 사이드바에 현재 사용자의 세션 정보 전달  */}
            <AppSidebar user={user} />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator
                            orientation='vertical'
                            className='mr-2 data-[orientation=vertical]:h-4'
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className='hidden md:block'>
                                    <BreadcrumbLink href='#'>
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                        <div className='bg-muted/50 aspect-video rounded-xl' />
                        <div className='bg-muted/50 aspect-video rounded-xl' />
                        <div className='bg-muted/50 aspect-video rounded-xl' />
                    </div>
                    <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
