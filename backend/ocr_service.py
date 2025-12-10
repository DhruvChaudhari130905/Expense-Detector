import random
from datetime import datetime, timedelta

async def analyze_bill_mock(file_bytes):
    """
    Simulates AI analysis of a bill.
    Returns random realistic data for testing.
    """
    # Simulate processing delay
    import asyncio
    await asyncio.sleep(1.5)

    merchants = ["Walmart", "Target", "Starbucks", "Amazon", "Uber Eats", "Shell Station"]
    
    # Random date in the last 30 days
    days_ago = random.randint(0, 30)
    date = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d")
    
    return {
        "merchant": random.choice(merchants),
        "date": date,
        "total": round(random.uniform(10.0, 150.0), 2),
        "items": [
            {"name": "Item 1", "price": 10.00},
            {"name": "Item 2", "price": 5.50}
        ]
    }
