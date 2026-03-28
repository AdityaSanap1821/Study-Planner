# Study Planner - Assignment Tracking Application

## Problem Statement

University students often struggle to manage multiple assignments across different subjects, juggling deadlines, priorities, and completion statuses. Study Planner solves this by providing a centralized platform where students can quickly create, organize, and track all their academic work in one place, with visual priority indicators and deadline alerts to reduce missed deadlines.

## Project Overview

Study Planner is a Single Page Application (SPA) for managing university assignments with real-time synchronization between frontend and backend. Users can create, read, update, and delete assignments while organizing them by subject, priority level, and completion status. The application features a dark-mode interface using the Obsidian Amber theme and provides responsive design across all devices.

**Key Capabilities:**
- Full CRUD operations for assignment management
- Real-time data persistence via REST API
- Priority-based and status-based filtering
- Overdue detection and visual flagging
- Fully responsive design (3 columns → 2 → 1)

---

## Project Structure

```
study-planner/
├── frontend/               # React SPA (port 3000)
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── AssignmentGrid.jsx
│   │   │   ├── AssignmentCard.jsx
│   │   │   ├── AssignmentDrawer.jsx
│   │   │   └── Icons.jsx
│   │   ├── App.jsx         # Root component with state management
│   │   ├── utils.js        # Utility functions
│   │   └── index.css       # Tailwind directives
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                # FastAPI REST API (port 8000)
│   ├── main.py             # FastAPI app and route handlers
│   ├── models.py           # SQLAlchemy ORM models
│   ├── schemas.py          # Pydantic validation schemas
│   ├── database.py         # Database connection and session
│   ├── requirements.txt    # Python dependencies
│   └── database.db         # SQLite database (auto-created)
│
├── database/               # Database export and documentation
│   ├── schema.sql          # Database schema definition
│   ├── seed.sql            # Sample data for testing
│   └── README.md           # Database setup instructions
│
└── README.md              # This file
```

---

## Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **Tailwind CSS** 3.4.0 - Utility-first CSS framework
- **React Scripts** 5.0.1 - Build tooling
- **PostCSS & Autoprefixer** - CSS processing

### Backend
- **FastAPI** 0.135.2 - Modern web framework
- **SQLAlchemy** 2.0.48 - ORM
- **Pydantic** 2.12.5 - Data validation
- **Uvicorn** 0.42.0 - ASGI server
- **SQLite** (built-in) - Database

---

## Setup & Running Locally

### Prerequisites

