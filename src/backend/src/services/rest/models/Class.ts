import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";

export class Class extends Model {}

Class.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(200) },
    access_code: { type: DataTypes.STRING(100), allowNull: false },
    courses_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    tableName: "classes",
    timestamps: false,
  }
);
