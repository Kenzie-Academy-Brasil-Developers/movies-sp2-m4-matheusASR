import { Client } from 'pg';

const client: Client = new Client({
    user: 'mathe',
    password: 'Sama4122',
    host: 'localhost',
    database: 'm4_sprint2',
    port: 5432,
})