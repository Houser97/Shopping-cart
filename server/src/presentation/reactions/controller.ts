import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { ReactionService } from "../services/reaction.service";
import { CreateReactionDto } from "../../domain/dtos/reactions/create-reaction.dto";

export class ReactionController {
    constructor(
        public readonly reactionService: ReactionService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    createReaction = (req: Request, res: Response) => {
        const [error, createReactionDto] = CreateReactionDto.create({ ...req.body });
        if (error) return res.status(400).json({ error });

        this.reactionService.create(createReactionDto!)
            .then(reaction => res.json(reaction))
            .catch(error => this.handleError(error, res));
    }

}