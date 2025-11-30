import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create the connection pool (Using values from .env)
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nexus_audio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert to promise-based interface (modern async/await)
const promisePool = pool.promise();

// Function to test the connection
export const testConnection = async () => {
    try {
        const [rows] = await promisePool.query('SELECT 1');
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        // Important: Show why it failed (password? port?)
    }
};

export default promisePool;