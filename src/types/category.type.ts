export interface CategorySchema {
    id: number | string;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

export interface CategoryInsertSchema {
    name: string;
    image: string;
}

export interface CategoryUpdateSchema {
    name?: string;
    image?: string;
}
