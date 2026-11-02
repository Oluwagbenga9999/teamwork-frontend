import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Feed() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.feed()
      .then((data) => active && setItems(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  if (loading) return <p>Loading feed...</p>;
  if (error) return <p role="alert" className="form-error">{error}</p>;
  if (items.length === 0) return <p>No posts yet. Be the first to share something.</p>;

  return (
    <section aria-labelledby="feed-title">
      <h1 id="feed-title">Feed</h1>
      <ul className="feed-list">
        {items.map((item) => (
          <li key={`${item.type}-${item.id}`} className="feed-card">
            <span className="badge">{item.type}</span>
            <h2>
              <Link to={`/${item.type === 'gif' ? 'gifs' : 'articles'}/${item.id}`}>
                {item.title}
              </Link>
            </h2>
            {item.type === 'gif'
              ? <img src={item.url} alt={item.title} loading="lazy" />
              : <p>{item.article.slice(0, 160)}{item.article.length > 160 ? '…' : ''}</p>}
            <time dateTime={item.createdOn}>{new Date(item.createdOn).toLocaleString()}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}