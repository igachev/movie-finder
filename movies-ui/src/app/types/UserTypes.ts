
export type UserRegisterRequest = {
    username: string;
    email: string;
    password: string;
}

export type UserRegisterResponse = {
    email: string;
    token: string;
    userName: string;
}

export type UserLoginRequest = {
    email: string;
    password: string;
}

export type UserLoginResponse = {
    email: string;
    token: string;
    userName: string;
}