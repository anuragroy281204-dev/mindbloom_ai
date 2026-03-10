from pydantic import BaseModel

class UserInfo(BaseModel):

    name:str
    age:int
    gender:str


class Answers(BaseModel):

    responses:list

class ReportCreate(BaseModel):
    user_id: int
    adhd_score: float
    happiness_score: float
    confidence_score: float


class ReportResponse(BaseModel):
    id: int
    user_id: int
    adhd_score: float
    happiness_score: float
    confidence_score: float

    class Config:
        orm_mode = True