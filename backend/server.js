import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movies.js";
import reviewRoutes from "./routes/reviews.js";


dotenv.config();

const app = express(); // ✅ must come before app.use
app.use("/api/reviews", reviewRoutes);
app.use(cors());
app.use(express.json());

// ✅ your routes come after app is defined
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
