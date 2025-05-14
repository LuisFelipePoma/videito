import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../../../utils/CatchAsync";
import { CourseService } from "../services/CourseService";
import { AppError } from "../../../middlewares/errorMiddleware";
import { Role } from "../../../types/role";

export class CourseController {
	@CatchAsync
	static async getAll(req: Request, res: Response, next: NextFunction) {
		const courses = await CourseService.getAll();
		res.json(courses);
	}

	@CatchAsync
	static async getByUser(req: Request, res: Response, next: NextFunction) {
		const userId = parseInt(req.params.id);
		if (isNaN(userId)) {
			return next(new AppError("Invalid user ID", 400));
		}
		// Leer el query parameter role
		const role = req.query.role as Role;

		const courses = await CourseService.getByUser(userId, role);
		res.json(courses);
	}

	@CatchAsync
	static async getById(req: Request, res: Response, next: NextFunction) {
		const courseId = parseInt(req.params.id);
		if (isNaN(courseId)) {
			return next(new AppError("Invalid course ID", 400));
		}
		const courses = await CourseService.getById(courseId);
		res.json(courses);
	}
}
