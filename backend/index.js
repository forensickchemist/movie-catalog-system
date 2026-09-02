require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/database");

// Routes
const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");
const featuredRoutes = require("./routes/featured");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);
app.use("/featured", featuredRoutes);

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Movie Catalog System API is running"
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Error handling
app.use(errorHandler);


const PORT = process.env.PORT || 4000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`API is now online on port ${PORT}`);
    });
};

if (require.main === module) {
    startServer();
}


module.exports = { app, mongoose };