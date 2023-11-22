export interface UserSchema {
    id: number | string;
    name: string;
    role: string;
    email: string;
    password: string;
    avatar: string;
    creationAt?: string;
    updatedAt?: string;
}

export interface UserInsertSchema {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface UserUpdateSchema {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
}
