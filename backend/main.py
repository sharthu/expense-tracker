from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:80", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Expense(BaseModel):
    description: str
    amount: float
    date: Optional[str] = None

DATA_FILE = "/app/data/expenses.json"  # Fixed path

def load_expenses():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return []

def save_expenses(expenses):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)  # Ensure /app/data exists
    with open(DATA_FILE, "w") as f:
        json.dump(expenses, f)

expenses: List[Expense] = load_expenses()

@app.get("/expenses")
def get_expenses():
    return expenses

@app.post("/expenses")
def add_expense(expense: Expense):
    expenses.append(expense.dict())
    save_expenses(expenses)
    return {"message": "Expense added", "expenses": expenses}

@app.get("/")
def read_root():
    return {"message": "Backend is running"}