import { Meta } from "./product-db.response";

interface ReviewDBResponseData {
    reviews: ReviewDB[];
    totalReactions: { [key: string]: any };
}

export interface ReviewDBResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    next: string | null;
    prev: string | null;
    data: ReviewDBResponseData;
    userReactions: { [key: string]: any };
}

export interface ReviewDB {
    id: string;
    productId: string;
    authorId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    reactions: any[];
    author: AuthorDB;
}

export interface AuthorDB {
    _id: string;
    username: string;
}

export interface ReviewDBResponseNest {
    data: ReviewDbNest[],
    meta: Meta
}

export interface ReviewDbNest {
    id: string;
    productId: string;
    authorId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    reactions: any[];
    author: AuthorDB;
}

export interface AuthorDbNest {
    _id: string;
    username: string;
}