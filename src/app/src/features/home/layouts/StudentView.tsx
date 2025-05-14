import { useQCourses } from "@features/courses/services/useQCourses";
import { CardCourse } from "../components/CardCourse";

export const StudentView = () => {
  const { data: coursesStudent = [], isLoading } = useQCourses();

  if (isLoading || !coursesStudent) return <p>Loading ...</p>;
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-medium text-lighttext">Mis cursos</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {coursesStudent.map((course) => (
            <CardCourse course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};
