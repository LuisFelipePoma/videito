import { Button } from "@components/ui/Button";
import { useUserStore } from "@core/context/userStore";
import { Eye, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

function BaseLayout() {
  const forgetUserInfo = useUserStore((s) => s.forgetUserInfo);
  const navigate = useNavigate();

  function handleLogout() {
    forgetUserInfo();
    navigate("/");
  }
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="border-b border-lightborder bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-medium text-lighttext">FocusTrack</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  JS
                </span>
              </div>
              <span className="text-sm font-medium text-lighttext">
                Juan Sánchez
              </span>
            </div>
            <Button size="sm" color="destructive" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1  overflow-auto">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default BaseLayout;
