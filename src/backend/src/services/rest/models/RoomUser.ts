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
import { Room } from "./Room";
import { User } from "./User";

@Table({
  tableName: "room_users",
  timestamps: true,
  underscored: true,
})
export class RoomUser extends Model<RoomUser> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Room)
  @Column({ field: "classes_id", type: DataType.INTEGER, allowNull: false })
  roomId!: number;

  @ForeignKey(() => User)
  @Column({ field: "users_id", type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => Room)
  room?: Room;

  @BelongsTo(() => User)
  user?: User;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
