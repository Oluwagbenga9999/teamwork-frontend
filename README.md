# Teamwork Frontend

React single-page app for Teamwork, an internal social network where employees share articles and GIFs, comment on posts, and follow a shared feed.

- **Live app:** https://teamwork-frontend-mauve.vercel.app
- **Backend API:** https://teamwork-backend-cyan.vercel.app (repo: [Oluwagbenga9999/Teamwork](https://github.com/Oluwagbenga9999/Teamwork))
- **API docs:** https://teamwork-backend-cyan.vercel.app/api-docs

## Features
- Sign in with JWT auth; protected routes redirect to sign-in
- Admins can create employee accounts
- Feed of articles and GIFs, newest first
- Create, edit and delete your own articles
- Upload and delete your own GIFs (max 4MB, GIF only, with preview)
- Comment on any article or GIF
- Responsive layout (mobile, tablet, desktop), automatic dark mode, keyboard-visible focus states

## Stack
React 19, Vite, React Router, native Fetch API, plain CSS.

## Run locally
1. `npm install`
2. Create `.env` with the API base URL, no trailing slash:
   `VITE_API_URL=http://localhost:3000/api/v1`
3. Start the backend (see its README), then `npm run dev`
4. `npm run build` creates a production build; `npm run lint` runs ESLint

## Deployment
Deployed on Vercel instead of GitHub Pages, because the app uses client-side routing and `vercel.json` rewrites all paths to `index.html`. Set `VITE_API_URL` in the Vercel project settings, and add the frontend URL to `CORS_ORIGIN` on the backend.

## Project structure
- `src/auth/`: auth context (token storage, decoded user, sign in/out)
- `src/components/`: layout, protected route, shared forms and comments
- `src/pages/`: sign-in, feed, article and GIF pages, admin create-employee
- `src/api.js`: Fetch wrapper for every API call