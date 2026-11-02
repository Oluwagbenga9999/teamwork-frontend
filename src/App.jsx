import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import Feed from './pages/Feed';
import ArticleNew from './pages/ArticleNew';
import ArticleEdit from './pages/ArticleEdit';
import ArticleDetail from './pages/ArticleDetail';
import GifNew from './pages/GifNew';
import GifDetail from './pages/GifDetail';
import CreateUser from './pages/CreateUser';

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
          <Route path="gifs/new" element={<GifNew />} />
          <Route path="gifs/:id" element={<GifDetail />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<Layout />}>
          <Route path="admin/create-user" element={<CreateUser />} />
        </Route>
      </Route>
      <Route path="*" element={<p>Page not found.</p>} />
    </Routes>
  );
}