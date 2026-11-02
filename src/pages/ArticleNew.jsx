import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import ArticleForm from '../components/ArticleForm';

export default function ArticleNew() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const data = await api.createArticle(values);
    navigate(`/articles/${data.articleId}`);
  };

  return <ArticleForm heading="New article" submitLabel="Publish" onSubmit={handleSubmit} />;
}