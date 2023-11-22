export interface CategorySchema {
    id: string;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

export interface CategoryInsertSchema {
    name: string;
    image: string;
}
