import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { PublicRouteProps } from '../../types/components.types';

const PublicRoute = (props: PublicRouteProps) => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/chat" replace />;
  }
  return props.children;
};

export default PublicRoute;