from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base, Assignment
from schemas import AssignmentCreate, AssignmentUpdate, AssignmentResponse

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Study Planner API", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ========== ROOT ENDPOINT ==========

@app.get("/")
def root():
    return {"message": "Study Planner API", "version": "1.0.0"}


# ========== CRUD ENDPOINTS ==========

@app.get("/assignments", response_model=list[AssignmentResponse])
def get_assignments(db: Session = Depends(get_db)):
    """Get all assignments"""
    assignments = db.query(Assignment).all()
    return assignments


@app.get("/assignments/{assignment_id}", response_model=AssignmentResponse)
def get_assignment(assignment_id: int, db: Session = Depends(get_db)):
    """Get a single assignment by ID"""
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment


@app.post("/assignments", response_model=AssignmentResponse, status_code=201)
def create_assignment(data: AssignmentCreate, db: Session = Depends(get_db)):
    """Create a new assignment"""
    assignment = Assignment(**data.dict())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


@app.put("/assignments/{assignment_id}", response_model=AssignmentResponse)
def update_assignment(
    assignment_id: int, data: AssignmentUpdate, db: Session = Depends(get_db)
):
    """Update an existing assignment"""
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    # Update only provided fields
    for key, value in data.dict(exclude_unset=True).items():
        setattr(assignment, key, value)

    db.commit()
    db.refresh(assignment)
    return assignment


@app.delete("/assignments/{assignment_id}", status_code=204)
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    """Delete an assignment"""
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    db.delete(assignment)
    db.commit()
    return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
