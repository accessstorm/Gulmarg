import dotenv from 'dotenv';
//import mongoose from 'mongoose';
import express from 'express';
import { runGemini } from './geminiController.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/gemini', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).send("A prompt must be provided");
    }
    const result = await runGemini(prompt);
    res.send({ response: result });
  } catch (error) {
    console.error("Error during Gemini API call", error);
    res.status(500).send("Error during processing");
  }
});
// MongoDB Connection
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mywebapp')
//  .then(() => console.log('MongoDB connected'))
//  .catch(err => console.log('MongoDB connection error:', err));

// API Routes will go here
// app.use('/api/something', require('./routes/somethingRoutes'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});