import express from 'express';
import cors from 'cors';
import mongooose from 'mongoose';
import {MONGO_URI} from './config.mjs';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})
