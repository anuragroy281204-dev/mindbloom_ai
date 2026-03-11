from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from models import User, Report
import schemas
import models
import auth
from database import SessionLocal, engine


# create tables
models.Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()


# allow React connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# request schemas
class SignupRequest(BaseModel):
    name: str
    age: int
    gender: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# test route
@app.get("/")
def root():
    return {"message": "MindBloom backend running"}


# signup API
@app.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(models.User.email == request.email).first()

    if existing_user:
        return {"error": "User already exists"}

    hashed_password = auth.hash_password(request.password)

    new_user = models.User(
        name=request.name,
        age=request.age,
        gender=request.gender,
        email=request.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()

    return {"message": "Account created successfully"}


# login API
@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.email == request.email).first()

    if not user:
        return {"error": "Account does not exist"}

    valid_password = auth.verify_password(request.password, user.password)

    if not valid_password:
        return {"error": "Incorrect password"}

    return {
        "message": "Login successful",
        "user_id": user.id,
        "name": user.name
    }

@app.post("/save-report")
def save_report(report: schemas.ReportCreate, db: Session = Depends(get_db)):

    new_report = models.Report(
        user_id=report.user_id,
        adhd_score=report.adhd_score,
        happiness_score=report.happiness_score,
        confidence_score=report.confidence_score
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return {"message": "Report saved successfully"}

from sqlalchemy.orm import joinedload

@app.get("/reports/{user_id}")
def get_reports(user_id: int, db: Session = Depends(get_db)):

    reports = (
        db.query(Report)
        .options(joinedload(Report.user))
        .filter(Report.user_id == user_id)
        .all()
    )

    return reports

@app.get("/user/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        return {"name": "Unknown", "age": "Unknown"}

    return {
        "name": user.name,
        "age": user.age
    }    