import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extrage tokenul
  
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default protect;