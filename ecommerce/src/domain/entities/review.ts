import { Author } from "./author";
import { ReactionsEnum } from "./reaction";

export interface Review {
    id: string,
    authorId: string,
    productId: string,
    rating: number,
    comment: string
}

export interface DetailedReview extends Review {
    createdAt: Date;
    reactions: Record<ReactionsEnum, number>;
    author: Author;
}
