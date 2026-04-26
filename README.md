# SMA Intelligence Platform

An end-to-end platform for building, testing, and analyzing trading strategies based on Simple Moving Averages (SMA), with extensions into machine learning, signal generation, and agent-based analysis. A simulation of Raul's original analysis. Their README is in 'RAUL_README.md'

## Overview

This project brings together market data processing, SMA-based strategy logic, machine learning models, and lightweight AI agents into a single system. It’s designed to support both experimentation and structured analysis of trading signals.

The platform includes:

* A backend API for data, signals, and models
* A frontend for visualization and interaction
* Supporting pipelines for ML and retrieval-based workflows

---

## Project Structure

```text
sma-intelligence-platform/
│
├── README.md
├── docker-compose.yml
├── .env
├── requirements.txt
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── core/
│   │   ├── services/
│   │   ├── agents/
│   │   ├── rag/
│   │
│   ├── tests/
│
├── frontend/
│   ├── src/
│   │   ├── app.jsx
│   │   ├── components/
│   │   ├── services/
│
├── data/
│   ├── raw/
│   ├── processed/
│
├── ml/
│   ├── train.py
│   ├── features.py
│   ├── models/
│   ├── evaluation.py
│
├── rag/
│   ├── ingest.py
│   ├── chunking.py
│   ├── embeddings.py
│
├── infra/
│   ├── influxdb/
│   ├── redis/
│   ├── kafka/
│
└── docs/
    ├── architecture.md
    ├── sma_definitions.md
    ├── agent_design.md
```

---

## Core Components

### Backend

Built with FastAPI. Handles:

* Market data access
* SMA calculations
* Signal generation
* ML inference
* Agent endpoints

### Services Layer

Contains most of the logic:

* `market_data.py` – data ingestion and retrieval
* `sma_engine.py` – moving average calculations
* `signal_engine.py` – trading signals
* `feature_engine.py` – feature generation for ML
* `ml_model.py` – model loading and predictions
* `backtester.py` – strategy evaluation

### Agents

Simple task-focused agents:

* Research agent for context and summaries
* Signal agent for explaining outputs
* Anomaly agent for detecting irregular patterns

### Frontend

React-based UI with:

* Charting
* SMA controls
* Signal display
* ML output panel
* Agent chat interface

### ML Pipeline

Located in `/ml`:

* Feature construction
* Model training
* Evaluation scripts

### RAG Components

Used for retrieval-based responses:

* Embedding generation
* Vector storage
* Query-time retrieval

---

## Setup

### Clone the repository

```bash
git clone https://github.com/your-org/sma-intelligence-platform.git
cd sma-intelligence-platform
```

### Environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@db:5432/sma_db
REDIS_URL=redis://redis:6379
KAFKA_BROKER=kafka:9092
```

---

## Running the project

### With Docker

```bash
docker-compose up --build
```

Once running, the application will be exposed on the following ports:
* **Frontend UI**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:8000](http://localhost:8000)

*(Troubleshooting note: If Postgres fails to start with "init.sql: error: could not read from input file: Is a directory", run `docker-compose down -v` to clear cached volume bindings and run `docker-compose up --build` again.)*

### Backend (local)

```bash
cd backend
pip install -r ../requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API

* `/market` – market data
* `/signals` – generated signals
* `/ml` – model predictions
* `/agents` – agent interaction

---

## Testing

```bash
cd backend
pytest
```

---

## Data Flow (simplified)

1. Data ingestion (`market_data.py`)
2. Feature generation (`feature_engine.py`)
3. SMA calculation (`sma_engine.py`)
4. Signal generation (`signal_engine.py`)
5. ML prediction (`ml_model.py`)
6. Backtesting (`backtester.py`)
7. Agent interaction (`agents/`)

---

## Future Plans & Research Areas

* https://fred.stlouisfed.org/docs/api/fred/ (API for historical economic data series)
* https://huggingface.co/datasets/gbharti/wealth-alpaca_lora (dataset of financial-advice conversations)
* https://huggingface.co/datasets/zongowo111/v2-crypto-ohlcv-data (dataset of crypto OHLCV data)
* https://huggingface.co/datasets/raeidsaqur/NIFTY (dataset of NIFTY OHLCV data)
* https://www.alphavantage.co/documentation/ (API for historical market data)
* https://finnhub.io/docs/api/introduction (API for real-time market data)
* https://polygon.io/docs/trading-apis (API for real-time market data)
* https://docs.polygon.io/reference-guides/python/getting-started/ (Polygon.io Python SDK)
* https://polars.is/docs/ (High-performance DataFrame library for Python)
* Add the capability to run strategies live on a brokerage account
* Expand the number of agents and capabilities
* Use the platform to analyze Raul's system more deeply and improve on it.
* Improve the UI/UX.
* Potentially deploy the frontend and backend in a more user-friendly way, as an application.
* Integrate real finance APIs like Yahoo Finance's via yfinance 1.3.0, AlphaVantage, Finnhub, or Polygon.io.
* Consider adding AI-powered signal generation and analysis, potentially using large language models to interpret market data and generate trading signals. This would allow the platform to identify complex patterns and relationships that might not be apparent through traditional technical analysis.
* In the agents section, integrate LLMs like GPT-4 or Claude 3.5 to provide more sophisticated analysis and insights. This would allow the platform to identify complex patterns and relationships that might not be apparent through traditional technical analysis.

---

## License

Apache 2.0 License