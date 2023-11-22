import { CategorySchema } from "./category.type";

export interface ProductSchema {
    id: number | string;
    title: string;
    price: number;
    description: string;
    category: CategorySchema;
    images: string[];
    creationAt?: string;
    updatedAt?: string;
}

export interface ProductInsertSchema {
    title: string;
    price: number;
    description: string;
    categoryId: number | string;
    images: string[];
}

export interface ProductUpdateSchema {
    title?: string;
    price?: number;
    description?: string;
    categoryId?: number | string;
    images?: string[];
}