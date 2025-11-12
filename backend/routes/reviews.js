import express from "express";
import { getReviews, postReview } from "../controllers/reviewController.js";

const router = express.Router();

// Public routes
router.get("/", getReviews);
router.post("/", postReview);

export default router;
