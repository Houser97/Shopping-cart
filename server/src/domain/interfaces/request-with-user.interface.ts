import { Request } from "express";
import mongoose from "mongoose";

export type RequestWithUser = Request & { user: { _id: mongoose.Types.ObjectId } };