import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import versionRouter from './routes/versionRouter';

config();

const app = express();
const port = process.env.PORT || 8081;

// middlewares
app.use(cors());

// routes
app.use('/version', versionRouter);

// server
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;
