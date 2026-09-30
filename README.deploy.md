Deployment guide: free test setup
==================================

Use Supabase for PostgreSQL, Render for the Express API, and Vercel for the Next.js frontend. This setup is for testing with sample data.

1. Create a Supabase project and copy its PostgreSQL connection string for `DATABASE_URL`.
2. In Render, create a Blueprint from this repository and select `render.yaml`. Set `DATABASE_URL`, `JWT_SECRET`, and `FRONTEND_URL` when prompted. The blueprint builds the API from `backend` and runs Prisma migrations at startup.
3. After the API deploys, confirm `https://YOUR-RENDER-SERVICE.onrender.com/health` responds successfully.
4. In Vercel, import this repository with `frontend` as the root directory. Set `NEXT_PUBLIC_API_URL` to `https://YOUR-RENDER-SERVICE.onrender.com/api`.
5. Set Render's `FRONTEND_URL` to the Vercel deployment URL and redeploy the API.

Free services can pause or sleep while idle. Use test data, not real customer or sales records.
