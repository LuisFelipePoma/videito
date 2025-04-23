import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";

export class ClassReport extends Model {}

ClassReport.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    classes_id: { type: DataTypes.INTEGER, allowNull: false },
    overall_attention: { type: DataTypes.DECIMAL(2, 2) },
    report_data: { type: DataTypes.JSONB },
    generated_at: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "class_reports",
    timestamps: false,
  }
);
