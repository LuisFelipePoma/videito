import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { dbConnect } from "./config/db";
import apiRoutes from "./services/rest/routes/routes";
import { errorHandler } from "./middlewares/errorMiddleware";
import { Server as SocketIOServer } from "socket.io";
import { setupSocketServer } from "./services/rooms/socket";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // Ajusta para mayor seguridad
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión DB y rutas REST
dbConnect();
app.use("/api/v1", apiRoutes);
app.use(errorHandler);

// Arrancamos MediaSoup y Socket.IO
setupSocketServer(io);

// CREATE LISTENERS
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