Ensure you have the following installed:
- **Node.js** 14+ ([download](https://nodejs.org/))
- **Python** 3.10+ ([download](https://www.python.org/))
- **pip** (comes with Python)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a Python virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**

   *On Windows:*
   ```bash
   venv\Scripts\activate
   ```

   *On macOS/Linux:*
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the server:**
   ```bash
   uvicorn main:app --reload
   ```

   **Expected output:**
   ```
   Uvicorn running on http://127.0.0.1:8000
   ℹ️ Database (database.db) is created automatically
   ✓ Tables initialized on first run
   ```

   ⚠️ **No manual database setup needed!** The database is created automatically by SQLAlchemy.

6. **Access API documentation:**
   - Open http://localhost:8000/docs in your browser
   - Interactive Swagger UI showing all endpoints

### Frontend Setup

1. **Open a new terminal, navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   **Expected output:**
   - Automatically opens http://localhost:3000
   - React development server running

### Running Together

Keep both servers running in separate terminal windows:

| Terminal | Command | Port |
|----------|---------|------|
| 1 | `cd backend && uvicorn main:app --reload` | 8000 |
| 2 | `cd frontend && npm start` | 3000 |

The frontend will automatically connect to the backend API.

---

## API Documentation

### Base URL
```
http://localhost:8000
```

The backend provides interactive API documentation at: **http://localhost:8000/docs**

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Health check | - |
| GET | `/assignments` | Get all assignments | - |
| GET | `/assignments/{id}` | Get single assignment | - |
| POST | `/assignments` | Create assignment | `AssignmentCreate` |
| PUT | `/assignments/{id}` | Update assignment | `AssignmentUpdate` |
| DELETE | `/assignments/{id}` | Delete assignment | - |

### Request/Response Example

**Create Assignment:**
```bash
curl -X POST http://localhost:8000/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Math Assignment 1",
    "description": "Chapter 5 exercises",
    "subject": "Mathematics",
    "priority": "High",
    "status": "Pending",
    "due_date": "2026-04-15"
  }'
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Math Assignment 1",
  "description": "Chapter 5 exercises",
  "subject": "Mathematics",
  "priority": "High",
  "status": "Pending",
  "due_date": "2026-04-15",
  "created_at": "2026-03-28T12:00:00",
  "updated_at": "2026-03-28T12:00:00"
}
```

---

## Database

### Automatic Setup (Recommended)

The database is **automatically created** when the backend runs for the first time. No manual setup required:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# ✓ database.db created automatically
# ✓ Tables initialized automatically
# ✓ Ready to use immediately!
```

SQLAlchemy ORM automatically creates tables based on models defined in `backend/models.py`.

### Schema Overview

The application uses SQLite with a single `assignments` table:

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| title | VARCHAR | Assignment title (required) |
| description | TEXT | Assignment details |
| subject | VARCHAR | Course/subject name |
| priority | VARCHAR | Low / Medium / High |
| status | VARCHAR | Pending / Completed |
| due_date | DATE | Assignment due date |
| created_at | DATETIME | Record creation timestamp |
| updated_at | DATETIME | Last modification timestamp |

### Database Files (For Reference)

- **schema.sql** - Table schema export (auto-generated, for backup/reference)
- **seed.sql** - Sample assignments (optional for testing)
- **database.db** - SQLite file (auto-created in `backend/` folder on first run)

### Reset Database

To completely reset and start with a clean database:

```bash
cd backend
rm database.db                    # Delete existing database
uvicorn main:app --reload        # Creates fresh database automatically
```

To load sample data after reset:

```bash
sqlite3 database.db < ../database/seed.sql
```

See `database/README.md` for detailed database documentation.

---

## Features

### Core CRUD Operations
- **Create** - Add new assignments with title, subject, priority, due date
- **Read** - View all assignments or individual assignment details
- **Update** - Edit assignment information and change status
- **Delete** - Remove completed or unwanted assignments

### User Interface
- **Dark Mode** - Obsidian Amber theme throughout application
- **Priority Levels** - Visual color coding (Low/Medium/High)
- **Status Toggle** - Mark assignments as Pending or Completed
- **Filtering** - Filter by status, priority, or subject
- **Statistics Dashboard** - Summary of total, pending, completed, and overdue counts
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### Data Management
- **Real-time Sync** - All changes persist immediately via API
- **Overdue Detection** - Visual flagging for assignments past due date
- **Timestamp Tracking** - Record creation and modification times
- **Non-destructive Operations** - Soft deletes and proper error handling

---

## Challenges Overcome

**Backend API Integration:** Connecting the React frontend to the FastAPI backend required careful handling of asynchronous API calls, CORS configuration, and ensuring real-time data synchronization between the UI and database. This integration was time-consuming but provided valuable experience in building full-stack applications.

**SQLite Database Setup in VS Code:** Configuring SQLite with SQLAlchemy ORM in a VS Code environment involved troubleshooting virtual environment setup, dependency installation, and auto-database creation on first run. The solution implemented automatic database initialization, eliminating manual SQL setup for end-users.

**Responsive Component Design:** Building a responsive grid layout that adapts from 3 columns on desktop to 1 column on mobile while maintaining the dark theme consistency required careful Tailwind CSS configuration and media query planning across all components.

---

## Project Submission Structure

This project is submitted for assignment grading with the following structure:

**Included for Assessment:**
- ✓ Complete frontend source code (React + Tailwind CSS)
- ✓ Complete backend source code (FastAPI + SQLAlchemy)
- ✓ Database schema export (schema.sql)
- ✓ Sample data (seed.sql)
- ✓ Setup and running instructions

**Implementation Scope:**
- ✓ CRUD operations on HTTP REST API
- ✓ Full frontend-backend integration
- ✓ Data persistence via SQLite database
- ✓ No authentication (CRUD-only per requirements)
- ✓ Responsive design and dark-mode UI

---

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find process using port 8000
lsof -i :8000

# Or use different port
uvicorn main:app --port 8001 --reload
```

**ModuleNotFoundError: No module named 'fastapi'**
```bash
# Activate virtual environment first
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Then reinstall dependencies
pip install -r requirements.txt
```

**Database locked error:**
```bash
# Close all connections and restart backend
# Delete database.db and restart (new one will be created automatically)
rm backend/database.db
cd backend && uvicorn main:app --reload
```

**No tables/data in database:**
- Database is created automatically on first backend run
- If missing, simply restart backend: `uvicorn main:app --reload`
- To load sample data: `sqlite3 backend/database.db < database/seed.sql`

**Port 3000 already in use:**
```bash
# On Windows (run in admin terminal)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**npm install fails:**
```bash
# Clear npm cache
npm cache clean --force

# Reset node_modules
rm -rf node_modules package-lock.json
npm install
```

### API/Integration Issues

**CORS errors in browser console:**
- Verify backend is running on http://localhost:8000
- Check frontend is requesting correct endpoint URLs
- Ensure CORS middleware is enabled in `backend/main.py`

**API requests failing (404 or 500):**
- Check backend server is running: http://localhost:8000/docs
- Verify request method and endpoint in developer console (F12)
- Review backend error logs in terminal

**Database shows no data:**
```bash
# Load sample data
cd backend
sqlite3 database.db < ../database/seed.sql

# Restart backend to refresh
```

---

## Development Notes

### File Locations for Common Edits
- **Add new component:** `frontend/src/components/NewComponent.jsx`
- **Add new API endpoint:** `backend/main.py` (add function with `@app.get/post/put/delete`)
- **Modify database schema:** `backend/models.py` (ORM model), then `database/schema.sql` (export)
- **Update styles:** `frontend/src/index.css` or component's className attributes

### Common Tasks

**Reload backend without restarting:**
- Uvicorn `--reload` watches for file changes automatically

**Clear all assignments:**
```python
# In Python shell with activated venv
from backend.database import SessionLocal
from backend.models import Assignment

db = SessionLocal()
db.query(Assignment).delete()
db.commit()
```

---

## Support & Documentation

- **Frontend Code:** See individual component files in `frontend/src/components/`
- **Backend Code:** See endpoint definitions in `backend/main.py`
- **API Docs:** Run backend and visit http://localhost:8000/docs
- **Database Docs:** See `database/README.md`

---

**Last Updated:** March 2026
**Assignment:** UTS Internet Programming - Assignment 1
