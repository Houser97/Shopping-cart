import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class ReviewController {
    constructor(
        public readonly reviewService: ReviewService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    getReviews = (req: Request, res: Response) => {
        const { productId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if (error) return res.status(400).json({ error });

        this.reviewService.getReviews(productId, paginationDto!)
            .then(reviews => res.json(reviews))
            .catch(error => this.handleError(error, res));
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