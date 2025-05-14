import { Course } from "../models/Course";

export class CourseRepository {
	static async findAll() {
		return Course.findAll();
	}


	static async create(courseData: any) {
		return Course.create(courseData);
	}
	static async update(id: number, courseData: any) {
		const course = await Course.findByPk(id);
		if (!course) return null;
		return course.update(courseData);
	}

	static async remove(id: number) {
		const course = await Course.findByPk(id);
		if (!course) return null;
		await course.destroy();
		return course;
	}
}
