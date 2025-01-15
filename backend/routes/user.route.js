import express from "express";
import { getUsers, updateUser, deleteUser, registerUser, loginUser } from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);

router.get("/api/users", protect, getUsers);
router.put("/api/users/:id", protect, updateUser);
router.delete("/api/users/:id", protect, deleteUser);

export default router;