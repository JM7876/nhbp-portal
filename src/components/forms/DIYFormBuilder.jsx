import React, { useState, useEffect, useRef } from "react";
import { NHBP, FC } from "../../theme";
import FormGlassCard from "../shared/FormGlassCard";
import FormInput from "../shared/FormInput";
import { FormDeptSelect } from "../shared/FormSelect";
import FormBadge from "../shared/FormBadge";
import { BottomFormNav } from "../shared/BottomNav";
import RestorePrompt from "../shared/RestorePrompt";
import PortalBackground from "../shared/PortalBackground";
import { useAutoSave } from "../../utils/autoSave";

function DIYFormBuilder({ onReturnToServices }) {
  const C = FC;

  const DIY_DEPTS = [
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

  const PLATFORM_OPTIONS = [
    { id: "facebook", icon: "📘", label: "Facebook", desc: "Post to the NHBP Facebook page" },
    { id: "instagram", icon: "📸", label: "Instagram", desc: "Post to the NHBP Instagram" },
    { id: "both", icon: "📱", label: "Both", desc: "Post to Facebook and Instagram" },
  ];

  // ── State ──
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    department: "", platform: null,
    caption: "", altText: "", hashtags: "", notes: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const autoSave = useAutoSave("nhbp-form-diy-builder", form, step, setForm, setStep);
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = () => {
    setTicketNumber(`NHBP-DIY-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    autoSave.clear();
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Info", "Platform", "Build Post", "Review"];
  const progress = step > 0 ? Math.min((step / 4) * 100, 100) : 0;
  const accentColor = C.maroonLight;

  // ── Navigation ──
  const navBack = () => { if (step > 0) goTo(step - 1); };
  const navNext = () => { if (step === 4) handleSubmit(); else goTo(step + 1); };

  const canAdvance = () => {
    switch (step) {
      case 0: return true;
      case 1: return !!(form.firstName && form.lastName && form.department);
      case 2: return !!form.platform;
      case 3: return !!form.caption;
      case 4: return true;
      default: return true;
    }
  };

  const nextLabel =
    step === 3 ? "Review →" :
    step === 4 ? "✏️ Submit" :
    undefined;

  // ── Styles ──
  const containerStyle = { minHeight: "100vh", color: "var(--text-primary)", fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" };
  const D = {
    progressWrap: { position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` },
    progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
    progressBar: { height: "100%", background: `linear-gradient(90deg, ${C.maroonLight}, ${C.turquoise})`, borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 0 12px rgba(138, 58, 77, 0.3)" },
    stepWrap: { textAlign: "left" },
    stepTitle: { fontSize: 24, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "var(--font-primary)" },
    stepDesc: { fontSize: 14, color: C.textSecondary, marginBottom: 28, lineHeight: 1.6 },
    successWrap: { textAlign: "center", maxWidth: 440 },
  };

  // ── SUBMITTED ──
  if (submitted) {
    const platformObj = PLATFORM_OPTIONS.find(p => p.id === form.platform);
    return (
      <div style={containerStyle}>
        <PortalBackground />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", zIndex: 1 }}>
          <div style={D.successWrap}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>✏️</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "var(--font-primary)" }}>Draft Submitted</h2>
            <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
              Your post draft has been sent to Communications<br />for review. We'll polish it up and publish!
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
              <FormBadge name={`${platformObj?.icon} ${platformObj?.label}`} color={C.maroonLight} />
            </div>
            <FormGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
              {[
                ["Ticket", ticketNumber, true],
                ["Platform", `${platformObj?.icon} ${platformObj?.label}`],
                ["By", `${form.firstName} ${form.lastName}`],
                ["Submitted", submissionDate],
              ].filter(([,v]) => v).map(([k, v, accent], i, arr) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < arr.length - 1 ? 10 : 0 }}>
                  <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                  <span style={{ fontSize: 13, color: accent ? accentColor : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: "var(--font-primary)", textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </FormGlassCard>
            <button onClick={() => { setSubmitted(false); setStep(0); }} style={{
              padding: "13px 28px", background: C.maroonLight, color: "#fff", border: "none", borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-primary)",
              transition: "all 0.2s", boxShadow: "0 4px 16px rgba(138, 58, 77, 0.3)", marginTop: 20,
            }}>Submit Another Draft</button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={D.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>✏️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "var(--font-primary)" }}>DIY Post Builder</h1>
          <p style={{ fontSize: 17, color: C.maroonLight, marginBottom: 4, fontWeight: 500 }}>Draft Your Own Post</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            Have a post idea? Write it up here and we'll<br />review, polish, and publish it for you.
          </p>
        </div>
      );

      case 1: return (
        <div style={D.stepWrap}>
          <h2 style={D.stepTitle}>Who's requesting?</h2>
          <p style={D.stepDesc}>Let us know who you are so we can follow up.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <FormInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <FormInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <FormDeptSelect options={DIY_DEPTS} value={form.department} onChange={(v) => u("department", v)} />
          <FormInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
        </div>
      );

      case 2: return (
        <div style={D.stepWrap}>
          <h2 style={D.stepTitle}>Where should this be posted?</h2>
          <p style={D.stepDesc}>Choose the platform for your post.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {PLATFORM_OPTIONS.map(p => (
              <FormGlassCard key={p.id} active={form.platform === p.id} onClick={() => u("platform", p.id)}
                glowColor={C.maroonLight}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28, filter: form.platform === p.id ? `drop-shadow(0 0 8px rgba(138, 58, 77, 0.4))` : "none" }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: form.platform === p.id ? C.maroonLight : C.textPrimary }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{p.desc}</div>
                </div>
              </FormGlassCard>
            ))}
          </div>
        </div>
      );

      case 3: return (
        <div style={D.stepWrap}>
          <h2 style={D.stepTitle}>Build Your Post</h2>
          <p style={D.stepDesc}>Write your draft — we'll review and polish before publishing.</p>
          <FormInput label="Caption / Post Text" value={form.caption} required onChange={(v) => u("caption", v)} placeholder="Write your post here... Include any details, links, or calls to action." multiline inputRef={inputRef} />
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, padding: "12px 16px", background: C.glass, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            📁 Want to include an image? Email it to <span style={{ color: C.maroonLight }}>communications@nhbp-nsn.gov</span> and reference your ticket number after submitting.
          </div>
          <FormInput label="Alt Text (for accessibility)" value={form.altText} onChange={(v) => u("altText", v)} placeholder="Describe the image for screen readers..." />
          <FormInput label="Hashtags" value={form.hashtags} onChange={(v) => u("hashtags", v)} placeholder="#NHBP #NottawaseppiHuronBandPotawatomi" />
          <FormInput label="Additional Notes" value={form.notes} onChange={(v) => u("notes", v)} placeholder="Any special instructions, timing preferences..." multiline />
        </div>
      );

      case 4: {
        const platformObj = PLATFORM_OPTIONS.find(p => p.id === form.platform);
        const items = [
          ["Requester", `${form.firstName} ${form.lastName} — ${form.department}`],
          ["Platform", `${platformObj?.icon} ${platformObj?.label}`],
          ["Caption", form.caption],
          form.altText ? ["Alt Text", form.altText] : null,
          form.hashtags ? ["Hashtags", form.hashtags] : null,
          form.notes ? ["Notes", form.notes] : null,
          ["Contact", form.email],
          ["Submitted", new Date().toLocaleString()],
        ].filter(Boolean);

        return (
          <div style={D.stepWrap}>
            <h2 style={D.stepTitle}>Review Your Draft</h2>
            <p style={D.stepDesc}>Make sure everything looks good before submitting.</p>
            <FormGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </FormGlassCard>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={containerStyle}>
      <PortalBackground />
      {autoSave.showRestore && <RestorePrompt onYes={autoSave.restore} onNo={autoSave.dismiss} />}
      {step > 0 && (
        <div style={D.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: accentColor }}>{Math.round(progress)}%</span>
          </div>
          <div style={D.progressTrack}><div style={{ ...D.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 24px 120px", zIndex: 1, position: "relative", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 480, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
          {renderStep()}
        </div>
      </div>
      <BottomFormNav
        onBack={navBack} onNext={navNext} onHome={onReturnToServices}
        canGoBack={step > 0} canGoNext={canAdvance()}
        nextLabel={nextLabel}
        showNext={step > 0}
      />
    </div>
  );
}

export default DIYFormBuilder;
