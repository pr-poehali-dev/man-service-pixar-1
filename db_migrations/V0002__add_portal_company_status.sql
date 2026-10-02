ALTER TABLE portal_companies ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'approved';
ALTER TABLE portal_companies ADD COLUMN IF NOT EXISTS contact_name VARCHAR(200) NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_portal_companies_status ON portal_companies (status);