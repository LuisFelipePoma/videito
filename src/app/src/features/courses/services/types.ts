import { User } from "@core/types/user"

export interface CourseResponse {
	id: number
	name: string
	description: string
	codeAccess: string
	creatorId: number
	createdAt: Date
	updatedAt: Date
	users: number
}

export interface CourseDetailsResponse {
	id: number
	name: string
	description: string
	codeAccess: string
	creatorId: User
	createdAt: Date
	updatedAt: Date
	users: number
}

