import { BackButton } from "@components/ui/Buttons/BackButton";
import { Users, Calendar } from "lucide-react";
import { useParams } from "react-router";
import { useQCourseDetails } from "./services/useQCourseDetails";
import { useUserStore } from "@core/context/userStore";
import { Role } from "@core/types/user";
import { CourseDocentView } from "./layouts/CourseDocentView";
import { CourseStudentView } from "./layouts/CourseStudentView";

export const Course = () => {
  const { id } = useParams();
  const user = useUserStore((s) => s.user);

  const { data: course, isLoading } = useQCourseDetails(Number(id));

  if (isLoading || !course) return <p>is loading ...</p>;

  return (
    <div className="mx-auto max-w-7xl p-6 flex flex-col gap-5">
      <section className="flex flex-col gap-2.5">
        <BackButton text="Volver a mis cursos" />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-medium text-lighttext">{course.name}</h2>
          <div className="bg-earthbrown/20 text-earthbrown px-3 py-1.5 rounded text-sm">
            Código: {course.codeAccess}
          </div>
        </div>
        <p className="text-secondary-foreground">{course.description}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-3 mb-8">
        <article className="border border-warmgray bg-warmblack rounded-lg p-4">
          <div className="pb-2">
            <h3 className="text-lg font-medium text-lighttext">Estudiantes</h3>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondarytext" />
              <span className="text-2xl font-medium text-lighttext">
                {course.users}
              </span>
            </div>
          </div>
        </article>

        <article className="border border-warmgray bg-warmblack rounded-lg p-4">
          <div className="pb-2">
            <h3 className="text-lg font-medium text-lighttext">
              Sesiones realizadas
            </h3>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-secondarytext" />
              <span className="text-2xl font-medium text-lighttext">
                {course.users}
              </span>
            </div>
          </div>
        </article>
      </section>
      <section>
        {user?.role === Role.DOCENT ? (
          <CourseDocentView />
        ) : (
          <CourseStudentView />
        )}
      </section>
    </div>
  );
};
