const BASE = import.meta.env.VITE_API_URL; // e.g. https://teamwork-api.vercel.app/api/v1

async function request(path, { method = 'GET', body, form } = {}) {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: form || (body ? JSON.stringify(body) : undefined),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.status === 'error') {
    throw new Error(json.error || 'Something went wrong');
  }
  return json.data;
}

export const api = {
  signIn: (b) => request('/auth/signin', { method: 'POST', body: b }),
  createUser: (b) => request('/auth/create-user', { method: 'POST', body: b }),
  feed: () => request('/feed'),
  article: (id) => request(`/articles/${id}`),
  createArticle: (b) => request('/articles', { method: 'POST', body: b }),
  editArticle: (id, b) => request(`/articles/${id}`, { method: 'PATCH', body: b }),
  deleteArticle: (id) => request(`/articles/${id}`, { method: 'DELETE' }),
  commentArticle: (id, comment) =>
    request(`/articles/${id}/comment`, { method: 'POST', body: { comment } }),
  gif: (id) => request(`/gifs/${id}`),
  createGif: (form) => request('/gifs', { method: 'POST', form }), // FormData: title + image
  deleteGif: (id) => request(`/gifs/${id}`, { method: 'DELETE' }),
  commentGif: (id, comment) =>
    request(`/gifs/${id}/comment`, { method: 'POST', body: { comment } }),
};