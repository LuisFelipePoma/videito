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
import { Room } from "./Room";

@Table({
  tableName: "room_report",
  timestamps: true,
  underscored: true,
  updatedAt: false,
})
export class RoomReport extends Model<RoomReport> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Room)
  @Column({ field: "rooms_id", type: DataType.INTEGER, allowNull: false })
  roomId!: number;

  @Column({ field: "overall_attention", type: DataType.DECIMAL(2, 2) })
  overallAttention?: number;

  @Column({ field: "report_data", type: DataType.JSONB })
  reportData?: object;

  @BelongsTo(() => Room)
  room?: Room;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;
}
