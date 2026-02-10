import { useState, useEffect, useRef } from "react";
import { NHBP, C, FORM_DEPTS } from "../constants";
import { useDraftForm, generateTicket, createTrelloCard, trelloHeader, SubmissionStore } from "../utils";
import { GlassCard } from "../components/GlassCard";

function TurtlePressForm({ onBackToPortal }) {
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

  // ── SUBMITTED ──
  if (submitted) {
    const ft = FEEDBACK_TYPES.find((x) => x.id === form.feedbackType);
    return (
      <div style={FB.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={FB.bgOrb1} /><div style={FB.bgOrb2} />
        <div style={FB.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🐢</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your feedback has been received.<br />We appreciate you helping us improve the Turtle Press.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            <FbBadge name="🐢 QTP" color="#0079bf" />
            <FbBadge name="💬 Feedback" color="#c9a84c" />
            {form.feedbackType === "correction" && <FbBadge name="✏️ Correction" color="#eb5a46" />}
            {form.feedbackType === "compliment" && <FbBadge name="⭐ Compliment" color="#61bd4f" />}
            {form.feedbackType === "suggestion" && <FbBadge name="💡 Suggestion" color="#00c2e0" />}
            {form.feedbackType === "question" && <FbBadge name="❓ Question" color="#f2d600" />}
          </div>
          <FbGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Type", `${ft?.icon} ${ft?.label}`],
              ["Edition", form.edition],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
            ].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit" }}>{v}</span>
              </div>
            ))}
          </FbGlassCard>
          <button onClick={() => { setSubmitted(false); setStep(0); }} style={{ ...FB.btn, marginTop: 28 }}>Submit More Feedback</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={FB.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🐢</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Turtle Press</h1>
          <p style={{ fontSize: 17, color: C.goldLight, marginBottom: 4, fontWeight: 500 }}>Feedback & Corrections</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            Spot a typo? Have a suggestion? Want to say something nice?<br />Your feedback helps us make the Turtle Press better for everyone.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => goTo(1)} style={FB.btn}>Share Feedback →</button>
            <button onClick={onBack} style={FB.btnBack}>← Back</button>
          </div>
        </div>
      );

      case 1: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>What's your name?</h2>
          <p style={FB.stepDesc}>Let us know who's sharing feedback.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <FbInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <FbInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
          </div>
          <div style={FB.navRow}>
            <button onClick={() => goTo(0)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>Tribal ID Number</h2>
          <p style={FB.stepDesc}>Enter your 4-digit tribal identification number.</p>
          <FbInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
          <div style={FB.navRow}>
            <button onClick={() => goTo(1)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={form.tribalId.length !== 4} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>Which edition?</h2>
          <p style={FB.stepDesc}>Select the Turtle Press edition your feedback is about.</p>
          <FbSelect label="Edition" value={form.edition} required onChange={(v) => u("edition", v)} options={EDITIONS} placeholder="Select edition" />
          <div style={FB.navRow}>
            <button onClick={() => goTo(2)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(4)} disabled={!form.edition} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>What kind of feedback?</h2>
          <p style={FB.stepDesc}>We want to hear it all — the good and the fixable.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {FEEDBACK_TYPES.map((f) => (
              <FbGlassCard key={f.id} active={form.feedbackType === f.id} onClick={() => u("feedbackType", f.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.feedbackType === f.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{f.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{f.desc}</span>
              </FbGlassCard>
            ))}
          </div>
          <div style={FB.navRow}>
            <button onClick={() => goTo(3)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(5)} disabled={!form.feedbackType} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 5: {
        const ft = FEEDBACK_TYPES.find((x) => x.id === form.feedbackType);
        return (
          <div style={FB.stepWrap}>
            <h2 style={FB.stepTitle}>{ft?.icon} {ft?.label} Details</h2>
            <p style={FB.stepDesc}>
              {form.feedbackType === "correction" ? "Help us fix it — the more specific, the better." :
               form.feedbackType === "compliment" ? "We love hearing this — what stood out?" :
               form.feedbackType === "suggestion" ? "Great ideas make great publications." :
               "We're happy to help."}
            </p>
            {form.feedbackType === "correction" && (<>
              <FbInput label="Page Number (if known)" value={form.pageNumber} onChange={(v) => u("pageNumber", v)} placeholder="e.g. Page 4" inputRef={inputRef} />
              <FbInput label="Article Title (if known)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Title of the article" />
              <FbInput label="What needs to be corrected?" value={form.correctionDetails} required onChange={(v) => u("correctionDetails", v)} placeholder="Describe the error and what it should say..." multiline />
            </>)}
            {form.feedbackType === "compliment" && (<>
              <FbInput label="Article or Section (optional)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Which article or section?" inputRef={inputRef} />
              <FbInput label="What did you enjoy?" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="Tell us what you liked..." multiline maxWords={40} />
            </>)}
            {form.feedbackType === "suggestion" && (<>
              <FbInput label="Your Suggestion" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="What would you like to see in future editions?" inputRef={inputRef} multiline maxWords={40} />
            </>)}
            {form.feedbackType === "question" && (<>
              <FbInput label="Article or Topic (optional)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Related to which article or topic?" inputRef={inputRef} />
              <FbInput label="Your Question" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="What would you like to know?" multiline maxWords={40} />
            </>)}
            <div style={FB.navRow}>
              <button onClick={() => goTo(4)} style={FB.btnBack}>← Back</button>
              <button onClick={() => goTo(6)} disabled={!(form.feedback || form.correctionDetails)} style={FB.btn}>Continue →</button>
            </div>
          </div>
        );
      }

      case 6: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>Contact Information</h2>
          <p style={FB.stepDesc}>Optional — in case we need to follow up on your feedback.</p>
          <FbInput label="Email" value={form.email} onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && goTo(7)} />
          <FbInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(7)} />
          <div style={FB.navRow}>
            <button onClick={() => goTo(5)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(7)} style={FB.btn}>{form.email ? "Review →" : "Skip to Review →"}</button>
          </div>
        </div>
      );

      case 7: {
        const ft = FEEDBACK_TYPES.find((x) => x.id === form.feedbackType);
        const items = [
          ["Submitted By", `${form.firstName} ${form.lastName}`],
          ["Tribal ID", form.tribalId],
          ["Edition", form.edition],
          ["Type", `${ft?.icon} ${ft?.label}`],
          form.pageNumber ? ["Page", form.pageNumber] : null,
          form.articleTitle ? ["Article", form.articleTitle] : null,
          form.correctionDetails ? ["Correction", form.correctionDetails] : null,
          form.feedback ? ["Feedback", form.feedback] : null,
          form.email ? ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`] : null,
          ["Date Submitted", new Date().toLocaleString()],
        ].filter(Boolean);

        return (
          <div style={FB.stepWrap}>
            <h2 style={FB.stepTitle}>Review Your Feedback</h2>
            <p style={FB.stepDesc}>Make sure everything looks good.</p>
            <FbGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </FbGlassCard>
            <div style={FB.navRow}>
              <button onClick={() => goTo(6)} style={FB.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...FB.btn, background: `linear-gradient(135deg, ${C.gold}, ${C.maroon})` }}>🐢 Submit Feedback</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={FB.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={FB.bgOrb1} /><div style={FB.bgOrb2} /><div style={FB.bgOrb3} />
      {step > 0 && (
        <div style={FB.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: C.gold }}>{Math.round(progress)}%</span>
          </div>
          <div style={FB.progressTrack}><div style={{ ...FB.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...FB.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ===========================================================
//  QTP SUBMISSION SUB-FORM (Celebrations & Photos)
// ===========================================================
function QTPSubmissionSubForm({ onBack }) {
  const SUBMISSION_TYPES = [
    { id: "birthday", icon: "🎂", label: "Birthday", desc: "Celebrate a tribal member's birthday" },
    { id: "anniversary", icon: "💍", label: "Anniversary", desc: "Honor a couple's milestone" },
    { id: "birth", icon: "👶", label: "Birth Announcement", desc: "Welcome a new family member" },
    { id: "wedding", icon: "💒", label: "Wedding", desc: "Share wedding news" },
    { id: "photo", icon: "📸", label: "Photo Submission", desc: "Share photos for publication" },
    { id: "other", icon: "💬", label: "Other", desc: "Something else for the Turtle Press" },
  ];

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const PHOTO_DISCLAIMER = `The Turtle Press editors and Tribal Council have discretion when accepting a photo or other content for publication. Photo guidelines do not allow photos with alcohol present nor any hand gestures. Communications will not print photos with a visible copyright. By submitting you acknowledge these guidelines, are stating that you own the rights to the photo, and are allowing NHBP to use the photo for publication in the Turtle Press.`;
  const DEADLINE_NOTICE = `Deadline for birthday/celebration submissions is the 10th of each month for the next edition.`;

  // ── Sub-components ──
  const SmGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const SmInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline, maxWords }) => {
    const wc = multiline && maxWords ? value.trim().split(/\s+/).filter(Boolean).length : 0;
    return (
      <div style={{ marginBottom: 20, flex: 1 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label} {required && <span style={{ color: C.turquoise }}>*</span>}
        </label>
        {multiline ? (
          <div style={{ position: "relative" }}>
            <textarea ref={ref} value={value} rows={3} placeholder={placeholder} onKeyDown={onKeyDown}
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

  const SmSelect = ({ label, value, onChange, options, required, placeholder }) => (
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

  const SmBadge = ({ name, color }) => (
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
  const [photoAgreed, setPhotoAgreed] = useState(false);
  const inputRef = useRef(null);

  const [form, setForm, clearDraft] = useDraftForm("turtle-press-submission", {
    firstName: "", lastName: "", tribalId: "", identity: "",
    email: "", phone: "", submissionType: null,
    bdayFirstName: "", bdayLastName: "", birthDate: "",
    anniName1First: "", anniName1Last: "", anniName2First: "", anniName2Last: "",
    anniMonth: "", anniDay: "",
    newbornFirst: "", newbornLast: "", motherFirst: "", motherLast: "",
    fatherFirst: "", fatherLast: "", dateOfBirth: "",
    brideFirst: "", brideLast: "", groomFirst: "", groomLast: "", weddingDate: "",
    photoCredit: "", photoPeopleNames: "",
    message: "", from: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTP");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDC22 ${form.submissionType || "Turtle Press"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`,
        `Tribal ID: ${form.tribalId || "N/A"}`, `Identity: ${form.identity || "N/A"}`, "",
        "\uD83D\uDCF0 TURTLE PRESS SUBMISSION", `Type: ${form.submissionType || "N/A"}`,
        `Department: ${form.department || form.committee || "N/A"}`, `Title: ${form.articleTitle || form.activityName || "N/A"}`,
        form.articleContent ? `Content: ${form.articleContent}` : "", form.storyDescription ? `Story: ${form.storyDescription}` : "",
        form.whyNewsworthy ? `Why Newsworthy: ${form.whyNewsworthy}` : "", form.whenHappening ? `When: ${form.whenHappening}` : "",
        form.photoCredit ? `Photo Credit: ${form.photoCredit}` : "", form.additionalNotes ? `Notes: ${form.additionalNotes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Turtle Press Submission", serviceId: "turtle-press",
      requesterName: name, email: form.email,
      phone: form.phone, tribalId: form.tribalId, identity: form.identity,
      submissionType: form.submissionType, department: form.department || form.committee || "",
      articleTitle: form.articleTitle || form.activityName || "",
      articleContent: form.articleContent, storyDescription: form.storyDescription,
      whyNewsworthy: form.whyNewsworthy, whenHappening: form.whenHappening,
      photoCredit: form.photoCredit, notes: form.additionalNotes,
    });
    clearDraft();
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Name", "Tribal ID", "Identity", "Submission Type", "Details", "Photo", "Contact", "Review"];
  const progress = Math.min((step / 8) * 100, 100);

  const SM = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
    bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.turquoise}08, transparent 70%)`, pointerEvents: "none" },
    bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
    bgOrb3: { position: "fixed", top: "40%", left: "50%", width: "30vw", height: "30vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}04, transparent 70%)`, pointerEvents: "none", transform: "translateX(-50%)" },
    progressWrap: { position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` },
    progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
    progressBar: { height: "100%", background: `linear-gradient(90deg, ${C.turquoise}, ${C.turquoiseLight})`, borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 12px ${C.turquoiseGlow}` },
    content: { width: "100%", maxWidth: 480, zIndex: 2 },
    stepWrap: { textAlign: "left" },
    stepTitle: { fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" },
    stepDesc: { fontSize: 14, color: C.textSecondary, marginBottom: 28, lineHeight: 1.6 },
    navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    successWrap: { textAlign: "center", zIndex: 2, maxWidth: 440 },
  };

  // ── SUBMITTED ──
  if (submitted) {
    const t = SUBMISSION_TYPES.find((x) => x.id === form.submissionType);
    return (
      <div style={SM.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={SM.bgOrb1} /><div style={SM.bgOrb2} />
        <div style={SM.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🐢</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your {t?.label.toLowerCase()} submission has been received.<br />Our team will review it for the next Turtle Press edition.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            <SmBadge name="🐢 QTP" color="#0079bf" />
            {form.submissionType === "birthday" && <SmBadge name="🎂 Birthday" color="#ff78cb" />}
            {form.submissionType === "anniversary" && <SmBadge name="💍 Anniversary" color="#c377e0" />}
            {form.submissionType === "birth" && <SmBadge name="👶 Birth" color="#51e898" />}
            {form.submissionType === "wedding" && <SmBadge name="💒 Wedding" color="#f2d600" />}
          </div>
          <SmGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Type", `${t?.icon} ${t?.label}`],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
              ["Tribal ID", form.tribalId],
            ].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit" }}>{v}</span>
              </div>
            ))}
          </SmGlassCard>
          <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>{DEADLINE_NOTICE}</p>
          <button onClick={() => { setSubmitted(false); setStep(0); setForm({ ...form, submissionType: null, message: "", from: "" }); setPhotoAgreed(false); }} style={{ ...SM.btn, marginTop: 28 }}>Submit Another</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={SM.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🐢</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Turtle Press</h1>
          <p style={{ fontSize: 17, color: C.turquoiseLight, marginBottom: 4, fontWeight: 500 }}>Submission Form</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 8px" }}>
            Share birthdays, celebrations, announcements, and photos<br />with your community through the Turtle Press.
          </p>
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, maxWidth: 360, margin: "16px auto 32px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.border}` }}>
            📅 {DEADLINE_NOTICE}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => goTo(1)} style={SM.btn}>Get Started →</button>
            <button onClick={onBack} style={SM.btnBack}>← Back</button>
          </div>
        </div>
      );

      case 1: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>What's your name?</h2>
          <p style={SM.stepDesc}>Let us know who's submitting.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <SmInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <SmInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(0)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>Tribal ID Number</h2>
          <p style={SM.stepDesc}>Enter your 4-digit tribal identification number.</p>
          <SmInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
          <div style={SM.navRow}>
            <button onClick={() => goTo(1)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={form.tribalId.length !== 4} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>I am a...</h2>
          <p style={SM.stepDesc}>This helps our team route your submission.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {[
              { id: "employee", icon: "🏢", label: "NHBP Employee", desc: "Staff or department member" },
              { id: "member", icon: "👤", label: "Tribal Member", desc: "NHBP community member" },
            ].map((o) => (
              <SmGlassCard key={o.id} active={form.identity === o.id} onClick={() => u("identity", o.id)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{o.desc}</div>
                </div>
              </SmGlassCard>
            ))}
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(2)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(4)} disabled={!form.identity} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>What are you submitting?</h2>
          <p style={SM.stepDesc}>Choose your adventure 🐢</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {SUBMISSION_TYPES.map((t) => (
              <SmGlassCard key={t.id} active={form.submissionType === t.id} onClick={() => u("submissionType", t.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.submissionType === t.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{t.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{t.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{t.desc}</span>
              </SmGlassCard>
            ))}
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(3)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(5)} disabled={!form.submissionType} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 5: {
        const t = SUBMISSION_TYPES.find((x) => x.id === form.submissionType);
        return (
          <div style={SM.stepWrap}>
            <h2 style={SM.stepTitle}>{t?.icon} {t?.label} Details</h2>
            <p style={SM.stepDesc}>Fill in the details for your submission.</p>

            {form.submissionType === "birthday" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Person's First Name" value={form.bdayFirstName} required onChange={(v) => u("bdayFirstName", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last Name" value={form.bdayLastName} required onChange={(v) => u("bdayLastName", v)} placeholder="Last" />
              </div>
              <SmInput label="Birth Date" value={form.birthDate} type="date" required onChange={(v) => u("birthDate", v)} />
              <SmInput label="From" value={form.from} onChange={(v) => u("from", v)} placeholder="Who is this from?" />
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Happy birthday wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "anniversary" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Name One - First" value={form.anniName1First} required onChange={(v) => u("anniName1First", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last" value={form.anniName1Last} required onChange={(v) => u("anniName1Last", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Name Two - First" value={form.anniName2First} required onChange={(v) => u("anniName2First", v)} placeholder="First" />
                <SmInput label="Last" value={form.anniName2Last} required onChange={(v) => u("anniName2Last", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmSelect label="Month" value={form.anniMonth} required onChange={(v) => u("anniMonth", v)} options={MONTHS} placeholder="Month" />
                <SmSelect label="Day" value={form.anniDay} required onChange={(v) => u("anniDay", v)} options={Array.from({ length: 31 }, (_, i) => String(i + 1))} placeholder="Day" />
              </div>
              <SmInput label="From" value={form.from} onChange={(v) => u("from", v)} placeholder="Who is this from?" />
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Anniversary wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "birth" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Newborn's First Name" value={form.newbornFirst} required onChange={(v) => u("newbornFirst", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last Name" value={form.newbornLast} required onChange={(v) => u("newbornLast", v)} placeholder="Last" />
              </div>
              <SmInput label="Date of Birth" value={form.dateOfBirth} type="date" required onChange={(v) => u("dateOfBirth", v)} />
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Mother (optional)" value={form.motherFirst} onChange={(v) => u("motherFirst", v)} placeholder="First" />
                <SmInput label="Last" value={form.motherLast} onChange={(v) => u("motherLast", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Father (optional)" value={form.fatherFirst} onChange={(v) => u("fatherFirst", v)} placeholder="First" />
                <SmInput label="Last" value={form.fatherLast} onChange={(v) => u("fatherLast", v)} placeholder="Last" />
              </div>
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Welcome message..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "wedding" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Bride - First" value={form.brideFirst} required onChange={(v) => u("brideFirst", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last" value={form.brideLast} required onChange={(v) => u("brideLast", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Groom - First" value={form.groomFirst} required onChange={(v) => u("groomFirst", v)} placeholder="First" />
                <SmInput label="Last" value={form.groomLast} required onChange={(v) => u("groomLast", v)} placeholder="Last" />
              </div>
              <SmInput label="Wedding Date" value={form.weddingDate} type="date" required onChange={(v) => u("weddingDate", v)} />
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Wedding wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "photo" && (<>
              <SmInput label="Names of People in Photo" value={form.photoPeopleNames} required onChange={(v) => u("photoPeopleNames", v)} placeholder="List all people shown" inputRef={inputRef} multiline />
              <SmInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
              <SmInput label="Brief Description" value={form.message} onChange={(v) => u("message", v)} placeholder="What's in the photo, when/where taken..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "other" && (<>
              <SmInput label="Describe Your Request" value={form.message} required onChange={(v) => u("message", v)} placeholder="Tell us what you'd like to submit..." inputRef={inputRef} multiline maxWords={40} />
            </>)}

            <div style={SM.navRow}>
              <button onClick={() => goTo(4)} style={SM.btnBack}>← Back</button>
              <button onClick={() => goTo(6)} style={SM.btn}>Continue →</button>
            </div>
          </div>
        );
      }

      case 6: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>📸 Photo Upload</h2>
          <p style={SM.stepDesc}>Optional — attach a photo to your submission.</p>
          <SmGlassCard style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, border: `2px dashed ${C.border}` }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
            <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Drag & drop or click to upload</p>
            <p style={{ fontSize: 11, color: C.textDim }}>300KB – 5MB • JPG, PNG, PDF</p>
            <p style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>Trouble uploading? Email to <span style={{ color: C.turquoiseLight }}>turtlepress@nhbp-nsn.gov</span></p>
          </SmGlassCard>
          {form.submissionType !== "photo" && (
            <SmInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
          )}
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7, marginBottom: 12 }}>{PHOTO_DISCLAIMER}</p>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div onClick={() => setPhotoAgreed(!photoAgreed)} style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, border: `2px solid ${photoAgreed ? C.turquoise : C.border}`, background: photoAgreed ? C.turquoise + "20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {photoAgreed && <span style={{ color: C.turquoise, fontSize: 14 }}>✓</span>}
              </div>
              <span style={{ fontSize: 12, color: C.textSecondary }}>I agree to the photo submission guidelines</span>
            </label>
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(5)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(7)} style={SM.btn}>{photoAgreed ? "Continue →" : "Skip Photo →"}</button>
          </div>
        </div>
      );

      case 7: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>Contact Information</h2>
          <p style={SM.stepDesc}>In case we need to reach you about your submission.</p>
          <SmInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.email.includes("@") && goTo(8)} />
          <SmInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(8)} />
          <div style={SM.navRow}>
            <button onClick={() => goTo(6)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(8)} disabled={!form.email.includes("@")} style={SM.btn}>Review →</button>
          </div>
        </div>
      );

      case 8: {
        const t = SUBMISSION_TYPES.find((x) => x.id === form.submissionType);
        const reviewItems = [
          ["Submitted By", `${form.firstName} ${form.lastName}`],
          ["Tribal ID", form.tribalId],
          ["Role", form.identity === "employee" ? "NHBP Employee" : "Tribal Member"],
          ["Type", `${t?.icon} ${t?.label}`],
          ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`],
        ];
        if (form.submissionType === "birthday" && form.bdayFirstName) reviewItems.push(["Celebrating", `${form.bdayFirstName} ${form.bdayLastName} — ${form.birthDate}`]);
        if (form.submissionType === "anniversary" && form.anniName1First) reviewItems.push(["Couple", `${form.anniName1First} ${form.anniName1Last} & ${form.anniName2First} ${form.anniName2Last}`]);
        if (form.submissionType === "wedding" && form.brideFirst) reviewItems.push(["Couple", `${form.brideFirst} ${form.brideLast} & ${form.groomFirst} ${form.groomLast} — ${form.weddingDate}`]);
        if (form.submissionType === "birth" && form.newbornFirst) reviewItems.push(["Newborn", `${form.newbornFirst} ${form.newbornLast} — Born ${form.dateOfBirth}`]);
        if (form.message) reviewItems.push(["Message", form.message]);
        reviewItems.push(["Date Submitted", new Date().toLocaleString()]);

        return (
          <div style={SM.stepWrap}>
            <h2 style={SM.stepTitle}>Review Your Submission</h2>
            <p style={SM.stepDesc}>Make sure everything looks good.</p>
            <SmGlassCard style={{ marginBottom: 16 }}>
              {reviewItems.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < reviewItems.length - 1 ? 12 : 0, borderBottom: i < reviewItems.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </SmGlassCard>
            <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, marginBottom: 24, textAlign: "center" }}>
              Submission does not guarantee placement. Placement is at the discretion of the editors and Tribal Council.
            </p>
            <div style={SM.navRow}>
              <button onClick={() => goTo(7)} style={SM.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...SM.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>🐢 Submit</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={SM.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={SM.bgOrb1} /><div style={SM.bgOrb2} /><div style={SM.bgOrb3} />
      {step > 0 && (
        <div style={SM.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: C.turquoise }}>{Math.round(progress)}%</span>
          </div>
          <div style={SM.progressTrack}><div style={{ ...SM.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...SM.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ===========================================================
//  QTP ARTICLE / STORY SUB-FORM
// ===========================================================
function QTPArticleSubForm({ onBack }) {

  const COMMITTEES = [
    "Cemetery & Parks Committee", "Cultural Committee", "Education Committee",
    "Elders Committee", "Election Board", "Enrollment Committee", "Housing Committee",
    "Journey to Wellness Committee", "Planning and Land Use Committee",
    "Tribal Emergency Preparedness Committee", "Tribal Environmental Advisory Committee",
    "Veterans Committee"
  ];

  const SUBMISSION_FORMATS = [
    { id: "article", icon: "📝", label: "Article Only", desc: "Written content, no photos" },
    { id: "photo", icon: "📸", label: "Photo Only", desc: "Photos with captions" },
    { id: "both", icon: "📰", label: "Article With Photo", desc: "Written content + photos" },
    { id: "lead", icon: "💡", label: "Story Lead / Tip", desc: "Something newsworthy is happening" },
  ];

  const PHOTO_DISCLAIMER = `The Turtle Press editors and Tribal Council have discretion when accepting a photo or other content for publication. Photo guidelines do not allow photos with alcohol present nor any hand gestures. Communications will not print photos with a visible copyright. By submitting you acknowledge these guidelines, are stating that you own the rights to the photo, and are allowing NHBP to use the photo for publication in the Turtle Press.`;
  const DEADLINE_NOTICE = `Article submissions are due the 1st of each month for the next edition. Submission does not guarantee placement — placement is at the discretion of the editors and Tribal Council.`;

  // ── Sub-components ──
  const ArGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const ArInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline, maxWords }) => {
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

  const ArSelect = ({ label, value, onChange, options, required, placeholder }) => (
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

  const ArDeptSelect = ({ value, onChange }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Department <span style={{ color: C.turquoise }}>*</span>
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: value ? C.textPrimary : C.textDim, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%2340b5ad' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
        <option value="" style={{ background: C.dark }}>Select department...</option>
        {FORM_DEPTS.map(d => <option key={d.value} value={d.value} style={{ background: C.dark }}>{d.label}</option>)}
      </select>
    </div>
  );

  const ArBadge = ({ name, color }) => (
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
  const [photoAgreed, setPhotoAgreed] = useState(false);
  const inputRef = useRef(null);

  const [form, setForm, clearDraft] = useDraftForm("turtle-press-article", {
    firstName: "", lastName: "", tribalId: "", identity: "",
    email: "", phone: "",
    department: "", committee: "",
    submissionFormat: null,
    articleWrittenByFirst: "", articleWrittenByLast: "",
    titleStatus: "",
    articleTitle: "", activityName: "",
    eventDate: "", eventTime: "", eventLocation: "",
    interviewNames: "", interviewContact: "",
    articleContent: "",
    storyDescription: "",
    whyNewsworthy: "",
    whenHappening: "",
    photoCredit: "", photoPeopleNames: "",
    additionalNotes: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTA");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDCDD ${form.articleTitle || form.activityName || "Article Submission"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`,
        `Tribal ID: ${form.tribalId || "N/A"}`, `Identity: ${form.identity || "N/A"}`,
        `Department: ${form.department || form.committee || "N/A"}`, "",
        "\uD83D\uDCDD ARTICLE SUBMISSION", `Format: ${form.submissionFormat || "N/A"}`, `Title: ${form.articleTitle || form.activityName || "N/A"}`,
        form.articleContent ? `Content: ${form.articleContent}` : "", form.storyDescription ? `Story: ${form.storyDescription}` : "",
        form.whyNewsworthy ? `Why Newsworthy: ${form.whyNewsworthy}` : "", form.whenHappening ? `When: ${form.whenHappening}` : "",
        form.photoCredit ? `Photo Credit: ${form.photoCredit}` : "", form.additionalNotes ? `Notes: ${form.additionalNotes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Turtle Press Article", serviceId: "turtle-press",
      requesterName: name, email: form.email,
      phone: form.phone, tribalId: form.tribalId, identity: form.identity,
      department: form.department || form.committee || "",
      submissionFormat: form.submissionFormat, articleTitle: form.articleTitle || form.activityName || "",
      articleContent: form.articleContent, storyDescription: form.storyDescription,
      whyNewsworthy: form.whyNewsworthy, whenHappening: form.whenHappening,
      photoCredit: form.photoCredit, notes: form.additionalNotes,
    });
    clearDraft();
    setSubmitted(true);
  };

  // Dynamic step routing: employees get an extra "Department" step
  const getFormatStep = () => form.identity === "employee" ? 5 : 4;
  const getDetailsStep = () => form.identity === "employee" ? 6 : 5;
  const getPhotoStep = () => form.identity === "employee" ? 7 : 6;
  const getContactStep = () => form.identity === "employee" ? 8 : 7;
  const getReviewStep = () => form.identity === "employee" ? 9 : 8;

  const labels = form.identity === "employee"
    ? ["Welcome", "Your Name", "Tribal ID", "Identity", "Department", "Format", "Details", "Photo", "Contact", "Review"]
    : ["Welcome", "Your Name", "Tribal ID", "Identity", "Format", "Details", "Photo", "Contact", "Review"];

  const maxStep = getReviewStep();
  const progress = step > 0 ? Math.min((step / maxStep) * 100, 100) : 0;

  const AR = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
    bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.turquoise}08, transparent 70%)`, pointerEvents: "none" },
    bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
    bgOrb3: { position: "fixed", top: "40%", left: "50%", width: "30vw", height: "30vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}04, transparent 70%)`, pointerEvents: "none", transform: "translateX(-50%)" },
    progressWrap: { position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` },
    progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
    progressBar: { height: "100%", background: `linear-gradient(90deg, ${C.turquoise}, ${C.turquoiseLight})`, borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 12px ${C.turquoiseGlow}` },
    content: { width: "100%", maxWidth: 480, zIndex: 2 },
    stepWrap: { textAlign: "left" },
    stepTitle: { fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" },
    stepDesc: { fontSize: 14, color: C.textSecondary, marginBottom: 28, lineHeight: 1.6 },
    navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    successWrap: { textAlign: "center", zIndex: 2, maxWidth: 440 },
  };

  // ── SUBMITTED ──
  if (submitted) {
    const fmt = SUBMISSION_FORMATS.find((x) => x.id === form.submissionFormat);
    return (
      <div style={AR.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={AR.bgOrb1} /><div style={AR.bgOrb2} />
        <div style={AR.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>📰</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your article submission has been received and routed<br />to the Communications Hub for review.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            <ArBadge name="🐢 QTP" color="#0079bf" />
            <ArBadge name="📝 Article" color="#00c2e0" />
            {form.submissionFormat === "lead" && <ArBadge name="💡 Story Lead" color="#f2d600" />}
          </div>
          <ArGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Format", `${fmt?.icon} ${fmt?.label}`],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
              form.articleTitle ? ["Article", form.articleTitle] : null,
              form.department ? ["Department", form.department] : null,
            ].filter(Boolean).map(([k, v, accent], i) => (
              <div key={k + i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 5 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </ArGlassCard>
          <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>{DEADLINE_NOTICE}</p>
          <button onClick={() => { setSubmitted(false); setStep(0); setPhotoAgreed(false); }} style={{ ...AR.btn, marginTop: 28 }}>Submit Another</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={AR.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>📰</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Article & Story</h1>
          <p style={{ fontSize: 17, color: C.turquoiseLight, marginBottom: 4, fontWeight: 500 }}>Submission Form</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 400, margin: "16px auto 8px" }}>
            Submit articles, story leads, and news tips for the<br />Quarterly Turtle Press. Share what's happening in our<br />community and beyond.
          </p>
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, maxWidth: 360, margin: "16px auto 32px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.border}` }}>
            📅 {DEADLINE_NOTICE}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => goTo(1)} style={AR.btn}>Get Started →</button>
            <button onClick={onBack} style={AR.btnBack}>← Back</button>
          </div>
        </div>
      );

      case 1: return (
        <div style={AR.stepWrap}>
          <h2 style={AR.stepTitle}>What's your name?</h2>
          <p style={AR.stepDesc}>Let us know who's submitting.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <ArInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <ArInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
          </div>
          <div style={AR.navRow}>
            <button onClick={() => goTo(0)} style={AR.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName} style={AR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={AR.stepWrap}>
          <h2 style={AR.stepTitle}>Tribal ID Number</h2>
          <p style={AR.stepDesc}>Enter your 4-digit tribal identification number.</p>
          <ArInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
          <div style={AR.navRow}>
            <button onClick={() => goTo(1)} style={AR.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={form.tribalId.length !== 4} style={AR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={AR.stepWrap}>
          <h2 style={AR.stepTitle}>I am a...</h2>
          <p style={AR.stepDesc}>This helps us route your submission.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {[
              { id: "employee", icon: "🏢", label: "NHBP Employee", desc: "Staff or department member" },
              { id: "member", icon: "👤", label: "Tribal Member", desc: "NHBP community member" },
            ].map((o) => (
              <ArGlassCard key={o.id} active={form.identity === o.id} onClick={() => u("identity", o.id)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{o.desc}</div>
                </div>
              </ArGlassCard>
            ))}
          </div>
          <div style={AR.navRow}>
            <button onClick={() => goTo(2)} style={AR.btnBack}>← Back</button>
            <button onClick={() => goTo(form.identity === "employee" ? 4 : getFormatStep())} disabled={!form.identity} style={AR.btn}>Continue →</button>
          </div>
        </div>
      );

      // DEPARTMENT (employees only)
      case 4: {
        if (form.identity !== "employee") { goTo(getFormatStep()); return null; }
        return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>Department</h2>
            <p style={AR.stepDesc}>Which department is this submission from?</p>
            <ArDeptSelect value={form.department} onChange={(v) => u("department", v)} />
            {form.department === "Committees" && (
              <ArSelect label="Which Committee" value={form.committee} onChange={(v) => u("committee", v)} options={COMMITTEES} placeholder="Select committee" />
            )}
            <div style={AR.navRow}>
              <button onClick={() => goTo(3)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(getFormatStep())} disabled={!form.department} style={AR.btn}>Continue →</button>
            </div>
          </div>
        );
      }

      // FORMAT + DETAILS + PHOTO + CONTACT + REVIEW (dynamic steps)
      default: {
        const formatStep = getFormatStep();
        const detailsStep = getDetailsStep();
        const photoStep = getPhotoStep();
        const contactStep = getContactStep();
        const reviewStep = getReviewStep();

        if (step === formatStep) return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>What are you submitting?</h2>
            <p style={AR.stepDesc}>Choose the format that fits your content.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {SUBMISSION_FORMATS.map((f) => (
                <ArGlassCard key={f.id} active={form.submissionFormat === f.id} onClick={() => u("submissionFormat", f.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                  <span style={{ fontSize: 28, filter: form.submissionFormat === f.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{f.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                  <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{f.desc}</span>
                </ArGlassCard>
              ))}
            </div>
            <div style={AR.navRow}>
              <button onClick={() => goTo(form.identity === "employee" ? 4 : 3)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(detailsStep)} disabled={!form.submissionFormat} style={AR.btn}>Continue →</button>
            </div>
          </div>
        );

        if (step === detailsStep) {
          const isLead = form.submissionFormat === "lead";
          return (
            <div style={AR.stepWrap}>
              <h2 style={AR.stepTitle}>{isLead ? "💡 Story Lead Details" : "📝 Article Details"}</h2>
              <p style={AR.stepDesc}>{isLead ? "Tell us what's newsworthy." : "Fill in the details for your article."}</p>
              {isLead ? (<>
                <ArInput label="What's the story?" value={form.storyDescription} required onChange={(v) => u("storyDescription", v)} placeholder="Describe what's happening..." inputRef={inputRef} multiline />
                <ArInput label="Why is it newsworthy?" value={form.whyNewsworthy} onChange={(v) => u("whyNewsworthy", v)} placeholder="Impact on community, timeliness, cultural significance..." multiline />
                <ArInput label="Who's involved?" value={form.interviewNames} onChange={(v) => u("interviewNames", v)} placeholder="Key people, contact info for interviews" multiline />
                <ArInput label="When is this happening?" value={form.whenHappening} onChange={(v) => u("whenHappening", v)} placeholder="Date, timeframe, or if it's time-sensitive" />
                <ArInput label="Additional Notes" value={form.additionalNotes} onChange={(v) => u("additionalNotes", v)} placeholder="Anything else" multiline />
              </>) : (<>
                <div style={{ display: "flex", gap: 12 }}>
                  <ArInput label="Written By - First" value={form.articleWrittenByFirst} onChange={(v) => u("articleWrittenByFirst", v)} placeholder="First" inputRef={inputRef} />
                  <ArInput label="Last" value={form.articleWrittenByLast} onChange={(v) => u("articleWrittenByLast", v)} placeholder="Last" />
                </div>
                <ArInput label="Title / Tribal Status" value={form.titleStatus} onChange={(v) => u("titleStatus", v)} placeholder="e.g. Communications Specialist, Tribal Elder" />
                <ArInput label="Title of Article" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Article title" />
                <ArInput label="Name of Activity / Event" value={form.activityName} onChange={(v) => u("activityName", v)} placeholder="What the article covers" />
                <div style={{ display: "flex", gap: 12 }}>
                  <ArInput label="Date of Event" value={form.eventDate} type="date" onChange={(v) => u("eventDate", v)} />
                  <ArInput label="Time" value={form.eventTime} type="time" onChange={(v) => u("eventTime", v)} />
                </div>
                <ArInput label="Location" value={form.eventLocation} onChange={(v) => u("eventLocation", v)} placeholder="Where it's happening" />
                <ArInput label="People Willing to be Interviewed" value={form.interviewNames} onChange={(v) => u("interviewNames", v)} placeholder="Names — at least one if possible" multiline />
                <ArInput label="Interview Contact Info" value={form.interviewContact} onChange={(v) => u("interviewContact", v)} placeholder="Phone or email" />
                {(form.submissionFormat === "article" || form.submissionFormat === "both") && (
                  <ArInput label="Article Content" value={form.articleContent} onChange={(v) => u("articleContent", v)} placeholder="Paste your article here, or upload a file on the next step" multiline />
                )}
                <ArInput label="Additional Notes" value={form.additionalNotes} onChange={(v) => u("additionalNotes", v)} placeholder="Anything else we should know" multiline />
              </>)}
              <div style={AR.navRow}>
                <button onClick={() => goTo(formatStep)} style={AR.btnBack}>← Back</button>
                <button onClick={() => goTo(photoStep)} style={AR.btn}>Continue →</button>
              </div>
            </div>
          );
        }

        if (step === photoStep) return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>📸 Files & Photos</h2>
            <p style={AR.stepDesc}>Upload photos, articles, or supporting files.</p>
            <ArGlassCard style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, border: `2px dashed ${C.border}` }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
              <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Drag & drop or click to upload</p>
              <p style={{ fontSize: 11, color: C.textDim }}>Photos, documents, PDFs • Up to 5MB each</p>
              <p style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>You may upload multiple files</p>
            </ArGlassCard>
            {(form.submissionFormat === "photo" || form.submissionFormat === "both") && (<>
              <ArInput label="Names of People in Photos" value={form.photoPeopleNames} onChange={(v) => u("photoPeopleNames", v)} placeholder="List all people shown" multiline />
              <ArInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
            </>)}
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7, marginBottom: 12 }}>{PHOTO_DISCLAIMER}</p>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div onClick={() => setPhotoAgreed(!photoAgreed)} style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, border: `2px solid ${photoAgreed ? C.turquoise : C.border}`, background: photoAgreed ? C.turquoise + "20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {photoAgreed && <span style={{ color: C.turquoise, fontSize: 14 }}>✓</span>}
                </div>
                <span style={{ fontSize: 12, color: C.textSecondary }}>I agree to the photo submission guidelines</span>
              </label>
            </div>
            <div style={AR.navRow}>
              <button onClick={() => goTo(detailsStep)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(contactStep)} style={AR.btn}>{photoAgreed ? "Continue →" : "Skip →"}</button>
            </div>
          </div>
        );

        if (step === contactStep) return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>Contact Information</h2>
            <p style={AR.stepDesc}>In case we need to reach you.</p>
            <ArInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.email.includes("@") && goTo(reviewStep)} />
            <ArInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(reviewStep)} />
            <div style={AR.navRow}>
              <button onClick={() => goTo(photoStep)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(reviewStep)} disabled={!form.email.includes("@")} style={AR.btn}>Review →</button>
            </div>
          </div>
        );

        if (step === reviewStep) {
          const fmt = SUBMISSION_FORMATS.find((x) => x.id === form.submissionFormat);
          const items = [
            ["Submitted By", `${form.firstName} ${form.lastName}`],
            ["Tribal ID", form.tribalId],
            ["Role", form.identity === "employee" ? "NHBP Employee" : "Tribal Member"],
            form.department ? ["Department", `${form.department}${form.committee ? ` — ${form.committee}` : ""}`] : null,
            ["Format", `${fmt?.icon} ${fmt?.label}`],
            form.articleTitle ? ["Article", form.articleTitle] : null,
            form.activityName ? ["Activity", form.activityName] : null,
            form.storyDescription ? ["Story", form.storyDescription] : null,
            form.interviewNames ? ["Interviews", form.interviewNames] : null,
            ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`],
            ["Date Submitted", new Date().toLocaleString()],
            ["Routes To", "The Hub [Wigwam] → 🐢 QTP"],
          ].filter(Boolean);

          return (
            <div style={AR.stepWrap}>
              <h2 style={AR.stepTitle}>Review Your Submission</h2>
              <p style={AR.stepDesc}>Make sure everything looks good.</p>
              <ArGlassCard style={{ marginBottom: 16 }}>
                {items.map(([k, v], i) => (
                  <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 14, color: k === "Routes To" ? C.turquoiseLight : C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                  </div>
                ))}
              </ArGlassCard>
              <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, marginBottom: 24, textAlign: "center" }}>{DEADLINE_NOTICE}</p>
              <div style={AR.navRow}>
                <button onClick={() => goTo(contactStep)} style={AR.btnBack}>← Back</button>
                <button onClick={handleSubmit} style={{ ...AR.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>📰 Submit</button>
              </div>
            </div>
          );
        }

        return null;
      }
    }
  };

  return (
    <div style={AR.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={AR.bgOrb1} /><div style={AR.bgOrb2} /><div style={AR.bgOrb3} />
      {step > 0 && (
        <div style={AR.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step] || "..."}</span>
            <span style={{ fontSize: 11, color: C.turquoise }}>{Math.round(progress)}%</span>
          </div>
          <div style={AR.progressTrack}><div style={{ ...AR.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...AR.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

export default TurtlePressForm;
