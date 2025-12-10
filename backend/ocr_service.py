import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)

async def analyze_bill(file_bytes):
    """
    Analyzes a bill image using Google Gemini 1.5 Flash.
    Returns structured data matching the ExpenseResponse model.
    """
    if not GENAI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found in environment variables")

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = """
        Analyze this bill/receipt image and extract the following information in JSON format:
        - merchant (string): The name of the store or merchant.
        - date (string): The date of the transaction in YYYY-MM-DD format.
        - total (float): The total amount paid.
        - items (list of objects): Each item should have a 'name' (string) and 'price' (float).
        
        If you cannot find specific information, set it to null. 
        Ensure the output is valid JSON without markdown formatting (no ```json blocks).
        """

        # Create the content part with the image data
        response = model.generate_content([
            {'mime_type': 'image/jpeg', 'data': file_bytes},
            prompt
        ])
        
        # Clean up response text to ensure valid JSON (remove markdown code blocks if present)
        response_text = response.text.replace("```json", "").replace("```", "").strip()
        
        data = json.loads(response_text)
        return data

    except Exception as e:
        print(f"Error analyzing bill: {e}")
        # Fallback or error re-raise
        raise e
