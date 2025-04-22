import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRoutes from './routes/index.js';
import { createApolloServer } from './graphql/index.js';



dotenv.config();
connectDB();

const app = express();

// Middleware
await createApolloServer(app);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});