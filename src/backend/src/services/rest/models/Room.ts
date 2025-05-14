import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
	ForeignKey,
	BelongsTo,
	BelongsToMany,
	HasMany,
	CreatedAt,
	UpdatedAt,
} from "sequelize-typescript";
import { Course } from "./Course";
import { User } from "./User";
import { RoomUser } from "./RoomUser";
import { RoomAttention } from "./RoomAttention";
import { RoomReport } from "./RoomReport";

@Table({
	tableName: "rooms",
	timestamps: true,
	underscored: true,
})
export class Room extends Model<Room> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@AllowNull(false)
	@Column(DataType.STRING(100))
	title!: string;

	@Column(DataType.STRING(200))
	description?: string;

	@AllowNull(false)
	@Column({ field: "access_code", type: DataType.STRING(100) })
	accessCode!: string;

	@ForeignKey(() => Course)
	@Column({ field: "courses_id", type: DataType.INTEGER, allowNull: false })
	courseId!: number;

	@Column({ field: "is_active", type: DataType.BOOLEAN, defaultValue: true })
	isActive!: boolean;

	@BelongsTo(() => Course)
	course?: Course;

	@BelongsToMany(() => User, () => RoomUser)
	users?: User[];

	@HasMany(() => RoomAttention)
	attentions?: RoomAttention[];

	@HasMany(() => RoomReport)
	reports?: RoomReport[];

	@CreatedAt
	@Column({ field: "created_at", type: DataType.DATE })
	createdAt!: Date;

	@UpdatedAt
	@Column({ field: "updated_at", type: DataType.DATE })
	updatedAt!: Date;

	@Column({ field: "ended_at", type: DataType.DATE })
	endedAt?: Date;
}
