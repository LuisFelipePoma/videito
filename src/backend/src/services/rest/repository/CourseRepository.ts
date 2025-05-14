import { Course } from "../models/Course";

export class CourseRepository {
	static async findAll() {
		return Course.findAll();
	}

	static async findByUser(userId: number) {
		const courses = await Course.findAll({
			where: { creatorId: userId },
			include: [{ association: 'users' }]
		});
		return courses;
	}

	static async findById(id: number) {
		return Course.findByPk(id, {
			include: [{ association: 'users' }, { association: "creator" }]
		});
	}


	// static async create(courseData: any) {
	// 	return Course.create(courseData);
	// }
	// static async update(id: number, courseData: any) {
	// 	const course = await Course.findByPk(id);
	// 	if (!course) return null;
	// 	return course.update(courseData);
	// }

	// static async remove(id: number) {
	// 	const course = await Course.findByPk(id);
	// 	if (!course) return null;
	// 	await course.destroy();
	// 	return course;
	// }
}
