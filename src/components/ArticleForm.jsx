import { useState } from 'react';

export default function ArticleForm({
  heading, submitLabel, onSubmit, initial = { title: '', article: '' },
}) {
  const [title, setTitle] = useState(initial.title);
  const [article, setArticle] = useState(initial.article);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSubmit({ title, article });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>{heading}</h1>

      <label htmlFor="title">Title</label>
      <input id="title" value={title} required maxLength={200}
        onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="article">Article</label>
      <textarea id="article" rows={12} value={article} required
        onChange={(e) => setArticle(e.target.value)} />

      {error && <p role="alert" className="form-error">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}