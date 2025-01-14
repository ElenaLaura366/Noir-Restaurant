import express from "express";
import { getUserReservations, cancelReservation } from "../controllers/reservation.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/reservations", protect, getUserReservations);
router.delete("/api/reservations/:id", protect, cancelReservation);

export default router;