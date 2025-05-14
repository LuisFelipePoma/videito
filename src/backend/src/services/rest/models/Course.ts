import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
	ForeignKey,
	BelongsToMany,
	CreatedAt,
	UpdatedAt,
	BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { CourseUser } from "./CourseUser";

@Table({
	tableName: "courses",
	timestamps: true,
	underscored: true,
})
export class Course extends Model<Course> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@AllowNull(false)
	@Column(DataType.STRING(100))
	name!: string;

	@Column(DataType.STRING(100))
	description?: string;

	@AllowNull(false)
	@Column(DataType.STRING(100))
	codeAccess!: string;

	@ForeignKey(() => User)
	@Column({ field: "users_id", type: DataType.INTEGER, allowNull: false })
	creatorId!: number;

	@BelongsTo(() => User, { foreignKey: 'creatorId', as: 'creator' })
	creator?: User;
	
	@BelongsToMany(() => User, () => CourseUser)
	users?: User[];

	@CreatedAt
	@Column({ field: "created_at", type: DataType.DATE })
	createdAt!: Date;

	@UpdatedAt
	@Column({ field: "updated_at", type: DataType.DATE })
	updatedAt!: Date;
}
