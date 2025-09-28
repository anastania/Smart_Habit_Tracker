import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";


dotenv.config();

const PORT = process.env.PORT || 5000;  

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/habits", habitRoutes);
app.use(errorHandler);

// Basic route
app.get("/", (req, res) => {
    res.json({ message: "Smart Habit Tracker API is running!" });
});

// Connect to database and start server
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();

