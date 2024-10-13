import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div class="flex items-center justify-center min-h-screen">
  <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
</div>;

  // // Verificar si el usuario es un admin
  // const isAdmin = user?.email === "sthalin.11@gmail.com";

  // // Redirigir a /dashboard si el usuario es admin
  // if (isAdmin) {
  //   return <Navigate to="/dashboard" />;
  // }

  // Si no hay usuario, redirigir a /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
