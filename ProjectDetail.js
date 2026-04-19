import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProjectDetail({ dark }) {
  // useParams — reads :id from /projects/:id
  const { id }     = useParams();
  const navigate   = useNavigate();
  const projects   = useSelector((state) => state.projects);
  const project    = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div style={styles.page}>
        <button style={styles.backBtn} onClick={() => navigate("/projects")}>
          ← Back to Projects
        </button>
        <p style={{ color: "#666680" }}>Project not found.</p>
      </div>
    );
  }

  const badgeColors = {
    Featured: { background: "rgba(127,255,178,0.1)", color: "#7fffb2", border: "1px solid rgba(127,255,178,0.2)" },
    Web:      { background: "rgba(107,179,255,0.1)", color: "#6bb3ff", border: "1px solid rgba(107,179,255,0.2)" },
    ML:       { background: "rgba(255,107,107,0.1)", color: "#ff6b6b", border: "1px solid rgba(255,107,107,0.2)" },
  };

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate("/projects")}>
        ← Back to Projects
      </button>

      {/* Icon */}
      <span style={styles.icon}>{project.icon}</span>

      {/* Badge */}
      <span style={{ ...styles.badge, ...badgeColors[project.badge], marginBottom: "20px", display: "inline-block" }}>
        {project.badge}
      </span>

      {/* Title */}
      <h1 style={styles.title}>{project.title}</h1>

      {/* Description */}
      <p style={styles.desc}>{project.description}</p>

      {/* Detail Box */}
      <div style={styles.detailBox(dark)}>{project.detail}</div>

      {/* Tech Stack */}
      <div style={styles.techStack}>
        {project.tech.map((t) => (
          <span key={t} style={styles.pill(dark)}>{t}</span>
        ))}
      </div>

      {/* CTA */}
    </div>
  );
}

const styles = {
  page: { padding: "60px 48px", maxWidth: "800px", margin: "0 auto" },
  backBtn: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    fontSize: "12px", color: "#666680", cursor: "pointer",
    background: "none", border: "none", fontFamily: "'DM Mono', monospace",
    marginBottom: "48px",
  },
  icon: { fontSize: "64px", marginBottom: "24px", display: "block" },
  badge: {
    fontSize: "10px", padding: "3px 10px", borderRadius: "100px",
    letterSpacing: "0.1em", textTransform: "uppercase",
  },
  title: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: "clamp(32px,5vw,56px)", letterSpacing: "-2px",
    marginBottom: "20px", marginTop: "12px",
  },
  desc: { color: "#666680", lineHeight: 1.9, marginBottom: "24px", fontSize: "15px" },
  detailBox: (dark) => ({
    background: dark ? "#13131c" : "#ffffff",
    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    borderLeft: "3px solid #7fffb2",
    borderRadius: "8px", padding: "20px 24px",
    marginBottom: "28px", lineHeight: 1.8, fontSize: "14px",
  }),
  techStack: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "32px" },
  pill: (dark) => ({
    padding: "3px 9px",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: "4px", fontSize: "11px", color: "#666680",
    fontFamily: "'DM Mono', monospace",
  }),
  btnPrimary: {
    padding: "14px 28px", background: "#7fffb2", color: "#0a0a0f",
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px",
    borderRadius: "4px", border: "none", cursor: "pointer",
  },
};

export default ProjectDetail;
