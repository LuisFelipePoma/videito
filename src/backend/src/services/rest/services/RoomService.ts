import { RoomRepository } from "../repository/RoomRepository";

export class RoomService {
	static async getActive(courseId: number) {
		return RoomRepository.findActive(courseId);
	}

}
