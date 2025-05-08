// src/config/database.ts
import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { EnvConfig } from "./env";
import { User } from "../services/rest/models/User";
import { Course } from "../services/rest/models/Course";
import { CourseUser } from "../services/rest/models/CourseUser";
import { Room } from "../services/rest/models/Room";
import { RoomAttention } from "../services/rest/models/RoomAttention";
import { RoomReport } from "../services/rest/models/RoomReport";
import { RoomUser } from "../services/rest/models/RoomUser";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: EnvConfig.db.host,
  port: EnvConfig.db.port,
  username: EnvConfig.db.user,
  password: EnvConfig.db.password,
  database: EnvConfig.db.name,
  models: [User, Course, CourseUser, Room, RoomUser, RoomAttention, RoomReport],
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  define: {
    underscored: true, // usa snake_case en columnas
    freezeTableName: false, // Sequelize pluraliza los nombres
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30_000,
    idle: 10_000,
  },
});

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    // Sincronizar modelos (desarrollo)
    if (EnvConfig.env === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database models synchronized");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};
