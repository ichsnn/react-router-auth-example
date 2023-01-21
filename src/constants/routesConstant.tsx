export const routes = {
  HOME: {
    name: 'home',
    path: '/',
  },
  LOGIN: {
    name: 'login',
    path: '/login',
  },
  ADMIN: {
    name: 'admin',
    path: '/admin',
  },
  USER: {
    name: 'user',
    path: '/user',
  },
};

export const adminRoutes = [routes.ADMIN];

export const userRoutes = [routes.USER];

export const publicRoutes = [routes.HOME, routes.LOGIN];
