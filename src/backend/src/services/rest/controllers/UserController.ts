import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { AppError } from "../../../middlewares/errorMiddleware";
import { CatchAsync } from "../../../utils/CatchAsync";

export class UserController {
  @CatchAsync
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await UserService.getAll();
    res.json(users);
  }

  @CatchAsync
  static async getById(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.getById(Number(req.params.id));
    if (!user) return next(new AppError("User not found", 404));
    res.json(user);
  }

  @CatchAsync
  static async create(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  }

  @CatchAsync
  static async update(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.update(Number(req.params.id), req.body);
    if (!user) return next(new AppError("User not found", 404));
    res.json(user);
  }

  @CatchAsync
  static async remove(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.remove(Number(req.params.id));
    if (!user) return next(new AppError("User not found", 404));
    res.json({ message: "User deleted" });
  }
}
