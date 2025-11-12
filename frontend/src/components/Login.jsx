import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login Successful!");
        navigate("/movies");
      } else {
        alert(res.data.message || "Invalid login details");
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0b0b0b",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "#141414",
          padding: "40px 50px",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "26px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              backgroundColor: "#1f1f1f",
              color: "white",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "25px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              backgroundColor: "#1f1f1f",
              color: "white",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "25px",
              background: "linear-gradient(90deg, #ff758c, #ff7eb3)", // 💖 Same gradient as home
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(255, 118, 150, 0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "18px",
            fontSize: "14px",
            color: "#ccc",
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#ff7eb3",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
