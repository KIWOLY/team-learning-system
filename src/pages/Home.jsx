import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4a90e2, #50c878)",
      color: "#fff",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1>Welcome to TLMS</h1>
      <p>Team Learning Management System for your study group.</p>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/login")} style={{ margin: "0.5rem", padding: "0.7rem 1.5rem" }}>Login</button>
        <button onClick={() => navigate("/register")} style={{ margin: "0.5rem", padding: "0.7rem 1.5rem" }}>Register</button>
      </div>
    </div>
  );
}
