import { useQActiveRoom } from '@features/courses/services/useQActiveRoom'
import { useCourseStore } from '@features/courses/store/useCourseStore'
import { CreateCourseRoom } from './CreateCourseRoom'
import { JoinCourseRoom } from './JoinCourseRoom'

export const HandleCourseRoom = () => {
	const courseId = useCourseStore((s) => s.courseId)
	const { data: room, isLoading } = useQActiveRoom(courseId || 0)

	if (isLoading || room === undefined) return <p>Loading...</p>
	return (<section className="flex flex-col gap-2.5">
		<div className="flex justify-between items-center">
			<h3 className="text-xl font-medium text-lighttext">
				{room ? "Unirse a una clase" : "Crear una nueva clase"}
			</h3>
		</div>
		{room ? <JoinCourseRoom room={room} /> : <CreateCourseRoom />}
	</section>)

}
