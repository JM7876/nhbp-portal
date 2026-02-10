import { useState, useEffect, useRef } from "react";
import { NHBP, SERVICES, PRIORITIES, DEPARTMENTS } from "./constants";
import { useDraftForm, generateTicket, createTrelloCard, trelloHeader, SubmissionStore } from "./utils";
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
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [formData, setFormData, clearMainDraft] = useDraftForm("main-form", {
    service: null, name: "", email: "", department: "",
    title: "", description: "", priority: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const inputRef = useRef(null);
  const totalSteps = 7;

  // Listen for hash changes to navigate to admin
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#admin") setScreen("admin");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (inputRef.current && screen === "form") {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [step, screen]);

  useEffect(() => {
    const handler = (e) => {
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const goNext = () => {
    if (animating) return;
    setDirection(1);
    setAnimating(true);
    setTimeout(() => {
      if (step < totalSteps - 1) setStep(s => s + 1);
      else handleSubmit();
      setAnimating(false);
    }, 300);
  };

  const goBack = () => {
    if (animating || step === 0) return;
    setDirection(-1);
    setAnimating(true);
    setTimeout(() => { setStep(s => s - 1); setAnimating(false); }, 300);
  };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP");
    const svcLabel = SERVICES.find(s => s.id === formData.service)?.label || "Request";
    setTicketNumber(t);
    await createTrelloCard(
      `\uD83D\uDCCB ${formData.title || svcLabel} \u2014 ${formData.name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${formData.name || "N/A"}`, `Email: ${formData.email || "N/A"}`, `Department: ${formData.department || "N/A"}`, "",
        `\uD83D\uDCCB ${svcLabel.toUpperCase()}`, `Title: ${formData.title || "N/A"}`,
        `Priority: ${PRIORITIES.find(p => p.id === formData.priority)?.label || "N/A"}`,
        `Description: ${formData.description || "N/A"}`,
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: svcLabel,
      serviceId: formData.service, requesterName: formData.name, email: formData.email,
      department: formData.department, title: formData.title, description: formData.description,
      priority: formData.priority,
    });
    clearMainDraft();
    setSubmitted(true);
  };

  const canAdvance = () => {
    switch (step) {
      case 0: return formData.service !== null;
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.email.includes("@");
      case 3: return formData.department.length > 0;
      case 4: return formData.title.trim().length > 0;
      case 5: return formData.description.trim().length > 10;
      case 6: return formData.priority !== null;
      default: return true;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canAdvance()) { e.preventDefault(); goNext(); }
  };

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
    setStep(0);
    setFormData({ service: null, name: "", email: "", department: "", title: "", description: "", priority: null });
    clearMainDraft();
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
            <br />all in one place. Let’s make something great.
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

  // ─── CONFIRMATION SCREEN ────────────────────────────────
  if (submitted) {
    return (
      <div role="status" aria-label="Request submitted successfully" style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Background />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative", zIndex: 1, animation: "scaleIn 0.5s ease" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", marginBottom: 28,
            background: `linear-gradient(135deg, ${NHBP.turquoise}, ${NHBP.turquoiseDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, fontWeight: 700, color: "#fff",
            boxShadow: `0 0 50px ${NHBP.turquoiseGlow}`,
          }}>✓</div>

          <h1 style={{ fontSize: 34, fontWeight: 300, margin: "0 0 20px", letterSpacing: "-0.02em" }}>You’re all set.</h1>

          <GlassCard style={{ padding: "14px 32px", marginBottom: 24 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>Request</span>
            <span style={{ fontSize: 24, fontWeight: 600, color: NHBP.turquoiseLight, fontFamily: "monospace", letterSpacing: "0.05em" }}>{ticketNumber}</span>
          </GlassCard>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 400, marginBottom: 28 }}>
            Your {SERVICES.find(s => s.id === formData.service)?.label} request has been received.
            <br />The Communications team will be in touch within 24 hours.
          </p>

          <GlassCard style={{ padding: "20px 28px", width: "100%", maxWidth: 380, textAlign: "left" }}>
            {[
              ["Requested by", formData.name],
              ["Department", formData.department],
              ["Project", formData.title],
              ["Priority", PRIORITIES.find(p => p.id === formData.priority)?.label],
            ].map(([label, value], i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", padding: "10px 0",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{label}</span>
                <span style={{
                  fontSize: 14, fontWeight: 600,
                  color: label === "Priority"
                    ? PRIORITIES.find(p => p.id === formData.priority)?.color
                    : "rgba(255,255,255,0.8)",
                }}>{value}</span>
              </div>
            ))}
          </GlassCard>

          <div style={{ marginTop: 28 }}>
            <GlassCard
              onClick={() => {
                setScreen("welcome"); setStep(0); setSubmitted(false);
                setFormData({ service: null, name: "", email: "", department: "", title: "", description: "", priority: null });
              }}
              style={{ padding: "14px 36px", cursor: "pointer" }}
            >
              <span style={{ fontSize: 14, color: NHBP.turquoiseLight, fontWeight: 600 }}>Submit Another Request</span>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORM STEPS ─────────────────────────────────────────
  const slideStyle = {
    width: "100%", maxWidth: 620,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: animating ? 0 : 1,
    transform: animating ? `translateY(${direction * 24}px)` : "translateY(0)",
  };

  const inputStyle = {
    width: "100%", maxWidth: 440, background: "transparent",
    border: "none", borderBottom: `2px solid rgba(255,255,255,0.1)`,
    color: "#f0f0f0", fontSize: 22, fontFamily: "Tahoma, 'Segoe UI', sans-serif",
    padding: "14px 0", outline: "none", transition: "border-color 0.3s ease",
    caretColor: NHBP.turquoise, boxSizing: "border-box",
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>01 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              What can we help you create?
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Pick the service that best fits your need</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
              {SERVICES.map(s => (
                <GlassCard
                  key={s.id}
                  active={formData.service === s.id}
                  onClick={() => {
                    if (s.status === "live") {
                      if (s.id === "visual") {
                        setScreen("visual-designs");
                        return;
                      }
                      if (s.id === "stationery") {
                        setScreen("stationery-kit");
                        return;
                      }
                      if (s.id === "studio") {
                        setScreen("studio-hub");
                        return;
                      }
                      if (s.id === "instant-alert") {
                        setScreen("instant-alert");
                        return;
                      }
                      if (s.id === "turtle-press") {
                        setScreen("turtle-press");
                        return;
                      }
                      if (s.id === "other") {
                        setScreen("general-request");
                        return;
                      }
                      setFormData(d => ({ ...d, service: s.id }));
                      setTimeout(goNext, 400);
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
                      color: formData.service === s.id ? NHBP.turquoiseLight : "rgba(255,255,255,0.5)",
                      transition: "color 0.3s ease",
                      filter: formData.service === s.id ? `drop-shadow(0 0 6px ${NHBP.turquoiseGlow})` : "none",
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
        );

      case 1:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>02 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>What’s your name?</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>So we know who we’re working with</p>
            <input ref={inputRef} type="text" placeholder="Type your full name..." value={formData.name}
              aria-label="Full name" onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} onKeyDown={handleKeyDown} style={inputStyle} />
          </div>
        );

      case 2:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>03 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>
              Great to have you, <span style={{ color: NHBP.turquoiseLight }}>{formData.name.split(" ")[0]}</span>
              <br />What’s your email?
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>We’ll send updates and your tracking link here</p>
            <input ref={inputRef} type="email" placeholder="yourname@nhbp-nsn.gov" value={formData.email}
              aria-label="Email address" onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} onKeyDown={handleKeyDown} style={inputStyle} />
          </div>
        );

      case 3:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>04 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Which department are you with?</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>Select your department</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 540 }}>
              {DEPARTMENTS.map(d => {
                const active = formData.department === d;
                return (
                  <button key={d} onClick={() => { setFormData(f => ({ ...f, department: d })); setTimeout(goNext, 400); }}
                    style={{
                      background: active ? `${NHBP.turquoise}18` : "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${active ? NHBP.turquoise + "50" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 22, padding: "9px 18px",
                      color: active ? NHBP.turquoiseLight : "rgba(255,255,255,0.5)",
                      fontSize: 13, cursor: "pointer", transition: "all 0.25s ease",
                      fontFamily: "Tahoma, sans-serif",
                      boxShadow: active ? `0 0 16px ${NHBP.turquoise}15` : "none",
                    }}>
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>05 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Give your project a title</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Something short and descriptive</p>
            <input ref={inputRef} type="text" placeholder='"Spring Pow Wow Flyer" or "Staff Headshots March"'
              aria-label="Project title" value={formData.title} onChange={e => setFormData(d => ({ ...d, title: e.target.value }))} onKeyDown={handleKeyDown} style={inputStyle} />
          </div>
        );

      case 5:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>06 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Tell us about your project</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>Purpose, audience, specific ideas — the more detail, the faster we deliver</p>
            <textarea ref={inputRef} placeholder="Describe what you need..." aria-label="Project description"
              value={formData.description} onChange={e => setFormData(d => ({ ...d, description: e.target.value }))}
              style={{
                width: "100%", maxWidth: 520, minHeight: 140, resize: "vertical",
                background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)",
                border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 14,
                color: "#f0f0f0", fontSize: 15, fontFamily: "Tahoma, sans-serif",
                padding: "18px", outline: "none", lineHeight: 1.7, caretColor: NHBP.turquoise,
                boxSizing: "border-box", transition: "border-color 0.3s ease",
              }}
              rows={5} />
          </div>
        );

      case 6:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>07 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>How soon do you need this?</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>This helps us prioritize across all departments</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440 }}>
              {PRIORITIES.map(p => {
                const active = formData.priority === p.id;
                return (
                  <GlassCard key={p.id} active={active} onClick={() => setFormData(d => ({ ...d, priority: p.id }))}
                    style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
                      borderColor: active ? p.color + "50" : undefined,
                      boxShadow: active ? `0 0 24px ${p.color}20` : undefined,
                    }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                      background: p.color,
                      boxShadow: active ? `0 0 12px ${p.color}60` : "none",
                      transition: "box-shadow 0.3s ease",
                    }} />
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{p.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{p.desc}</div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <a href="#form-content" style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden", zIndex: 9999, background: NHBP.turquoise, color: "#fff", padding: "8px 16px", fontSize: 14 }} onFocus={e => { e.target.style.left = "16px"; e.target.style.top = "16px"; e.target.style.width = "auto"; e.target.style.height = "auto"; }} onBlur={e => { e.target.style.left = "-9999px"; }}>Skip to form content</a>
      <Background />

      <div role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${step + 1} of ${totalSteps}`} style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.03)", zIndex: 100 }}>
        <div style={{
          height: "100%", borderRadius: "0 1px 1px 0",
          width: `${((step + 1) / totalSteps) * 100}%`,
          background: `linear-gradient(90deg, ${NHBP.turquoise}, ${NHBP.turquoiseLight})`,
          boxShadow: `0 0 12px ${NHBP.turquoiseGlow}`,
          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      </div>

      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", position: "relative", zIndex: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)" }}>
          🐢 NHBP Communications
        </span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }} aria-live="polite">
          {formData.service && `${SERVICES.find(s => s.id === formData.service)?.icon} ${SERVICES.find(s => s.id === formData.service)?.label}`}
        </span>
      </header>

      <div id="form-content" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 28px 100px", position: "relative", zIndex: 1 }}>
        {renderStep()}
      </div>

      <nav aria-label="Form navigation" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px",
        background: "linear-gradient(0deg, rgba(8,9,12,0.95) 50%, transparent)",
        backdropFilter: "blur(12px)",
      }}>
        <button onClick={goBack} disabled={step === 0} aria-label="Go to previous step"
          style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.35)",
            fontSize: 13, cursor: step === 0 ? "default" : "pointer", padding: "10px 16px",
            fontFamily: "Tahoma, sans-serif", opacity: step === 0 ? 0.3 : 1,
            transition: "all 0.2s ease",
          }}>
          ← Back
        </button>

        <div role="group" aria-label="Form progress" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} aria-hidden="true" style={{
              height: 6, borderRadius: 3,
              width: i === step ? 28 : 6,
              background: i === step ? NHBP.turquoise : i < step ? NHBP.turquoise + "50" : "rgba(255,255,255,0.1)",
              boxShadow: i === step ? `0 0 8px ${NHBP.turquoiseGlow}` : "none",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }} />
          ))}
        </div>

        <button onClick={goNext} disabled={!canAdvance()} aria-label={step === totalSteps - 1 ? "Submit request" : "Go to next step"}
          style={{
            background: canAdvance() ? `${NHBP.turquoise}15` : "transparent",
            border: `1px solid ${canAdvance() ? NHBP.turquoise + "30" : "rgba(255,255,255,0.05)"}`,
            color: canAdvance() ? NHBP.turquoiseLight : "rgba(255,255,255,0.2)",
            fontSize: 13, fontWeight: 600, cursor: canAdvance() ? "pointer" : "default",
            padding: "10px 20px", borderRadius: 10,
            fontFamily: "Tahoma, sans-serif", transition: "all 0.3s ease",
            boxShadow: canAdvance() ? `0 0 16px ${NHBP.turquoise}10` : "none",
          }}>
          {step === totalSteps - 1 ? "Submit ✓" : "Next →"}
        </button>
      </nav>
    </div>
  );
}
