import { auth } from '@/lib/auth'; // 인증 방법 및 설정 파일 가져옴
import { toNextJsHandler } from 'better-auth/next-js';

export const { POST, GET } = toNextJsHandler(auth);
