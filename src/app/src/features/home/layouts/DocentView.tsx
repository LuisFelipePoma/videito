import { Button } from "@components/ui/Button";
import { BarChart, BookOpen, Users } from "lucide-react";
import { reportsDummie } from "../data/reports";
import { coursesDocent } from "../data/courses";

export const DocentView = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-lighttext mb-4">Mis cursos</h3>
      </div>

      {/* Lista de cursos */}
      <section className="grid gap-4 md:grid-cols-3">
        {coursesDocent.map((course) => (
          <article key={course.id}>
            <header className="pb-2">
              <div className="flex justify-between items-center">
                <h2>{course.name}</h2>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  Código: {course.code}
                </div>
              </div>
              <p>{course.sessions} sesiones realizadas</p>
            </header>
            <div className="pb-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-lighttextsec" />
                <span className="text-sm text-lighttextsec">
                  {course.students} estudiantes
                </span>
              </div>
            </div>
            <footer>
              <Button className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Ver curso
              </Button>
            </footer>
          </article>
        ))}
      </section>

      {/* Últimos reportes generados */}
      <section>
        <h3 className="mb-4 text-xl font-medium text-lighttext">
          Últimos reportes generados
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {reportsDummie.map((report, i) => (
            <article key={i} className="border-1 px-3 py-1 rounded-md">
              <header className="pb-2">
                <h2 className="font-bold">{report.topic}</h2>
                <p className="text-sm">{report.course}</p>
              </header>
              <div className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lighttextsec">
                      Nivel de atención promedio
                    </span>
                    <span className="text-sm font-medium text-lighttext">
                      {report.attention}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        report.attention > 80
                          ? "bg-success"
                          : report.attention > 60
                          ? "bg-warning"
                          : "bg-error"
                      }`}
                      style={{ width: `${report.attention}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-lighttextsec">
                      {report.date}
                    </span>
                  </div>
                </div>
              </div>
              <footer>
                <Button className="w-full" color="success">
                  <BarChart className="mr-2 h-4 w-4" />
                  Ver informe completo
                </Button>
              </footer>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
