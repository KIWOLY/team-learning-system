import React from "react";
import { useNavigate } from "react-router-dom";

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
          <button onClick={() => navigate("/")} style={styles.navItem}>Home</button>
          <button onClick={() => navigate("/members")} style={styles.navItem}>Members</button>
          <button onClick={() => navigate("/announcements")} style={styles.navItem}>Announcements</button>
        </nav>
        <button onClick={() => navigate("/")} style={{ ...styles.navItem, marginTop: "auto", color: "#ff6b6b" }}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.heading}>Dashboard</h1>
          <p style={styles.subtext}>Welcome back to your team workspace 👋</p>
        </header>

        {/* Quick Stats */}
        <div style={styles.cardsRow}>
          <div style={styles.infoCard}>
            <h3>Total Members</h3>
            <p style={styles.infoNumber}>{members.length}</p>
          </div>
          <div style={styles.infoCard}>
            <h3>Announcements</h3>
            <p style={styles.infoNumber}>{announcements.length}</p>
          </div>
          <div style={styles.infoCard}>
            <h3>Active Teams</h3>
            <p style={styles.infoNumber}>1</p>
          </div>
        </div>

        {/* Sections */}
        <div style={styles.sectionsGrid}>
          <section style={styles.sectionCard}>
            <h2 style={styles.sectionTitle}>Team Members</h2>
            {members.length === 0 ? (
              <p style={styles.emptyText}>No members yet. Click "Members" above to manage team.</p>
            ) : (
              members.map((member, i) => (
                <div key={i} style={styles.memberItem}>
                  <p>{member.role}</p>
                </div>
              ))
            )}
          </section>

          <section style={styles.sectionCard}>
            <h2 style={styles.sectionTitle}>Recent Announcements</h2>
            {announcements.length === 0 ? (
              <p style={styles.emptyText}>No announcements yet. Click "Announcements" above to manage updates.</p>
            ) : (
              announcements.map((a, i) => (
                <div key={i} style={styles.announcementItem}>
                  <h4>{a.title}</h4>
                  <p>{a.content}</p>
                </div>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", backgroundColor: "#f8f9fb" },
  sidebar: { width: "220px", backgroundColor: "#202040", color: "#fff", display: "flex", flexDirection: "column", padding: "2rem 1rem" },
  logo: { fontSize: "1.8rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem", color: "#50c878" },
  nav: { display: "flex", flexDirection: "column", gap: "1rem" },
  navItem: { background: "none", border: "none", color: "#ccc", fontSize: "1rem", textAlign: "left", padding: "0.8rem 1rem", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s" },
  main: { flex: 1, padding: "2rem" },
  header: { marginBottom: "2rem" },
  heading: { fontSize: "2rem", color: "#202040" },
  subtext: { color: "#666", fontSize: "1rem", marginTop: "0.5rem" },
  cardsRow: { display: "flex", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" },
  infoCard: { background: "#fff", flex: "1", minWidth: "200px", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", textAlign: "center" },
  infoNumber: { fontSize: "2rem", color: "#50c878", fontWeight: "bold", marginTop: "0.5rem" },
  sectionsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" },
  sectionCard: { background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  sectionTitle: { fontSize: "1.3rem", color: "#202040", marginBottom: "1rem", borderBottom: "2px solid #50c878", paddingBottom: "0.5rem" },
  emptyText: { color: "#888", fontStyle: "italic" },
  memberItem: { background: "#f1f3f6", padding: "0.8rem", borderRadius: "8px", marginBottom: "0.5rem" },
  announcementItem: { background: "#f1f3f6", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" },
};
