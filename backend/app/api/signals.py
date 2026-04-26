from fastapi import APIRouter
import random
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/")
def get_signals(symbol: str = "SPY", limit: int = 10):
    signals = []
    signal_types = ["Buy", "Sell", "Hold"]
    outfits = ["10/50/200", "20/100/250", "30/60/90/300/600/900"]
    
    for i in range(limit):
        date = (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d %H:%M:%S")
        signals.append({
            "id": f"sig-{random.randint(1000, 9999)}",
            "date": date,
            "symbol": symbol,
            "type": random.choice(signal_types),
            "outfit": random.choice(outfits),
            "price": round(random.uniform(100, 500), 2),
            "confidence": round(random.uniform(0.6, 0.99), 2)
        })
    return {"signals": signals}
