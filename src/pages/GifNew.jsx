import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const MAX_BYTES = 4 * 1024 * 1024;

export default function GifNew() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const handleFile = (e) => {
    const picked = e.target.files[0];
    setError('');
    if (!picked) return setFile(null);
    if (picked.type !== 'image/gif') {
      setFile(null);
      return setError('Only GIF images are allowed.');
    }
    if (picked.size > MAX_BYTES) {
      setFile(null);
      return setError('That GIF is larger than 4MB. Please choose a smaller one.');
    }
    return setFile(picked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Choose a GIF to upload.');
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('image', file);
      const data = await api.createGif(form);
      return navigate(`/gifs/${data.gifId}`);
    } catch (err) {
      setUploading(false);
      return setError(err.message);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>New gif</h1>

      <label htmlFor="title">Title</label>
      <input id="title" value={title} required maxLength={200}
        onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="image">GIF file (max 4MB)</label>
      <input id="image" type="file" accept="image/gif" onChange={handleFile} />

      {preview && <img className="gif-preview" src={preview} alt="Preview of the selected GIF" />}

      {error && <p role="alert" className="form-error">{error}</p>}

      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Post gif'}
      </button>
    </form>
  );
}