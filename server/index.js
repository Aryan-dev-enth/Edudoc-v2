import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDb from './config/connect.js';
import notesRoutes from './routes/notesRoutes.js'


const app = express();
const port = process.env.PORT;
const db_url = process.env.MONGODB_URI;
const db_name = process.env.MONGODB_NAME;

app.use(cors()); 

app.use(express.json());

app.use("/api/notes", notesRoutes );

connectDb(db_url, db_name);

app.listen(port, () => {
    console.log("Server running at ", port);
});