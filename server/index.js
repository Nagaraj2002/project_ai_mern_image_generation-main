import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectToMongoDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    const mongoURL = 'mongodb://127.0.0.1:27017/Ai-image'; // MongoDB URL with the database name "Ai-image"
    await connectToMongoDB(mongoURL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
