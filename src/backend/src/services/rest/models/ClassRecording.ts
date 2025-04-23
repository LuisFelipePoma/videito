import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";

export class ClassRecording extends Model {}

ClassRecording.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    classes_id: { type: DataTypes.INTEGER, allowNull: false },
    recording_s3: { type: DataTypes.STRING(100) },
    recorded_at: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "class_recording",
    timestamps: false,
  }
);
