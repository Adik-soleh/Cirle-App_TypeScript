import { Request, Response } from 'express'
import { UserType } from '../types/types'
import ResponseDto from '../dtos/ResponseDto'
import ServiceResponseDto from '../dtos/ServiceResponseDto'
import AuthServices from '../services/AuthServices'

class AuthControllers {
    async register(req: Request, res: Response) {
        const avatar =
            'https://api.dicebear.com/9.x/lorelei/svg?flip=false'
        const banner =
            'https://api.dicebear.com/9.x/thumbs/svg?seed=Bandit&backgroundColor=f1f4dc&eyesColor=transparent&mouthColor=transparent'
        const { username, email, name, password, bio } = req.body

        const { error, payload }: ServiceResponseDto<UserType> = await AuthServices.register({
            username,
            email,
            name,
            password,
            avatar,
            banner,
            bio: bio ? bio : null,
        })

        if (error) {
            return res.status(500).json({errot : "email or username already exist"})
        }

        delete payload.password
        return res.status(200).json(
            new ResponseDto<UserType>({
                message: {
                    status: 'User created!',
                },
                data: payload,
            })
        )
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body

        const { error, payload }: ServiceResponseDto<string> = await AuthServices.login({
            username,
            password,
        })

        if (error) {
            return res.status(500).json({
                    message:payload,
                })
            
        }

        return res.status(200).json(
            new ResponseDto<string>({
                message: {
                    status: 'User login succesfuly',
                },
                data: {
                    token: payload,
                },
            })
        )
    }

    

    async resetPassword(req: Request, res: Response) {
        const requester = res.locals.user
        const { password } = req.body

        const { error, payload }: ServiceResponseDto<string> = await AuthServices.resetPassword({
            email: requester.email,
            password,
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
            new ResponseDto<string>({
                message: {
                    status: 'Password changed!',
                },
                data: {
                    token: payload,
                },
            })
        )
    }
}

export default new AuthControllers()
