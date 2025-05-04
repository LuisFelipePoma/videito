import { Button } from "@components/ui/Button";
import { BookOpen, Link } from "lucide-react";
import { coursesStudent } from "../data/courses";

export const StudentView = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-xl font-medium text-lighttext">Mis cursos</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {coursesStudent.map((course) => (
            <article key={course.id}>
              <header className="pb-2">
                <h2>{course.name}</h2>
                <p>{course.teacher}</p>
              </header>
              <div className="pb-2">
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      course.active ? "bg-success" : "bg-lighttextsec"
                    }`}
                  ></div>
                  <span className="text-sm text-lighttextsec">
                    {course.active
                      ? "Clase activa ahora"
                      : "Sin clases activas"}
                  </span>
                </div>
                <div className="text-xs text-lighttextsec bg-muted px-2 py-1 rounded">
                  Código: {course.code}
                </div>
              </div>
              <footer>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Ver curso
                </Button>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
