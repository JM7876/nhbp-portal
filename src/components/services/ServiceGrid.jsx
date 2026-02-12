import React, { useState, useRef } from "react";
import PortalBackground from "../shared/PortalBackground";
import GlassCard from "../shared/GlassCard";
import { NHBP, SPACING, TRANSITIONS } from "../../theme";
import { SERVICES } from "../../constants/services";

export default function ServiceGrid({ onSelectService, onHome }) {
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PortalBackground />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: 620, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            What can we help you create?
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Pick the service that best fits your need</p>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: SPACING.sectionGap, width: "100%", maxWidth: 680, margin: "0 auto" }}>
            {SERVICES.map(s => (
              <GlassCard
                key={s.id}
                active={false}
                onClick={() => {
                  if (s.status === "live") {
                    onSelectService(s.id);
                    return;
                  }
                  if (s.status === "coming") {
                    if (toastTimer.current) clearTimeout(toastTimer.current);
                    setToast(s.label);
                    toastTimer.current = setTimeout(() => setToast(null), 2500);
                  }
                }}
                style={{
                  padding: SPACING.cardPadding, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
                  textAlign: "left",
                  opacity: s.status === "coming" ? 0.45 : 1,
                  cursor: s.status === "coming" ? "default" : "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontSize: 26, lineHeight: 1, color: "rgba(255,255,255,0.5)", transition: "color 0.3s ease" }}>{s.icon}</span>
                  {s.status === "live" && (
                    <span style={{
                      fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
                      color: "#1a1a2e", background: NHBP.turquoise, padding: "3px 8px", borderRadius: 20,
                    }}>Live</span>
                  )}
                  {s.status === "coming" && (
                    <span style={{
                      fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)",
                      padding: "3px 8px", borderRadius: 20,
                    }}>Soon</span>
                  )}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{s.label}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{s.desc}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      {/* Coming Soon toast */}
      {toast && (
        <div key={toast} style={{
          position: "fixed", bottom: 80, left: 0, right: 0, zIndex: 60,
          display: "flex", justifyContent: "center", pointerEvents: "none",
        }}>
          <div style={{
            backdropFilter: "blur(18px) saturate(1.3)",
            WebkitBackdropFilter: "blur(18px) saturate(1.3)",
            background: "rgba(15, 20, 30, 0.75)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderLeft: `3px solid ${NHBP.turquoise}`,
            borderRadius: 10, padding: "12px 20px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            fontFamily: "var(--font-primary)", fontSize: 13, color: "rgba(255,255,255,0.85)",
            whiteSpace: "nowrap",
            animation: "fadeSlide 0.3s ease forwards",
          }}>
            Coming Soon — {toast} is on its way!
          </div>
        </div>
      )}
      {/* Home turtle nav */}
      <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <button onClick={onHome}
          style={{
            width: 44, height: 44, borderRadius: 22, cursor: "pointer", fontSize: 20, padding: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
            WebkitBackdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            border: "1px solid rgba(20,169,162,0.15)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseDown={e => { e.currentTarget.style.borderColor = TRANSITIONS.clickBorder; }}
          onMouseUp={e => { e.currentTarget.style.borderColor = "rgba(20,169,162,0.15)"; }}
        >🐢</button>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>Home</span>
      </div>
    </div>
  );
}
