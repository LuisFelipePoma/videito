import { useUserStore } from "@core/context/userStore";
import BaseLayout from "@layouts/BaseLayout";
import { Navigate } from "react-router";

const ProtectedRoute = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  return isAuthenticated ? <BaseLayout /> : <Navigate to="/" />;
};

export default ProtectedRoute;
