class ServiceResponseDto<T> {
    error: boolean
    payload: T | null

    constructor({ error, payload }) {
        this.error = error
        this.payload = payload
    }
}

export default ServiceResponseDto
