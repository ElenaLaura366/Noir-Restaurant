import Reservation from "../models/reservation.model.js";

export const getUserReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.user.id });
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Error fetching reservations" });
    }
};

export const cancelReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        reservation.status = 'Cancelled';
        await reservation.save();

        res.status(200).json({ success: true, message: "Reservation cancelled", data: reservation });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Error canceling reservation" });
    }
};