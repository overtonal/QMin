# QMin Frontend

This SvelteKit frontend provides a task creation page and a board view aligned with the backend API.

## Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open the local URL shown by Vite, typically `http://localhost:5173`.

## Notes

- The frontend expects the backend API to be running at `http://localhost:5000`.
- The task creation page sends `POST /api/tasks`.
- The board page fetches `GET /api/tasks` and updates task status via `PATCH /api/tasks/{id}/status`.

## Available pages

- `/` — Home page
- `/create` — Task creation form
- `/board` — Task board grouped by status
