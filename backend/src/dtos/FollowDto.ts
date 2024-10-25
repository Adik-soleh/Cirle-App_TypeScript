class FollowDto {
    targetId: number
    ownerId: number

    constructor({ targetId, ownerId }) {
        this.targetId = targetId
        this.ownerId = ownerId
    }
}

export default FollowDto
