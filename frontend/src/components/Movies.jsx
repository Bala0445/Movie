import React, { useEffect, useState } from "react";
import API from "../api";
import MoviePlayer from "./MoviePlayer";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [tab, setTab] = useState("movies");
  const [loading, setLoading] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));

const handleComment = async (movieId) => {
  if (!user) {
    alert("Please login first!");
    return;
  }

  const res = await fetch(`http://localhost:5000/api/movies/${movieId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`, // ✅ send token
    },
    body: JSON.stringify({ text: comment }),
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.message || "Error adding comment");
  } else {
    alert("Comment added!");
    setComment("");
    getMovies(); // refresh
  }
};

  // fetch movies from backend; fallback to empty array if none
  const fetchMovies = async (search = "") => {
    setLoading(true);
    try {
      const res = await API.get("/movies", { params: { q: search } });
      setMovies(res.data || []);
    } catch (err) {
      // fallback: if backend not available or no movies, use a local list of 30+ youtube trailers
      console.warn("Failed to fetch movies from backend, using local list.");
      setMovies(localFallbackMovies.filter(m => m.title.toLowerCase().includes(search.toLowerCase())));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // immediate search as user types
  useEffect(() => {
    const id = setTimeout(() => fetchMovies(q), 300);
    return () => clearTimeout(id);
  }, [q]);

  return (
    <div>
      <div className="movies-top">
        <div className="top-left">
          <button className="tab-btn" onClick={() => setTab("movies")}>Movie</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input className="search" placeholder="Search movie" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      {tab === "movies" ? (
        <>
          <div className="movies-grid">
            {loading ? <div style={{color: 'var(--muted)'}}>Loading...</div> :
              movies.map(m => (
                <div className="movie-card" key={m._id || m.title}>
                  {/* if backend provides thumbnail use it */}
                  {m.thumbnail ? <img className="movie-thumb" src={m.thumbnail} alt={m.title} /> : null}
                  <div className="movie-title">{m.title}</div>
                  <div style={{display:'flex',gap:8}}>
                    <button className="nav-btn btn-ghost" onClick={() => setSelectedMovie(m)}>Watch</button>
                    <button className="nav-btn btn-ghost" onClick={() => window.open(m.videoUrl || m.video, "_blank")}>Open</button>
                  </div>
                </div>
              ))
            }
          </div>

          {selectedMovie && (
            <div style={{ marginTop: 18 }}>
              <MoviePlayer movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            </div>
          )}
        </>
      ) : (
        // reviews tab -- simple view; you can expand to fetch from backend
        <div className="reviews-list">
          <h2>All Reviews</h2>
          <p style={{ color: "var(--muted)" }}>Reviews are shown here. Add a review below.</p>
          {/* A simple form posting to /reviews could be added */}
        </div>
      )}
    </div>
  );
}

/* fallback local movies (30+) - used only if backend returns no movies */
/* fallback local movies (30+) - used only if backend returns no movies */
const localFallbackMovies = [
  { title: "Sample", video: "https://www.youtube.com/embed/TcMBFSGVi1c", thumbnail: "https://picsum.photos/seed/avengers/320/180" },
  { title: "Sample Video 2", video: "https://www.youtube.com/embed/zSWdZVtXT7E", thumbnail: "https://picsum.photos/seed/interstellar/320/180" },
  { title: "Sample Video 3", video: "https://www.youtube.com/embed/YoHD9XEInc0", thumbnail: "https://picsum.photos/seed/inception/320/180" },
  { title: "Sample Video 4", video: "https://www.youtube.com/embed/8ugaeA-nMTc", thumbnail: "https://picsum.photos/seed/ironman/320/180" },
  { title: "Sample Video 5", video: "https://www.youtube.com/embed/xjDjIWPwcPU", thumbnail: "https://picsum.photos/seed/blackpanther/320/180" },
  { title: "Sample Video 6", video: "https://www.youtube.com/embed/aWzlQ2N6qqg", thumbnail: "https://picsum.photos/seed/strange/320/180" },
  { title: "Sample Video 7", video: "https://www.youtube.com/embed/mqqft2x_Aa4", thumbnail: "https://picsum.photos/seed/batman/320/180" },
  { title: "Sample Video 8", video: "https://www.youtube.com/embed/JfVOs4VSpmA", thumbnail: "https://picsum.photos/seed/spiderman/320/180" },
  { title: "Sample Video 9", video: "https://www.youtube.com/embed/5PSNL1qE6VY", thumbnail: "https://picsum.photos/seed/avatar/320/180" },
  { title: "Sample Video 10", video: "https://www.youtube.com/embed/zAGVQLHvwOY", thumbnail: "https://picsum.photos/seed/joker/320/180" },
  { title: "Sample Video 11", video: "https://www.youtube.com/embed/ue80QwXMRHg", thumbnail: "https://picsum.photos/seed/thor/320/180" },
  { title: "Sample Video 12", video: "https://www.youtube.com/embed/hebWYacbdvc", thumbnail: "https://picsum.photos/seed/flash/320/180" },
  { title: "Sample Video 13", video: "https://www.youtube.com/embed/Z1BCujX3pw8", thumbnail: "https://picsum.photos/seed/captain/320/180" },
  { title: "Sample Video 14", video: "https://www.youtube.com/embed/d96cjJhvlMA", thumbnail: "https://picsum.photos/seed/guardians/320/180" },
  { title: "Sample Video 15", video: "https://www.youtube.com/embed/8YjFbMbfXaQ", thumbnail: "https://picsum.photos/seed/shangchi/320/180" },
  { title: "Sample Video 16", video: "https://www.youtube.com/embed/pWdKf3MneyI", thumbnail: "https://picsum.photos/seed/antman/320/180" },
  { title: "Sample Video 17", video: "https://www.youtube.com/embed/u9Mv98Gr5pY", thumbnail: "https://picsum.photos/seed/venom/320/180" },
  { title: "Sample Video 18", video: "https://www.youtube.com/embed/x_me3xsvDgk", thumbnail: "https://picsum.photos/seed/eternals/320/180" },
  { title: "Sample Video 19", video: "https://www.youtube.com/embed/WDkg3h8PCVU", thumbnail: "https://picsum.photos/seed/aquaman/320/180" },
  { title: "Sample Video 20", video: "https://www.youtube.com/embed/1Q8fG0TtVAY", thumbnail: "https://picsum.photos/seed/wonder/320/180" },
  { title: "Sample Video 21", video: "https://www.youtube.com/embed/3cxixDgHUYw", thumbnail: "https://picsum.photos/seed/justice/320/180" },
  { title: "Sample Video 22", video: "https://www.youtube.com/embed/vKQi3bBA1y8", thumbnail: "https://picsum.photos/seed/matrix/320/180" },
  { title: "Sample Video 23", video: "https://www.youtube.com/embed/uYPbbksJxIg", thumbnail: "https://picsum.photos/seed/oppen/320/180" },
  { title: "Sample Video 24", video: "https://www.youtube.com/embed/8g18jFHCLXk", thumbnail: "https://picsum.photos/seed/dune/320/180" },
  { title: "Sample Video 25", video: "https://www.youtube.com/embed/ONHBaC-pfsk", thumbnail: "https://picsum.photos/seed/deadpool/320/180" },
  { title: "Sample Video 26", video: "https://www.youtube.com/embed/EXeTwQWrcwY", thumbnail: "https://picsum.photos/seed/darkknight/320/180" },
  { title: "Sample Video 27", video: "https://www.youtube.com/embed/sY1S34973zA", thumbnail: "https://picsum.photos/seed/godfather/320/180" },
  { title: "Sample Video 28", video: "https://www.youtube.com/embed/s7EdQ4FqbhY", thumbnail: "https://picsum.photos/seed/pulp/320/180" },
  { title: "Sample Video 29", video: "https://www.youtube.com/embed/6hB3S9bIaco", thumbnail: "https://picsum.photos/seed/shawshank/320/180" },
  { title: "Sample Video 30", video: "https://www.youtube.com/embed/kVrqfYjkTdQ", thumbnail: "https://picsum.photos/seed/titanic/320/180" }
];

