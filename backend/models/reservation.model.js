import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    people: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, {
    timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;