import { Role } from "aws-sdk/clients/budgets";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EnvConfig } from "../config/env";

export function authMiddleware(roles: Role[] = []) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No token provided" });
      return;
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, EnvConfig.jwt.secret as string) as any;
      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({ error: "Forbidden: insufficient role" });
        return;
      }
      (req as any).user = decoded;
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
  };
}
