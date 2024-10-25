import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../configs/config';
import jwt from 'jsonwebtoken';

function authenticate(req: Request, res: Response, next: NextFunction) {
const {authorization} = req.headers
    // Cek apakah header authorization ada dan menggunakan format Bearer
    if (!authorization) {
       res.status(401).json({ message: 'Authorization header missing or invalid' });
       return ;
    }

    // Ambil token setelah kata 'Bearer'
    const token = authorization.split(' ')[1];
    if (!token) {
         res.status(401).json({ message: 'Token not found' });
         return;
    }

    // Verifikasi token
    jwt.verify(token, JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Menyimpan data user ke res.locals untuk akses di middleware berikutnya
        res.locals.user = user;
        next();
    });
}

export default authenticate;
