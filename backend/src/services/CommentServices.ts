import { Prisma, PrismaClient } from '@prisma/client'
import { CommentType } from '../types/types'
import ReplyDto from '../dtos/CommentDto'
import ServiceResponseDto from '../dtos/ServiceResponseDto'
import { replySchema } from '../validators/validators'
import primsaErrorHandler from '../utils/PrismaError'

const prisma = new PrismaClient()

class ReplyServices {
    async postReply(replyDto: ReplyDto): Promise<ServiceResponseDto<CommentType>> {
        try {
            replySchema.parse(replyDto)

            

            const postedReply = await prisma.reply.create({
                data: replyDto,
            })

            delete postedReply.updatedAt

            return new ServiceResponseDto<CommentType>({
                error: false,
                payload: postedReply,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDto({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDto({
                error: true,
                payload: error,
            })
        }
    }

    async deleteReply(id: number): Promise<ServiceResponseDto<CommentType>> {
        try {
            const deletedReply = await prisma.reply.delete({
                where: {
                    id: id,
                },
            })

            return new ServiceResponseDto<CommentType>({
                error: false,
                payload: deletedReply,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDto({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDto({
                error: true,
                payload: error,
            })
        }
    }
}

export default new ReplyServices()
