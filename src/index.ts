import express from 'express';
import cors from 'cors';
import mailRouter from './routes/mailRouter';
import versionRouter from './routes/versionRouter';

const app = express();
const port = process.env.PORT || 8081;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/mail', mailRouter);
app.use('/version', versionRouter);

// server
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;
