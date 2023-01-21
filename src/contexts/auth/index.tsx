import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IAuthContext } from './types';
import { User } from '@/models/User';
import { getRoutes } from '@/routes';
import { Route } from '@/models/Route';
import { publicRoutes } from '@/constants/routesConstant';

export const AuthContext = createContext<IAuthContext>(null!);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [routes, setRoutes] = useState<Route[] | null>(publicRoutes);

  function signin(userData: User | null, callback: VoidFunction) {
    setUser(userData);
    const routes = getRoutes(userData!.role);
    setRoutes(routes);
    callback();
  }

  function signout(callback: VoidFunction) {
    setUser(null);
    setRoutes(publicRoutes);
    callback();
  }

  return (
    <AuthContext.Provider value={{ user, signin, signout, routes }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export function useAuth() {
  return useContext(AuthContext);
}
