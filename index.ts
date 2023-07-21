import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { postRouter } from './src/routes';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use('/api', postRouter);

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

const PORT = process.env.PORT || 5051;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});