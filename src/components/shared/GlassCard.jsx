import React, { useState } from "react";
import { NHBP, GLASS, SPACING } from "../../theme";

const GlassCard = ({ children, active, onClick, style, hoverGlow }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={onClick ? "click-transition" : undefined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: active
          ? GLASS.backgroundActive(NHBP.turquoise)
          : GLASS.background,
        backdropFilter: GLASS.backdropFilter,
        WebkitBackdropFilter: GLASS.backdropFilter,
        border: `1px solid ${active ? GLASS.borderActive(NHBP.turquoise) : hovered ? GLASS.borderHover(NHBP.turquoise) : GLASS.border}`,
        borderRadius: SPACING.cardBorderRadius,
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: onClick ? "pointer" : "default",
        boxShadow: active
          ? `0 0 30px ${NHBP.turquoiseGlow}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : hovered
          ? GLASS.boxShadowHover
          : GLASS.boxShadow,
        transform: hovered && onClick ? "translateY(-2px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${active ? NHBP.turquoise + "40" : "rgba(255,255,255,0.08)"}, transparent)`,
      }} />
      {children}
    </div>
  );
};

export default GlassCard;
