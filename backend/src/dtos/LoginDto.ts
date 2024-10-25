class LoginDto {
    username: string
    password: string

    constructor({ username, password }) {
        this.username = username
        this.password = password
    }
}

export default LoginDto
