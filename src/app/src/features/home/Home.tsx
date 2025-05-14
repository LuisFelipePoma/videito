import { useUserStore } from "@core/context/userStore";
import { DocentView } from "./layouts/DocentView";
import { StudentView } from "./layouts/StudentView";

const Home = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-medium text-lighttext">
          Bienvenido, {user!.firstName}
        </h2>
        <p className="text-lighttextsec">
          Gestiona tus cursos y videoconferencias
        </p>
      </section>

      <section className="w-full">
        {/* Vista de Profesor o estudiante*/}
        {user?.role === "docent" ? <DocentView /> : <StudentView />}
      </section>
    </div>
  );
};

export default Home;
