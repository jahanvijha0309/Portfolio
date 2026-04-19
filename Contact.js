import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGE } from "../redux/reducers";

function Contact({ dark }) {
  const dispatch  = useDispatch();
  const messages  = useSelector((state) => state.messages);

  // Controlled form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Validate fields
  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Name is required";
    if (!form.email.trim())   errs.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  // Submit handler — dispatches ADD_MESSAGE
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    dispatch({
      type: ADD_MESSAGE,
      payload: { ...form, id: Date.now() },
    });
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div style={styles.section}>
      {/* Section Label */}
      <div style={styles.sectionLabel}>
        <span style={styles.labelLine} />
        03 — Let's Talk
      </div>

      <div style={styles.grid}>
        {/* ── Left: Info ── */}
        <div>
          <h2 style={styles.sectionTitle}>Get In<br />Touch</h2>
          <p style={styles.infoText}>
            Open to internships, collaborations, and interesting projects.
            Let's build something that matters together.
          </p>

          <div style={styles.contactLinks}>
            {[
              { icon: "📧", label: "Email", val: "mailto:jahanvijha0309@gmail.com" },
              { icon: "⚡", label: "GitHub",   val: "https://github.com/jahanvijha0309"} ,
              { icon: "💼", label: "LinkedIn", val: "https://www.linkedin.com/in/jahanvi0309" },
            ].map((c) => (
              <div key={c.label} style={styles.contactLink(dark)}>
                <span style={{ fontSize: "18px" }}>{c.icon}</span>
                <div>
                  <div style={styles.clLabel}>{c.label}</div>
<div style={styles.clVal}>
  <a href={c.val} target="_blank" rel="noopener noreferrer">
    {c.val}
  </a>
</div>                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div>
          {/* Success Banner */}
          {success && (
            <div style={styles.successBanner}>
              ✅ Message sent! I'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Name */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                style={styles.input(dark, !!errors.name)}
              />
              {errors.name && (
                <span style={styles.errorMsg}>⚠ {errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                style={styles.input(dark, !!errors.email)}
              />
              {errors.email && (
                <span style={styles.errorMsg}>⚠ {errors.email}</span>
              )}
            </div>

            {/* Message */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                style={{ ...styles.input(dark, !!errors.message), minHeight: "110px", resize: "none" }}
              />
              {errors.message && (
                <span style={styles.errorMsg}>⚠ {errors.message}</span>
              )}
            </div>

            <button type="submit" style={styles.btnPrimary}>
              Send Message →
            </button>

            {/* Message Count */}
            {messages.length > 0 && (
              <p style={styles.msgCount}>
                Total messages submitted:{" "}
                <span style={{ color: "#7fffb2" }}>{messages.length}</span>
              </p>
            )}
          </form>
        </div>
      </div>
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
    letterSpacing: "-2px", marginBottom: "20px",
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" },
  infoText: { color: "#666680", lineHeight: 1.9, marginBottom: "36px" },
  contactLinks: { display: "flex", flexDirection: "column", gap: "12px" },
  contactLink: (dark) => ({
    display: "flex", alignItems: "center", gap: "14px",
    padding: "14px 18px",
    background: dark ? "#13131c" : "#ffffff",
    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: "8px", cursor: "pointer",
  }),
  clLabel: { fontSize: "11px", color: "#666680" },
  clVal:   { fontSize: "12px" },
  successBanner: {
    background: "rgba(127,255,178,0.1)",
    border: "1px solid rgba(127,255,178,0.3)",
    borderRadius: "8px", padding: "16px 20px",
    color: "#7fffb2", fontSize: "13px",
    display: "flex", alignItems: "center", gap: "10px",
    marginBottom: "20px",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666680" },
  input: (dark, hasError) => ({
    background: dark ? "#13131c" : "#ffffff",
    border: `1px solid ${hasError ? "#ff6b6b" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: "6px", padding: "12px 14px",
    color: dark ? "#e8e8f0" : "#0a0a0f",
    fontFamily: "'DM Mono', monospace", fontSize: "13px",
    outline: "none", width: "100%",
  }),
  errorMsg: { fontSize: "11px", color: "#ff6b6b", marginTop: "4px" },
  btnPrimary: {
    padding: "14px 28px", background: "#7fffb2", color: "#0a0a0f",
    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px",
    borderRadius: "4px", border: "none", cursor: "pointer",
    alignSelf: "flex-start",
  },
  msgCount: { fontSize: "12px", color: "#666680", marginTop: "8px" },
};

export default Contact;
