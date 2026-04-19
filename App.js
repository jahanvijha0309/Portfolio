import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import useLocalStorage from "./hooks/useLocalStorage";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";

// ── 404 Page ─────────────────────────────────────────────────
function NotFound({ navigate, dark }) {
  return (
    <div style={styles.notFound}>
      <div style={styles.code404(dark)}>404</div>
      <h2 style={styles.notFoundTitle}>Page Not Found</h2>
      <p style={{ color: "#666680" }}>This route doesn't exist. Head back home.</p>
      <button style={styles.btnPrimary} onClick={() => navigate("/")}>
        Go Home →
      </button>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer({ dark }) {
  return (
    <footer style={styles.footer(dark)}>
      <span style={{ color: "#666680" }}>© 2026 — Built with passion &amp; React</span>
      <span style={{ color: "#666680" }}>
        TY BSc CS · Sem 6 · <span style={{ color: "#7fffb2" }}>Narmada College</span>
      </span>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
function AppContent() {
  // Custom Hook — persists theme in localStorage
  const [dark, setDark] = useLocalStorage("portfolio-theme", true);

  const toggleTheme = () => setDark((d) => !d);

  // Apply global CSS variables + Google Fonts
  useEffect(() => {
    // Inject Google Fonts
    const fontLink = document.getElementById("gfonts");
    if (!fontLink) {
      const link = document.createElement("link");
      link.id = "gfonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Instrument+Serif:ital@0;1&display=swap";
      document.head.appendChild(link);
    }

    // Apply global styles
    document.body.style.background = dark ? "#09090f" : "#f4f4f0";
    document.body.style.color = dark ? "#e8e8f0" : "#0a0a0f";
    document.body.style.fontFamily = "'DM Mono', monospace";
    document.body.style.fontSize = "14px";
    document.body.style.lineHeight = "1.7";
    document.body.style.transition = "background 0.4s, color 0.4s";
    document.body.style.margin = "0";
  }, [dark]);

  return (
    <BrowserRouter>
      {/* Navbar on all pages */}
      <Navbar dark={dark} toggleTheme={toggleTheme} />

      {/* Routes */}
      <Routes>
        <Route path="/"            element={<Home dark={dark} />} />
        <Route path="/projects"    element={<Projects dark={dark} />} />
        <Route path="/projects/:id" element={<ProjectDetail dark={dark} />} />
        <Route path="/contact"     element={<Contact dark={dark} />} />
        <Route path="*"            element={<NotFound dark={dark} />} />
      </Routes>

      {/* Footer on all pages */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)",
        }}
      />
      <Footer dark={dark} />
    </BrowserRouter>
  );
}

// Wrap with Redux Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = {
  notFound: {
    minHeight: "calc(100vh - 62px)",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    textAlign: "center", gap: "20px", padding: "48px",
  },
  code404: (dark) => ({
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: "120px", lineHeight: 1, letterSpacing: "-6px",
    color: "transparent",
    WebkitTextStroke: `2px ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)"}`,
  }),
  notFoundTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px",
  },
  btnPrimary: {
    padding: "14px 28px", background: "#7fffb2", color: "#0a0a0f",
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px",
    borderRadius: "4px", border: "none", cursor: "pointer",
  },
  footer: (dark) => ({
    borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    padding: "32px 48px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    fontSize: "12px",
  }),
};

export default App;
