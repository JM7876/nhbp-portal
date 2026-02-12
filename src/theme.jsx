// ═══════════════════════════════════════════════════════════
//  NHBP DESIGN SYSTEM — Single Source of Truth
// ═══════════════════════════════════════════════════════════

// ─── Brand Colors ────────────────────────────────────────
export const NHBP = {
  turquoise: "#14A9A2",
  turquoiseLight: "#1bc4bc",
  turquoiseDark: "#0e8a84",
  turquoiseGlow: "rgba(20, 169, 162, 0.25)",
  maroon: "#5F0C0E",
  maroonLight: "#8a1518",
  green: "#094425",
  greenLight: "#0d6b3a",
  pink: "#FAC6C7",
  red: "#BA0C2F",
  redGlow: "rgba(186, 12, 47, 0.15)",
};

// ─── Form Colors (used by dedicated form components) ─────
export const FC = {
  dark: "#0a0e14", darkCard: "#111820",
  turquoise: "#40b5ad", turquoiseLight: "#5fcec6",
  turquoiseGlow: "rgba(64, 181, 173, 0.3)",
  maroon: "#6b2737", maroonLight: "#8a3a4d",
  gold: "#c9a84c", goldLight: "#e0c76e",
  green: "#2d6a4f", greenLight: "#40916c",
  red: "#ba0c2f", redLight: "#e02040",
  textPrimary: "rgba(255,255,255,0.92)",
  textSecondary: "rgba(255,255,255,0.55)",
  textDim: "rgba(255,255,255,0.3)",
  border: "rgba(255,255,255,0.08)",
  glass: "rgba(255,255,255,0.03)",
};

// ─── Typography ──────────────────────────────────────────
export const FONTS = {
  primary: "'Raleway', sans-serif",
  sizes: {
    hero: "clamp(48px, 6vw, 72px)",
    subtitle: "22px",
    body: "18px",
    button: "16px",
    label: "12px",
  },
  weights: {
    hero: 200,
    tagline: 300,
    body: 400,
    button: 500,
    badge: 600,
  },
};

// ─── Glass Recipe (from GlassCard) ───────────────────────
export const GLASS = {
  background: "rgba(255,255,255,0.03)",
  backgroundActive: (color) => `linear-gradient(135deg, ${color}18, ${color}08)`,
  border: "rgba(255,255,255,0.06)",
  borderHover: (color) => color + "30",
  borderActive: (color) => color + "60",
  backdropFilter: "blur(20px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  boxShadowHover: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
  boxShadowActive: (color) => `0 0 30px ${color}, inset 0 1px 0 rgba(255,255,255,0.08)`,
};

// ─── Form Field Styles (from FormInput/FormSelect) ───────
export const FIELDS = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  color: "rgba(255,255,255,0.92)",
  placeholderColor: "rgba(255,255,255,0.25)",
};

// ─── Spacing ─────────────────────────────────────────────
export const SPACING = {
  cardPadding: "22px 18px",
  formPadding: "40px 24px",
  sectionGap: 18,
  cardBorderRadius: 16,
  buttonBorderRadius: 28,
  inputBorderRadius: 10,
};

// ─── Click Transitions (turquoise → pink) ────────────────
export const TRANSITIONS = {
  clickBorder: "rgba(200,80,130,0.25)",
  clickGlow: "0 0 20px rgba(200,80,130,0.1)",
  duration: "0.3s ease",
};
