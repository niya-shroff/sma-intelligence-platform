from fastapi import APIRouter
import random
from datetime import datetime, timedelta

router = APIRouter()

def generate_mock_ohlcv(symbol: str, days: int = 60):
    data = []
    base_price = 4500.0 if symbol == 'SPY' else 400.0
    
    # We want to simulate the 10/50/200 SMA on the frontend chart
    # Let's generate a list of prices that slowly trends
    prices = []
    for i in range(days):
        open_price = base_price + random.uniform(-15, 15)
        close_price = open_price + random.uniform(-20, 20)
        base_price = close_price
        prices.append(close_price)
        
    for i in range(days):
        date = (datetime.now() - timedelta(days=days - i)).strftime("%b %d")
        
        # Calculate moving averages for the chart mock
        sma50 = sum(prices[max(0, i-10):i+1]) / len(prices[max(0, i-10):i+1]) - 50 # Mock visual offset
        sma200 = sum(prices[max(0, i-30):i+1]) / len(prices[max(0, i-30):i+1]) - 100 # Mock visual offset
        
        data.append({
            "date": date,
            "close": round(prices[i], 2),
            "sma50": round(sma50, 2),
            "sma200": round(sma200, 2)
        })
    return data

@router.get("/")
def get_market_data(symbol: str = "SPY", days: int = 60):
    return {
        "symbol": symbol,
        "data": generate_mock_ohlcv(symbol, days)
    }
