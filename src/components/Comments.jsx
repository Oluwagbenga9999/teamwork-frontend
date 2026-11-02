import { useState } from 'react';

export default function Comments({ comments, onAdd }) {
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError('');
    try {
      await onAdd(text);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title">Comments ({comments.length})</h2>
      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.commentId}>
            <strong>Employee #{c.authorId}</strong>
            <p>{c.comment}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Add a comment</label>
        <textarea id="comment" rows={3} value={text} required
          onChange={(e) => setText(e.target.value)} />
        {error && <p role="alert" className="form-error">{error}</p>}
        <button type="submit" disabled={posting}>
          {posting ? 'Posting...' : 'Comment'}
        </button>
      </form>
    </section>
  );
}