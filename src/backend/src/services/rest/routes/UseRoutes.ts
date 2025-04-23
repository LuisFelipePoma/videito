import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Role } from "../../../types/role";
import { authMiddleware } from "../../../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware([Role.TEACHER]), UserController.getAll); // Solo TEACHER
router.post("/", authMiddleware([Role.TEACHER]), UserController.create); // Solo TEACHER
router.get("/:id", authMiddleware([Role.TEACHER]), UserController.getById); // Solo TEACHER

export default router;
