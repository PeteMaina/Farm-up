# Deployment & Pipeline Automation Instructions

To ensure your changes are automatically reflected on Netlify and the application runs smoothly, follow these steps:

## 1. Frontend Deployment (Netlify)
The frontend is already configured via `netlify.toml`.
- **Automatic Deploys**: Connect your GitHub repository (`PeteMaina/Farm-up`) to your Netlify site. Netlify will automatically trigger a build and deploy every time you push to the `main` branch.
- **Environment Variables**: In the Netlify dashboard, go to **Site settings > Build & deploy > Environment > Environment variables** and add:
  - `REACT_APP_API_URL`: The URL of your hosted backend (e.g., `https://your-backend.onrender.com/api/v1`).

## 2. Backend Deployment (Separate Hosting)
Since Netlify serves static files, your Python (FastAPI) backend needs separate hosting.
- **Recommended Services**: [Render](https://render.com/), [Railway](https://railway.app/), or [Fly.io](https://fly.io/).
- **Database**: Ensure your `sql_app.db` is either migrated to a managed PostgreSQL database (recommended for production) or handled correctly if using SQLite (note: SQLite files are reset on every deploy on most cloud providers).

## 3. Local Development & Testing
To test the build locally before pushing:
1. Ensure all dependencies are installed: `npm install`
2. Run the build command: `npm run build`
3. If the build succeeds, your changes are ready for Netlify.

## 4. Automation Checklist
- [x] Fixed ESLint errors that block production builds.
- [x] Added `netlify.toml` for routing and build settings.
- [ ] Set `REACT_APP_API_URL` in Netlify dashboard.
- [ ] Hosted Python backend on a cloud provider.
