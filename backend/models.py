from pydantic import BaseModel
from typing import List, Optional

class ExpenseItem(BaseModel):
    name: str
    price: float

class ExpenseResponse(BaseModel):
    merchant: Optional[str] = None
    date: Optional[str] = None
    total: float
    items: List[ExpenseItem] = []
