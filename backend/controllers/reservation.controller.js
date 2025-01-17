import Reservation from "../models/reservation.model.js";
import mongoose from "mongoose";

export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        res.status(404).json({ success: false, message: "Reservations not found" });
    }
};

export const createReservation = async (req, res) => {
    const { name, email, date, time, people, message } = req.body;
    if (!name || !email || !date || !time || !people || !message) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const reservation = new Reservation({
        name,
        email,
        date,
        time,
        people,
        message
    });

    try {
        await reservation.save();
        res.status(201).json({ success: true, data: reservation });
    } catch (error) {
        console.log("Error in create reservation", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const reservation = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Reservation ID" });
    }
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, reservation, { new: true });
        res.status(200).json({ success: true, data: updatedReservation });
    } catch (error) {
        console.log("Error in updating reservation", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteReservation = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Reservation ID" });
    }
    try {
        await Reservation.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Reservation removed" });
    } catch (error) {
        console.log("Error in deleting reservation", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};