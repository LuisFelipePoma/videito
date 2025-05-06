// index.ts (tu archivo principal)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { dbConnect } from "./config/db";
import apiRoutes from "./services/rest/routes/routes";
import { errorHandler } from "./middlewares/errorMiddleware";

import { initMediaSoup } from "./services/rooms/mediasoup";
import { initSocket } from "./services/rooms/socket";
import { Server as IOServer } from "socket.io";

dotenv.config();
const app = express();
const httpServer = createServer(app);

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
(async () => {
  await initMediaSoup(); // crea workers
  const io = new IOServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });
  initSocket(io);
})();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
