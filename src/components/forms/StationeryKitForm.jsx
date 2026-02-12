import React, { useState, useEffect, useRef, useCallback } from "react";
import { NHBP, FC } from "../../theme";
import { DEPARTMENTS } from "../../constants/departments";
import { NHBP_LOGO, TURTLE_LOGO, COURT_LOGO, STATIONERY_ITEMS, PDF_TEMPLATES, PDF_FIELD_MAP } from "../../constants/stationery";
import { ENTERPRISES, OFFICE_LOCATIONS } from "../../constants/locations";
import { ORDER_REASONS } from "../../constants/priorities";
import GlassCard from "../shared/GlassCard";
import FormGlassCard from "../shared/FormGlassCard";
import FormInput from "../shared/FormInput";
import { FormDeptSelect, FormSelect } from "../shared/FormSelect";
import { BottomFormNav } from "../shared/BottomNav";
import SubmitOverlay from "../shared/SubmitOverlay";
import RestorePrompt from "../shared/RestorePrompt";
import PortalBackground from "../shared/PortalBackground";
import { useAutoSave } from "../../utils/autoSave";
import { validateEmail, ValidationMsg } from "../../utils/validation";

// ─── PDF-LIB LOADER ───
const loadPdfLib = (() => {
  let cached = null;
  return () => {
    if (cached) return cached;
    cached = new Promise((resolve, reject) => {
      if (window.PDFLib) { resolve(window.PDFLib); return; }
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
      s.onload = () => resolve(window.PDFLib);
      s.onerror = () => { cached = null; reject(new Error("Failed to load pdf-lib")); };
      document.head.appendChild(s);
    });
    return cached;
  };
})();

// ─── FILL PDF UTILITY ───
const fillBusinessCardPdf = async (enterprise, formData, location) => {
  const PDFLib = await loadPdfLib();
  const templateB64 = PDF_TEMPLATES[enterprise];
  if (!templateB64) return null;
  const pdfBytes = Uint8Array.from(atob(templateB64), c => c.charCodeAt(0));
  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
  const pdfForm = pdfDoc.getForm();
  const mapping = PDF_FIELD_MAP[enterprise];
  if (!mapping) return null;

  // Fill front fields
  if (mapping.front) {
    Object.entries(mapping.front).forEach(([fieldName, valueFn]) => {
      try {
        const field = pdfForm.getTextField(fieldName);
        const val = valueFn(formData, location);
        if (val) field.setText(val);
      } catch (e) { /* field may not exist */ }
    });
  }

  // Fill back fields
  if (mapping.back) {
    Object.entries(mapping.back).forEach(([fieldName, valueFn]) => {
      try {
        const field = pdfForm.getTextField(fieldName);
        const val = valueFn(formData, location);
        if (val) field.setText(val);
      } catch (e) { /* field may not exist */ }
    });
  }

  pdfForm.flatten();
  return await pdfDoc.save();
};

const fillNamePlatePdf = async (formData) => {
  const PDFLib = await loadPdfLib();
  const templateB64 = PDF_TEMPLATES["name-plate"];
  const pdfBytes = Uint8Array.from(atob(templateB64), c => c.charCodeAt(0));
  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
  const pdfForm = pdfDoc.getForm();
  try { pdfForm.getTextField("First Last").setText(`${formData.firstName} ${formData.lastName}`); } catch(e) {}
  try { pdfForm.getTextField("Job Title").setText(formData.title || ""); } catch(e) {}
  pdfForm.flatten();
  return await pdfDoc.save();
};

