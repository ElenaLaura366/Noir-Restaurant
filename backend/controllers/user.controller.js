import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Error in getting products",error.message);
        res.status(404).json({ success: false, message: "Product not found" });
    }
};

export const createUser = async (req, res) => {
    const user = req.body; // get user from request
    if(!user.name || !user.email || !user.password) {
        return res.status(400).json({ success:false, message: "Please fill all fields"});
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.log("Error in create product",error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User ID"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.log("Error in updating product",error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User ID"});
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User removed"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}