import { useState, useEffect } from "react";
import { NHBP, SERVICES } from "./constants";
import { GlassCard } from "./components/GlassCard";
import VisualDesignForm from "./forms/VisualDesignForm";
import StationeryKitForm from "./forms/StationeryKitForm";
import EmployeeHeadshotsForm from "./forms/EmployeeHeadshotsForm";
import InstantAlertForm from "./forms/InstantAlertForm";
import TurtlePressForm from "./forms/TurtlePressForm";
import GeneralRequestForm from "./forms/GeneralRequestForm";
import AdminDashboard, { AdminGate } from "./admin/AdminDashboard";

export default function NHBPPortal() {
  const [screen, setScreen] = useState(() => window.location.hash === "#admin" ? "admin" : "welcome");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Listen for hash changes to navigate to admin
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#admin") setScreen("admin");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Animated background
  const Background = () => (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 800px 600px at ${mousePos.x}% ${mousePos.y}%, ${NHBP.turquoise}08, transparent),
          radial-gradient(ellipse 600px 500px at 20% 20%, ${NHBP.maroon}15, transparent),
          radial-gradient(ellipse 500px 400px at 80% 80%, ${NHBP.turquoise}06, transparent),
          radial-gradient(ellipse 400px 300px at 60% 30%, ${NHBP.red}04, transparent),
          linear-gradient(160deg, #08090c 0%, #0d1117 30%, #0c1018 60%, #080a0e 100%)
        `,
        transition: "background 0.8s ease",
      }} />
      <div style={{
        position: "fixed", width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${NHBP.turquoise}0a 0%, transparent 70%)`,
        top: -100, right: -100, animation: "float1 25s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", width: 350, height: 350, borderRadius: "50%",
        background: `radial-gradient(circle, ${NHBP.maroon}12 0%, transparent 70%)`,
        bottom: -80, left: -80, animation: "float2 30s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", width: 200, height: 200, borderRadius: "50%",
        background: `radial-gradient(circle, ${NHBP.turquoiseLight}06 0%, transparent 70%)`,
        top: "50%", left: "40%", animation: "float3 20s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, opacity: 0.015, pointerEvents: "none",
        backgroundImage: `linear-gradient(${NHBP.turquoise}20 1px, transparent 1px), linear-gradient(90deg, ${NHBP.turquoise}20 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 20px) scale(1.1); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, -25px) scale(1.05); } }
        @keyframes float3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-15px, -20px) scale(1.15); } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        input:focus, textarea:focus { border-color: ${NHBP.turquoise} !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        ::selection { background: ${NHBP.turquoise}40; }
      `}</style>
    </>
  );

  const resetToWelcome = () => {
    setScreen("welcome");
  };

  const BackToPortalButton = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Back to portal home"
      style={{
        position: "fixed", top: 16, left: 16, zIndex: 9999,
        background: "rgba(8,9,12,0.85)", backdropFilter: "blur(16px)",
        border: `1px solid ${NHBP.turquoise}30`,
        borderRadius: 10, padding: "8px 16px",
        color: NHBP.turquoiseLight, fontSize: 12, fontWeight: 600,
        cursor: "pointer", fontFamily: "Tahoma, sans-serif",
        transition: "all 0.25s ease",
        boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
      }}
      onMouseEnter={e => { e.target.style.borderColor = NHBP.turquoise + "60"; e.target.style.boxShadow = `0 4px 24px rgba(0,0,0,0.5), 0 0 12px ${NHBP.turquoiseGlow}`; }}
      onMouseLeave={e => { e.target.style.borderColor = NHBP.turquoise + "30"; e.target.style.boxShadow = `0 4px 20px rgba(0,0,0,0.4)`; }}
    >
      ← Back to Portal
    </button>
  );

  const SERVICE_ROUTES = {
    visual: "visual-designs",
    stationery: "stationery-kit",
    studio: "studio-hub",
    "instant-alert": "instant-alert",
    "turtle-press": "turtle-press",
    other: "general-request",
  };

  // ─── ROUTE: ADMIN DASHBOARD ────────────────────────────
  if (screen === "admin") {
    const exitAdmin = () => { window.location.hash = ""; setScreen("welcome"); };
    return (
      <AdminGate onExit={exitAdmin}>
        <AdminDashboard onExit={exitAdmin} />
      </AdminGate>
    );
  }

  // ─── ROUTE: VISUAL DESIGNS FORM ─────────────────────────
  if (screen === "visual-designs") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <VisualDesignForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: STATIONERY KIT FORM ─────────────────────
  if (screen === "stationery-kit") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <StationeryKitForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: STUDIO HUB (HEADSHOTS) FORM ────────────
  if (screen === "studio-hub") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <EmployeeHeadshotsForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: INSTANT ALERT FORM ─────────────────────
  if (screen === "instant-alert") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <InstantAlertForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: TURTLE PRESS FORM ──────────────────────
  if (screen === "turtle-press") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <TurtlePressForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: GENERAL / OTHER REQUEST FORM ───────────
  if (screen === "general-request") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <GeneralRequestForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── WELCOME SCREEN ─────────────────────────────────────
  if (screen === "welcome") {
    return (
      <main style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }} aria-label="NHBP Communications Request Portal">
        <Background />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative", zIndex: 1, animation: "slideUp 0.8s ease" }}>
          <div style={{
            width: 90, height: 90, borderRadius: 24, position: "relative",
            background: `linear-gradient(135deg, ${NHBP.turquoise}20, ${NHBP.maroon}15)`,
            backdropFilter: "blur(20px)",
            border: `1px solid ${NHBP.turquoise}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 36,
            boxShadow: `0 0 60px ${NHBP.turquoiseGlow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}>
            <span style={{ fontSize: 42, filter: "drop-shadow(0 0 8px rgba(20, 169, 162, 0.5))" }}>🐢</span>
            <div style={{
              position: "absolute", inset: -1, borderRadius: 24, padding: 1,
              background: `linear-gradient(135deg, ${NHBP.turquoise}50, transparent, ${NHBP.turquoise}20)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor", maskComposite: "exclude",
            }} />
          </div>

          <h1 style={{
            fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 300, margin: 0,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            background: `linear-gradient(135deg, #ffffff 0%, ${NHBP.turquoiseLight} 50%, ${NHBP.pink} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            NHBP Communications
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", color: NHBP.turquoise,
            fontWeight: 300, margin: "8px 0 0", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Request Portal
          </p>

          <div style={{
            width: 80, height: 2, margin: "32px 0",
            background: `linear-gradient(90deg, transparent, ${NHBP.turquoise}, transparent)`,
          }} />

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 380, margin: "0 0 40px" }}>
            Designs, photos, publications, and more —
            <br />all in one place. Let's make something great.
          </p>

          <GlassCard
            onClick={() => setScreen("form")}
            style={{ padding: "16px 44px", cursor: "pointer" }}
          >
            <span style={{
              fontSize: 16, fontWeight: 600, letterSpacing: "0.04em",
              background: `linear-gradient(135deg, ${NHBP.turquoiseLight}, #fff)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Start a Request →
            </span>
          </GlassCard>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Takes about 2 minutes
          </p>
        </div>
      </main>
    );
  }

  // ─── SERVICE SELECTION SCREEN ────────────────────────────
  return (
    <div style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Background />

      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", position: "relative", zIndex: 10 }}>
        <button
          onClick={() => setScreen("welcome")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.4)", fontFamily: "Tahoma, sans-serif",
            padding: "4px 0", transition: "color 0.2s",
          }}
          onMouseEnter={e => e.target.style.color = NHBP.turquoiseLight}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
        >
          ← Back
        </button>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 28px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: 620, animation: "slideUp 0.5s ease" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            What can we help you create?
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Pick the service that best fits your need</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
            {SERVICES.map(s => (
              <GlassCard
                key={s.id}
                onClick={() => {
                  if (s.status === "live") {
                    const route = SERVICE_ROUTES[s.id];
                    if (route) setScreen(route);
                  }
                }}
                style={{
                  padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
                  opacity: s.status === "coming" ? 0.45 : 1,
                  cursor: s.status === "coming" ? "default" : "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span style={{
                    fontSize: 26, lineHeight: 1,
                    color: "rgba(255,255,255,0.5)",
                    transition: "color 0.3s ease",
                  }}>{s.icon}</span>
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
    </div>
  );
}
