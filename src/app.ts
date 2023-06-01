import express, { json } from 'express';

const app = express();
app.use(json());

const PORT: number = 3000;
app.listen(PORT, () => console.log('Server is running'));