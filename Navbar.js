import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ dark, toggleTheme }) {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#7fffb2" : "#666680",
    textDecoration: "none",
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'DM Mono', monospace",
    transition: "color 0.2s",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  });

  return (
    <nav style={styles.nav(dark)}>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <div style={styles.logo}>Portfolio_</div>
      </NavLink>

      <div style={styles.links}>
        <NavLink to="/" end style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/projects" style={linkStyle}>
          Projects
        </NavLink>
        <NavLink to="/contact" style={linkStyle}>
          Contact
        </NavLink>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          style={styles.themeBtn(dark)}
        >
          <div style={styles.knob(dark)}>{dark ? "🌙" : "☀️"}</div>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: (dark) => ({
    position: "sticky",
    top: 0,
    zIndex: 100,
    padding: "18px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    background: dark ? "rgba(9,9,15,0.9)" : "rgba(244,244,240,0.9)",
    backdropFilter: "blur(20px)",
  }),
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "18px",
    color: "#7fffb2",
    letterSpacing: "-0.5px",
  },
  links: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  },
  themeBtn: (dark) => ({
    width: "42px",
    height: "24px",
    borderRadius: "100px",
    background: dark ? "rgba(127,255,178,0.2)" : "rgba(0,0,0,0.12)",
    border: "1px solid #7fffb2",
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "3px",
    transition: "background 0.3s",
  }),
  knob: (dark) => ({
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#7fffb2",
    transition: "transform 0.3s",
    transform: dark ? "translateX(18px)" : "translateX(0px)",
    fontSize: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};

export default Navbar;
