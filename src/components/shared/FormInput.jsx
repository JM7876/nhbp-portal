import React from "react";
import { FC, NHBP } from "../../theme";

const FormInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline, maxWords }) => {
  const wc = multiline && maxWords ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  return (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: FC.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: FC.turquoise }}>*</span>}
      </label>
      {multiline ? (
        <div style={{ position: "relative" }}>
          <textarea ref={ref} value={value} rows={4} placeholder={placeholder} onKeyDown={onKeyDown}
            onChange={(e) => {
              if (maxWords) { const w = e.target.value.trim().split(/\s+/).filter(Boolean); if (w.length <= maxWords || e.target.value.length < value.length) onChange(e.target.value); }
              else onChange(e.target.value);
            }}
            style={{ width: "100%", padding: "12px 14px", background: FC.glass, border: `1px solid ${FC.border}`, borderRadius: 10, color: FC.textPrimary, fontSize: 14, fontFamily: "var(--font-primary)", caretColor: NHBP.turquoise, resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
            onFocus={(e) => e.target.style.borderColor = "rgba(20,169,162,0.4)"}
            onBlur={(e) => e.target.style.borderColor = FC.border}
          />
          {maxWords && <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, color: wc >= maxWords ? FC.maroonLight : FC.textDim }}>{wc}/{maxWords} words</div>}
        </div>
      ) : (
        <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "12px 14px", background: FC.glass, border: `1px solid ${FC.border}`, borderRadius: 10, color: FC.textPrimary, fontSize: 14, fontFamily: "var(--font-primary)", caretColor: NHBP.turquoise, outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = "rgba(20,169,162,0.4)"}
          onBlur={(e) => e.target.style.borderColor = FC.border}
        />
      )}
    </div>
  );
};

export default FormInput;
