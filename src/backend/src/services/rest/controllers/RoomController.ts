import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../middlewares/errorMiddleware";
import { CatchAsync } from "../../../utils/CatchAsync";
import { RoomService } from "../services/RoomService";

export class RoomController {
	@CatchAsync
	static async getActive(req: Request, res: Response, next: NextFunction) {
		const courseId = parseInt(req.params.id);
		const room = await RoomService.getActive(courseId);
		res.json(room);
	}
}
