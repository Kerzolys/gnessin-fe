import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../services/zustand/store";
import { Preloader } from "../../components/preloader/preloader";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Preloader />;
  return user ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