// ─── DOWNLOAD HELPER ───
const downloadPdf = (bytes, filename) => {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

// ─── BUSINESS CARD SUMMARY PREVIEW ───
const BusinessCardSummary = ({ data, location, enterprise }) => {
  const loc = OFFICE_LOCATIONS.find(l => l.id === location);
  const ent = ENTERPRISES.find(e => e.id === enterprise);
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const bytes = await fillBusinessCardPdf(enterprise, data, loc);
      if (bytes) downloadPdf(bytes, `Business_Card_${data.firstName}_${data.lastName}.pdf`);
    } catch(e) { console.error("PDF generation failed:", e); }
    setGenerating(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "inline-block", width: 380, borderRadius: 14,
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 24px", textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 16 }}>{{ nhbp: "🐢", "tribal-court": "⚖️", "tribal-police": "🛡️" }[enterprise]}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{ent?.shortLabel} Business Card</span>
        </div>
        {[
          ["Name", `${data.firstName} ${data.lastName}`],
          ["Title", data.title],
          data.cellPhone && ["Cell", data.cellPhone],
          data.officePhone && ["Phone", data.officePhone],
          data.fax && ["Fax", data.fax],
          data.email && ["Email", data.email],
          loc && ["Office", loc.label],
          loc && ["Address", `${loc.address} | ${loc.city}, ${loc.state} ${loc.zip}`],
        ].filter(Boolean).map(([label, value], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500, textAlign: "right", maxWidth: "65%" }}>{value}</span>
          </div>
        ))}
        <button onClick={handleDownload} disabled={generating} style={{
          width: "100%", marginTop: 16, padding: "10px 0", borderRadius: 10,
          background: generating ? "rgba(255,255,255,0.05)" : `linear-gradient(135deg, ${NHBP.turquoise}20, ${NHBP.turquoise}08)`,
          border: `1px solid ${NHBP.turquoise}${generating ? "15" : "40"}`,
          color: generating ? "rgba(255,255,255,0.3)" : NHBP.turquoiseLight,
          fontSize: 12, fontWeight: 600, cursor: generating ? "default" : "pointer",
          fontFamily: "var(--font-primary)", letterSpacing: "0.05em",
          transition: "all 0.3s ease",
        }}>
          {generating ? "Generating PDF..." : "⤓  Download Filled Business Card PDF"}
        </button>
      </div>
    </div>
  );
};

// ─── NAME PLATE SUMMARY PREVIEW ───
const NamePlateSummary = ({ data }) => {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const bytes = await fillNamePlatePdf(data);
      if (bytes) downloadPdf(bytes, `Name_Plate_${data.firstName}_${data.lastName}.pdf`);
    } catch(e) { console.error("PDF generation failed:", e); }
    setGenerating(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "inline-block", width: 380, borderRadius: 14,
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 24px", textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 16 }}>🪧</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Name Plate</span>
        </div>
        {[
          ["Name", `${data.firstName} ${data.lastName}`],
          ["Title", data.title],
        ].map(([label, value], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{value}</span>
          </div>
        ))}
        <button onClick={handleDownload} disabled={generating} style={{
          width: "100%", marginTop: 16, padding: "10px 0", borderRadius: 10,
          background: generating ? "rgba(255,255,255,0.05)" : `linear-gradient(135deg, ${NHBP.turquoise}20, ${NHBP.turquoise}08)`,
          border: `1px solid ${NHBP.turquoise}${generating ? "15" : "40"}`,
          color: generating ? "rgba(255,255,255,0.3)" : NHBP.turquoiseLight,
          fontSize: 12, fontWeight: 600, cursor: generating ? "default" : "pointer",
          fontFamily: "var(--font-primary)", letterSpacing: "0.05em",
          transition: "all 0.3s ease",
        }}>
          {generating ? "Generating PDF..." : "⤓  Download Filled Name Plate PDF"}
        </button>
      </div>
    </div>
  );
};

