import React, { useEffect, useState } from "react";
import API from "../api";

export default function MoviePlayer({ movie, onClose }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const movieId = movie._id || movie.id;

  const fetchComments = async () => {
    try {
      // If backend provides /movies/:id and returns comments
      const res = await API.get(`/movies/${movieId}`);
      setComments(res.data.comments || []);
    } catch (err) {
      // if backend doesn't return comments there, optionally fetch from a comment endpoint
      console.warn("Could not load comments for movie", movieId, err);
      setComments(movie.comments || []);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [movieId]);

  const postComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await API.post(`/movies/${movieId}/comment`, { text: text.trim() });
      // res.data is the created comment
      setComments(prev => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.error("postComment error", err);
      alert("Failed to post comment. Try again.");
    }
  };

  return (
    <div className="player-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800 }}>{movie.title}</div>
        {onClose && <button className="nav-btn btn-ghost" onClick={onClose}>Close</button>}
      </div>

      <div style={{ marginTop: 12 }}>
        {movie.videoUrl ? (
          <video controls className="video-iframe" src={movie.videoUrl} style={{ width: "100%" }} />
        ) : movie.video ? (
          <iframe className="video-iframe" src={movie.video} title={movie.title} allowFullScreen />
        ) : null}
      </div>

      <div style={{ marginTop: 12, color: "var(--muted)" }}>{movie.description}</div>

      <div style={{ marginTop: 12 }}>
        <form onSubmit={postComment}>
          <input className="input" placeholder="Add comment" value={text} onChange={e => setText(e.target.value)} />
          <button className="btn-ghost" style={{ marginTop: 8 }}>Post Comment</button>
        </form>
      </div>

      <div style={{ marginTop: 12 }}>
        {comments.length === 0 ? (
          <div style={{ color: "var(--muted)" }}>No comments yet.</div>
        ) : (
          comments.map(c => (
            <div className="comment" key={c._id || c.createdAt}>
              <div className="meta">
                <div><strong>{c.username || 'Anonymous'}</strong> <span style={{ color: "var(--muted)", fontSize: 12 }}>• {new Date(c.createdAt).toLocaleString()}</span></div>
              </div>
              <div style={{ marginTop: 6 }}>{c.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
