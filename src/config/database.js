import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',   
    host: 'localhost',       
    database: 'main',    
    password: 'Bloomingdales1*',
    port: 5050,
});

export default pool;