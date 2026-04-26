-- Initialize SMA Platform DB
CREATE TABLE IF NOT EXISTS system_config (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL
);
