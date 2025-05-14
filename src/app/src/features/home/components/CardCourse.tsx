import { Button } from "@components/ui/Buttons/Button";
import { CourseResponse } from "@features/courses/services/types";
import { BookOpen, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface Props {
  course: CourseResponse;
}
export const CardCourse: React.FC<Props> = ({ course }) => {
  return (
    <article key={course.id} className="border-1 px-3 py-2 rounded-md">
      <header className="pb-2">
        <div className="flex justify-between items-center">
          <h2>{course.name}</h2>
          <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
            Código: {course.codeAccess}
          </div>
        </div>
      </header>
      <div className="pb-2">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-lighttextsec" />
          <span className="text-sm text-lighttextsec">
            {course.users} estudiantes
          </span>
        </div>
      </div>
      <footer>
        <Link to={`/app/course/${course.id}`}>
          <Button className="w-full flex gap-1.5">
            <BookOpen className="h-4 w-4" />
            Ver curso
          </Button>
        </Link>
      </footer>
    </article>
  );
};
