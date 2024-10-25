import { Prisma, PrismaClient } from '@prisma/client';
import { UserType } from '../types/types';
import { JWT_SECRET } from '../configs/config';
import jwt from 'jsonwebtoken';
import RegisterDto from '../dtos/RegisterDto';
import ServiceResponseDto from '../dtos/ServiceResponseDto';
import Hasher from '../utils/Hasher';
import LoginDto from '../dtos/LoginDto';
import CircleError from '../utils/CircleError';
import ForgotPasswordDto from '../dtos/ForgotPasswordDto';
import ResetPasswordDto from '../dtos/ResetPasswordDto';
import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
} from '../validators/validators';
import primsaErrorHandler from '../utils/PrismaError';
import { z } from 'zod';

const prisma = new PrismaClient();

class AuthServices {
    async register(registerDto: RegisterDto): Promise<ServiceResponseDto<UserType>> {
        try {
            registerSchema.parse(registerDto);

            const user = await prisma.user.create({
                data: {
                    ...registerDto,
                    password: await Hasher.hashPassword(registerDto.password),
                },
            });

            delete user.password;
            return new ServiceResponseDto<UserType>({
                error: false,
                payload: user,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDto({
                    error: true,
                    payload: primsaErrorHandler(error),
                });
            }
            return new ServiceResponseDto({
                error: true,
                payload: error,
            });
        }
    }

    async login(loginDto: LoginDto): Promise<ServiceResponseDto<string>> {
        try {
            loginSchema.parse(loginDto);

            const requestedUser = await prisma.user.findUnique({
                where: {
                    username: loginDto.username,
                },
            });

            if (!requestedUser) {
                throw new CircleError({ error: 'The username/password was incorrect.' });
            }

            const isPasswordValid = await Hasher.comparePassword(
                loginDto.password,
                requestedUser.password
            );
            if (!isPasswordValid) {
                throw new CircleError({ error: 'The username/password was incorrect.' });
            }

            delete requestedUser.password;
            const token = jwt.sign(requestedUser, JWT_SECRET);

            return new ServiceResponseDto<string>({
                error: false,
                payload: token,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDto({
                    error: true,
                    payload: primsaErrorHandler(error),
                });
            }
            return new ServiceResponseDto({
                error: true,
                payload: error,
            });
        }
    }


    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<ServiceResponseDto<string>> {
        try {
            resetPasswordSchema.parse(resetPasswordDto);

            const updatedUser = await prisma.user.update({
                where: {
                    email: resetPasswordDto.email,
                },
                data: {
                    password: await Hasher.hashPassword(resetPasswordDto.password),
                },
            });

            if (!updatedUser) {
                throw new CircleError({ error: 'Requested user does not exist.' });
            }
            delete updatedUser.password;
            const token = jwt.sign(updatedUser, JWT_SECRET);

            return new ServiceResponseDto<string>({
                error: false,
                payload: token,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new CircleError({ error: error.errors[0].message });
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDto({
                    error: true,
                    payload: primsaErrorHandler(error),
                });
            }
            return new ServiceResponseDto({
                error: true,
                payload: error,
            });
        }
    }
}

export default new AuthServices();
