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
│   │   │   ├── routes_market.py
│   │   │   ├── routes_signals.py
│   │   │   ├── routes_ml.py
│   │   │   ├── routes_agents.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── schemas.py
│   │   │
│   │   ├── services/
│   │   │   ├── market_data.py
│   │   │   ├── sma_engine.py
│   │   │   ├── signal_engine.py
│   │   │   ├── feature_engine.py
│   │   │   ├── backtester.py
│   │   │   ├── ml_model.py
│   │   │
│   │   ├── agents/
│   │   │   ├── research_agent.py
│   │   │   ├── signal_agent.py
│   │   │   ├── anomaly_agent.py
│   │   │
│   │   ├── rag/
│   │   │   ├── embedder.py
│   │   │   ├── vector_store.py
│   │   │   ├── retriever.py
│   │
│   ├── tests/
│
├── frontend/
│   ├── src/
│   │   ├── app.jsx
│   │   ├── components/
│   │   │   ├── Chart.jsx
│   │   │   ├── SMAControls.jsx
│   │   │   ├── SignalPanel.jsx
│   │   │   ├── MLPanel.jsx
│   │   │   ├── AgentChat.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── websocket.js
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
