import React, { useState, useEffect, useRef } from "react";
import { FC } from "../../theme";
import FormGlassCard from "../shared/FormGlassCard";
import FormInput from "../shared/FormInput";
import { FormDeptSelect } from "../shared/FormSelect";
import FormBadge from "../shared/FormBadge";
import RestorePrompt from "../shared/RestorePrompt";
import { useAutoSave } from "../../utils/autoSave";
import { validateEmail } from "../../utils/validation";

function GeneralRequestForm({ onReturnToServices }) {
  const C = FC;

  const GR_DEPTS = [
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

  const REQUEST_AREAS = [
    { id: "design", icon: "🎨", label: "Design Related", desc: "Something design-adjacent" },
    { id: "content", icon: "✍️", label: "Content / Writing", desc: "Copy editing, proofreading, content help" },
    { id: "tech", icon: "💻", label: "Tech / Digital", desc: "Website updates, digital tools" },
    { id: "print", icon: "🖨️", label: "Print / Production", desc: "Printing, signage, physical materials" },
    { id: "question", icon: "❓", label: "Question", desc: "Not sure where to go" },
    { id: "other", icon: "💡", label: "Something Else", desc: "None of the above" },
  ];

  const PRIORITY_LEVELS = [
    { id: "low", icon: "🟢", label: "Low", desc: "When you get to it" },
    { id: "medium", icon: "🟡", label: "Medium", desc: "Within a week or two" },
    { id: "high", icon: "🟠", label: "High", desc: "Needed soon — this week" },
    { id: "urgent", icon: "🔴", label: "Urgent", desc: "Needed ASAP" },
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
    department: "", area: null, priority: null,
    subject: "", description: "", deadline: "", notes: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const autoSave = useAutoSave("nhbp-form-general-request", form, step, setForm, setStep);
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = () => {
    setTicketNumber(`NHBP-GR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    autoSave.clear();
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Info", "Category", "Details", "Priority", "Review"];
  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;

  // ── Local styles ──
  const GR = {
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
    const areaObj = REQUEST_AREAS.find(a => a.id === form.area);
    return (
      <div style={GR.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={GR.bgOrb1} /><div style={GR.bgOrb2} />
        <div style={GR.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🐢</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>Your request has been received and routed<br />to Communications for review.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            {form.area === "design" && <FormBadge name="🎨 Design" color="#00c2e0" />}
            {form.area === "content" && <FormBadge name="✍️ Content" color="#51e898" />}
            {form.area === "tech" && <FormBadge name="💻 Tech" color="#c377e0" />}
            {form.area === "print" && <FormBadge name="🖨️ Print" color="#0079bf" />}
            {form.area === "question" && <FormBadge name="❓ Question" color="#f2d600" />}
            {form.priority === "low" && <FormBadge name="🟢 Low" color="#61bd4f" />}
            {form.priority === "medium" && <FormBadge name="🟡 Medium" color="#f2d600" />}
            {form.priority === "high" && <FormBadge name="🟠 High" color="#ff9f1a" />}
            {form.priority === "urgent" && <FormBadge name="🔴 Urgent" color="#eb5a46" />}
          </div>
          <FormGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[["Ticket", ticketNumber, true], ["Category", `${areaObj?.icon} ${areaObj?.label}`], ["Subject", form.subject], ["By", `${form.firstName} ${form.lastName}`], ["Submitted", submissionDate]].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: "var(--font-primary)", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </FormGlassCard>
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
          <div style={{ fontSize: 56, marginBottom: 20 }}>💡</div>
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
            <FormInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <FormInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <FormDeptSelect options={GR_DEPTS} value={form.department} onChange={(v) => u("department", v)} />
          <div style={{ display: "flex", gap: 12 }}>
            <FormInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
            <FormInput label="Phone" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" />
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(0)} style={GR.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.department || !validateEmail(form.email)} style={GR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={GR.stepWrap}>
          <h2 style={GR.stepTitle}>What area does this fall under?</h2>
          <p style={GR.stepDesc}>Your best guess helps us route it faster.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {REQUEST_AREAS.map(a => (
              <FormGlassCard key={a.id} active={form.area === a.id} onClick={() => u("area", a.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.area === a.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{a.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{a.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{a.desc}</span>
              </FormGlassCard>
            ))}
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(1)} style={GR.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={!form.area} style={GR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={GR.stepWrap}>
          <h2 style={GR.stepTitle}>Tell us what you need</h2>
          <p style={GR.stepDesc}>The more detail, the faster we can help.</p>
          <FormInput label="Subject / Title" value={form.subject} required onChange={(v) => u("subject", v)} placeholder="Brief summary of your request" inputRef={inputRef} />
          <FormInput label="Description" value={form.description} required onChange={(v) => u("description", v)} placeholder="Describe what you need, any context, background info..." multiline />
          <FormInput label="Deadline (if any)" value={form.deadline} type="date" onChange={(v) => u("deadline", v)} />
          <FormInput label="Anything else?" value={form.notes} onChange={(v) => u("notes", v)} placeholder="Links, references, file names..." multiline />
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            📁 Need to attach files? Email them to <span style={{ color: C.turquoiseLight }}>communications@nhbp-nsn.gov</span> and reference your ticket number after submitting.
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(2)} style={GR.btnBack}>← Back</button>
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
              <FormGlassCard key={p.id} active={form.priority === p.id} onClick={() => u("priority", p.id)}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{p.desc}</div>
                </div>
              </FormGlassCard>
            ))}
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(3)} style={GR.btnBack}>← Back</button>
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
          ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`],
          ["Submitted", new Date().toLocaleString()],
        ].filter(Boolean);
        return (
          <div style={GR.stepWrap}>
            <h2 style={GR.stepTitle}>Review Your Request</h2>
            <p style={GR.stepDesc}>Make sure everything looks good.</p>
            <FormGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </FormGlassCard>
            <div style={GR.navRow}>
              <button onClick={() => goTo(4)} style={GR.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...GR.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>🐢 Submit Request</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={GR.container}>
      {autoSave.showRestore && <RestorePrompt onYes={autoSave.restore} onNo={autoSave.dismiss} />}
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
      <div style={{ ...GR.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease", paddingBottom: 80 }}>
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

export default GeneralRequestForm;
