import { AppDataSource } from '@config/connection';

export const createTablesSQL = `
-- Users table (for Authentik SSO integration)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    authentik_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    brief_description TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accomplishment types table
CREATE TABLE IF NOT EXISTS accomplishment_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accomplishments table
CREATE TABLE IF NOT EXISTS accomplishments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
    date DATE,
    accomplishment TEXT,
    impact TEXT,
    recognition TEXT,
    notes TEXT,
    type_id UUID REFERENCES accomplishment_types(id) ON DELETE SET NULL,
    state VARCHAR(20) DEFAULT 'To Do' CHECK (state IN ('To Do', 'In Progress', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_job_id ON goals(job_id);
CREATE INDEX IF NOT EXISTS idx_accomplishments_job_id ON accomplishments(job_id);
CREATE INDEX IF NOT EXISTS idx_accomplishments_goal_id ON accomplishments(goal_id);
CREATE INDEX IF NOT EXISTS idx_accomplishments_type_id ON accomplishments(type_id);
CREATE INDEX IF NOT EXISTS idx_accomplishments_date ON accomplishments(date);
CREATE INDEX IF NOT EXISTS idx_accomplishments_state ON accomplishments(state);

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at 
    BEFORE UPDATE ON jobs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at 
    BEFORE UPDATE ON goals 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accomplishments_updated_at 
    BEFORE UPDATE ON accomplishments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed default accomplishment types
INSERT INTO accomplishment_types (name) 
VALUES 
    ('Shoutout'),
    ('Slack'),
    ('Ticket'),
    ('Help'),
    ('Meeting'),
    ('Project'),
    ('Documentation'),
    ('Training')
ON CONFLICT (name) DO NOTHING;
`;

export const createTables = async () => {
    try {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.query(createTablesSQL);
        await queryRunner.release();
        console.log('Database tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
}; 