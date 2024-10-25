class LikeDto {
    authorId: number
    targetId: number

    constructor({ authorId, targetId }) {
        this.authorId = authorId
        this.targetId = targetId
    }
}

export default LikeDto
