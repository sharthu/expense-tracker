from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:80", "*"],  # Added "*" for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Expense(BaseModel):
    description: str
    amount: float

expenses: List[Expense] = []

@app.get("/expenses")
def get_expenses():
    return expenses

@app.post("/expenses")
def add_expense(expense: Expense):
    expenses.append(expense)
    return {"message": "Expense added", "expenses": expenses}

# Added root endpoint for testing
@app.get("/")
def read_root():
    return {"message": "Backend is running"}