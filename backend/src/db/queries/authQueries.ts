import { AppDataSource } from '@config/connection';

export const authQueries = {
    // Create or update user from Authentik
    upsertUser: async (authentikUserId: string, email: string, fullName: string) => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query(`
                INSERT INTO users (authentik_user_id, email, full_name)
                VALUES ($1, $2, $3)
                ON CONFLICT (authentik_user_id) 
                DO UPDATE SET 
                    email = EXCLUDED.email,
                    full_name = EXCLUDED.full_name,
                    updated_at = CURRENT_TIMESTAMP
                RETURNING *
            `, [authentikUserId, email, fullName]);
        } finally {
            await queryRunner.release();
        }
    },

    // Get user by Authentik ID
    getUserByAuthentikId: async (authentikUserId: string) => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query(
                'SELECT * FROM users WHERE authentik_user_id = $1',
                [authentikUserId]
            );
        } finally {
            await queryRunner.release();
        }
    },

    // Get user by email
    getUserByEmail: async (email: string) => {
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );
        } finally {
            await queryRunner.release();
        }
    }
}; 