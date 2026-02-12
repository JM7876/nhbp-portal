import React from "react";
import { NHBP, TRANSITIONS } from "../../theme";

const BottomFormNav = React.memo(({ onBack, onNext, onHome, canGoBack, canGoNext, nextLabel, showNext = true }) => (
  <div style={{
    position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
    padding: "18px 28px 20px", maxWidth: 680, margin: "0 auto",
    background: "linear-gradient(0deg, rgba(8,9,12,0.95) 60%, transparent)",
    backdropFilter: "blur(12px)",
  }}>
    {/* Back */}
    <button onClick={onBack} disabled={!canGoBack}
      style={{
        background: "none", border: "none", color: "rgba(255,255,255,0.35)",
        fontSize: 13, cursor: canGoBack ? "pointer" : "default", padding: "10px 16px",
        fontFamily: "var(--font-primary)", opacity: canGoBack ? 1 : 0.3,
        transition: "all 0.2s ease", minWidth: 80,
      }}>
      ← Back
    </button>

    {/* Home — turtle in glass pill */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <button onClick={onHome}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 44, height: 44, borderRadius: 22, cursor: "pointer",
          backdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
          WebkitBackdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          border: "1px solid rgba(20,169,162,0.15)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
          fontSize: 20, padding: 0,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseDown={e => { e.currentTarget.style.borderColor = TRANSITIONS.clickBorder; e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.2), ${TRANSITIONS.clickGlow}`; }}
        onMouseUp={e => { e.currentTarget.style.borderColor = "rgba(20,169,162,0.15)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"; }}
      >
        🐢
      </button>
      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-primary)", letterSpacing: "0.1em" }}>Services</span>
    </div>

    {/* Next */}
    {showNext ? (
      <button onClick={onNext} disabled={!canGoNext}
        style={{
          background: canGoNext ? "rgba(20,169,162,0.12)" : "transparent",
          border: `1px solid ${canGoNext ? "rgba(20,169,162,0.3)" : "rgba(255,255,255,0.05)"}`,
          color: canGoNext ? NHBP.turquoiseLight : "rgba(255,255,255,0.2)",
          fontSize: 13, fontWeight: 600, cursor: canGoNext ? "pointer" : "default",
          padding: "10px 20px", borderRadius: 10, minWidth: 80,
          fontFamily: "var(--font-primary)", transition: "all 0.3s ease",
          boxShadow: canGoNext ? "0 0 16px rgba(20,169,162,0.06)" : "none",
        }}
        onMouseDown={e => { if (canGoNext) { e.currentTarget.style.borderColor = TRANSITIONS.clickBorder; e.currentTarget.style.boxShadow = TRANSITIONS.clickGlow; }}}
        onMouseUp={e => { if (canGoNext) { e.currentTarget.style.borderColor = "rgba(20,169,162,0.3)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(20,169,162,0.06)"; }}}
      >
        {nextLabel || "Next →"}
      </button>
    ) : <div style={{ minWidth: 80 }} />}
  </div>
));

export { BottomFormNav };
