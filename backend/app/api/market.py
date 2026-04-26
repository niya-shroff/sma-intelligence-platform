from fastapi import APIRouter
import random
from datetime import datetime, timedelta

router = APIRouter()

def generate_mock_ohlcv(symbol: str, days: int = 30):
    data = []
    base_price = 150.0 if symbol == 'AAPL' else 400.0 if symbol == 'SPY' else 350.0
    
    for i in range(days):
        date = (datetime.now() - timedelta(days=days - i)).strftime("%Y-%m-%d")
        open_price = base_price + random.uniform(-5, 5)
        high_price = open_price + random.uniform(0, 5)
        low_price = open_price - random.uniform(0, 5)
        close_price = random.uniform(low_price, high_price)
        volume = int(random.uniform(1000000, 5000000))
        
        base_price = close_price  # random walk
        
        data.append({
            "date": date,
            "open": round(open_price, 2),
            "high": round(high_price, 2),
            "low": round(low_price, 2),
            "close": round(close_price, 2),
            "volume": volume
        })
    return data

@router.get("/")
def get_market_data(symbol: str = "SPY", days: int = 30):
    return {
        "symbol": symbol,
        "data": generate_mock_ohlcv(symbol, days)
    }
