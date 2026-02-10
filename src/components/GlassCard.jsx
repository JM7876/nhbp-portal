import { useState } from "react";
import { NHBP } from "../constants";

export const GlassCard = ({ children, active, onClick, style, hoverGlow }) => {
  const [hovered, setHovered] = useState(false);
  const glowColor = hoverGlow || NHBP.turquoise;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: active
          ? `linear-gradient(135deg, ${glowColor}18, ${glowColor}08)`
          : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${active ? glowColor + "60" : hovered && onClick ? glowColor + "30" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16,
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: onClick ? "pointer" : "default",
        boxShadow: active
          ? `0 0 30px ${glowColor}25, inset 0 1px 0 rgba(255,255,255,0.08)`
          : hovered
          ? `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`
          : `inset 0 1px 0 rgba(255,255,255,0.04)`,
        transform: hovered && onClick ? "translateY(-2px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${active ? glowColor + "40" : "rgba(255,255,255,0.08)"}, transparent)`,
      }} />
      {children}
    </div>
  );
};