function StationeryKitForm({ onReturnToServices }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fading, setFading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);

  const inputRef = useRef(null);
  const navLock = useRef(false);

  const [form, setForm] = useState({
    enterprise: null, items: [], reason: null,
    firstName: "", lastName: "", title: "", department: "",
    cellPhone: "", officePhone: "", fax: "", email: "",
    officeLocation: null, quantity: "250", notes: "",
  });

  const totalSteps = 6;
  const autoSave = useAutoSave("nhbp-form-stationery-kit", form, step, setForm, setStep);

  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const goNext = () => {
    if (navLock.current) return;
    navLock.current = true;
    setDirection(1);
    setFading(true);
    setTimeout(() => {
      setStep(prev => {
        if (prev >= totalSteps - 1) { handleSubmit(); return prev; }
        return prev + 1;
      });
      setFading(false);
      navLock.current = false;
    }, 280);
  };

  const goBack = () => {
    if (navLock.current || step === 0) return;
    navLock.current = true;
    setDirection(-1);
    setFading(true);
    setTimeout(() => {
      setStep(prev => Math.max(0, prev - 1));
      setFading(false);
      navLock.current = false;
    }, 280);
  };

  const handleSubmit = () => { setTicketNumber(`NHBP-SK-${String(Math.floor(Math.random() * 9000) + 1000)}`); autoSave.clear(); setSubmitted(true); };

  const canAdvance = () => {
    switch (step) {
      case 0: return form.enterprise !== null;
      case 1: return form.items.length > 0;
      case 2: return form.reason !== null;
      case 3: return form.firstName.trim() && form.lastName.trim() && form.title.trim() && validateEmail(form.email);
      case 4: return form.officeLocation !== null;
      case 5: return true;
      default: return true;
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && canAdvance()) { e.preventDefault(); goNext(); } };
  const filteredLocations = OFFICE_LOCATIONS.filter(l => l.enterprise === form.enterprise);

  const Background = PortalBackground;

  const slideStyle = { width: "100%", maxWidth: 620, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", opacity: fading ? 0 : 1, transform: fading ? `translateY(${direction * 24}px)` : "translateY(0)" };
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#f0f0f0", fontSize: 18, fontFamily: "var(--font-primary)", padding: "14px 16px", outline: "none", transition: "border-color 0.3s ease", caretColor: NHBP.turquoise, boxSizing: "border-box", direction: "ltr", textAlign: "left", unicodeBidi: "plaintext" };
  const labelStyle = { fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, display: "block" };

  // ═══════════ CONFIRMATION ═══════════
  if (submitted) {
    const loc = OFFICE_LOCATIONS.find(l => l.id === form.officeLocation);
    const ent = ENTERPRISES.find(e => e.id === form.enterprise);
    return (
      <div dir="ltr" style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", direction: "ltr" }}>
        <Background />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 24px", position: "relative", zIndex: 1, animation: "scaleIn 0.5s ease" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 28, background: `linear-gradient(135deg, ${NHBP.turquoise}, ${NHBP.turquoiseDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff", boxShadow: `0 0 50px ${NHBP.turquoiseGlow}` }}>✓</div>
          <h1 style={{ fontSize: 32, fontWeight: 300, margin: "0 0 8px" }}>Stationery Kit Submitted</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>Your order is ready for printing verification</p>
          <GlassCard style={{ padding: "14px 32px", marginBottom: 24 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>Request</span>
            <span style={{ fontSize: 24, fontWeight: 600, color: NHBP.turquoiseLight, fontFamily: "var(--font-primary)" }}>{ticketNumber}</span>
          </GlassCard>

          {form.items.includes("business-cards") && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10, textAlign: "center" }}>Business Card Preview</p>
              <BusinessCardSummary data={form} location={form.officeLocation} enterprise={form.enterprise} />
            </div>
          )}
          {form.items.includes("name-plate") && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10, textAlign: "center" }}>Name Plate Preview</p>
              <NamePlateSummary data={form} />
            </div>
          )}

          <GlassCard style={{ padding: "20px 28px", width: "100%", maxWidth: 420, textAlign: "left", marginBottom: 20 }}>
            {[["Employee", `${form.firstName} ${form.lastName}`], ["Title", form.title], ["Enterprise", ent?.shortLabel], ["Office", loc?.label], ["Items", form.items.map(i => STATIONERY_ITEMS.find(s => s.id === i)?.label).join(", ")], ["Reason", ORDER_REASONS.find(r => r.id === form.reason)?.label]].map(([label, value], i, arr) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)", textAlign: "right", maxWidth: "60%" }}>{value}</span>
              </div>
            ))}
          </GlassCard>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textAlign: "center", maxWidth: 380 }}>Print-ready PDFs will be attached to your Trello card.<br/>The admin team will verify and send to printer.</p>
        </div>
      </div>
    );
  }

  // ═══════════ FORM STEPS ═══════════
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={slideStyle}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "var(--font-primary)" }}>01 / 0{totalSteps}</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Which enterprise are you with?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>This determines your card template and logo</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440 }}>
            {ENTERPRISES.map(e => (
              <GlassCard key={e.id} active={form.enterprise === e.id} onClick={() => { update("enterprise", e.id); update("officeLocation", null); setTimeout(goNext, 400); }} style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 32 }}>{e.icon}</span>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", display: "block", whiteSpace: "pre-line", lineHeight: 1.3 }}>{e.label}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{e.desc}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      );

      case 1: return (
        <div style={slideStyle}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "var(--font-primary)" }}>02 / 0{totalSteps}</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>What do you need?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Select all that apply</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440 }}>
            {STATIONERY_ITEMS.map(item => {
              const sel = form.items.includes(item.id);
              return (
                <GlassCard key={item.id} active={sel} onClick={() => update("items", sel ? form.items.filter(i => i !== item.id) : [...form.items, item.id])} style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${sel ? NHBP.turquoise : "rgba(255,255,255,0.15)"}`, background: sel ? NHBP.turquoise : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease", flexShrink: 0 }}>
                    {sel && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", display: "block" }}>{item.label}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{item.desc}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      );

      case 2: return (
        <div style={slideStyle}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "var(--font-primary)" }}>03 / 0{totalSteps}</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>What's the reason?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Helps us know if this is a first order or reprint</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440 }}>
            {ORDER_REASONS.map(r => (
              <GlassCard key={r.id} active={form.reason === r.id} onClick={() => { update("reason", r.id); setTimeout(goNext, 400); }} style={{ padding: "20px 22px" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", display: "block" }}>{r.label}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{r.desc}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      );

      case 3: return (
        <div style={slideStyle}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "var(--font-primary)" }}>04 / 0{totalSteps}</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Your information</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>Exactly as it should appear on your stationery</p>
          <div style={{ maxWidth: 440, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}><label style={labelStyle}>First Name *</label><input ref={inputRef} type="text" placeholder="First" value={form.firstName} onChange={e => update("firstName", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
              <div style={{ flex: 1 }}><label style={labelStyle}>Last Name *</label><input type="text" placeholder="Last" value={form.lastName} onChange={e => update("lastName", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
            </div>
            <div><label style={labelStyle}>Job Title *</label><input type="text" placeholder="Director of Communications" value={form.title} onChange={e => update("title", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
            <div><label style={labelStyle}>Department</label><input type="text" placeholder="Communications" value={form.department} onChange={e => update("department", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}><label style={labelStyle}>Cell Phone</label><input type="tel" placeholder="269.000.0000" value={form.cellPhone} onChange={e => update("cellPhone", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
              <div style={{ flex: 1 }}><label style={labelStyle}>Office Phone</label><input type="tel" placeholder="269.000.0000" value={form.officePhone} onChange={e => update("officePhone", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}><label style={labelStyle}>Email *</label><input type="email" placeholder="First.Last@nhbp-nsn.gov" value={form.email} onChange={e => update("email", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
              <div style={{ flex: 1 }}><label style={labelStyle}>Fax</label><input type="tel" placeholder="269.000.0000" value={form.fax} onChange={e => update("fax", e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} /></div>
            </div>
          </div>

          {(form.firstName || form.lastName || form.title) && (
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Live Preview</p>
              {form.items.includes("business-cards") && (
                <div style={{ marginBottom: 16 }}>
                  <BusinessCardSummary data={form} location={form.officeLocation} enterprise={form.enterprise} />

                </div>
              )}
              {form.items.includes("name-plate") && <NamePlateSummary data={form} />}
            </div>
          )}
        </div>
      );

      case 4: return (
        <div style={slideStyle}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "var(--font-primary)" }}>05 / 0{totalSteps}</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Select your office location</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>This address appears on the back of your business card</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440 }}>
            {filteredLocations.map(loc => (
              <GlassCard key={loc.id} active={form.officeLocation === loc.id} onClick={() => { update("officeLocation", loc.id); setTimeout(goNext, 400); }} style={{ padding: "18px 22px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{loc.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{loc.address} | {loc.city}, {loc.state} {loc.zip}</div>
              </GlassCard>
            ))}
          </div>

        </div>
      );

      case 5: {
        const loc = OFFICE_LOCATIONS.find(l => l.id === form.officeLocation);
        const ent = ENTERPRISES.find(e => e.id === form.enterprise);
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "var(--font-primary)" }}>06 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Review & Submit</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>Make sure everything looks right</p>
            {form.items.includes("business-cards") && (
              <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Business Card</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                  <BusinessCardSummary data={form} location={form.officeLocation} enterprise={form.enterprise} />
                  <BusinessCardSummary data={form} location={form.officeLocation} enterprise={form.enterprise} />
                </div>
              </div>
            )}
            {form.items.includes("name-plate") && (
              <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Name Plate</p>
                <NamePlateSummary data={form} />
              </div>
            )}
            <GlassCard style={{ padding: "20px 24px", maxWidth: 440, width: "100%", margin: "0 auto 20px" }}>
              {[["Employee", `${form.firstName} ${form.lastName}`], ["Title", form.title], form.department && ["Department", form.department], ["Email", form.email], form.cellPhone && ["Cell", form.cellPhone], form.officePhone && ["Office", form.officePhone], form.fax && ["Fax", form.fax], ["Enterprise", ent?.shortLabel], ["Location", loc?.label], ["Items", form.items.map(i => STATIONERY_ITEMS.find(s => s.id === i)?.label).join(", ")], ["Reason", ORDER_REASONS.find(r => r.id === form.reason)?.label]].filter(Boolean).map(([label, value], i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", textAlign: "right", maxWidth: "60%" }}>{value}</span>
                </div>
              ))}
            </GlassCard>
            <div style={{ maxWidth: 440, margin: "0 auto" }}>
              <label style={labelStyle}>Special notes (optional)</label>
              <textarea placeholder="Anything else we should know?" value={form.notes} onChange={e => update("notes", e.target.value)} style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} />
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div dir="ltr" style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "var(--font-primary)", position: "relative", overflow: "hidden", direction: "ltr" }}>
      {autoSave.showRestore && <RestorePrompt onYes={autoSave.restore} onNo={autoSave.dismiss} />}
      <Background />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", padding: "0 24px" }}>
        <div style={{ padding: "20px 0 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>◎</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Employee Stationery Kit</span>
          </div>
        </div>
        <div style={{ padding: "16px 0 0", maxWidth: 620, width: "100%" }}>
          <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: `linear-gradient(90deg, ${NHBP.turquoise}, ${NHBP.turquoiseLight})`, width: `${((step + 1) / totalSteps) * 100}%`, transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 12px ${NHBP.turquoiseGlow}` }} />
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 0" }}>{renderStep()}</div>
        <BottomFormNav
          onBack={goBack} onNext={goNext} onHome={onReturnToServices}
          canGoBack={step > 0} canGoNext={canAdvance()}
          nextLabel={step === totalSteps - 1 ? "Submit Order →" : undefined}
        />
      </div>
    </div>
  );
}

export default StationeryKitForm;
