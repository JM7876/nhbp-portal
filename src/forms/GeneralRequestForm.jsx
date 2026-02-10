import { useState, useEffect, useRef } from "react";
import { NHBP, C, FORM_DEPTS } from "../constants";
import { useDraftForm, generateTicket, createTrelloCard, trelloHeader, SubmissionStore } from "../utils";

export default function GeneralRequestForm({ onBackToPortal }) {

  const REQUEST_AREAS = [
    { id: "design", icon: "\u{1F3A8}", label: "Design Related", desc: "Something design-adjacent" },
    { id: "content", icon: "\u270D\uFE0F", label: "Content / Writing", desc: "Copy editing, proofreading, content help" },
    { id: "tech", icon: "\u{1F4BB}", label: "Tech / Digital", desc: "Website updates, digital tools" },
    { id: "print", icon: "\u{1F5A8}\uFE0F", label: "Print / Production", desc: "Printing, signage, physical materials" },
    { id: "question", icon: "\u2753", label: "Question", desc: "Not sure where to go" },
    { id: "other", icon: "\u{1F4A1}", label: "Something Else", desc: "None of the above" },
  ];

  const PRIORITY_LEVELS = [
    { id: "low", icon: "\u{1F7E2}", label: "Low", desc: "When you get to it" },
    { id: "medium", icon: "\u{1F7E1}", label: "Medium", desc: "Within a week or two" },
    { id: "high", icon: "\u{1F7E0}", label: "High", desc: "Needed soon \u2014 this week" },
    { id: "urgent", icon: "\u{1F534}", label: "Urgent", desc: "Needed ASAP" },
  ];

  // ── Local sub-components ──
  const GrGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const GrInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, multiline }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      {multiline ? (
        <textarea ref={ref} value={value} rows={4} placeholder={placeholder}
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

  const GrDeptSelect = ({ value, onChange }) => (
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

  const GrBadge = ({ name, color }) => (
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

  const [form, setForm, clearDraft] = useDraftForm("general-request", {
    firstName: "", lastName: "", email: "", phone: "",
    department: "", area: null, priority: null,
    subject: "", description: "", deadline: "", notes: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-GR");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDCA1 ${form.subject || "General Request"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Department: ${form.department || "N/A"}`, "",
        "\uD83D\uDCA1 GENERAL REQUEST", `Area: ${form.area || "N/A"}`, `Priority: ${form.priority || "N/A"}`,
        `Subject: ${form.subject || "N/A"}`, `Description: ${form.description || "N/A"}`,
        `Deadline: ${form.deadline || "N/A"}`, form.notes ? `Notes: ${form.notes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "General Request", serviceId: "other",
      requesterName: name, email: form.email,
      phone: form.phone, department: form.department, area: form.area,
      priority: form.priority, subject: form.subject, description: form.description,
      deadline: form.deadline, notes: form.notes,
    });
    clearDraft();
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Info", "Category", "Details", "Priority", "Review"];
  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;

  // ── Local styles ──
  const GR = {
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
    const areaObj = REQUEST_AREAS.find(a => a.id === form.area);
    return (
      <div style={GR.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={GR.bgOrb1} /><div style={GR.bgOrb2} />
        <div style={GR.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>{"\u{1F422}"}</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>Your request has been received and routed<br />to Communications for review.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            {form.area === "design" && <GrBadge name="\u{1F3A8} Design" color="#00c2e0" />}
            {form.area === "content" && <GrBadge name="\u270D\uFE0F Content" color="#51e898" />}
            {form.area === "tech" && <GrBadge name="\u{1F4BB} Tech" color="#c377e0" />}
            {form.area === "print" && <GrBadge name="\u{1F5A8}\uFE0F Print" color="#0079bf" />}
            {form.area === "question" && <GrBadge name="\u2753 Question" color="#f2d600" />}
            {form.priority === "low" && <GrBadge name="\u{1F7E2} Low" color="#61bd4f" />}
            {form.priority === "medium" && <GrBadge name="\u{1F7E1} Medium" color="#f2d600" />}
            {form.priority === "high" && <GrBadge name="\u{1F7E0} High" color="#ff9f1a" />}
            {form.priority === "urgent" && <GrBadge name="\u{1F534} Urgent" color="#eb5a46" />}
          </div>
          <GrGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[["Ticket", ticketNumber, true], ["Category", `${areaObj?.icon} ${areaObj?.label}`], ["Subject", form.subject], ["By", `${form.firstName} ${form.lastName}`], ["Submitted", submissionDate]].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </GrGlassCard>
          <button onClick={() => { setSubmitted(false); setStep(0); }} style={{ ...GR.btn, marginTop: 20 }}>Submit Another Request</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={GR.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>{"\u{1F4A1}"}</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>General Request</h1>
          <p style={{ fontSize: 17, color: C.turquoiseLight, marginBottom: 4, fontWeight: 500 }}>Something Else in Mind?</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            Don't see what you need in our other services?<br />No problem — tell us what you're looking for and<br />we'll figure out how to help.
          </p>
          <button onClick={() => goTo(1)} style={GR.btn}>Get Started →</button>
        </div>
      );

      case 1: return (
        <div style={GR.stepWrap}>
          <h2 style={GR.stepTitle}>Who's requesting?</h2>
          <p style={GR.stepDesc}>Let us know who you are so we can follow up.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <GrInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <GrInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <GrDeptSelect value={form.department} onChange={(v) => u("department", v)} />
          <div style={{ display: "flex", gap: 12 }}>
            <GrInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
            <GrInput label="Phone" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" />
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(0)} style={GR.btnBack}>{"\u2190"} Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.department || !form.email.includes("@")} style={GR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={GR.stepWrap}>
          <h2 style={GR.stepTitle}>What area does this fall under?</h2>
          <p style={GR.stepDesc}>Your best guess helps us route it faster.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {REQUEST_AREAS.map(a => (
              <GrGlassCard key={a.id} active={form.area === a.id} onClick={() => u("area", a.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.area === a.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{a.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{a.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{a.desc}</span>
              </GrGlassCard>
            ))}
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(1)} style={GR.btnBack}>{"\u2190"} Back</button>
            <button onClick={() => goTo(3)} disabled={!form.area} style={GR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={GR.stepWrap}>
          <h2 style={GR.stepTitle}>Tell us what you need</h2>
          <p style={GR.stepDesc}>The more detail, the faster we can help.</p>
          <GrInput label="Subject / Title" value={form.subject} required onChange={(v) => u("subject", v)} placeholder="Brief summary of your request" inputRef={inputRef} />
          <GrInput label="Description" value={form.description} required onChange={(v) => u("description", v)} placeholder="Describe what you need, any context, background info..." multiline />
          <GrInput label="Deadline (if any)" value={form.deadline} type="date" onChange={(v) => u("deadline", v)} />
          <GrInput label="Anything else?" value={form.notes} onChange={(v) => u("notes", v)} placeholder="Links, references, file names..." multiline />
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            {"\u{1F4C1}"} Need to attach files? Email them to <span style={{ color: C.turquoiseLight }}>communications@nhbp-nsn.gov</span> and reference your ticket number after submitting.
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(2)} style={GR.btnBack}>{"\u2190"} Back</button>
            <button onClick={() => goTo(4)} disabled={!form.subject || !form.description} style={GR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={GR.stepWrap}>
          <h2 style={GR.stepTitle}>How urgent is this?</h2>
          <p style={GR.stepDesc}>Helps us prioritize your request.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {PRIORITY_LEVELS.map(p => (
              <GrGlassCard key={p.id} active={form.priority === p.id} onClick={() => u("priority", p.id)}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{p.desc}</div>
                </div>
              </GrGlassCard>
            ))}
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(3)} style={GR.btnBack}>{"\u2190"} Back</button>
            <button onClick={() => goTo(5)} disabled={!form.priority} style={GR.btn}>Review →</button>
          </div>
        </div>
      );

      case 5: {
        const areaObj = REQUEST_AREAS.find(a => a.id === form.area);
        const prioObj = PRIORITY_LEVELS.find(p => p.id === form.priority);
        const items = [
          ["Requester", `${form.firstName} ${form.lastName}`], ["Department", form.department],
          ["Category", `${areaObj?.icon} ${areaObj?.label}`], ["Priority", `${prioObj?.icon} ${prioObj?.label}`],
          ["Subject", form.subject], ["Description", form.description],
          form.deadline ? ["Deadline", form.deadline] : null, form.notes ? ["Notes", form.notes] : null,
          ["Contact", `${form.email}${form.phone ? ` \u2022 ${form.phone}` : ""}`],
          ["Submitted", new Date().toLocaleString()],
        ].filter(Boolean);
        return (
          <div style={GR.stepWrap}>
            <h2 style={GR.stepTitle}>Review Your Request</h2>
            <p style={GR.stepDesc}>Make sure everything looks good.</p>
            <GrGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </GrGlassCard>
            <div style={GR.navRow}>
              <button onClick={() => goTo(4)} style={GR.btnBack}>{"\u2190"} Back</button>
              <button onClick={handleSubmit} style={{ ...GR.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>{"\u{1F422}"} Submit Request</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={GR.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={GR.bgOrb1} /><div style={GR.bgOrb2} /><div style={GR.bgOrb3} />
      {step > 0 && (
        <div style={GR.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: C.turquoise }}>{Math.round(progress)}%</span>
          </div>
          <div style={GR.progressTrack}><div style={{ ...GR.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...GR.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}
