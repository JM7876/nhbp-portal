import { useState, useEffect, useRef } from "react";
import { NHBP, C, FORM_DEPTS } from "../constants";
import { useDraftForm, generateTicket, createTrelloCard, trelloHeader, SubmissionStore } from "../utils";
import { GlassCard } from "../components/GlassCard";

function EmployeeHeadshotsForm({ onBackToPortal }) {
  const BOOKINGS_URL = "https://outlook.office.com/book/Headshots@nhbp-nsn.gov";

  const HEADSHOT_TYPES = [
    { id: "new", icon: "📸", label: "New Headshot", desc: "First time or brand new photo" },
    { id: "update", icon: "🔄", label: "Update / Retake", desc: "Replace an existing headshot" },
    { id: "group", icon: "👥", label: "Group / Team Shot", desc: "Multiple employees together" },
  ];

  const LOCATIONS = [
    { id: "studio", icon: "🏢", label: "Studio (Indoor)", desc: "Professional backdrop setup" },
    { id: "outdoor", icon: "🌳", label: "Outdoor", desc: "Natural light, outdoor setting" },
    { id: "either", icon: "✨", label: "Either / No Preference", desc: "Photographer's choice" },
  ];

  // ── Local sub-components ──
  const HsGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const HsInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKeyDown}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
        onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
        onBlur={(e) => e.target.style.borderColor = C.border}
      />
    </div>
  );

  const HsDeptSelect = ({ value, onChange }) => (
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

  const HsBadge = ({ name, color }) => (
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

  const [form, setForm, clearDraft] = useDraftForm("studio-hub", {
    firstName: "", lastName: "", email: "", phone: "",
    department: "", title: "",
    headshotType: null, locationPref: null,
    groupNames: "", notes: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);

  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-HS");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDCF7 Headshot \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`,
        `Department: ${form.department || "N/A"}`, `Title: ${form.title || "N/A"}`, "",
        "\uD83D\uDCF7 HEADSHOT REQUEST", `Type: ${form.headshotType || "N/A"}`, `Location Pref: ${form.locationPref || "N/A"}`,
        form.groupNames ? `Group Names: ${form.groupNames}` : "", form.notes ? `Notes: ${form.notes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "The Studio Hub", serviceId: "studio",
      requesterName: name, email: form.email,
      phone: form.phone, department: form.department, title: form.title,
      headshotType: form.headshotType, locationPref: form.locationPref,
      groupNames: form.groupNames, notes: form.notes,
    });
    clearDraft();
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Info", "Type", "Setting", "Notes", "Review & Book"];
  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;

  // ── Local styles ──
  const HS = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
    bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.turquoise}08, transparent 70%)`, pointerEvents: "none" },
    bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
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
    return (
      <div style={HS.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={HS.bgOrb1} /><div style={HS.bgOrb2} />
        <div style={HS.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>📸</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>You're All Set!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your headshot request has been submitted.<br />Now pick a time that works for you.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            <HsBadge name="Headshots" color="#cd8de5" />
            {form.headshotType === "new" && <HsBadge name="🆕 New Hire" color="#61bd4f" />}
            {form.headshotType === "update" && <HsBadge name="🔁 Replacement" color="#ff9f1a" />}
            {form.headshotType === "group" && <HsBadge name="👥 Group" color="#0079bf" />}
            {form.locationPref && form.locationPref !== "studio" && <HsBadge name="📍 Special Location" color="#00c2e0" />}
          </div>
          <HsGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Type", HEADSHOT_TYPES.find(t => t.id === form.headshotType)?.label],
              ["Setting", LOCATIONS.find(l => l.id === form.locationPref)?.label],
              ["Employee", `${form.firstName} ${form.lastName}`],
              ["Department", form.department],
              ["Submitted", submissionDate],
            ].filter(([,v]) => v).map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit" }}>{v}</span>
              </div>
            ))}
          </HsGlassCard>
          <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block", padding: "16px 36px", marginBottom: 20,
              background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})`,
              color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700,
              textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 8px 32px ${C.turquoiseGlow}`, transition: "transform 0.2s",
            }}>
            📅 Schedule Your Session
          </a>
          <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>
            Sessions available Mon & Wed, 9 AM – 1 PM.<br />30 minutes per session.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(0); }} style={{ ...HS.btn, marginTop: 24, background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, boxShadow: "none" }}>Submit Another Request</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={HS.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>📸</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Employee Headshots</h1>
          <p style={{ fontSize: 17, color: C.turquoiseLight, marginBottom: 4, fontWeight: 500 }}>Professional Photo Session</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 8px" }}>
            Get a professional headshot for your employee profile,<br />business card, and tribal communications.
          </p>
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, maxWidth: 360, margin: "16px auto 32px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.border}` }}>
            📅 Sessions: Mon & Wed, 9 AM – 1 PM • 30 min each
          </div>
          <button onClick={() => goTo(1)} style={HS.btn}>Get Started →</button>
        </div>
      );

      case 1: return (
        <div style={HS.stepWrap}>
          <h2 style={HS.stepTitle}>Your Information</h2>
          <p style={HS.stepDesc}>Tell us who needs the headshot.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <HsInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <HsInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <HsDeptSelect value={form.department} onChange={(v) => u("department", v)} />
          <HsInput label="Title / Position" value={form.title} onChange={(v) => u("title", v)} placeholder="Your job title" />
          <HsInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
          <div style={HS.navRow}>
            <button onClick={() => goTo(0)} style={HS.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.department || !form.email.includes("@")} style={HS.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={HS.stepWrap}>
          <h2 style={HS.stepTitle}>What type of session?</h2>
          <p style={HS.stepDesc}>Help us prepare the right setup for you.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {HEADSHOT_TYPES.map(t => (
              <HsGlassCard key={t.id} active={form.headshotType === t.id} onClick={() => u("headshotType", t.id)}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{t.desc}</div>
                </div>
              </HsGlassCard>
            ))}
          </div>
          {form.headshotType === "group" && (
            <HsInput label="Who's in the group?" value={form.groupNames} onChange={(v) => u("groupNames", v)} placeholder="List names of all employees" />
          )}
          <div style={HS.navRow}>
            <button onClick={() => goTo(1)} style={HS.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={!form.headshotType} style={HS.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={HS.stepWrap}>
          <h2 style={HS.stepTitle}>Preferred setting?</h2>
          <p style={HS.stepDesc}>Indoor studio or outdoor natural light — your call.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {LOCATIONS.map(l => (
              <HsGlassCard key={l.id} active={form.locationPref === l.id} onClick={() => u("locationPref", l.id)}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{l.desc}</div>
                </div>
              </HsGlassCard>
            ))}
          </div>
          <div style={HS.navRow}>
            <button onClick={() => goTo(2)} style={HS.btnBack}>← Back</button>
            <button onClick={() => goTo(4)} disabled={!form.locationPref} style={HS.btn}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={HS.stepWrap}>
          <h2 style={HS.stepTitle}>Anything else?</h2>
          <p style={HS.stepDesc}>Special requests, wardrobe questions, or notes for the photographer.</p>
          <div style={{ marginBottom: 20 }}>
            <textarea value={form.notes} onChange={(e) => u("notes", e.target.value)}
              placeholder="e.g. I'd like to match my colleague's background, I have glasses and want to avoid glare, etc."
              rows={4}
              style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={HS.navRow}>
            <button onClick={() => goTo(3)} style={HS.btnBack}>← Back</button>
            <button onClick={() => goTo(5)} style={HS.btn}>{form.notes ? "Review →" : "Skip to Review →"}</button>
          </div>
        </div>
      );

      case 5: {
        const items = [
          ["Employee", `${form.firstName} ${form.lastName}`],
          ["Department", form.department],
          form.title ? ["Title", form.title] : null,
          ["Type", `${HEADSHOT_TYPES.find(t => t.id === form.headshotType)?.icon} ${HEADSHOT_TYPES.find(t => t.id === form.headshotType)?.label}`],
          ["Setting", `${LOCATIONS.find(l => l.id === form.locationPref)?.icon} ${LOCATIONS.find(l => l.id === form.locationPref)?.label}`],
          form.groupNames ? ["Group", form.groupNames] : null,
          ["Contact", form.email],
          form.notes ? ["Notes", form.notes] : null,
          ["Date Submitted", new Date().toLocaleString()],
        ].filter(Boolean);

        return (
          <div style={HS.stepWrap}>
            <h2 style={HS.stepTitle}>Review & Book</h2>
            <p style={HS.stepDesc}>Confirm your details, then schedule your session.</p>
            <HsGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </HsGlassCard>
            <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, marginBottom: 24, textAlign: "center" }}>
              After submitting, you'll be directed to our scheduling page<br />to pick a day and time that works for you.
            </p>
            <div style={HS.navRow}>
              <button onClick={() => goTo(4)} style={HS.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...HS.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>📸 Submit & Schedule →</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={HS.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={HS.bgOrb1} /><div style={HS.bgOrb2} />
      {step > 0 && (
        <div style={HS.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: C.turquoise }}>{Math.round(progress)}%</span>
          </div>
          <div style={HS.progressTrack}><div style={{ ...HS.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...HS.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

export default EmployeeHeadshotsForm;
