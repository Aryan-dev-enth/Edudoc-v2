import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDb from './config/connect.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const port = process.env.PORT || 5000;
const db_url = process.env.MONGODB_URI;
const db_name = process.env.MONGODB_NAME;

// Set up CORS middleware
const corsOptions = {
  origin: '*', // Adjust this to restrict access to specific origins if needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use("/api/notes", notesRoutes);

// Connect to the database
connectDb(db_url, db_name);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
