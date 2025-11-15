import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if admin
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized (Admin only)" });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Invalid or expired token" });
    }
};

export default adminAuth;
