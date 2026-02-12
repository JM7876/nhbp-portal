import React from "react";
import PortalBackground from "../shared/PortalBackground";
import { NHBP, FONTS, SPACING, TRANSITIONS } from "../../theme";

export default function WelcomePage({ onStartRequest }) {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PortalBackground />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", position: "relative", zIndex: 1, padding: "60px 24px" }}>

        {/* Turtle icon — 100px glass rounded square with glow */}
        <div className="glass-full" style={{
          width: 100, height: 100, borderRadius: 24,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 40px rgba(20,169,162,0.15), 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
          opacity: 0, animation: "fadeSlide 0.7s ease forwards",
          animationDelay: "0s",
        }}>
          <span style={{ fontSize: 48, filter: "drop-shadow(0 0 10px rgba(20, 169, 162, 0.5))" }}>🐢</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: FONTS.sizes.hero, fontWeight: FONTS.weights.hero, margin: 0, marginTop: 36,
          color: "var(--text-primary)", letterSpacing: "0.04em", lineHeight: 1.2,
          opacity: 0, animation: "fadeSlide 0.7s ease forwards",
          animationDelay: "0.15s",
        }}>
          NHBP Communications
        </h1>

        {/* Subtitle — REQUEST PORTAL */}
        <p style={{
          fontSize: "clamp(14px, 1.8vw, 22px)", color: "rgba(20,169,162,0.6)",
          fontWeight: 500, margin: "24px 0 0",
          letterSpacing: "0.5em", textTransform: "uppercase",
          opacity: 0, animation: "fadeSlide 0.7s ease forwards",
          animationDelay: "0.3s",
        }}>
          REQUEST PORTAL
        </p>

        {/* Decorative divider */}
        <div style={{
          width: 100, height: 1, margin: "28px 0",
          background: "linear-gradient(90deg, transparent, rgba(20,169,162,0.6), transparent)",
          opacity: 0, animation: "fadeSlide 0.7s ease forwards",
          animationDelay: "0.45s",
        }} />

        {/* Tagline */}
        <p style={{
          fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: FONTS.weights.tagline,
          color: "var(--text-secondary)", margin: "32px 0 0",
          lineHeight: 1.6,
          opacity: 0, animation: "fadeSlide 0.7s ease forwards",
          animationDelay: "0.6s",
        }}>
          Where departments come to create.
        </p>

        {/* Start a Request CTA — exact spec */}
        <button
          onClick={onStartRequest}
          style={{
            padding: "20px 60px", borderRadius: SPACING.buttonBorderRadius, cursor: "pointer",
            minWidth: 300, marginTop: 40,
            backdropFilter: "blur(20px) saturate(1.4) brightness(1.1)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4) brightness(1.1)",
            border: "1px solid rgba(20,169,162,0.2)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            fontSize: FONTS.sizes.button, fontWeight: FONTS.weights.button, letterSpacing: "0.06em",
            color: "rgba(20,169,162,0.8)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            fontFamily: "var(--font-primary)",
            opacity: 0, animation: "fadeSlide 0.7s ease forwards",
            animationDelay: "0.75s",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseDown={e => { e.target.style.borderColor = TRANSITIONS.clickBorder; e.target.style.boxShadow = `0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05), ${TRANSITIONS.clickGlow}`; }}
          onMouseUp={e => { e.target.style.borderColor = "rgba(20,169,162,0.2)"; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"; }}
        >
          Start a Request
        </button>

      </div>
    </div>
  );
}
