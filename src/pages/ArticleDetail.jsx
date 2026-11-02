import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';

export default function ArticleDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(
    () => api.article(id).then(setArticle).catch((err) => setError(err.message)),
    [id],
  );

  useEffect(() => { load(); }, [load]);

  const handleComment = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError('');
    try {
      await api.commentArticle(id, comment);
      setComment('');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteArticle(id);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
      setConfirmDelete(false);
    }
  };

  if (!article) {
    return error
      ? <p role="alert" className="form-error">{error}</p>
      : <p>Loading...</p>;
  }

  const isOwner = article.authorId === user.userId;

  return (
    <article className="post">
      <h1>{article.title}</h1>
      <p className="post-meta">
        Employee #{article.authorId} ·{' '}
        <time dateTime={article.createdOn}>{new Date(article.createdOn).toLocaleString()}</time>
      </p>
      <div className="post-body">{article.article}</div>

      {isOwner && (
        <div className="post-actions">
          <Link to={`/articles/${id}/edit`}>Edit</Link>
          {confirmDelete ? (
            <span role="alertdialog" aria-label="Confirm delete">
              Delete this article?{' '}
              <button type="button" onClick={handleDelete}>Yes, delete</button>{' '}
              <button type="button" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </span>
          ) : (
            <button type="button" onClick={() => setConfirmDelete(true)}>Delete</button>
          )}
        </div>
      )}

      {error && <p role="alert" className="form-error">{error}</p>}

      <section aria-labelledby="comments-title">
        <h2 id="comments-title">Comments ({article.comments.length})</h2>
        <ul className="comment-list">
          {article.comments.map((c) => (
            <li key={c.commentId}>
              <strong>Employee #{c.authorId}</strong>
              <p>{c.comment}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleComment}>
          <label htmlFor="comment">Add a comment</label>
          <textarea id="comment" rows={3} value={comment} required
            onChange={(e) => setComment(e.target.value)} />
          <button type="submit" disabled={posting}>
            {posting ? 'Posting...' : 'Comment'}
          </button>
        </form>
      </section>
    </article>
  );
}