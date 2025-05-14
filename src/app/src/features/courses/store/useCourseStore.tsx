import { create } from "zustand"

interface CourseState {
	courseId: number | undefined
	setCourseId: (courseId: number | undefined) => void
}

export const useCourseStore = create<CourseState>()(
	setter => ({
		courseId: undefined,
		setCourseId: (courseId) => setter(state => ({ ...state, courseId })),
	}),
);