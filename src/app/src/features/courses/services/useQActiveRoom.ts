import { useQuery } from "@tanstack/react-query";
import ClientApi from "@core/api/axios";
import { Room } from "./types";

export const useQActiveRoom = (courseId: number) => {
	return useQuery({
		queryKey: ["courses", courseId],
		queryFn: () => {

			return getCourseActiveRoom(courseId);
		},
	});
};

// CALLS
async function getCourseActiveRoom(courseId: number) {
	const response = await ClientApi.rooms.get<Room | null>(`/courses/${courseId}`);
	return response.data;
}