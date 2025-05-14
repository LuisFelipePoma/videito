import { Button } from "@components/ui/Buttons/Button";
import { BarChart } from "lucide-react";
import { reportsDummie } from "../data/reports";
import { CardCourse } from "../components/CardCourse";
import { useQCourses } from "@features/courses/services/useQCourses";

export const DocentView = () => {
  const { data: coursesDocent = [], isLoading } = useQCourses();

  if (isLoading || !coursesDocent) return <p>Loading ...</p>;
  return (
    <div className="space-y-8">
      {/* Lista de cursos */}
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-medium text-lighttext">Mis cursos</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {coursesDocent.map((course) => (
            <CardCourse course={course} />
          ))}
        </div>
      </section>

      {/* Últimos reportes generados */}
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-medium text-lighttext">
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
