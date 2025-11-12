import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/users/register", { username, email, password });
      if (res.status === 201 || res.status === 200) {
        // go to login page
        navigate("/login");
      } else {
        alert(res.data?.message || "Register failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form onSubmit={submit}>
        <input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-block btn-primary" type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
