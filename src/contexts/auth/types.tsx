import { Route } from '@/models/Route';
import { User } from '@/models/User';

export interface IAuthContext {
  user: User | null;
  signin: (userData: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  routes: Route[] | null;
}
