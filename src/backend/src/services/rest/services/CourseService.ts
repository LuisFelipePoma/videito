import { Role } from "../../../types/role";
import { Course } from "../models/Course";
import { CourseRepository } from "../repository/CourseRepository";
import { CourseUserRepository } from "../repository/CourseUserRepository";
import { CourseResponse } from "./interfaces/CourseI";

export class CourseService {
	static async getAll() {
		return CourseRepository.findAll();
	}

	static async getByUser(studentId: number, role: Role) {
		const courses = await
			(role === Role.STUDENT ?
				CourseUserRepository.findByUserId(studentId) : Course.findAll({
					where: { creatorId: studentId },
					include: [{ association: 'users' }]
				}));
		console.log(courses)
		// add a new property to each course, the number of students in the course
		const response = courses.map(course => {
			let courseObject: CourseResponse = {} as CourseResponse;
			if (course) {
				courseObject.id = course.id
				courseObject.name = course.name
				courseObject.description = course.description || ""
				courseObject.codeAccess = course.codeAccess
				courseObject.creatorId = course.creatorId
				courseObject.createdAt = course.createdAt
				courseObject.updatedAt = course.updatedAt
				courseObject.users = course?.users?.length || 0
			}
			return courseObject;
		});
		return response;
	}
}
