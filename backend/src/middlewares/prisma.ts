import { NextFunction, Request, Response } from 'express';
import { VibeWithDetailType } from '../types/types';
import { prisma } from '../libs/prisma';
import ResponseDto from '../Dtos/ResponseDto';

class Redis {
    async getVibes(req: Request, res: Response, next: NextFunction) {
        try {
            const vibes = await prisma.vibe.findMany({
                include: {
                    author: true,
                    replies: true,
                    likes: true,
                },
            });
            

            const mappedVibes: VibeWithDetailType[] = vibes.map(vibe => ({
                ...vibe,
                totalReplies: vibe.replies.length,
                totalLikes: vibe.likes.length,
                isLiked: false, // Adjust this based on user context if needed
            }));

            return res.status(200).json(
                new ResponseDto<VibeWithDetailType[]>({
                    message: {
                        status: 'Vibes retrieved!',
                    },
                    data: mappedVibes
                })
            );
        } catch (error) {
            next(error);
        }
    }


    async deleteVibes() {
        try {
            // Deletes all vibes from the database
            await prisma.vibe.deleteMany();
            console.log('All vibes deleted successfully');
        } catch (error) {
            console.error('Error deleting vibes:', error);
            throw error;
        }
    }
}

export default new Redis();



// import { NextFunction, Request, Response } from 'express';
// import { VibeWithDetailType } from '../types/types';
// import { prisma } from '../libs/prisma'; // Pastikan path ini sesuai dengan lokasi Prisma client Anda
// import ResponseDto from '../Dtos/ResponseDto';

// class Redis {
//     async getVibes(req: Request, res: Response, next: NextFunction) {
//         try {
//             // Ambil vibes langsung dari database menggunakan Prisma
//             const vibes = await prisma.vibe.findMany({
//                 include: {
//                     author: true, // Sesuaikan ini berdasarkan relasi yang Anda miliki
//                     replies: true,
//                     likes: true,
//                 },
//             });

//             return res.status(200).json(
//                 new ResponseDto<VibeWithDetailType[]>({
//                     message: {
//                         status: 'Vibes retrieved!',
//                     },
//                     data: vibes,
//                 })
//             );
//         } catch (error) {
//             console.error('Error retrieving vibes:', error);
//             next(error);
//         }
//     }

//     async deleteVibes() {
//         try {
//             // Hapus semua data vibes dari database menggunakan Prisma
//             await prisma.vibe.deleteMany();
//             console.log('All vibes deleted from the database.');
//         } catch (error) {
//             console.error('Error deleting vibes:', error);
//             throw error;
//         }
//     }
// }

// export default new Redis();
