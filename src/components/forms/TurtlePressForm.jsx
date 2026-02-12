import React, { useState, useEffect, useRef } from "react";
import { FC } from "../../theme";
import FormGlassCard from "../shared/FormGlassCard";
import FormInput from "../shared/FormInput";
import { FormDeptSelect, FormSelect } from "../shared/FormSelect";
import FormBadge from "../shared/FormBadge";
import { validateEmail } from "../../utils/validation";

function TurtlePressForm({ onReturnToServices }) {
  const [subView, setSubView] = useState("menu"); // "menu" | "submission" | "article" | "feedback"

  const C = FC;

  // ─── SUB-MENU ────────────────────────────
  if (subView === "menu") {
    const options = [
      { id: "submission", icon: "🎉", label: "Birthdays, Celebrations & Photos", desc: "Submit birthdays, anniversaries, births, weddings, and photo contributions", color: C.maroonLight },
      { id: "article", icon: "✍️", label: "Article / Story Submission", desc: "Submit a written article or pitch a story idea for the Turtle Press", color: C.turquoise },
      { id: "feedback", icon: "💬", label: "Feedback & Corrections", desc: "Corrections, compliments, suggestions, or questions about a published edition", color: C.gold },
    ];

    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
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
              <FormGlassCard key={o.id} onClick={() => setSubView(o.id)}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", textAlign: "left" }}>
                <span style={{ fontSize: 32, filter: `drop-shadow(0 0 8px ${o.color}40)` }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.5 }}>{o.desc}</div>
                </div>
              </FormGlassCard>
            ))}
          </div>
        </div>
        {/* Home turtle nav */}
        <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <button onClick={onReturnToServices}
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
            onMouseDown={e => { e.currentTarget.style.borderColor = "rgba(200,80,130,0.25)"; }}
            onMouseUp={e => { e.currentTarget.style.borderColor = "rgba(20,169,162,0.15)"; }}
          >🐢</button>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>Home</span>
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

