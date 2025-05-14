import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";

function BaseLayout() {

  const location = useLocation()
  const [isRoom, setIsRoom] = useState(false);


  useEffect(() => {
    setIsRoom(location.pathname.includes("room"));
  }, [location]);

  return (
    <div className="w-screen h-screen flex flex-col">
      {!isRoom && <Navbar />}
      <main className="flex-1 overflow-auto">
        <div className={`${isRoom ? "h-full w-full" : "flex flex-col gap-5 mx-auto max-w-7xl p-6 "}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default BaseLayout;
