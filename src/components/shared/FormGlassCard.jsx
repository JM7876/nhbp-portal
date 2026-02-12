import React, { useState } from "react";
import { FC } from "../../theme";

const FormGlassCard = ({ children, active, onClick, style: s = {}, glowColor }) => {
  const [h, setH] = useState(false);
  const gc = glowColor || FC.turquoise;
  const gcGlow = glowColor ? `${glowColor}30` : FC.turquoiseGlow;
  return (
    <div className={onClick ? "click-transition" : undefined} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: active ? `linear-gradient(135deg, ${gc}18, ${gc}08)` : h ? "rgba(255,255,255,0.04)" : FC.glass,
        border: `1px solid ${active ? gc + "50" : h ? "rgba(255,255,255,0.12)" : FC.border}`,
        borderRadius: 14, padding: "16px 20px", cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: active ? `0 8px 32px ${gcGlow}, inset 0 1px 0 rgba(255,255,255,0.06)` : h ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
        transform: h && onClick ? "translateY(-1px)" : "translateY(0)",
        position: "relative", overflow: "hidden", ...s,
      }}>
      {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gc}60, transparent)` }} />}
      {children}
    </div>
  );
};

export default FormGlassCard;
