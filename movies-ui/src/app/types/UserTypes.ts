
export type UserRegisterRequest = {
    username: string;
    email: string;
    password: string;
}

export type UserRegisterResponse = {
    email: string;
    token: string;
    username: string;
}