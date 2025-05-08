import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { User } from "./User";
import { Course } from "./Course";

@Table({
  tableName: "course_users",
  timestamps: true,
  underscored: true,
})
export class CourseUser extends Model<CourseUser> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Course)
  @Column({ field: "courses_id", type: DataType.INTEGER, allowNull: false })
  courseId!: number;

  @ForeignKey(() => User)
  @Column({ field: "users_id", type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => Course)
  course?: Course;

  @BelongsTo(() => User)
  user?: User;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
