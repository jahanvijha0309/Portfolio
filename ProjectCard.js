import React from "react";
import { useNavigate } from "react-router-dom";

const badgeColors = {
  Featured: {
    background: "rgba(127,255,178,0.1)",
    color: "#7fffb2",
    border: "1px solid rgba(127,255,178,0.2)",
  },
  Web: {
    background: "rgba(107,179,255,0.1)",
    color: "#6bb3ff",
    border: "1px solid rgba(107,179,255,0.2)",
  },
  ML: {
    background: "rgba(255,107,107,0.1)",
    color: "#ff6b6b",
    border: "1px solid rgba(255,107,107,0.2)",
  },
};

function ProjectCard({ project, index, dark }) {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card(dark, project.badge === "Featured")}
      onClick={() => navigate(`/projects/${project.id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(127,255,178,0.3)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          project.badge === "Featured"
            ? "rgba(127,255,178,0.18)"
            : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.num}>0{index + 1}</span>
        <span style={{ ...styles.badge, ...badgeColors[project.badge] }}>
          {project.badge}
        </span>
      </div>

      {/* Icon */}
      <span style={styles.icon}>{project.icon}</span>

      {/* Title */}
      <h3 style={styles.title}>{project.title}</h3>

      {/* Description */}
      <p style={styles.desc}>{project.description}</p>

      {/* Tech Stack */}
      <div style={styles.techStack}>
        {project.tech.map((t) => (
          <span key={t} style={styles.pill(dark)}>
            {t}
          </span>
        ))}
      </div>

      {/* Link */}
      <button style={styles.link}>View Details →</button>
    </div>
  );
}

const styles = {
  card: (dark, featured) => ({
    background: dark ? "#13131c" : "#ffffff",
    border: `1px solid ${featured ? "rgba(127,255,178,0.18)" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: "12px",
    padding: "28px",
    cursor: "pointer",
    transition: "border-color 0.3s, transform 0.3s",
  }),
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  num: {
    fontSize: "11px",
    color: "#666680",
    letterSpacing: "0.1em",
  },
  badge: {
    fontSize: "10px",
    padding: "3px 10px",
    borderRadius: "100px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  icon: {
    fontSize: "36px",
    marginBottom: "16px",
    display: "block",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    letterSpacing: "-0.5px",
    marginBottom: "10px",
  },
  desc: {
    fontSize: "13px",
    color: "#666680",
    lineHeight: 1.8,
    marginBottom: "20px",
  },
  techStack: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "20px",
  },
  pill: (dark) => ({
    padding: "3px 9px",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: "4px",
    fontSize: "11px",
    color: "#666680",
    fontFamily: "'DM Mono', monospace",
  }),
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#7fffb2",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "'DM Mono', monospace",
  },
};

export default ProjectCard;
