import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: 'dlpq5dj0j',
    api_key: '317522293588931',
    api_secret: 'tDd__08nt-YvGzM52tGwTufKQ5Q',
})

export const DATABASE_URL = process.env.DATABASE_URL
export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET
export const SALT_ROUND = process.env.SALT_ROUND

export { cloudinary }
