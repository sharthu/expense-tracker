from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

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
