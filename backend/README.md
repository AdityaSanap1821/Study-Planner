# Study Planner Backend

FastAPI-based REST API for the Study Planner assignment tracker application.

## Problem This Solves

The backend provides a robust REST API that handles all CRUD operations for assignments, enabling the frontend to persist data across sessions. It abstracts database complexity and provides a clean interface for the frontend to manage assignments without direct database access.

## Tech Stack

- **FastAPI**: Modern web framework for building APIs
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Lightweight database
- **Pydantic**: Data validation and serialization

## Features & Business Logic

- **Complete CRUD Operations**: Create new assignments, read all or specific assignments, update existing assignments, and delete assignments
- **Automatic Timestamp Management**: Tracks creation and modification times for all assignments
- **Data Persistence**: All changes immediately persist to SQLite database
- **Input Validation**: Pydantic schemas validate all incoming data types and required fields
- **CORS Support**: Configured to allow frontend requests from localhost:3000

## Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv .venv
```

**Activate venv:**
- **Windows**: `.venv\Scripts\activate`
- **Mac/Linux**: `source .venv/bin/activate`

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

**Interactive API Docs**: `http://localhost:8000/docs` (Swagger UI)

## API Endpoints

### Get All Assignments
```
GET /assignments
```
Returns a list of all assignments.

### Get Single Assignment
```
GET /assignments/{id}
```
Returns a specific assignment by ID.

### Create Assignment
```
POST /assignments
Content-Type: application/json

{
  "title": "Math Assignment 1",
  "description": "Chapter 5 exercises",
  "subject": "Mathematics",
  "priority": "High",
  "status": "Pending",
  "due_date": "2026-04-15"
}
```

### Update Assignment
```
PUT /assignments/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "Completed"
}
```

### Delete Assignment
```
DELETE /assignments/{id}
```

## Database

The SQLite database (`database.db`) is automatically created on first run.

### Database Schema

```sql
CREATE TABLE assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    description TEXT,
    subject VARCHAR,
    priority VARCHAR DEFAULT 'Medium',
    status VARCHAR DEFAULT 'Pending',
    due_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Export Database

```bash
# Export schema to SQL file
sqlite3 database.db ".dump" > schema.sql
```

## Environment Variables

Copy `.env.example` to `.env` to customize settings:

```
DATABASE_URL=sqlite:///./database.db
API_HOST=0.0.0.0
API_PORT=8000
```

## Project Structure

```
backend/
├── main.py           # FastAPI application & routes
├── models.py         # SQLAlchemy ORM models
├── schemas.py        # Pydantic validation schemas
├── database.py       # Database connection setup
├── requirements.txt  # Python dependencies
├── .env.example      # Environment template
└── database.db       # SQLite database (auto-created)
```

## Development

The `--reload` flag enables auto-reload on file changes:

```bash
uvicorn main:app --reload
```

## Challenges Overcome

**SQLite Setup in VS Code:** Configuring SQLite with SQLAlchemy required setting up Python virtual environments correctly, installing all dependencies, and ensuring the database file was created with proper permissions. The solution implemented automatic table creation on first run using SQLAlchemy's create_all() method, eliminating manual SQL script execution.

**CORS Configuration:** Enabling cross-origin requests from the frontend to the backend involved understanding CORS headers, configuring FastAPI middleware correctly, and ensuring credentials were handled properly for browser requests. This allowed the frontend running on localhost:3000 to communicate seamlessly with the backend on localhost:8000.

**API Response Consistency:** Ensuring all endpoints returned data in the correct format required using Pydantic schemas for validation and serialization, with proper HTTP status codes (201 for creation, 200 for success, 404 for not found, etc.).

## Testing Endpoints

Use cURL, Postman, or the interactive Swagger UI at `/docs`:

```bash
# Create
curl -X POST http://localhost:8000/assignments \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","subject":"Math","priority":"High","due_date":"2026-04-15"}'

# Read
curl http://localhost:8000/assignments

# Update
curl -X PUT http://localhost:8000/assignments/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Completed"}'

# Delete
curl -X DELETE http://localhost:8000/assignments/1
```
