CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20),
  status VARCHAR(20), -- pending, called, completed
  lead_type VARCHAR(10), -- hot, cold
  summary TEXT,
  transcript JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE call_sessions (
  id SERIAL PRIMARY KEY,
  call_sid VARCHAR(64),
  lead_id INTEGER REFERENCES leads(id),
  step INTEGER DEFAULT 0,
  context JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
