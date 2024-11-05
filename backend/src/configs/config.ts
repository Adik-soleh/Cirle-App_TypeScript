import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const DATABASE_URL = process.env.DATABASE_URL
export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET
export const SALT_ROUND = process.env.SALT_ROUND
export const HOST = process.env.HOST
export const LOCALHOST = process.env.LOCALHOST
export const CLIENT = process.env.CLIENT
export const REDIS_URL = process.env.REDIS_URL
export const MAILER_USERNAME = process.env.MAILER_USERNAME
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD

export { cloudinary }
