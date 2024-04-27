import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ReviewService } from "../services/review.service";

export class ReviewController {
    constructor(
        public readonly reviewService: ReviewService
    ) { }

    getReviews = (req: Request, res: Response) => {
        throw 'Unimplemented method';
    }

    createReview = (req: Request, res: Response) => {
        throw 'Unimplemented method';
    }

    updateReview = (req: Request, res: Response) => {
        throw 'Unimplemented method';
    }

    deleteReview = (req: Request, res: Response) => {
        throw 'Unimplemented method';
    }
}