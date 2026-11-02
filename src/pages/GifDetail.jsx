import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import Comments from '../components/Comments';

export default function GifDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gif, setGif] = useState(null);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(
    () => api.gif(id).then(setGif).catch((err) => setError(err.message)),
    [id],
  );

  useEffect(() => { load(); }, [load]);

  const handleDelete = async () => {
    try {
      await api.deleteGif(id);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
      setConfirmDelete(false);
    }
  };

  if (!gif) {
    return error
      ? <p role="alert" className="form-error">{error}</p>
      : <p>Loading...</p>;
  }

  const isOwner = gif.authorId === user.userId;

  return (
    <article className="post">
      <h1>{gif.title}</h1>
      <p className="post-meta">
        Employee #{gif.authorId} ·{' '}
        <time dateTime={gif.createdOn}>{new Date(gif.createdOn).toLocaleString()}</time>
      </p>
      <img className="gif-full" src={gif.url} alt={gif.title} />

      {isOwner && (
        <div className="post-actions">
          {confirmDelete ? (
            <span role="alertdialog" aria-label="Confirm delete">
              Delete this gif?{' '}
              <button type="button" onClick={handleDelete}>Yes, delete</button>{' '}
              <button type="button" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </span>
          ) : (
            <button type="button" onClick={() => setConfirmDelete(true)}>Delete</button>
          )}
        </div>
      )}

      {error && <p role="alert" className="form-error">{error}</p>}

      <Comments
        comments={gif.comments}
        onAdd={async (text) => { await api.commentGif(id, text); await load(); }}
      />
    </article>
  );
}