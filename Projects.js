import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FILTER_PROJECTS } from "../redux/reducers";
import ProjectCard from "../components/ProjectCard";

function Projects({ dark }) {
  const dispatch = useDispatch();
  const filter  = useSelector((state) => state.filter);
  const projects = useSelector((state) => state.projects);

  // Filter logic
  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div style={styles.section}>
      {/* Section Label */}
      <div style={styles.sectionLabel}>
        <span style={styles.labelLine} />
        02 — What I've Built
      </div>

      <h2 style={styles.sectionTitle}>Projects</h2>
      <br /><br />

      {/* Search Bar — dispatches FILTER_PROJECTS */}
      <div style={styles.searchBar(dark)}>
        <span style={{ color: "#666680" }}>🔍</span>
        <input
          type="text"
          placeholder="Search by name or tech stack..."
          value={filter}
          onChange={(e) =>
            dispatch({ type: FILTER_PROJECTS, payload: e.target.value })
          }
          style={styles.searchInput}
        />
        {filter && (
          <button
            onClick={() => dispatch({ type: FILTER_PROJECTS, payload: "" })}
            style={styles.clearBtn}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={styles.noResults}>
          <div style={{ fontSize: "40px" }}>🔎</div>
          <p style={{ color: "#666680" }}>No projects match "{filter}"</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              dark={dark}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  section: { padding: "90px 48px", maxWidth: "1100px", margin: "0 auto" },
  sectionLabel: {
    display: "flex", alignItems: "center", gap: "14px",
    fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
    color: "#666680", marginBottom: "48px",
  },
  labelLine: { display: "inline-block", width: "36px", height: "1px", background: "#7fffb2" },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: "clamp(32px,5vw,58px)", lineHeight: 1,
    letterSpacing: "-2px", marginBottom: "16px",
  },
  searchBar: (dark) => ({
    display: "flex", alignItems: "center", gap: "12px",
    background: dark ? "#13131c" : "#ffffff",
    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: "8px", padding: "12px 16px", marginBottom: "32px",
  }),
  searchInput: {
    flex: 1, background: "none", border: "none", outline: "none",
    color: "inherit", fontFamily: "'DM Mono', monospace", fontSize: "13px",
  },
  clearBtn: {
    background: "none", border: "none", color: "#666680",
    cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  noResults: {
    textAlign: "center", padding: "60px", color: "#666680",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
  },
};

export default Projects;
