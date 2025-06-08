import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config();

// Create and export the TypeORM data source
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'work_progress_tracker',
    synchronize: false, // We'll handle table creation manually
    logging: process.env.NODE_ENV === 'development',
    entities: [path.join(__dirname, '../entities/*.{ts,js}')],
    migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
    subscribers: [],
});

// Connect to the database
export const connectDB = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('Database connection established successfully');
        }
    } catch (error) {
        console.error('Error during database connection:', error);
        throw error;
    }
};

// Create tables if they don't exist
export const createTables = async () => {
    try {
        // Ensure we're connected first
        if (!AppDataSource.isInitialized) {
            await connectDB();
        }

        // Run migrations to create tables
        await AppDataSource.runMigrations();
        console.log('Database tables created/updated successfully');
    } catch (error) {
        console.error('Error creating database tables:', error);
        throw error;
    }
};

// Initialize both connection and tables
export const initializeDatabase = async () => {
    try {
        await connectDB();
        await createTables();
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error;
    }
}; 