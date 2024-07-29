export enum ReactionsEnum {
    LIKE = 'like',
    DISLIKE = 'dislike',
    LOVE = 'love',
}

export interface Reaction {
    id: string,
    reviewId: string,
    authorId: string,
    reaction: string
}

export interface ReactionsReviewIdObject {
    [reviewId: string]: Reaction
}

export interface ReactionCounts {
    love?: number;
    like?: number;
    dislike?: number;
}

export interface TotalReactions {
    [reviewId: string]: ReactionCounts;
}