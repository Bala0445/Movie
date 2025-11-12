import React, { useEffect, useState } from "react";
import API from "../api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get("/reviews");
        setReviews(res.data || []);
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, []);

  const post = async (e) => {
    e.preventDefault();
    if (!movieName.trim() || !text.trim()) {
      alert("Please provide movie name and review text.");
      return;
    }

    try {
      const res = await API.post("/reviews", { movieName: movieName.trim(), text: text.trim() });
      // add returned review to UI
      setReviews(prev => [res.data, ...prev]);
      setMovieName("");
      setText("");
    } catch (err) {
      console.error("Error posting review", err);
      alert("Failed to post review. Try again.");
    }
  };

  return (
    <div className="reviews-list">
      <h2>Reviews</h2>

      <form className="form-card" onSubmit={post}>
        <input
          className="input"
          placeholder="Movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Write your review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ height: 120 }}
        />
        <button className="btn-block btn-primary" type="submit">Post Review</button>
      </form>

      <div style={{ marginTop: 18 }}>
        {reviews.length === 0 ? (
          <div style={{ color: "var(--muted)" }}>No reviews yet.</div>
        ) : (
          reviews.map(r => (
            <div className="review-item" key={r._id || r.createdAt}>
              <div style={{ fontWeight: 800 }}>{r.movieName}</div>
              <div style={{ color: "var(--muted)" }}>{r.username || 'Anonymous'} • {new Date(r.createdAt).toLocaleString()}</div>
              <div style={{ marginTop: 8 }}>{r.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
