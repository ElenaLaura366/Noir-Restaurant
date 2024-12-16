import express from "express";
import { getUsers, updateUser, deleteUser, registerUser, loginUser } from "../controllers/user.controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const protect = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);

router.get("/api/users", protect, getUsers);
router.put("/api/users/:id", protect, updateUser);
router.delete("/api/users/:id", protect, deleteUser);

export default router;