import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";

export class Course extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public code_access!: string;
  public users_id!: number;
  public created_at!: number;
}

Course.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(100) },
    code_access: { type: DataTypes.STRING(100), allowNull: false },
    users_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "courses",
    timestamps: false,
  }
);
