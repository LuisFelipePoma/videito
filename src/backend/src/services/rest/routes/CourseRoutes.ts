import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

const router = Router();

router.get("/", CourseController.getAll);
router.get("/users/:id", CourseController.getByUser);
router.get("/:id", CourseController.getById);

export default router;
