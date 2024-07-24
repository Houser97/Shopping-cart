export enum ReactionsEnum {
    LIKE = 'like',
    DISLIKE = 'dislike',
    LOVE = 'love',
}

export interface Reaction {
    reviewId: string,
    authorId: string,
    reaction: string
}

export interface UserReactions {
    [reviewId: string]: any
}

export interface ReactionCounts {
    love?: number;
    like?: number;
    dislike?: number;
}

export interface TotalReactions {
    [reviewId: string]: ReactionCounts;
}