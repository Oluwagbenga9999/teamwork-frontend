import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import ArticleForm from '../components/ArticleForm';

export default function ArticleEdit() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.article(id).then(setArticle).catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p role="alert" className="form-error">{error}</p>;
  if (!article) return <p>Loading...</p>;
  if (article.authorId !== user.userId) {
    return <p role="alert" className="form-error">You can only edit your own articles.</p>;
  }

  const handleSubmit = async (values) => {
    await api.editArticle(id, values);
    navigate(`/articles/${id}`);
  };

  return (
    <ArticleForm
      heading="Edit article"
      submitLabel="Save changes"
      initial={{ title: article.title, article: article.article }}
      onSubmit={handleSubmit}
    />
  );
}