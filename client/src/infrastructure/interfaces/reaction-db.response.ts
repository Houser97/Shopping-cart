import { Meta } from "./product-db.response"

export interface ReactionDBResponse {
    id: string,
    reviewId: string,
    authorId: string,
    reaction: string
}

export interface ReactionDBResponseNest {
    data: ReactionDBResponse[],
    meta: Meta,
}
