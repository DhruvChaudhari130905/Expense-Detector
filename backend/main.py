from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from .models import ExpenseResponse

app = FastAPI(title="Expense Tracker API")

# Setup CORS to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Expense Tracker API is running"}

from .ocr_service import analyze_bill

@app.post("/scan-bill", response_model=ExpenseResponse)
async def scan_bill(file: UploadFile = File(...)):
    content = await file.read()
    # verify it's an image (simplistic check)
    # in a real app, we'd check mime types
    
    # Use Real Service
    data = await analyze_bill(content)
    
    return data
