import { Request, Response } from 'express';
import { CommentType } from '../types/types';
import ServiceResponseDto from '../dtos/ServiceResponseDto';
import ReplyServices from '../services/CommentServices';
import ResponseDto from '../dtos/ResponseDto';

class CommentsController {
    async postComment(req: Request, res: Response) {
        const loggedUser = res.locals.user;
        const image = req.file?.path;
        const { content, targetId } = req.body;

        const { error, payload }: ServiceResponseDto<CommentType> = await ReplyServices.postReply({
            image,
            content,
            targetId: +targetId,
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
            new ResponseDto<CommentType>({
                message: {
                    status: 'Reply posted!',
                },
                data: payload,
            })
        );
    }

    async deleteComment(req: Request, res: Response) {
        const { id } = req.params;
        const { error, payload }: ServiceResponseDto<CommentType> = await ReplyServices.deleteReply(+id);

        if (error) {
            return res.status(500).json(
                new ResponseDto<null>({
                    message: payload,
                    data: null,
                })
            );
        }

        return res.status(200).json(
            new ResponseDto<CommentType>({
                message: {
                    status: 'Reply deleted!',
                },
                data: payload,
            })
        );
    }
}

export default new CommentsController();
