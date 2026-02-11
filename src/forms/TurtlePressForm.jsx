import { useState, useEffect, useRef } from "react";
import { NHBP, C, FORM_DEPTS } from "../constants";
import { useDraftForm, generateTicket, createTrelloCard, trelloHeader, SubmissionStore } from "../utils";
import { GlassCard } from "../components/GlassCard";

export default function TurtlePressForm({ onBackToPortal }) {
  const [subView, setSubView] = useState("menu"); // "menu" | "submission" | "article" | "feedback"

  const TpGlassCard = ({ children, active, onClick, style: s = {} }) => {
    const [h, setH] = useState(false);
    return (
      <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          background: active ? `linear-gradient(135deg, ${C.turquoise}18, ${C.turquoise}08)` : h ? "rgba(255,255,255,0.04)" : C.glass,
          border: `1px solid ${active ? C.turquoise + "50" : h ? "rgba(255,255,255,0.12)" : C.border}`,
          borderRadius: 14, padding: "16px 20px", cursor: onClick ? "pointer" : "default",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: active ? `0 8px 32px ${C.turquoiseGlow}, inset 0 1px 0 rgba(255,255,255,0.06)` : h ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
          transform: h && onClick ? "translateY(-1px)" : "translateY(0)",
          position: "relative", overflow: "hidden", ...s,
        }}>
        {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.turquoise}60, transparent)` }} />}
        {children}
      </div>
    );
  };

  // ─── SUB-MENU ────────────────────────────
  if (subView === "menu") {
    const options = [
      { id: "submission", icon: "🎉", label: "Birthdays, Celebrations & Photos", desc: "Submit birthdays, anniversaries, births, weddings, and photo contributions", color: C.maroonLight },
      { id: "article", icon: "✍️", label: "Article / Story Submission", desc: "Submit a written article or pitch a story idea for the Turtle Press", color: C.turquoise },
      { id: "feedback", icon: "💬", label: "Feedback & Corrections", desc: "Corrections, compliments, suggestions, or questions about a published edition", color: C.gold },
    ];

    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={{ position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}08, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ zIndex: 2, textAlign: "center", maxWidth: 480, width: "100%" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🐢</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>The Turtle Press</h1>
          <p style={{ fontSize: 15, color: C.goldLight, marginBottom: 4, fontWeight: 500 }}>Quarterly Newsletter</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            What would you like to do?
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {options.map(o => (
              <TpGlassCard key={o.id} onClick={() => setSubView(o.id)}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", textAlign: "left" }}>
                <span style={{ fontSize: 32, filter: `drop-shadow(0 0 8px ${o.color}40)` }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.5 }}>{o.desc}</div>
                </div>
              </TpGlassCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── SUBMISSION FORM ──────────────────
  if (subView === "submission") {
    return <QTPSubmissionSubForm onBack={() => setSubView("menu")} />;
  }

  // ─── ARTICLE / STORY FORM ─────────────
  if (subView === "article") {
    return <QTPArticleSubForm onBack={() => setSubView("menu")} />;
  }

  // ─── QTP FEEDBACK FORM ───────────────────
  if (subView === "feedback") {
    return <QTPFeedbackSubForm onBack={() => setSubView("menu")} />;
  }

  return null;
}

// ── QTP FEEDBACK SUB-FORM ──────────────────
function QTPFeedbackSubForm({ onBack }) {
  const FEEDBACK_TYPES = [
    { id: "correction", icon: "✏️", label: "Correction", desc: "Something needs to be fixed" },
    { id: "compliment", icon: "⭐", label: "Compliment", desc: "Something we did well" },
    { id: "suggestion", icon: "💡", label: "Suggestion", desc: "Ideas for future editions" },
    { id: "question", icon: "❓", label: "Question", desc: "Something you'd like to know" },
  ];

  const EDITIONS = [
    "Spring 2026", "Winter 2025", "Fall 2025", "Summer 2025", "Spring 2025",
    "Winter 2024", "Fall 2024", "Summer 2024", "Spring 2024",
    "Older Edition", "Not Sure"
  ];

  // ── Sub-components ──
  const FbGlassCard = ({ children, active, onClick, style: s = {} }) => {
    const [h, setH] = useState(false);
    return (
      <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          background: active ? `linear-gradient(135deg, ${C.turquoise}18, ${C.turquoise}08)` : h ? "rgba(255,255,255,0.04)" : C.glass,
          border: `1px solid ${active ? C.turquoise + "50" : h ? "rgba(255,255,255,0.12)" : C.border}`,
          borderRadius: 14, padding: "16px 20px", cursor: onClick ? "pointer" : "default",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: active ? `0 8px 32px ${C.turquoiseGlow}, inset 0 1px 0 rgba(255,255,255,0.06)` : h ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
          transform: h && onClick ? "translateY(-1px)" : "translateY(0)",
          position: "relative", overflow: "hidden", ...s,
        }}>
        {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.turquoise}60, transparent)` }} />}
        {children}
      </div>
    );
  };

  const FbInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline, maxWords }) => {
    const wc = multiline && maxWords ? value.trim().split(/\s+/).filter(Boolean).length : 0;
    return (
      <div style={{ marginBottom: 20, flex: 1 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label} {required && <span style={{ color: C.turquoise }}>*</span>}
        </label>
        {multiline ? (
          <div style={{ position: "relative" }}>
            <textarea ref={ref} value={value} rows={4} placeholder={placeholder} onKeyDown={onKeyDown}
              onChange={(e) => {
                if (maxWords) { const w = e.target.value.trim().split(/\s+/).filter(Boolean); if (w.length <= maxWords || e.target.value.length < value.length) onChange(e.target.value); }
                else onChange(e.target.value);
              }}
              style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
              onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
            {maxWords && <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, color: wc >= maxWords ? C.maroonLight : C.textDim }}>{wc}/{maxWords} words</div>}
          </div>
        ) : (
          <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKeyDown}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
            onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
            onBlur={(e) => e.target.style.borderColor = C.border}
          />
        )}
      </div>
    );
  };

  const FbSelect = ({ label, value, onChange, options, required, placeholder }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: value ? C.textPrimary : C.textDim, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%2340b5ad' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
        <option value="" style={{ background: C.dark }}>{placeholder || "Select..."}</option>
        {options.map((o) => <option key={o} value={o} style={{ background: C.dark }}>{o}</option>)}
      </select>
    </div>
  );

  const FbBadge = ({ name, color }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: color + "25", color, border: `1px solid ${color}40` }}>
      <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />{name}
    </span>
  );

  // ── State ──
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const inputRef = useRef(null);

  const [form, setForm, clearDraft] = useDraftForm("turtle-press-feedback", {
    firstName: "", lastName: "", tribalId: "",
    email: "", phone: "",
    edition: "", feedbackType: null,
    pageNumber: "", articleTitle: "",
    feedback: "", correctionDetails: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTF");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDC22 Turtle Press Feedback \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Tribal ID: ${form.tribalId || "N/A"}`, "",
        "\uD83D\uDCF0 TURTLE PRESS FEEDBACK", `Edition: ${form.edition || "N/A"}`, `Feedback Type: ${form.feedbackType || "N/A"}`,
        `Page Number: ${form.pageNumber || "N/A"}`, `Article Title: ${form.articleTitle || "N/A"}`,
        `Feedback: ${form.feedback || "N/A"}`, form.correctionDetails ? `Correction Details: ${form.correctionDetails}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Turtle Press Feedback", serviceId: "turtle-press",
      requesterName: name, email: form.email,
      phone: form.phone, tribalId: form.tribalId, edition: form.edition,
      feedbackType: form.feedbackType, pageNumber: form.pageNumber,
      articleTitle: form.articleTitle, feedback: form.feedback,
      correctionDetails: form.correctionDetails,
    });
    clearDraft();
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Name", "Tribal ID", "Edition", "Feedback Type", "Details", "Contact", "Review"];
  const progress = step > 0 ? Math.min((step / 7) * 100, 100) : 0;

  const FB = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
    bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}08, transparent 70%)`, pointerEvents: "none" },
    bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
    bgOrb3: { position: "fixed", top: "40%", left: "50%", width: "30vw", height: "30vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.turquoise}04, transparent 70%)`, pointerEvents: "none", transform: "translateX(-50%)" },
    progressWrap: { position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` },
    progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
    progressBar: { height: "100%", background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 12px rgba(201,168,76,0.3)` },
    content: { width: "100%", maxWidth: 480, zIndex: 2 },
    stepWrap: { textAlign: "left" },
    stepTitle: { fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" },
    stepDesc: { fontSize: 14, color: C.textSecondary, marginBottom: 28, lineHeight: 1.6 },
    navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    successWrap: { textAlign: "center", zIndex: 2, maxWidth: 440 },
  };
