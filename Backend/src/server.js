import express from 'express'
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from '../middleware/rateLimiter.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;
//Endpoint : Combination of URL + HTTP methods that lets the client to interact with specific resources

app.use(express.json()); //This middleware will parse JSON bodies

// //Middleware
// app.use((req,res,next)=>{  
//     console.log(`request method is ${req.method} & url is ${req.url}`);
//     next();
// })

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
}));
app.use(rateLimiter);
app.use('/api/notes', notesRoutes);

connectDB().then(
    app.listen(PORT, () => {
        console.log("Server is listening on port 5000");
    })
);