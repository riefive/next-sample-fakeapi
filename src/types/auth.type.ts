export interface AuthLoginRequestSchema {
    email: string;
    password: string;
}

export interface AuthLoginResponseSchema {
    access_token: string;
    refresh_token: string;
}