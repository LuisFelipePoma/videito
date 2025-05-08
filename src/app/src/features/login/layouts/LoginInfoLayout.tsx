import { Eye } from "lucide-react";

export const LoginInfoLayout = () => {
  return (
    <div className="hidden lg:flex flex-1 bg-primary/5 relative overflow-hidden w-full">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
        </div>
      </div>
      <div className="relative z-10 flex flex-col justify-between h-full p-12">
        <div className="flex items-center space-x-2">
          <Eye className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-medium text-lighttext">FocusTrack</h1>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-medium text-lighttext leading-tight mb-4">
              Optimiza el aprendizaje <br />
              <span className="text-primary">con análisis de atención</span>
            </h2>
            <p className="text-lighttextsec max-w-md text-lg">
              Plataforma de videoconferencias con IA que analiza la atención de
              los estudiantes y proporciona informes en tiempo real.
            </p>
          </div>
          <div className="p-6 bg-white/80 rounded-lg border border-lightborder shadow-sm">
            <h3 className="text-lighttext font-medium mb-3 text-lg">
              ¿Cómo funciona?
            </h3>
            <ul className="space-y-2 text-lighttextsec">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  1
                </span>
                <span>
                  Los profesores crean cursos y comparten el código de acceso
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  2
                </span>
                <span>Los estudiantes se unen a los cursos con el código</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  3
                </span>
                <span>
                  El profesor crea salas de videoconferencia dentro del curso
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  4
                </span>
                <span>
                  La IA analiza la atención y genera informes en tiempo real
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-lighttextsec hover:text-lighttext">
            Términos
          </a>
          <a href="#" className="text-lighttextsec hover:text-lighttext">
            Privacidad
          </a>
          <a href="#" className="text-lighttextsec hover:text-lighttext">
            Contacto
          </a>
        </div>
      </div>
    </div>
  );
};
