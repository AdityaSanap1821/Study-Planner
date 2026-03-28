from pydantic import BaseModel, ConfigDict
from datetime import date, datetime
from typing import Optional


class AssignmentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    subject: Optional[str] = None
    priority: str = "Medium"
    status: str = "Pending"
    due_date: Optional[date] = None


class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    subject: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[date] = None


class AssignmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: Optional[str]
    subject: Optional[str]
    priority: str
    status: str
    due_date: Optional[date]
    created_at: datetime
    updated_at: datetime
