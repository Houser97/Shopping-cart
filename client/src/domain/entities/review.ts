import { Author } from "./author";

export interface Review {
    id: string;
    productId: string;
    authorId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    ratings: string[];
    reactions: string[];
    author: Author;
}
