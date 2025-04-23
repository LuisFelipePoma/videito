import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../../../types/role";
import { User } from "../models/User";
import { AppError } from "../../../middlewares/errorMiddleware";
import { CatchAsync } from "../../../utils/CatchAsync";
import { EnvConfig } from "../../../config/env";

export class AuthController {
  @CatchAsync
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return next(new AppError("Invalid credentials", 401));

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return next(new AppError("Invalid credentials", 401));

    const token = jwt.sign(
      { id: user.id, role: user.role },
      EnvConfig.jwt.secret as string,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  @CatchAsync
  static async register(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password, role } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return next(new AppError("Email already in use", 400));

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      role: role || Role.STUDENT,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  @CatchAsync
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("No token provided", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, EnvConfig.jwt.secret as string) as any;
      res.json({ valid: true, user: decoded });
    } catch (err) {
      return next(new AppError("Invalid token", 401));
    }
  }
}
