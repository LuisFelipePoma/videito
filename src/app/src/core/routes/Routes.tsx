import Login from "@features/login/LoginPage";
import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Home from "@features/home/Home";
import { Room } from "@features/videconference/Room";
import { SocketProvider } from "@features/videconference/context/SocketContext";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "room/:id",
        element: (
          <SocketProvider url="http://localhost:3000">
            <Room />
          </SocketProvider>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
