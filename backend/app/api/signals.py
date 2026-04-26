from fastapi import APIRouter
import random
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/")
def get_signals(symbol: str = "SPY", limit: int = 4):
    signals = []
    
    # Matching the specific events from the README
    signal_types = [
        "Precision Buying", 
        "Automated Short", 
        "Dark Pool Accumulation", 
        "Magnetized Order"
    ]
    
    outfits = [
        "10/50/200 (SPX System)", 
        "20/100/250 (NASDAQ System)", 
        "30/60/90/300/600/900 (Dow)",
        "19/37/73/143/279/548 (Waring's)",
        "16/32/64/128/256/512 (NVDA)",
        "27/53/105/210/420/840 (TSLA 420)"
    ]
    
    symbols = ["SPY", "QQQ", "DIA", "NVDA", "TSLA"]
    
    for i in range(limit):
        date = (datetime.now() - timedelta(minutes=i*5)).strftime("%H:%M:%S")
        signals.append({
            "id": f"sig-{random.randint(1000, 9999)}",
            "date": date,
            "symbol": random.choice(symbols),
            "type": random.choice(signal_types),
            "outfit": random.choice(outfits),
            "price": round(random.uniform(150, 5000), 2),
            "confidence": round(random.uniform(0.7, 0.99), 2)
        })
    return {"signals": signals}
