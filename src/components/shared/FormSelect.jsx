import React from "react";
import { FC } from "../../theme";
import { DEPARTMENTS } from "../../constants/departments";

const FormDeptSelect = ({ value, onChange, options }) => (
  <div style={{ marginBottom: 20, flex: 1 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: FC.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
      Department <span style={{ color: FC.turquoise }}>*</span>
    </label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${FC.border}`, borderRadius: 10, color: value ? FC.textPrimary : FC.textDim, fontSize: 15, fontFamily: "var(--font-primary)", outline: "none", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%2340b5ad' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
      <option value="" style={{ background: FC.dark }}>Select department...</option>
      {options.map(d => <option key={typeof d === 'string' ? d : d.value} value={typeof d === 'string' ? d : d.value} style={{ background: FC.dark }}>{typeof d === 'string' ? d : d.label}</option>)}
    </select>
  </div>
);

const FormSelect = ({ label, value, onChange, options, required, placeholder }) => (
  <div style={{ marginBottom: 20, flex: 1 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: FC.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
      {label} {required && <span style={{ color: FC.turquoise }}>*</span>}
    </label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${FC.border}`, borderRadius: 10, color: value ? FC.textPrimary : FC.textDim, fontSize: 15, fontFamily: "var(--font-primary)", outline: "none", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%2340b5ad' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
      <option value="" style={{ background: FC.dark }}>{placeholder || "Select..."}</option>
      {options.map((o) => <option key={o} value={o} style={{ background: FC.dark }}>{o}</option>)}
    </select>
  </div>
);

export { FormDeptSelect, FormSelect };
