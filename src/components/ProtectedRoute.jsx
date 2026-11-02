import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProtectedRoute({ adminOnly = false }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/signin" replace state={{ from: location }} />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}