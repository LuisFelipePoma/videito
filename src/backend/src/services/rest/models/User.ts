import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db";
import { Role } from "../../../types/role";

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public role!: Role;
  public created_at!: Date;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Role.TEACHER, Role.STUDENT),
      allowNull: false,
      defaultValue: Role.STUDENT,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
