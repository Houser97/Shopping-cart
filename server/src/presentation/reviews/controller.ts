import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateReviewDto } from "../../domain/dtos/reviews/create-review.dto";
import { UpdateReviewDto } from "../../domain/dtos/reviews/update-review.dto";

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
        const userId = req.user as string;

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if (error) return res.status(400).json({ error });

        this.reviewService.getReviews(productId, paginationDto!, userId)
            .then(reviews => res.json(reviews))
            .catch(error => this.handleError(error, res));
    }

    getReviewByProductIdAndUserId = (req: Request, res: Response) => {
        const { productId } = req.params;
        const user = req.user as any;
        const userId = user!.id;

        this.reviewService.getByProductIdAndUserId(productId, userId)
            .then(review => res.json(review))
            .catch(error => this.handleError(error, res));
    }

    createReview = (req: Request, res: Response) => {
        const [error, createReviewDto] = CreateReviewDto.create({ ...req.body });
        if (error) return res.status(400).json({ error });

        this.reviewService.create(createReviewDto!)
            .then(review => res.status(201).json(review))
            .catch(error => this.handleError(error, res));
    }

    updateReview = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateReviewDto] = UpdateReviewDto.create({ ...req.body });
        if (error) return res.status(400).json({ error });

        this.reviewService.update(id, updateReviewDto!)
            .then(review => res.status(201).json(review))
            .catch(error => this.handleError(error, res));
    }

    deleteReview = (req: Request, res: Response) => {
        const { id } = req.params;
        const user = req.user as any;
        const userId = user!.id;

        this.reviewService.delete(id, userId)
            .then(review => res.status(201).json(review))
            .catch(error => this.handleError(error, res));
    }
}