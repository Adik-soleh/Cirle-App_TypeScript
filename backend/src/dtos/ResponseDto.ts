class ResponseDto<T> {
    message: object
    data?: T | null 

    constructor({  message, data }) {
        this.message = message
        this.data = data
    }
}

export default ResponseDto
