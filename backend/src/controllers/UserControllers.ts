import { Request, Response } from 'express'
import { UploadType, UserType } from '../types/types'
import UserServices from '../services/UserServices'
import ServiceResponseDto from '../dtos/ServiceResponseDto'
import ResponseDto from '../dtos/ResponseDto'

class UserControllers {
    async getUser(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { id } = req.params
        const { error, payload }: ServiceResponseDto<UserType> = await UserServices.getUser(
            +id,
            loggedUser
        )

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDto<UserType>({
                message: {
                    status: 'user found!',
                },
                data: payload,
            })
        )
    }

    async getLoggedUser(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { error, payload }: ServiceResponseDto<UserType> = await UserServices.getLoggedUser(
            loggedUser
        )

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDto<UserType>({
                message: {
                    status: 'user found!',
                },
                data: payload,
            })
        )
    }

    async getUsers(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { error, payload }: ServiceResponseDto<UserType[]> = await UserServices.getUsers(
            loggedUser
        )

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDto<UserType[]>({
                message: {
                    status: 'Users retrieved!',
                },
                data: payload,
            })
        )
    }

    async editUser(req: Request, res: Response) {
        const loggedUser = res.locals.user

        const files = req.files as UploadType
        const avatar = files.avatar ? files.avatar[0].path : null
        const banner = files.banner ? files.banner[0].path : null

        const { username, name, filterContent, bio } = req.body

        const { error, payload }: ServiceResponseDto<UserType> = await UserServices.editUser({
            id: loggedUser.id,
            username,
            name,
            filterContent: JSON.parse(filterContent),
            avatar,
            banner,
            bio,
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
            new ResponseDto<UserType>({
                message: {
                    status: 'User edited!',
                },
                data: payload,
            })
        )
    }

    async searchUser(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const keyword = req.query.keyword

        if (typeof keyword !== 'string') {
            return res.status(400).json(
                new ResponseDto<null>({
                    message: {
                        error: 'Keyword must be a string.',
                    },
                    data: null,
                })
            )
        }

        const { error, payload } = await UserServices.searchUser({ keyword }, loggedUser)

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDto<UserType>({
                message: {
                    status: 'user found!',
                },
                data: payload,
            })
        )
    }
}

export default new UserControllers()
