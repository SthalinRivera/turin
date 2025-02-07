import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, requiredRoles }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      </div>
    );

  // Si no hay usuario, redirigir a /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Obtener el rol del usuario desde localStorage
  const userRole = localStorage.getItem("userRole") || "guest";

  // Si se requiere un rol específico, verificar si el usuario tiene ese rol
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
