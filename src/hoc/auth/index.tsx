import { ComponentType } from 'react';
import { useAuth } from '@/contexts/auth';
import { Navigate, useLocation } from 'react-router-dom';

export function withAuth(Component: ComponentType) {
  return function AuthenticationComponent(
    props: React.ComponentProps<ComponentType>
  ) {
    const { user, routes } = useAuth();
    const { pathname } = useLocation();

    const filteredRoutes = routes?.filter((route) => route.path === pathname);

    if (!user) return <Navigate to="/login" replace />;
    if (!routes) return <Navigate to="/login" replace />;
    if (filteredRoutes?.length === 0) return <Navigate to="/" replace />;

    return <Component {...props} />;
  };
}

export function withoutAuth(Component: ComponentType) {
  return function AuthenticationComponent(
    props: React.ComponentProps<ComponentType>
  ) {
    const { user, routes } = useAuth();
    if (user) return <Navigate to="/" replace />;
    if (!routes) return <Navigate to="/login" replace />;
    return <Component {...props} />;
  };
}
