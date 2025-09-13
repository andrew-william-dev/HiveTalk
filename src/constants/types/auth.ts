export type SignUpType = {
    username: string,
    email: string,
    password: string
}

export type LoginType = {
    username: string,
    password: string
}

export type AuthStatus = {
    authorized : string,
    unauthorized : string,
    pending : string
}
