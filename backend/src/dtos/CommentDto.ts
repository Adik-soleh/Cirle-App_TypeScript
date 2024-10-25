class CommentsDto {
    image: string | null
    content: string
    authorId: number
    targetId: number

    constructor({ image = null, content, badLabels = [], authorId, targetId }) {
        this.image = image
        this.content = content
        this.authorId = authorId
        this.targetId = targetId
    }
}

export default CommentsDto
