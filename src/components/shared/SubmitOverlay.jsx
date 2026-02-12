import React from "react";
import { NHBP } from "../../theme";

const SubmitOverlay = ({ status, onRetry }) => {
  if (status === "idle") return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(7,10,16,0.85)", backdropFilter: "blur(8px)",
    }}>
      <div style={{
        padding: "28px 40px", borderRadius: 20, textAlign: "center",
        backdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
        background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        border: "1px solid rgba(20,169,162,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
        maxWidth: 340,
      }}>
        {status === "loading" && (
          <>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", margin: "0 auto 16px",
              border: "3px solid rgba(20,169,162,0.2)", borderTopColor: NHBP.turquoise,
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-primary)" }}>Submitting...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 20, fontFamily: "var(--font-primary)" }}>
              Something went wrong. Try again?
            </p>
            <button onClick={onRetry} style={{
              padding: "12px 28px", borderRadius: 10, cursor: "pointer",
              background: "rgba(20,169,162,0.15)", border: "1px solid rgba(20,169,162,0.3)",
              color: NHBP.turquoiseLight, fontSize: 14, fontWeight: 600, fontFamily: "var(--font-primary)",
            }}>
              Retry
            </button>
          </>
        )}
        {status === "saved-locally" && (
          <>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💾</div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontFamily: "var(--font-primary)" }}>
              Your request was saved locally.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-primary)" }}>
              Our team has been notified.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitOverlay;
