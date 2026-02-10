import { useState, useRef, useEffect } from "react";
import { NHBP, FORM_DEPTS, C } from "../constants";
import { useDraftForm, generateTicket, createTrelloCard, trelloHeader, SubmissionStore } from "../utils";

export default function InstantAlertForm({ onBackToPortal }) {
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
  const IaCard = ({ children, active, onClick, style: s = {}, glowColor }) => {
    const [h, setH] = useState(false);
    const gc = glowColor || C.turquoiseGlow;
    return (
      <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          background: active ? `linear-gradient(135deg, ${glowColor || C.turquoise}18, ${glowColor || C.turquoise}08)` : h ? "rgba(255,255,255,0.04)" : C.glass,
          border: `1px solid ${active ? (glowColor || C.turquoise) + "50" : h ? "rgba(255,255,255,0.12)" : C.border}`,
          borderRadius: 14, padding: "16px 20px", cursor: onClick ? "pointer" : "default",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: active ? `0 8px 32px ${gc}, inset 0 1px 0 rgba(255,255,255,0.06)` : h ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
          transform: h && onClick ? "translateY(-1px)" : "translateY(0)",
          position: "relative", overflow: "hidden", ...s,
        }}>
        {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${glowColor || C.turquoise}60, transparent)` }} />}
        {children}
      </div>
    );
  };

  const IaInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      {multiline ? (
        <textarea ref={ref} value={value} rows={4} placeholder={placeholder} onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
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

  const IaDeptSelect = ({ value, onChange }) => (
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

  const IaBadge = ({ name, color }) => (
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

  const [form, setForm, clearDraft] = useDraftForm("instant-alert", {
    firstName: "", lastName: "", email: "", phone: "",
    department: "", urgency: null, channels: {},
    subject: "", message: "",
    audience: "", effectiveDate: "", effectiveTime: "",
    approvedBy: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const toggleChannel = (id) => setForm(p => ({ ...p, channels: { ...p.channels, [id]: !p.channels[id] } }));

  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);

  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-IA");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    const chList = Object.entries(form.channels).filter(([,v]) => v).map(([k]) => k).join(", ");
    await createTrelloCard(
      `\u26A1 ALERT: ${form.subject || "Instant Alert"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Department: ${form.department || "N/A"}`, "",
        "\u26A1 INSTANT ALERT", `Urgency: ${form.urgency || "N/A"}`, `Subject: ${form.subject || "N/A"}`,
        `Message: ${form.message || "N/A"}`, `Channels: ${chList || "N/A"}`, `Audience: ${form.audience || "N/A"}`,
        `Effective Date: ${form.effectiveDate || "N/A"}`, `Effective Time: ${form.effectiveTime || "N/A"}`,
        `Approved By: ${form.approvedBy || "N/A"}`,
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Instant Alert", serviceId: "instant-alert",
      requesterName: name, email: form.email,
      phone: form.phone, department: form.department, urgency: form.urgency,
      channels: form.channels, subject: form.subject, message: form.message,
      audience: form.audience, effectiveDate: form.effectiveDate,
      effectiveTime: form.effectiveTime, approvedBy: form.approvedBy,
    });
    clearDraft();
    setSubmitted(true);
  };

  const labels = ["", "Requester", "Urgency", "Alert Message", "Distribution", "Review"];
  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;
  const urgencyObj = URGENCY_LEVELS.find(x => x.id === form.urgency);
  const accentColor = urgencyObj?.color || C.turquoise;

  // ── Local styles ──
  const IA = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
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
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
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
            {form.urgency === "emergency" && <IaBadge name="🚨 Emergency" color="#eb5a46" />}
            {form.urgency === "urgent" && <IaBadge name="⚡ Urgent" color="#ff9f1a" />}
            {form.urgency === "priority" && <IaBadge name="📢 Priority" color="#00c2e0" />}
          </div>
          <IaCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
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
                <span style={{ fontSize: 13, color: accent ? accentColor : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </IaCard>
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
            <IaInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <IaInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <IaDeptSelect value={form.department} onChange={(v) => u("department", v)} />
          <div style={{ display: "flex", gap: 12 }}>
            <IaInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
            <IaInput label="Phone" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" />
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
              <IaCard key={l.id} active={form.urgency === l.id} onClick={() => u("urgency", l.id)}
                glowColor={l.color}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28, filter: form.urgency === l.id ? `drop-shadow(0 0 8px ${l.glow})` : "none" }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: form.urgency === l.id ? l.color : C.textPrimary }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{l.desc}</div>
                </div>
              </IaCard>
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
          <IaInput label="Subject Line" value={form.subject} required onChange={(v) => u("subject", v)} placeholder="e.g. Building Closure - Jan 15" inputRef={inputRef} />
          <IaInput label="Full Message" value={form.message} required onChange={(v) => u("message", v)} placeholder="The details people need to know..." multiline />
          <IaInput label="Who is this for?" value={form.audience} onChange={(v) => u("audience", v)} placeholder="All employees, specific department, tribal members, public..." />
          <div style={{ display: "flex", gap: 12 }}>
            <IaInput label="Effective Date" value={form.effectiveDate} type="date" onChange={(v) => u("effectiveDate", v)} />
            <IaInput label="Time" value={form.effectiveTime} type="time" onChange={(v) => u("effectiveTime", v)} />
          </div>
          <IaInput label="Approved By (if applicable)" value={form.approvedBy} onChange={(v) => u("approvedBy", v)} placeholder="Director, Council, Department Head..." />
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
              <IaCard key={c.id} active={form.channels[c.id]} onClick={() => toggleChannel(c.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: form.channels[c.id] ? C.textPrimary : C.textSecondary }}>{c.label}</span>
              </IaCard>
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
            <IaCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: k === "Urgency" ? accentColor : C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </IaCard>
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
      <div style={{ ...IA.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}
