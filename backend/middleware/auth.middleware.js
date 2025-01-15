import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    const token = req.cookies?.token;
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

export default protect;