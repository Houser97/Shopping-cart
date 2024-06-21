import { Request, Response } from "express";
import { CreateRatingDto } from "../../domain/dtos/ratings/create-rating.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { RatingService } from "../services/rating.service";

export class RatingController {
    constructor(
        public readonly ratingService: RatingService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    createRating = (req: Request, res: Response) => {
        const [error, createRatingDto] = CreateRatingDto.create({ ...req.body });
        if (error) return res.status(400).json({ error });

        this.ratingService.create(createRatingDto!)
            .then(rating => res.json(rating))
            .catch(error => this.handleError(error, res));
    }
}