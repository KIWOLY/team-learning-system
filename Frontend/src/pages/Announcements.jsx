import React from "react";

export default function Announcements() {
  const announcements = [
    { id: 1, title: "Project Kickoff", content: "Welcome to TLMS! Let's collaborate and learn." },
    { id: 2, title: "Next Meeting", content: "We will meet on Monday at 10:00 AM." },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Announcements</h1>
      {announcements.map((a) => (
        <div key={a.id} style={{ background: "#f1f3f6", padding: "1rem", marginBottom: "0.5rem", borderRadius: "8px" }}>
          <h3>{a.title}</h3>
          <p>{a.content}</p>
        </div>
      ))}
    </div>
  );
}