function QTPFeedbackSubForm({ onBack }) {
  const C = FC;

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
  // ── State ──
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", tribalId: "",
    email: "", phone: "",
    edition: "", feedbackType: null,
    pageNumber: "", articleTitle: "",
    feedback: "", correctionDetails: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = () => {
    setTicketNumber(`NHBP-QTF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Name", "Tribal ID", "Edition", "Feedback Type", "Details", "Contact", "Review"];
  const progress = step > 0 ? Math.min((step / 7) * 100, 100) : 0;

  const FB = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
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
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-primary)", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-primary)" },
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
            <FormBadge name="🐢 QTP" color="#0079bf" />
            <FormBadge name="💬 Feedback" color="#c9a84c" />
            {form.feedbackType === "correction" && <FormBadge name="✏️ Correction" color="#eb5a46" />}
            {form.feedbackType === "compliment" && <FormBadge name="⭐ Compliment" color="#61bd4f" />}
            {form.feedbackType === "suggestion" && <FormBadge name="💡 Suggestion" color="#00c2e0" />}
            {form.feedbackType === "question" && <FormBadge name="❓ Question" color="#f2d600" />}
          </div>
          <FormGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Type", `${ft?.icon} ${ft?.label}`],
              ["Edition", form.edition],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
            ].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: "var(--font-primary)" }}>{v}</span>
              </div>
            ))}
          </FormGlassCard>
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
            <FormInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <FormInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
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
          <FormInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
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
          <FormSelect label="Edition" value={form.edition} required onChange={(v) => u("edition", v)} options={EDITIONS} placeholder="Select edition" />
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
              <FormGlassCard key={f.id} active={form.feedbackType === f.id} onClick={() => u("feedbackType", f.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.feedbackType === f.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{f.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{f.desc}</span>
              </FormGlassCard>
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
              <FormInput label="Page Number (if known)" value={form.pageNumber} onChange={(v) => u("pageNumber", v)} placeholder="e.g. Page 4" inputRef={inputRef} />
              <FormInput label="Article Title (if known)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Title of the article" />
              <FormInput label="What needs to be corrected?" value={form.correctionDetails} required onChange={(v) => u("correctionDetails", v)} placeholder="Describe the error and what it should say..." multiline />
            </>)}
            {form.feedbackType === "compliment" && (<>
              <FormInput label="Article or Section (optional)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Which article or section?" inputRef={inputRef} />
              <FormInput label="What did you enjoy?" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="Tell us what you liked..." multiline maxWords={40} />
            </>)}
            {form.feedbackType === "suggestion" && (<>
              <FormInput label="Your Suggestion" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="What would you like to see in future editions?" inputRef={inputRef} multiline maxWords={40} />
            </>)}
            {form.feedbackType === "question" && (<>
              <FormInput label="Article or Topic (optional)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Related to which article or topic?" inputRef={inputRef} />
              <FormInput label="Your Question" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="What would you like to know?" multiline maxWords={40} />
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
          <FormInput label="Email" value={form.email} onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && goTo(7)} />
          <FormInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(7)} />
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
            <FormGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </FormGlassCard>
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
  const C = FC;

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
  // ── State ──
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [photoAgreed, setPhotoAgreed] = useState(false);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
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

  const handleSubmit = () => {
    setTicketNumber(`NHBP-QTP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Name", "Tribal ID", "Identity", "Submission Type", "Details", "Photo", "Contact", "Review"];
  const progress = Math.min((step / 8) * 100, 100);

  const SM = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
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
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-primary)", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-primary)" },
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
            <FormBadge name="🐢 QTP" color="#0079bf" />
            {form.submissionType === "birthday" && <FormBadge name="🎂 Birthday" color="#ff78cb" />}
            {form.submissionType === "anniversary" && <FormBadge name="💍 Anniversary" color="#c377e0" />}
            {form.submissionType === "birth" && <FormBadge name="👶 Birth" color="#51e898" />}
            {form.submissionType === "wedding" && <FormBadge name="💒 Wedding" color="#f2d600" />}
          </div>
          <FormGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Type", `${t?.icon} ${t?.label}`],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
              ["Tribal ID", form.tribalId],
            ].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: "var(--font-primary)" }}>{v}</span>
              </div>
            ))}
          </FormGlassCard>
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
            <FormInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <FormInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
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
          <FormInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
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
              <FormGlassCard key={o.id} active={form.identity === o.id} onClick={() => u("identity", o.id)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{o.desc}</div>
                </div>
              </FormGlassCard>
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
              <FormGlassCard key={t.id} active={form.submissionType === t.id} onClick={() => u("submissionType", t.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.submissionType === t.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{t.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{t.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{t.desc}</span>
              </FormGlassCard>
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
                <FormInput label="Person's First Name" value={form.bdayFirstName} required onChange={(v) => u("bdayFirstName", v)} placeholder="First" inputRef={inputRef} />
                <FormInput label="Last Name" value={form.bdayLastName} required onChange={(v) => u("bdayLastName", v)} placeholder="Last" />
              </div>
              <FormInput label="Birth Date" value={form.birthDate} type="date" required onChange={(v) => u("birthDate", v)} />
              <FormInput label="From" value={form.from} onChange={(v) => u("from", v)} placeholder="Who is this from?" />
              <FormInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Happy birthday wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "anniversary" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <FormInput label="Name One - First" value={form.anniName1First} required onChange={(v) => u("anniName1First", v)} placeholder="First" inputRef={inputRef} />
                <FormInput label="Last" value={form.anniName1Last} required onChange={(v) => u("anniName1Last", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <FormInput label="Name Two - First" value={form.anniName2First} required onChange={(v) => u("anniName2First", v)} placeholder="First" />
                <FormInput label="Last" value={form.anniName2Last} required onChange={(v) => u("anniName2Last", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <FormSelect label="Month" value={form.anniMonth} required onChange={(v) => u("anniMonth", v)} options={MONTHS} placeholder="Month" />
                <FormSelect label="Day" value={form.anniDay} required onChange={(v) => u("anniDay", v)} options={Array.from({ length: 31 }, (_, i) => String(i + 1))} placeholder="Day" />
              </div>
              <FormInput label="From" value={form.from} onChange={(v) => u("from", v)} placeholder="Who is this from?" />
              <FormInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Anniversary wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "birth" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <FormInput label="Newborn's First Name" value={form.newbornFirst} required onChange={(v) => u("newbornFirst", v)} placeholder="First" inputRef={inputRef} />
                <FormInput label="Last Name" value={form.newbornLast} required onChange={(v) => u("newbornLast", v)} placeholder="Last" />
              </div>
              <FormInput label="Date of Birth" value={form.dateOfBirth} type="date" required onChange={(v) => u("dateOfBirth", v)} />
              <div style={{ display: "flex", gap: 12 }}>
                <FormInput label="Mother (optional)" value={form.motherFirst} onChange={(v) => u("motherFirst", v)} placeholder="First" />
                <FormInput label="Last" value={form.motherLast} onChange={(v) => u("motherLast", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <FormInput label="Father (optional)" value={form.fatherFirst} onChange={(v) => u("fatherFirst", v)} placeholder="First" />
                <FormInput label="Last" value={form.fatherLast} onChange={(v) => u("fatherLast", v)} placeholder="Last" />
              </div>
              <FormInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Welcome message..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "wedding" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <FormInput label="Bride - First" value={form.brideFirst} required onChange={(v) => u("brideFirst", v)} placeholder="First" inputRef={inputRef} />
                <FormInput label="Last" value={form.brideLast} required onChange={(v) => u("brideLast", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <FormInput label="Groom - First" value={form.groomFirst} required onChange={(v) => u("groomFirst", v)} placeholder="First" />
                <FormInput label="Last" value={form.groomLast} required onChange={(v) => u("groomLast", v)} placeholder="Last" />
              </div>
              <FormInput label="Wedding Date" value={form.weddingDate} type="date" required onChange={(v) => u("weddingDate", v)} />
              <FormInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Wedding wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "photo" && (<>
              <FormInput label="Names of People in Photo" value={form.photoPeopleNames} required onChange={(v) => u("photoPeopleNames", v)} placeholder="List all people shown" inputRef={inputRef} multiline />
              <FormInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
              <FormInput label="Brief Description" value={form.message} onChange={(v) => u("message", v)} placeholder="What's in the photo, when/where taken..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "other" && (<>
              <FormInput label="Describe Your Request" value={form.message} required onChange={(v) => u("message", v)} placeholder="Tell us what you'd like to submit..." inputRef={inputRef} multiline maxWords={40} />
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
          <FormGlassCard style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, border: `2px dashed ${C.border}` }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
            <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Drag & drop or click to upload</p>
            <p style={{ fontSize: 11, color: C.textDim }}>300KB – 5MB • JPG, PNG, PDF</p>
            <p style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>Trouble uploading? Email to <span style={{ color: C.turquoiseLight }}>turtlepress@nhbp-nsn.gov</span></p>
          </FormGlassCard>
          {form.submissionType !== "photo" && (
            <FormInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
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
          <FormInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && validateEmail(form.email) && goTo(8)} />
          <FormInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(8)} />
          <div style={SM.navRow}>
            <button onClick={() => goTo(6)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(8)} disabled={!validateEmail(form.email)} style={SM.btn}>Review →</button>
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
            <FormGlassCard style={{ marginBottom: 16 }}>
              {reviewItems.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < reviewItems.length - 1 ? 12 : 0, borderBottom: i < reviewItems.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </FormGlassCard>
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
  const C = FC;

  const AR_DEPTS = [
    { value: "Administration", label: "Administration" },
    { value: "Bkedé O Mshiké 🐢", label: "🐢 Bkedé O Mshiké" },
    { value: "Communications 📰", label: "📰 Communications" },
    { value: "Culture 🪶", label: "🪶 Culture" },
    { value: "Enrollment", label: "Enrollment" },
    { value: "Environmental 🌍", label: "🌍 Environmental" },
    { value: "Finance", label: "Finance" },
    { value: "Gaming Commission 🎰", label: "🎰 Gaming Commission" },
    { value: "Government Records 🗃️", label: "🗃️ Government Records" },
    { value: "Health and Human Services 🥼", label: "🥼 Health & Human Services" },
    { value: "Housing 🏡", label: "🏡 Housing" },
    { value: "Human Resources 💼", label: "💼 Human Resources" },
    { value: "Information Technology 🧑‍💻", label: "🧑‍💻 Information Technology" },
    { value: "Legal 👩‍💼", label: "👩‍💼 Legal" },
    { value: "Membership Services ⛹️‍♂️", label: "⛹️ Membership Services" },
    { value: "Planning 📊", label: "📊 Planning" },
    { value: "Public Works 🚏", label: "🚏 Public Works" },
    { value: "Social Services 🧑‍🧑‍🧒‍🧒", label: "🧑‍🧑‍🧒‍🧒 Social Services" },
    { value: "Tribal Council 🗳️", label: "🗳️ Tribal Council" },
    { value: "Tribal Court 👩‍⚖️", label: "👩‍⚖️ Tribal Court" },
    { value: "Tribal Police 👮‍♀️", label: "👮 Tribal Police" },
    { value: "Other", label: "Other" },
  ];

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
  // ── State ──
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [photoAgreed, setPhotoAgreed] = useState(false);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
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

  const handleSubmit = () => {
    setTicketNumber(`NHBP-QTA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
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
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
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
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-primary)", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-primary)" },
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
            <FormBadge name="🐢 QTP" color="#0079bf" />
            <FormBadge name="📝 Article" color="#00c2e0" />
            {form.submissionFormat === "lead" && <FormBadge name="💡 Story Lead" color="#f2d600" />}
          </div>
          <FormGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
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
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: "var(--font-primary)", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </FormGlassCard>
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
            <FormInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <FormInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
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
          <FormInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
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
              <FormGlassCard key={o.id} active={form.identity === o.id} onClick={() => u("identity", o.id)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{o.desc}</div>
                </div>
              </FormGlassCard>
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
            <FormDeptSelect options={AR_DEPTS} value={form.department} onChange={(v) => u("department", v)} />
            {form.department === "Committees" && (
              <FormSelect label="Which Committee" value={form.committee} onChange={(v) => u("committee", v)} options={COMMITTEES} placeholder="Select committee" />
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
                <FormGlassCard key={f.id} active={form.submissionFormat === f.id} onClick={() => u("submissionFormat", f.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                  <span style={{ fontSize: 28, filter: form.submissionFormat === f.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{f.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                  <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{f.desc}</span>
                </FormGlassCard>
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
                <FormInput label="What's the story?" value={form.storyDescription} required onChange={(v) => u("storyDescription", v)} placeholder="Describe what's happening..." inputRef={inputRef} multiline />
                <FormInput label="Why is it newsworthy?" value={form.whyNewsworthy} onChange={(v) => u("whyNewsworthy", v)} placeholder="Impact on community, timeliness, cultural significance..." multiline />
                <FormInput label="Who's involved?" value={form.interviewNames} onChange={(v) => u("interviewNames", v)} placeholder="Key people, contact info for interviews" multiline />
                <FormInput label="When is this happening?" value={form.whenHappening} onChange={(v) => u("whenHappening", v)} placeholder="Date, timeframe, or if it's time-sensitive" />
                <FormInput label="Additional Notes" value={form.additionalNotes} onChange={(v) => u("additionalNotes", v)} placeholder="Anything else" multiline />
              </>) : (<>
                <div style={{ display: "flex", gap: 12 }}>
                  <FormInput label="Written By - First" value={form.articleWrittenByFirst} onChange={(v) => u("articleWrittenByFirst", v)} placeholder="First" inputRef={inputRef} />
                  <FormInput label="Last" value={form.articleWrittenByLast} onChange={(v) => u("articleWrittenByLast", v)} placeholder="Last" />
                </div>
                <FormInput label="Title / Tribal Status" value={form.titleStatus} onChange={(v) => u("titleStatus", v)} placeholder="e.g. Communications Specialist, Tribal Elder" />
                <FormInput label="Title of Article" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Article title" />
                <FormInput label="Name of Activity / Event" value={form.activityName} onChange={(v) => u("activityName", v)} placeholder="What the article covers" />
                <div style={{ display: "flex", gap: 12 }}>
                  <FormInput label="Date of Event" value={form.eventDate} type="date" onChange={(v) => u("eventDate", v)} />
                  <FormInput label="Time" value={form.eventTime} type="time" onChange={(v) => u("eventTime", v)} />
                </div>
                <FormInput label="Location" value={form.eventLocation} onChange={(v) => u("eventLocation", v)} placeholder="Where it's happening" />
                <FormInput label="People Willing to be Interviewed" value={form.interviewNames} onChange={(v) => u("interviewNames", v)} placeholder="Names — at least one if possible" multiline />
                <FormInput label="Interview Contact Info" value={form.interviewContact} onChange={(v) => u("interviewContact", v)} placeholder="Phone or email" />
                {(form.submissionFormat === "article" || form.submissionFormat === "both") && (
                  <FormInput label="Article Content" value={form.articleContent} onChange={(v) => u("articleContent", v)} placeholder="Paste your article here, or upload a file on the next step" multiline />
                )}
                <FormInput label="Additional Notes" value={form.additionalNotes} onChange={(v) => u("additionalNotes", v)} placeholder="Anything else we should know" multiline />
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
            <FormGlassCard style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, border: `2px dashed ${C.border}` }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
              <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Drag & drop or click to upload</p>
              <p style={{ fontSize: 11, color: C.textDim }}>Photos, documents, PDFs • Up to 5MB each</p>
              <p style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>You may upload multiple files</p>
            </FormGlassCard>
            {(form.submissionFormat === "photo" || form.submissionFormat === "both") && (<>
              <FormInput label="Names of People in Photos" value={form.photoPeopleNames} onChange={(v) => u("photoPeopleNames", v)} placeholder="List all people shown" multiline />
              <FormInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
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
            <FormInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && validateEmail(form.email) && goTo(reviewStep)} />
            <FormInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(reviewStep)} />
            <div style={AR.navRow}>
              <button onClick={() => goTo(photoStep)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(reviewStep)} disabled={!validateEmail(form.email)} style={AR.btn}>Review →</button>
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
              <FormGlassCard style={{ marginBottom: 16 }}>
                {items.map(([k, v], i) => (
                  <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 14, color: k === "Routes To" ? C.turquoiseLight : C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                  </div>
                ))}
              </FormGlassCard>
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
