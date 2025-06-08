import { AppDataSource } from '@config/connection';

export const tableOperations = {
    // Get all jobs for a user
    getJobsByUserId: async (userId: string) => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query(
                'SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC',
                [userId]
            );
        } finally {
            await queryRunner.release();
        }
    },

    // Get job with goals and accomplishments
    getJobWithDetails: async (jobId: string) => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query(`
                SELECT 
                    j.*,
                    g.id as goal_id, g.title as goal_title, g.brief_description, g.notes as goal_notes,
                    a.id as accomplishment_id, a.date, a.accomplishment, a.impact, a.recognition, 
                    a.notes as accomplishment_notes, a.state, at.name as type_name
                FROM jobs j
                LEFT JOIN goals g ON j.id = g.job_id
                LEFT JOIN accomplishments a ON j.id = a.job_id
                LEFT JOIN accomplishment_types at ON a.type_id = at.id
                WHERE j.id = $1
            `, [jobId]);
        } finally {
            await queryRunner.release();
        }
    },

    // Get accomplishments for a job with pagination
    getAccomplishmentsByJobId: async (jobId: string, limit: number, offset: number) => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query(`
                SELECT 
                    a.*,
                    at.name as type_name,
                    g.title as goal_title
                FROM accomplishments a
                LEFT JOIN accomplishment_types at ON a.type_id = at.id
                LEFT JOIN goals g ON a.goal_id = g.id
                WHERE a.job_id = $1
                ORDER BY a.date DESC NULLS LAST, a.created_at DESC
                LIMIT $2 OFFSET $3
            `, [jobId, limit, offset]);
        } finally {
            await queryRunner.release();
        }
    },

    // Get all accomplishment types
    getAccomplishmentTypes: async () => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query('SELECT * FROM accomplishment_types ORDER BY name');
        } finally {
            await queryRunner.release();
        }
    },

    // Add new accomplishment type
    addAccomplishmentType: async (name: string) => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query(
                'INSERT INTO accomplishment_types (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *',
                [name]
            );
        } finally {
            await queryRunner.release();
        }
    }
}; 