import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './config/db.js';

import router from './routes/user.route.js';


dotenv.config();

const app = express();

//middleware
app.use(express.json()); // this will allow us to parse incoming json data

const PORT = process.env.PORT || 5000;

app.use("/api/users", router);

app.listen(PORT, () => {
    connectdb();
    console.log("Server running on port 5000cat http://localhost:" + PORT);
});