import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";

export class CourseUser extends Model {}

CourseUser.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    courses_id: { type: DataTypes.INTEGER, allowNull: false },
    users_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "course_users",
    timestamps: false,
  }
);
