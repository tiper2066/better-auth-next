import { PrismaClient } from '@/generated/prisma/client'; // PrismaClient 객체를 가져오고

const prisma = new PrismaClient(); // 새로운 PrismaClient 객체를 생성함

// prisma 객체를 글로벌 객체로 변경하고
const globalForPrisma = global as unknown as { prisma: typeof prisma };

// 만일 개발모드라면... prisma 객체를 글로벌 객체에 저장하여 재사용한다.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma; // db 객체에 prisma 객체를 할당하여 사용함
