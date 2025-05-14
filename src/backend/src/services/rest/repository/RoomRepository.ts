import { Room } from "../models/Room";

export class RoomRepository {

	// find courses for a single student, return array of Course[]
	static async findActive(courseId: number) {
		return Room.findOne({
			where: {
				isActive: true,
				courseId: courseId
			},
		},
		);
	}
}
