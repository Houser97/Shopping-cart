export interface ReviewDBResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    next: string | null;
    prev: string | null;
    reviews: ReviewDB[];
    userReactions: { [key: string]: any };
    totalReactions: { [key: string]: any };
}

export interface ReviewDB {
    _id: string;
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