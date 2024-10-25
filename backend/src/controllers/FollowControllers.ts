import { Request, Response } from 'express'
import { FollowType } from '../types/types'
import FollowServices from '../services/FollowServices'
import ServiceResponseDto from '../dtos/ServiceResponseDto'
import ResponseDto from '../dtos/ResponseDto'

class FollowControllers {
    async follow(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { id } = req.params

        const { error, payload }: ServiceResponseDto<FollowType> = await FollowServices.follow({
            targetId: +id,
            ownerId: loggedUser.id,
        })

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDto<FollowType>({
                message: {
                    status: 'User followed!',
                },
                data: payload,
            })
        )
    }

    async unfollow(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { id } = req.params

        const { error, payload }: ServiceResponseDto<FollowType> = await FollowServices.unfollow({
            targetId: +id,
            ownerId: loggedUser.id,
        })

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDto<FollowType>({
                message: {
                    status: 'User unfollowed!',
                },
                data: payload,
            })
        )
    }
}

export default new FollowControllers()
