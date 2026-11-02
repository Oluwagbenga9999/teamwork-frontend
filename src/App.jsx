import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import Feed from './pages/Feed';

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Feed />} />
          {/* next branches: /articles/new, /articles/:id, /gifs/new, /gifs/:id */}
        </Route>
      </Route>
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<Layout />}>
          {/* next branch: /admin/create-user */}
        </Route>
      </Route>
      <Route path="*" element={<p>Page not found.</p>} />
    </Routes>
  );
}