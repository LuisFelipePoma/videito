import { useUserStore } from "@core/context/userStore";
import { DocentView } from "./layouts/DocentView";
import { StudentView } from "./layouts/StudentView";

const Home = () => {
  const user = useUserStore((state) => state.user);

  console.log(user);
  return (
    <div className="h-full">
      <main className="mx-auto max-w-7xl p-6">
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
      </main>
    </div>
  );
};

export default Home;
