import { Prisma, PrismaClient } from '@prisma/client'
import { FollowType } from '../types/types'
import FollowDto from '../dtos/FollowDto'
import ServiceResponseDto from '../dtos/ServiceResponseDto'
import CircleError from '../utils/CircleError'
import primsaErrorHandler from '../utils/PrismaError'

const prisma = new PrismaClient()

class FollowServices {
    async follow(FollowDto: FollowDto): Promise<ServiceResponseDto<FollowType>> {
        try {
            if (this.isTargetedItSelf(FollowDto)) {
                throw new CircleError({ error: "Can't follow itself." })
            }

            if (await this.isFollowed(FollowDto)) {
                throw new CircleError({ error: 'Target user is already followed.' })
            }

            const createdFollow = await prisma.follow.create({
                data: FollowDto,
            })

            delete createdFollow.createdAt
            delete createdFollow.updatedAt

            return new ServiceResponseDto<FollowType>({
                error: false,
                payload: createdFollow,
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

    async unfollow(FollowDto: FollowDto): Promise<ServiceResponseDto<FollowType>> {
        try {
            if (this.isTargetedItSelf(FollowDto)) {
                throw new CircleError({ error: "Can't unfollow itself." })
            }

            const isFollowed: FollowType = await this.isFollowed(FollowDto)

            if (!isFollowed) {
                throw new CircleError({ error: 'Target user is not followed yet.' })
            }

            const createdUnfollow = await prisma.follow.delete({
                where: {
                    id: isFollowed.id,
                },
            })

            delete createdUnfollow.createdAt
            delete createdUnfollow.updatedAt

            return new ServiceResponseDto<FollowType>({
                error: false,
                payload: createdUnfollow,
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

    private isTargetedItSelf(FollowDto: FollowDto): boolean {
        return FollowDto.targetId === FollowDto.ownerId
    }

    private async isFollowed(FollowDto: FollowDto): Promise<FollowType> {
        return await prisma.follow.findFirst({
            where: {
                AND: [{ targetId: FollowDto.targetId }, { ownerId: FollowDto.ownerId }],
            },
        })
    }
}

export default new FollowServices()
