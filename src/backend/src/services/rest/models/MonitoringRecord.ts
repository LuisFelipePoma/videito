import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";

export class MonitoringRecord extends Model {}

MonitoringRecord.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    classes_id: { type: DataTypes.INTEGER, allowNull: false },
    users_id: { type: DataTypes.INTEGER, allowNull: false },
    attention_level: { type: DataTypes.STRING(100) },
    recorded_at: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "monitoring_records",
    timestamps: false,
  }
);
