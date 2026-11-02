import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Layout() {
  const { user, signOut } = useAuth();

  return (
    <>
      <header className="site-header">
        <nav aria-label="Main">
          <NavLink to="/" end>Feed</NavLink>
          <NavLink to="/articles/new">New article</NavLink>
          <NavLink to="/gifs/new">New gif</NavLink>
          {user.isAdmin && <NavLink to="/admin/create-user">Create employee</NavLink>}
          <button type="button" onClick={signOut}>Sign out</button>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </>
  );
}