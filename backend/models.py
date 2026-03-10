from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql.sqltypes import DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    reports = relationship("Report", back_populates="user")


class Report(Base):
    __tablename__ = "reports"
   

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    adhd_score = Column(Float)
    inattentive_score = Column(Float)
    hyperactive_score = Column(Float)
    happiness_score = Column(Float)
    confidence_score = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="reports")