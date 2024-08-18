import { Author } from "./author";

export interface Review {
    id: string,
    authorId: string,
    productId: string,
    rating: number,
    comment: string
}

export interface DetailedReview extends Review {
    createdAt: Date;
    reactions: string[];
    author: Author;
}
