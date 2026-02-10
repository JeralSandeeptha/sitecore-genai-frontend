import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { ProtectedRouteProps } from '../../types/components.types';

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

export default ProtectedRoute;