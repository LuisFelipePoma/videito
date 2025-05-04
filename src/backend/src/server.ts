import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { dbConnect } from "./config/db";
import { initializeMediaSoup } from "./services/sfu/sfu";
import apiRoutes from "./services/rest/routes/routes";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();
const app = express();
const httpServer = createServer(app);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
dbConnect();

// Rutas API REST
app.use("/api/v1", apiRoutes);
// Este va al final
app.use(errorHandler);

// Inicialización de servicios
// initializeSockets(httpServer);
initializeMediaSoup(httpServer);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Manejo de errores no capturados
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

export default app;
