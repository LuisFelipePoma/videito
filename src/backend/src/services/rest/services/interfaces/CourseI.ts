import { User } from "../../models/User"
import { UserResponse } from "./UserI"

export interface CourseResponse {
	"id": number
	"name": string
	"description": string
	"codeAccess": string
	"creatorId": number
	"createdAt": Date
	"updatedAt": Date
	"users": number
}

export interface CourseDetailsResponse {
	"id": number
	"name": string
	"description": string
	"codeAccess": string
	"creator": UserResponse | undefined
	"createdAt": Date
	"updatedAt": Date
	"users": number
}