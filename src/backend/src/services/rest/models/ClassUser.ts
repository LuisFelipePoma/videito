import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";

export class ClassUser extends Model {}

ClassUser.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    classes_id: { type: DataTypes.INTEGER, allowNull: false },
    users_id: { type: DataTypes.INTEGER, allowNull: false },
    joined_at: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "class_users",
    timestamps: false,
  }
);
