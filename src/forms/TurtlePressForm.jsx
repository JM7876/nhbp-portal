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

// ════════════════════════════════════════════════════════════
//  SHARED STYLES & SUB-COMPONENTS FOR TURTLE PRESS FORMS
// ════════════════════════════════════════════════════════════

const TP = {
  container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
  bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}08, transparent 70%)`, pointerEvents: "none" },
  bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
  content: { width: "100%", maxWidth: 480, zIndex: 2 },
  stepWrap: { textAlign: "left" },
  stepTitle: { fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" },
  stepDesc: { fontSize: 14, color: C.textSecondary, marginBottom: 28, lineHeight: 1.6 },
  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
  btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
  progressBar: { height: "100%", background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 12px rgba(201,168,76,0.3)` },
};

function TpInput({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, multiline, rows = 4 }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      {multiline ? (
        <textarea ref={ref} value={value} rows={rows} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
      ) : (
        <input ref={ref} type={type} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
      )}
    </div>
  );
}

function TpSelect({ label, value, onChange, options, required, placeholder }) {
  return (
    <div style={{ marginBottom: 20 }}>
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
}

function TpGlassOption({ children, active, onClick, style: s = {} }) {
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
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 12, color: C.textDim }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, textAlign: "right", maxWidth: "60%" }}>{value || "—"}</span>
    </div>
  );
}

