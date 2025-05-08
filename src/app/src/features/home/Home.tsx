import { useUserStore } from "@core/context/userStore";
import { DocentView } from "./layouts/DocentView";
import { StudentView } from "./layouts/StudentView";

const Home = () => {
  // const setRoomId = useRoomStore((s) => s.setRoomId);
  const user = useUserStore((state) => state.user);
  // const navigate = useNavigate();

  // const handleJoin = () => {
  //   if (roomId.trim()) {
  //     navigate(`/app/room/${roomId}`);
  //   }
  // };
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

        <section defaultValue="teacher" className="w-full">
          {/* Vista de Profesor o estudiante*/}
          {user?.role === "docent" ? <DocentView /> : <StudentView />}
        </section>
      </main>
    </div>
  );
};

export default Home;
