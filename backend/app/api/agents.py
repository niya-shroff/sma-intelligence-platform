from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat_with_agent(request: ChatRequest):
    responses = [
        "Based on the 10/50/200 SMA outfit, the S&P 500 is showing a bullish divergence. A precision buying algorithm might trigger soon.",
        "The recent volatility has caused the 20/100/250 NASDAQ system to issue a warning signal. Proceed with caution.",
        "I've analyzed the recent dark pool data. There seems to be accumulation around the MA50 support level.",
        "A singular point hard stop order was recently triggered in the market, causing a cascade of sell orders. It's an automated short order event."
    ]
    return {
        "agent": "SMA-Analyst-01",
        "response": random.choice(responses)
    }
