import { Router } from "express";
import { RoomController } from "../controllers/RoomController";

const router = Router();

router.get("/courses/:id", RoomController.getActive); // Solo TEACHER

export default router;
