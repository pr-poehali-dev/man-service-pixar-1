CREATE TABLE IF NOT EXISTS portal_companies (
    id SERIAL PRIMARY KEY,
    category VARCHAR(30) NOT NULL,
    name VARCHAR(200) NOT NULL,
    address VARCHAR(300) NOT NULL DEFAULT '',
    phone VARCHAR(50) NOT NULL DEFAULT '',
    work_hours VARCHAR(200) NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portal_companies_category ON portal_companies (category);