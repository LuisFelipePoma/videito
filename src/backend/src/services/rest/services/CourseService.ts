import { Role } from "../../../types/role";
import { CourseRepository } from "../repository/CourseRepository";
import { CourseUserRepository } from "../repository/CourseUserRepository";
import { CourseDetailsResponse, CourseResponse } from "./interfaces/CourseI";
import { UserResponse } from "./interfaces/UserI";

export class CourseService {
	static async getAll() {
		return CourseRepository.findAll();
	}

	static async getByUser(userId: number, role: Role) {
		const courses = await
			(role === Role.STUDENT ?
				CourseUserRepository.findByUserId(userId) : CourseRepository.findByUser(userId));
		// MAP DATA TO RESPONSE
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

	static async getById(id: number) {
		const course = await CourseRepository.findById(id);
		if (!course) return null;
		let courseObject: CourseDetailsResponse = {} as CourseDetailsResponse;
		courseObject.id = course.id
		courseObject.name = course.name
		courseObject.description = course.description || ""
		courseObject.codeAccess = course.codeAccess
		const creator: UserResponse = {} as UserResponse
		creator.id = course.creatorId
		creator.firstName = course.creator?.firstName || ""
		creator.lastName = course.creator?.lastName || ""
		creator.role = course.creator?.role || Role.STUDENT
		creator.email = course.creator?.email || ""
		courseObject.creator = creator
		courseObject.createdAt = course.createdAt
		courseObject.updatedAt = course.updatedAt
		courseObject.users = course?.users?.length || 0

		return courseObject;
	}
}
