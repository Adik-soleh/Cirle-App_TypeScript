export interface UserType {
    id: number
    username: string
    email: string
    name: string
    password?: string
    avatar: string
    banner: string
    bio: string
    createdAt: Date
    updatedAt: Date
    isFollowed?: boolean
    filterContent: boolean
}

export interface PostType {
    id: number
    content: string
    image: string
    createdAt: Date
    updatedAt: Date
    authorId: number
}

export interface CommentType {
    id: number
    image: string
    content: string
    authorId: number
    targetId: number
    createdAt: Date
    updatedAt: Date
}

export interface LikeType {
    id: number
    authorId: number
    targetId: number
    createdAt: Date
    updatedAt: Date
}

export interface FollowType {
    id: number
    targetId: number
    ownerId: number
    createdAt: Date
    updatedAt: Date
}

export interface ServiceResponseType<T> {
    error: boolean
    payload: T | object
}

export interface UserWithDetailype extends UserType {
    followers?: FollowType[]
    followings?: FollowType[]
    vibes?: VibeWithDetailType[]
}

export interface VibeWithDetailType extends PostType {
    replies?: CommentType[]
    likes?: LikeType[]
    totalReplies?: number
    totalLikes?: number
    isLiked?: boolean
    author?: UserType
}

export interface MulterFileType {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    size: number
    destination: string
    filename: string
    path: string
    buffer: Buffer
}

export interface UploadType {
    avatar?: MulterFileType[]
    banner?: MulterFileType[]
}