function SuccessScreen({ ticket, date, label, onBack, onAnother }) {
  return (
    <div style={TP.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={TP.bgOrb1} /><div style={TP.bgOrb2} />
      <div style={{ textAlign: "center", zIndex: 2, maxWidth: 440 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px", background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff", boxShadow: `0 0 40px ${C.turquoiseGlow}` }}>✓</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Submitted!</h2>
        <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 24, lineHeight: 1.6 }}>
          Your {label} has been received. The Communications team will review it shortly.
        </p>
        <div style={{ background: C.glass, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 24px", marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>Ticket</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.turquoise, fontFamily: "monospace", letterSpacing: "0.05em" }}>{ticket}</div>
          {date && <div style={{ fontSize: 12, color: C.textDim, marginTop: 8 }}>{date}</div>}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onBack} style={{ ...TP.btnBack, border: `1px solid ${C.border}` }}>← Back to Menu</button>
          <button onClick={onAnother} style={TP.btn}>Submit Another</button>
        </div>
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════
//  QTP SUBMISSION SUB-FORM (Birthdays, Celebrations & Photos)
// ════════════════════════════════════════════════════════════

function QTPSubmissionSubForm({ onBack }) {
  const SUBMISSION_TYPES = [
    { id: "birthday", icon: "🎂", label: "Birthday", desc: "Celebrate a member's birthday" },
    { id: "anniversary", icon: "💍", label: "Anniversary", desc: "Work or wedding anniversary" },
    { id: "birth", icon: "👶", label: "New Baby", desc: "Welcome a new addition" },
    { id: "wedding", icon: "💒", label: "Wedding", desc: "Marriage announcement" },
    { id: "graduation", icon: "🎓", label: "Graduation", desc: "Academic achievement" },
    { id: "achievement", icon: "🏆", label: "Achievement", desc: "Award, promotion, or milestone" },
    { id: "photo", icon: "📷", label: "Photo Contribution", desc: "Submit photos for publication" },
    { id: "other", icon: "✨", label: "Other Celebration", desc: "Something else worth sharing" },
  ];

  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const inputRef = useRef(null);

  const [form, setForm, clearDraft] = useDraftForm("turtle-press-submission", {
    firstName: "", lastName: "", tribalId: "",
    email: "", phone: "",
    submissionType: null, personName: "", eventDate: "",
    message: "", photoDescription: "", edition: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTS");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    const typeLabel = SUBMISSION_TYPES.find(s => s.id === form.submissionType)?.label || "Submission";
    await createTrelloCard(
      `🎉 QTP ${typeLabel} — ${name || "Unknown"}`,
      [...trelloHeader(t),
        "👤 SUBMITTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Tribal ID: ${form.tribalId || "N/A"}`, "",
        "🎉 SUBMISSION DETAILS", `Type: ${typeLabel}`, `Person/Event: ${form.personName || "N/A"}`,
        `Event Date: ${form.eventDate || "N/A"}`, `Target Edition: ${form.edition || "N/A"}`,
        `Message: ${form.message || "N/A"}`, form.photoDescription ? `Photo Notes: ${form.photoDescription}` : "",
        "", "🐢 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: `Turtle Press - ${typeLabel}`, serviceId: "turtle-press",
      requesterName: name, email: form.email, phone: form.phone, tribalId: form.tribalId,
      submissionType: form.submissionType, personName: form.personName,
      eventDate: form.eventDate, message: form.message,
      photoDescription: form.photoDescription, edition: form.edition,
    });
    clearDraft();
    setSubmitted(true);
  };

  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;

  if (submitted) {
    return <SuccessScreen ticket={ticketNumber} date={submissionDate} label="celebration submission" onBack={onBack} onAnother={() => { setSubmitted(false); setStep(0); }} />;
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>What are you celebrating?</h2>
            <p style={TP.stepDesc}>Choose the type of submission</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SUBMISSION_TYPES.map(t => (
                <TpGlassOption key={t.id} active={form.submissionType === t.id}
                  onClick={() => { u("submissionType", t.id); setTimeout(() => goTo(1), 350); }}
                  style={{ padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{t.desc}</div>
                </TpGlassOption>
              ))}
            </div>
            <div style={TP.navRow}>
              <button onClick={onBack} style={TP.btnBack}>← Back to Menu</button>
              <div />
            </div>
          </div>
        );

      case 1:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Your Information</h2>
            <p style={TP.stepDesc}>Tell us who's submitting</p>
            <div style={{ display: "flex", gap: 12 }}>
              <TpInput label="First Name" value={form.firstName} onChange={v => u("firstName", v)} placeholder="First name" required inputRef={inputRef} />
              <TpInput label="Last Name" value={form.lastName} onChange={v => u("lastName", v)} placeholder="Last name" required />
            </div>
            <TpInput label="Email" value={form.email} onChange={v => u("email", v)} placeholder="your@email.com" type="email" required />
            <TpInput label="Phone" value={form.phone} onChange={v => u("phone", v)} placeholder="(optional)" />
            <TpInput label="Tribal ID" value={form.tribalId} onChange={v => u("tribalId", v)} placeholder="(optional)" />
            <div style={TP.navRow}>
              <button onClick={() => goTo(0)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.email.includes("@")} style={{ ...TP.btn, opacity: (!form.firstName || !form.lastName || !form.email.includes("@")) ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Celebration Details</h2>
            <p style={TP.stepDesc}>Who or what are we celebrating?</p>
            <TpInput label="Person / Event Name" value={form.personName} onChange={v => u("personName", v)} placeholder="e.g. John Smith's Birthday" required inputRef={inputRef} />
            <TpInput label="Event Date" value={form.eventDate} onChange={v => u("eventDate", v)} type="date" />
            <TpSelect label="Target Edition" value={form.edition} onChange={v => u("edition", v)}
              options={["Spring 2026", "Summer 2026", "Fall 2026", "Winter 2026", "Next Available"]} placeholder="Which edition?" />
            <div style={TP.navRow}>
              <button onClick={() => goTo(1)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(3)} disabled={!form.personName} style={{ ...TP.btn, opacity: !form.personName ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Message & Photos</h2>
            <p style={TP.stepDesc}>Share a message and any photo details</p>
            <TpInput label="Message / Announcement Text" value={form.message} onChange={v => u("message", v)} placeholder="What would you like published?" multiline rows={4} required inputRef={inputRef} />
            <TpInput label="Photo Description" value={form.photoDescription} onChange={v => u("photoDescription", v)} placeholder="Describe any photos you'll send (optional)" multiline rows={2} />
            <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6 }}>
              After submitting, email photos to communications@nhbp-nsn.gov with your ticket number in the subject line.
            </p>
            <div style={TP.navRow}>
              <button onClick={() => goTo(2)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(4)} disabled={!form.message} style={{ ...TP.btn, opacity: !form.message ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Review & Submit</h2>
            <p style={TP.stepDesc}>Confirm everything looks good</p>
            <div style={{ background: C.glass, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
              <ReviewRow label="Type" value={SUBMISSION_TYPES.find(s => s.id === form.submissionType)?.label} />
              <ReviewRow label="Submitted by" value={`${form.firstName} ${form.lastName}`} />
              <ReviewRow label="Email" value={form.email} />
              <ReviewRow label="Person / Event" value={form.personName} />
              <ReviewRow label="Event Date" value={form.eventDate} />
              <ReviewRow label="Target Edition" value={form.edition} />
              <ReviewRow label="Message" value={form.message?.substring(0, 80) + (form.message?.length > 80 ? "..." : "")} />
            </div>
            <div style={TP.navRow}>
              <button onClick={() => goTo(3)} style={TP.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...TP.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>🎉 Submit</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={TP.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={TP.bgOrb1} /><div style={TP.bgOrb2} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` }}>
        <div style={TP.progressTrack}>
          <div style={{ ...TP.progressBar, width: `${progress}%` }} />
        </div>
      </div>
      <div style={{ ...TP.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════
//  QTP ARTICLE SUB-FORM (Article / Story Submission)
// ════════════════════════════════════════════════════════════

function QTPArticleSubForm({ onBack }) {
  const ARTICLE_TYPES = [
    { id: "written", icon: "📝", label: "Written Article", desc: "A completed article ready for review" },
    { id: "pitch", icon: "💡", label: "Story Pitch", desc: "An idea or topic you'd like us to cover" },
    { id: "column", icon: "📰", label: "Recurring Column", desc: "Regular feature or department update" },
    { id: "letter", icon: "✉️", label: "Letter to the Editor", desc: "Opinion or community message" },
  ];

  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const inputRef = useRef(null);

  const [form, setForm, clearDraft] = useDraftForm("turtle-press-article", {
    firstName: "", lastName: "", tribalId: "",
    email: "", phone: "", department: "",
    articleType: null, articleTitle: "", summary: "",
    content: "", hasPhotos: null, edition: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTA");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    const typeLabel = ARTICLE_TYPES.find(a => a.id === form.articleType)?.label || "Article";
    await createTrelloCard(
      `✍️ QTP ${typeLabel} — ${name || "Unknown"}`,
      [...trelloHeader(t),
        "👤 AUTHOR", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`,
        `Department: ${form.department || "N/A"}`, `Tribal ID: ${form.tribalId || "N/A"}`, "",
        "✍️ ARTICLE DETAILS", `Type: ${typeLabel}`, `Title: ${form.articleTitle || "N/A"}`,
        `Target Edition: ${form.edition || "N/A"}`, `Has Photos: ${form.hasPhotos || "N/A"}`,
        `Summary: ${form.summary || "N/A"}`,
        form.content ? `\nContent:\n${form.content.substring(0, 500)}${form.content.length > 500 ? "..." : ""}` : "",
        "", "🐢 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: `Turtle Press - ${typeLabel}`, serviceId: "turtle-press",
      requesterName: name, email: form.email, phone: form.phone, department: form.department,
      tribalId: form.tribalId, articleType: form.articleType, articleTitle: form.articleTitle,
      summary: form.summary, content: form.content, hasPhotos: form.hasPhotos, edition: form.edition,
    });
    clearDraft();
    setSubmitted(true);
  };

  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;

  if (submitted) {
    return <SuccessScreen ticket={ticketNumber} date={submissionDate} label="article submission" onBack={onBack} onAnother={() => { setSubmitted(false); setStep(0); }} />;
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>What type of submission?</h2>
            <p style={TP.stepDesc}>Choose the best fit for your content</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ARTICLE_TYPES.map(t => (
                <TpGlassOption key={t.id} active={form.articleType === t.id}
                  onClick={() => { u("articleType", t.id); setTimeout(() => goTo(1), 350); }}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px" }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: C.textDim }}>{t.desc}</div>
                  </div>
                </TpGlassOption>
              ))}
            </div>
            <div style={TP.navRow}>
              <button onClick={onBack} style={TP.btnBack}>← Back to Menu</button>
              <div />
            </div>
          </div>
        );

      case 1:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Author Information</h2>
            <p style={TP.stepDesc}>Tell us about yourself</p>
            <div style={{ display: "flex", gap: 12 }}>
              <TpInput label="First Name" value={form.firstName} onChange={v => u("firstName", v)} placeholder="First name" required inputRef={inputRef} />
              <TpInput label="Last Name" value={form.lastName} onChange={v => u("lastName", v)} placeholder="Last name" required />
            </div>
            <TpInput label="Email" value={form.email} onChange={v => u("email", v)} placeholder="your@email.com" type="email" required />
            <div style={{ display: "flex", gap: 12 }}>
              <TpInput label="Phone" value={form.phone} onChange={v => u("phone", v)} placeholder="(optional)" />
              <TpInput label="Tribal ID" value={form.tribalId} onChange={v => u("tribalId", v)} placeholder="(optional)" />
            </div>
            <TpSelect label="Department" value={form.department} onChange={v => u("department", v)}
              options={FORM_DEPTS.map(d => d.value)} placeholder="Select department (optional)" />
            <div style={TP.navRow}>
              <button onClick={() => goTo(0)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.email.includes("@")} style={{ ...TP.btn, opacity: (!form.firstName || !form.lastName || !form.email.includes("@")) ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Article Details</h2>
            <p style={TP.stepDesc}>Title, summary, and target edition</p>
            <TpInput label="Article Title" value={form.articleTitle} onChange={v => u("articleTitle", v)} placeholder="Give your article a title" required inputRef={inputRef} />
            <TpInput label="Summary / Pitch" value={form.summary} onChange={v => u("summary", v)} placeholder="Brief summary of what the article is about" multiline rows={3} required />
            <TpSelect label="Target Edition" value={form.edition} onChange={v => u("edition", v)}
              options={["Spring 2026", "Summer 2026", "Fall 2026", "Winter 2026", "Next Available"]} placeholder="Which edition?" />
            <div style={TP.navRow}>
              <button onClick={() => goTo(1)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(3)} disabled={!form.articleTitle || !form.summary} style={{ ...TP.btn, opacity: (!form.articleTitle || !form.summary) ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Article Content</h2>
            <p style={TP.stepDesc}>{form.articleType === "pitch" ? "Describe your story idea in detail" : "Paste or write your article content"}</p>
            <TpInput label={form.articleType === "pitch" ? "Story Details" : "Article Content"} value={form.content} onChange={v => u("content", v)}
              placeholder={form.articleType === "pitch" ? "Describe the story you'd like us to cover..." : "Paste your article text here..."} multiline rows={8} inputRef={inputRef} />
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Do you have photos to include?
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                {["Yes", "No"].map(opt => (
                  <TpGlassOption key={opt} active={form.hasPhotos === opt} onClick={() => u("hasPhotos", opt)}
                    style={{ flex: 1, textAlign: "center", padding: "12px" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: form.hasPhotos === opt ? C.turquoise : C.textSecondary }}>{opt}</span>
                  </TpGlassOption>
                ))}
              </div>
            </div>
            {form.hasPhotos === "Yes" && (
              <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6 }}>
                Email photos to communications@nhbp-nsn.gov with your ticket number in the subject line.
              </p>
            )}
            <div style={TP.navRow}>
              <button onClick={() => goTo(2)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(4)} style={TP.btn}>Continue →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Review & Submit</h2>
            <p style={TP.stepDesc}>Confirm everything looks good</p>
            <div style={{ background: C.glass, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
              <ReviewRow label="Type" value={ARTICLE_TYPES.find(a => a.id === form.articleType)?.label} />
              <ReviewRow label="Author" value={`${form.firstName} ${form.lastName}`} />
              <ReviewRow label="Email" value={form.email} />
              <ReviewRow label="Department" value={form.department} />
              <ReviewRow label="Title" value={form.articleTitle} />
              <ReviewRow label="Summary" value={form.summary?.substring(0, 80) + (form.summary?.length > 80 ? "..." : "")} />
              <ReviewRow label="Target Edition" value={form.edition} />
              <ReviewRow label="Has Photos" value={form.hasPhotos} />
            </div>
            <div style={TP.navRow}>
              <button onClick={() => goTo(3)} style={TP.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...TP.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>✍️ Submit Article</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={TP.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={TP.bgOrb1} /><div style={TP.bgOrb2} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` }}>
        <div style={TP.progressTrack}>
          <div style={{ ...TP.progressBar, width: `${progress}%` }} />
        </div>
      </div>
      <div style={{ ...TP.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════
//  QTP FEEDBACK SUB-FORM (Corrections, Compliments, Suggestions)
// ════════════════════════════════════════════════════════════

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
      `🐢 Turtle Press Feedback — ${name || "Unknown"}`,
      [...trelloHeader(t),
        "👤 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Tribal ID: ${form.tribalId || "N/A"}`, "",
        "📰 TURTLE PRESS FEEDBACK", `Edition: ${form.edition || "N/A"}`, `Feedback Type: ${form.feedbackType || "N/A"}`,
        `Page Number: ${form.pageNumber || "N/A"}`, `Article Title: ${form.articleTitle || "N/A"}`,
        `Feedback: ${form.feedback || "N/A"}`, form.correctionDetails ? `Correction Details: ${form.correctionDetails}` : "",
        "", "🐢 Submitted via NHBP Communications Portal"]
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

  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;

  if (submitted) {
    return <SuccessScreen ticket={ticketNumber} date={submissionDate} label="feedback" onBack={onBack} onAnother={() => { setSubmitted(false); setStep(0); }} />;
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>What type of feedback?</h2>
            <p style={TP.stepDesc}>Choose the category that best fits</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {FEEDBACK_TYPES.map(t => (
                <TpGlassOption key={t.id} active={form.feedbackType === t.id}
                  onClick={() => { u("feedbackType", t.id); setTimeout(() => goTo(1), 350); }}
                  style={{ padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{t.desc}</div>
                </TpGlassOption>
              ))}
            </div>
            <div style={TP.navRow}>
              <button onClick={onBack} style={TP.btnBack}>← Back to Menu</button>
              <div />
            </div>
          </div>
        );

      case 1:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Your Information</h2>
            <p style={TP.stepDesc}>So we can follow up if needed</p>
            <div style={{ display: "flex", gap: 12 }}>
              <TpInput label="First Name" value={form.firstName} onChange={v => u("firstName", v)} placeholder="First name" required inputRef={inputRef} />
              <TpInput label="Last Name" value={form.lastName} onChange={v => u("lastName", v)} placeholder="Last name" required />
            </div>
            <TpInput label="Email" value={form.email} onChange={v => u("email", v)} placeholder="your@email.com" type="email" required />
            <div style={{ display: "flex", gap: 12 }}>
              <TpInput label="Phone" value={form.phone} onChange={v => u("phone", v)} placeholder="(optional)" />
              <TpInput label="Tribal ID" value={form.tribalId} onChange={v => u("tribalId", v)} placeholder="(optional)" />
            </div>
            <div style={TP.navRow}>
              <button onClick={() => goTo(0)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.email.includes("@")} style={{ ...TP.btn, opacity: (!form.firstName || !form.lastName || !form.email.includes("@")) ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Which Edition?</h2>
            <p style={TP.stepDesc}>Tell us which edition your feedback is about</p>
            <TpSelect label="Edition" value={form.edition} onChange={v => u("edition", v)} options={EDITIONS} required placeholder="Select an edition" />
            <TpInput label="Page Number" value={form.pageNumber} onChange={v => u("pageNumber", v)} placeholder="(optional)" inputRef={inputRef} />
            <TpInput label="Article Title" value={form.articleTitle} onChange={v => u("articleTitle", v)} placeholder="(optional) Which article?" />
            <div style={TP.navRow}>
              <button onClick={() => goTo(1)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(3)} disabled={!form.edition} style={{ ...TP.btn, opacity: !form.edition ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Your Feedback</h2>
            <p style={TP.stepDesc}>Share your thoughts in detail</p>
            <TpInput label="Feedback" value={form.feedback} onChange={v => u("feedback", v)} placeholder="Tell us what's on your mind..." multiline rows={4} required inputRef={inputRef} />
            {form.feedbackType === "correction" && (
              <TpInput label="Correction Details" value={form.correctionDetails} onChange={v => u("correctionDetails", v)} placeholder="What specifically needs to be corrected?" multiline rows={3} />
            )}
            <div style={TP.navRow}>
              <button onClick={() => goTo(2)} style={TP.btnBack}>← Back</button>
              <button onClick={() => goTo(4)} disabled={!form.feedback} style={{ ...TP.btn, opacity: !form.feedback ? 0.4 : 1 }}>Continue →</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div style={TP.stepWrap}>
            <h2 style={TP.stepTitle}>Review & Submit</h2>
            <p style={TP.stepDesc}>Confirm everything looks good</p>
            <div style={{ background: C.glass, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
              <ReviewRow label="Type" value={FEEDBACK_TYPES.find(f => f.id === form.feedbackType)?.label} />
              <ReviewRow label="Submitted by" value={`${form.firstName} ${form.lastName}`} />
              <ReviewRow label="Email" value={form.email} />
              <ReviewRow label="Edition" value={form.edition} />
              {form.pageNumber && <ReviewRow label="Page" value={form.pageNumber} />}
              {form.articleTitle && <ReviewRow label="Article" value={form.articleTitle} />}
              <ReviewRow label="Feedback" value={form.feedback?.substring(0, 80) + (form.feedback?.length > 80 ? "..." : "")} />
            </div>
            <div style={TP.navRow}>
              <button onClick={() => goTo(3)} style={TP.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...TP.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>💬 Submit Feedback</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={TP.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={TP.bgOrb1} /><div style={TP.bgOrb2} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` }}>
        <div style={TP.progressTrack}>
          <div style={{ ...TP.progressBar, width: `${progress}%` }} />
        </div>
      </div>
      <div style={{ ...TP.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}
