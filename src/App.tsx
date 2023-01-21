import {
  Link,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/auth';
import { withAuth, withoutAuth } from './hoc/auth';

export default function App() {
  return (
    <AuthProvider>
      <h1>React Router Auth Example</h1>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/about">About - Example Not Found</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function AuthStatus() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  if (!user) return <p>Not logged in</p>;
  return (
    <div>
      <p>
        Logged in as {user.username}. You can access {user.role} content.
      </p>
      <button type="button" onClick={() => signout(() => navigate('/'))}>
        Logout
      </button>
    </div>
  );
}

const LoginView = withoutAuth(() => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get('username') as string,
      role: data.get('role') as string,
    };
    signin(userData, () => {
      navigate('/');
    });
  }
  return (
    <div>
      <h2>Login View</h2>
      <p>
        This is login page. You can login as admin or user. You can also login
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            title="username"
            placeholder="Username"
            required
          />
          <select name="role" title="role" required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
});

function PublicView() {
  return (
    <div>
      <h2>Public View</h2>
      <p>Anyone can see this page. This is public page.</p>
    </div>
  );
}

const AdminView = withAuth(() => {
  const { listUser }: any = useLoaderData();

  return (
    <div>
      <h2>Admin View</h2>
      <p>Only admins can see this page.</p>
      <ul>
        {listUser.data.map((user: any) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
});

const UserView = withAuth(() => {
  return (
    <div>
      <h2>User View</h2>
      <p>Only users can see this page.</p>
    </div>
  );
});

const ErrorView = () => {
  return (
    <div>
      <h2>Error View</h2>
      <p>Something went wrong.</p>
    </div>
  );
};

async function loader() {
  const data = await fetch('https://reqres.in/api/users?page=1');
  const listUser = await data.json();
  return { listUser };
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PublicView />,
      },
      {
        path: '/admin',
        element: <AdminView />,
        loader: loader,
      },
      {
        path: '/user',
        element: <UserView />,
      },
      {
        path: '/login',
        element: <LoginView />,
      },
      {
        path: '*',
        element: <ErrorView />,
      },
    ],
  },
]);
