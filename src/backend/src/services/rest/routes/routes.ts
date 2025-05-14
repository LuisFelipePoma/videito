import { Router } from "express";
import routerAuth from "./AuthRoutes";
import routerUsers from "./UserRoutes";
import routerCourse from "./CourseRoutes";
import routerRoom from "./RoomRoutes";
const router = Router();

router.use("/users", routerUsers); // Gestión de usuarios (CRUD)
router.use("/auth", routerAuth); // Login, registro, etc.
router.use("/courses", routerCourse)
router.use("/rooms", routerRoom)
// router.use("/sfu", sfuRoutes); // Señalización y control SFU (MediaSoup)
// router.use("/inference", inferenceRoutes); // Conexión a SageMaker
// router.use("/storage", storageRoutes); // Subida/descarga a S3

export default router;
