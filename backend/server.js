import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './config/db.js';
import cors from 'cors';
import router from './routes/user.route.js';
import routerReservation from './routes/reservation.route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/", router);

app.use("/", routerReservation);

app.listen(PORT, () => {
    connectdb();
    console.log(`Server running on port ${PORT} at http://localhost:${PORT}`);
});
