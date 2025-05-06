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
} from "sequelize-typescript";
import { User } from "./User";
import { Room } from "./Room";

@Table({
  tableName: "room_attention",
  timestamps: true,
  underscored: true,
  createdAt: "recorded_at",
  updatedAt: false,
})
export class RoomAttention extends Model<RoomAttention> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({ field: "users_id", type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Room)
  @Column({ field: "rooms_id", type: DataType.INTEGER, allowNull: false })
  roomId!: number;

  @Column({ field: "attention_level", type: DataType.STRING(100) })
  attentionLevel?: string;

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Room)
  room?: Room;

  @CreatedAt
  @Column({ field: "recorded_at", type: DataType.DATE })
  recordedAt!: Date;
}
