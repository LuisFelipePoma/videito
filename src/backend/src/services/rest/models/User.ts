import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from "sequelize-typescript";
import { Course } from "./Course";
import { CourseUser } from "./CourseUser";
import { Room } from "./Room";
import { RoomUser } from "./RoomUser";
import { Role } from "../../../types/role";

@Table({
  tableName: "users",
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Default(Role.STUDENT)
  @Column(DataType.ENUM(Role.TEACHER, Role.STUDENT))
  role!: Role;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;

  @BelongsToMany(() => Course, () => CourseUser)
  courses?: Course[];

  @BelongsToMany(() => Room, () => RoomUser)
  rooms?: Room[];
}
