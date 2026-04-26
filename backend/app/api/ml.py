from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class PredictionRequest(BaseModel):
    symbol: str
    features: dict

@router.post("/predict")
def get_ml_prediction(request: PredictionRequest):
    return {
        "symbol": request.symbol,
        "prediction": random.choice(["Up", "Down", "Neutral"]),
        "probability": round(random.uniform(0.51, 0.95), 2),
        "model_version": "v1.0-mock"
    }

@router.get("/status")
def get_ml_status():
    return {
        "models_loaded": ["xgboost_v1", "random_forest_v2"],
        "status": "healthy"
    }
