import { PrismaClient } from '@prisma/client';
import CircleError from '../utils/CircleError';

export const prisma = new PrismaClient();

export async function initPrisma() {
    try {
        await prisma.$connect();
        console.log('Prisma connected successfully.');
    } catch (err) {
        throw new CircleError({ error: `Prisma client connection error: ${err}` });
    }
}
