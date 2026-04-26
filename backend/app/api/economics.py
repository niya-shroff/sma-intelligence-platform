from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/")
def get_economic_conditions():
    conditions = [
        {"indicator": "Interest Rates", "value": f"{round(random.uniform(4.5, 5.5), 2)}%", "status": random.choice(["Rising", "Stable", "Falling"])},
        {"indicator": "Inflation (CPI)", "value": f"{round(random.uniform(2.5, 3.5), 2)}%", "status": random.choice(["Rising", "Stable", "Falling"])},
        {"indicator": "GDP Growth", "value": f"{round(random.uniform(1.0, 3.0), 2)}%", "status": random.choice(["Accelerating", "Slowing", "Stable"])},
        {"indicator": "Unemployment", "value": f"{round(random.uniform(3.5, 4.5), 2)}%", "status": random.choice(["Rising", "Stable", "Falling"])}
    ]
    return {"conditions": conditions}
