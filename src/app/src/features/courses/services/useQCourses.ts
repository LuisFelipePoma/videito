import { useQuery } from "@tanstack/react-query";
import { CourseResponse } from "./types";
import ClientApi from "@core/api/axios";
import { useUserStore } from "@core/context/userStore";
import { Role } from "@core/types/user";


export const useQCourses = () => {
	const user = useUserStore(s => s.user)
	return useQuery({
		queryKey: ["courses", user?.role],
		queryFn: () => {
			if (!user) return null;
			return getCourses(user?.id, user?.role);
		},
		enabled: !!user?.id,
	});
};

// CALLS
async function getCourses(userId: number, role: Role) {
	const response = await ClientApi.courses.get<CourseResponse[]>(`/users/${userId}?role=${role}`);
	return response.data;
}