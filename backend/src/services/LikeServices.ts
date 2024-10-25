import { Prisma, PrismaClient } from '@prisma/client';
import { LikeType } from '../types/types';
import LikeDto from '../dtos/LikeDto';
import ServiceResponseDto from '../dtos/ServiceResponseDto';
import prismaErrorHandler from '../utils/PrismaError';

const prisma = new PrismaClient();

class LikeServices {
    async likeMechanism(likeDto: LikeDto): Promise<ServiceResponseDto<LikeType>> {
        try {
            // Cek apakah vibe sudah di-like oleh user tersebut
            const isLiked: LikeType = await this.isLiked(likeDto);

            if (isLiked) {
                // Jika sudah di-like, maka hapus like (unlike)
                const removedLike: LikeType = await this.removeLike(isLiked);
                delete removedLike.createdAt;
                delete removedLike.updatedAt;

                return new ServiceResponseDto<LikeType>({
                    error: false,
                    payload: removedLike,
                });
            }

            // Jika belum di-like, tambahkan like
            const addedLike: LikeType = await this.addLike(likeDto);
            delete addedLike.createdAt;
            delete addedLike.updatedAt;

            return new ServiceResponseDto<LikeType>({
                error: false,
                payload: addedLike,
            });
        } catch (error) {
            // Handle Prisma error secara khusus jika terjadi
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDto({
                    error: true,
                    payload: prismaErrorHandler(error),
                });
            }
            return new ServiceResponseDto({
                error: true,
                payload: error,
            });
        }
    }

    // Method untuk mengecek apakah user sudah me-like suatu vibe
    private async isLiked(likeDto: LikeDto): Promise<LikeType | null> {
        return await prisma.like.findFirst({
            where: {
                AND: [{ authorId: likeDto.authorId }, { targetId: likeDto.targetId }],
            },
        });
    }

    // Method untuk menghapus like dari database
    private async removeLike(likeData: LikeType): Promise<LikeType> {
        return await prisma.like.delete({
            where: {
                id: likeData.id,
            },
        });
    }

    // Method untuk menambahkan like ke database
    private async addLike(likeDto: LikeDto): Promise<LikeType> {
        return await prisma.like.create({
            data: likeDto,
        });
    }
}

export default new LikeServices();
