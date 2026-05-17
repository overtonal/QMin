# QMin Backend

Express.js API backend for the QMin task management application.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # PostgreSQL connection pool
│   │   └── schema.sql       # Database schema
│   ├── models/
│   │   └── Task.js          # Task model with database methods
│   ├── routes/
│   │   └── tasks.js         # Task API endpoints
│   ├── middleware/          # (Reserved for future middleware)
│   └── server.js            # Express application entry point
├── package.json             # Project dependencies
├── .env.example             # Environment variables template
└── README.md               # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up PostgreSQL Database

1. Ensure PostgreSQL is installed and running
2. Create a new database:
   ```sql
   CREATE DATABASE qmin_db;
   ```
3. Run the schema file to create tables:
   ```bash
   psql -U postgres -d qmin_db -f src/config/schema.sql
   ```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and update the database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=qmin_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   NODE_ENV=development
   PORT=5000
   ```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task by ID
- `GET /api/tasks/status/:status` - Get tasks by status (To-Do, In Progress, Done)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/status` - Update only the task status
- `DELETE /api/tasks/:id` - Delete a task

### Health Check

- `GET /health` - Server health status

## Example Requests

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"name": "Build frontend", "description": "Create SvelteKit app"}'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Update Task Status
```bash
curl -X PATCH http://localhost:5000/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
```

### Delete a Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```
