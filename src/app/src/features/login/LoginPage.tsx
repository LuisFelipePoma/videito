import { Eye } from "lucide-react";
import { TabToggle } from "@components/ui/TabToggle";
import { useEffect, useState } from "react";
import { RegisterLayout } from "./layouts/RegisterLayout";
import { LoginLayout } from "./layouts/LoginLayout";
import { LoginInfoLayout } from "./layouts/LoginInfoLayout";
import { useUserStore } from "@core/context/userStore";
import { useNavigate } from "react-router";

const loginTabs = [
  { value: "login", label: "Iniciar Sesión" },
  { value: "register", label: "Registrarse" },
];

const Login = () => {
  const [activeTab, setActiveTab] = useState(loginTabs[0].value);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex h-full w-full flex-col lg:flex-row">
        {/* Left side - form */}
        <div className="flex flex-1 items-center justify-center p-6">
          <article className="w-full px-5 py-2  max-w-md border-1 border-lightborder bg-lightcard shadow-lg rounded-lg flex flex-col gap-2.5">
            <header className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-medium text-lighttext">
                Bienvenido a FocusTrack
              </h2>
              <p className="text-lighttextsec">
                Videoconferencias con análisis de atención en tiempo real
              </p>
            </header>
            <div className="w-full flex flex-col gap-2.5">
              <TabToggle
                tabs={loginTabs}
                value={activeTab}
                setValue={setActiveTab}
              />
              {activeTab === "login" ? <LoginLayout /> : <RegisterLayout />}
            </div>
            <footer className="flex justify-center text-sm text-lighttextsec">
              <p>© 2025 FocusTrack. Todos los derechos reservados.</p>
            </footer>
          </article>
        </div>

        {/* Right side - decorative */}
        <LoginInfoLayout />
      </div>
    </div>
  );
};

export default Login;
