import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getReservations, createReservation, updateReservation, deleteReservation } from "../controllers/reservation.controller.js";

const routerReservation = express.Router();

routerReservation.get("/api/reservations", protect, getReservations);
routerReservation.post("/api/reservations", createReservation);
routerReservation.put("/api/reservations/:id", protect, updateReservation);
routerReservation.delete("/api/reservations/:id", protect, deleteReservation);

/*
routerReservation.get("/api/reservations", getReservations);
routerReservation.post("/api/reservations", createReservation);
routerReservation.put("/api/reservations/:id", updateReservation);
routerReservation.delete("/api/reservations/:id", deleteReservation);
*/
export default routerReservation ;