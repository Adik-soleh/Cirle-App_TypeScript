import { Request, Response } from 'express';
import { LikeType } from '../types/types';
import LikeServices from '../services/LikeServices';
import ServiceResponseDto from '../dtos/ServiceResponseDto';
import ResponseDto from '../dtos/ResponseDto';
import { prisma } from '../libs/prisma'; // Pastikan path ini sesuai dengan lokasi Prisma client Anda

class Redis {
    async likeMechanism(req: Request, res: Response) {
        const loggedUser = res.locals.user;
        const { targetId } = req.body;

        const { error, payload }: ServiceResponseDto<LikeType> = await LikeServices.likeMechanism({
            targetId,
            authorId: loggedUser.id,
        });

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            );
        }

        // Ensure the database has the latest vibes data
        await prisma.vibe.update({
            where: { id: targetId },
            data: { updatedAt: new Date() }, // Assuming you have an `updatedAt` field to track changes
        });

        return res.status(200).json(
            new ResponseDto<LikeType>({
                message: {
                    status: 'Ok!',
                },
                data: payload,
            })
        );
    }
}

export default new Redis();
