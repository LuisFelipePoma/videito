import { Button } from "@components/ui/Buttons/Button";
import { BarChart, Video } from "lucide-react";
import { Link } from "react-router";
// Datos de ejemplo para sesiones pasadas
const pastSessions = [
  {
    id: 1,
    title: "Introducción al Álgebra",
    date: "15 Mar 2025",
    duration: "1h 20m",
    attendees: 22,
    avgAttention: 78,
  },
  {
    id: 2,
    title: "Ecuaciones Lineales",
    date: "18 Mar 2025",
    duration: "1h 45m",
    attendees: 20,
    avgAttention: 82,
  },
  {
    id: 3,
    title: "Sistemas de Ecuaciones",
    date: "22 Mar 2025",
    duration: "1h 30m",
    attendees: 23,
    avgAttention: 75,
  },
];
export const CourseDocentView = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-lighttext">
            Crear una nueva clase
          </h3>
        </div>
        <article className="border border-warmgray bg-warmblack rounded-lg">
          <div className="p-4">
            <h3 className="text-lg font-medium text-lighttext">
              Iniciar videoconferencia
            </h3>
            <p className="text-secondarytext text-sm">
              Crea una nueva sala para este curso
            </p>
          </div>
          <div className="px-4 pb-2 space-y-4">
            <h3 className="text-sm font-medium text-secondarytext">
              Título de la clase
            </h3>
            <div className="flex gap-2.5">
              <input
                type="text"
                placeholder="Ej: Introducción a Derivadas"
                className="w-full flex-1 rounded-md border border-warmgray/70 bg-warmgray p-2 text-sm h-10"
              />
              <Link to="/app/room/123">
                <Button color="primary" className="flex gap-2.5">
                  <Video className="h-4 w-4" />
                  Iniciar Clase
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
      <div>
        <h3 className="text-xl font-medium text-lighttext mb-4">
          Sesiones anteriores
        </h3>
        <div className="overflow-hidden rounded-lg border border-warmgray">
          <table className="w-full text-sm">
            <thead className="bg-warmgray">
              <tr>
                <th className="px-4 py-3 text-left text-lighttext">Título</th>
                <th className="px-4 py-3 text-left text-lighttext">Fecha</th>
                <th className="px-4 py-3 text-left text-lighttext">Duración</th>
                <th className="px-4 py-3 text-left text-lighttext">
                  Asistentes
                </th>
                <th className="px-4 py-3 text-left text-lighttext">Atención</th>
                <th className="px-4 py-3 text-left text-lighttext">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warmgray">
              {pastSessions.map((session) => (
                <tr key={session.id} className="bg-warmblack">
                  <td className="px-4 py-3 text-lighttext">{session.title}</td>
                  <td className="px-4 py-3 text-secondarytext">
                    {session.date}
                  </td>
                  <td className="px-4 py-3 text-secondarytext">
                    {session.duration}
                  </td>
                  <td className="px-4 py-3 text-secondarytext">
                    {session.attendees}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-12 h-2 bg-warmgray rounded-full overflow-hidden mr-2">
                        <div
                          className={`h-full ${
                            session.avgAttention > 80
                              ? "bg-success"
                              : session.avgAttention > 60
                              ? "bg-warning"
                              : "bg-error"
                          }`}
                          style={{ width: `${session.avgAttention}%` }}
                        ></div>
                      </div>
                      <span className="text-secondarytext">
                        {session.avgAttention}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/report/${session.id}`}>
                      <a className="inline-flex items-center justify-center border border-warmgray/70 text-secondarytext hover:bg-warmgray/80 py-1 px-3 rounded text-sm">
                        <BarChart className="h-3 w-3 mr-1" />
                        Reporte
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
