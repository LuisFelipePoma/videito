import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { EnvConfig } from "./env";

dotenv.config();

export const sequelize = new Sequelize(
  EnvConfig.db.name,
  EnvConfig.db.user,
  EnvConfig.db.password,
  {
    host: EnvConfig.db.host,
    dialect: "postgres",
    logging: EnvConfig.env === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

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
