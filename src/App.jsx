import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import Feed from './pages/Feed';
import ArticleNew from './pages/ArticleNew';
import ArticleEdit from './pages/ArticleEdit';
import ArticleDetail from './pages/ArticleDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="articles/new" element={<ArticleNew />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="articles/:id/edit" element={<ArticleEdit />} />
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