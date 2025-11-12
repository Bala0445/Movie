import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movieName: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
