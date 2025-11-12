import Review from "../models/Review.js";

// ✅ Get all reviews (public)
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("getReviews error:", error);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

// ✅ Post a new review (public, no login required)
export const postReview = async (req, res) => {
  try {
    const { movieName, text } = req.body;

    if (!movieName || !text) {
      return res.status(400).json({ message: "Movie name and review text required" });
    }

    const review = new Review({
      movieName,
      text,
      username: "Anonymous",
      createdAt: new Date(),
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.error("postReview error:", error);
    res.status(500).json({ message: "Server error while posting review" });
  }
};
