import { Request, Response } from 'express';
import { PostType, VibeWithDetailType } from '../types/types';
import VibeServices from '../services/PostServices';
import ResponseDto from '../dtos/ResponseDto';
import ServiceResponseDto from '../dtos/ServiceResponseDto';

class VibeControllers {
    async getVibes(req: Request, res: Response) {
        const loggedUser = res.locals.user;

        const { error, payload }: ServiceResponseDto<VibeWithDetailType[]> =
            await VibeServices.getVibes(loggedUser);

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            );
        }

        return res.status(200).json(
            new ResponseDto<VibeWithDetailType[]>({
                message: {
                    status: 'Content retrieved!',
                },
                data: payload,
            })
        );
    }

    async getVibe(req: Request, res: Response) {
        const loggedUser = res.locals.user;
        const { id } = req.params;

        const { error, payload }: ServiceResponseDto<VibeWithDetailType> =
            await VibeServices.getVibe(+id, loggedUser);

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            );
        }

        return res.status(200).json(
            new ResponseDto<VibeWithDetailType>({
                message: {
                    status: 'Content retrieved!',
                },
                data: payload,
            })
        );
    }

    async getUserVibes(req: Request, res: Response) {
        const { id } = req.params;

        const { error, payload }: ServiceResponseDto<VibeWithDetailType[]> =
            await VibeServices.getUserVibes(+id);

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            );
        }

        return res.status(200).json(
            new ResponseDto<VibeWithDetailType[]>({
                message: {
                    status: "User's vibes retrieved!",
                },
                data: payload,
            })
        );
    }

    async postVibes(req: Request, res: Response) {
        const loggedUser = res.locals.user;
        const image = req.file?.path || null;
        const { content } = req.body;

        const { error, payload }: ServiceResponseDto<PostType> = await VibeServices.postVibe({
            content,
            image,
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

        return res.status(200).json(
            new ResponseDto<PostType>({
                message: {
                    status: 'Posted content succesfuly!',
                },
                data: payload,
            })
        );
    }

    async deleteVibe(req: Request, res: Response) {
        const { id } = req.params;
        const { error, payload }: ServiceResponseDto<PostType> = await VibeServices.deleteVibe(+id);

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            );
        }

        return res.status(200).json(
            new ResponseDto<PostType>({
                message: {
                    status: 'Deleted content succesfully!',
                },
                data: payload,
            })
        );
    }
}

export default new VibeControllers();
