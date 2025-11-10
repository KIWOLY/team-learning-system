import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaBullhorn, FaCog, FaSignOutAlt } from "react-icons/fa";


export default function Dashboard() {
  const navigate = useNavigate();

  // Placeholder arrays — to be fetched from backend later
  const members = []; 
  const announcements = [];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>TLMS</h2>
        <nav style={styles.nav}>
          <button style={styles.navItem}><FaHome /> Dashboard</button>
          <button style={styles.navItem}><FaUsers /> Members</button>
          <button style={styles.navItem}><FaBullhorn /> Announcements</button>
          <button style={styles.navItem}><FaCog /> Settings</button>
        </nav>
        <button onClick={() => navigate("/")} style={{ ...styles.navItem, marginTop: "auto", color: "#e74c3c" }}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.topbar}>
          <h1>Dashboard</h1>
          <p style={{ color: "#777" }}>Welcome back!</p>
        </header>

        <div style={styles.contentGrid}>
          {/* Members Section */}
          <section style={styles.cardSection}>
            <h2 style={styles.sectionTitle}>Team Members</h2>
            <div style={styles.cardGrid}>
              {members.length === 0 && <p style={{ color: "#555" }}>No members yet. Members will appear here.</p>}
            </div>
          </section>

          {/* Announcements Section */}
          <section style={styles.cardSection}>
            <h2 style={styles.sectionTitle}>Announcements</h2>
            <div style={styles.cardGrid}>
              {announcements.length === 0 && <p style={{ color: "#555" }}>No announcements yet.</p>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f4f6f8",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1e1e2f",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    position: "sticky",
    top: 0,
  },
  logo: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.8rem",
    letterSpacing: "2px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  navItem: {
    background: "none",
    border: "none",
    color: "#ddd",
    fontSize: "1rem",
    textAlign: "left",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  main: {
    flex: 1,
    padding: "2rem",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
  },
  cardSection: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    marginBottom: "1rem",
    color: "#333",
  },
  cardGrid: {
    display: "grid",
    gap: "1rem",
  },
};
