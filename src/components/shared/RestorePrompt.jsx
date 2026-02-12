import React from "react";
import { NHBP } from "../../theme";

const RestorePrompt = ({ onYes, onNo }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9998,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(7,10,16,0.85)", backdropFilter: "blur(8px)",
  }}>
    <div style={{
      padding: "32px 36px", borderRadius: 20, textAlign: "center", maxWidth: 380,
      backdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
      background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
      border: "1px solid rgba(20,169,162,0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
    }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
      <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 8, fontFamily: "var(--font-primary)" }}>
        Continue where you left off?
      </p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 24, fontFamily: "var(--font-primary)" }}>
        We found your previous progress for this form.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={onNo} style={{
          padding: "10px 24px", borderRadius: 10, cursor: "pointer",
          background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "var(--font-primary)",
        }}>Start Fresh</button>
        <button onClick={onYes} style={{
          padding: "10px 24px", borderRadius: 10, cursor: "pointer",
          background: "rgba(20,169,162,0.15)", border: "1px solid rgba(20,169,162,0.3)",
          color: NHBP.turquoiseLight, fontSize: 14, fontWeight: 600, fontFamily: "var(--font-primary)",
        }}>Yes, Continue</button>
      </div>
    </div>
  </div>
);

export default RestorePrompt;
