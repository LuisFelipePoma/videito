import { useQuery } from "@tanstack/react-query";
import { CourseDetailsResponse } from "./types";
import ClientApi from "@core/api/axios";

export const useQCourseDetails = (id: number) => {
	return useQuery({
		queryKey: ["course-details", id],
		queryFn: () => {
			return getCourseDetails(id);
		},
	});
};

// CALLS
async function getCourseDetails(id: number) {
	const response = await ClientApi.courses.get<CourseDetailsResponse>(`/${id}}`);
	return response.data;
}