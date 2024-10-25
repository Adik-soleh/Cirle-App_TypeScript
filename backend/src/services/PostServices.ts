import { Prisma, PrismaClient } from '@prisma/client'
import { UserType, PostType, VibeWithDetailType } from '../types/types'
import ServiceResponseDto from '../dtos/ServiceResponseDto'
import VibeDto from '../dtos/PostDto'
import CircleError from '../utils/CircleError'
import { vibeSchema } from '../validators/validators'
import primsaErrorHandler from '../utils/PrismaError'

const prisma = new PrismaClient()

class VibeServices {
    async getVibes(loggedUser: UserType): Promise<ServiceResponseDto<VibeWithDetailType[]>> {
        try {
            const rawVibes: VibeWithDetailType[] = await prisma.vibe.findMany({
                include: {
                    replies: true,
                    likes: true,
                    author: true,
                },
            })

            const vibes: VibeWithDetailType[] = rawVibes.map((vibe) => {
                const { replies, likes, author, ...rest } = vibe

                delete author.createdAt
                delete author.updatedAt
                delete author.password
                delete rest.updatedAt

                return {
                    ...rest,
                    author,
                    totalReplies: replies.length,
                    totalLikes: likes.length,
                    isLiked: vibe.likes.some((like) => like.authorId === loggedUser.id),
                }
            })

            return new ServiceResponseDto<VibeWithDetailType[]>({
                error: false,
                payload: vibes.sort((x, y) => {
                    const xInMs = x.createdAt.getTime()
                    const yInMs = y.createdAt.getTime()

                    return yInMs - xInMs
                }),
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

    async getVibe(
        id: number,
        loggedUser: UserType
    ): Promise<ServiceResponseDto<VibeWithDetailType>> {
        try {
            const rawVibe: VibeWithDetailType = await prisma.vibe.findUnique({
                where: {
                    id: id,
                },
                include: {
                    replies: true,
                    likes: true,
                    author: true,
                },
            })

            if (!rawVibe) {
                throw new CircleError({ error: 'Requested vibe does not exist.' })
            }

            const vibe = {
                ...rawVibe,
                likes: rawVibe.likes.map((like) => {
                    delete like.createdAt
                    delete like.updatedAt
                    return like
                }),
                totalReplies: rawVibe.replies.length,
                totalLikes: rawVibe.likes.length,
                isLiked: rawVibe.likes.some((like) => like.authorId === loggedUser.id),
                replies: rawVibe.replies.sort((x, y) => {
                    const xInMs = x.createdAt.getTime()
                    const yInMs = y.createdAt.getTime()

                    return yInMs - xInMs
                }),
            }

            delete vibe.updatedAt
            delete vibe.author.createdAt
            delete vibe.author.updatedAt
            delete vibe.author.password

            return new ServiceResponseDto<VibeWithDetailType>({
                error: false,
                payload: vibe,
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

    async getUserVibes(id: number): Promise<ServiceResponseDto<VibeWithDetailType[]>> {
        try {
            const rawVibes: VibeWithDetailType[] = await prisma.vibe.findMany({
                where: {
                    authorId: id,
                },
                include: {
                    replies: true,
                    likes: true,
                },
            })

            if (!rawVibes.length) {
                throw new CircleError({ error: 'Requested user does not have any vibes.' })
            }

            const vibes = rawVibes.map((vibe) => {
                const { replies, likes, ...rest } = vibe

                return {
                    ...rest,
                    totalReplies: replies.length,
                    totalLikes: likes.length,
                }
            })

            return new ServiceResponseDto<VibeWithDetailType[]>({
                error: false,
                payload: vibes,
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

    async postVibe(vibeDto: VibeDto): Promise<ServiceResponseDto<PostType>> {
        try {
             vibeSchema.parse(vibeDto)

           

            const postedVibe = await prisma.vibe.create({
                data: vibeDto,
            })

            return new ServiceResponseDto<PostType>({
                error: false,
                payload: postedVibe,
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

    async deleteVibe(id: number): Promise<ServiceResponseDto<PostType>> {
        try {
            const deletedVibes = await prisma.vibe.delete({
                where: {
                    id: id,
                },
            })

            return new ServiceResponseDto({
                error: false,
                payload: deletedVibes,
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

export default new VibeServices()