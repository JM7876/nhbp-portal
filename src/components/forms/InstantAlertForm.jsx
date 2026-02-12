import React, { useState, useEffect, useRef } from "react";
import { FC } from "../../theme";
import FormGlassCard from "../shared/FormGlassCard";
import FormInput from "../shared/FormInput";
import { FormDeptSelect } from "../shared/FormSelect";
import FormBadge from "../shared/FormBadge";
import RestorePrompt from "../shared/RestorePrompt";
import { useAutoSave } from "../../utils/autoSave";
import { validateEmail } from "../../utils/validation";

function InstantAlertForm({ onReturnToServices }) {
  // ── Local constants ──
  const C = FC;

  const IA_DEPTS = [
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

  const URGENCY_LEVELS = [
    { id: "emergency", icon: "🚨", label: "Emergency", desc: "Immediate — safety, closures, critical notices", color: C.red, glow: "rgba(186,12,47,0.3)" },
    { id: "urgent", icon: "⚡", label: "Urgent", desc: "Same day — time-sensitive announcements", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
    { id: "priority", icon: "📢", label: "Priority", desc: "Within 24 hours — important but not critical", color: C.turquoise, glow: C.turquoiseGlow },
  ];

  const CHANNELS = [
    { id: "email", icon: "📧", label: "Email Blast" },
    { id: "website", icon: "🌐", label: "Website Banner" },
    { id: "social", icon: "📱", label: "Social Media" },
    { id: "text", icon: "💬", label: "Text / SMS" },
    { id: "flyer", icon: "📄", label: "Printed Flyer" },
    { id: "all", icon: "🔊", label: "All Channels" },
  ];

  // ── Local sub-components ──
  // ── State ──
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    department: "", urgency: null, channels: {},
    subject: "", message: "",
    audience: "", effectiveDate: "", effectiveTime: "",
    approvedBy: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const toggleChannel = (id) => setForm(p => ({ ...p, channels: { ...p.channels, [id]: !p.channels[id] } }));
  const autoSave = useAutoSave("nhbp-form-instant-alert", form, step, setForm, setStep);

  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);

  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = () => {
    setTicketNumber(`NHBP-IA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    autoSave.clear();
    setSubmitted(true);
  };

  const labels = ["", "Requester", "Urgency", "Alert Message", "Distribution", "Review"];
  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;
  const urgencyObj = URGENCY_LEVELS.find(x => x.id === form.urgency);
  const accentColor = urgencyObj?.color || C.turquoise;

  // ── Local styles ──
  const IA = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
    bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.red}08, transparent 70%)`, pointerEvents: "none" },
    bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
    bgOrb3: { position: "fixed", top: "40%", left: "50%", width: "30vw", height: "30vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.turquoise}04, transparent 70%)`, pointerEvents: "none", transform: "translateX(-50%)" },
    progressWrap: { position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` },
    progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
    progressBar: { height: "100%", borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" },
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
    return (
      <div style={IA.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={IA.bgOrb1} /><div style={IA.bgOrb2} />
        <div style={IA.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>{urgencyObj?.icon || "⚡"}</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Alert Submitted</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your {urgencyObj?.label.toLowerCase()} alert has been routed<br />to Communications for immediate action.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            {form.urgency === "emergency" && <FormBadge name="🚨 Emergency" color="#eb5a46" />}
            {form.urgency === "urgent" && <FormBadge name="⚡ Urgent" color="#ff9f1a" />}
            {form.urgency === "priority" && <FormBadge name="📢 Priority" color="#00c2e0" />}
          </div>
          <FormGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Urgency", `${urgencyObj?.icon} ${urgencyObj?.label}`],
              ["Subject", form.subject],
              ["Channels", Object.entries(form.channels).filter(([,v]) => v).map(([k]) => CHANNELS.find(c => c.id === k)?.icon).join(" ")],
              ["By", `${form.firstName} ${form.lastName}`],
              ["Submitted", submissionDate],
            ].filter(([,v]) => v).map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 5 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? accentColor : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: "var(--font-primary)", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </FormGlassCard>
          <button onClick={() => { setSubmitted(false); setStep(0); }} style={{ ...IA.btn, marginTop: 20 }}>Submit Another Alert</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={IA.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Instant Alert</h1>
          <p style={{ fontSize: 17, color: C.redLight, marginBottom: 4, fontWeight: 500 }}>Urgent Communications</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            Need to get an urgent message out fast?<br />Closures, emergencies, time-sensitive announcements —<br />this is the fast lane.
          </p>
          <button onClick={() => goTo(1)} style={{ ...IA.btn, background: C.red, boxShadow: `0 4px 16px rgba(186,12,47,0.3)` }}>Submit Alert →</button>
        </div>
      );

      case 1: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>Who's requesting?</h2>
          <p style={IA.stepDesc}>We need to know who to follow up with.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <FormInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <FormInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <FormDeptSelect options={IA_DEPTS} value={form.department} onChange={(v) => u("department", v)} />
          <div style={{ display: "flex", gap: 12 }}>
            <FormInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
            <FormInput label="Phone" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" />
          </div>
          <div style={IA.navRow}>
            <button onClick={() => goTo(0)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.department} style={IA.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>How urgent is this?</h2>
          <p style={IA.stepDesc}>This determines how fast we act.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {URGENCY_LEVELS.map(l => (
              <FormGlassCard key={l.id} active={form.urgency === l.id} onClick={() => u("urgency", l.id)}
                glowColor={l.color}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28, filter: form.urgency === l.id ? `drop-shadow(0 0 8px ${l.glow})` : "none" }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: form.urgency === l.id ? l.color : C.textPrimary }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{l.desc}</div>
                </div>
              </FormGlassCard>
            ))}
          </div>
          <div style={IA.navRow}>
            <button onClick={() => goTo(1)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={!form.urgency} style={{ ...IA.btn, background: accentColor }}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>{urgencyObj?.icon} Alert Message</h2>
          <p style={IA.stepDesc}>What do people need to know?</p>
          <FormInput label="Subject Line" value={form.subject} required onChange={(v) => u("subject", v)} placeholder="e.g. Building Closure - Jan 15" inputRef={inputRef} />
          <FormInput label="Full Message" value={form.message} required onChange={(v) => u("message", v)} placeholder="The details people need to know..." multiline />
          <FormInput label="Who is this for?" value={form.audience} onChange={(v) => u("audience", v)} placeholder="All employees, specific department, tribal members, public..." />
          <div style={{ display: "flex", gap: 12 }}>
            <FormInput label="Effective Date" value={form.effectiveDate} type="date" onChange={(v) => u("effectiveDate", v)} />
            <FormInput label="Time" value={form.effectiveTime} type="time" onChange={(v) => u("effectiveTime", v)} />
          </div>
          <FormInput label="Approved By (if applicable)" value={form.approvedBy} onChange={(v) => u("approvedBy", v)} placeholder="Director, Council, Department Head..." />
          <div style={IA.navRow}>
            <button onClick={() => goTo(2)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(4)} disabled={!form.subject || !form.message} style={{ ...IA.btn, background: accentColor }}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>Distribution Channels</h2>
          <p style={IA.stepDesc}>How should this alert go out? Select all that apply.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {CHANNELS.map(c => (
              <FormGlassCard key={c.id} active={form.channels[c.id]} onClick={() => toggleChannel(c.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: form.channels[c.id] ? C.textPrimary : C.textSecondary }}>{c.label}</span>
              </FormGlassCard>
            ))}
          </div>
          <div style={IA.navRow}>
            <button onClick={() => goTo(3)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(5)} disabled={!Object.values(form.channels).some(v => v)} style={{ ...IA.btn, background: accentColor }}>Review →</button>
          </div>
        </div>
      );

      case 5: {
        const selectedChannels = Object.entries(form.channels).filter(([,v]) => v).map(([k]) => CHANNELS.find(c => c.id === k));
        const items = [
          ["Requester", `${form.firstName} ${form.lastName} — ${form.department}`],
          ["Urgency", `${urgencyObj?.icon} ${urgencyObj?.label}`],
          ["Subject", form.subject],
          ["Message", form.message],
          form.audience ? ["Audience", form.audience] : null,
          form.effectiveDate ? ["Effective", `${form.effectiveDate}${form.effectiveTime ? ` at ${form.effectiveTime}` : ""}`] : null,
          ["Channels", selectedChannels.map(c => `${c.icon} ${c.label}`).join(", ")],
          form.approvedBy ? ["Approved By", form.approvedBy] : null,
          ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`],
          ["Submitted", submissionDate || new Date().toLocaleString()],
        ].filter(Boolean);

        return (
          <div style={IA.stepWrap}>
            <h2 style={IA.stepTitle}>Review Alert</h2>
            <p style={IA.stepDesc}>Confirm everything before sending.</p>
            <FormGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: k === "Urgency" ? accentColor : C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </FormGlassCard>
            <div style={IA.navRow}>
              <button onClick={() => goTo(4)} style={IA.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...IA.btn, background: `linear-gradient(135deg, ${accentColor}, ${C.maroon})` }}>⚡ Submit Alert</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={IA.container}>
      {autoSave.showRestore && <RestorePrompt onYes={autoSave.restore} onNo={autoSave.dismiss} />}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={IA.bgOrb1} /><div style={IA.bgOrb2} /><div style={IA.bgOrb3} />
      {step > 0 && (
        <div style={IA.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: accentColor }}>{Math.round(progress)}%</span>
          </div>
          <div style={IA.progressTrack}><div style={{ ...IA.progressBar, width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)` }} /></div>
        </div>
      )}
      <div style={{ ...IA.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease", paddingBottom: 80 }}>
        {renderStep()}
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

export default InstantAlertForm;
