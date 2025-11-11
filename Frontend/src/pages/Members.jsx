import React from "react";

export default function Members() {
  const members = [
    { id: 1, role: "Frontend Developer" },
    { id: 2, role: "Backend Developer" },
    { id: 3, role: "Frontend Developer" },
    { id: 4, role: "Backend Developer" },
    { id: 5, role: "Frontend Developer" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Team Members</h1>
      {members.map((member) => (
        <div key={member.id} style={{ background: "#f1f3f6", padding: "1rem", marginBottom: "0.5rem", borderRadius: "8px" }}>
          <p>Role: {member.role}</p>
        </div>
      ))}
    </div>
  );
}
