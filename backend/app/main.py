from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import market, signals, ml, agents

app = FastAPI(title="SMA Intelligence Platform API", version="1.0.0")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(market.router, prefix="/market", tags=["market"])
app.include_router(signals.router, prefix="/signals", tags=["signals"])
app.include_router(ml.router, prefix="/ml", tags=["ml"])
app.include_router(agents.router, prefix="/agents", tags=["agents"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the SMA Intelligence Platform API"}
