import { Prisma, PrismaClient } from '@prisma/client'
import { UserType, UserWithDetailype } from '../types/types'
import { userSchema } from '../validators/validators'
import ServiceResponseDto from '../dtos/ServiceResponseDto'
import UserDto from '../dtos/UserDto'
import CircleError from '../utils/CircleError'
import primsaErrorHandler from '../utils/PrismaError'
import SearchDto from '../dtos/SearchDto'
import { z } from 'zod'

const prisma = new PrismaClient()

class UserServices {
    async getUser(id: number, loggedUser: UserType): Promise<ServiceResponseDto<UserType>> {
        try {
            const rawUser: UserWithDetailype = await prisma.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    followers: true,
                    followings: true,
                    vibes: {
                        include: {
                            replies: true,
                            likes: true,
                        },
                    },
                },
            })

            const user = {
                ...rawUser,
                totalFollower: rawUser.followers.length,
                totalFollowing: rawUser.followings.length,
                isFollowed: rawUser.followers.some(
                    (follower) => follower.ownerId === loggedUser.id
                ),
                vibes: rawUser.vibes.map((vibe) => {
                    const replies = vibe.replies
                    const likes = vibe.likes

                    delete vibe.createdAt
                    delete vibe.replies
                    delete vibe.likes

                    delete loggedUser.createdAt
                    delete loggedUser.updatedAt

                    return {
                        ...vibe,
                        author: rawUser,
                        totalReplies: replies.length,
                        totalLikes: likes.length,
                        isLiked: likes.some((like) => like.authorId === loggedUser.id),
                    }
                }),
            }

            delete user.password
            delete user.createdAt
            delete user.updatedAt

            return new ServiceResponseDto<UserType>({
                error: false,
                payload: user,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
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

    async getLoggedUser(loggedUser: UserType): Promise<ServiceResponseDto<UserType>> {
        try {
            const rawUser: UserWithDetailype = await prisma.user.findUnique({
                where: {
                    id: loggedUser.id,
                },
                include: {
                    followers: true,
                    followings: true,
                    vibes: {
                        include: {
                            replies: true,
                            likes: true,
                        },
                    },
                },
            })

            const user = {
                ...rawUser,
                totalFollower: rawUser.followers.length,
                totalFollowing: rawUser.followings.length,
                vibes: rawUser.vibes.map((vibe) => {
                    const replies = vibe.replies
                    const likes = vibe.likes

                    delete vibe.createdAt
                    delete vibe.replies
                    delete vibe.likes

                    delete loggedUser.createdAt
                    delete loggedUser.updatedAt

                    return {
                        ...vibe,
                        author: loggedUser,
                        totalReplies: replies.length,
                        totalLikes: likes.length,
                        isLiked: likes.some((like) => like.authorId === loggedUser.id),
                    }
                }),
            }

            delete user.password
            delete user.createdAt
            delete user.updatedAt

            return new ServiceResponseDto<UserType>({
                error: false,
                payload: user,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
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

    async getUsers(loggedUser: UserType): Promise<ServiceResponseDto<UserType[]>> {
        try {
            const rawUsers: UserWithDetailype[] = await prisma.user.findMany({
                include: {
                    followers: true,
                },
            })

            const users: UserWithDetailype[] = rawUsers.map((user) => {
                const followers = user.followers

                delete user.password

                if (followers.length) {
                    return {
                        ...user,
                        isFollowed: followers.some(
                            (follower) => follower.ownerId === loggedUser.id
                        ),
                    }
                }

                return {
                    ...user,
                    isFollowed: false,
                }
            })

            return new ServiceResponseDto<UserType[]>({
                error: false,
                payload: users,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
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

    async editUser(userDto: UserDto): Promise<ServiceResponseDto<UserType>> {
        try {
         userSchema.parse(userDto)

           

            const requestedUser = await prisma.user.findUnique({
                where: {
                    id: userDto.id,
                },
            })

            const editedUser = await prisma.user.update({
                where: {
                    id: userDto.id,
                },
                data: this.DtoEditor(userDto, requestedUser),
            })

            delete editedUser.password
            delete editedUser.updatedAt
            delete editedUser.createdAt

            return new ServiceResponseDto<UserType>({
                error: false,
                payload: editedUser,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
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

    async searchUser(searchDto: SearchDto, loggedUser: UserType) {
        try {
            if (!searchDto.keyword) {
                return new ServiceResponseDto<UserWithDetailype[]>({
                    error: false,
                    payload: [],
                })
            }

            const rawResult: UserWithDetailype[] = await prisma.user.findMany({
                where: {
                    username: {
                        contains: searchDto.keyword,
                        mode: 'insensitive',
                    },
                    id: {
                        not: loggedUser.id,
                    },
                },
                include: {
                    followers: true,
                },
            })

            const result = rawResult.map((result) => {
                delete result.password
                delete result.createdAt
                delete result.updatedAt

                result.isFollowed = result.followers.some(
                    (follower) => follower.ownerId === loggedUser.id
                )

                return result
            })

            return new ServiceResponseDto<UserWithDetailype[]>({
                error: false,
                payload: result,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
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

    private DtoEditor(newData: UserDto, existingData: UserType): UserDto {
        return new UserDto({
            id: newData.id,
            username: newData.username || existingData.username,
            name: newData.name || existingData.name,
            filterContent: newData.filterContent,
            avatar: newData.avatar || existingData.avatar,
            banner: newData.banner || existingData.banner,
            bio: newData.bio || existingData.bio,
        })
    }
}

export default new UserServices()
