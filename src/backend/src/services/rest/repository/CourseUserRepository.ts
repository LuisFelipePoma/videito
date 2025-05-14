import { CourseUser } from "../models/CourseUser";
export class CourseUserRepository {
	static async findAll() {
		return CourseUser.findAll();
	}

	// find courses for a single student, return array of Course[]
	static async findByUserId(userId: number) {
		const courseUsers = await CourseUser.findAll({
			where: { userId },
			include: [{ association: 'course', include: ['users'] }]
		});

		const courses = courseUsers.map(cu => cu.course).filter(Boolean);
		return courses
	}
}
