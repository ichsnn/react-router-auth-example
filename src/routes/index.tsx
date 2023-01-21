import { adminRoutes, userRoutes } from '@/constants/routesConstant';
import { UserRole } from '@/models/User';

export const routes = {
  admin: adminRoutes,
  user: userRoutes,
};

export const getRoutes = (role: UserRole) => {
  return routes[role];
};
