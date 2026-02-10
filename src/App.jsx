import React, { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
//  ERROR BOUNDARY
// ═══════════════════════════════════════════════════════════
class PortalErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error("Portal error:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#080a10", color: "#f0f0f0", fontFamily: "Tahoma, 'DM Sans', sans-serif", textAlign: "center", padding: "40px 24px" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(186,12,47,0.15)", border: "1px solid rgba(186,12,47,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 28 }}>!</div>
          <h1 style={{ fontSize: 28, fontWeight: 300, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Something went wrong</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 400, lineHeight: 1.7, margin: "0 0 32px" }}>
            The portal encountered an unexpected error. Your data has been saved. Please refresh the page to continue.
          </p>
          <button onClick={() => window.location.reload()} style={{ padding: "12px 32px", background: "rgba(20,169,162,0.15)", border: "1px solid rgba(20,169,162,0.4)", borderRadius: 10, color: "#1bc4bc", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const NHBP = {
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
  turquoiseCard: "#45B3A2",
  maroonCard: "#4B0D20",
  mintDivider: "#a8ddd4",
  namePlateTurq: "#6BC5AA",
};

// ═══════════════════════════════════════════════════════════
//  PORTAL CONSTANTS
// ═══════════════════════════════════════════════════════════

const SERVICES = [
  { id: "visual", icon: "✦", label: "Visual Designs", desc: "Digital flyers, printed materials, banners, ads, presentations", gradient: `linear-gradient(135deg, ${NHBP.turquoise}22, ${NHBP.turquoise}08)`, status: "live" },
  { id: "stationery", icon: "◎", label: "Employee Stationery Kit", desc: "Business cards, name plates, personalized notepads", gradient: `linear-gradient(135deg, ${NHBP.maroonLight}22, ${NHBP.maroonLight}08)`, status: "live" },
  { id: "studio", icon: "📷", label: "The Studio Hub", desc: "Headshots, photo booth, event photography", gradient: `linear-gradient(135deg, ${NHBP.greenLight}22, ${NHBP.greenLight}08)`, status: "live" },
  { id: "event-coverage", icon: "◉", label: "Event Coverage", desc: "Photography & videography for events", gradient: `linear-gradient(135deg, ${NHBP.greenLight}22, ${NHBP.greenLight}08)`, status: "coming" },
  { id: "instant-alert", icon: "⚡", label: "Instant Alert", desc: "Urgent communications & emergency notices", gradient: `linear-gradient(135deg, ${NHBP.red}18, ${NHBP.red}06)`, status: "live" },
  { id: "presentation", icon: "▤", label: "Media / Public Presentation", desc: "PowerPoint, keynotes, public-facing decks", gradient: `linear-gradient(135deg, ${NHBP.turquoise}22, ${NHBP.turquoise}08)`, status: "coming" },
  { id: "turtle-press", icon: "🐢", label: "The Turtle Press", desc: "Article submissions, birthdays & celebrations, photo contributions", gradient: `linear-gradient(135deg, ${NHBP.maroonLight}22, ${NHBP.maroonLight}08)`, status: "live" },
  { id: "other", icon: "💡", label: "Other", desc: "Something else — tell us what you need", gradient: `linear-gradient(135deg, ${NHBP.turquoise}15, ${NHBP.turquoise}05)`, status: "live" },
];

const PRIORITIES = [
  { id: "standard", label: "Standard", desc: "2–3 weeks turnaround", color: NHBP.turquoise },
  { id: "priority", label: "Priority", desc: "1–2 weeks turnaround", color: "#e0a630" },
  { id: "urgent", label: "Urgent", desc: "Within 5 business days", color: NHBP.red },
];

const DEPARTMENTS = [
  "Administration", "Education", "Elder Services", "Enrollment", "Environmental",
  "Facilities", "Finance", "Health & Human Services", "Housing", "Human Resources",
  "IT", "Language & Culture", "Legal", "Natural Resources", "Planning",
  "Pow Wow Committee", "Public Safety", "Social Services", "Tribal Council", "Youth Services"
];

const C = {
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

const FORM_DEPTS = [
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

const GlassCard = ({ children, active, onClick, style, hoverGlow }) => {
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

// ═══════════════════════════════════════════════════════════
//  VISUAL DESIGNS FORM — UNTOUCHED (except scoping renames)
// ═══════════════════════════════════════════════════════════

// ─── PIECE TYPES ────────────────────────────────────────
const PIECE_TYPES = [
  { id: "digital-flyer", icon: "📱", label: "Digital Media Flyer", desc: "Social media graphics, digital flyers, event promos" },
  { id: "printed-media", icon: "🖨️", label: "Printed Media Materials", desc: "Flyers, trifolds, postcards, posters, booklets" },
  { id: "banner-sign", icon: "🏗️", label: "Banner / Sign", desc: "Retractable banners, vinyl, yard signs, window signs" },
  { id: "ad", icon: "📰", label: "QTP Advertisements", desc: "Quarter page, half page, full page ads" },
  { id: "presentation", icon: "🖥️", label: "Presentation", desc: "PowerPoint, Google Slides, templates" },
  { id: "special-request", icon: "⭐", label: "General Special Request", desc: "Something unique — tell us what you need" },
];

const FORMAT_OPTIONS = [
  { id: "digital", icon: "💻", label: "Digital Only", desc: "Screen, email, social media" },
  { id: "print", icon: "🖨️", label: "Print Only", desc: "Will be physically printed" },
  { id: "both", icon: "✨", label: "Both", desc: "Digital version + print-ready files" },
];

// ─── PRINTED MEDIA SUB-CATEGORIES ─────────────────────
const PRINTED_MEDIA_SIZES = [
  { cat: "Flyers", sizes: [
    { id: "8.5x11", label: '8.5" × 11"', desc: "Standard letter flyer", w: 85, h: 110 },
    { id: "5.5x8.5", label: '5.5" × 8.5"', desc: "Half page flyer", w: 77, h: 119 },
    { id: "11x17", label: '11" × 17"', desc: "Tabloid flyer", w: 88, h: 136 },
  ]},
  { cat: "Trifolds & Brochures", sizes: [
    { id: "trifold-letter", label: '8.5" × 11" tri-fold', desc: "Standard brochure", w: 85, h: 110 },
    { id: "trifold-legal", label: '8.5" × 14" tri-fold', desc: "Legal brochure", w: 85, h: 140 },
    { id: "bifold", label: '11" × 17" bi-fold', desc: "Folded to 8.5 × 11", w: 88, h: 136 },
  ]},
  { cat: "Postcards", sizes: [
    { id: "4x6", label: '4" × 6"', desc: "Standard postcard", w: 96, h: 64 },
    { id: "5x7", label: '5" × 7"', desc: "Large postcard", w: 100, h: 70 },
    { id: "6x9", label: '6" × 9"', desc: "Jumbo postcard", w: 108, h: 72 },
  ]},
  { cat: "Stationery Cards", sizes: [
    { id: "a2-card", label: '4.25" × 5.5"', desc: "A2 folded card", w: 77, h: 100 },
    { id: "a7-card", label: '5" × 7"', desc: "A7 folded card", w: 71, h: 100 },
    { id: "5x7-flat", label: '5" × 7" flat', desc: "Flat card", w: 71, h: 100 },
    { id: "4x6-flat", label: '4" × 6" flat', desc: "Flat card", w: 67, h: 100 },
  ]},
  { cat: "Posters", sizes: [
    { id: "11x17-poster", label: '11" × 17"', desc: "Small poster", w: 88, h: 136 },
    { id: "18x24", label: '18" × 24"', desc: "Medium poster", w: 75, h: 100 },
    { id: "24x36", label: '24" × 36"', desc: "Large poster", w: 67, h: 100 },
  ]},
];

const SIZES = {
  "digital-flyer": {
    digital: [
      { id: "1080sq", label: "1080 × 1080", desc: "Feed post (square)", w: 100, h: 100 },
      { id: "1080x1350", label: "1080 × 1350", desc: "Feed post (portrait)", w: 80, h: 100 },
      { id: "1080x1920", label: "1080 × 1920", desc: "Story / Reel", w: 56, h: 100 },
      { id: "1920x1080", label: "1920 × 1080", desc: "Widescreen / Header", w: 128, h: 72 },
      { id: "1200x630", label: "1200 × 630", desc: "Facebook link share", w: 120, h: 63 },
      { id: "8.5x11-digital", label: '8.5" × 11"', desc: "Digital flyer (letter)", w: 85, h: 110 },
      { id: "custom", label: "Custom", desc: "I'll specify", w: 100, h: 100 },
    ],
  },
  "banner-sign": {
    print: [
      { id: "33x81", label: '33" × 81"', desc: "Retractable banner", w: 40, h: 98 },
      { id: "2x6", label: "2' × 6'", desc: "Vinyl banner", w: 44, h: 132 },
      { id: "3x5", label: "3' × 5'", desc: "Outdoor sign", w: 72, h: 120 },
      { id: "4x8", label: "4' × 8'", desc: "Large format", w: 60, h: 120 },
      { id: "yard-sign", label: '18" × 24"', desc: "Yard sign", w: 75, h: 100 },
      { id: "window-sign", label: '24" × 36"', desc: "Window sign", w: 67, h: 100 },
      { id: "custom", label: "Custom", desc: "I'll specify", w: 80, h: 80 },
    ],
  },
  ad: {
    print: [
      { id: "quarter", label: "Quarter page", desc: "~3.5 × 4.5", w: 70, h: 90 },
      { id: "half", label: "Half page", desc: "~7.5 × 4.5", w: 120, h: 72 },
      { id: "full", label: "Full page", desc: "~7.5 × 10", w: 75, h: 100 },
    ],
  },
  presentation: {
    digital: [
      { id: "16x9", label: "16:9 Widescreen", desc: "Standard slides", w: 128, h: 72 },
      { id: "4x3", label: "4:3 Standard", desc: "Classic ratio", w: 100, h: 75 },
      { id: "custom", label: "Custom", desc: "I'll specify", w: 80, h: 80 },
    ],
  },
};

const PURPOSES = [
  { id: "event", icon: "🎪", label: "Promote an Event" },
  { id: "announce", icon: "📢", label: "Make an Announcement" },
  { id: "recruit", icon: "🤝", label: "Recruit / Hire" },
  { id: "celebrate", icon: "🎉", label: "Celebrate / Recognize" },
  { id: "inform", icon: "📋", label: "Inform / Educate" },
  { id: "community", icon: "🗣️", label: "Community Input" },
  { id: "elders", icon: "🪶", label: "Elders Gathering" },
  { id: "itk", icon: "📌", label: "In the Know" },
  { id: "other", icon: "💡", label: "Other" },
];

// ─── STYLE DIRECTIONS (12 + Designer's Choice) ────────
// Grouped: Cultural & Community first, then Modern & Classic, then Niche & Specialty
const STYLE_SECTIONS = [
  { id: "cultural", label: "Cultural & Community", icon: "🐢" },
  { id: "modern", label: "Modern & Classic", icon: "✦" },
  { id: "niche", label: "Niche & Specialty", icon: "◆" },
];

const STYLES = [
  // ── CULTURAL & COMMUNITY ──────────────────────────────
  {
    id: "woodland",
    section: "cultural",
    label: "Woodland",
    desc: "Forest canopy, birch bark, river stone — rooted in Michigan's natural landscape",
    headingFont: "'Cambria', Georgia, serif",
    headingWeight: 700,
    bodyFont: "'Verdana', sans-serif",
    fontLabel: "Cambria Bold / Verdana",
    sampleHeading: "Woodland Gathering",
    sampleBody: "Where the forest meets the water.",
    palette: ["#2d5016", "#5c3d1e", "#8faa7b", "#d4c5a0", "#1a3a2a"],
    gradient: "linear-gradient(135deg, #1a3a2a 0%, #5c3d1e 35%, #8faa7b 70%, #d4c5a0 100%)",
    cardBg: "rgba(45,80,22,0.08)",
  },
  {
    id: "floral-applique",
    section: "cultural",
    label: "Floral Appliqué",
    desc: "Beadwork-inspired florals, ribbon borders, rich textiles on dark or natural ground",
    headingFont: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    headingWeight: 700,
    bodyFont: "'Georgia', serif",
    fontLabel: "Palatino Bold / Georgia",
    sampleHeading: "Spring Celebration",
    sampleBody: "Beauty woven into every detail.",
    palette: ["#1a1a2e", "#c43a5c", "#e8b84b", "#3a7d5c", "#f0e4d4"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #c43a5c 30%, #e8b84b 60%, #3a7d5c 100%)",
    cardBg: "rgba(196,58,92,0.07)",
  },
  {
    id: "nhbp-brand",
    section: "cultural",
    label: "NHBP Brand Standard",
    desc: "Official Nottawaseppi Huron Band colors, fonts, and identity guidelines",
    headingFont: "Tahoma, 'Segoe UI', sans-serif",
    headingWeight: 700,
    bodyFont: "Tahoma, 'Segoe UI', sans-serif",
    fontLabel: "Tahoma Bold / Tahoma",
    sampleHeading: "Mshiké Communications",
    sampleBody: "Official brand. Consistent identity.",
    palette: ["#14A9A2", "#5F0C0E", "#094425", "#FAC6C7", "#BA0C2F"],
    gradient: "linear-gradient(135deg, #094425 0%, #14A9A2 35%, #5F0C0E 70%, #BA0C2F 100%)",
    cardBg: "rgba(20,169,162,0.07)",
  },
  {
    id: "cultural-heritage",
    section: "cultural",
    label: "Cultural & Heritage",
    desc: "Honoring tradition, natural textures, warm earth tones",
    headingFont: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    headingWeight: 700,
    bodyFont: "'Georgia', serif",
    fontLabel: "Palatino / Georgia",
    sampleHeading: "Honoring Our Roots",
    sampleBody: "Strength through heritage and community.",
    palette: ["#5F0C0E", "#094425", "#c8956b", "#f5e6d0", "#8B4513"],
    gradient: "linear-gradient(135deg, #f5e6d0 0%, #c8956b 40%, #094425 90%)",
    cardBg: "rgba(200,149,107,0.06)",
  },

  // ── MODERN & CLASSIC ──────────────────────────────────
  {
    id: "clean-pro",
    section: "modern",
    label: "Clean & Professional",
    desc: "Structured, trustworthy, corporate confidence",
    headingFont: "'Segoe UI', system-ui, sans-serif",
    headingWeight: 700,
    bodyFont: "'Segoe UI', system-ui, sans-serif",
    fontLabel: "Segoe UI / Segoe UI Light",
    sampleHeading: "Community Update",
    sampleBody: "Clear communication builds trust.",
    palette: ["#14A9A2", "#1a2332", "#ffffff", "#e8edf2", "#5f6b7a"],
    gradient: "linear-gradient(135deg, #f8fffe 0%, #e0f5f3 40%, #ffffff 100%)",
    cardBg: "rgba(240,252,251,0.06)",
  },
  {
    id: "bold-vibrant",
    section: "modern",
    label: "Bold & Vibrant",
    desc: "High energy, eye-catching, impossible to ignore",
    headingFont: "'Impact', 'Arial Black', sans-serif",
    headingWeight: 900,
    bodyFont: "'Trebuchet MS', sans-serif",
    fontLabel: "Impact / Trebuchet MS",
    sampleHeading: "DON'T MISS OUT",
    sampleBody: "Big moments deserve big presence.",
    palette: ["#BA0C2F", "#f7c948", "#14A9A2", "#1a1a2e", "#ff6b35"],
    gradient: "linear-gradient(135deg, #BA0C2F 0%, #f7c948 50%, #ff6b35 100%)",
    cardBg: "rgba(186,12,47,0.08)",
  },
  {
    id: "modern-minimal",
    section: "modern",
    label: "Modern Minimal",
    desc: "Sleek, spacious, every element intentional",
    headingFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    headingWeight: 300,
    bodyFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontLabel: "Helvetica Neue Light / Helvetica Neue",
    sampleHeading: "Less is more",
    sampleBody: "Clarity through simplicity.",
    palette: ["#1a1a2e", "#14A9A2", "#ffffff", "#f0f0f0", "#6b7280"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #14A9A2 100%)",
    cardBg: "rgba(26,26,46,0.12)",
  },
  {
    id: "elegant-formal",
    section: "modern",
    label: "Elegant & Formal",
    desc: "Refined, serif-driven, understated luxury",
    headingFont: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    headingWeight: 400,
    bodyFont: "'Garamond', 'Times New Roman', serif",
    fontLabel: "Palatino / Garamond",
    sampleHeading: "Cordially Invited",
    sampleBody: "Distinction in every detail.",
    palette: ["#1a1a2e", "#5F0C0E", "#c9a96e", "#f5f1eb", "#4a4a5a"],
    gradient: "linear-gradient(135deg, #f5f1eb 0%, #e8ddd0 40%, #1a1a2e 100%)",
    cardBg: "rgba(95,12,14,0.06)",
  },

  // ── NICHE & SPECIALTY ─────────────────────────────────
  {
    id: "art-deco",
    section: "niche",
    label: "Art Deco",
    desc: "Glamorous, geometric, golden-age sophistication",
    headingFont: "'Copperplate', 'Copperplate Gothic', 'Times New Roman', serif",
    headingWeight: 700,
    bodyFont: "'Garamond', 'Times New Roman', serif",
    fontLabel: "Copperplate / Garamond",
    sampleHeading: "ANNUAL GALA",
    sampleBody: "An evening of elegance and tradition.",
    palette: ["#1a1a2e", "#c9a96e", "#2d4a3e", "#f5f1eb", "#8b6f47"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #c9a96e 45%, #2d4a3e 100%)",
    cardBg: "rgba(201,169,110,0.07)",
  },
  {
    id: "retro-vintage",
    section: "niche",
    label: "Retro / Vintage",
    desc: "Nostalgic, warm, timeless throwback charm",
    headingFont: "'Rockwell', 'Courier New', serif",
    headingWeight: 700,
    bodyFont: "'Georgia', serif",
    fontLabel: "Rockwell / Georgia",
    sampleHeading: "Throwback Fair",
    sampleBody: "Good times never go out of style.",
    palette: ["#d4572a", "#f4d35e", "#2a4858", "#faf3e3", "#8b5e3c"],
    gradient: "linear-gradient(135deg, #faf3e3 0%, #f4d35e 40%, #d4572a 100%)",
    cardBg: "rgba(212,87,42,0.06)",
  },
  {
    id: "hand-drawn",
    section: "niche",
    label: "Hand-Drawn / Organic",
    desc: "Whimsical, artistic, personal warmth",
    headingFont: "'Comic Sans MS', 'Segoe Script', cursive",
    headingWeight: 700,
    bodyFont: "'Trebuchet MS', sans-serif",
    fontLabel: "Segoe Script / Trebuchet MS",
    sampleHeading: "Youth Camp 2026",
    sampleBody: "Where creativity comes alive!",
    palette: ["#e76f51", "#2a9d8f", "#e9c46a", "#264653", "#f4a261"],
    gradient: "linear-gradient(135deg, #e9c46a 0%, #2a9d8f 45%, #e76f51 100%)",
    cardBg: "rgba(233,196,106,0.06)",
  },
  {
    id: "flat-contemporary",
    section: "niche",
    label: "Flat & Contemporary",
    desc: "Crisp edges, solid colors, digital-first clarity",
    headingFont: "'Segoe UI', system-ui, sans-serif",
    headingWeight: 600,
    bodyFont: "'Segoe UI', system-ui, sans-serif",
    fontLabel: "Segoe UI Semibold / Segoe UI",
    sampleHeading: "New Program Launch",
    sampleBody: "Simple. Direct. Effective.",
    palette: ["#3b82f6", "#ef4444", "#10b981", "#f8fafc", "#1e293b"],
    gradient: "linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #f8fafc 100%)",
    cardBg: "rgba(59,130,246,0.06)",
  },
];

// ─── COLOR PALETTE MODIFIERS ────────────────────────────
const PALETTE_MODIFIERS = [
  { id: "default", label: "Style Default", desc: "Use this style's natural colors", colors: null, icon: "🎨" },
  { id: "nhbp-brand", label: "NHBP Brand Standard", desc: "Official tribal branding", colors: ["#14A9A2", "#5F0C0E", "#094425", "#FAC6C7", "#BA0C2F"], icon: "🐢" },
  { id: "spring", label: "Spring Fresh", desc: "Light greens, soft pastels, renewal", colors: ["#7ec8a0", "#f0c6d4", "#a8d8ea", "#fff9c4", "#c5e1a5"], icon: "🌱" },
  { id: "summer", label: "Summer Bold", desc: "Warm brights, sunny energy, golden", colors: ["#ff6b35", "#f7c948", "#00b4d8", "#ff8fab", "#ffd60a"], icon: "☀️" },
  { id: "autumn", label: "Autumn Warm", desc: "Rich oranges, deep reds, harvest gold", colors: ["#bc4b21", "#e89b3f", "#5c3d2e", "#d4a574", "#8b2500"], icon: "🍂" },
  { id: "winter", label: "Winter Cool", desc: "Icy blues, deep navy, silver accents", colors: ["#1a3a5c", "#87aec5", "#c0d6e4", "#f0f4f8", "#4a6fa5"], icon: "❄️" },
  { id: "trending-2026", label: "Trending 2026", desc: "Current design trend colors", colors: ["#6c5ce7", "#00cec9", "#fd79a8", "#ffeaa7", "#2d3436"], icon: "🔥" },
  { id: "custom", label: "Custom Colors", desc: "Describe what you need", colors: null, icon: "✏️" },
];

// Content step is now built inline — no more checkbox array

// ─── VERBIAGE KEYWORDS ─────────────────────────────────
const VERBIAGE_KEYWORDS = {
  "Health & Wellness": [
    "Healthy Start", "Playgroup", "Immunizations", "Mental Health", "Wellness Check",
    "Nutrition", "Diabetes Prevention", "Substance Abuse", "Recovery", "Prenatal Care",
    "Maternal Health", "Fitness Program", "Health Fair", "Screening Event", "CPR Training",
    "Food Sovereignty", "Dental Health", "Vision Screening", "Fishing", "Walk-In Clinic",
  ],
  "Community & Events": [
    "Community Gathering", "Powwow", "Feast", "Open House", "Family Night",
    "Youth Activity", "Elder Event", "Holiday Celebration", "Fundraiser", "Volunteer",
    "Back to School", "Summer Camp", "Workshop", "Training Session", "Town Hall",
    "Family Retreat", "Men's Retreat", "Women's Retreat", "Movie Night", "Field Trip",
  ],
  "Government & Services": [
    "Enrollment", "Benefits", "Housing", "Employment", "Job Fair",
    "Legal Aid", "Tax Assistance", "Social Services", "Emergency Assistance", "Census",
    "Tribal Council", "Public Comment", "Election", "Meeting Notice", "Per Capita",
    "Background Check", "ID Services", "Court Notice", "Budget Hearing", "Food Distribution",
  ],
  "Culture & Education": [
    "Language Class", "Cultural Workshop", "Storytelling", "Beadwork", "Regalia",
    "Scholarship", "Tutoring", "GED Program", "College Prep", "Graduation",
    "Library Event", "STEM Program", "Art Class", "History", "Heritage Month",
    "Drum Circle", "Lacrosse", "Traditional Medicine", "Land Acknowledgment", "Museum Exhibit",
  ],
  "General": [
    "Announcement", "Reminder", "Deadline", "Registration", "RSVP Required",
    "Free Event", "Refreshments Provided", "Childcare Available", "Transportation Provided",
    "Limited Spots", "All Ages", "Members Only", "New Program", "Updated Hours", "Closure Notice",
    "Save the Date", "Now Hiring", "Survey", "Thank You", "Congratulations",
  ],
};

const ALL_KEYWORDS = Object.values(VERBIAGE_KEYWORDS).flat();

// ═══════════════════════════════════════════════════════════
//  SUBMISSION STORE (localStorage persistence)
// ═══════════════════════════════════════════════════════════
const SubmissionStore = {
  _key: "nhbp_submissions",
  getAll() {
    try { return JSON.parse(localStorage.getItem(this._key) || "[]"); }
    catch { return []; }
  },
  save(submission) {
    const all = this.getAll();
    const entry = {
      id: submission.ticketNumber,
      ...submission,
      submittedAt: new Date().toISOString(),
      status: "new",
    };
    all.unshift(entry);
    localStorage.setItem(this._key, JSON.stringify(all));
    return entry;
  },
  updateStatus(id, status) {
    const all = this.getAll();
    const idx = all.findIndex(s => s.id === id);
    if (idx !== -1) { all[idx].status = status; all[idx].updatedAt = new Date().toISOString(); }
    localStorage.setItem(this._key, JSON.stringify(all));
  },
  delete(id) {
    const all = this.getAll().filter(s => s.id !== id);
    localStorage.setItem(this._key, JSON.stringify(all));
  },
};

// Generate a unique ticket number (checks against existing submissions)
const generateTicket = (prefix) => {
  const existing = new Set(SubmissionStore.getAll().map(s => s.id));
  let ticket;
  do {
    ticket = `${prefix}-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
  } while (existing.has(ticket));
  return ticket;
};

// Shared Trello card creation
const createTrelloCard = async (cardName, descLines) => {
  const key = import.meta.env.VITE_TRELLO_API_KEY;
  const token = import.meta.env.VITE_TRELLO_TOKEN;
  const listId = import.meta.env.VITE_TRELLO_LIST_ID;
  if (!key || !token || !listId) return;
  try {
    const params = new URLSearchParams({
      key, token, idList: listId,
      name: cardName,
      desc: descLines.filter(Boolean).join("\n"),
      pos: "top",
    });
    await fetch("https://api.trello.com/1/cards?" + params.toString(), { method: "POST" });
  } catch (e) { console.error("Trello card creation failed:", e); }
};

const trelloHeader = (ticket) => [
  "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
  "\uD83D\uDCCB COMMUNICATIONS PORTAL SUBMISSION",
  "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
  "",
  `\uD83C\uDFAB Ticket: ${ticket}`,
  `\uD83D\uDCC5 Submitted: ${new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}`,
  "",
];

const VD_PRIORITIES = [
  { id: "standard", label: "Standard", desc: "2–3 weeks", color: NHBP.turquoise },
  { id: "priority", label: "Priority", desc: "1–2 weeks", color: "#e0a630" },
  { id: "urgent", label: "Urgent", desc: "Within 5 business days", color: NHBP.red },
];


// ─── SECTION CARD (content step green→pink glow) ────────
const SectionCard = ({ icon, title, subtitle, children, isDone }) => {
  const glowColor = isDone ? NHBP.pink : NHBP.turquoise;
  const borderColor = isDone ? "#FAC6C7" : NHBP.turquoise;
  return (
    <div style={{
      background: isDone ? "rgba(250,198,199,0.06)" : "rgba(20,169,162,0.04)",
      border: `1px solid ${borderColor}${isDone ? "40" : "30"}`,
      borderRadius: 16, padding: "20px 20px 22px",
      boxShadow: `0 0 ${isDone ? "24px" : "18px"} ${glowColor}${isDone ? "18" : "10"}, inset 0 1px 0 rgba(255,255,255,0.04)`,
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
      position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 20, filter: isDone ? "none" : "grayscale(0.3)" }}>{icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: isDone ? NHBP.pink : "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>{subtitle}</div>}
        </div>
        <div style={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
          background: isDone ? NHBP.pink : `${NHBP.turquoise}20`,
          border: `2px solid ${isDone ? NHBP.pink : NHBP.turquoise + "40"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.4s ease",
          boxShadow: isDone ? `0 0 12px ${NHBP.pink}40` : `0 0 8px ${NHBP.turquoise}15`,
        }}>
          {isDone
            ? <span style={{ color: "#1a1a2e", fontSize: 12, fontWeight: 800 }}>✓</span>
            : <div style={{ width: 6, height: 6, borderRadius: "50%", background: NHBP.turquoise, opacity: 0.5, animation: "pulse 2s ease-in-out infinite" }} />
          }
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────
function VisualDesignForm({ onBackToPortal }) {
  const [step, setStep] = useState(0);
  const [anim, setAnim] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [form, setForm] = useState({
    pieceType: null, format: null, size: null, customSize: "",
    multiPage: false, pageCount: "", multiPageType: null, specialRequest: false, specialRequestNote: "",
    gsrDescription: "", gsrName: "", gsrDepartment: "", gsrEmail: "", gsrDeadline: "",
    purpose: null, styleDir: null, designerChoice: false, paletteModifier: "default", customPalette: "",
    headline: "", bodyText: "", needVerbiage: false, verbiageKeywords: [], keywordSearch: "", customKeyword: "",
    eventDate: "", eventTime: "", eventLocation: "",
    contactTitle: "", contactName: "", contactPhone: "", contactEmail: "",
    inspiration: "", notes: "",
    priority: null, deadline: "", needPrinting: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticket, setTicket] = useState("");
  const [styleScroll, setStyleScroll] = useState(0);
  const inputRef = useRef(null);
  const styleContainerRef = useRef(null);
  const totalSteps = 9; // Merged style+color into one step

  useEffect(() => {
    const h = (e) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 350);
  }, [step]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const goNext = () => {
    if (anim) return;
    setAnim(true);
    setTimeout(async () => {
      if (step < totalSteps - 1) setStep(s => s + 1);
      else {
        const ticket = generateTicket("NHBP-DES");
        setTicket(ticket);
        await createTrelloCard(
          `\uD83C\uDFA8 ${form.headline || "Visual Design Request"} \u2014 ${form.requesterName || "Unknown"}`,
          [
            ...trelloHeader(ticket),
            "\uD83D\uDC64 REQUESTER",
            `Name: ${form.requesterName || "Not provided"}`,
            `Department: ${form.department || "Not provided"}`,
            `Email: ${form.email || "Not provided"}`,
            `Phone: ${form.phone || "Not provided"}`,
            "",
            "\uD83C\uDFA8 DESIGN REQUEST",
            `Headline: ${form.headline || "Not provided"}`,
            `Piece Type: ${form.pieceType || "Not provided"}`,
            `Format: ${form.format || "Not provided"}`,
            `Size: ${form.size || "Not provided"}`,
            `Printing Needed: ${form.needPrinting || "Not specified"}`,
            form.multiPage ? `Multi-page: Yes (${form.multiPageType || "N/A"})` : "",
            "",
            "\uD83D\uDCC5 DATE / TIME / LOCATION",
            `Date: ${form.date || "Not provided"}`,
            `Time: ${form.time || "Not provided"}`,
            `Location: ${form.location || "Not provided"}`,
            "",
            "\uD83D\uDCDD BODY COPY",
            form.bodyText || "Not provided",
            "",
            form.additionalNotes ? `\uD83D\uDCAC ADDITIONAL NOTES\n${form.additionalNotes}` : "",
            "",
            "\uD83D\uDC22 Submitted via NHBP Communications Portal",
          ]
        );
        SubmissionStore.save({
          ticketNumber: ticket, serviceType: "Visual Designs", serviceId: "visual",
          requesterName: form.requesterName || form.gsrName || "", email: form.email || form.gsrEmail || "",
          department: form.department || form.gsrDepartment || "", headline: form.headline || "",
          pieceType: form.pieceType, format: form.format, size: form.size,
          priority: form.priority, deadline: form.deadline || form.gsrDeadline || "",
          bodyText: form.bodyText || "", notes: form.notes || form.additionalNotes || "",
          date: form.eventDate || form.date || "", time: form.eventTime || form.time || "",
          location: form.eventLocation || form.location || "",
        });
        setSubmitted(true);
      }
      setAnim(false);
    }, 280);
  };

  const goBack = () => {
    if (anim || step === 0) return;
    setAnim(true);
    // If on size step and format was auto-set, go back to piece type
    const skipFormat = ["digital-flyer", "printed-media", "presentation", "ad", "banner-sign", "special-request"].includes(form.pieceType);
    const target = (step === 2 && skipFormat) ? 0 : step - 1;
    setTimeout(() => { setStep(target); setAnim(false); }, 280);
  };

  const canAdvance = () => {
    switch (step) {
      case 0: return !!form.pieceType;
      case 1: return !!form.format;
      case 2: return form.pieceType === "printed-media" 
        ? (!!form.size || form.multiPage || form.specialRequest)
        : form.pieceType === "special-request"
        ? (form.gsrDescription.trim().length > 0 && form.gsrName.trim().length > 0 && form.gsrEmail.trim().length > 0 && !!form.gsrDeadline)
        : !!form.size;
      case 3: return !!form.purpose;
      case 4: return !!form.styleDir || form.designerChoice; // style or designer's choice
      case 5: return !!form.headline.trim(); // headline required, rest optional
      case 6: return true;
      case 7: return !!form.priority;
      case 8: return true;
      default: return true;
    }
  };

  const getSizes = () => {
    const type = form.pieceType;
    const fmt = form.format === "both" ? "print" : form.format;
    if (!type || !fmt) return [];
    const typeSizes = SIZES[type];
    if (!typeSizes) return SIZES["digital-flyer"].digital;
    return typeSizes[fmt] || typeSizes.digital || typeSizes.print || [];
  };

  const getActivePalette = () => {
    if (form.paletteModifier === "default" || form.paletteModifier === "custom") {
      const style = STYLES.find(s => s.id === form.styleDir);
      return style ? style.palette : ["#666", "#888", "#aaa", "#ccc", "#eee"];
    }
    const mod = PALETTE_MODIFIERS.find(m => m.id === form.paletteModifier);
    return mod?.colors || ["#666", "#888", "#aaa", "#ccc", "#eee"];
  };

  const BG = () => (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 700px 500px at ${mousePos.x}% ${mousePos.y}%, ${NHBP.turquoise}06, transparent), radial-gradient(ellipse 500px 400px at 15% 15%, ${NHBP.maroon}12, transparent), radial-gradient(ellipse 400px 350px at 85% 75%, ${NHBP.turquoise}05, transparent), linear-gradient(160deg, #08090c 0%, #0d1117 30%, #0c1018 60%, #080a0e 100%)`,
        transition: "background 0.8s ease",
      }} />
      <div style={{ position: "fixed", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${NHBP.turquoise}08 0%, transparent 70%)`, top: -80, right: -80, zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle, ${NHBP.maroon}10 0%, transparent 70%)`, bottom: -60, left: -60, zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.012, pointerEvents: "none", backgroundImage: `linear-gradient(${NHBP.turquoise}18 1px, transparent 1px), linear-gradient(90deg, ${NHBP.turquoise}18 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <style>{`
        input:focus, textarea:focus { border-color: ${NHBP.turquoise} !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
        ::selection { background: ${NHBP.turquoise}40; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 50% { transform: translateX(100%); } 100% { transform: translateX(100%); } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.3); } }
        .style-grid::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );

  const slideStyle = {
    width: "100%", maxWidth: 720,
    transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
    opacity: anim ? 0 : 1,
    transform: anim ? "translateY(20px)" : "translateY(0)",
  };

  const StepLabel = ({ n }) => (
    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: 12, fontFamily: "monospace" }}>
      {String(n).padStart(2, "0")} / {totalSteps}
    </p>
  );

  const Q = ({ children }) => (
    <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 300, lineHeight: 1.3, margin: "0 0 6px", letterSpacing: "-0.015em", color: "#f0f0f0" }}>{children}</h2>
  );

  const Hint = ({ children }) => (
    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 26px", lineHeight: 1.5 }}>{children}</p>
  );

  // ─── CONFIRMATION SCREEN ──────────────────────────────
  if (submitted) {
    const selectedStyle = STYLES.find(s => s.id === form.styleDir);
    const activePalette = getActivePalette();
    return (
      <div style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <BG />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", zIndex: 1 }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", background: `linear-gradient(135deg, ${NHBP.turquoise}, ${NHBP.turquoiseDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, color: "#fff", marginBottom: 24, boxShadow: `0 0 50px ${NHBP.turquoiseGlow}` }}>✓</div>
          <h1 style={{ fontSize: 30, fontWeight: 300, margin: "0 0 16px" }}>Request submitted!</h1>
          <GlassCard style={{ padding: "12px 28px", marginBottom: 20 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>{form.pieceType === "special-request" ? "Special Request" : "Visual Design Request"}</span>
            <span style={{ fontSize: 22, fontWeight: 600, color: NHBP.turquoiseLight, fontFamily: "monospace" }}>{ticket}</span>
          </GlassCard>
          <GlassCard style={{ padding: "18px 24px", maxWidth: 440, width: "100%", textAlign: "left" }}>
            {form.pieceType === "special-request" ? (
              <>
                {[
                  ["Type", "⭐ General Special Request"],
                  ["Name", form.gsrName],
                  ["Department", form.gsrDepartment || "—"],
                  ["Email", form.gsrEmail],
                  ["Completed By", form.gsrDeadline],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Description</span>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "6px 0 0" }}>{form.gsrDescription}</p>
                </div>
              </>
            ) : (
            <>
            {[
              ["Type", PIECE_TYPES.find(p => p.id === form.pieceType)?.label],
              ["Format", FORMAT_OPTIONS.find(f => f.id === form.format)?.label],
              ["Size", form.pieceType === "printed-media" ? (
                form.multiPage ? `Multi-Page (${[{id:"booklet",l:"Booklet"},{id:"pamphlet",l:"Pamphlet"},{id:"book",l:"Book"},{id:"program",l:"Program"},{id:"newsletter",l:"Newsletter"},{id:"catalog",l:"Catalog"},{id:"other-mp",l:"Other"}].find(t=>t.id===form.multiPageType)?.l || "TBD"})`
                : form.specialRequest ? "Special Request"
                : form.size === "custom" ? form.customSize || "Custom"
                : PRINTED_MEDIA_SIZES.flatMap(c => c.sizes).find(s => s.id === form.size)?.label || form.size
              ) : (form.size === "custom" ? form.customSize || "Custom" : getSizes().find(s => s.id === form.size)?.label)],
              ["Purpose", PURPOSES.find(p => p.id === form.purpose)?.label],
              ["Style", form.designerChoice ? "Designer's Choice" : selectedStyle?.label],
              ["Fonts", form.designerChoice ? "Designer's discretion" : selectedStyle?.fontLabel],
              ["Colors", form.designerChoice ? "Designer's discretion" : PALETTE_MODIFIERS.find(m => m.id === form.paletteModifier)?.label],
              ["Priority", VD_PRIORITIES.find(p => p.id === form.priority)?.label],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{k}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {k === "Colors" && activePalette && (
                    <div style={{ display: "flex", gap: 0, borderRadius: 4, overflow: "hidden" }}>
                      {activePalette.slice(0, 5).map((c, j) => <div key={j} style={{ width: 12, height: 10, background: c }} />)}
                    </div>
                  )}
                  <span style={{ fontSize: 13, fontWeight: 600, color: k === "Priority" ? VD_PRIORITIES.find(p => p.id === form.priority)?.color : "rgba(255,255,255,0.75)" }}>{v}</span>
                </div>
              </div>
            ))}
            </>
            )}
          </GlassCard>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 20, lineHeight: 1.6, maxWidth: 360 }}>
            The Communications team will review your request and follow up within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
    color: "#f0f0f0", fontSize: 14, fontFamily: "Tahoma, sans-serif",
    padding: "12px 14px", outline: "none", caretColor: NHBP.turquoise,
    boxSizing: "border-box", transition: "border-color 0.3s",
  };

  const renderStep = () => {
    switch (step) {

      // ── STEP 1: What are we making? ───────────────────
      case 0:
        return (
          <div style={slideStyle}>
            <StepLabel n={1} />
            <Q>What are we making?</Q>
            <Hint>Choose the type of piece you need designed</Hint>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
              {PIECE_TYPES.map(p => (
                <GlassCard key={p.id} active={form.pieceType === p.id}
                  onClick={() => {
                    set("pieceType", p.id); set("size", null);
                    // Auto-set format and skip format step for certain types
                    if (p.id === "digital-flyer") {
                      set("format", "digital");
                      setTimeout(() => { setAnim(true); setTimeout(() => { setStep(2); setAnim(false); }, 280); }, 350);
                    } else if (p.id === "printed-media" || p.id === "ad" || p.id === "banner-sign") {
                      set("format", "print");
                      setTimeout(() => { setAnim(true); setTimeout(() => { setStep(2); setAnim(false); }, 280); }, 350);
                    } else if (p.id === "presentation") {
                      set("format", "digital");
                      setTimeout(() => { setAnim(true); setTimeout(() => { setStep(2); setAnim(false); }, 280); }, 350);
                    } else if (p.id === "special-request") {
                      set("format", null);
                      setTimeout(() => { setAnim(true); setTimeout(() => { setStep(2); setAnim(false); }, 280); }, 350);
                    } else {
                      set("format", null);
                      setTimeout(() => goNext(), 350);
                    }
                  }}
                  style={{ padding: "18px 16px" }}>
                  <span style={{ fontSize: 26, display: "block", marginBottom: 6, filter: form.pieceType === p.id ? `drop-shadow(0 0 6px ${NHBP.turquoiseGlow})` : "none" }}>{p.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", display: "block" }}>{p.label}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{p.desc}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      // ── STEP 2: Format ────────────────────────────────
      case 1:
        return (
          <div style={slideStyle}>
            <StepLabel n={2} />
            <Q>Digital, print, or both?</Q>
            <Hint>This determines sizing options and production needs</Hint>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 520 }}>
              {FORMAT_OPTIONS.map(f => (
                <GlassCard key={f.id} active={form.format === f.id}
                  onClick={() => { set("format", f.id); set("size", null); setTimeout(goNext, 350); }}
                  style={{ padding: "22px 16px", textAlign: "center" }}>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{f.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", display: "block" }}>{f.label}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{f.desc}</span>
                </GlassCard>
              ))}
            </div>
            {(form.format === "print" || form.format === "both") && (
              <div style={{ marginTop: 20, animation: "fadeSlide 0.3s ease" }}>
                <Hint>Do you need us to handle printing too?</Hint>
                <div style={{ display: "flex", gap: 10 }}>
                  {[{ id: true, label: "Yes, handle printing" }, { id: false, label: "Just design files" }].map(o => (
                    <GlassCard key={String(o.id)} active={form.needPrinting === o.id}
                      onClick={() => set("needPrinting", o.id)}
                      style={{ padding: "12px 20px" }}>
                      <span style={{ fontSize: 13, color: form.needPrinting === o.id ? NHBP.turquoiseLight : "rgba(255,255,255,0.6)" }}>{o.label}</span>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      // ── STEP 3: Size ──────────────────────────────────
      case 2: {
        // ── PRINTED MEDIA MATERIALS (special layout) ──
        if (form.pieceType === "printed-media") {
          return (
            <div style={slideStyle}>
              <StepLabel n={3} />
              <Q>What are you printing?</Q>
              <Hint>Select a size, or tell us about a multi-page project</Hint>
              <div style={{ maxWidth: 540 }}>
                {/* Categorized sizes */}
                {PRINTED_MEDIA_SIZES.map(cat => (
                  <div key={cat.cat} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{cat.cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {cat.sizes.map(s => (
                        <GlassCard key={s.id} active={form.size === s.id}
                          onClick={() => { set("size", s.id); set("multiPage", false); set("specialRequest", false); }}
                          style={{ padding: "12px 14px", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 90 }}>
                          <div style={{
                            width: Math.min(s.w, 100) * 0.55, height: Math.min(s.h, 100) * 0.55,
                            border: `2px solid ${form.size === s.id ? NHBP.turquoise : "rgba(255,255,255,0.1)"}`,
                            borderRadius: 3, marginBottom: 8,
                            background: form.size === s.id ? `${NHBP.turquoise}10` : "rgba(255,255,255,0.02)",
                            transition: "all 0.3s ease",
                          }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>{s.label}</span>
                          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>{s.desc}</span>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Custom size */}
                <div style={{ marginBottom: 18 }}>
                  <GlassCard active={form.size === "custom"}
                    onClick={() => { set("size", "custom"); set("multiPage", false); set("specialRequest", false); }}
                    style={{ padding: "12px 16px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>📐</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Custom Size</span>
                  </GlassCard>
                  {form.size === "custom" && (
                    <div style={{ marginTop: 10, animation: "fadeSlide 0.3s ease" }}>
                      <input ref={inputRef} placeholder='Describe the size (e.g. "24 × 36 inches")'
                        value={form.customSize} onChange={e => set("customSize", e.target.value)}
                        style={{ width: "100%", maxWidth: 400, background: "transparent", border: "none", borderBottom: "2px solid rgba(255,255,255,0.1)", color: "#f0f0f0", fontSize: 16, fontFamily: "Tahoma, sans-serif", padding: "12px 0", outline: "none", caretColor: NHBP.turquoise }} />
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "0.1em" }}>additional options</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>

                {/* Multi-page materials */}
                <div style={{ marginBottom: 14 }}>
                  <button type="button" onClick={() => { set("multiPage", !form.multiPage); if (!form.multiPage) { set("size", null); set("specialRequest", false); } }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                      background: form.multiPage ? `${NHBP.turquoise}12` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${form.multiPage ? NHBP.turquoise + "40" : "rgba(255,255,255,0.08)"}`,
                      transition: "all 0.3s ease", fontFamily: "Tahoma, sans-serif",
                      WebkitAppearance: "none", textAlign: "left",
                    }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      border: `2px solid ${form.multiPage ? NHBP.turquoise : "rgba(255,255,255,0.15)"}`,
                      background: form.multiPage ? NHBP.turquoise : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                    }}>
                      {form.multiPage && <span style={{ color: "#1a1a2e", fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: form.multiPage ? NHBP.turquoiseLight : "rgba(255,255,255,0.6)", display: "block" }}>
                        📚 Multi-Page Material
                      </span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                        Books, pamphlets, booklets, programs, etc.
                      </span>
                    </div>
                  </button>

                  {form.multiPage && (
                    <div style={{ marginTop: 12, paddingLeft: 4, animation: "fadeSlide 0.3s ease" }}>
                      <div style={{ marginBottom: 10 }}>
                        <label style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>What type?</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {[
                            { id: "booklet", label: "Booklet" },
                            { id: "pamphlet", label: "Pamphlet" },
                            { id: "book", label: "Book" },
                            { id: "program", label: "Program" },
                            { id: "newsletter", label: "Newsletter" },
                            { id: "catalog", label: "Catalog" },
                            { id: "other-mp", label: "Other" },
                          ].map(t => (
                            <GlassCard key={t.id} active={form.multiPageType === t.id}
                              onClick={() => set("multiPageType", t.id)}
                              style={{ padding: "8px 14px" }}>
                              <span style={{ fontSize: 12, color: form.multiPageType === t.id ? NHBP.turquoiseLight : "rgba(255,255,255,0.5)" }}>{t.label}</span>
                            </GlassCard>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <label style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>Estimated page count (if known)</label>
                        <input placeholder="e.g. 12, 24, 48..."
                          value={form.pageCount} onChange={e => set("pageCount", e.target.value)}
                          style={{ ...inputStyle, fontSize: 16, maxWidth: 200 }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Request */}
                <div>
                  <button type="button" onClick={() => { set("specialRequest", !form.specialRequest); if (!form.specialRequest) { set("size", null); set("multiPage", false); } }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                      background: form.specialRequest ? `${NHBP.pink}12` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${form.specialRequest ? NHBP.pink + "40" : "rgba(255,255,255,0.08)"}`,
                      transition: "all 0.3s ease", fontFamily: "Tahoma, sans-serif",
                      WebkitAppearance: "none", textAlign: "left",
                    }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      border: `2px solid ${form.specialRequest ? NHBP.pink : "rgba(255,255,255,0.15)"}`,
                      background: form.specialRequest ? NHBP.pink : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                    }}>
                      {form.specialRequest && <span style={{ color: "#1a1a2e", fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: form.specialRequest ? NHBP.pink : "rgba(255,255,255,0.6)", display: "block" }}>
                        ⭐ Special Request
                      </span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                        Something unique — we'll follow up to discuss details
                      </span>
                    </div>
                  </button>

                  {form.specialRequest && (
                    <div style={{ marginTop: 12, paddingLeft: 4, animation: "fadeSlide 0.3s ease" }}>
                      <textarea placeholder="Brief description of what you need (optional — we'll reach out either way)"
                        value={form.specialRequestNote} onChange={e => set("specialRequestNote", e.target.value)}
                        style={{ ...inputStyle, fontSize: 14, minHeight: 80, resize: "vertical", lineHeight: 1.6, borderRadius: 10 }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // ── GENERAL SPECIAL REQUEST (custom form) ──
        if (form.pieceType === "special-request") {
          return (
            <div style={slideStyle}>
              <StepLabel n={2} />
              <Q>Tell us what you need</Q>
              <Hint>We'll follow up to discuss the details</Hint>
              <div style={{ maxWidth: 500 }}>
                {/* Description */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>📝 Brief Description</label>
                  <textarea placeholder="Describe what you're looking for — the more detail, the faster we can help."
                    value={form.gsrDescription} onChange={e => set("gsrDescription", e.target.value)}
                    style={{ ...inputStyle, fontSize: 16, minHeight: 120, resize: "vertical", lineHeight: 1.7, borderRadius: 12 }} />
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 18px" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "0.1em" }}>contact information</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>

                {/* Contact: Name */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>👤 Name</label>
                  <input placeholder="Your full name"
                    value={form.gsrName} onChange={e => set("gsrName", e.target.value)}
                    style={{ ...inputStyle, fontSize: 16 }} />
                </div>

                {/* Contact: Department */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>🏢 Department</label>
                  <input placeholder="Your department"
                    value={form.gsrDepartment} onChange={e => set("gsrDepartment", e.target.value)}
                    style={{ ...inputStyle, fontSize: 16 }} />
                </div>

                {/* Contact: Email */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>📧 Email</label>
                  <input type="email" placeholder="your.email@nhbp-nsn.gov"
                    value={form.gsrEmail} onChange={e => set("gsrEmail", e.target.value)}
                    style={{ ...inputStyle, fontSize: 16 }} />
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 18px" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "0.1em" }}>timeline</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>

                {/* Completed By Date */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>📅 Completed By</label>
                  <input type="date" value={form.gsrDeadline}
                    onChange={e => set("gsrDeadline", e.target.value)}
                    style={{ ...inputStyle, colorScheme: "dark", fontSize: 16 }} />
                </div>

                {/* Submit button */}
                {form.gsrDescription.trim() && form.gsrName.trim() && form.gsrEmail.trim() && form.gsrDeadline && (
                  <button type="button" onClick={() => {
                    setAnim(true);
                    setTimeout(() => {
                      setTicket(`NHBP-${Math.floor(Math.random() * 9000) + 1000}`);
                      setSubmitted(true);
                      setAnim(false);
                    }, 280);
                  }}
                    style={{
                      width: "100%", padding: "16px 24px", borderRadius: 14, cursor: "pointer",
                      background: `linear-gradient(135deg, ${NHBP.turquoise}, ${NHBP.turquoiseLight})`,
                      border: "none", fontFamily: "Tahoma, sans-serif", fontSize: 15, fontWeight: 700,
                      color: "#1a1a2e", letterSpacing: "0.03em",
                      boxShadow: `0 4px 20px ${NHBP.turquoise}30`,
                      animation: "fadeSlide 0.3s ease",
                    }}>
                    Submit Special Request ⭐
                  </button>
                )}
              </div>
            </div>
          );
        }

        // ── STANDARD SIZE GRID (all other types) ──
        const sizes = getSizes();
        return (
          <div style={slideStyle}>
            <StepLabel n={3} />
            <Q>What size do you need?</Q>
            <Hint>Select a size — the shapes show actual proportions</Hint>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-end" }}>
              {sizes.map(s => (
                <GlassCard key={s.id} active={form.size === s.id}
                  onClick={() => { set("size", s.id); if (s.id !== "custom") setTimeout(goNext, 400); }}
                  style={{ padding: "14px 16px", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 100 }}>
                  <div style={{
                    width: Math.min(s.w, 120) * 0.7, height: Math.min(s.h, 120) * 0.7,
                    border: `2px solid ${form.size === s.id ? NHBP.turquoise : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 4, marginBottom: 10,
                    background: form.size === s.id ? `${NHBP.turquoise}10` : "rgba(255,255,255,0.02)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease", position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ width: "60%", height: 2, background: "rgba(255,255,255,0.06)", position: "absolute", top: "25%" }} />
                    <div style={{ width: "40%", height: 2, background: "rgba(255,255,255,0.04)", position: "absolute", top: "40%" }} />
                    <div style={{ width: "70%", height: "30%", background: "rgba(255,255,255,0.03)", position: "absolute", bottom: "15%", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>{s.label}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>{s.desc}</span>
                </GlassCard>
              ))}
            </div>
            {form.size === "custom" && (
              <div style={{ marginTop: 18, animation: "fadeSlide 0.3s ease" }}>
                <input ref={inputRef} placeholder='Describe the size (e.g. "24 × 36 inches")'
                  value={form.customSize} onChange={e => set("customSize", e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && form.customSize.trim()) goNext(); }}
                  style={{ width: "100%", maxWidth: 400, background: "transparent", border: "none", borderBottom: "2px solid rgba(255,255,255,0.1)", color: "#f0f0f0", fontSize: 16, fontFamily: "Tahoma, sans-serif", padding: "12px 0", outline: "none", caretColor: NHBP.turquoise }} />
              </div>
            )}
          </div>
        );
      }

      // ── STEP 4: Purpose ───────────────────────────────
      case 3:
        return (
          <div style={slideStyle}>
            <StepLabel n={4} />
            <Q>What's the purpose?</Q>
            <Hint>Helps our designers understand context before they start</Hint>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 540 }}>
              {PURPOSES.map(p => (
                <GlassCard key={p.id} active={form.purpose === p.id}
                  onClick={() => { set("purpose", p.id); setTimeout(goNext, 350); }}
                  style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{p.label}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      // ── STEP 5: STYLE DIRECTION + COLOR PALETTE (MERGED) ──
      case 4: {
        const selectedStyle = STYLES.find(s => s.id === form.styleDir);
        return (
          <div style={slideStyle}>
            <StepLabel n={5} />
            <Q>Pick a style direction</Q>
            <Hint>Each card shows font pairing, color palette, and overall mood — tap the one that <em style={{color: "rgba(255,255,255,0.5)"}}>feels</em> right</Hint>

            {/* Sectioned style cards */}
            {STYLE_SECTIONS.map(section => {
              const sectionStyles = STYLES.filter(s => s.section === section.id);
              if (sectionStyles.length === 0) return null;
              return (
                <div key={section.id} style={{ marginBottom: 28 }}>
                  {/* Section header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 14 }}>{section.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{section.label}</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  </div>

                  {/* Style cards grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
                    {sectionStyles.map(s => {
                      const isActive = form.styleDir === s.id && !form.designerChoice;
                      return (
                        <GlassCard key={s.id} active={isActive}
                          onClick={() => { set("styleDir", s.id); set("designerChoice", false); }}
                          hoverGlow={s.palette[0]}
                          style={{ padding: 0, overflow: "hidden", opacity: form.designerChoice ? 0.4 : 1, transition: "all 0.3s ease" }}>

                          {/* Mood gradient header with font preview */}
                          <div style={{
                            height: 88, background: s.gradient, position: "relative",
                            display: "flex", flexDirection: "column", justifyContent: "center",
                            padding: "0 18px", overflow: "hidden",
                          }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.15)" }} />

                            {/* Heading font sample */}
                            <div style={{
                              fontFamily: s.headingFont, fontWeight: s.headingWeight,
                              fontSize: 18, color: "rgba(255,255,255,0.95)",
                              position: "relative", zIndex: 1,
                              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                              letterSpacing: s.id === "modern-minimal" ? "0.04em" : s.id === "art-deco" ? "0.12em" : "0",
                              textTransform: s.id === "art-deco" || s.id === "bold-vibrant" ? "uppercase" : "none",
                            }}>
                              {s.sampleHeading}
                            </div>
                            {/* Body font sample */}
                            <div style={{
                              fontFamily: s.bodyFont,
                              fontSize: 11, color: "rgba(255,255,255,0.65)",
                              position: "relative", zIndex: 1,
                              marginTop: 3,
                              fontStyle: s.id === "elegant-formal" ? "italic" : "normal",
                            }}>
                              {s.sampleBody}
                            </div>
                          </div>

                          {/* Info section */}
                          <div style={{ padding: "12px 16px 14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                              <div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? "#fff" : "rgba(255,255,255,0.85)" }}>{s.label}</div>
                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.3, marginTop: 2 }}>{s.desc}</div>
                              </div>
                              {isActive && (
                                <div style={{ width: 20, height: 20, borderRadius: "50%", background: NHBP.turquoise, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
                              )}
                            </div>

                            {/* Font pairing label */}
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginBottom: 8, letterSpacing: "0.04em" }}>
                              FONTS: {s.fontLabel}
                            </div>

                            {/* Color palette strip */}
                            <div style={{ display: "flex", gap: 0, borderRadius: 6, overflow: "hidden", border: `1px solid ${isActive ? NHBP.turquoise + "30" : "rgba(255,255,255,0.06)"}` }}>
                              {s.palette.map((c, i) => (
                                <div key={i} style={{ flex: 1, height: 20, background: c }} />
                              ))}
                            </div>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* ── DESIGNER'S CHOICE CHECKBOX ── */}
            <div style={{ marginTop: 8, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14 }}>🎨</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Or...</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>
              <GlassCard active={form.designerChoice}
                onClick={() => { set("designerChoice", !form.designerChoice); if (!form.designerChoice) set("styleDir", null); }}
                style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, maxWidth: 520 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 5, flexShrink: 0,
                  border: `2px solid ${form.designerChoice ? NHBP.turquoise : "rgba(255,255,255,0.15)"}`,
                  background: form.designerChoice ? NHBP.turquoise : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease",
                }}>
                  {form.designerChoice && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: form.designerChoice ? "#fff" : "rgba(255,255,255,0.8)" }}>Complete Designer Control</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.4, marginTop: 2 }}>Skip the style selection — let our designer choose the best direction based on your content and purpose</div>
                </div>
              </GlassCard>
            </div>

            {/* ── COLOR PALETTE MODIFIER (only if a style is selected) ── */}
            {form.styleDir && !form.designerChoice && (
              <div style={{ animation: "fadeSlide 0.35s ease" }}>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22, marginTop: 4 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.65)", margin: "0 0 6px" }}>Customize the color palette?</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: "0 0 16px" }}>
                    Keep the style's default colors, or swap in a different palette
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                    {PALETTE_MODIFIERS.map(pm => {
                      const isActive = form.paletteModifier === pm.id;
                      return (
                        <GlassCard key={pm.id} active={isActive}
                          onClick={() => set("paletteModifier", pm.id)}
                          style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 18, flexShrink: 0 }}>{pm.icon}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? "#fff" : "rgba(255,255,255,0.7)" }}>{pm.label}</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", lineHeight: 1.3, marginTop: 1 }}>{pm.desc}</div>
                          </div>
                          {pm.colors && (
                            <div style={{ display: "flex", gap: 0, borderRadius: 4, overflow: "hidden", flexShrink: 0, border: `1px solid ${isActive ? NHBP.turquoise + "30" : "rgba(255,255,255,0.06)"}` }}>
                              {pm.colors.map((c, i) => (
                                <div key={i} style={{ width: 14, height: 16, background: c }} />
                              ))}
                            </div>
                          )}
                        </GlassCard>
                      );
                    })}
                  </div>

                  {form.paletteModifier === "custom" && (
                    <div style={{ marginTop: 14, animation: "fadeSlide 0.3s ease" }}>
                      <input ref={inputRef} placeholder="Describe the colors you're envisioning..."
                        value={form.customPalette} onChange={e => set("customPalette", e.target.value)}
                        style={{ width: "100%", maxWidth: 440, background: "transparent", border: "none", borderBottom: "2px solid rgba(255,255,255,0.1)", color: "#f0f0f0", fontSize: 14, fontFamily: "Tahoma, sans-serif", padding: "10px 0", outline: "none", caretColor: NHBP.turquoise }} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── DISCLAIMER ── */}
            <div style={{ marginTop: 20, padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", lineHeight: 1.6, margin: 0, textAlign: "center", fontStyle: "italic" }}>
                Style selections serve as a starting point for your designer. Final results may vary based on content, format, and brand requirements. Our team will work with you to refine the direction during the design process.
              </p>
            </div>
          </div>
        );
      }

      // ── STEP 6: Content Details ─────────────────────────
      case 5: {
        const wordCount = form.bodyText.trim() ? form.bodyText.trim().split(/\s+/).length : 0;

        // Completion checks for each section
        const done = {
          headline: form.headline.trim().length > 0,
          body: form.bodyText.trim().length > 0 || form.verbiageKeywords.length > 0,
          event: !!(form.eventDate || form.eventTime || form.eventLocation),
          contact: !!(form.contactTitle || form.contactName || form.contactPhone || form.contactEmail),
        };
        const doneCount = Object.values(done).filter(Boolean).length;


        return (
          <div style={slideStyle}>
            <StepLabel n={6} />
            <Q>Build your creative brief ✨</Q>
            <Hint>Fill in each card — watch them light up as you go</Hint>

            {/* Mini progress tracker */}
            <div style={{ display: "flex", gap: 6, marginBottom: 24, alignItems: "center" }}>
              {["✏️", "📝", "📅", "👤"].map((icon, i) => {
                const keys = ["headline", "body", "event", "contact"];
                const isDone = done[keys[i]];
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                      background: isDone ? `${NHBP.pink}20` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isDone ? NHBP.pink + "40" : "rgba(255,255,255,0.06)"}`,
                      fontSize: 13, transition: "all 0.4s ease",
                      boxShadow: isDone ? `0 0 10px ${NHBP.pink}20` : "none",
                    }}>{icon}</div>
                    {i < 3 && <div style={{
                      width: 20, height: 1,
                      background: isDone && done[keys[i+1]] ? NHBP.pink + "40" : "rgba(255,255,255,0.06)",
                      transition: "all 0.4s ease",
                    }} />}
                  </div>
                );
              })}
              <span style={{
                fontSize: 11, color: doneCount === 4 ? NHBP.pink : "rgba(255,255,255,0.2)",
                marginLeft: 8, fontWeight: 600, transition: "color 0.4s",
              }}>
                {doneCount}/4
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>

              {/* ── 1. HEADLINE ── */}
              <SectionCard id="headline" icon="✏️" title="Headline / Title Text" subtitle="The big text at the top" isDone={done.headline}>
                <input ref={inputRef} placeholder="What's the headline for this piece?"
                  value={form.headline} onChange={e => set("headline", e.target.value)}
                  style={{ ...inputStyle, fontSize: 18 }} />
              </SectionCard>

              {/* ── 2. BODY COPY ── */}
              <SectionCard id="body" icon="📝" title="Body Copy / Details" subtitle="All the words that tell the story" isDone={done.body}>

                {/* ── VERBIAGE HELP BUTTON ── */}
                <div style={{ marginBottom: 14 }}>
                  <button type="button" onClick={() => set("needVerbiage", !form.needVerbiage)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: "12px 16px", borderRadius: 12, cursor: "pointer",
                      background: form.needVerbiage ? `${NHBP.pink}12` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${form.needVerbiage ? NHBP.pink + "40" : "rgba(255,255,255,0.08)"}`,
                      transition: "all 0.3s ease", fontFamily: "Tahoma, sans-serif",
                      WebkitAppearance: "none", textAlign: "left",
                    }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      border: `2px solid ${form.needVerbiage ? NHBP.pink : "rgba(255,255,255,0.15)"}`,
                      background: form.needVerbiage ? NHBP.pink : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                    }}>
                      {form.needVerbiage && <span style={{ color: "#1a1a2e", fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: form.needVerbiage ? NHBP.pink : "rgba(255,255,255,0.6)", display: "block" }}>
                        Need help with verbiage? Click here!
                      </span>
                      <span style={{ fontSize: 10, color: form.needVerbiage ? `${NHBP.pink}90` : "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
                        (Trust us, you'd be happy if you did)
                      </span>
                    </div>
                  </button>
                </div>

                {/* ── KEYWORD PICKER (when checked) ── */}
                {form.needVerbiage && (() => {
                  const search = form.keywordSearch.toLowerCase();
                  const filtered = search
                    ? ALL_KEYWORDS.filter(k => k.toLowerCase().includes(search))
                    : null;
                  return (
                    <div style={{ marginBottom: 16, padding: "16px", background: "rgba(250,198,199,0.03)", border: `1px solid ${NHBP.pink}20`, borderRadius: 12, animation: "fadeSlide 0.3s ease" }}>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: "0 0 10px", lineHeight: 1.5 }}>
                        Select keywords that describe your project — a member of Communications will craft the copy for you.
                      </p>

                      {/* Selected keywords */}
                      {form.verbiageKeywords.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                          {form.verbiageKeywords.map(kw => (
                            <button key={kw} type="button"
                              onClick={() => set("verbiageKeywords", form.verbiageKeywords.filter(k => k !== kw))}
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 5,
                                padding: "6px 10px", borderRadius: 20, cursor: "pointer",
                                background: `${NHBP.pink}18`, border: `1px solid ${NHBP.pink}35`,
                                color: NHBP.pink, fontSize: 12, fontFamily: "Tahoma, sans-serif",
                                WebkitAppearance: "none", transition: "all 0.2s",
                              }}>
                              {kw} <span style={{ opacity: 0.6 }}>✕</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Search box */}
                      <div style={{ position: "relative", marginBottom: 12 }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.3, pointerEvents: "none" }}>🔍</span>
                        <input placeholder="Search keywords..."
                          value={form.keywordSearch}
                          onChange={e => set("keywordSearch", e.target.value)}
                          style={{ ...inputStyle, fontSize: 14, paddingLeft: 34 }} />
                      </div>

                      {/* Keyword categories or search results */}
                      <div style={{ maxHeight: 260, overflowY: "auto", paddingRight: 4 }}>
                        {filtered ? (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {filtered.length === 0 && (
                              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>No keywords match "{form.keywordSearch}"</span>
                            )}
                            {filtered.map(kw => {
                              const selected = form.verbiageKeywords.includes(kw);
                              return (
                                <button key={kw} type="button"
                                  onClick={() => set("verbiageKeywords",
                                    selected ? form.verbiageKeywords.filter(k => k !== kw)
                                      : [...form.verbiageKeywords, kw]
                                  )}
                                  style={{
                                    padding: "6px 12px", borderRadius: 20, cursor: "pointer",
                                    background: selected ? `${NHBP.turquoise}20` : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${selected ? NHBP.turquoise + "40" : "rgba(255,255,255,0.08)"}`,
                                    color: selected ? NHBP.turquoiseLight : "rgba(255,255,255,0.5)",
                                    fontSize: 12, fontFamily: "Tahoma, sans-serif",
                                    WebkitAppearance: "none", transition: "all 0.2s",
                                  }}>
                                  {kw}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          Object.entries(VERBIAGE_KEYWORDS).map(([cat, keywords]) => (
                            <div key={cat} style={{ marginBottom: 14 }}>
                              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{cat}</div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                {keywords.map(kw => {
                                  const selected = form.verbiageKeywords.includes(kw);
                                  return (
                                    <button key={kw} type="button"
                                      onClick={() => set("verbiageKeywords",
                                        selected ? form.verbiageKeywords.filter(k => k !== kw)
                                          : [...form.verbiageKeywords, kw]
                                      )}
                                      style={{
                                        padding: "5px 10px", borderRadius: 16, cursor: "pointer",
                                        background: selected ? `${NHBP.turquoise}20` : "rgba(255,255,255,0.03)",
                                        border: `1px solid ${selected ? NHBP.turquoise + "40" : "rgba(255,255,255,0.06)"}`,
                                        color: selected ? NHBP.turquoiseLight : "rgba(255,255,255,0.4)",
                                        fontSize: 11, fontFamily: "Tahoma, sans-serif",
                                        WebkitAppearance: "none", transition: "all 0.2s",
                                      }}>
                                      {kw}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add your own keyword */}
                      <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                        <input placeholder="Add your own keyword..."
                          value={form.customKeyword}
                          onChange={e => set("customKeyword", e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter" && form.customKeyword.trim()) {
                              e.preventDefault();
                              const kw = form.customKeyword.trim();
                              if (!form.verbiageKeywords.includes(kw)) {
                                set("verbiageKeywords", [...form.verbiageKeywords, kw]);
                              }
                              set("customKeyword", "");
                            }
                          }}
                          style={{ ...inputStyle, fontSize: 14, flex: 1 }} />
                        <button type="button"
                          onClick={() => {
                            const kw = form.customKeyword.trim();
                            if (kw && !form.verbiageKeywords.includes(kw)) {
                              set("verbiageKeywords", [...form.verbiageKeywords, kw]);
                            }
                            set("customKeyword", "");
                          }}
                          style={{
                            padding: "10px 16px", borderRadius: 10, cursor: "pointer",
                            background: form.customKeyword.trim() ? `${NHBP.turquoise}20` : "rgba(255,255,255,0.03)",
                            border: `1px solid ${form.customKeyword.trim() ? NHBP.turquoise + "40" : "rgba(255,255,255,0.06)"}`,
                            color: form.customKeyword.trim() ? NHBP.turquoiseLight : "rgba(255,255,255,0.2)",
                            fontSize: 12, fontWeight: 600, fontFamily: "Tahoma, sans-serif",
                            WebkitAppearance: "none", transition: "all 0.2s", flexShrink: 0,
                          }}>
                          + Add
                        </button>
                      </div>

                      {form.verbiageKeywords.length > 0 && (
                        <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                          {form.verbiageKeywords.length} keyword{form.verbiageKeywords.length !== 1 ? "s" : ""} selected
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* ── BODY TEXT ── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>Write your own body text</span>
                  <span style={{
                    fontSize: 10, fontFamily: "monospace",
                    color: wordCount > 600 ? NHBP.red : wordCount > 500 ? "#e0a630" : "rgba(255,255,255,0.2)",
                    transition: "color 0.3s",
                  }}>
                    {wordCount} / 600 words
                  </span>
                </div>
                <textarea placeholder="Enter your body text — include all the details you want on the piece. For tri-folds or longer formats, paste your full copy here."
                  value={form.bodyText} onChange={e => {
                    const words = e.target.value.trim().split(/\s+/);
                    if (e.target.value.trim() === "" || words.length <= 650) set("bodyText", e.target.value);
                  }}
                  style={{
                    ...inputStyle, minHeight: 140, resize: "vertical",
                    lineHeight: 1.7, borderRadius: 12, fontSize: 18,
                  }} />
                {wordCount > 600 && (
                  <p style={{ fontSize: 10, color: NHBP.red, margin: "6px 0 0", opacity: 0.8 }}>
                    Over the 600 word limit — please trim your copy
                  </p>
                )}

                {/* Both note */}
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", margin: "10px 0 0", lineHeight: 1.5, fontStyle: "italic", textAlign: "center" }}>
                  Both can be used — for us in Communications, the more we know the better the quality.
                </p>
              </SectionCard>

              {/* ── 3. DATE / TIME / LOCATION ── */}
              <SectionCard id="event" icon="📅" title="Date / Time / Location" subtitle="When and where is it happening?" isDone={done.event}>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>📆 Date</label>
                  <input type="date" value={form.eventDate}
                    onChange={e => set("eventDate", e.target.value)}
                    style={{ ...inputStyle, colorScheme: "dark", fontSize: 18 }} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>🕐 Time</label>
                  <input type="time" value={form.eventTime}
                    onChange={e => set("eventTime", e.target.value)}
                    style={{ ...inputStyle, colorScheme: "dark", fontSize: 18 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>📍 Location</label>
                  <input placeholder="Building name, room, address..."
                    value={form.eventLocation}
                    onChange={e => set("eventLocation", e.target.value)}
                    style={{ ...inputStyle, fontSize: 18 }} />
                </div>
              </SectionCard>

              {/* ── 4. CONTACT INFO ── */}
              <SectionCard id="contact" icon="👤" title="Contact Information" subtitle="Who should people reach out to?" isDone={done.contact}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", margin: "0 0 12px", lineHeight: 1.5 }}>
                  Appears on the final piece as: <span style={{ color: NHBP.turquoiseLight }}>Contact NHBP's [Title] [Name] | [Phone] or [Email]</span>
                </p>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <label style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>💼 Job Title</label>
                    <input placeholder="e.g. Photographer"
                      value={form.contactTitle} onChange={e => set("contactTitle", e.target.value)}
                      style={{ ...inputStyle, fontSize: 18 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <label style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>🏷️ Name</label>
                    <input placeholder="e.g. Johnathon Moulds"
                      value={form.contactName} onChange={e => set("contactName", e.target.value)}
                      style={{ ...inputStyle, fontSize: 18 }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <label style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>📞 Phone</label>
                    <input placeholder="e.g. 616.432.7200" type="tel"
                      value={form.contactPhone} onChange={e => set("contactPhone", e.target.value)}
                      style={{ ...inputStyle, fontSize: 18 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <label style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 6, fontWeight: 600 }}>✉️ Email</label>
                    <input placeholder="e.g. name@nhbp-nsn.gov" type="email"
                      value={form.contactEmail} onChange={e => set("contactEmail", e.target.value)}
                      style={{ ...inputStyle, fontSize: 18 }} />
                  </div>
                </div>
                {/* Live preview */}
                {(form.contactTitle || form.contactName) && (
                  <div style={{
                    marginTop: 14, padding: "12px 16px", borderRadius: 10,
                    background: `${NHBP.pink}08`, border: `1px solid ${NHBP.pink}20`,
                    animation: "fadeSlide 0.3s ease",
                  }}>
                    <span style={{ fontSize: 9, color: NHBP.pink, display: "block", marginBottom: 4, fontWeight: 600, letterSpacing: "0.1em" }}>LIVE PREVIEW</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                      Contact NHBP's {form.contactTitle || "[Job Title]"} {form.contactName || "[Name]"}
                      {(form.contactPhone || form.contactEmail) && " | "}
                      {form.contactPhone}{form.contactPhone && form.contactEmail && " or "}
                      {form.contactEmail}
                    </span>
                  </div>
                )}
              </SectionCard>

              {/* ── ALL DONE CELEBRATION ── */}
              {doneCount === 4 && (
                <div style={{
                  textAlign: "center", padding: "14px", animation: "fadeSlide 0.5s ease",
                }}>
                  <span style={{ fontSize: 24, display: "block", marginBottom: 6 }}>🎉</span>
                  <span style={{ fontSize: 13, color: NHBP.pink, fontWeight: 600 }}>All sections complete!</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", display: "block", marginTop: 2 }}>Hit Next to continue</span>
                </div>
              )}

            </div>
          </div>
        );
      }

      // ── STEP 7: Inspiration ───────────────────────────
      case 6:
        return (
          <div style={slideStyle}>
            <StepLabel n={7} />
            <Q>Any inspiration or references?</Q>
            <Hint>Screenshots, links, examples — anything that helps us understand your vision</Hint>
            <GlassCard style={{ padding: "32px 24px", textAlign: "center", borderStyle: "dashed", maxWidth: 480, marginBottom: 16 }}>
              <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>📎</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Drop images or screenshots here</span>
              <br />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>PNG, JPG, PDF up to 10MB each</span>
            </GlassCard>
            <textarea ref={inputRef} placeholder="Or describe what you're envisioning... paste links, mention designs you've seen, anything."
              value={form.notes} onChange={e => set("notes", e.target.value)}
              style={{
                width: "100%", maxWidth: 480, minHeight: 100, resize: "vertical",
                background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12,
                color: "#f0f0f0", fontSize: 14, fontFamily: "Tahoma, sans-serif",
                padding: "16px", outline: "none", lineHeight: 1.6, caretColor: NHBP.turquoise,
                boxSizing: "border-box", transition: "border-color 0.3s",
              }} />
          </div>
        );

      // ── STEP 8: Priority ──────────────────────────────
      case 7:
        return (
          <div style={slideStyle}>
            <StepLabel n={8} />
            <Q>How soon do you need this?</Q>
            <Hint>Helps us prioritize across all department requests</Hint>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 440, marginBottom: 20 }}>
              {VD_PRIORITIES.map(p => (
                <GlassCard key={p.id} active={form.priority === p.id}
                  onClick={() => set("priority", p.id)}
                  hoverGlow={p.color}
                  style={{
                    padding: "16px 20px", display: "flex", alignItems: "center", gap: 14,
                    borderColor: form.priority === p.id ? p.color + "50" : undefined,
                    boxShadow: form.priority === p.id ? `0 0 20px ${p.color}18` : undefined,
                  }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: p.color, flexShrink: 0, boxShadow: form.priority === p.id ? `0 0 10px ${p.color}50` : "none" }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{p.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{p.desc}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
            {form.priority === "urgent" && (
              <GlassCard style={{ padding: "14px 18px", maxWidth: 440, borderColor: NHBP.red + "25", animation: "fadeSlide 0.3s ease" }}>
                <p style={{ fontSize: 12, color: NHBP.pink, lineHeight: 1.6, margin: 0 }}>
                  ⚡ Urgent requests may require Director approval and are subject to current workload. We'll confirm feasibility within 4 hours.
                </p>
              </GlassCard>
            )}
            <div style={{ marginTop: 16 }}>
              <Hint>Have a specific date in mind? (optional)</Hint>
              <input type="date" value={form.deadline} onChange={e => set("deadline", e.target.value)}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#f0f0f0", fontSize: 14, fontFamily: "Tahoma, sans-serif", padding: "12px 16px", outline: "none", caretColor: NHBP.turquoise, colorScheme: "dark" }} />
            </div>
          </div>
        );

      // ── STEP 9: Review ────────────────────────────────
      case 8: {
        const selectedStyle = STYLES.find(s => s.id === form.styleDir);
        const activePalette = getActivePalette();
        const selectedModifier = PALETTE_MODIFIERS.find(m => m.id === form.paletteModifier);
        return (
          <div style={slideStyle}>
            <StepLabel n={9} />
            <Q>Review your request</Q>
            <Hint>Make sure everything looks right before submitting</Hint>
            <GlassCard style={{ padding: "22px 26px", maxWidth: 520 }}>
              {/* Type + Format row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>Creating</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    {PIECE_TYPES.find(p => p.id === form.pieceType)?.icon} {PIECE_TYPES.find(p => p.id === form.pieceType)?.label}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{FORMAT_OPTIONS.find(f => f.id === form.format)?.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                    {form.pieceType === "printed-media" ? (
                      form.multiPage ? `📚 ${[{id:"booklet",l:"Booklet"},{id:"pamphlet",l:"Pamphlet"},{id:"book",l:"Book"},{id:"program",l:"Program"},{id:"newsletter",l:"Newsletter"},{id:"catalog",l:"Catalog"},{id:"other-mp",l:"Other"}].find(t=>t.id===form.multiPageType)?.l || "Multi-Page"}${form.pageCount ? ` (${form.pageCount} pages)` : ""}`
                      : form.specialRequest ? "⭐ Special Request — follow-up needed"
                      : form.size === "custom" ? form.customSize
                      : PRINTED_MEDIA_SIZES.flatMap(c => c.sizes).find(s => s.id === form.size)?.label || form.size
                    ) : (
                      form.size === "custom" ? form.customSize : getSizes().find(s => s.id === form.size)?.label
                    )}
                  </div>
                </div>
              </div>

              {/* Style preview row */}
              {selectedStyle && !form.designerChoice && (
                <div style={{ display: "flex", gap: 14, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: 56, height: 42, borderRadius: 6, background: selectedStyle.gradient, flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 8, left: 6, width: "50%", height: 3, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                    <div style={{ position: "absolute", top: 14, left: 6, width: "30%", height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{selectedStyle.label}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Fonts: {selectedStyle.fontLabel}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                      <div style={{ display: "flex", gap: 0, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {activePalette.map((c, i) => <div key={i} style={{ width: 18, height: 12, background: c }} />)}
                      </div>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{selectedModifier?.label}</span>
                    </div>
                  </div>
                </div>
              )}
              {form.designerChoice && (
                <div style={{ display: "flex", gap: 14, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
                  <div style={{ width: 56, height: 42, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08))", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎨</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Complete Designer Control</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Style, fonts, and colors at designer's discretion</div>
                  </div>
                </div>
              )}

              {/* Purpose + Priority */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Purpose: </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{PURPOSES.find(p => p.id === form.purpose)?.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: VD_PRIORITIES.find(p => p.id === form.priority)?.color }}>
                  {VD_PRIORITIES.find(p => p.id === form.priority)?.label}
                </span>
              </div>

              {/* Content summary */}
              <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>Content provided:</div>
                {form.headline && (
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>Headline: </span>{form.headline}
                  </div>
                )}
                {(form.bodyText || form.needVerbiage) && (
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>Body: </span>
                    {form.bodyText.trim() ? `${form.bodyText.trim().split(/\s+/).length} words` : ""}
                    {form.bodyText.trim() && form.needVerbiage ? " + " : ""}
                    {form.needVerbiage ? `Verbiage requested (${form.verbiageKeywords.length} keywords)` : ""}
                  </div>
                )}
                {(form.eventDate || form.eventTime || form.eventLocation) && (
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>Event: </span>
                    {[form.eventDate, form.eventTime, form.eventLocation].filter(Boolean).join(" · ")}
                  </div>
                )}
                {(form.contactName || form.contactTitle) && (
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>Contact: </span>
                    {form.contactTitle} {form.contactName}{form.contactPhone ? ` | ${form.contactPhone}` : ""}{form.contactEmail ? ` | ${form.contactEmail}` : ""}
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        );
      }

      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <BG />
      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.03)", zIndex: 100 }}>
        <div style={{ height: "100%", borderRadius: "0 1px 1px 0", width: `${((step + 1) / totalSteps) * 100}%`, background: `linear-gradient(90deg, ${NHBP.turquoise}, ${NHBP.turquoiseLight})`, boxShadow: `0 0 12px ${NHBP.turquoiseGlow}`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>🐢 NHBP Communications</span>
        <span style={{ fontSize: 12, color: NHBP.turquoise, fontWeight: 600, letterSpacing: "0.04em" }}>Visual Design Request</span>
      </div>
      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 24px 120px", zIndex: 1, position: "relative", overflowY: "auto" }}>
        {renderStep()}
      </div>
      {/* Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: "linear-gradient(0deg, rgba(8,9,12,0.95) 50%, transparent)", backdropFilter: "blur(12px)" }}>
        <button onClick={goBack} disabled={step === 0}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 13, cursor: step === 0 ? "default" : "pointer", padding: "10px 16px", fontFamily: "Tahoma, sans-serif", opacity: step === 0 ? 0.3 : 1, transition: "opacity 0.3s" }}>
          ← Back
        </button>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              height: 5, borderRadius: 3, width: i === step ? 24 : 5,
              background: i === step ? NHBP.turquoise : i < step ? NHBP.turquoise + "45" : "rgba(255,255,255,0.08)",
              boxShadow: i === step ? `0 0 8px ${NHBP.turquoiseGlow}` : "none",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            }} />
          ))}
        </div>
        <button onClick={goNext} disabled={!canAdvance()}
          style={{
            background: canAdvance() ? `${NHBP.turquoise}12` : "transparent",
            border: `1px solid ${canAdvance() ? NHBP.turquoise + "28" : "rgba(255,255,255,0.04)"}`,
            color: canAdvance() ? NHBP.turquoiseLight : "rgba(255,255,255,0.15)",
            fontSize: 13, fontWeight: 600, cursor: canAdvance() ? "pointer" : "default",
            padding: "10px 20px", borderRadius: 10, fontFamily: "Tahoma, sans-serif",
            transition: "all 0.3s ease",
            boxShadow: canAdvance() ? `0 0 14px ${NHBP.turquoise}0a` : "none",
          }}>
          {step === totalSteps - 1 ? "Submit ✓" : "Next →"}
        </button>
      </div>
    </div>
  );
}



// ===========================================================
//  STATIONERY KIT FORM
// ===========================================================

// ─── EMBEDDED LOGOS (base64) ───
const NHBP_LOGO = "data:image/png;base64,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";
const TURTLE_LOGO = "data:image/png;base64,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";
const COURT_LOGO = "data:image/png;base64,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";

// ─── NHBP Brand Colors (from Brand Guidelines) ───

const ENTERPRISES = [
  { id: "nhbp", label: "Nottawaseppi Huron Band\nof the Potawatomi", shortLabel: "NHBP", icon: "🐢", desc: "Main tribal government offices" },
  { id: "tribal-court", label: "NHBP Tribal Court", shortLabel: "Tribal Court", icon: "⚖️", desc: "Tribal Court offices" },
  { id: "tribal-police", label: "NHBP Tribal Police", shortLabel: "Tribal Police", icon: "🛡️", desc: "Tribal Police department" },
];

// ─── OFFICE LOCATIONS ───
const OFFICE_LOCATIONS = [
  { id: "nhbp-main", enterprise: "nhbp", label: "NHBP Main Administration", displayLabel: "Nottawaseppi Huron Band of the Potawatomi", address: "1485 Mno-Bmadzewen Way", city: "Fulton", state: "MI", zip: "49052", website: "nhbp-nsn.gov" },
  { id: "nhbp-health-pc", enterprise: "nhbp", label: "NHBP Health | Pine Creek", displayLabel: "NHBP Health | Pine Creek", address: "1474 Mno-Bmadzewen Way", city: "Fulton", state: "MI", zip: "49052", website: "nhbp-nsn.gov" },
  { id: "nhbp-health-fk", enterprise: "nhbp", label: "NHBP Health | Firekeepers", displayLabel: "NHBP Health | Firekeepers", address: "11177 E. Michigan Ave.", city: "Battle Creek", state: "MI", zip: "49014", website: "nhbp-nsn.gov" },
  { id: "nhbp-health-gr", enterprise: "nhbp", label: "NHBP Health | Grand Rapids", displayLabel: "NHBP Health | Grand Rapids", address: "311 State Street", city: "Grand Rapids", state: "MI", zip: "49503", website: "nhbp-nsn.gov" },
  { id: "court-pc", enterprise: "tribal-court", label: "Tribal Court | Pine Creek", displayLabel: "Pine Creek Indian Reservation", address: "2221 1½ Mile Rd.", city: "Fulton", state: "MI", zip: "49052", website: "nhbp-nsn.gov" },
  { id: "police-pc", enterprise: "tribal-police", label: "Tribal Police | Pine Creek", displayLabel: "Pine Creek Indian Reservation", address: "2221 1½ Mile Rd.", city: "Fulton", state: "MI", zip: "49052", website: "nhbp-nsn.gov" },
];

const STATIONERY_ITEMS = [
  { id: "business-cards", icon: "💼", label: "Business Cards", desc: "Standard 3.5× 2\" with bleeds" },
  { id: "name-plate", icon: "🪧", label: "Name Plate", desc: "8.5\" × 5.5\" door/cube plate" },
  { id: "notepad", icon: "📝", label: "Personalized Notepad", desc: "Large notepad with name & dept" },
];

const ORDER_REASONS = [
  { id: "new-hire", label: "🆕 New Hire", desc: "First time order" },
  { id: "restock", label: "📦 Restock / Reorder", desc: "Same info, need more" },
  { id: "update", label: "✏️ Info Update", desc: "Name change, new title, etc." },
];


// ═══════════════════════════════════════════════
// PDF TEMPLATES (base64-encoded fillable PDFs)
// ═══════════════════════════════════════════════
const PDF_TEMPLATES = {
  nhbp: "JVBERi0xLjcNJeLjz9MNCjI0IDAgb2JqDTw8L0xpbmVhcml6ZWQgMS9MIDEyMDQzMy9PIDI3L0UgMjAwMjAvTiAyL1QgMTE5ODM4L0ggWyAxMDE2IDMwM10+Pg1lbmRvYmoNICAgICAgICAgICAgICAgIA14cmVmDQoyNCAzNg0KMDAwMDAwMDAxNiAwMDAwMCBuDQowMDAwMDAxMzE5IDAwMDAwIG4NCjAwMDAwMDE0NjIgMDAwMDAgbg0KMDAwMDAwMTU1NyAwMDAwMCBuDQowMDAwMDAyNTk0IDAwMDAwIG4NCjAwMDAwMDI2NDcgMDAwMDAgbg0KMDAwMDAwMjgzMyAwMDAwMCBuDQowMDAwMDAzMDA4IDAwMDAwIG4NCjAwMDAwMDMyMjIgMDAwMDAgbg0KMDAwMDAwMzM5OCAwMDAwMCBuDQowMDAwMDAzNjEwIDAwMDAwIG4NCjAwMDAwMDM3ODkgMDAwMDAgbg0KMDAwMDAwMzk5MiAwMDAwMCBuDQowMDAwMDA0MTcwIDAwMDAwIG4NCjAwMDAwMDQzNjIgMDAwMDAgbg0KMDAwMDAwNDU0MSAwMDAwMCBuDQowMDAwMDA0NTc2IDAwMDAwIG4NCjAwMDAwMDQ2ODkgMDAwMDAgbg0KMDAwMDAwNjA5MyAwMDAwMCBuDQowMDAwMDA3NTI5IDAwMDAwIG4NCjAwMDAwMDg5OTYgMDAwMDAgbg0KMDAwMDAxMDQxMyAwMDAwMCBuDQowMDAwMDExODIzIDAwMDAwIG4NCjAwMDAwMTI5MzQgMDAwMDAgbg0KMDAwMDAxMzIwMSAwMDAwMCBuDQowMDAwMDE0ODU3IDAwMDAwIG4NCjAwMDAwMTYwNjggMDAwMDAgbg0KMDAwMDAxODcxNiAwMDAwMCBuDQowMDAwMDE4NzQ3IDAwMDAwIG4NCjAwMDAwMTg3NzggMDAwMDAgbg0KMDAwMDAxODgwOSAwMDAwMCBuDQowMDAwMDE4ODQwIDAwMDAwIG4NCjAwMDAwMTg4NzEgMDAwMDAgbg0KMDAwMDAxOTQyOSAwMDAwMCBuDQowMDAwMDE5NzA0IDAwMDAwIG4NCjAwMDAwMDEwMTYgMDAwMDAgbg0KdHJhaWxlcg08PC9TaXplIDYwL1Jvb3QgMjUgMCBSL0luZm8gMjMgMCBSL0lEWzw1NjRCRkIxMzY2QkI0OTEzODM3ODRFMkQ5QTAzMzBCQz48QTdFM0RGMzc0NEVENDQ5OTkzQUJBQzI2MzcwN0YxMkM+XS9QcmV2IDExOTgyNz4+DXN0YXJ0eHJlZg0wDSUlRU9GDSAgICAgICAgICAgICAgICAgIA01OSAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvSSAyNjQvTGVuZ3RoIDIwNS9PIDIxMi9TIDgyL1QgMTY4L1YgMjI4Pj5zdHJlYW0NCmjeYmBgYGVgYGkHkR51DIIMCCAIFGNjYGHgeADkuH91mNnAgAJUTF5G9ECYGR0dDQwcDWBlQC4bA+PWCCCtCMRqYAVyDDwswu8ZC+ZwCuzgVNjGGbCW02ERZwArq2lc+NO5YVtTnCe8TV0yd/ECRgYBEFJk+Cr4QEBOgYFTYBPMPmEGxqN6QJoJxGH0BtoCpBgwwAYQwc3AuFMZKq8NxDxAvh+QZgdKgbwjxMAmYnhSL+JJyrGunHaWkgSgmDgD4yU9qJ5tAAEGADsDK5INZW5kc3RyZWFtDWVuZG9iag0yNSAwIG9iag08PC9BY3JvRm9ybSAyNiAwIFIvTGFuZyhlbi1VUykvTWV0YWRhdGEgMjIgMCBSL091dGxpbmVzIDExIDAgUi9QYWdlcyAyMSAwIFIvVHlwZS9DYXRhbG9nL1ZpZXdlclByZWZlcmVuY2VzPDwvRGlyZWN0aW9uL0wyUj4+Pj4NZW5kb2JqDTI2IDAgb2JqDTw8L0RSPDwvRm9udDw8L0x1eHVyeS1Hb2xkIDEzIDAgUi9NaW5pb25Qcm8tUmVndWxhciAxNCAwIFI+Pj4+L0ZpZWxkcyAxMiAwIFI+Pg1lbmRvYmoNMjcgMCBvYmoNPDwvQW5ub3RzIDI4IDAgUi9BcnRCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vQmxlZWRCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vQ29udGVudHNbNDEgMCBSIDQyIDAgUiA0MyAwIFIgNDQgMCBSIDQ1IDAgUiA0NiAwIFIgNDggMCBSIDQ5IDAgUl0vQ3JvcEJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9NZWRpYUJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9QYXJlbnQgMjEgMCBSL1Jlc291cmNlczw8L0NvbG9yU3BhY2U8PC9DUzAgMzkgMCBSPj4vRXh0R1N0YXRlPDwvR1MwIDQwIDAgUj4+L0ZvbnQ8PC9UMV8wIDQ3IDAgUj4+L1Byb2NTZXRbL1BERi9UZXh0XT4+L1JvdGF0ZSAwL1RhYnMvVy9UaHVtYiAxOSAwIFIvVHJpbUJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9UeXBlL1BhZ2UvUGllY2VJbmZvPDwvSW5EZXNpZ248PC9Eb2N1bWVudElEPEZFRkYwMDc4MDA2RDAwNzAwMDJFMDA2NDAwNjkwMDY0MDAzQTAwMzYwMDM4MDA2MjAwMzgwMDM3MDAzNzAwNjEwMDM0MDAyRDAwNjQwMDM5MDA2NjAwMzMwMDJEMDAzNDAwMzUwMDYzMDAzODAwMkQwMDM5MDA2MjAwNjYwMDM2MDAyRDAwMzUwMDM5MDA2MzAwMzkwMDM1MDAzNzAwNjUwMDMzMDA2NTAwNjYwMDYxMDAzMT4vTGFzdE1vZGlmaWVkPEZFRkYwMDQ0MDAzQTAwMzIwMDMwMDAzMjAwMzYwMDMwMDAzMjAwMzAwMDM5MDAzMDAwMzAwMDMyMDAzNDAwMzIwMDMwMDA1QT4vTnVtYmVyb2ZQYWdlcyAxL09yaWdpbmFsRG9jdW1lbnRJRDxGRUZGMDA3ODAwNkQwMDcwMDAyRTAwNjQwMDY5MDA2NDAwM0EwMDMxMDA2MTAwMzgwMDY2MDAzMzAwNjQwMDMyMDAzOTAwMkQwMDMwMDA2MzAwNjQwMDM2MDAyRDAwMzQwMDYyMDAzMzAwMzgwMDJEMDA2MTAwNjYwMDM1MDA2MjAwMkQwMDM4MDAzNzAwMzgwMDYxMDA2NTAwNjUwMDYxMDAzNjAwMzQwMDY1MDAzNTAwNjM+L1BhZ2VUcmFuc2Zvcm1hdGlvbk1hdHJpeExpc3Q8PC8wWzEuMCAwLjAgMC4wIDEuMCAwLjAgMC4wXT4+L1BhZ2VVSURMaXN0PDwvMCAyNjA+Pi9QYWdlV2lkdGhMaXN0PDwvMCAzMTIuMD4+Pj4+Pj4+DWVuZG9iag0yOCAwIG9iag1bMjkgMCBSIDMxIDAgUiAzMyAwIFIgMzUgMCBSIDM3IDAgUl0NZW5kb2JqDTI5IDAgb2JqDTw8L0FQPDwvTiAzMCAwIFI+Pi9CUzw8L1MvUy9XIDE+Pi9EQSgvTHV4dXJ5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NLvszjAMvzSvjXcZ+EcKpsUMvfM24RTmZBA6HJxnxwqsM/kxld+MOjJO5HaZMo6N7wOTEvgnLaecFtidbehwz/h7spicH2D3fWn3wNs5xh8c0WcQoBRY7EnopuObHhF4oR0aS3uXlwNx/i6+lohQlfm4mTHB4hS1waT9gEwKKgXySqUYevtv/7Kxut7cdWLydKZbIQiYrE+lJ6C+3vparYqVKBPBqvjgrtoUATyNmzkl8lxyKmZXm87jM8oYIhBrfexXgAEALRF2nw1lbmRzdHJlYW0NZW5kb2JqDTEgMCBvYmoNPDwvQW5ub3RzIDIgMCBSL0FydEJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9CbGVlZEJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9Db250ZW50cyAzIDAgUi9Dcm9wQm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL01lZGlhQm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL1BhcmVudCAyMSAwIFIvUmVzb3VyY2VzPDwvQ29sb3JTcGFjZTw8L0NTMCAzOSAwIFI+Pi9FeHRHU3RhdGU8PC9HUzAgNDAgMCBSPj4+Pi9Sb3RhdGUgMC9UYWJzL1cvVGh1bWIgMjAgMCBSL1RyaW1Cb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vVHlwZS9QYWdlL1BpZWNlSW5mbzw8L0luRGVzaWduPDwvRG9jdW1lbnRJRDxGRUZGMDA3ODAwNkQwMDcwMDAyRTAwNjQwMDY5MDA2NDAwM0EwMDM2MDAzODAwNjIwMDM4MDAzNzAwMzcwMDYxMDAzNDAwMkQwMDY0MDAzOTAwNjYwMDMzMDAyRDAwMzQwMDM1MDA2MzAwMzgwMDJEMDAzOTAwNjIwMDY2MDAzNjAwMkQwMDM1MDAzOTAwNjMwMDM5MDAzNTAwMzcwMDY1MDAzMzAwNjUwMDY2MDA2MTAwMzE+L0xhc3RNb2RpZmllZDxGRUZGMDA0NDAwM0EwMDMyMDAzMDAwMzIwMDM2MDAzMDAwMzIwMDMwMDAzOTAwMzAwMDMwMDAzMjAwMzQwMDMyMDAzMDAwNUE+L0xpbmtlZEltYWdlczw8Pj4vTnVtYmVyb2ZQYWdlcyAxL09yaWdpbmFsRG9jdW1lbnRJRDxGRUZGMDA3ODAwNkQwMDcwMDAyRTAw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WjRkdXBgCkUxciEvLCowWyo5LmFGSVIyJmItQyNzPFhsNUZIQFs8PSEjNlYpdURCWG5Jci5GPm9SWjdEbCVNTFlcLj9kPk1uCjYlUTJvWWZOUkYkJCtPTjwrXVJVSm1DMEk8amxMLm9YaXNaO1NZVVsvNyM8JjM3cmNsUUtxZUplIyxVRjdSZ2IxClZOV0ZLZj5uRFo0T1RzMFMhc2FHPkdHS1VsUSpRPzQ1OkNJJjRKJ18yajxldEpJQ2o3ZTduUE1iPU82UzdVT0g8ClBPN3JcSS5IdSZlMGQmRTwuJylmRVJyL2wrKlcsKXFeRCphaTU8dXVMWC43Zy8+JFhLcmNZcDBuK1hsX25VKk8oCmxbJDZObitaX05xMF1zN2hzXWBYWDFuWjgmOTRhXH4+DWVuZHN0cmVhbQ1lbmRvYmoNOCAwIG9iag08PC9CQ1tdL0JHW10+Pg1lbmRvYmoNOSAwIG9iag08PC9CQm94WzAuMCAxNjEuNSA0OS42MjUgMC4wXS9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDIyL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vUmVzb3VyY2VzPDw+Pi9TdWJ0eXBlL0Zvcm0+PnN0cmVhbQ0KSInSD6lQcPJ1VuByBREAAQYAGgEDFw1lbmRzdHJlYW0NZW5kb2JqDTEwIDAgb2JqDTw8L0FQPDwvTiA5IDAgUj4+L0JTPDwvUy9TL1cgMT4+L0RBKC9MdXh1cnktR29sZCAxMiBUZiAwIGcpL0YgNC9GVC9UeC9GZiAzL01LIDggMCBSL1AgMSAwIFIvUSAwL1JlY3RbMjQxLjUgMjEuNjI1IDI5MS4xMjUgMTgzLjEyNV0vU3VidHlwZS9XaWRnZXQvVChOSEJQIE1haW4pL1RVKE5IQlAgR292ZXJubWVudCkvVHlwZS9Bbm5vdD4+DWVuZG9iag0xMSAwIG9iag08PC9Db3VudCAwL1R5cGUvT3V0bGluZXM+Pg1lbmRvYmoNMTIgMCBvYmoNWzMxIDAgUiAyOSAwIFIgMzMgMCBSIDM1IDAgUiAzNyAwIFIgMTAgMCBSXQ1lbmRvYmoNMTMgMCBvYmoNPDwvQmFzZUZvbnQvTHV4dXJ5LUdvbGQvRW5jb2RpbmcgMTcgMCBSL0ZpcnN0Q2hhciAwL0ZvbnREZXNjcmlwdG9yIDE4IDAgUi9MYXN0Q2hhciAyNTUvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQvV2lkdGhzWzUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgMjgyIDI3MyAzNzcgNTU4IDgwNCAxMDIxIDg5NSAyMTIgMzI1IDMyNSA0NDAgNDk0IDI4MyAzNDAgMjgzIDQxNCA5MDYgNDA2IDczNyA3NTggNzg5IDc2MSA4MTggNzQ4IDgyNiA4MTggMjkzIDI5MyA0NzkgNDcwIDQ3OSA2ODggMTA2OSA5MDUgODgxIDgzNiA5MDAgNzkyIDc2NSA4NzYgOTE3IDI4OSA3MTYgODY3IDc1OSAxMDE1IDkwNSA5NDYgODYyIDk0NiA4NzAgODI2IDgwMyA5MDYgOTA1IDEyMjUgODI4IDgwMyA3NzIgMzQ5IDQxNCAzNDkgNTk1IDQ2NiA1MDAgNjg2IDczNyA2NTQgNzM3IDY4NSA0ODUgNzExIDcyNyAyNTMgMjUzIDY3NSAyNTMgMTEzNiA3MjcgNzM0IDczNyA3MzcgNDk2IDY0OCA0ODcgNzI3IDc0NyA5OTUgNjgxIDcxNCA2MzIgMzc0IDI3NSAzNzQgNTAwIDUwMCA5MDUgOTA1IDgzNiA3OTIgOTA1IDk0NiA5MDYgNjg2IDY4NiA2ODYgNjg2IDY4NiA2ODYgNjU0IDY4NSA2ODUgNjg1IDY4NSAyNTMgMjUzIDI1MyAyNTMgNzI3IDczNCA3MzQgNzM0IDczNCA3MzQgNzI3IDcyNyA3MjcgNzI3IDUwMCAzOTAgNjU0IDcxMCA3OTIgNDg4IDgwOCA3NjIgNDcxIDk0NiA3NzIgNTAwIDUwMCA1MDAgMTM4OSA5NDYgNTAwIDUwMCA1MDAgNTAwIDc3MSA3MjcgNTAwIDUwMCA1MDAgNTAwIDUwMCA1NTAgNTg1IDUwMCAxMTc0IDczNCA2ODggMjczIDYzMCA1MDAgNTMwIDUwMCA1MDAgNTA2IDUwNiA4MDMgNTAwIDkwNSA5MDUgOTQ2IDE0MjMgMTI0NyA1NDAgNzQwIDQyMCA0MjAgMjM2IDIzNiA0OTQgNTAwIDcxNCA4MDMgMjYyIDg5MSAzMDAgMzAwIDcwOCA3MDggNTAwIDI4MyAyMzYgNDIwIDE1MDMgOTA1IDc5MiA5MDUgNzkyIDc5MiAyODkgMjg5IDI4OSAyODkgOTQ2IDk0NiA1MDAgOTQ2IDkwNiA5MDYgOTA2IDI1MyA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDBdPj4NZW5kb2JqDTE0IDAgb2JqDTw8L0Jhc2VGb250L01pbmlvblByby1SZWd1bGFyL0VuY29kaW5nIDE1IDAgUi9GaXJzdENoYXIgMC9Gb250RGVzY3JpcHRvciAxNiAwIFIvTGFzdENoYXIgMjU1L1N1YnR5cGUvVHlwZTEvVHlwZS9Gb250L1dpZHRoc1s1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDIyNyAyNzYgMzE4IDQ4MCA0ODAgNzU2IDcxMSAxNjkgMzQ2IDM0NiA0MDQgNTgwIDIyOCAzNTYgMjI4IDMzMSA0ODAgNDgwIDQ4MCA0ODAgNDgwIDQ4MCA0ODAgNDgwIDQ4MCA0ODAgMjI4IDIyOCA1NTIgNTgwIDU1MiAzNzkgNzUzIDY5MSA1ODggNjY1IDczNSA1NjggNTI5IDcxNSA3NjYgMzQxIDMyOSA2NzMgNTM4IDg5MSA3NDMgNzQ3IDU2MyA3NDUgNjIxIDQ3NCA2MTcgNzM2IDcwMyA5NzEgNjU0IDYzNCA2MDMgMzQ1IDMzMyAzNDUgNTY2IDUwMCA0MDAgNDM5IDUwOCA0MjMgNTI4IDQyNSAyOTYgNDY4IDUzNCAyNjggMjU2IDQ5NiAyNTMgODE5IDU0NyA1MTAgNTI0IDUxMSAzNzEgMzY3IDMwNSA1MzEgNDYzIDY4NSA0NzIgNDU5IDQyMCAzNDcgMjYzIDM0NyA1ODAgNTAwIDY5MSA2OTEgNjYxIDU2OCA3NDMgNzQ3IDczNiA0MzkgNDM5IDQzOSA0MzkgNDM5IDQzOSA0MjEgNDI1IDQyNSA0MjUgNDI1IDI2OCAyNjggMjY4IDI2OCA1NDcgNTEwIDUxMCA1MTAgNTEwIDUxMCA1MzEgNTMxIDUzMSA1MzEgNDkwIDM0MyA0ODAgNDgwIDQ3NyAzOTAgNDk3IDU0NSAzMjEgNzAyIDQ1OSA0MDAgNDAwIDUwMCA4NjkgNzQ5IDUwMCA1ODAgNTAwIDUwMCA0ODAgNTEyIDUwMCA1MDAgNTAwIDUwMCA1MDAgMzA1IDMzNCA1MDAgNjcxIDUxMyAzNzkgMjc2IDU4MCA1MDAgNDgwIDUwMCA1MDAgNDQ0IDQ0NSA5NzAgNTAwIDY5MSA2OTEgNzQ3IDk3MyA3NzAgNTIwIDkyMiAzOTggNDAxIDIyNCAyMjMgNTgwIDUwMCA0NTkgNjM0IDE1OSA0ODAgMjc5IDI3OSA1MzUgNTMzIDQ4OSAyMjYgMjM5IDQyOSAxMDYyIDY5MSA1NjggNjkxIDU2OCA1NjggMzQxIDM0MSAzNDEgMzQxIDc0NyA3NDcgNTAwIDc0NyA3MzYgNzM2IDczNiAyNjggNDAwIDQwMCA0MDAgNDAwIDQwMCA0MDAgNDAwIDQwMCA0MDAgNDAwXT4+DWVuZG9iag0xNSAwIG9iag08PC9CYXNlRW5jb2RpbmcvTWFjUm9tYW5FbmNvZGluZy9EaWZmZXJlbmNlc1syMTkvRXVyb10vVHlwZS9FbmNvZGluZz4+DWVuZG9iag0xNiAwIG9iag08PC9Bc2NlbnQgOTg5L0NhcEhlaWdodCA2NTEvRGVzY2VudCAtMzYwL0ZsYWdzIDM0L0ZvbnRCQm94Wy0yOTAgLTM2MCAxNjg0IDk4OV0vRm9udEZhbWlseShNaW5pb24gUHJvKS9Gb250TmFtZS9NaW5pb25Qcm8tUmVndWxhci9Gb250U3RyZXRjaC9Ob3JtYWwvRm9udFdlaWdodCA0MDAvSXRhbGljQW5nbGUgMC9TdGVtViA4MC9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgNDM3Pj4NZW5kb2JqDTE3IDAgb2JqDTw8L0Jhc2VFbmNvZGluZy9NYWNSb21hbkVuY29kaW5nL0RpZmZlcmVuY2VzWzIxOS9FdXJvXS9UeXBlL0VuY29kaW5nPj4NZW5kb2JqDTE4IDAgb2JqDTw8L0FzY2VudCA4NTQvQ2FwSGVpZ2h0IDYyNC9EZXNjZW50IC0yNTQvRmxhZ3MgMzIvRm9udEJCb3hbLTE5MCAtMjU0IDE1NTEgODU0XS9Gb250RmFtaWx5KEx1eHVyeSBHb2xkKS9Gb250TmFtZS9MdXh1cnktR29sZC9Gb250U3RyZXRjaC9Ob3JtYWwvRm9udFdlaWdodCA0MDAvSXRhbGljQW5nbGUgMC9TdGVtViA5Ni9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgNDQ5Pj4NZW5kb2JqDTE5IDAgb2JqDTw8L0JpdHNQZXJDb21wb25lbnQgOC9Db2xvclNwYWNlIDYgMCBSL0ZpbHRlclsvQVNDSUk4NURlY29kZS9GbGF0ZURlY29kZV0vSGVpZ2h0IDI1L0xlbmd0aCAyMzUvV2lkdGggMzk+PnN0cmVhbQ0KODtYRjMwYjIpRCRxNlJsYi9iJDRKVz8+QzgxK201RE5JVyhAQ0wmWC1PdUB0JEhSQ2VnK2lkLEhNVyNXUFo2V2wKLmhubUMiOj9acioqLFtkNjYndDYkRFwqVik2YXAvPFhMJiFlajo9SmhWWTNRY2wjN0QyVj8rU2h0MEtdZkxuYlIKWVwqTiU9Jz42T1spbUxnNkFsKENLQUVvXl9lbSxwUDIhbWNvPC5nY2E1aEY2cDAyRSZlX0UuPC1UP2xAJk04bFIKbUNtX3FKJ0cqMzA6PyV0RVEuIilzKzlUTSQiYHU2PUxyb0V+Pg1lbmRzdHJlYW0NZW5kb2JqDTIwIDAgb2JqDTw8L0JpdHNQZXJDb21wb25lbnQgOC9Db2xvclNwYWNlIDYgMCBSL0ZpbHRlclsvQVNDSUk4NURlY29kZS9GbGF0ZURlY29kZV0vSGVpZ2h0IDI1L0xlbmd0aCAxOTEvV2lkdGggMzk+PnN0cmVhbQ0KODtaXHNZbW5KayRqPTgwLm45Ij5BLThjNCs8RGswUT02PzotO2Jcczg4M11GcEd1JiY7XyhpOT05Py4qIyFiciUKJT1Aai02OEJKLCovPUdIO2wycmptcWskJlRkP0QvVS8pLl1vV1FXIWNqRksnQS89XU9EVWA+JTFDUT5ROUM7I28KYyJRQDwlSUJKLG0lSEdRSCNAaEVmbD9uOXFxYlEzaEokbkZhMi4jYnJrZEM4PilaX2ghNTA4PThjfj4NZW5kc3RyZWFtDWVuZG9iag0yMSAwIG9iag08PC9Db3VudCAyL0tpZHNbMjcgMCBSIDEgMCBSXS9UeXBlL1BhZ2VzPj4NZW5kb2JqDTIyIDAgb2JqDTw8L0xlbmd0aCAyNDg2L1N1YnR5cGUvWE1ML1R5cGUvTWV0YWRhdGE+PnN0cmVhbQ0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgMTAuMC1jMDAwIDI1LkcuZWY3MmU0ZSwgMjAyNS8wNi8yNy0xODo1NDowNSAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIj4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjYtMDItMDhUMTk6MjQ6MjAtMDU6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDI2LTAyLTA4VDE5OjI0OjIyLTA1OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAyNi0wMi0wOFQxOToyNDoyMi0wNTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW5EZXNpZ24gMjEuMiAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD51dWlkOjM5OGMyMWI2LWU5ZDItNzA0Yi1hODNjLTBkYTllY2RmZTI1YjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjFhOGYzZDI5LTBjZDYtNGIzOC1hZjViLTg3OGFlZWE2NGU1YzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuaWQ6M2NjZDgwMWQtMmRlOS00MGIyLWE2ZjQtNTBkMmJiNjZjMWNkPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06UmVuZGl0aW9uQ2xhc3M+cHJvb2Y6cGRmPC94bXBNTTpSZW5kaXRpb25DbGFzcz4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi94LWluZGVzaWduIHRvIGFwcGxpY2F0aW9uL3BkZjwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSW5EZXNpZ24gMjEuMiAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyNi0wMi0wOFQxOToyNDoyMC0wNTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjYwOTFjYjBmLWMwNWItNGIyMS1iMWYzLTVlODZkOTBkNzcwODwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo2OGI4NzdhNC1kOWYzLTQ1YzgtOWJmNi01OWM5NTdlM2VmYTE8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDoxYThmM2QyOS0wY2Q2LTRiMzgtYWY1Yi04NzhhZWVhNjRlNWM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOnJlbmRpdGlvbkNsYXNzPmRlZmF1bHQ8L3N0UmVmOnJlbmRpdGlvbkNsYXNzPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8ZGM6Zm9ybWF0PmFwcGxpY2F0aW9uL3BkZjwvZGM6Zm9ybWF0PgogICAgICAgICA8cGRmOlByb2R1Y2VyPkFkb2JlIFBERiBMaWJyYXJ5IDE4LjA8L3BkZjpQcm9kdWNlcj4KICAgICAgICAgPHBkZjpUcmFwcGVkPkZhbHNlPC9wZGY6VHJhcHBlZD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz4NZW5kc3RyZWFtDWVuZG9iag0yMyAwIG9iag08PC9DcmVhdGlvbkRhdGUoRDoyMDI2MDIwODE5MjQyMC0wNScwMCcpL0NyZWF0b3IoQWRvYmUgSW5EZXNpZ24gMjEuMiBcKE1hY2ludG9zaFwpKS9Nb2REYXRlKEQ6MjAyNjAyMDgxOTI0MjItMDUnMDAnKS9Qcm9kdWNlcihBZG9iZSBQREYgTGlicmFyeSAxOC4wKS9UcmFwcGVkL0ZhbHNlPj4NZW5kb2JqDXhyZWYNCjAgMjQNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAyMDAyMCAwMDAwMCBuDQowMDAwMDIxMDAyIDAwMDAwIG4NCjAwMDAwMjEwMjYgMDAwMDAgbg0KMDAwMDAyMTM2MyAwMDAwMCBuDQowMDAwMTEyMDM4IDAwMDAwIG4NCjAwMDAxMTIyNjMgMDAwMDAgbg0KMDAwMDExMjMwOSAwMDAwMCBuDQowMDAwMTEyODIxIDAwMDAwIG4NCjAwMDAxMTI4NTEgMDAwMDAgbg0KMDAwMDExMzAyNiAwMDAwMCBuDQowMDAwMTEzMjM0IDAwMDAwIG4NCjAwMDAxMTMyNzcgMDAwMDAgbg0KMDAwMDExMzMzNyAwMDAwMCBuDQowMDAwMTE0NTA4IDAwMDAwIG4NCjAwMDAxMTU2NzYgMDAwMDAgbg0KMDAwMDExNTc2MyAwMDAwMCBuDQowMDAwMTE1OTk5IDAwMDAwIG4NCjAwMDAxMTYwODYgMDAwMDAgbg0KMDAwMDExNjMxNyAwMDAwMCBuDQowMDAwMTE2NjkyIDAwMDAwIG4NCjAwMDAxMTcwMjMgMDAwMDAgbg0KMDAwMDExNzA4MiAwMDAwMCBuDQowMDAwMTE5NjQ1IDAwMDAwIG4NCnRyYWlsZXINPDwvU2l6ZSAyNC9JRFs8NTY0QkZCMTM2NkJCNDkxMzgzNzg0RTJEOUEwMzMwQkM+PEE3RTNERjM3NDRFRDQ0OTk5M0FCQUMyNjM3MDdGMTJDPl0+Pg1zdGFydHhyZWYNMTE2DSUlRU9GDQ==",
  "tribal-court": "JVBERi0xLjcNJeLjz9MNCjIxIDAgb2JqDTw8L0xpbmVhcml6ZWQgMS9MIDk1MjA4L08gMjQvRSAxNjExOC9OIDIvVCA5NDY3My9IIFsgMTA5NiAzMDBdPj4NZW5kb2JqDSAgICAgICAgICAgICAgICAgIA14cmVmDQoyMSA0MA0KMDAwMDAwMDAxNiAwMDAwMCBuDQowMDAwMDAxMzk2IDAwMDAwIG4NCjAwMDAwMDE1MzkgMDAwMDAgbg0KMDAwMDAwMTYwOSAwMDAwMCBuDQowMDAwMDAyNjU3IDAwMDAwIG4NCjAwMDAwMDI3MTcgMDAwMDAgbg0KMDAwMDAwMjkwNiAwMDAwMCBuDQowMDAwMDAzMDg1IDAwMDAwIG4NCjAwMDAwMDMyNzIgMDAwMDAgbg0KMDAwMDAwMzQ0OSAwMDAwMCBuDQowMDAwMDAzNjM2IDAwMDAwIG4NCjAwMDAwMDM4MTMgMDAwMDAgbg0KMDAwMDAwNDAwMCAwMDAwMCBuDQowMDAwMDA0MTc3IDAwMDAwIG4NCjAwMDAwMDQzODUgMDAwMDAgbg0KMDAwMDAwNDU2MSAwMDAwMCBuDQowMDAwMDA0NzcxIDAwMDAwIG4NCjAwMDAwMDQ5NDkgMDAwMDAgbg0KMDAwMDAwNTM4MCAwMDAwMCBuDQowMDAwMDA1NDE1IDAwMDAwIG4NCjAwMDAwMDU1MjggMDAwMDAgbg0KMDAwMDAwNTg4NSAwMDAwMCBuDQowMDAwMDA2MzUwIDAwMDAwIG4NCjAwMDAwMDY5NjcgMDAwMDAgbg0KMDAwMDAwNzUzNyAwMDAwMCBuDQowMDAwMDA4MTA1IDAwMDAwIG4NCjAwMDAwMDg3MTEgMDAwMDAgbg0KMDAwMDAwOTM0MiAwMDAwMCBuDQowMDAwMDA5OTkzIDAwMDAwIG4NCjAwMDAwMTA0NjEgMDAwMDAgbg0KMDAwMDAxMDgwOSAwMDAwMCBuDQowMDAwMDEzNDU3IDAwMDAwIG4NCjAwMDAwMTU4MjEgMDAwMDAgbg0KMDAwMDAxNTg1MiAwMDAwMCBuDQowMDAwMDE1ODgzIDAwMDAwIG4NCjAwMDAwMTU5MTQgMDAwMDAgbg0KMDAwMDAxNTk0NSAwMDAwMCBuDQowMDAwMDE1OTc2IDAwMDAwIG4NCjAwMDAwMTYwMDcgMDAwMDAgbg0KMDAwMDAwMTA5NiAwMDAwMCBuDQp0cmFpbGVyDTw8L1NpemUgNjEvUm9vdCAyMiAwIFIvSW5mbyAyMCAwIFIvSURbPDlCMTc3NkE4OUQ5NzRFNTZCRTQ4QUY0RkY4MDg2OERDPjwxRkMyMkVGOEI1OTQ0QkRFODQzNTc1MUFGQUY2OUNDNj5dL1ByZXYgOTQ2NjI+Pg1zdGFydHhyZWYNMA0lJUVPRg0gICAgICAgICAgICAgICAgICAgDTYwIDAgb2JqDTw8L0ZpbHRlci9GbGF0ZURlY29kZS9JIDI3NS9MZW5ndGggMjAyL08gMjIzL1MgOTAvVCAxNzkvViAyMzk+PnN0cmVhbQ0KaN5iYGBgZ2Bguc7AysBg8ZlBgAEBBIBibAwsDBwfgJyHm04xYAJGliCfn3dKYFyOjo6OBiDVAFIP4jMwRuQDaVUg1gCrkGfgYSr+yXhhHqfDHE4FCNrIKbCZ03ACg0OQSOImlUXSipPsVZtypANtF8+UhdvEysAvJ/gD4TTGpDdAmgnsCD+Q4xkYMZ3HDnQIAzcDY8wWqLw2EPMA+feBNAsDAxsvkBZiYNO55C5i3lKTwdGyoq/nAFBMhIEx/wlUzzaAAAMA8kUqvw1lbmRzdHJlYW0NZW5kb2JqDTIyIDAgb2JqDTw8L0Fjcm9Gb3JtIDIzIDAgUi9MYW5nKGVuLVVTKS9NZXRhZGF0YSAxOSAwIFIvT3V0bGluZXMgMTEgMCBSL1BhZ2VzIDE4IDAgUi9UeXBlL0NhdGFsb2cvVmlld2VyUHJlZmVyZW5jZXM8PC9EaXJlY3Rpb24vTDJSPj4+Pg1lbmRvYmoNMjMgMCBvYmoNPDwvRFI8PC9Gb250PDwvTHV4dXJ5LUdvbGQgMTMgMCBSPj4+Pi9GaWVsZHMgMTIgMCBSPj4NZW5kb2JqDTI0IDAgb2JqDTw8L0Fubm90cyAyNSAwIFIvQXJ0Qm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL0JsZWVkQm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL0NvbnRlbnRzWzQzIDAgUiA0NCAwIFIgNDUgMCBSIDQ2IDAgUiA0NyAwIFIgNDggMCBSIDQ5IDAgUiA1MCAwIFJdL0Nyb3BCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vTWVkaWFCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vUGFyZW50IDE4IDAgUi9SZXNvdXJjZXM8PC9Db2xvclNwYWNlPDwvQ1MwIDM5IDAgUj4+L0V4dEdTdGF0ZTw8L0dTMCA0MCAwIFIvR1MxIDU5IDAgUj4+L0ZvbnQ8PC9UMV8wIDM4IDAgUj4+L1Byb2NTZXRbL1BERi9UZXh0XT4+L1JvdGF0ZSAwL1RhYnMvVy9UaHVtYiAxNiAwIFIvVHJpbUJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9UeXBlL1BhZ2UvUGllY2VJbmZvPDwvSW5EZXNpZ248PC9Eb2N1bWVudElEPEZFRkYwMDc4MDA2RDAwNzAwMDJFMDA2NDAwNjkwMDY0MDAzQTAwNjQwMDMzMDAzNDAwNjUwMDM2MDAzNDAwMzYwMDYzMDAyRDAwMzAwMDMwMDA2MzAwMzgwMDJEMDAzNDAwMzAwMDYzMDA2MjAwMkQwMDM4MDA2NTAwMzcwMDM5MDAyRDAwMzcwMDM4MDAzNjAwMzQwMDM2MDA2NjAwMzEwMDM4MDAzMTAwMzkwMDYxMDAzOT4vTGFzdE1vZGlmaWVkPEZFRkYwMDQ0MDAzQTAwMzIwMDMwMDAzMjAwMzYwMDMwMDAzMjAwMzAwMDM4MDAzMjAwMzMwMDM0MDAzOTAwMzQwMDM1MDA1QT4vTnVtYmVyb2ZQYWdlcyAxL09yaWdpbmFsRG9jdW1lbnRJRDxGRUZGMDA3ODAwNkQwMDcwMDAyRTAwNjQwMDY5MDA2NDAwM0EwMDM5MDAzODAwMzUwMDYzMDAzMTAwMzUwMDMxMDAzOTAwMkQwMDM2MDA2NTAwMzQwMDYyMDAyRDAwMzQwMDMyMDAzNDAwMzQwMDJEMDA2MTAwMzYwMDM3MDAzMzAwMkQwMDMyMDAzMzAwMzIwMDYzMDA2MTAwMzgwMDMyMDAzMjAwNjEwMDM5MDAzMzAwMzA+L1BhZ2VUcmFuc2Zvcm1hdGlvbk1hdHJpeExpc3Q8PC8wWzEuMCAwLjAgMC4wIDEuMCAwLjAgMC4wXT4+L1BhZ2VVSURMaXN0PDwvMCAyNTA+Pi9QYWdlV2lkdGhMaXN0PDwvMCAzMTIuMD4+Pj4+Pj4+DWVuZG9iag0yNSAwIG9iag1bMjYgMCBSIDI4IDAgUiAzMCAwIFIgMzIgMCBSIDM0IDAg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Ui9Dcm9wQm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL01lZGlhQm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL1BhcmVudCAxOCAwIFIvUmVzb3VyY2VzPDwvQ29sb3JTcGFjZTw8L0NTMCAzOSAwIFI+Pi9FeHRHU3RhdGU8PC9HUzAgNDAgMCBSPj4vRm9udDw8L1QxXzAgMzggMCBSL1QxXzEgMTAgMCBSPj4vUHJvY1NldFsvUERGL1RleHRdPj4vUm90YXRlIDAvVGFicy9XL1RodW1iIDE3IDAgUi9UcmltQm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL1R5cGUvUGFnZS9QaWVjZUluZm88PC9JbkRlc2lnbjw8L0RvY3VtZW50SUQ8RkVGRjAwNzgwMDZEMDA3MDAwMkUwMDY0MDA2OTAwNjQwMDNBMDA2NDAwMzMwMDM0MDA2NTAwMzYwMDM0MDAzNjAwNjMwMDJEMDAzMDAwMzAwMDYzMDAzODAwMkQwMDM0MDAzMDAwNjMwMDYyMDAyRDAwMzgwMDY1MDAzNzAwMzkwMDJEMDAzNzAwMzgwMDM2MDAzNDAwMzYwMDY2MDAzMTAwMzgwMDMxMDAzOTAwNjEwMDM5Pi9MYXN0TW9kaWZpZWQ8RkVGRjAwNDQwMDNBMDAzMjAwMzAwMDMyMDAzNjAwMzAwMDMyMDAzMDAwMzgwMDMyMDAzMzAwMzQwMDM5MDAzNDAwMzUwMDVBPi9MaW5rZWRJbWFnZXM8PD4+L051bWJlcm9mUGFnZXMgMS9PcmlnaW5hbERvY3VtZW50SUQ8RkVGRjAwNzgwMDZEMDA3MDAwMkUwMDY0MDA2OTAwNjQwMDNBMDAzOTAwMzgwMDM1MDA2MzAwMzEwMDM1MDAzMTAwMzkwMDJEMDAzNjAwNjUwMDM0MDA2MjAwMkQwMDM0MDAzMjAwMzQwMDM0MDAyRDAwNjEwMDM2MDAzNzAwMzMwMDJEMDAzMjAwMzMwMDMyMDA2MzAwNjEwMDM4MDAzMjAwMzIwMDYxMDAzOTAwMzMwMDMwPi9QYWdlVHJhbnNmb3JtYXRpb25NYXRyaXhMaXN0PDwvMFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0+Pi9QYWdlVUlETGlzdDw8LzAgNTc5Pj4vUGFnZVdpZHRoTGlzdDw8LzAgMzEy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aW5nL0ZpcnN0Q2hhciAzMi9Gb250RGVzY3JpcHRvciA0IDAgUi9MYXN0Q2hhciAxODkvU3VidHlwZS9UeXBlMS9Ub1VuaWNvZGUgNSAwIFIvVHlwZS9Gb250L1dpZHRoc1syMTIgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDIwNyAwIDIwNyAwIDUxMyA1MTMgNTEzIDAgNTEzIDUxMyAwIDAgMCA1MTMgMCAwIDAgMCAwIDAgMCAwIDAgMCA2NjYgNDkyIDQ4NyAwIDAgMjM5IDAgMCA0NzIgODA0IDY1OCA2ODkgMCAwIDUzOCAwIDQ5NyA2NDcgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDIzOSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDc1OV0+Pg1lbmRvYmoNMTEgMCBvYmoNPDwvQ291bnQgMC9UeXBlL091dGxpbmVzPj4NZW5kb2JqDTEyIDAgb2JqDVszNCAwIFIgMzYgMCBSIDMyIDAgUiAzMCAwIFIgMjggMCBSIDI2IDAgUl0NZW5kb2JqDTEzIDAgb2JqDTw8L0Jhc2VGb250L0x1eHVyeS1Hb2xkL0VuY29kaW5nIDE0IDAgUi9GaXJzdENoYXIgMC9Gb250RGVzY3JpcHRvciAxNSAwIFIvTGFzdENoYXIgMjU1L1N1YnR5cGUvVHlwZTEvVHlwZS9Gb250L1dpZHRoc1s1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDI4MiAyNzMgMzc3IDU1OCA4MDQgMTAyMSA4OTUgMjEyIDMyNSAzMjUgNDQwIDQ5NCAyODMgMzQwIDI4MyA0MTQgOTA2IDQwNiA3MzcgNzU4IDc4OSA3NjEgODE4IDc0OCA4MjYgODE4IDI5MyAyOTMgNDc5IDQ3MCA0NzkgNjg4IDEwNjkgOTA1IDg4MSA4MzYgOTAwIDc5MiA3NjUgODc2IDkxNyAyODkgNzE2IDg2NyA3NTkgMTAxNSA5MDUgOTQ2IDg2MiA5NDYgODcwIDgyNiA4MDMgOTA2IDkwNSAxMjI1IDgyOCA4MDMgNzcyIDM0OSA0MTQgMzQ5IDU5NSA0NjYgNTAwIDY4NiA3MzcgNjU0IDczNyA2ODUgNDg1IDcxMSA3MjcgMjUzIDI1MyA2NzUgMjUzIDExMzYgNzI3IDczNCA3MzcgNzM3IDQ5NiA2NDggNDg3IDcyNyA3NDcgOTk1IDY4MSA3MTQgNjMyIDM3NCAyNzUgMzc0IDUwMCA1MDAgOTA1IDkwNSA4MzYgNzkyIDkwNSA5NDYgOTA2IDY4NiA2ODYgNjg2IDY4NiA2ODYgNjg2IDY1NCA2ODUgNjg1IDY4NSA2ODUgMjUzIDI1MyAyNTMgMjUzIDcyNyA3MzQgNzM0IDczNCA3MzQgNzM0IDcyNyA3MjcgNzI3IDcyNyA1MDAgMzkwIDY1NCA3MTAgNzkyIDQ4OCA4MDggNzYyIDQ3MSA5NDYgNzcyIDUwMCA1MDAgNTAwIDEzODkgOTQ2IDUwMCA1MDAgNTAwIDUwMCA3NzEgNzI3IDUwMCA1MDAgNTAwIDUwMCA1MDAgNTUwIDU4NSA1MDAgMTE3NCA3MzQgNjg4IDI3MyA2MzAgNTAwIDUzMCA1MDAgNTAwIDUwNiA1MDYgODAzIDUwMCA5MDUgOTA1IDk0NiAxNDIzIDEyNDcgNTQwIDc0MCA0MjAgNDIwIDIzNiAyMzYgNDk0IDUwMCA3MTQgODAzIDI2MiA4OTEgMzAwIDMwMCA3MDggNzA4IDUwMCAyODMgMjM2IDQyMCAxNTAzIDkwNSA3OTIgOTA1IDc5MiA3OTIgMjg5IDI4OSAyODkgMjg5IDk0NiA5NDYgNTAwIDk0NiA5MDYgOTA2IDkwNiAyNTMgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwXT4+DWVuZG9iag0xNCAwIG9iag08PC9CYXNlRW5jb2RpbmcvTWFjUm9tYW5FbmNvZGluZy9EaWZmZXJlbmNlc1syMTkvRXVyb10vVHlwZS9FbmNvZGluZz4+DWVuZG9iag0xNSAwIG9iag08PC9Bc2NlbnQgODU0L0NhcEhlaWdodCA2MjQvRGVzY2VudCAtMjU0L0ZsYWdzIDMyL0ZvbnRCQm94Wy0xOTAgLTI1NCAxNTUxIDg1NF0vRm9udEZhbWlseShMdXh1cnkgR29sZCkvRm9udE5hbWUvTHV4dXJ5LUdvbGQvRm9udFN0cmV0Y2gvTm9ybWFsL0ZvbnRXZWlnaHQgNDAwL0l0YWxpY0FuZ2xlIDAvU3RlbVYgOTYvVHlwZS9Gb250RGVzY3JpcHRvci9YSGVpZ2h0IDQ0OT4+DWVuZG9iag0xNiAwIG9iag08PC9CaXRzUGVyQ29tcG9uZW50IDgvQ29sb3JTcGFjZSA4IDAgUi9GaWx0ZXJbL0FTQ0lJODVEZWNvZGUvRmxhdGVEZWNvZGVdL0hlaWdodCAyNS9MZW5ndGggMTk0L1dpZHRoIDM5Pj5zdHJlYW0NCjg7WTlLZDBbVDIkcStBTz9dTDNrbGohIic3QyxgQiMiZjlib1Y5YjkscDExdEVpPT9UPEQ+bmJrc0EzQzliJjE7CiJzSyIra3Q1TnMlbV8uU2JFPCg9Ni84YjItO0I5NCl1JmhhKmNrI0E+PUclJDZDa1ZcW2JUQEw+NlVRJClzJS8+CmNnQWBsRWtBVClTX0ZwTG1CSmgxalA9XDgtOkhub2pIZCE5aypCcXUvOTc1MEBJSWlHYjBDImZHQzZyN34+DWVuZHN0cmVhbQ1lbmRvYmoNMTcgMCBvYmoNPDwvQml0c1BlckNvbXBvbmVudCA4L0NvbG9yU3BhY2UgOCAwIFIvRmlsdGVyWy9BU0NJSTg1RGVjb2RlL0ZsYXRlRGVjb2RlXS9IZWlnaHQgMjUvTGVuZ3RoIDIyNC9XaWR0aCAzOT4+c3RyZWFtDQo4O1dScF0rTXQoJHErZiYmTEZAXV0pdCdmSllPJlBESiVZNidkITViNSEhRSFHI2xkUiEiI11ATVI6Z0IrTCppWApWMEMzZ1BqSys4OGFeZilIRGtPbW82KSEvaDJINVBIbzFlQ3MzUm1gMzdoYDpBPUhpSiMjRWsrIzBBLT9XWiF1PwpWVi5FLXJTLlZBV2s3NTRSclAzMlEtSGwwVlQwbU1GJGwkLkBiX09UTCk7a2ZcPFJvP29wYnJzbUZlc3FIXF5DRApYUD5uL0ImJnVtJkdvVHJmbG1GZ0pZV1Z+Pg1lbmRzdHJlYW0NZW5kb2JqDTE4IDAgb2JqDTw8L0NvdW50IDIvS2lkc1syNCAwIFIgMSAwIFJdL1R5cGUvUGFnZXM+Pg1lbmRvYmoNMTkgMCBvYmoNPDwvTGVuZ3RoIDI0ODYvU3VidHlwZS9YTUwvVHlwZS9NZXRhZGF0YT4+c3RyZWFtDQo8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSAxMC4wLWMwMDAgMjUuRy5lZjcyZTRlLCAyMDI1LzA2LzI3LTE4OjU0OjA1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAyNi0wMi0wOFQxODo0OTo0NS0wNTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMjYtMDItMDhUMTg6NDk6NDYtMDU6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDI2LTAyLTA4VDE4OjQ5OjQ2LTA1OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBJbkRlc2lnbiAyMS4yIChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnV1aWQ6OGFlN2E2YTMtMjFiZi0zNzRhLWJkMzItNmFjZGZiZTM4NzE4PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6OTg1YzE1MTktNmU0Yi00MjQ0LWE2NzMtMjMyY2E4MjJhOTMwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5pZDplN2ViODNkZS00NDYzLTRhYWEtYWQ3MC1mZWIxMTQ2ODNlYjQ8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpSZW5kaXRpb25DbGFzcz5wcm9vZjpwZGY8L3htcE1NOlJlbmRpdGlvbkNsYXNzPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNvbnZlcnRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5mcm9tIGFwcGxpY2F0aW9uL3gtaW5kZXNpZ24gdG8gYXBwbGljYXRpb24vcGRmPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBJbkRlc2lnbiAyMS4yIChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDI2LTAyLTA4VDE4OjQ5OjQ1LTA1OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6MDIxMjZjY2ItNzIzYS00YjhlLWIwNjUtMDI1YWNkYmY1NmU0PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOmQzNGU2NDZjLTAwYzgtNDBjYi04ZTc5LTc4NjQ2ZjE4MTlhOTwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjk4NWMxNTE5LTZlNGItNDI0NC1hNjczLTIzMmNhODIyYTkzMDwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6cmVuZGl0aW9uQ2xhc3M+ZGVmYXVsdDwvc3RSZWY6cmVuZGl0aW9uQ2xhc3M+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDxkYzpmb3JtYXQ+YXBwbGljYXRpb24vcGRmPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwZGY6UHJvZHVjZXI+QWRvYmUgUERGIExpYnJhcnkgMTguMDwvcGRmOlByb2R1Y2VyPgogICAgICAgICA8cGRmOlRyYXBwZWQ+RmFsc2U8L3BkZjpUcmFwcGVkPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/Pg1lbmRzdHJlYW0NZW5kb2JqDTIwIDAgb2JqDTw8L0NyZWF0aW9uRGF0ZShEOjIwMjYwMjA4MTg0OTQ1LTA1JzAwJykvQ3JlYXRvcihBZG9iZSBJbkRlc2lnbiAyMS4yIFwoTWFjaW50b3NoXCkpL01vZERhdGUoRDoyMDI2MDIwODE4NDk0Ni0wNScwMCcpL1Byb2R1Y2VyKEFkb2JlIFBERiBMaWJyYXJ5IDE4LjApL1RyYXBwZWQvRmFsc2U+Pg1lbmRvYmoNeHJlZg0KMCAyMQ0KMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDE2MTE4IDAwMDAwIG4NCjAwMDAwMTcxMzkgMDAwMDAgbg0KMDAwMDAxNzcwNSAwMDAwMCBuDQowMDAwMDE5NDk5IDAwMDAwIG4NCjAwMDAwMTk4NDggMDAwMDAgbg0KMDAwMDAyMDI0NyAwMDAwMCBuDQowMDAwMDg4MjUwIDAwMDAwIG4NCjAwMDAwODg0NzUgMDAwMDAgbg0KMDAwMDA4ODUyMSAwMDAwMCBuDQowMDAwMDg5MDMzIDAwMDAwIG4NCjAwMDAwODk1NjggMDAwMDAgbg0KMDAwMDA4OTYxMSAwMDAwMCBuDQowMDAwMDg5NjcxIDAwMDAwIG4NCjAwMDAwOTA4NDIgMDAwMDAgbg0KMDAwMDA5MDkyOSAwMDAwMCBuDQowMDAwMDkxMTYwIDAwMDAwIG4NCjAwMDAwOTE0OTQgMDAwMDAgbg0KMDAwMDA5MTg1OCAwMDAwMCBuDQowMDAwMDkxOTE3IDAwMDAwIG4NCjAwMDAwOTQ0ODAgMDAwMDAgbg0KdHJhaWxlcg08PC9TaXplIDIxL0lEWzw5QjE3NzZBODlEOTc0RTU2QkU0OEFGNEZGODA4NjhEQz48MUZDMjJFRjhCNTk0NEJERTg0MzU3NTFBRkFGNjlDQzY+XT4+DXN0YXJ0eHJlZg0xMTYNJSVFT0YN",
  "tribal-police": "JVBERi0xLjcNJeLjz9MNCjI0IDAgb2JqDTw8L0xpbmVhcml6ZWQgMS9MIDE0MDA3Mi9PIDI3L0UgMjI4ODcvTiAyL1QgMTM5NDc3L0ggWyAxMDE2IDI5Ml0+Pg1lbmRvYmoNICAgICAgICAgICAgICAgIA14cmVmDQoyNCAzNg0KMDAwMDAwMDAxNiAwMDAwMCBuDQowMDAwMDAxMzA4IDAwMDAwIG4NCjAwMDAwMDE0NTEgMDAwMDAgbg0KMDAwMDAwMTU0NiAwMDAwMCBuDQowMDAwMDAyNTgzIDAwMDAwIG4NCjAwMDAwMDI2MzYgMDAwMDAgbg0KMDAwMDAwMjgzOSAwMDAwMCBuDQowMDAwMDAzMDE4IDAwMDAwIG4NCjAwMDAwMDMyMjYgMDAwMDAgbg0KMDAwMDAwMzQwNCAwMDAwMCBuDQowMDAwMDAzNjE4IDAwMDAwIG4NCjAwMDAwMDM3OTYgMDAwMDAgbg0KMDAwMDAwNDAwNSAwMDAwMCBuDQowMDAwMDA0MTgyIDAwMDAwIG4NCjAwMDAwMDQzOTAgMDAwMDAgbg0KMDAwMDAwNDU2NyAwMDAwMCBuDQowMDAwMDA0NjAyIDAwMDAwIG4NCjAwMDAwMDQ3MTUgMDAwMDAgbg0KMDAwMDAwNjEyNCAwMDAwMCBuDQowMDAwMDA3NTc3IDAwMDAwIG4NCjAwMDAwMDkwNDggMDAwMDAgbg0KMDAwMDAxMDQ5MSAwMDAwMCBuDQowMDAwMDExODk4IDAwMDAwIG4NCjAwMDAwMTI5ODUgMDAwMDAgbg0KMDAwMDAxMzU1MSAwMDAwMCBuDQowMDAwMDE1MjM4IDAwMDAwIG4NCjAwMDAwMTY1NjEgMDAwMDAgbg0KMDAwMDAxOTIwOSAwMDAwMCBuDQowMDAwMDE5MjQwIDAwMDAwIG4NCjAwMDAwMTkyNzEgMDAwMDAgbg0KMDAwMDAxOTMwMiAwMDAwMCBuDQowMDAwMDE5MzMzIDAwMDAwIG4NCjAwMDAwMTkzNjQgMDAwMDAgbg0KMDAwMDAyMjAyMSAwMDAwMCBuDQowMDAwMDIyNDEwIDAwMDAwIG4NCjAwMDAwMDEwMTYgMDAwMDAgbg0KdHJhaWxlcg08PC9TaXplIDYwL1Jvb3QgMjUgMCBSL0luZm8gMjMgMCBSL0lEWzxGQTcxMTcyNDU2RTk0MjAwOTE4NkU4MTA1OEMwMTYzMD48OTc2QzNGRUU0NzBDNEQzNUE3OERCRkEyOTJGOTYyRDM+XS9QcmV2IDEzOTQ2Nj4+DXN0YXJ0eHJlZg0wDSUlRU9GDSAgICAgICAgICAgICAgICAgIA01OSAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvSSAyNTQvTGVuZ3RoIDE5NC9PIDIwNi9TIDgwL1QgMTYzL1YgMjIyPj5zdHJlYW0NCmjeYmBgYGdgYGlnYGVgCN7DIMiAAIJAMTYGFgaOC0BOaNKBmQyogNfKDMrK6OhoYGgAKwLyOBiYGLuAtCIQq4Dl5Rl4WJjfMSas4XTYyGmwndNgE6fCRk4FFlbVpIinCyJcE5yYxNNbeRZPgJq3RDFN+uFDho/XYFYJMzAJbgTSTCAOYx0DM4hiwAALgJibgYl1LVRaG4h5gPwbDGBfct8E0vwMrFF+gU9mmV08Wgp0MoM4A5PcB6j6bQABBgAofSaxDWVuZHN0cmVhbQ1lbmRvYmoNMjUgMCBvYmoNPDwvQWNyb0Zvcm0gMjYgMCBSL0xhbmcoZW4tVVMpL01ldGFkYXRhIDIyIDAgUi9PdXRsaW5lcyAxMSAwIFIvUGFnZXMgMjEgMCBSL1R5cGUvQ2F0YWxvZy9WaWV3ZXJQcmVmZXJlbmNlczw8L0RpcmVjdGlvbi9MMlI+Pj4+DWVuZG9iag0yNiAwIG9iag08PC9EUjw8L0ZvbnQ8PC9MdXh1cnktR29sZCAxMyAwIFIvTWluaW9uUHJvLVJlZ3VsYXIgMTQgMCBSPj4+Pi9GaWVsZHMgMTIgMCBSPj4NZW5kb2JqDTI3IDAgb2JqDTw8L0Fubm90cyAyOCAwIFIvQXJ0Qm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL0JsZWVkQm94WzAuMCAwLjAgMzEyLjAgMjA0LjBdL0NvbnRlbnRzWzQxIDAgUiA0MiAwIFIgNDMgMCBSIDQ0IDAgUiA0NSAwIFIgNDYgMCBSIDQ4IDAgUiA0OSAwIFJdL0Nyb3BCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vTWVkaWFCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vUGFyZW50IDIxIDAgUi9SZXNvdXJjZXM8PC9Db2xvclNwYWNlPDwvQ1MwIDM5IDAgUj4+L0V4dEdTdGF0ZTw8L0dTMCA0MCAwIFI+Pi9Gb250PDwvVDFfMCA0NyAwIFI+Pi9Qcm9jU2V0Wy9QREYvVGV4dF0+Pi9Sb3RhdGUgMC9UYWJzL1cvVGh1bWIgMTkgMCBSL1RyaW1Cb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vVHlwZS9QYWdlL1BpZWNlSW5mbzw8L0luRGVzaWduPDwvRG9jdW1lbnRJRDxGRUZGMDA3ODAwNkQwMDcwMDAyRTAwNjQwMDY5MDA2NDAwM0EwMDY1MDAzODAwNjIwMDY0MDA2MzAwMzQwMDM1MDAzODAwMkQwMDY2MDAzMjAwNjYwMDM3MDAyRDAwMzQwMDM0MDA2MzAwMzUwMDJEMDAzOTAwMzgwMDYzMDA2NjAwMkQwMDY0MDAzODAwMzEwMDM2MDAzMDAwMzgwMDY0MDA2NjAwNjYwMDM1MDAzMDAwMzI+L0xhc3RNb2RpZmllZDxGRUZGMDA0NDAwM0EwMDMyMDAzMDAwMzIwMDM2MDAzMDAwMzIwMDMwMDAzODAwMzIwMDMzMDAzNTAwMzgwMDM1MDAzOTAwNUE+L051bWJlcm9mUGFnZXMgMS9PcmlnaW5hbERvY3VtZW50SUQ8RkVGRjAwNzgwMDZEMDA3MDAwMkUwMDY0MDA2OTAwNjQwMDNBMDA2MjAwMzcwMDYzMDAzNTAwNjQwMDMzMDAzNzAwMzYwMDJEMDA2MjAwNjIwMDM0MDAzMjAwMkQwMDM0MDAzOTAwMzgwMDMzMDAyRDAwNjIwMDMxMDAzMTAwMzAwMDJEMDA2MTAwMzQwMDMyMDAzNjAwMzAwMDM0MDA2MzAwMzIwMDYzMDA2MTAwMzgwMDYyPi9QYWdlVHJhbnNmb3JtYXRpb25NYXRyaXhMaXN0PDwvMFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0+Pi9QYWdlVUlETGlzdDw8LzAgMjU0Pj4vUGFnZVdpZHRoTGlzdDw8LzAgMzEyLjA+Pj4+Pj4+Pg1lbmRvYmoNMjggMCBvYmoNWzI5IDAgUiAzMSAwIFIgMzMgMCBSIDM1IDAgUiAzNyAwIFJdDWVuZG9iag0yOSAwIG9iag08PC9BUDw8L04gMzAgMCBSPj4vQlM8PC9TL1MvVyAxPj4vREEoL0x1eHVyeS1Hb2xkIDEyIFRmIDAgZykvRiA0L0ZUL1R4L0ZmIDIvTUsgNTEgMCBSL1AgMjcgMCBSL1EgMC9SZWN0WzEwOS4yNDYgOTguNDQxOSAyMzcuMDkgMTExLjA3OF0vU3VidHlwZS9XaWRnZXQvVChOYW1lKS9UVShGaXJzdCBMQXN0KS9UeXBlL0Fubm90Pj4NZW5kb2JqDTMwIDAgb2JqDTw8L0JCb3hbMC4wIDEyLjYzNjIgMTI3Ljg0NCAwLjBdL0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjIvTWF0cml4WzEuMCAwLjAgMC4wIDEuMCAwLjAgMC4wXS9SZXNvdXJjZXM8PD4+L1N1YnR5cGUvRm9ybT4+c3RyZWFtDQpIidIPqVBw8nVW4HIFEQABBgAaAQMXDWVuZHN0cmVhbQ1lbmRvYmoNMzEgMCBvYmoNPDwvQVA8PC9OIDMyIDAgUj4+L0JTPDwvUy9TL1cgMT4+L0RBKC9MdXh1cnktR29sZCAxMiBUZiAwIGcpL0YgNC9GVC9UeC9GZiAyL01LIDUyIDAgUi9QIDI3IDAgUi9RIDAvUmVjdFsxMDQuNjUzIDgzLjEzNDggMjQxLjY4MyA5Ny4yODM4XS9TdWJ0eXBlL1dpZGdldC9UKEpvYiBUaXRsZSkvVFUoSm9iIFRpdGxlKS9UeXBlL0Fubm90Pj4NZW5kb2JqDTMyIDAgb2JqDTw8L0JCb3hbMC4wIDE0LjE0OSAxMzcuMDMxIDAuMF0vRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAyMi9NYXRyaXhbMS4wIDAuMCAwLjAgMS4wIDAuMCAwLjBdL1Jlc291cmNlczw8Pj4vU3VidHlwZS9Gb3JtPj5zdHJlYW0NCkiJ0g+pUHDydVbgcgURAAEGABoBAxcNZW5kc3RyZWFtDWVuZG9iag0zMyAwIG9iag08PC9BUDw8L04gMzQgMCBSPj4vQlM8PC9TL1MvVyAxPj4vREEoL01pbmlvblByby1SZWd1bGFyIDEyIFRmIDAgZykvRiA0L0ZUL1R4L0ZmIDIvTUsgNTMgMCBSL1AgMjcgMCBSL1EgMC9SZWN0WzEyNi4zNjUgMzMuNzgxNSAyNTAuNTU2IDQ0Ljc3MjVdL1N1YnR5cGUvV2lkZ2V0L1QoRW1haWwpL1RVKEVtYWlsIEFkZHJlc3MpL1R5cGUvQW5ub3Q+Pg1lbmRvYmoNMzQgMCBvYmoNPDwvQkJveFswLjAgMTAuOTkxIDEyNC4xOTEgMC4wXS9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDIyL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vUmVzb3VyY2VzPDw+Pi9TdWJ0eXBlL0Zvcm0+PnN0cmVhbQ0KSInSD6lQcPJ1VuByBREAAQYAGgEDFw1lbmRzdHJlYW0NZW5kb2JqDTM1IDAgb2JqDTw8L0FQPDwvTiAzNiAwIFI+Pi9CUzw8L1MvUy9XIDE+Pi9EQSgvTHV4dXJ5LUdvbGQgMTIgVGYgMCBnKS9GIDQvRlQvVHgvRmYgMi9NSyA1NCAwIFIvUCAyNyAwIFIvUSAwL1JlY3RbMTgwLjEyNCA0Ny4xMzc1IDI1NS44ODcgNTUuNzY5NV0vU3VidHlwZS9XaWRnZXQvVChDZWxsIFBob25lKS9UVShDZWxscGhvbmUpL1R5cGUvQW5ub3Q+Pg1lbmRvYmoNMzYgMCBvYmoNPDwvQkJveFswLjAgOC42MzIgNzUuNzYzNCAwLjBdL0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjIvTWF0cml4WzEuMCAwLjAgMC4wIDEuMCAwLjAgMC4wXS9SZXNvdXJjZXM8PD4+L1N1YnR5cGUvRm9ybT4+c3RyZWFtDQpIidIPqVBw8nVW4HIFEQABBgAaAQMXDWVuZHN0cmVhbQ1lbmRvYmoNMzcgMCBvYmoNPDwvQVA8PC9OIDM4IDAgUj4+L0JTPDwvUy9TL1cgMT4+L0RBKC9MdXh1cnktR29sZCAxMiBUZiAwIGcpL0YgNC9GVC9UeC9GZiAyL01LIDU1IDAgUi9QIDI3IDAgUi9RIDAvUmVjdFsxMTAuNjI1IDQ3LjEzNzUgMTcyLjU4OSA1Ni4wMzI1XS9TdWJ0eXBlL1dpZGdldC9UKFBob25lICkvVFUoUGhvbmUgTnVtYmVyKS9UeXBlL0Fubm90Pj4NZW5kb2JqDTM4IDAgb2JqDTw8L0JCb3hbMC4wIDguODk1IDYxLjk2NDIgMC4wXS9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDIyL01hdHJpeFsxLjAgMC4wIDAuMCAxLjAgMC4wIDAuMF0vUmVzb3VyY2VzPDw+Pi9TdWJ0eXBlL0Zvcm0+PnN0cmVhbQ0KSInSD6lQcPJ1VuByBREAAQYAGgEDFw1lbmRzdHJlYW0NZW5kb2JqDTM5IDAgb2JqDVsvSUNDQmFzZWQgNTAgMCBSXQ1lbmRvYmoNNDAgMCBvYmoNPDwvQUlTIGZhbHNlL0JNL05vcm1hbC9DQSAxLjAvT1AgZmFsc2UvT1BNIDEvU0EgdHJ1ZS9TTWFzay9Ob25lL1R5cGUvRXh0R1N0YXRlL2NhIDEuMC9vcCBmYWxzZT4+DWVuZG9iag00MSAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDEzMzk+PnN0cmVhbQ0KSImkV0uOHDcM3dcp6gIji6S+6yyyDrLIAQpxZuE24Mz9gTySkqqqexIYCAy0+UYUSfFfX375Pe7Hxx4DV8JvjYzfImnfP47v25dfcfzXx8Yp9LIz7dJAtJ0K73//uX3dfmxxj7sQ7xyT/umP/fsWQ5SsIov+UhIX9mOHBvyjnagHwX8CVUnKfjxMDH5D4g7q2/ZGsAgqQ2rNocR2Qg69DkYOGRYNkrOqTKUrjEGYF3w3ITuF1hmqcJqTMtcufjdKX/B9k1AiTAySG7gdgafiMIdKLyBRApKgfrijaJTePymCNrtMvT8D1agW1MCkOMUMCxwNpT1wewGus4SGR99RNC5p/UoFScrhcu8IBsH337aGt/ELUnvUPoIrUx2qHhupQ2VpHlAVDkYjEThRl5AgbEn15jIBQo4HHduAeB4E6A2aLr2pPFRHTxaJVtQCCrUOZKrqPINEwj3cBsMC7LoUwNhoukptahSy0KU5vVQ5tNdnSKYVngFHSKgGyq9oeCaF0uQZRmfkTDdyxGWIf4IzMlRCrukVzkh93X67Vl9C2XH6pPxQE63pm7W4vIBSU7EoFIBYNPzc0gkK2sKxDYjyQ/t404Ibr9MqZlnx0rKNZ6oOOKuY6EZqx/HCh7iJIBtPjF7Ozjijr7rQcGb4wVrXqd1Te3u/gFK7G+9QCulZFS0ARs8YEh0cU59DbxFNSwe6U+DkPQg8iVef0hsngnfFnwsZeRC5yGpRElKvl4al1/vqWOgmVVaHQna2S7vKeM3Mj8dA08/ZLt5RtGKvqV+pkV3v2lJKWdIczfsttNKe0KhyOQveyCVPK5qLuQpkZ2+Kk0RsR1Izp2td1HomC5hnZMiru+TLKQcq6cps+mxYfVIBBX7HOPmXCsj3Cqj/uwL4ZyvgSl3yP9/yP1/z/+fTn67pT/f0p2v6t/9I/0v2w4UkZ/8zNBoevN9ewIhMIMpPaIzFlq7U7HQm945mn5MQY31Bs+lV6LBxLzY9daeBRb1auotoTARJX+Z4yRW0uHFZx1AOUucJenQ25yJZnPbx4XQ0SeAv1RID0XdRAxyYwz0tCPUaRISGQZfKNgZVHGzOtoBR9mFcbH+B6RBQyHYqMzOWQauZ2bYcRRgL1iIyfp2eM3WihrLwG6iYlIYsp83MhTC0mj1ZjVyuPLS4O/ch+DHhGNYIaJHhM4xMTqc7sXbwRA1dsg53Ou3udNrdqStimS4bspY/VVFdeNgwlomrfSqyexKbtRNp4+5epfpWFS9tuQEiIq0zGm2/6fYzATubTyp197jjcRjyZohMkwM3AFcwvq+mHdr+sjW4CJmPCcFJozmKt2gEQce/+cl0JbCc6WB9cuYDADcFOcsEly3LYUu2IFWZOTEkLm9gMbXI2Rns6MqojwUothJ6YmRkV15Fpg+w2S/Ym0wGzcSAfD4TQ5t1mxCNvJVZaQMMbzvw5NA79cwOF3hmB7TlMztgZdRgUDRDuhWPpopxKkT3k+4zRywGT1BD8skYqQ2S1bHoPT1fv2P2N7ZS1qEvcMczRJ+19aDhM8gbqyFs/k9Iv6V8k0jlGemC6ntFlDSGQsJHxFLnyrzZ4tus4ZY3qCpWCxOaTI/eK5RSfEPgckJfMFQN3aE9stlIeYXEYt8k2k0W1G2jY9N+I0vqx4Sa6uyjPfrbn7Eb2pEJ7QVO3boYpPoZpujspuwJIgF8k8Y4+QyqoTYD0f9jmsptuZFIpzETL+2Df2E4rq9z7O36waqfopjTE5F1vmObGPMAK4PerDw13e04tv0fAQYAO/sE1g1lbmRzdHJlYW0NZW5kb2JqDTQyIDAgb2JqDTw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMTM4Mz4+c3RyZWFtDQpIiWyXW270NgyF370Kb6CCJOq6jK7BaJGHpEDb/QM9hxRld/wjwMTfWKJ4FydJaHOcv8UgrZ0/Ryqh5u78faQaCh4Wg2YUUu11Uwq55vM6bp5l8m2Rev6WQ8pyulwjrF3nGn8fX0caYdpBfUCRHEPOyfl7cw4Fhym3NN6816cwRvoVRyHv4wy/jlzDaNkFQoESZu+0pnRqiPc1FeXYT67mc2pjPcfQa4NlTrnyRYnZD4HAVrYGWJjDrOVWwXlbJEFqejMUmMpwaWoPrkFGv9d/7R0eXO64g607UnXk9qmLS31S72JWKacQ8Y8bs/oiDTldrNH1UJSsivQQqaqphvOwHM9w5z9/HHnAc+J++Nnsdgg0ig+/COXuQIHa0DST0jel0Bt9fHNJk29LVbVzqaSUsqoJk3StDE3flFRSzarVbPlBTU28OXVdm/KOrOvrcYb5U/0M+X3CQCyQOpzVoFjEGZSH5ZnIg3pZBinnEPGPO+OuIpfrNbaOvUtsfeHpwPW93OkA9pIBq1H6tsT5oB6b6bEyIMJy7jTHxtZPl2t03eYTqYeglHK5Sw08a35EuCBA7aQD20II2JhDLc98+KgbkZCbundq+kF6Xm1ppSMFWvSq+oGVrhtanSagmM+NsaHDIs3fFJmizl660kzCJ2+VJh7kV0x5POHP4/fj7zOdEX+oL5RQQcEk5m+FK66fg2/4yYBM+pHJNzUl87BvtdX0ssKy6TrAI/b9NqM5Nav04URhDOzGIRoz7kOsRVyowcXjWcDrHbYjP5mOGiiEHxKg3nWgEw6KiKOZ0hGxRKrrppK4qRRtY1HFEVTjWau/y6GhC/H86oADxzR9iXRD02KezVSt3WUuUpVlbIYmTf2H6mfKq38aDqXORHxmRof94gM0ZgV9qizH/SyCaEG7QKq5YQJv5G0XIo7WaJS0TMwqe3ajkhcmbcKWsk0yaduibYydvgx4KkZhXS00NZ1GZAvOo64IQnArO7gSRkmLCmI1dEfaz6amEcPItqdbVoqZtJ1/dtBC00B3nU/drqOrj/mmsU82CKGXSmTZomfMvglLoxmPgCpauhpO5OG9dmBauQmThh7NW6jQIUuRqLWe0Fw+wfalqKH9QE2xZGtbTG9mDLutL/KJTMFKQtrm8kZqqBo3bBMX/sNJq/du/Yb9BO9ldUj4t+nJqDvWjAOvwetYaFcegI3RLOK4piEn6Hxm6bysNbytK8jj/GZoUJONjWLT2OKGlBn3+i/fgS8wSapFHAoMdf/UOiFy82QFzvGAphf8RrF5VN2W0daWQIPLjzPU87u6MKnVP463QQM3e3kxMzj5tGlX2lwo/cXuPc6uMj6R3Ug0FzpaZV6q6D2dNZ1tov3hPFWtt1dJNgg2u4sXlzCyrOUbt+oY1nRy/mA/jrPcaDdCeFqRnDY3z/5YDZT2ibfsvAtxxTnjKsQ94NW20CsMs95803JTw5SQPvE+CkU+X+j1tc75ZK8wnMTL64VecBhhsnYFy46F+zBwK/nFnh0imrc7HcDJJpD/sVuGAabH8ok7PXh4H4/0wLyS7OJAT9DpiT+0DL8db93we0TKi/dyjOazvnHp4kd57+ScwvGOxkab0XDhnP9efz3Gl4Sq7JjGU5noMByuH+MLClYjgvuCN5ljxe/B6tjwDv5CPftj0QH+OhaiIjLfCT4B7Pq4H0RnyKkXLQXp5NBR8M2GIyQnjFzAyUrXrblJMPVABsruNNWizu7oOvSesF3D1/hdIYuos3DQVIKuphcibM+4HRtVNmLR8U1GrQF40S1hBpefVNegsY/GzVvs6DkXfePqnaMvotY2yJTpgIuVv2nO/wQYAM/FAwkNZW5kc3RyZWFtDWVuZG9iag00MyAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDE0MDE+PnN0cmVhbQ0KSIlsl0muIzcMhvd1irpAC6Ko8Rg5g5HAi+dF9/0X+TmpynYjQFrfK4mkKE5uqbV1/iqp0VnTKlXWvayT01gr4HHktHh/+zmeB2E3jfNXT9TH+Tqo4TQH/xxEKi0nmo6zlY3DxMXmmebqF67UIQkKRpGjFX+uFz9VGFRTYm6imrF/ygaqegBa7owDI9XeoD2vKQcML1tnYrnsJ1PqctkCQbnIZ6bu3PsXZ1lyKlzuS1hR6xShI7U63AYxqiz8gbH3dZSeKm6kx2y5bfFdm7lAAAUzp4bNLRW8ogOnPCuezBEvV/ENx6rYuLU+jgI3FJId2P8STdwDoYhSEycp4nhTh/DYwPCK6jGsaU4+caouFou4zDNEGl0ajcUJFeaReqmVAiOCObGoXWm1JmE3cYwRJnkGQfFIXW7oX3vqs+nJ1TZBLquRzg1PCrk4WdXJ8kQh1wh7obWv4LAIJ3G/d3vVhpLHZX8wS+gAZlGTCrRBzcDTO6maMQIhl6c69VqH7cHw2pynH2uwuW6ZRmqOavSvbgwOjn6+mwqxxR64IowlK4LhQA3YiqjK9M1w95C0wP7c5zdHpIa8T65p4B8wDLE8/2SxR4MDt+FpFmhwrFSpBf9s3hrwcETfHPsbgnPOb943cH3Bz6PB5nmrcs2Sa2sIxh20LraGBX3z3o+YovnNoTH2f3LVBL/re+e93+293WAmPy+l0ihetGfE9PjmLQ1pIoXvk8N67J/0F5YkE3mm7Z3gmay+lyTrf2OxVCz/7/jn+H0SSlXG/2k2FK6T8KZFCuDjdWStnbB+olhL7fTltgeGr96/mVESpcTlaykdZX8pyLCqmYmO5oB2lrWEGWbUPD7tVNb/Hlu811P8S/mqp5SKxJoSzhGLTEJCblhNFDjC5/pNTJBSW1QpWUIKPW7XEdY+V6znWFS8NlsPQF+sLB2I8jqnmmPrxwEPsQPSL6uda8Q6Kr0j6gDCAUcs18rsLs3hIR249hocVliXerfxceCvc1wmO5IWKfTCqi2sw9nQsdeqIkujMcZEUDBeyDFkdlDYHSyx1s442ZD83aXaWvygCg3dlKqd483Mx2dwrolNCE4MDnwPzqL9S/u6dTKIWdrG0S3XJ8q+jvho91XSgSnH4injTpUQtLMvmY/qpEuWOB9MKbdAPGsgbrhum9GQG1+IFJ02OWlS4q28/Bg/VVrR8JAJSiOMlrU4Hc7gh9UvxAHMG0uusRAzL8XqpDMRWab1LpMUhkjJCL+qDH55bhopk7qstuBVbiySlwWEqC4yKI3rO5juiHFSyoYJB2XequRo48uspwxDPa/L55h5Oma/7beCe9PYTgY2vN1GhFCZt91NJ6aNGCQLX15mmNHm3esir/PldexgyyFzMyRMprvbYWDpNlwy9JAFly+vsEMS35/fWbcuc/5tac4JyRGOaJqrassqJAkcjCzDG1dIlLlTH7yivK7hgHJC2m79G/aTjpu011IpfABSrhrJcsyGyIoncJlO2AuFg/dXN6bqBPVuqspdq91Md0YIoVxgXqEmphPmLVEzlsNDZqGJUuzfOuqwVtkO7wdt452R4vi14gelqLjxYwXpSCYq46ubg5O4/buxqJsZnYi0ibCPJoO0XGXcX0cDE+2IATjv7RfH06O3y7T5yVDap2FtN4Twbl1KM0Qnrbk/A6d2mje8ZLvpwU/t/nXnk/zYbKd17T//ftZa6kgGzCvUpWH1W7XN2nG01ef4gfmGlMZcWgT1B2PX8VFwZPpCaRM69eCq4wur/poTyXmSpglqHSwr1qDxU+G1GXVA7JWhUOIJwlE22xi2tnYpGSqETF/a/zK0OCCts0zsjjLOD+3mZjVbjxWBTo/j/F+AAQBG7gkLDWVuZHN0cmVhbQ1lbmRvYmoNNDQgMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAxMzczPj5zdHJlYW0NCkiJbFdLkis5CNzXKeoCTyEE6HOMOYNjJnphL2buv5gEFVK57eiFO5H4pRCiSFJTPv/UxL2eVJMWOv9oYm0LcaLO5+MYSZsGfAWkVLGJcmpczz/4GeWkklRHoMdBAvO0VjWpFNcUWohTyb73wpJ6ljM0Iey67E6EvZfXia+AkNEGETu1JKVbBKMOBF8y7Erg58I1ldoMU2Lqn3jtl1SafMN5GN7+Jv45iqZK7RZBR4TlZuHCyyMyyPUTx34uSSp/w9Pj9hcR8MC/FBZfh9jSLUeuvhXSPi5Y2oYlUR633Zxye4M9qx1FdtgT81jwx62Jl4uwwDm31InttAqKAAo46Dv+OURToWL+yYLVRNoneh5SUElkuyvO/2mptHJLHqm2UjfG/soerRS59GcyF4Z1pGElWd1+S430tg7c+8aa38mVkarqDbdk5iK8n0NbKqVu7rWnwrd6U3EcZAMSAlkwgxW97SZclvqGh9BiWxGmFeMi38z1zb0qto/NtaJ0pN+5r+Cj+F0S7tAIjB+is5p4XjvcsQouNcDjqJSIF6450QwFR6lgid1vY9sKTLXbojSjCXiIp5X5rBRd6XIwARwIbvtYi9jc3EaHh0AoJvQJ7L2w1aqcyCIPHIvZ62flVFFMQLWNGXi3M0ePMc4ReWvsUCyN0h0w7lggQlG45sKEtgk0ul/sDvPVrmUAbOU0Gq/FyYQpopqqtV3vi+I9C7ix721I7Wk4z6IrvZkuletCTCf+r0ejsQBGWb0NVXT5QEgUtDv/jgsC9qMq2du9dVywYRXMOJoZtqi3U4XC087A65/9J6qDwUc932sHuj0NXJqL59fCoKkZ0Q1qrX7D8y7Vlsb4gFH6TZBn+cTgshsOb78xMiH3Bupm7O94Rmt3oY3U+7rrr6Ph9vRbaw+8IqjwwJ8YgQkbvuwF7iijKoE7HFd/DhnPaqCScrZzCIzzHNh7ac5I3uN8LL/glT1u9MS5btj90vWEAZstqwzrK/N/+FS7b4EGIjAd8hoppZxhcaLtcWLjruNRK5u6jrIpm7kLBlEdLUP1Ey+iprGAA0/2WDwOhD4keAsUvAWevIXmjOMtxsfyGrRhWQrdaAPNedFopqyPT+ICBXUbO3mgSyToCbtBXvjd5P1z/IW5BD0RLxUp3le2x3nAYPW++d/fGEsqKGxrGWMFJg+tZUmeNwnmObbbCweYJeSrZGkVXHke3yRoFNkflqX1KcF7J9TevH9ItlZksSQYlzBvaB0eozR7g5Zk6zH5A/tFYplJf5PY2yWn4WxTp/hwWzBWmTjwAyngqaZx2wFTKBo3gM6xMX69jS7JjQYMX/WLwJLRcRfASZ1OusxzxBDoUXEJ+PAsBE94rC9y7C2k8zdZUBCkTXQvDMxEyvPQWXxktXFcZyK5n6YiVf2kyBJfuKPcxmV0SobPmmZBeZ9kwdRnFR7Y4hYf1O4ndEl2XbH6sPZNglYwBd3fny2AZxn3ev25aQ0f5l6uVkWX5OkkDP/omBLPILPnaNf5jqnMnEPSMKBiByz01h1npz58TPy4xTElc/jHxc0zAWuRr5sEU7ka+8Pna2OKqAJjZ13QAhGfGfYGe7anvkd+QajhAtr+SwC+i63bd5GsCrrMrwIz97wEOzpoYVT8Hb8p8DSwEgoBjgrTRBEf+Sw8tmtn/oQXNgPdX6+9A0dTZrlZkW28MwoJHvNsOYSF66YuH+suRxCx4QpR/ZH4lQK2YxDuk2A081fgXZdGDstXCb53Znezu3H1zTrokmimb5J9K6BvzeSLRNW/eZ8zml5WfPOJ+PfEZwL+yB4UsnRQkEqI4PE6zv8FGAAsuw0MDWVuZHN0cmVhbQ1lbmRvYmoNNDUgMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAxMzM3Pj5zdHJlYW0NCkiJ1Fe7jiQ3DMznK/oHVhapd7yxDRj7CQMcHOwaMBzc77uKpHp61gfcHRw5me4Sm1SR4kOTj3x83HISbUdNbRb8ZpnHTDoKfkcd+C2jHvebI6mptHa83yTlJoQC6UtLmtcx0hLdICcVgd4JpYrLJkAe/t7B4H774/bl9jt4rDEgG7XwF+aPv+9/3v46BB9l/K5BjXlI0zSHruMO8ubCCyyuile8yBx85Cx86BRHhVwCt7QmnSAuzXF13eWoGAKRQPdbTX2MDWdqax4vKw04jMggfi8WGnC64UURxL3w7gvLFhQb8KHiEN9doNQZ+lzoqYDcSLNVCwAj5XEqQxnD2vmL4/gUJ8lgqQWmC7nVS6AYiem+MdRZPEirPUCtdDdgS7LgdUmrC/3NcHSm2eMdIZ3Yqj9EaxUD2NTWpiP6tbE5Whl+fF5bLHQzXHYgFuGQcUI7vdnLudBSyzg0xEdqgJ/IpTnhGY6NIUJOXENk6WlJihRCpJoFJ9OQFt0pveE7YV5KJmUh+FDmWZfUcG7woRRDI4tXEfFMPTMBS5rMI6RTseyt+GxejvqX17d8vL4d3zjyt9ff4KXCv69HPX49nuskd2wjulKvSLFHnVSU6OBOCD1cwP59bgBSZcaRAoIzK9Y1BKU3WKzxwnq4rF81no1d99mb5zgorzAtOAAluYHgjI3tmJFZ0pFg9YTIISvHU4wQyBGqTFfpx1m5BKSQtW0ItSot1AJsm1vmO7pasHmiSu5vP1KI/ynJBDWnjyQjpFQGSwSgElzesxeJQ3g74RP6pLWmnPpaTMZWDY3mZ2OYyTgsGVe2smv0x5KRwbz0ne/UlPUdsKW7TcqntqPWh80C/WQPavUB3OuAyBT2GLad5X3BH56sRJ6mpV6kS67fssMbGvHt9ECsFZ1HdWPrQwHElEY7IZQRxfVYQICbsjtjDG3AyUH6D6gXWe6uJU8N6kea+DeDuU1xCE/swKMGPcUyChJHrX07EcgDgDb5kNKEoerBWhtFsFYM/ujSDr3DZwd9n4iDO5tLrqeMMRgo+V7Hz+TQQvFV5VRcSUq/zvjwE4Y52pnFniqTQ5tQIrlnDKZR17lgfnBa8+Bgn9nNma+Y0cps12SDMo5HeAL/PhK0jcbGynruz/UMA9Wr0a2X3uyBK04gcOqpc9OQovCkbEUH2Znz1Zddgwp1m3Pgpa4zYPbvr5GW3jEb/o/8z/baRzQ2FpHuoSdIxK/w5nnqSc6cOe6dSP3sXbZBDDqLjaXzioepjCIMZHN9tn5KBxphOzUdmX/+Guuu82TwtOe7OcyhsD20m5bVSUawPk4sSFt7WLIXdBkxRl02MqK19FPaUesPzUBu186MGEK7mlOv2IU/jDowstwxZE7GlZ6IGnXxqUXW/opHZW9Wv7lq6rzoFb8YO/Jrk85T2mF2npqOshPma6y7zpPB057vFjInElqbYLBtQV+dcbNgCa9pmprag3eJB2HRaGjL3TEpTnrJqRnIzXru2HDgJA9F9U61WUuOacItQ2ZkQunK04gjYdQKAEn0sSFvwcUa1+A/L7G/bTxL3tMdGfNu/zhc2qyStmbbdTWXEycUv++7Hs69b5v2brS5n0ucSahcWQbtNuxOgxv5x4bYvKn9k8h2uUMtGLKW7Mhol/qQVhtvW9ORm7VPHdp92vV4qWvbqAN86DuGbHMzrStRY45Py7RrVSdzh7ybdOsSpVplmDuRKo6MDq1sKS+Semo6ynEdPWFdlinUw8nkso06MObc8ZQ5N9O6EvV2efwjwADqX/r5DWVuZHN0cmVhbQ1lbmRvYmoNNDYgMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAxMDE3Pj5zdHJlYW0NCkiJzFfLjhw3DLz3V+gHRiap93nPCWDsIR8wsOFDbCDJwb+foqiekWZ6Zr15IVhgpFKzKKrIpno/bh838qGII08x629Kzv1x/ra17FsMjoNgzO4UfcjRMflcivv90/Z5Y6d/Zsy+BRhH8TVktaImyok1mfGHl1dyL6/YIeTSd2v6m8W515efEQSX5L677Te4JPyx6wGArk4lluzOXzd98nVjnyMidr9ur4j/iAGLNjPEp9TeYHBMEyMofsogn1pYGCnzGwyKPDEizp+fMULzsdG7GBWJqAtD0nSOvhpYnFDUxPzivh0VwEgJ9vruovtpTgsTw6UmG3tJ5nbdi9xJfGR3QjVItZJJfaC8o/N2yj7XeHlafeawEw2QWtnUlo1hFTjcGYCd7WWQzJ66hy/9xORb0XorqGX8plGwq3StqXQB0sVJOsQUUsUUW0puTmu87AAbStH9DWZfkNnBQOhJg7HxvOlqGUjN6zC3+e7JkG1iDBonQSa4OMaLWDWs6EvLA0KmUl2DQRpzuIvFBAQ6kY/CbnA0WFSJ+RvgvCVPgXfYPHHcaQZ2j4ZsL+NYDHN4Z7zqKjrVcPA26/n+vzJ/ORK6TEKXNild2iI14Kx1+U+03kv8aUtlWl9gy0SwTEjlNRO9hWl8JapIcZ8jsBBHIgChLNQcBEjeu5KNPRGXVTVPw9zmuydDfY993/s8tGaJqBR2rGrjcoE2UncAn70EBrxmQnkacpMpEwCWibpDyK3HuWSiB2suDdluxhlxLEFec0FBky65px5N57bdNG2r0FbQywVVPKvPhTWIoO1xRbhJNbvW8IqtVO4DGr87FSjYT4NrTgFL7xvo5UCsh79Ou5vPj2/+KVjkMOrNFXHrt7x0eiWnPlCv4Vz5ZuixUiqXZUaQ4cI0NI7Up1gvbnCUIjvTAAxtN4M0CNfzLCpXoWqRL18CZBuo55rsqpp+zpqFlsZKQPnwbm+gh2tT7i+c2V8cDCfmXAENu/lOmi/TgPy20D9AgoR2J3E2idNTieuRxPmBxNkNzuLp4s92G4uDcCQxE4ot26dTiCjFNyUm/mdEJv4rMteo9RCST5z4TuZqMmeTQ26GVWZZZK4PZE4HMssqc15kTg9kRtPhNEIPN59btzqTTHLLorQ+epfWe7psOqvdac/0xuuXc7B/HvDJey/3YVXL36nqMssts9yyVvXzxsGEU+I17JGnyrdqxzrJXdtc2LUtpd0fXgVX4pHi6ulGceInmid+pLmWeLLvWNxB9836hzrJYbN+pHl9u1mvmtfjZo0KFx6Rp3DXrGN7Z7eO7d+tbjxk/R4Jxdd6cC2WRen3NJPyI9V93EzWnr1Xt/tTgAEAxIX+Jg1lbmRzdHJlYW0NZW5kb2JqDTQ3IDAgb2JqDTw8L0Jhc2VGb250L1hQVEpIRCtMdXh1cnktR29sZC9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRmlyc3RDaGFyIDMyL0ZvbnREZXNjcmlwdG9yIDU3IDAgUi9MYXN0Q2hhciAxODkvU3VidHlwZS9UeXBlMS9Ub1VuaWNvZGUgNTggMCBSL1R5cGUvRm9udC9XaWR0aHNbMjgyIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAyODMgMzQwIDI4MyAwIDkwNiA0MDYgNzM3IDAgNzg5IDc2MSAwIDAgMCA4MTggMjkzIDAgMCAwIDAgMCAwIDkwNSAwIDgzNiA5MDAgNzkyIDc2NSAwIDAgMjg5IDAgODY3IDc1OSAxMDE1IDkwNSA5NDYgODYyIDAgODcwIDgyNiA4MDMgOTA2IDkwNSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNzM3IDY1NCAwIDAgMCA3MTEgNzI3IDAgMCAwIDAgMCA3MjcgNzM0IDczNyAwIDAgNjQ4IDAgMCA3NDcgMCAwIDAgMCAwIDI3NSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDk1MF0+Pg1lbmRvYmoNNDggMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAxNjE3Pj5zdHJlYW0NCkiJlFddijW7DXyfVZwNTGP9WdYyQpbwwSUvNxCyf4iq5DN3Jnx5CAf6WG3ZliVVSf3Hx98+/vWS1+qfvEofOREvsXxqbXv9+vMDM3h+yrO8Xp/rOQGhvj1+fXzqU+/X9pwlX/ojLejMsN9HT3NB6y+dZTNsLR4w0rrKi+v/8fH3n9baY0fPS9weWSk/rF2P5ebfCvztM0+9Qh+Evc97Th7b/rVspDVaHPZ7amEJVth7uxFoN44acd0FY/gfP832JyKv2Rr7v50c/5+P4/cuhuu/XCx/uVh+uFjGxa383cXrWYab6Maz7Xy9/v3rn9+ucPwp72tK6OMKb35d4dHxqWh74fFICCpwGodmcFZ7KeG65dDaCPHDI7duaNLM/k/huzbvOYmZgHOfmrEijPIIzXTFlXTz2H523BY3L6WWBaJYLcnjtqF7sp+xDp7HqRWYxoE9dDw3deiu9KDOLk4L3xXmTXBecdmilj5rIw7Zt2of9X30UdV+nnaX9rZJrXM4307BGDNq0CrZ/UQYoFW8T7al9jC8xtGB5asT6KMzKeCErH5vdH1AJcYdUtTZyURuA6014ULtYzplGIoyKpXIwMBf3rAihjKthSBSZc1mHblPOAn2Rx1km9J7BwnQBtkebwnBHnQN1aSKUeV2uYuhltldCyYumpC/hU+b1LnQxopXD/QbfmB24MLwADbAvVJpqNC2xez7fEfU3GHQQiq3rzYNTV7CchAXgVQ57UcIYBvGuQUfDA34lWeCPnM84QjrXB15iIhfPcy03VRLxtGoJgJBcgw8h6FMQvd0LnX4egsK0CuXt6J2bHw4rDphGpuXJvqQ6AjpKO72WTSZkd6gH33kHqfvXnXgSig2KSHaRjqsgzlVRuQIjIJpJJGM+pYjCwmDu4IYucO6vAg8OYEGof9aEO4eZ4S7oeMqcjmjI4k0JR0u3tkqmSur4A4yVIepR0UCaION4YaOJzLbwR/BJBckQ2yAK3NyLhvhgBopBVsuBZoFQ2FeChGijD/GyPVEQkhiI73cgtAhEomNguxAzkp16NawmZOBSNXtUDCi/b5CnGpPIMN1d1qV/MhwPyzCJvT6zsn0mMpsDLxqXJZPZox5TigJMU9WlNVIAxCsbnos5sKZv4zJ45qXGZCyLnoKpxr8AfQIxtuZ0UwGf1Z+wccxG4OfI4QYlytrXB8xwW/nL8peXNF355HcXH3Wzb1aHntKaYbNwhLWRTMf6epaDlqdO7ny1gUotZSUPHR097gGPkEl3fTmbkjiSiMUt8UNuXTjEi0V4beTkgzl7P3WdW5rShMqB1hJE1AAAIShh147sdoNjJZsT3gPTYicKJ+ruxd3OtjQiTJIneKQYua8RjemY4nD2bD46o2c5RAg87uvEioy9qGL6dSh6cZ81n1dKyyOqCcInwAXPn3HIQZSJwmSlLoPg7jr0iu5Foha6zJUOavEcN46m6Cu/1EFTvusrVFHK/GzCEgCiDKNiBFp4xvnZZADQzcsRD5ICgUufdH9wb7E6vJSBCvkO1Skp3Hn5r5Rl+lyOmSfIJ6Jl02pXHZ7obg0y8nt03za7ZjPQJQr3C8je+lbRnrKD8muFO/KVsMB3HD7JNtUBBowFRfuHvZH9gO5jMhi+HLwBgdPAHWgOfGbWm98xUYYzc5tUPekvgf3QVd1k5Bp8OZ1qh6ZPnGgPam8xoraiL2sm2dL/TVNJImBoQHdtCDOLtOuIjsZ5BkaIlK2Mjk9psKfOdrJ80OAuVAEtpEphQUu8sa9iuQ/YUTPTh+0Kefd6FBtCUSj0YvPo8HulnbfDmc5jJNif4OniPz+A2G3k1BwonMc5eJ7d82FbH/tsJtjQ4xqsRjsMcjY9iU/dvpjDhqdH3NYh9qQ6qhwf7ZkmwBBjxIskohQewQLyBDTpw4gUG4RbDTy+kIJgBFihz1hugwquhVgVi/U8LhtXziVVg1f0O85zWKxRUpAwkmJODO7MH8GMYEAFYXmPh3eDgIS5Re1HmLOrb8EolpH2rci/iVDKrJs1cA1ePyu68WD9q05WKe/MWZcDaukTV17d0LGnBuEn+F5GV6pIELqXWeRbwCf3voxjdXx4TwGJu9HGj5dYFZMGNFj2PTOwk8Tm8QqfuWhYuPLhl8dYMaHXW2yvL7+I8AAp7D3jw1lbmRzdHJlYW0NZW5kb2JqDTQ5IDAgb2JqDTw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMTI1Mz4+c3RyZWFtDQpIiexXTY8bRRC9z6/oo0fCQ1d/VnODxEgLiUN2HTgAQsIQENpdEiKBkPjxvFftJDPROLu5R5bs6enqV1Wvvtphij45mUrJLkypCZ5Dw2PMxflJ8XwcAl41rEqkUAgVzylVPEsUPEuh1PPh6YDj+LhXx9vhJR48PuJamUIu6iTrlGOI7ngzcOdm2OJspJ6QssPCx0joGviqJarExnHwU1SuokbbMaW1GH5XzLOZe4XfkuK7RmicSivRSaQRcOeNEfS1ua1MNVd3DaSswW3TJCDm2oCT2wb8NIP61/TNgNMUqhI4gRQpc2AN5pYKgGRqWtwWZsBJ4tZkWpV+ruGCtYLzEgkgMsdtUV1n6/q0goFNoqkB18QtPqzjtklaBW6o1J0W9nqGWUsAEA01oFaK4ZacuRSVVdyG4xEWSciwKCxwkzCvipLQNHngg5WaU6eFahBpqTNcP7XKNKuJEa95LalUFW5kxG+hjpGUQEZSoiMWSotDqY1rxBJuM93qekjhCnYk0+eYFulacySyNqYKg+ktOcQzxIym9oi/h3xtKIXUppyzvsWGNS1bGFvqRmoRpovPpUNDGt9R8rl0iaEAuEzZR5kDt2A2ajoBabM8rEn7WiyuFelzJr9TTDQZrOQyowNnDDgFJp7xK1Y4VkdYZ4SQCaTLyN5RqSLeUoWVipybVSp15YBMqu21xhgc6i+kvvTYRTBW/SAs9qM5onWe+GQ9WLuzEmKCIP5gKLSOW+EB/Eh1HdnXySqK3Ld5a2H4enZ7FI8ljEcYoU5D5z5aYaT1bEEHQlW/Thd9x2TmEZCbbx25Ihon1EqSgl9vLMhV0F4tv3NtZcmv9k54KhzDQJjriRZPlkpwH1ao7CBsC5LbIn3YblC9NVhbECV4NqIYAaJ6Wa/Q7kPp3QaZ2+b5rokUa+5drIoydnrqNdlsPc+3Fq/WG0vzZVH63qxtZi3LNHJlzPQIsvPq2QRRm4DRhugSVzOnqqbW/UYLRVuxFgxEqTacz0WyseH02RNaXTbB0myk5z5t1EfHRthXHKtgI89LnrFko8RuKadpb7FsSAhEQwJHKEdv9Zj97GTR/fUrzjIaKepCoiwkKg21ig7wEyME7Z6ZlVFhJoBH4UG7WwQ9aS4VnLogrkysL5DS9fVbxtWDvY07949L7rGbEYN+IEs22DSvh6sFfYEmzcXWpZKL/j5Qc6lVIQiIzoSwzGtC82Hm3XZFKKB93A1FqXNY3mSMQt8p/EjfB9D30t5FXDPYIZGU37nblbSc1yrI0vnVV3SNCDTIhdiqFF4GuQ/UXGpdiGBlQYSuCy15WBFq94Jq57Hem5If6buLvqfDFwcSV3v/DdbBU++jnx7kJ54/PB/6hAKbmHU+4b7Dq0VBwz3cDJsXn42HPwb07cibzuGXYXO0N7O/dVBZHP955cj/PSichtGDds/z31DYbjvucLT7VOg4328u9jv34HK3+3oU7zbuYv/wYhRcCdzm81FwzXGbvbvcjdltrnaXY4LMt2Pw3rZxU9wcLp7sxx8PX3GypWb3ytCRQyDD7oeAEfH44tHOXT4cMw5Ozv3n3JfPHo2s9c3BXj7ZfwIhl0xD82ZMtu8wbingTImn/bhR8wr+RtHt7z+/GLeU3d6+up1wiub/Nkqj+X+Oydz52wB2h8H9L8AAFgD63A1lbmRzdHJlYW0NZW5kb2JqDTUwIDAgb2JqDTw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjU3NC9OIDM+PnN0cmVhbQ0KSImclnlUU3cWx39vyZ6QlbDDYw1bgLAGkDVsYZEdBFEISQgBEkJI2AVBRAUURUSEqpUy1m10Rk9FnS6uY60O1n3q0gP1MOroOLQW146dFzhHnU5nptPvH+/3Ofd37+/d3733nfMAoCelqrXVMAsAjdagz0qMxRYVFGKkCQADCiACEQAyea0uLTshB+CSxkuwWtwJ/IueXgeQab0iTMrAMPD/iS3X6Q0AQBk4ByiUtXKcO3GuqjfoTPYZnHmllSaGURPr8QRxtjSxap6953zmOdrECo1WgbMpZ51CozDxaZxX1xmVOCOpOHfVqZX1OF/F2aXKqFHj/NwUq1HKagFA6Sa7QSkvx9kPZ7o+J0uC8wIAyHTVO1z6DhuUDQbTpSTVuka9WlVuwNzlHpgoNFSMJSnrq5QGgzBDJq+U6RWYpFqjk2kbAZi/85w4ptpieJGDRaHBwUJ/H9E7hfqvm79Qpt7O05PMuZ5B/AtvbT/nVz0KgHgWr836t7bSLQCMrwTA8uZbm8v7ADDxvh2++M59+KZ5KTcYdGG+vvX19T5qpdzHVNA3+p8Ov0DvvM/HdNyb8mBxyjKZscqAmeomr66qNuqxWp1MrsSEPx3iXx3483l4ZynLlHqlFo/Iw6dMrVXh7dYq1AZ1tRZTa/9TE39l2E80P9e4uGOvAa/YB7Au8gDytwsA5dIAUrQN34He9C2Vkgcy8DXf4d783M8J+vdT4T7To1atmouTZOVgcqO+bn7P9FkCAqACJuABK2APnIE7EAJ/EALCQTSIB8kgHeSAArAUyEE50AA9qActoB10gR6wHmwCw2A7GAO7wX5wEIyDj8EJ8EdwHnwJroFbYBJMg4dgBjwFryAIIkEMiAtZQQ6QK+QF+UNiKBKKh1KhLKgAKoFUkBYyQi3QCqgH6oeGoR3Qbuj30FHoBHQOugR9BU1BD6DvoJcwAtNhHmwHu8G+sBiOgVPgHHgJrIJr4Ca4E14HD8Gj8D74MHwCPg9fgyfhh/AsAhAawkccESEiRiRIOlKIlCF6pBXpRgaRUWQ/cgw5i1xBJpFHyAuUiHJRDBWi4WgSmovK0Rq0Fe1Fh9Fd6GH0NHoFnUJn0NcEBsGW4EUII0gJiwgqQj2hizBI2En4iHCGcI0wTXhKJBL5RAExhJhELCBWEJuJvcStxAPE48RLxLvEWRKJZEXyIkWQ0kkykoHURdpC2kf6jHSZNE16TqaRHcj+5ARyIVlL7iAPkveQPyVfJt8jv6KwKK6UMEo6RUFppPRRxijHKBcp05RXVDZVQI2g5lArqO3UIep+6hnqbeoTGo3mRAulZdLUtOW0IdrvaJ/Tpmgv6By6J11CL6Ib6evoH9KP07+iP2EwGG6MaEYhw8BYx9jNOMX4mvHcjGvmYyY1U5i1mY2YHTa7bPaYSWG6MmOYS5lNzEHmIeZF5iMWheXGkrBkrFbWCOso6wZrls1li9jpbA27l72HfY59n0PiuHHiOQpOJ+cDzinOXS7CdeZKuHLuCu4Y9wx3mkfkCXhSXgWvh/db3gRvxpxjHmieZ95gPmL+ifkkH+G78aX8Kn4f/yD/Ov+lhZ1FjIXSYo3FfovLFs8sbSyjLZWW3ZYHLK9ZvrTCrOKtKq02WI1b3bFGrT2tM63rrbdZn7F+ZMOzCbeR23TbHLS5aQvbetpm2TbbfmB7wXbWzt4u0U5nt8XulN0je759tH2F/YD9p/YPHLgOkQ5qhwGHzxz+ipljMVgVNoSdxmYcbR2THI2OOxwnHF85CZxynTqcDjjdcaY6i53LnAecTzrPuDi4pLm0uOx1uelKcRW7lrtudj3r+sxN4Jbvtspt3O2+wFIgFTQJ9gpuuzPco9xr3Efdr3oQPcQelR5bPb70hD2DPMs9RzwvesFewV5qr61el7wJ3qHeWu9R7xtCujBGWCfcK5zy4fuk+nT4jPs89nXxLfTd4HvW97VfkF+V35jfLRFHlCzqEB0Tfefv6S/3H/G/GsAISAhoCzgS8G2gV6AycFvgn4O4QWlBq4JOBv0jOCRYH7w/+EGIS0hJyHshN8Q8cYa4V/x5KCE0NrQt9OPQF2HBYYawg2F/DxeGV4bvCb+/QLBAuWBswd0IpwhZxI6IyUgssiTy/cjJKMcoWdRo1DfRztGK6J3R92I8Yipi9sU8jvWL1cd+FPtMEiZZJjkeh8QlxnXHTcRz4nPjh+O/TnBKUCXsTZhJDEpsTjyeREhKSdqQdENqJ5VLd0tnkkOSlyWfTqGnZKcMp3yT6pmqTz2WBqclp21Mu73QdaF24Xg6SJemb0y/kyHIqMn4QyYxMyNzJPMvWaKslqyz2dzs4uw92U9zYnP6cm7luucac0/mMfOK8nbnPcuPy+/Pn1zku2jZovMF1gXqgiOFpMK8wp2Fs4vjF29aPF0UVNRVdH2JYEnDknNLrZdWLf2kmFksKz5UQijJL9lT8oMsXTYqmy2Vlr5XOiOXyDfLHyqiFQOKB8oIZb/yXllEWX/ZfVWEaqPqQXlU+WD5I7VEPaz+tiKpYnvFs8r0yg8rf6zKrzqgIWtKNEe1HG2l9nS1fXVD9SWdl65LN1kTVrOpZkafot9ZC9UuqT1i4OE/UxeM7saVxqm6yLqRuuf1efWHGtgN2oYLjZ6NaxrvNSU0/aYZbZY3n2xxbGlvmVoWs2xHK9Ra2nqyzbmts216eeLyXe3U9sr2P3X4dfR3fL8if8WxTrvO5Z13Vyau3Ntl1qXvurEqfNX21ehq9eqJNQFrtqx53a3o/qLHr2ew54deee8Xa0Vrh9b+uK5s3URfcN+29cT12vXXN0Rt2NXP7m/qv7sxbePhAWyge+D7TcWbzg0GDm7fTN1s3Dw5lPpPAKQBW/6YuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t//8CDAD3hPP7DWVuZHN0cmVhbQ1lbmRvYmoNNTEgMCBvYmoNPDwvQkNbXS9CR1tdPj4NZW5kb2JqDTUyIDAgb2JqDTw8L0JDW10vQkdbXT4+DWVuZG9iag01MyAwIG9iag08PC9CQ1tdL0JHW10+Pg1lbmRvYmoNNTQgMCBvYmoNPDwvQkNbXS9CR1tdPj4NZW5kb2JqDTU1IDAgb2JqDTw8L0JDW10vQkdbXT4+DWVuZG9iag01NiAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDI1NzIvU3VidHlwZS9UeXBlMUM+PnN0cmVhbQ0KSIk8VG1UFOcVntnZmcETGZRlFsLqzqiAxiAYLSiKRxTkwyCIoAiCQmCBxRUQWFbUhGjssRatil/NsSpVY6VgsE1Ng2KMIURN/Eo0BmX5iGD0JDQki+bO5M62fYmauX/m3HvfZ955nudemtLrKJqmDcsXpy2Mj3k50b7OXl49Ja7Ulj+cnqCYaGWMXhk7UsQlWDeG81K/Y+GPXvDhKPho9OkxL8jeFEPTbx9pii4tqy63FhZVytOmTg2Xo4vKrRWV1twSOTWvyJFbXrleDpJjrCWlcmpuSV6RZX2wnFyeW1JokRMqc23WvGDZXpJvKZct6/Js9gprlUUmSUtJhUWuLJXjS+3kJaEk315RWW61VITOJ0fz5RhLhbWwRI4uDQkmxbwQeZ7NJi8ZvkOFvMRSYSmvsuSHJJWWr8m1hcamplWXWeSpcr6lgKJoEpSnjhqto0Sa8qep8RQVwFCTKSqYpabrqWiaiqepZB2VRlHpFJVNUQcp8kwiVFF6iqeCqUgqiaqnrtASnUI36UbrwnRFurM6NxPAxDGZzJ+YE0yn3lOfqz+mH2TL2B3sZXaAS+T28cv5Ov6yxyiPAo+eEcwI04h6/FLQmoTxVTCxCnQOuhO8mE5jG7dthd1uXXtkjd8n75xr6fLvQi9e0MqhoIf+F5wVZ8D+Hl6oBd2zfvACHXpxQl+NU6l20s1AKf8FilF/gasiOND6Pa7EVWh7CR24AYqnQi6JgkewwewuNsI8MN+EuSTMMTgPY9GciHNJmK/BArOgTa2vUvUOGtJdDKQrO0Vtp0vVz+fjklPt8988MN/v2p7Wg+8d9xBm1fYpBU5a6STfPV4nblFD+rQW/s/dP/8DdA0eMKsFphwHsz+MRf/zmIQTcGT2ijjzhQVs8/kfzoKfCaQvC2IjA9ejsVDCkByMSsF8f6GkvmrQqax00EqLi1Fl4yAIThSUlVt4t5d2jK1Rmify+BASRHgIDSw28MKSGifsdIJ/P931rZIyTEIx5IgQilPOYOKk+A3VGWaIVKr7tduajt+1jW38vKsRJpsgxFkaFjk9BaNxfGRTS7KUFssmdwzZYIoJNsK4r0GWhNqabpjuhK1OupEQfAL0jBoFX4kbMQB9Q7UZr++c6acU7oc0YOCAP+RjSDtuwmycloQTMQgmLIcsiBg69/57ZvwAXhdhwY+WGXOQz8FZ+GrC6c6enjMQKQnaX4msMIpI20uk7YU3xGfi4oD+ucz366vAs0dZ6KDVo0ZgOG2R6su+xWkxbl/2CecET1b5A4e7Fb0I6Xia1YyccOg3ZzDqJmWN+MlN9uocpP6GoSbcSvSg0YZlkBgI22AGME1fdEhLbrBZmXNycI6JWMfjHsyE34FHF6yC0FurMz+VhK7aXiWzl+52KdcJqDJT1Yv4wK2HBxycghkPoQxsGPk9npTwjXARijnYCuxSQm88eq7EGgmLOWFtbT+k9EJUP0FhIAn+J0KU0tjv9nbr1eB+rR1SFGMvLywjv3u4FxKftw2JkKic6XePcetdcFh5hbRo7zy16SMX88hIDBrACa1PM78eMcIsHpaBBN9gOwvjOE0Ct8LAQRbHclotullwB7j1vLC4tl9pfHamX1QaSVL16ecFyCBgwnBB9R2uKREi3MXz7B4OPoPzrBbhUoXNvPay5qdFKn7sZrfgIirtrmoevkKDw5uQ1OAyZHWrgkhKSgZvaFJHaEVsnWoI0JZxhiw3r+SwAvj8ppIaREj9Zfzw/Now82dipM3ESk9VWhEIW0ikD0GZ2V1nhGng0wPZJHzCcBqGo08kac1GHyeEm4V/E/Ls3bDhV6WOPWGUfUQobf4wdXbo5CDvh9vwIrw46RLmSdhJlLrJwZT2srCwhasxSMKbnHCBIGzvhMLnCOrXRqyG3SxIf/nqyhN/8A34GDPMWvww5Ha4yIEdt7PaUaVZhDscTLhSGRERW4FjJLzDCXtquiCnf3bn7H5I6PI++5Py98eGd9W5sEiMm5tFbBg7ruWfi83pUWzqN+BRCEtNxG8z22EiGJFqxIg9kuEwZuxlkd+19FC7/+cdzcSts3tWF9wwn7nLvh/5UgMmmtCKYjx6IfsoD8I3S4brkLGZBZ/ft61P8Bc21lcpTX00uFzMMaVJhHtak0tpgnt97q1P1+cFB33LpXxEts0dOCKCGoAuHgNjk9GCltjLEGSGHwMQeUwD33DYRcJwH9LMwv0dVaovWVOrQBbxnrKORU9OWUTmcQ+nxJDpRIYTZtXcya1SxA4Id3jfHlDmDRpaIfK8WHjti7WgN0EYCPcgFKbjSCeG4gvRJdZECeyTecNGt/47fgeMFKGIP93TevCxCbiOdNRJhlbUzclANjjp6KkIs4Aza+7CrQ761CCj6q+Iyy+xZQWvliBrwsDZbUOuzjYIfHzdtqZZunCVbUmJOoHeJsxAMRjHYyAYQmEFsH1HP/xMEmRc1QHe3W23IPZ2ncP77W9zBhRhwDpg+A+lCnBRfHfDydIjZmD3snd4fK2CNQxR+/Iy6xaaMCU0Pvi1Q0WnSyTrOuuaVf4FhxwnN5oNj9/MdBRbs/1fGcyBctj7+Bywg9HHcZwZV3NBhfsbD+/bd+yAVP3Bp5tumwgYpA5e+knSSo0ftzWBAQw3rGmpccVoQEPqqTbzA7woQjVHQF2HawqzkmxkP81NPt564sihhv9rpnz78hUdG6T5gNXWD4G7303LGYEhLfOG+YrYm++X2Dbcv7jkO5v03a0FxvK/5775Ppv9u6r9wd/cv8V1k9Pc5L43abFDdRKpTTsJqO2MDjufOSzof6QBQz/ge5nod6Xfsi9/hwOhPCSEZfW/R36P+i714ruq3J9TYh/vHPmu813nToCailXwb53fOlZHPsnxWf22L/vuce37tRuM4CTC/N1uDzCFnC/CkkIcQSlkr85f0Tfs38+woCUOpJQhz/fbDug8nvu2N23vf2e8IbTzxQ/Rl8LrgG0EFdEXdit+i/bLAfOVyURWw76SmWukNu2aDywS2E6WFx2TW3eJdYOj5UxQIrJXidPWvF3wXaAdlKeMWlnvdaypy5KKcQVm7t9CZqsXJculurCmHXla9F1R+nv41/2f5flc+sp+pAOzhQAw9f7u/X4XlC2+//2TzjqR7fufH+msv5nY+P5s/i1a9vNMOePre8zf3X9rif48Y/H3DLDQleg+mVT2fXHZ6XPf28uFvnM/+Mn3WFjnO/eP1aK/Nz74weXOnp6ZWBvSPNVHYseEdVOWzuYQ9lj1Z7XojwM/WVhN2f4c+MvCKjzph3+/aPsPq5O/b7JPXnt46YW5HN85V12e+UDqvsYyZQP7vNxkuY2hrItWHl50X/rGhqrMtJAmu1J5pVzdxN/cUnwV835ETf5uNo/td0g3u9wCV5eZM/7zcN7hesP9ZtosHt7v60V+HhMFCDAAhpWhiA1lbmRzdHJlYW0NZW5kb2JqDTU3IDAgb2JqDTw8L0FzY2VudCA4NTQvQ2FwSGVpZ2h0IDYyNC9DaGFyU2V0KC9zcGFjZS9jb21tYS9oeXBoZW4vcGVyaW9kL3plcm8vb25lL3R3by9mb3VyL2ZpdmUvbmluZS9jb2xvbi9BL0MvRC9FL0YvSS9LL0wvTS9OL08vUC9SL1MvVC9VL1YvYi9jL2cvaC9uL28vcC9zL3YvYmFyL29uZWhhbGYpL0Rlc2NlbnQgLTI1NC9GbGFncyAzMi9Gb250QkJveFstMTkwIC0yNTQgMTU1MSA4NTRdL0ZvbnRGYW1pbHkoTHV4dXJ5IEdvbGQpL0ZvbnRGaWxlMyA1NiAwIFIvRm9udE5hbWUvWFBUSkhEK0x1eHVyeS1Hb2xkL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDk2L1R5cGUvRm9udERlc2NyaXB0b3IvWEhlaWdodCA0NDk+Pg1lbmRvYmoNNTggMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCA0MDg+PnN0cmVhbQ0KSIlcks1uqzAUhPc8hZftoiKBY7uRUKT8tFIWt62a9gEInOQi3RjkkEXe/nqYqpWKRPiQPcNMfPLNbrsL3Wjyt9g3ex3NsQtt1Et/jY2ag566kM0L03bN+PU2/TbnesjyJN7fLqOed+HYZ1Vl8ve0eBnjzdyt2v6g91n+GluNXTiZu8/N/t7k++sw/NOzhtHMzHJpWj0moz/18FKf1eST7GHXpvVuvD0kzc+Oj9ugppje5wzT9K1ehrrRWIeTZtUsXUtTPadrmWlof62XC8oOx+ZvHbOqwObZLD0Sb8gb8Ja8BT+RnxKX3F9ifzknz8EFuQALWcCWbMEL8gK8Iq8SC30EPlKSSzB9BD5CH4GPOLID01PgKWvyGswugi7CLoIuwi6CLvJMTn9UZdnLopdlF4sulnks8ljmschjmccij2UeizyOWgeto9ZB6zzZgx/Jj2DmccjjmMchj2cejzyePh4+nt/y+JZnR4+Oa3ZMDxz61+ni+NOUmu/Zaq4xprGaRnmaJ0xSF/R72od+MEmFO/svwAAZ3cjXDWVuZHN0cmVhbQ1lbmRvYmoNMSAwIG9iag08PC9BcnRCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vQmxlZWRCb3hbMC4wIDAuMCAzMTIuMCAyMDQuMF0vQ29udGVudHMgMiAwIFIvQ3JvcEJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9NZWRpYUJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9QYXJlbnQgMjEgMCBSL1Jlc291cmNlczw8L0NvbG9yU3BhY2U8PC9DUzAgMzkgMCBSPj4vRXh0R1N0YXRlPDwvR1MwIDQwIDAgUj4+L0ZvbnQ8PC9UMV8wIDEwIDAgUj4+L1Byb2NTZXRbL1BERi9UZXh0XT4+L1JvdGF0ZSAwL1RhYnMvVy9UaHVtYiAyMCAwIFIvVHJpbUJveFswLjAgMC4wIDMxMi4wIDIwNC4wXS9UeXBlL1BhZ2UvUGllY2VJbmZvPDwvSW5EZXNpZ248PC9Eb2N1bWVudElEPEZFRkYwMDc4MDA2RDAwNzAwMDJFMDA2NDAwNjkwMDY0MDAzQTAwNjUwMDM4MDA2MjAwNjQwMDYzMDAzNDAwMzUwMDM4MDAyRDAwNjYwMDMyMDA2NjAwMzcwMDJEMDAzNDAwMzQwMDYzMDAzNTAwMkQwMDM5MDAzODAwNjMwMDY2MDAyRDAwNjQwMDM4MDAzMTAwMzYwMDMwMDAzODAwNjQwMDY2MDA2NjAwMzUwMDMwMDAzMj4vTGFzdE1vZGlmaWVkPEZFRkYwMDQ0MDAzQTAwMzIwMDMwMDAzMjAwMzYwMDMwMDAzMjAwMzAwMDM4MDAzMjAwMzMwMDM1MDAzODAwMzUwMDM5MDA1QT4vTGlua2VkSW1hZ2VzPDw+Pi9OdW1iZXJvZlBhZ2VzIDEvT3JpZ2luYWxEb2N1bWVudElEPEZFRkYwMDc4MDA2RDAwNzAwMDJFMDA2NDAwNjkwMDY0MDAzQTAwNjIwMDM3MDA2MzAwMzUwMDY0MDAzMzAwMzcwMDM2MDAyRDAwNjIwMDYyMDAzNDAwMzIwMDJEMDAzNDAwMzkwMDM4MDAzMzAwMkQwMDYyMDAzMTAwMzEwMDMwMDAyRDAwNjEwMDM0MDAzMjAwMzYwMDMwMDAzNDAwNjMwMDMyMDA2MzAwNjEwMDM4MDA2Mj4vUGFnZVRyYW5zZm9ybWF0aW9uTWF0cml4TGlzdDw8LzBbMS4wIDAuMCAwLjAgMS4wIDAuMCAwLjBdPj4vUGFnZVVJRExpc3Q8PC8wIDQ0Nj4+L1BhZ2VXaWR0aExpc3Q8PC8wIDMxMi4wPj4vUHJpdmF0ZVs2IDAgUiA3IDAgUl0+Pj4+Pj4NZW5kb2JqDTIgMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCA3Nzc+PnN0cmVhbQ0KSInsVsFymzAUvOsr3hEOEEkIEL0RLDtqMBAkJ/UknR6cpjOdJjNpDvn9PgGxcYIT956xjQWsVm/3rbBPCkNh8wQ05CnDY0o5HpNIADxtHsjJAm//eiKcgXunFFjC4e9PckdOLWHgXj3Qsh94E+wdoZBCkAKFhIdZHEOUhqkEe0+8plS5UVDkZQl6Dut6BXULpl6qulLg298koCFlGdgNDINn5AlYyEQE9pZcezjHD/CGB/53+xXXclAH46EQiRveEu+8qq9AG9AVVErNwi11PDDHPXECgZsiE+TflXntmdVyqS00ta6sgrlujQVjVeMHMd2tjGVF0VBWY9bFmc79VIBnW13Aql2oyqLUVgXABZzVq9Z8GRO4euiLVLqTuuVkoaSuFTyMhcj8IBvPfKUk4GGSpP08s9KFninIqxkUrTZoxFltS40W33CeTFfTLc0797r2YF+s+mYhk9KZ160ge/5K2au6PQcmKdx4i9at0+aNnhmoq9LPWIiVrm/8V/wvjRqL9BKW4Bg/GTpwoEv72lCTy9AyrxaqhaaAWe5j0Bh4lwpO1dACu/YzDt4bw5l03N1IOPY4lHJcDwrC9p3mpasl6ndDvzLk87kuX1qs66rjjDEz2RbSyeedeAypPNivgMVhhNttrKxRKMesmqZufTcVE9eoQuelxvAtWhQ8KIPGj1Lw8lX5obpdU689nmRhhHlKGZVblW9E7XfwnbQNWZjh3jUW836p61JVBaZudlkXA6ECt2pKRSijLJmuFgdiIvwfVNg1/P0Kt84ORAVmfnD2UhdWL8Go/gKeKnOwVGXJiXtIFgaG550pKoK+xvAMApZAHvEiBff0w63FsNDNPXHn9wQbjd9/iCEXYxRmbg82jcJHEj2GaoyaBCHA7dUtCE/jKRAXY0wwAeKSH0HlUIe4aIfpLKS9hZ/2/Yd9j921iCGCCvc7fAUP5G0sR2wYcCajsRFyyohM7MMmUXgR/wUcQTVGTYMcWbJnhJwG7fswAcqOosoOc70byU/7PrLvgvwTYAAuFSBhDWVuZHN0cmVhbQ1lbmRvYmoNMyAwIG9iag08PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDI3MTIvU3VidHlwZS9UeXBlMUM+PnN0cmVhbQ0KSIlMVQ1UFNcVntnlPVigG2EYKrvpzlQFRRH8oQIqGgwqKkEURIwWuu4usLD8dNlFqQpN0jSYPRhrjCGVEH/RgoEUtMa/CIpoYyNqlJqqR06aNPREe/BskzvrXXv6Bk2OZ8/bnbsz37vf++537/BcgIbjeV7Oz85dmpE+ZZHT7bIX25yZuTku69QFlQ7rEpfZYbeoz4xTjLwSEVAfqlGeDxVxLm579PmjOQS+eU7hws4/HzojnNPw/MP/vVhZVeu0F5e45Okpyclx7Dtl2uh3Ypw8Y9q0GXKatXK9Tc6prXbZyqvlJRWWSmdVpdPsslnj5TSHQ16pgqvllbZqm7NG/fMHVrK9WjbLLqfZais3O8vkyiI5w2a32hzrbU71drrTbSkrN1dbSuwVtgo5bXGcbNtocbir7TU2R63MzmGrqLZZZVeJs9JdXCJn2isqXbVVNnax3ml21sqLy9dnxMnmCqtcbq6VGUmnrdjOaDoZyF4hW2xOl5n9lrqd9mqr3eKyV1ZUxycsyslVN0mUrbYijuPZh9PxnJ7nwoK5cUFcHOFmBnKVHBfLpOYWc0u517jT3CD3gJ/FF/JHNGM1hZoubZR2vvZSQGqAI6CDjCHrSDO5SYOojbbQj6k3UAxcG9gS+DgoLag56HudrCvRbdd9HTw5eHVwlew5o9w/w38bqTT4sv0NFLbhBRHnwdsEhinK2COCGvh3BPppweg1zEMWU+WsqF6hGun9qXo/9TVs4HtgnBa6fQ0iGjFpEgpYZcCoYxjRhWEmoNQO2o0QBCEGeOMeCDAZMkxPgbCAIe+iLIIRkv7D7lUZIMoMEVYIMyGlH6K2BYMwxIBvJLFdJyMD4hUoBQ3fD13afigVYTfdBxqCuymj4wGZ3wOp2j2RINPDIBOUqb7eq+zy8ifAAK+BQaskKR4xw4L3MXTplku9t47DIET27lpRYFoKFhHdyXgGF6PhHAbAJKi/ChdhGRjyHmCMpN9T48tilMfAYy28pOSJEPEVhvg7CcsFU3xZBAWKdTiV6D2gUeoYRyUKYrRKGWhEPNBIIeRrKIdYmGeAsXIfS5/pdi03bcMwcuTk+dYLxgsnSzKR4ls4A8MwUHJjIFEKGX3QgJWtTNCEgxdiJkGMMLLjkFj+6Y1XrhphAvz8Gsy8XdD94kFpW6AwPPzB9XMPDRCK/Ek5e3ndb3JMW1BHPjjW29xn7Dtdu5plkDyzpI2oIcLIAER44pOSHRnLfrnzULZ6Qoj2wm3QezaENymdwq0miBahmzowmoCBtkE0+Zbu9ZJYel9ZRXABxYf+RQRObWbeocIwE/g2aXxCuYGtcV5e0TEJvoNBsan72I5jxuufO5OnzS1IXrnm/fcLJRcSsvkvn9Z+aYTpMPafkAxTJl5CWl/nebNeaofxBPao2fwT1CLC214mnoY/zwqZC7IW9tWLMHMYdJAAuoU3McRS+mp1sbSVPmi7fA+Isbv79c0fSR0Pye7i9KZVRnwHOWzEGhx/cTzESxAALeJCR0LK6qqenitH7n7Rv3f9ahMTQBliObqU49qHypAIV6j/J/4hArMooDJwEATitzx1VPiHIOdBBJhAToMIYVj5KawTl60pzFpZ0P7Xqze7Lu41HS37869XGIQbn8E9cVFm1Qq3qawlv+uoob+vo+f4GXeeSRj2JyGKqIOADAhkB9HehPjPbD057Sbhxr/39/7tvgEIBh+Pw0jUZaGc0/nyiSqGmuBYkolaw6jQsd41NfAPb/hdkJkuBuE0fOl7WcSZ8ajDBEm4g7praRBiEk53H9m5v1NqpLGOZUlIjBbLH/5YJJVEk02d1+t6jfAOcNAINTB+uRfjpdtYJAp3MkpTUrPdR89ea/vmLtvhbGtenvSkzaB+tNU8WohQ3hUrUCY/dFyFP+TZWN/CTJXIePbBGOYqs2+VcIuJla5cF9+ix7GPoINiP+4TIYF+BYkEztD9mKiiUVB7KoHqE1g/QYEXXmAdoMSBPAFkYYS1+FrqBdduWDdov5j6rtTIzH+naWBgyABCdDfyJrTQHn+k+DEVRgYHfrsAuSmv/EJaS0cUp3iambXnckNGyrwN6VIuy8CEVN5khb/K3Oqb5UsWD2Sl7VxoRA9OxdnoxhUjOA6Ke3q3v/eJtBcMpNqydmO2EZ+b72X+SwZedeFgz0Z3u6RvUbvfqXb/J2wzOMVsdIpC+FA28pibgMFYIC2lmIwaEeop/PcuvAqz4Pc4+zwbMVhE1eEB+Wyx0/JtyjltW6SSSPerI+4wPQr5BLbSvWrUQDvhBQIH6R4W+ZlMWMiU7v8ReZghmYqXoZ9A3RPIFvqRCmkY3c4vUn2LaqBcttYxyE317KW+meKhBSm7Uo24HefgdDbqHfCzqWAe+OK95qPSbSWMYCd1sekBk6gVXyK/21TjKTNiSOq/gEDK9xAF825c2VzSK40WXqXTsYFv8+U/w6aDLsP+0akZo1ZYptnYQbCD9kPH6MD2pz6ZtM1wQtscCTEUJqrPxVB98ZMbbb5VWljiyxJx8uMsdaO/A0AeMgJzKLqVMfAdXCe4muKfsJVsZfu2EqaOWpehDfw+ZYl2X6Qy/YmmrRTClKHRtPA66/5BCOXbHs1V2UZR5u1BNs/O+wfV6QdXRyMcq4aTKMSqpLZQPOT3sCTrFA/BTVQt/1ycWKO0QxKz+wFfiZB/IJKhhRLQKu0MDzH+dgIZT18ZY6nQhNSv0sRYpZXgQqoffMaNiqy+QorUjqaTf5U4X0pPtrJBpjXg7P8zWW4hUUVRGG6czvaKhXasztAcu6hFTUqIWmbjpcguTF4qFYugKz4U0ciMkFCIZGY+pA/noUSyHnxQLExDwjAzLAOJinwRBx/SHhIq0P9M61CtPUPR49oPP3vt//vX2j9oJVsdvdg3/dH5KTAAO4QGTwoiqNTZxHh9e5a3nfQddJQyU09Oz2F9AKXIDg35DralRiJaLhG9iA51WiAD+gzyUEj72kjVKUbQ5vDryhdSn4rxsfq9mbvP7NGrODAsMsgiJVLkLIuENu5rDCojYqqpouCu3ks5CtJEMXobHnsfnGtd2xoJ0fr5LeI05NKWZlKdtJN3Il/0lRibaClMz6jN1ytDyyPUPE/o1HnZ/HAwV+0qO9zucZBGCYcoTScPGjopQcs/UFN8pKzr4THnBYpVaifeXZ10wAXtDdw689DQiOXa+GTn8PORet+Tf8M9YI7bA3K4V/GIkcOdAUtkBriWPwmrL5wL86vfNiP3TBGDlmutUKj69EtagzoHjgc48fv79S/mLoWcwk1LCkVeuUyraZOD0h/BvdClv0dA+cvrUnCdHdVJTKepSdO3CRq0+tnyg2Z/GL3hFmTTBp85imSm5neE+/oyRCVWYmsSCiQ6t8xRRqfNGlVQJDArRVIkOS3MUrO4yWBRiaD6UOWTVXIoLHjhM7P8tlPB+3YkcBtw0Qea4l5QKHAJPay5RD0KXIKyTBsGMKuwKUxMI+ukovG/DpLsOB/2eABzpkuhbEF+GtqIIYU4DDmWS2YM3nlbs3nPbt6AV+2cV/hr6U9X4q8ZQY9BFQa8hkD3ne/t1k8jMnx4wkCdEcWHi+3WLyN6IQbJsbfj4s2RVcFy9Y8AAwB4o+6nDWVuZHN0cmVhbQ1lbmRvYmoNNCAwIG9iag08PC9Bc2NlbnQgOTM1L0NhcEhlaWdodCA2OTgvQ2hhclNldCgvc3BhY2UvcGFyZW5sZWZ0L3BhcmVucmlnaHQvaHlwaGVuL3BlcmlvZC96ZXJvL29uZS90d28vdGhyZWUvZm91ci9maXZlL3NpeC9zZXZlbi9laWdodC9uaW5lL2NvbG9uL0EvQi9DL0QvRS9GL0cvSC9JL0svTC9NL04vTy9QL1IvUy9UL1UvVi9XL1gvWS9lbmRhc2gpL0Rlc2NlbnQgLTI1MC9GbGFncyA5Ni9Gb250QkJveFstMTY4IC0yNTAgMTA4NyA5MzVdL0ZvbnRGYW1pbHkoRnJ1dGlnZXIgTFQgU3RkIDQ1IExpZ2h0KS9Gb250RmlsZTMgMyAwIFIvRm9udE5hbWUvWFBUSkhEK0ZydXRpZ2VyTFRTdGQtQm9sZEl0YWxpYy9Gb250U3RyZXRjaC9Ob3JtYWwvRm9udFdlaWdodCA3MDAvSXRhbGljQW5nbGUgLTEyL1N0ZW1WIDEzMi9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgNTE1Pj4NZW5kb2JqDTUgMCBvYmoNPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCA0MTA+PnN0cmVhbQ0KSIlckstq40AQRff6il4mi6BHVyUxCINjJ+BFZsJ45gNkqewI4pZoywv/ffrqhgRGIOk03aV7KFW+3m62oZ9c/haHdmeTO/Shi3YeLrE1t7djH7Kycl3fTl+r+dmemjHLU/Huep7stA2HIatrl/9Jm+cpXt3Nqhv2dpvlv2NnsQ9Hd/Nvvbt1+e4yjh92sjC5wi2XrrND+tBrM/5qTubyuexu26X9frrepZqfE3+vo7lqXpeUaYfOzmPTWmzC0bK6SNfS1S/pWmYWuv/2pWDZ/tC+NzGrKxwuivRK/Eh+BC/IC/CGvAE/k58Te9Z61PqSXIIrcgX2ZA8WsoCVrOB78j34gfwApo+Hj6ePh49fkVeJhbmCXGGuIFeYK8gV5gpyhbmCXGGuIFeYK8gV5gpyhbmCXHkiP4HX5DWY/RH0R9gfQX/khZx+RK3slaJXSk+Fp9JT4an0VHgqPRWeSk+Fp9JT4an0VHgqPRWeC5yvitLPA/D1pzEKaWLd95y1lxjTiM1jPc8WpqoP9j354zC6VIU7+xRgAD0TynANZW5kc3RyZWFtDWVuZG9iag02IDAgb2JqDTw8L0xlbmd0aCAxMDMwMjQ+PnN0cmVhbQ0KVnNhXgrnG1ROhYuk9elmidJhFTplMVu9jX2SQaCUaduJVDe1kH1Q98jC2NwJzA16k6cpElIFk/IPUauDLPR6dL5mYhXbkR7efd5u4jWTcJQlBPm9sgH7UJuIC8G2PbGoCv5XMa1oKtAIcphgXzvOlpqLnG2XA/9KRksKdZCqlZFoeNzrOdCmZ+2/rgUVZLWWujhaVMQJ+N26R+yDdmNfjGnCV/kk3RgYC8yvk/YN337opNrNrfU+EMfF5fP3tk9SW6vKaBhzHTnOHD8GQKT5OWRItQQDjFBMi2ozJ9xzbZvWm/TBe2MPD3RXNxDVvuEBiLfldctm35YzJqozVT+sHOoU7CmC/ZyxqW5p7UuQeQTFRcJ8oYIJ0ltfQqtjrmI5MV60xyU1Nl/X6M7coDCSZv19hg8X1hHkapzLjfkqIS6El7xojpGAN+cx6RDjcftzvRN8cLIeBvRD+DiSFSRaW6H36+5ffCSp8r9GliaXRyKAuBb4XZ1f7MKEuO+mtAJaey8O3z4QEHK5RihchUI/c2IF5GJ57fs/KAf39uLZUsvvidP6qJwFSmKrVP4T2nK+0c9CG23kwXB12MZGVlLTuhCcBcjhbmrs6yaFbh/q4rB+YK1Ubk9mnGLWarT9UX55lvYJIiB7AZ1M8rH93a/ee/09ANDZ/pgR21sVpfB7U+pSu+aFWCQB78pzsX7B3DJDnYINtBiVCmi3+YRbJdob+Gn/p/lMf4l1GoP5h6YnMGnvZSgTf77ZiFWbNMvwQnVwMIcJkYlAuZ89+VEKA84qVTC/2SphqAMM35EB43rCqXFXzLzBJnbKk1Z99e5YOxI5qTC7zI5N3XwP6l69Hnk4sqtECJ8KsbstG24N0ADQlXw1eN4nOsY/dLhGStX6kM+N23XM3cmpHhs/xqt1t0HHfsKPqZnU0Zh0q3nDRvkVdD4UwEUN3fiPnsZklWW3w54vpyO9XJxcrRfvKv/5j9c8MSlXRu3V+RQbl/60+I3MASjGYUPtl3z7BLFSspb9V33nr1zrTzGoowRdupPEODZmvMMfX+RBoDDg5WgFZgPUWgZ59sJE4Z6XVYJUoZ82Sf28QZa2538CXyShDxmp+iZKJ6n/JNDTKEoEpu4lXhpUtpd8GSMTwEj06+cpwAFWe9H/cN4AybqXf3e+Tg3siCn62bGshmlQ+etrNZ1fl7hKJOuww03ze8D39T46MjuZVLjKT76pIOlpKdXT+IVJTyDpkdaO8zdtihUK/Pxr5BZfk95SSxw35pPqIJeSIXKO1IuofD+RTo7JcKFDM+IXXajlRfE92SsFYVCRj4HDXg4uhPpnhwtRE/TBs/2S10P7b7zhYhXuU/guxHhrwMZBdCHNjcZsIJvIKSdwDsNTyZ7HkwtewJ5DCBV9ZW9az3nN4jS+XUpABSzDrakcaJQWU3ih7nk03xIrulxgvSvSA90Km7Po6IMNGaqvpb9A6gRLTswFVEtUi3ylD9FAbfDVP5I5u+cORouFmRqJ/xYCvfOInxFeTJjlHe2vGKCKSN7Nb9Bp9VwiLPA5oQhhJUBjxWpj22Vh+NTBvAiCHCtu2wzoNPoKORaRWkEEaDO4SrG/Pbas78Bn/C3TFBlmcNfaSpCvMy9TG0lMwW8XevbfNr60kOpr4ttzAKTUYEvITKvxFBcg/hcgld1uSsjrCmkchFJw9uz6SnDXaOJIgFOyN40a897uexTrGuFdZCKDDKkzwHOQpMG+7tEIXul1qjsiniw3S9Yom3tGy/WSEyqcHHAYsCJYeSZvA3NyKphBK4sm8gS2jRmI/8XBalJ6QfRw52lx1y9pIKWDov35x6c1ucLDMn7wv8zUceCo0GxFSLSzpbWw/2zN4l5dNjIsDN/6GxQNM0lIDmSzz5q+ltkND+KdIe5q16BPmY2oxFJDg4d1KwpGoc1bOyYWQPmEa6tYSFNjl0NNIVlAbWpHVoiPqrKCozFlOeAo6K7GdhancqlQld9HfivBLE014qzUiSWd2PcjJjeIdU2qiv4r7sJYoHa/QmAYpIuixnCGzpWmuHXaWoVA3UCnnZA9EfDTwmjoXgcbRTdeZzhzlVMHFHhlq7fRngIpyFLzZ9CRubjCrgbG2D1D9H8euk29Ac3r6hpJfJCy6autD4vpuYRUPo4GN7zMFMSGNR7+nmvOqo0yiNo08aaO1yuy4Oy2iR4WroJfGdQ8Hf0hPNlMIdQnI86ovXJGKra8iFkeNGbinDsmNuV7uureCJvD9urULu3/3y9OYGqnvR0LOidMOWva0qox8zuTF7SCEC4YTeahW3Mry2IvFfwmb0CgPE7JICk2DzL0H4nivrtGl83/KJGr/sqywqfH972AZN+hU7X0zV97f2nVVii5NIO2hA37ONIJSpGQbsE5RIqamgWRuKOTVevRxIw4Zv2R+SWIhOKOQ6oee01W2+VmmU7KtPhaUe6LeEe88fQkMLQy2+umr9awVJDx4iFI6Yt/BTV6BoawR8IPIl04dJfgupG+9nJXV7IyNFNb19vhSqYoWwqzCGgMi8FIHr8KEcFBlzt1nLOgwO2/YCcMw5NToI8ZEijf3O+gi5O8gGaD5gE3hwSfHkZASzPpSxl7wC0rZdj9sUBnAXF3S0nDCVn1iUQW+naR/hAJ7AcEwlyWYx7ysJAO4YMK224PQFpi5zVbFJUgOs3NcXHiXKOcyUkQetx4Pt8ti37dWQ+v+hcfp4GXrEcPh4v5ObqdqnSY3rRXAVJAG7Pju1ZPvFdoA0IqYZxsfbouzM85rmC8JLq2r3tnB1gA0JKZTS6F1+YZpGXPgcmIcgEhv65ZZt4eyWiBkB7gsQwCKAb5oh0rQ0OMOaO6KgEfxAssYBXeRK322LfgMeV2cN3OG6ntQZZJAXm4JTNmZNfw9gZmUmdNzfpNRm2Xt1Ta7ScjSHn9w6E6Aoe1MP6ed40lpSGN7VKGJgqw2v7Dr9bZqcfFXxumQ/+JLvNtTRxNUNHkRRVobWpRSknsdAgXlW+j/LrsD5wwm0lq8jS1mTt8yh6FpmvAGVkg/V2PxuEHS21y2RTYV9KxmcH7M6lo2sp582/EtGXADdY6fp13HPUbxrgiKStQBzdr/Le5SqnKExF0yA36V5DfQASFazCh3za+EEuPMB/t+jkudaSTWI3a8cweKlH9c+x9sD9dNAOqhvXPldAJyy6pjByjUGPWs5CenWabGq1Sq4ScRpSPc0xijdM848+jW8DwIjZv7QCm47t91lvGgl5WsBfHnQC8XP0KXKjEQki9Wy1nXxSU8nJhFyo0q/RZjGd+leLdrIPwRQEgLrv1UYYipSAaSLE0wntDWmfSoxVLYRw2kzIUt1OlgFAQE1V+i9hfy3quCMz0l6qQ+B67yNv4aKbbX1b4DyzuCiI/fhJfVL0VDQGHFsbiycodoT3cxE/zmjrOwIGjuXz/bq3sGG/1UzCE8o0Rh18kp46CPbi6RLKwZGC1Co/ZDqbFhO54ZGUQ9UGM9Tt2bgZ00Mqd6WaOHPjbuwzZuC1NGjv0n4jQ+0oRIo9Ln8obCKGtJGuC22MQETIA1S84ldjq3N6wB1wnY0pR7DQrxDT1UVOmsGWvZh7Y2IQMh71yGg85LSyedk4mqF1amnXY8tH806S++HrR0inIi/usvcHE4ltl1fyftoITDsaYvO9SSzgHdjKi7QknOoKxDFmxAgphpsgO3EG7Ym3x6l9nUmCbMWugf3MRuSWkcJtF24NqG+WnhdyzVYHyJFXleAKpO3wNKf29oT+VxcchYju3MJiQElcy7rnAy8min/npDzkossRE5XK2CTRtiLjRGe7+JI3I4Yqa36NDPhEldejc58AZrpCM1mBoZDyXBFeIL2DhcrmsuN8veR7np2OrMuC3/y/Hd4cdxYsbnzNVSL38V8+Fpfx+wmC9WWqetNNFNQwKu/WyKcsBbTzGuhrJ15Z9YB4z1/VtrnYXTiJqcc+7zHi4ZaDlONuTbPvzSAO8/srtNScYsZNj1Oy8EsovCUXM7Jz2cjasXfVNkP2k5DwAa6z+/joEE8eL732WW4nm6VRku7DUNmY2+ktC06evo6iwhYDa43zZltqHUXNsaR9v9Pf8CzE317ycFQc7e2FIfOdkHfgpTTFivwZjBRVKvJHNNulMX5fampvgwFE7IZ0hl1X4/vB7FUzKrps9H4W/ElkPAbY/EuaYwgXenAplkTryuK7zA2Thinf8rHqcAlBc6keLFO7q0sEjtQ5GMrnNjqUC3hC9Wbk0DeNNWgVnp0hGxXlW/3G/RafBhLwgdd1tM8hVUGH8lwwbv9jlkqIht05IghWRARcjfSPvuVvXy7U88neBTtlqwaYP/wzGq0pzS4+dS41ibI8E6Hfq6qkLCvrrGiITPFEMNSj8TidX6X2av/mUVHv7z77PgDRaxdQnGDZaL0Mil1GSoSe5Fx0yZ7/5qxrAhqHVlvQAcz/0yZzfZy6o+7TuIJ2L6NS43lzw1XCny4n/iZb+55cHiYx+fVQfhDh0arDBQu6SzaqkeYgb0TQ/XdcuKQi+Lr1W69NuNpngKrTg9O4j6mftJjLrT3UOh9Nf2wWMKXLCT+uN7i81SjoPwiS/6iQnsSvNzOWy/TXBQMl/dyvfFPq6FnlI6caNZaqVyVYSkjXCSqcTCjmjdCei/ESt2eBxHl75spPiAgi966z1dISG/sID9WPfAwL5j3rJSranv5QDKJpQGXhpUCbe8wR324iVWOVIc+PLU3u3EPMnHuMe4nOikqAlLK3bnc5TB9WN98AYgL9UNGW/rpFOlpFduBgRyUuChhfJSrWn+A+l/dk71ftBclBtKH3wFczyqUiXg1IsEtonQLZK+QMrItTrC3ThFVo2jLYMlolGhHqi9RtKa0NC4DMjN4OXLuz+oAZxOFZrTyDuOjOK+yUsq2G313fFWzQjKsXJ8I8XP0jC1llNHMOam1nJmOwpm7YM3g9X0q2Cnsbj0bXig/DoexHA8nQf+hgJMt6LgNe9hijyF2e3eSorGmsnD6uXjDgY1a+h7brHwcLxbat2nXGURLQbJVDrrFfnz5pS41efk9w3Xx1ngy9lsBdQDEihsiapMsH3CfURhIIZE0aQOZlExlZDcUK6l+5Ba0KdGcv6i9XJ/v41JOjbFAGOjl8yXjFcqwo7etcnBRAVmYJ6RZ4WlIKDA+VbCVT72UqIA+q8/SYO/gH/12nvq6R1c6IoEYyMFsMBV4wXSXA7e7X7BLRtn01uKiCOrb5bkS1aYNUx2yvRdgMMq12wp0X1nWxEC1GvvgTiLEuK1T8q92bddhuyvNflHxDPQUH5Bgr6GafP5d3tZW09sr+8v+DEFRxtViUJekfoBf7TSQBYFWL80GwzOYd3EWWRd/JKx5LXq+0PCuVY4zQIhveAIFCgq1cbi9qUI8x8kVXKLaAlshZaIsrcmS6bMX9NhKw4xCN9/kkQm7yNrGKAuKSyskqMJZ+Q+eqhUTY/HvUfBqVdrGF4DnoBacaAgvcnUbj0NIZCT0qZe7eW1fWWh52V/qMDuZxhjz/IHN+a1OIbIcMfb++cpU55n14mCBKTOoEo6QlfyW+hRBK9nRrn/A9HZRu4qR1YnSgInY/hCb2TCjr4sZ5sDsdi0NOpiU/e3/P6Q6agDs0R4IOxbDCBQsawheQmwr5OINndmf8mY7/ZcrkeYG0VAzkhUDr43J5fGvt38MW9X7J+uicH5LpDvYIYFKEJgKMV+xcgkTKGA1pFatGVi9e6uOMQvQ0WXYMbZDN75rbeAwQWWR1qe/SXHAv3uLtPeK3hC07PkYSe0aAC9t7iWMpX4ZCgJmgnqrgY4q0ICQjlSqZn/3IU4glHAMm1YJxIL6JbTRLVDM5CfKfKx/I5EzHm8i8+tR2hd3zoX3xyBkmeC+7RgQY0cSb5aEx9gNvlqbnGHFUP9xf+QGdI6KpuEJSmzomEmWXABKn0zxXnr7sSysdp3+hGdsTkVPSW5hwijitYle6b0ZPB4bPvmE8W48snQNF7EneCp0YHk66z3sD3XM3ZXTVRauNDjV6gyBKfu1gFFS8w4bFqGmXFEvicv7cvJcmo8AK30m6bcMkLxdMZP8/bQL7+wQU1dWL3rlrO7+6rkDV2amCRrWDHfCSUUfarBb8PdQQcvrzXKQRT8yLZNGgfnhmVfF8M/QOsjp+eVsgoGiunkpppnMENVSODlCUo2j7X8ceMlQzD5akl2HuE56nrN+xVQQOv9SurnvWdnEq3m0caWEMKbXVfTZqw6Q5ktrUFNQX7uyf5iW3/tJx4Lsn9RnivWQvAiwexDmLDTvDORlbPiYv6PBdH65IhcPF8p8vzg2FSIa6W4BUv1uAebvl4+ge4rwYXBQ8K2fgHikhSieWzGWQpsONwxP+GO/fmWFou1tACQjP6SvAbUIO9nxPhV9oPVozPUQf+FMtW9B8X6CiGez07k2gxQh4zeiZ8vL5G+L4L8mwtbza+wIgzddqOGRXyDhUiU4ya6M/7LStghm8nGnwUZTYd7dQkqHe6AmgXpqnRyyawa0ABIfPYwK5GWs575DVfi0xdonPUJDulCcqq0nH9AGYXiAmMZeXCa/SoObtQumvAM4DFzbTqlazVxBVQYlw8wMsPesl5BDyTpzgi0Bjs8Z7IwMLcnZFKBiZCFhXy7b9IdIXzlweAGV9BDfE0FxTB51kDQkdGviNlId5e5CoNgGeIjJ29/5Q+z9qUsybnfYzWwh8cFbqnL4q7vMmbAg2KHKEDUsy4OMPhKSYMeIOtn+wsSHnmXT8HjwFX0ZT0RfG6BwEsX/vPOOUGLmz85eXmBp5nPO3bc03ogrVSwlW3NispO4O8W/8w7WyqrRrU7VGE+rcZ+wFuKEFIWUvWeEwvZxEpsyTmr9EYn20mXESMAXRtYQmiOlGRPumqp/eSAjtkhqQx+8tpQBt9aABQCeQWuZzhRRpWkdhg2i8NI8TdWOwzYppxHkBnfTdUcB0dprMalfD5i7RLYJ2+Lg781O3vYcYLRTrM5nRrG7m9dgwUG/9kjjc0iR04iXyBWiDlCb0SC3EYrcL0tqkLWPx0JJ1+x6EhG5qgshEip2HgD+WgS8NgaaURlwETtXG7F7Ne6sW14HNbubR754bdh/A7nod1vPtUKC2n3pGN+Tot904ybUeHLV6K+/fp9Se2lY2UbRc4DeuRDToJDHI6XwEGB4Y1Z/nMlD9mdgVCsaRsLrZ5rSHecExbGSYQVlo+65PnfHEslXdJ9aFmIgxkNbz/tstZ5Dy98ifLVyBgIl8Q+mlV2r4QLvTtf/QA9vzynk0IHnVOKDkzgATI7mx+n9PiDQryV8A2NPILwp+RNQqw+tUMEPeWEZ/khoRBcQFTNRYOiG4uxWoM5PHzESc/FAGxcRnSZyYwkiQfZ4+PoPknZV42ICYgoJ3s8a8uCdPzyZGQBVjMZh5B2jLWD9DTr0Zbc+4IKziiRV2eQyvA+TQAdxo4i3u7p8ZT+DYneBu5TgTAO5/yUWWuq9XVy1YVGKgl+YZi4Yj5xZV6xlfmTXfrblb7otCOXor7N2goIP8qvApkaobJ9zFVPTfuTNczRGbxecbRgM7/F6N3ejaH5mOSGeTjo7Un7XN+UQS0Ls6sOLwhOEPRNde3nUe6GNEWh/peXHXxJ6PDX088VayCwD9pBib5WWbpmL2VooxYjJ3LsoKlq1gnseA7hBJn/9OebQefmG3TFBDZiWqa/Luuc1ykkF8TZg7m3F0KHXSv6xA4xzpe5mBNnVl2y2SvgER+F+yhLtdDIonD0ZgzXpYz49tl74mtVxo72rj+6iXklhBaZqLogE/AEJtGHp/878Jt2gHgW2LfzFfk+ecEWCTsPrc6uBc9T7mofjzeEZ+nMHK2/sVsCDDUGgeVX3CETl44LyxF+wy52vl23tv8H9ji0KAHfwGfGwV4UBHrWt0rerWOc5C8y6VbW4PbDMRTNy/8scFTuZ+nLE5LG0+VIsNo9z2d+ws7LIOb3ZDNXFqm5VI671cXUICor9UCXKYWjc/+ItOe5naOM3ryNVzjAVIp7OqvHR6oiNylojYMKtO8lKZsP+Ivhj/ceVs40jE0c7nnSuUlEPQcyQj1/HoPRyHlfOnm6x6OHV4D1t+LG01KY2QSQEk+bjjCjGtDilPh4k/YR9yyOfVMEKlfBRl0xKYkZpZIWpuAjmSuL2vgxSOO+dFJ44Ngr65nhSb2a3jzWfpJZPJsUMwnWMsgNGxcSVK+B72QNUvGGqnzxcHwsk5BPniP/8gWktSAVCpkcrwIZiUzTvxfqaQxVW9O5PqgOYTpUC9pcLpymfyrZAxxiL+ItwEHmnuhnhawkNlnjqcv4r5tgze+NW9HvfVeHWC2j9D49IsztLmdsQVm4RpGBGH5hPdbMqMdkIp8ZlijUoFDY7P6aZdXcUZYR+PITmQlQZ9J+eIQcK5sAAhykEz4x3ek9GB9hrH0oCPBEZ6lX1H0nhuCEEsc6iPcsX3qVUbUuhRufSYsEjBoD/5stL3IEhQpIr5eZ3JCaML5MUrODunxWn5HIVJdqrOgtXXMi3mdg8yaCXP2JSO+/EMVh4mtBIogu3AoEQwADcy9Ffcms477hti9lX+kywjHCBSBrIK7be9r21UijIaYTjpJgENpgoxYDiilOM0/yqeRXzWFqwXvHE94LMHF3b7XEZCDWkK8AhKkAvB31BTXNKZO/TdSWykAOwUU6eGfS8PCLL/XjAMGLxtH8GD23YGiOSf1Z1EMpj9Eddrl149/jSCihhU9fidVu0SHB3UYABYjdGgItlWJDW6fo24mLy68TJWlEi0VBqA3dddsD6XA/xfViFw1l+jMf1JxjqChFI1CxmztH4k3H8nAtylRAxpX/4VrFgB7CUqgrrsNX24kHwjcePIoCgSWdrpD86oxI91DEwD8NhkX41zk35wsMlfDpssYo49vRXnF9x/58tmgnrFv6qYZHKmi0WEWkOzBhG3gUSJQfcpeeq3WBl+l42NUFtD9VI6FULXpgiK9+fYzv6ckeIlq/b3Dpr7edZvnr15GPzyaBw18NUcUZlcjRFINCz62ehhsYCojeHw9Jg/Q4cw9IJxF3fUuzuKa2+V4QrRY6pp4k+3KXsOR1q4I1jdBEsbm6MvZq/imqVixJg4t2w7+plyRCciBRFw7H+UEQ2c6vUFRNNTsfe2l788QdAG9I4wGFOj7HbeAKV0wQ2pAvsx0pvMRxKyoHEXuTyDIYEbHrHEkvHwDsHo95Pkm2/7bnHT+uSu7qKMM2yRU3zrd4OKIY37legHEXEQ6Rhezw0EFjlhesrxHEUOi7ruiwUJ7L5k43CAeS0NBOa2zxPAWi0e0WwxVL3k5Fvo/hbVgMq/kFKpGXQLWXWS+fgYsd2lLQrEruMXacVlxJS/YC1dTWGd5ikKhhaFJkY1ch/lVlpa/Lg0I4Y9DSUrQPSgeiclwzdO1p+kthaPqbq7HkLm6uc4Ywz3BvAsJzgSI1gAL8apJ/D2sQY/aYFVcV5iOUX08hy2yTu2qTyVLHVkTWgmyy0EpYgQZw7vUawzgWmaRoWr6MhOI4h2JcOhZwoqv6jVMnXk0PQWQ2BmASMCt777p/B1d61vYwMQI0Ws5/l4iOYlFR/4+m3iTtcjx8iHZWcG+FzslEtQ3WFvAp4/0xok4mNIMOJilUeKNtJfHPHy+AowB0FUCg97JYm11pXo+PwZbk5U/MJAX0kECIRIOSO9oo2r8vzDHFQH67w1Lt7pwzU8g5+tSpK9/H1yPgUsPBSoqfYMLKyLeZKqJk8UE95eAN7w7vSX1nkfFueWA43/ndNUwCoyMrl8eCe8LrNVoU8HuXfq+AVF4Vh5f2WmshteuT5ZJ9HQcUydQpGfvlWr+pa1ICgfyEgxj0h4dk9Ek/a9jPum/HBcsJUlFVPfjdjEh/tnp7ykiYK6Btx1qw623tVY6QBlnbIlqZJAzoRBOeFjyHw5X7HrK+g7fOMweMcxsQxNRoVX3QldzU5WXgXT/qHHLBiBTkK2mAVGJaAyfrEhWwvKscCxN6Lmwh/koQovRuefPlAZ+TowTVaryr/lEOiHCVnQB7kxQyw/m/poqhfe++ydyXSHBzdt5tDGiCNdNOr4My3N3DlbF4Aoj+ulgZc5O2J59DWqF7gl8zSS+p8JsYZY4RAW6TkA0s11NLF5Ff2mUThKg6i017SNX9n+dHDuRNcZ/7vEV2PhR5WPlb1VZmILvzHaQkc9JwRYAGB8X2fBSWx/NRKF/PiU7zXW4e6aOQy7w/UBpcH7D8McgRUDVtp2ZHVfeIHWPvhKSwHnfZA/hjB+kbopPSUR4kiOZ9hv+qIRgD9ulHZ0sA1btXZaqGLI9Xj+4CDHI41YkByj8Jm/9tng/IzUN+eaZO1gQWPmJaSQpQVtO6EIoLFZHF2vV8sEAJAAlY4M4Kcs/gtHZ8T+BMy7RGJWcqE7wY/QNgpFL4hkSxR4Mdoq8Gto+xJclgp3dvOs/Ut9gJgTY94MRzpFchVLcppMN/7i1m+daoOzN/YA6+oOcKSCHGZorfTQbh0CJH+FmD/kopbE0l67kzoTxAacpIAxqCG1ho5YfhqnNcWe2OOrsCc2DDQx369uhcuv+mPBHDjrFcZtT/GLvimR1twXbEDbR5JNOfYpEAXhVLvbZMHYeKbCwaJ8yuad6mcm32BWAitDpOl99XSXIlkoN8mw43t/q+JroSFnAjPB40N99M1lIMjRniKzwIbdNpzMRQdNx2Pw7ZYJEpWff+rSFgrqInXZ8tm/lJDDN8aYg98gqC5cdGWCiFTmvPo3B2O10k7icKoLZ+e8XVdcx6dKdfQiRc522xLOGFEABiVngEs04hnftqwvz88BPAuHOs+NS8abdaqpo80fmyhWS9m2hJk4Azbb1/LKpoOcWUK9hjeW61RBqz1aPNQzV4N/x3SCTmHQXpWsniyhjo0/x6nfxg8YbhMK1YBofQkKKDcfVb2BtS7zdueFE/1x0qU9QYW/D7Ywv0Khaxy5wTuw7TpKWqW53ONl0mcOs8Td5OvFrV2e7uTI3tkNnd6KUgbi3G0BYhB438vDQWZymoVvGy79LitN2ZwFFR34havDnN7yTA7gpDqy5c16IY8RobGeFMVlEfr7BEieRJhHUUs4wroTszONeKgL6shamgbLdxrmfFwqO3Uiom1hqonbT9fZm/24QuW+m4PgP9GzYHPmdq882lzRGq4PEIfLCTsUdpLGVh9a9eNH+SN/1Y1Bb9mRj4oEdRrl1iUAI6RU0RIUJqCfK280wxSwA7gK7tqyUAUBBiHFaC2WW4A6EVFl154wipAhypXOHu2/QmaRkWb0taB2PySA8g1tQpFdtStGrS5GxKjA65rSx4iL1/ZvbI89rjel27lFXbNF/i7azAsnTCFQHuD+6O98dLAxca+6QdCOZ2eJIlaaWS0gLNeTzSM2mC5QSb9DEz4wKsdUVK/KMnGCwJPYEKAB6JAgmrjrF3GlLcNKo7sBB3gIPP9M8MBZBa/n/GvU+RDj/flcGOMlrYhopAmCE1dISRluC2UyULrlKFJD3ymotgrB6jCSrUr0sNG4CTOo6uIg76FRAhkM/6zaPJVBmPCPSd2X5/KRVilBoFdYEioKnb+0eMQ3IdUKCm9lBkNSBf6qNfUyBlxuplVSa9YDizVNf6uGLLnILACjxtUrTfnw6MOWfzQtVl+5niLppKScv+udnwrdNz4N+hPTUovxYOuATb0Q6YjLdOpk/uEhk2FDL+WpO6+oE/X++sRXocE73ObO+OqCG7SJOuSJMRlvSFOJjPqetoI7l6E159LfDjNIkjPq4Ea3AyNciGkN0Rb20LLdE/oNMCg5KF/AJ0F3PTucuvPE0LhTtv/NWu2QXA7Ht7RNDuzXN/2Pp3z0XEAQLGFp8XeOmJoVKfM5UNvHG2M87xaG5uBBvQDCNDUPx1RF6gZ4HZe4+dHzUpScSqgz6D7NKd6fbmLeemHKhWqjR/b1aPii+dIdZSpsI6+EAso66s1ha8f/Ei+DQihI29to00I75N2Tbs12x7E0T3CHNxdRhf0WfI9AWGeEzGGjqLF1iCz/VrW9+ux1S8WZI02IH490nSH/WQnft1ZQrc2DScuPVmBS9joMZlqnNXIoDGZ7XOaagh9SQLf/iGZKLbgy2M/ExBCXwDQ0SmgInKN0txb94Os33LQtIAxipf71gTE2dN0D8NYrVKvtf2+FSlz+/U90qqcQ//83jveUxydPec+MN1S7Do769hRnnwylf7UBKLekSNGpS9BfzG/wBFzY3BVz05k5zTpx/tN4or57V32RFvpSVWKNn/eW0SnQKFm1Hj4Ak2UFXXiy6uGTPEFof4lBXr0rC5U1YMmp4cnM8EHi/UApD6HpRjRcPp0K91l0i2q2Txb5f9jrcnXfndQvyLdpfV5w1a+w4harewWWDrsFqCpiAlg+PQHBak9XLSheu/exu1gzCLRCHKpHFydvA6aD2BT3Q27Qb8QKoDRxKtgi8bJ94lE5R+opw02Bhmx1nF5N5hcW1tL4gMAbx5P3fGdvjeM41WxeJ3QB5qz4cuGnCT35GsEI3BFu5UDM7cnN3mS1pp/W2y9Dw+9QZWTlt9IVf6cEOT7hKy/5vwlXESrr6bbSS4GWedkxAvP8Hd7b7Y4XdSyl8C4oCrLAvRaVj3wrFaKqN4f1LV1dv9ftGgJAROhWEFHsp1UIMLTCv7WQRplSTnVs6KbGevDltgKKajYKnMkRUBX0p/j0gLpZgW9g4ypNjqbWZY6DWtz5cXNKAqmEFjT54FTYBbVm/iJCqUvCIaa14fMqETwxWrK85w3nnj4Kmsc8L4nwXKH3Ty1F3pvnQs9oZVuAGgITblwprIqTqsEKrKR2w7kR6zFxa7WGjUYB6G5HzNQlHuJqC++hKF3U7H+J9buuQXo7sVJPGg6Vs/zNMy9uuo/7vJs0XrZi94eQsg7dW8SaaWqmEMOu7gjV7lsCV/tQjaoLl7ibdxaqwcDYYHxr5mi9tJfnXh25Y94L7bw2XI9LCglHK3kmicBY7oAYXHy5wSzxqu1qIP+UV4kzZf5FK3Q2XslAz7ICq2t5Gl2O2FDF/oXwxIKBn2OH1OHqrJ8v9k2EDzLVYfpTuA6MgrpsLp3a1aYAxKkftJJU3XnB0tfjrfDKw/FVy2QQ4YO224pOscgrtKht7UnBg5vJ6QkZCg+/r1e+R00S0FQWPxgbSZwrmdriEGbfiv/QC7JVYWsyn+ai296E/UwSzdYVHzy7cprdkebA2UrgCpo0EEifxFnshPM8IfWE3F8gn4Ic8j2wCI/RI2KrDSvnt9l1a0Ov+S0LDlb6jo2WiuFzoaAIXAGLrP4MofA5T9jlzhPLkWXenx527psfwA9B/KM92cau9hwVS7oJ65KZOD94usRX+TYmEhtd3RIePFY/g9fhoF+cetgf0n4O5fBMXWXN+jUZArDN/5cJZm3x6Y7dwm5m4bebr17zHljw6i9AF7EzrJKcETe8f4zs/zX+aoJxCrVZspxtq1KtpnSoCOdK0s4yla5RU3eTTUqELx37jxWRTY6xnJ+2FvNj95SndPAX+W23qgoU/UQD05zz2TR97fK3f6/kfpc1UMUNnLr5SNn/wCXRkfMO3Rm1XPH+uopGjuxYYBj3wkslOspfz2XE7MD7OKbOHRAw2QV9bOjWdGnyeCtm1Saybj9KBJlyV4NMYtvyeiGZoKHoVAFljhOy+Toe1m7Gizuj3vTPL+gIKerZIjMPt7m8w/BCyTa48+3WxbEGRSHU2bUNN10G+GW8Ol9UX/heDfFHC86yBEJxP/oX65wranm7mVMwQ1FEjeRLBuBM/v8EgJUdNt0/xjPd1byhYnWNJyrRzVRC2uzWwCvhcGglD2J1SRLia5tWyy1am0mkpLtQveWRTGoWZIc7mnDgF+TOqAborvZU2/hsF1kgDyT4nGgqipS5R8rUS5dCWGsM4Yq+23H1IRF/4H8J1Atuh8ybhs3lnE7mltJPWeXaBqMoUYS8LnbVBfJYSLZwlTIGs0dOOCLXqddwCtpwoW7oXhstWIZ3/hI2zke4HQbeB1S/WEPSyrZ6GE28XfHJvvs4Nsvgn+dAy4FLPzoG9C93WDIafjDW0aZb7uza02mqS83Gw0/1K5B2K/gGhk2oTtmHHAhMHeFfGfC4kfcAqEfJ0/OgKPqzgiEJyBKovPCh+PTH0j921NT5iLYg70bGt8kEkM3Sj9Cq751BN0ZzcKTT/5fMD+HGuQXcG4DjBqw1MzgIAwD6MAsJ1DjU8amqWg/fRnkQwqdD4VPn7riDKLdX6zYyPkl9PuBO+0GvxYl9oqV28C3HMye9v9JjNVKYDDEDxtPLogaeawWKWFgQml0LjCp6si19J9tHa8UFT87EL6TO9cMPB6cn4T2vQ368/NG05/xex4STn58LWAROdnctvQ0GTx/cYppLWRt4GnRW+bgzdFBhqj82NVGZNPE7pO9lFXqLeQ1OX6lG4VDgGYOtljQGOCuwv1kCJhPM1TJQTHTPRVbe5hXg7Xb6RMMpKOz79uus7myOTWSohQN7PCu9/DyGYaM2xiqBbDFNtTPk5WlmEVWbU2bNt3qz/k8PuabqR1rzBKd7m75Tnn+HtvB44S30SXaWwFDGVngfKCAlzQVfbld+aAYqgogSqSvNpCTO8Yd2XsG+stI8ccs7Mn8+FTGvB/NlYhEuvM1m8/NcT/mJfvNym0k659NZzZaFGYUnHuEydOdOFM9yw3o8gJWejyUdgJPvKmud3FeH9tr4jyr9Dae4Po4CJLc2amK8euwJ8puJwlcgJWpRC0qvuxu6AV/PKiR7A+nWIvC5RYKH2AU8VhRqrwZwIAzE2kecq58QRYkuv79hxUZ/p6B/KR3cyTYiQZ/dGnIhNLpX+fqtOrIUfqLXELiWp3We6QhXVSJkaErIkbCS3qqKlEivQJJsTu8DqQ3aeDlE0uuhRBw5dVSytBTlBtYtNyJtYXvFKH3Dzh6+bM6U0TRwIsI9WRVRwvt39FFG2vX1rTZzyALADzvBni8CoS5vHlTj99nMNGqftvjbBA0EHko8D+gMzGkMgTLxj+t4MrwvI5uDvWaccFwkzXqhHc+RLcmJt8NEW8A2MGR7sKjMFFFpnumP8dir/VbgGTCKUgXamcRnV5D4AOeq1HN7F58bzJPMTBWOdLRBOqAG1J9D/C0n5wUQXjQbtPQgjXa2dgx/5n6BM28b1CvMAZ1USPTf+AyEyT9AdXaUtugwQnAZos0H1Z6DZRUnaIqlC24J9+Jfmud9MVqf7vqrosT1b17E1ZnsbXFu6VNMGTxD8ovsOtZURin0q+jZvbJJ2qEE/ewH3M4yc4ho/qQaPVBdGi+V0mE4ireUIZH1fI7EGO5/6OL9ccATzOnyz3tkCc+8wKypQJytjhAehS1fZJQ7OWxk462UU0rfcPmdWnhWoGEFnFhMcyhdv60p6IEkjLZ3KI85AiUb+ZNmmxJWgaLhaLMVDfmjVIEW6yTmPNbEl6pEbvVcpPUrsiB/ibVswJoRERlRH2lwmFX0x5Tixi4KnGcNzOYT/kMWt18DBl0Bx79U5bZMizF3aGI6GgI+ybfBxh6iWQKCKIC2NaCQsKpWjivzGNYpXwUDxYydV5+Mwy364HSSnvR6aOl9T44ODu/3ZvoWDjgcUWYIEu6M6BLcJQRF0NtpGg8ZeGt+x4S93l9o5hFUwfqoX4T69u7mTFBwEsdVdD0C95gpLa6FPKA27Tqd7bNp+5P1THlJyLKwZWwYLYPPUp6W3Aegecjhsrl4tuvTmDMf6MCL4jTnI8bbueEjjdp373uPFmrhivCIbuV6LniNSol0iQazES0lTwqkBkXsMw120wPOboZuzZli7Yp7uz6VyTuvE+5gqF6EH4qYysxfY3W0UFmN90NuTu95cM6X1tD6GbWRvznxQZKii/pZ2Wueb85sguXshXn4bmPc5d8S6efM15vQPW4m1kNjsSHhkAK9+5GltZ12qWeBGUSTXuP75XhK3x/kS4W1RzfVzt7etU0asKNPoijJ85J4LKNuhVULkYHSX9CBju02d2z7hF/i6aPiM0snibRfBmgc1Bt+Letdec30ZMENCbPSevhV3DvMcsklMsD1fNHKnveFzrVtc5XFEy8IpzmiV/XhnqMpWX8o24YUZXKDqhi24G2zkTyEwxSFc3Rd16O7CqLc6WiLE1Piky1g3hxcqhGA4OJP+rEtZWLeGNVLmPmusXOi6V0uuDtkJ8tB6dFlwTUT4u9ghPeeX0gvAIJ2dfDMXiF6pkD8k9aGt3gCJjn/tpHZR/CqsA1o8BI1VYgj1sb3rjDCHscLPQyCUrill9i96nnIbpL7GltpjuMy5AtrG+FoBOX5GR3KGgCBf628zzIYvPhlcPVedy+X17zHzsO9yZk6hhhlHSwukMPA4giqVbZ+B70kHEEo6xEgKCHiy0AufvBqPgwFH1gFPTGEIJbfy0U2w1P7OK21XNycC0fBIqYP7P8tiDWagPuWkumEoQmM+hhu7Y6bTd09OvdQpKnGVAYgWo37Y6Tj1z2oaxjmgdeQMeHQAmcGi6DJH/ZkBbVM9LB8N6ZgOkCC/XIBSduOlZkmlbHahONcASRdrLKK6EP1mVYSZpUqonaGzvWVgAdMSr1G5UD0HStsv7iIqi3bbc6PGRxvpNPKT0aJPbONtH3jwoSGCqOfFila3ZKPywVCDK0C0DnSWZhrsD8IQW9M7lwZE0SHNTZLf8k6oAWjXhlJICoaD0xiAjrPtA4E9Ex0gzZxR/uwD+ErWeFbDYPB3hCrDRasqGBGe9v/zK2n/E8VJhjXZuIT2aBqi4b7mlxrTuw9FdttVNzuvSAwBn2AdYRJ1aeFduzoZU31U3He7kbpimJz+01y20zbz5IxzxU1siyW3I07RiXiO159jy3NoJa/lSZwGSCTZsnNc7a4Xo5Xlc9CHnZMpquw9o2S13pX4yPkpOY4s+B28+gkF5giy9q28bOehgYPzlC5+TufQC0akTEJR4HcT+Ff5Hvs0vGrALWeHrtGm0d3LatuabDJp/UjKFTEkdvbxjzpmDmVVtk2ADJAKaYaO8aeXF+GwYzisOdcgiYElOx7RdH7Mxm1pMhvdch6kj5KYXFXvR0Iqip60915+13FGRmDIzvw66TU1dLP0JKRRDUkTTwueHm4YOjDZ/Vv65SY+r+lOokkwmaWldpgPZsKovzQZeZsWTBCWJsARni4sdLWhTPNH5KPoLCx9+7z1r9CX6zSECiJM1sxcw5GTlCIzyKhpIJuymT/L9q4uz0V9+hf47RSwfP40psjFflVf+QoOeVrZe/rtpyInNyuODBysSN850mFLriGxrzFWcldDsYlI6eLJvpYudGSw9bMxdE+0lb82AQ+SWnSEk7Anl8pETmYJv8JUziinEsWOSDpzxMFiDLT+5eO8ADRT6PNqwRFGPW+OV1KvtaKeamsYSvOCd9RMzjSa0AutrEgMG9aU92RVszZtdiiVPXgvXoddpNN9FtFEHzE7oJQJqNVd20dc0owNXaAJXoxPkv9wdGXRuEgEjPqEKFrO8JgKFp3O+YmBfT90N+7YF0Vwpz00u58AzqUkVX+ft9wjYaJ+thVab8OTEO3CJT8ym0sswjVS8vx5XzOBBsgKsyZ3iiXcjuhXtvG0u4IOpXl7Nig5T459eYI0TN1S5gKgOqTay57dzV1eBSb40QbExb6pS5yV2+1tjNfHqq1NKfutQp6JMdZCEdIuT2ojDNkBfBI/GXCz9qtND1NW8yXAXqLD9PI6FqAlZnJbjgS4ghDk05jlqP8zKV4lA3Xn97vQsLC0gqbN5MkhnGyAfbUihwmnAPi+WsG78MVPjRmzU/LvwkNJYcziZfxhsUoMqr7P5Ja35mMIgbcOU2YBuJW6br4cTCmDrVrEk/Tx5ETKlMNoPlkhkfKmgdYVASt/IrJwN7vvYzjE2UWpy2zGeK+p68jMFeFSxKiOQezTpwNm11SVW2JrNgfGbXq43zcv9RJyLL7nKVFezHP11ZyQGZCylLtb6RXjigCmT/KMUjnOUUqWsGEshVwOx2EmN8ZD3n5J5b0zNxWv3T5Gz895VNbRnZiAeqnJmdl18pSUgQSCgwgetMPv/aS63ClK2UWkcefwrupkN5P+sfO9QRjDixDb5Z9c5GNP1MYA4hHPVQ7NJGmSDKbuCQ6USPgdqMCDMAN3I86UtE04Zt5TdJlT4V4BkW7Z8GXKjEAy5HGmNFmTmYLbrllURZt+MLoL6TBXot8sSuJ2w7UnwFbeFyNBvKflu78npm32ILaeGAlBYh7B710x/UPx1TA6NxwgIENbxuuUPG5J0iWs7cUmdTxXVlX0dM2eeASvFs5gT3VIlr4TWoERhYj3/68PAooj3T9hDmkDGY9AS1tV9yap/ftzaiSHax37cnnzJlirPh9dLtjAJImXwlUZDdziG81gzqSTMbULrCwZ3SSw97mFBHdTZBwbETTPluxCJLnHB972PvkzzBkLCSJ6Oqt1e7Z8ewZSCi/ZkxlvHa7gxd61OfzmSGM0YP372zrn0dbY8rlK9k5ac5xBaEjqBfku7c/4/gVXJWr52aA9FZ7vOWMuT/itJ6Z3VxetjLI6CadNCjTpYtuLXnfTwESrz4/fIYtwBM4kz+KCdC6Skt9ozv0lNhuq1FQX19AYbTOOK/0OZevW78DptQkJ/FDyFs0nDOEPp9nTG+cyw4/4LJR3JbAofNlBOkQeU4bQgM5rojb5Y+lh3I6Sv34HowXepsXJwZvgo05bya1u5DNDFR3hoiYsUE0xhcJ7CMWdRwZjRM+76VH5+oM3vM24Qd172JA0mm1Pjtgr1pt0sycF3G4wuLlWXFn1v6ifXmVQO8J/QLXnh3keUxU/rjJ4Y8FKzQOT0isZpomIt3/wBovw4CWlYOii/qIb63VYLW7mlaK/z6ARyH8qIPlxMX6APigCNH3Oq67OhLg1XufiX48C+lzjwaDOVI/siYq5qBdwehXsCiWRlbuVE0+D46dHdUKlh727q5A4oIoMRJUdg36lrCfdLwwu9J7O5PRTbAbstqwYtaJg81d5zytpz9MV0V6iW8svxSSUkYxhD2ilHPdU5fLH1NKJDM00mvvRQIpRlkGi7gZGCbUGkYCLCcXTaFw4s6M/Dt7wFRpp4XXSB+f7v5t5ZW8nVOh0Q6IcNkAvmct++D7H+RYZSE0aY5zhP7KFFsrq7QDKjuClvK1MFkgh+++8S8EI1sJK8KPnnKYdhN/yo4nyum/nXCZRZIR3cv+Zwj1tQrT2sOUyY8agwSbJ8nSFEU7u+Hv3eEtPKEGVVH5ahDEtbtWMAoByyV5u0QG4LbLaljQvEhIAGyGnAsFU20Km+L7m6eGZ9ncuOMVwsikWEMBQQiE+KaL5iCEhssH5INt4mBFvVBwSj3M0Hi/RYV383MDaq/4WaLEiMESj7rZEuXtDhH4Z2MxsobSnqsvGE+05SZAtExSo2ZErv3LG7MJjcW7HCLJtTGI7s31AQEj2HpkMdF3f3uGFqqyDx8skmfSeALKCf/N44QV18XIlTsqrSATf0Og1onVUTGA+ZubfeDDRJGEI0SY3mtgmI1Y7enkXY/sLQ7u/1+JjM8hidOTl84USlTJvPFWsCaH1TW06Qz0ywP9qO7wiERJyLw186mVhppwZl3vQshQSNI65pnBR2awhdZobiKrkQK0B8qkM2Lg5nzGCnTvsdfo5YxgewYINwfdDMrDqUa/5rq4JLlGJqBcxzDwOnkjvwnwTSdnjxtEC0wxRllTnKDjx3zVn+lCPPZ4bovlxgtp9tkvdb+2f0KzOePIv9rigygtTsZHWJ8NKAFEVgOtytbtYGkZnEqkuZxF3fmFT0Xzb7Z5sa13w5tOGVHIV/23x4B/kU6GJ4FsAQ1PZxMYZReh3IFjqqe2MAwjB1lrTjDvwiCLPOlyAuEeY51SAXS6sWECjcvNTwINwUsjBAvhDK8keNXipNQSeEy18AYe9H2OKtHagx8XAo56iWg/4Dqs2ZWwTTwkVEzVG0C06bDSRnVEYzLi3X0V5hSzsrvq+LQd0chMViGsPc9nskBiKtYq6ORPT56U/mEDdCltHJjq8zvLl+7IPMl8PSf/LhmlmaV3IunzFeU/6vL/RUIuj0UivsqdaLMv3ZicbC2WS1ECbFWGLzQ6qKwUGF3ftq0qz5nweVFdUqUTnrZ7b3FOdByB3tfug9btYRNtxezwO0x0QO826unxSMkLGT+ef7NdoQO8wYSjtGFxcj+iJhUwQu12sYMsibU8FZBCVI/EubAn/9VXqaagVVjL5Lmg5e7CxJ+y6We6sfnL/Wd/klnAFNKiQpf8gKBVykqkp+0TPz0vdas8wcnQqa+fywIGw/II7V6O1zqZFLdWFwmktjxvmWOVa0mghnfLLG5AEdIHQADD9iKlxBzVtiNrom4nO7GLXLT2y3+54pD8fWaq8Bzyp46TbSv5AP4N+pAyd4wP5j06CrWlmvudIzrdAl6saj5IYZJioxnPF5EBfETjNYsGxbXfyS6GyImEZbLsR6YfIcKlH1TOyM2w2UO9FW8QF1LyKS4jfdQ6iHuCH6Bje+Mvuf9L0K7l0pOBqhejU4KLcEwsMOulJs6658arEaO6fZLVTS0YpZh7OVUZ5sF413duq4omqJida+vW8KKNtFw2+7MBxatP/qHwfemlZpNKOTsVO/QuIntMF0EIeDJ4xix5rasRntA+FjRKmnpLzhRiiNourIEF41wijt3RB47f6vKydM8Zm4dePQj/jtofBviqpbPtGD/P7i0A8m1774+S2vQHCdlT9u5O7j5qH+UBwkVKGfrqY71tJehpuHg3lVntQb2p9hZqtICx7K8SJWjAiRJfHN+eQl7/UKsSkEvWRXfZ/QvskSP2Wn0cdI+2/kE2XbtGd99XFXrL+4n4gL4w7KNWyHxN2mwJtBxKUsMw3M8CDwbES+Yy64z4RvSg0ced7dFq0vKBb/9nS3k6wGZodEaXL0zt7bLWYQVTOKOtsy0Lp/0FaHWcYe0K+9i8LFhuOO7wGP1sCyMAtpUxQjeX6nWwz2X9vklpI4O79v+88B6nXmq810ErD4myIc61Irp4t5W3ACsCRSr9MsI3b86cRdEYVzzHKREOcdnTKtmue87VTGkBy3hGm1+VXR/MK1lD68kfqZWbovpfC8WpA4/yOa2YQa94nR+1ORe/QE72V62kmrVZDU/PimIz3FdcbPR+52VU+ewNgrHXOf8wnMG/0BYORz1Aw24qf+CCHmZAw1POGMyS2wPTbO1TqzySz4FWsnTy8h5z3QHKv0XVzkCZlVjKWPNB2h4QhLWjtLQ+VFceZuJzdlRkXIu7dEhJZZd7tk6eYYgelDXiRPcIoTsthwD+DFFUoCa+xQHhA/2nAbaqC/BYMYvRo7HMusxWlyyke1C7GcZ6Gz0s3GIN9RBcebkqrYKFsiMWIq2TdNLIFsdJNboQb1peOixHlytSxIrT6B5VYo4QKWSRgyp4awv/gIazcTDMlk3VLVy2JyiiYN57uRid0gMRQGaZMGsxShxQCd5Th49HCkLGjuXpYPw+DMbNoZdNAmIqKZt+lLjmCuVkUwsO/NyQy8h1JOIWkTyegRedVcMnoJWI+OJKF1Nb6/RtH+Luwf6GX37vlUIDX2krJDl5VXUO2SaaftMU/erFHYM1lO+m+QdemONTQ/okb2qh+64AbaBcktPKzp5WXq2+th2qWIM31M6edJ8ZfmGr4f7ehzWHokEe7r2+6KwxSncTSD8U8UZbS44905cu0VKE6VssV9d7B9KkNhsSlpHYrS4NeE5XYemh4j3v25cjIs8FmWln0JiW15Agi7Hy76A9395AvMw0orpy6S0s7t7hqqsScsSDrFrvNeDASeYXqObfUm5Sk9DYG7c6iK5uiVfU6vNpG8iIe5oqF7SR38KfCZWfQ1LyKC8mNbokWJeHnKEW408SuhocgindIUEdCMY3cbqGLV1ngGEb7nbFmlosRiojXJt1yBKw0pOBXAG3EJuC22yNpnUEQpHs9ZlXWgfWjgSNxyU67NjmcV0MeWobq+/7R1VYRC/rbFCds7bvBrGMOX4X6djLA3CwcAsbEt4+iKNbZ7cjFcFf7c13KcP0JG5j43jkT5/biY7fZQuQ+xMNCzxhwITbZCT7OWcbZgBbeKTUpkkWTrRADppr0+a+bhvA9DNPnJC6CJLpg3KDZQlWaWCiFwCdKcfR3ry37I9g0x+zl5xAZt3FG5Oda2HxWuapgMqbYCMjO7D6+qTFOSql4KP99gTPofG1dYgCZT/HtMzywPG9W75KdK6uDKDF0zblFaz6O1PGp+jMI2WoXtJkIM8o6STfEVnKfIzi6+Z3PlJ7i1ABJDSZMuoECsjfEBfhPsjrm5mgGgbKGcwlkhND9kmDWWQNJ2CBBk/ZEmoX0j1TnEXR1hvFiGi4jB+smBqXmila0gBMXXyQOKoB4V++L4jag7WxLLNNwjGtC+1xlwN77B5cPqOtB2Mf2CeNu8eEgVv5IavXOuj89GZO2bdlkaOx+TSX0CVKAOC5B01vBU34hkpZRPAsdlab0vgcjYNXaaHsmgsEX7Vd2vXVp1aXzVG5yprdBmCSFIi5NOeipufe2zTG29e5MaiiuYmeKpPTtfMzYbaVOxI6udliuuIxoWfx+3Auh2AJxBQkuOIY2srekuUioKhj4O9KcfFTURMLZganvJ+JPW/y3sBooeIkQefVyo9ea44iC34mNEI9Lo+2IVYW5tzZOFotEtIXivBoKGa5KLhgdL6qdhBY5hrjOBLVXEX4BR2U7FjFgSgNe68XiZHxcwKS3ywGJE2eYwwPD08/ycmo4wl9FyJVIzkeLa2pYY3y1xLPdws8yN8MT1TktGioEvxbZ4brOLar6F7f2kgrKcOkZ/4lMF2AlvynmsYE1/GLoiduyHUQjd6ayR3ZBVhKOMwvMBI4YPOrMMU8ZaZBgrc40U7VBx0bZYBFwxZsIDaTX7a2/Okjcb4Y3LBcNMXb376dWR1P1aDyEJNsiNv6dRCJAxZEEsGD2uHdm/gfNsGohPV2DIJZ0WhUMGUyBEQOTRUyyNV4sftLqRd6ZjdoN65BQYts75tiVpcjJ2QBxaGxIqLoRNVfawHYs/YNBr6azaNAW7J3u+vCPmDRiFsXMN3Nf8Ufun7bfsgg4sq+324JPeZzsoAzCLjrTQBYnxj504hiBPxoNZaJMZ5cpmwknNsIAYn/h+8hIdNyJ95J43UhF69EBjuwbIYi/0dUfoocHrHmW3SHrMBtzlryIM882bRc1vZoJmGYyKwliyauJHajAQNZXpGCyQTCm49fl+Oy9E3p704DN3La3Ve8nKxsZoNjtyfr/kpndm4HLnJqAfDw0va1u0ZBs65ZnBlo8tbDM+PqrGK3fwueNUytQrSkHVxQx+PHVoEYFIfdTwt6ofXWK51+wSz++JgNcs6h1lXmuk3hnkXBPdWU9j2wYzqXNpESVYa1Zbb6q6fuYvSTotItJ2F/xgpGYragIi/lND1mfmriF1LXCfGzmgGjd0Kexyf1ymQrA3oEH7VqDxd+l3fRNtOCx/lqubTGoFGYZ3ydFg8w2/aGDgfg89Vp0ZXJwFqZd6KVfWe2aoP/VEofON4QytdMZuaMrMag3JnsxYFtjZRX1QrxN7L+PVfzMuCiBk+I/Xr7xdmARa1lj+mpfsqnguF94s3XbwfidRGzUeX3d2uUGPirj8ohszxlHaSNaut+V+Imwaaoiaw4ODC/oL4kIEytJanNoGTb2ASO7Jd4oOFOF+IGunhCpu32dK7AwJJQQ0rQOpd/GkdGK+PSBFVYGb1w7eGP5Pe5WpeytLRH0cdkWvv4NTlw693mVgqfXao9XVGKCVOzPFPZ7W4AnHdxJoQrOgrAbZLq2AuFnjlnSpE8hQUM2dbbUlc1nh5+39Z4+GJcHxcPK2BdWFGEubuzFhWm4lEQYPixAkyhDsQyrqCcUY40pGkDv7fU702sLPrsVAGxn+pULuljY1FgBoaovlosc3+i83grZWs02AEGDY2GspI7D/coW91vs4bhSYffY5QNyowpxLhlT89oeUBgoICN9Ckr7RvT36+IWbOwjV954Q2UFE+F41WzNzV7Tkbiz5EsUSTEJlVEpb7nUgXKMwEN86gAZKvPqBpz4r2OqwaKRVQq5Pmbnff7PBAMzfRq9JP3t50hPVkwqglhyYU3n8/O6K79xfut1ibKItNFEqCHbeGU7P5tNEflGvZ7pQTKIcV9UoRLLJt/5v5tgyoncVbhncEzky1AvaOjx+89NpHDKkxLgxyhboC5smeEUerqnCq3tZGkP6CJOeSoH2rVlXaGdjoix7TFU0vpRDd7bjFYF5Jr/u4PYFTcufPnf/Lq3JnLiXWoww5YDyBHe9O/vzHr1/74EPohxUBQx3waR40cy+F4mHtC7THhDbDsRaOshhwiiOD5aZoC27rk3X093wpaS22xbKBiIlIpt0fGi6SYhVT97WqxVmnArNDWfjXKu6gyYKdS0w0pgIokE1vg+UO/BkiTRjaNugOhFOIQw0zOhqmPajJCZpct8DFaJoitcp0/eBS8mjzrG5HmIs0ue8b+JyeFUBD66OWCPAsbIXnvHKwF25QZ4Yk1xflA/56MrRmMpQ+XPYr7wUGPJYy6hq+j9E/G8YqMaKS1h74rQpTrmBfOadUUGa+zw1h9RJy9/Cl9lED5ZFv3FGZjftqOkX2cAy0RSxtTvrrfVcMXA9SFOS7AfJgZnQ6L8UyFVp6A4w8drW50h3NnbcM02NF7vpMVflvx4cmtgShAf+EvXw/jyFA+rIMbjQHzmmvnx3zvQzPKhBtFMv/J9db4tgIbKLuQ9o9SOLS6yVrbytZyND83v2u2PYGGCvCprPuft9pb8qGaACFMWp+97im5hOScbGdG+8ED1zT5gfom0vWQ2idOhMI9pIwVkj+9cjY5c0favIRd9jRjKGdn1v+gBvJCGxd9e+i/D/EFhgLJplMhEAnT6eUgzQ0i2syDsqz9vO/XDtBvBD+7H1Gop5sjTe6YpGcU9VpisYU+EZp80Tz5KJGAMvgJIE4fzkkuXBM+s40cFddmERMmhWHT3IsCotHNOf+okUtjylBLy4MDuu1mAsany9q5n6ZUvM9UcpNud+zH/NSDaz4YIgWFRFipP6HKsEUQTTRxUxye832RFju9xs8P/bEM4CJchLeqyzY7hcDew/IIlCzWaO8ULSQoQW0thlbbUFhS+NyS7R2J/V0lyliuZW1FtJg6h0+N2L9jSjkswCnKZsAs1tHO4w3uBBWuBOYf+YbTYYs3joNc21v0vbzXgfS2RlQNKoXc9fTvfT/RByuyj6ClcV1ShOUoAOREpqY5dAwyjoasG8fy7fBJHhhSuwzdlCidBZTL6qwo+zWEbgQlidP7mlx7fEyvuNZvOfRphp0ikJtXiR7K6fLpgARBKCdESyYDnvkkQvrh/d//EC+MZWTovzJCLlMXtgn0QyngPAVas2uuMeNddO9q1aQNHp8IsZ3m43MtQn70AKl6Hv791ZzQjHcHVx2f9uZz3t4w8vo1gjvVIIAsaWDrAZNOlQsO4f9tHXXMvnPyFusNMw573zOr66fjy7Dqj7VwviPdfq7jbeO4nT4+kg90hGKIpDY4j0zwFtcW0rVoRvKQN6PI4vLNYwAp+V+zUSxAutssi7mGYrhqYROjGjw0EVy8ev5GwWdELHuiA/Ommd3o2LuTrZTocY4lWKkToVz9I6CaCDjxBPPG3UhCJVg44a9wEPaUqJUipTQ5ITZwqLFyFC0KueZLTTNW7wdyvdT+x7ddkVzbuLAFsE9dgd8VodW1f37SeFbrVKKaBx11UWPZTTZiLOl9WDWowFKanQkZ8MiU3M52n8FjeEoEfejH2QpKcBO4Pc4grolfveQYTREDi4/IHlJ6CP/upfXOz5X6khGdAQLccxDUO1kyChYLzk7k582aDK01J9GTBp2BHVfFBdUYLLkOQcUoLLUbuGf1FOAaTBOK7ji0q+5x45LDS+Lh0BwfKqj2NXU3OHYmM5O/E046PpRpQED3rAAHl5Qm0Kqynp/cjdneMAqDjmPzzIhCp0p0KfQ8l+OiZVJRGWttJ24iNfdCbhLIb0Z/aYJ5SjhOyUL5Cd4klog+CBDpZbmE22s03dUA/36qD7oMHdF24HUWfu7xE2XiFAtCzzkXNsRSUXTLZ1mVWvrwJlXwm3f8hOgayKGKoxGynFybIGYEw0ZwhKFJAwPKF2ZDuE3NxFZsrfAskQO1pB6mNfkllrxOJKae4tsdyNqL6wLqXdop5tFmsE5INrXdaovD3QGLa4PexM5MJM8VhT5x9UtFfq3HNHNFMF3wx3LByFa8JvlQJVlvHbB5NVVJH03rM5LioZxzos8PbQVZLjQr5lRA83PwLKdmlPe8yWbmSceZFNVlZypPNFW3zlS9IhMyS0jisNg7oCVddV5AqX+c7t7PGFuIoBN/SYwdsCKcdLirak3ZO8Lum5C1GD8GxKO9lPqTmg+K8oN+2dNXbFhbEt16KZQUJ2s8Wda2Cow1Ld2vM7aO20eHUHGjKcaBi4eAUIHtKP+A9rRCcF6+bJeofX4uCwmzkuROStMVn/ni0YfrDhDZgod6K/NhDZLpBs4XTod5b78pBH5nEBXysZcl7JY4Q5w+i8rIyelB2qZuklpVt+Rro8ujrKP/W5rT9/m0NF8GnBbySYpgWtky7OlSMi/KXBrtj4fhvnomeW2cn5UrosAH9mZur9Onimkq0xtX7/bmqTVO5cfH9IpIdWLJaiB8/2TCTBax8s6SchcSIlMXqKg5kKgxx2IiHBwXuxbmBwUtt491iabjjldwO0vBz6kTkh1+Oq+eHJHXX1UwrThRQagAoGTBwW6hwS90eWoA04yBSIewP8n0k5ZQA7MoL3qdddCE3qR1Plbg2nSFvbfpU+O3E7F2XmFiqBva6uYWgx1mFju92UisOpUYRy2TUq+mQ1y8zhBfSIEo5SqMpTszHpLeqvo9KuAH8WaLmTmok8e5s0/i2lv4Tb6EY1enDcFGLvW8yUOD78hfcCNrZCVjZjPftkD4I8Uw3KDWkWDIvOwGZtB7NyubwpuPEK5Ryxto4TSMVCse4O6Ex0Y7RKgElnLLtbHmmZxhxWSknVSC0SbjBgz3wzWAtyIM3UEQiZJ5Rm04Jo183hbN45JuY1/QhNv7Vzuwn6SFL7ENNalN4subwQhQHHVu9mIlIMbURrw1u0tzFsE1p1S3TmjX7z6NpW/vbpb39LD+loeUrkRRMmnzz6Zvzs7HUaNDFkuZQlO6mwMqnyMK1bNBax6eH/gvWKQ3aqIAgrS4lHp7tML+X1qovgB1Re6A2jpG/7Mlo+Gaif5ZCICXwKOD1t+pOkYbficg5if8lBIwIjdibFYkj3VgRqLMCkA77VuJiiMyqLgXlZPhrVZdKszWwQy6+BpQ20qgdRhTeHn3mJb3M02LXvLpFZH+VNANb/Oa1ziqITTLJAvohhoXszYTGwqRqbSm7J1mOx/NitRZM03BdFAljF55HqbTTDHndby2FJX6Ioukb9B2lk+EjqrLzllQp8xaPMHyqcymBctZK1CRxeft5+DFXewN2jNpHOvLaOGVpuWxmxgzTNTCl5NeWW/X6eaISWLrkyp9rDHhLjP7Ikcr35fuUgWhq2sleMMVPzfQ98wt+s1SUxqSeC8SdkLzRUqdvQdLeXE8a87XQnBKRw4pjRwIGHlmVdIOI5Bo7BDsM5fquMz+7MDTdrjENeoGbsr8IQ/q8toswI7yRHyIO9Na51F1oZvoJzy4xlJz0kis5vMRpWcUHUNJoXQqZhWGt9ZWX51XuNCYPlm0jo9ZOV0oXCVw5cLyjCScoJrtpgHCgf9bh9yyJLkzoPeS3LJhc0LVrkBWKnK2ndNh+q826q+byVGlx/Q1U4gdPexI3maWZGzZeAckLWAhn2Cmy+edrBM/1nIpchkDT47bxkXnvUO3TX0lavGTFcAN/P0k72gX1KupKoD/aiqDoWlg1vmOC2DfDBIwMkn3tDQ4vgRSyY7EtRICI2MXF7AIv0Qi4M2Y+uc+eKyYWQHbsKp/rB+qAp3byqMRRME9UfIZBr/OcYuUdkVi8xWWq4cc0sdIIr/dks4+QlZKe/WZnVyzNrvSc8RpqacuUNkBjTBT0lZm0eaDdid9yx4XsjxKudUb4FPqXPyvpvk94285KBgbqo4qB8jdJwVplnWGqoUDcYKlHqYp6Rz1TTnH7p5kE0nBB86VicchVSvNzu7MOKv3jvgoE0dLrNt4zIPTvYwW7Bo4QwLYyXOVBzlWoXqhoSQ5HBGEAb6phzHt8ZHdgzA/5AXvqM0UyPX+i/o0yuTVWKQrUwwwhJz3w2oAtBLAfPd9HvSWBY5S6eq97L96WQ1WZtSLe+edpxEdWS3XSSYIduxMwjX9X4HmrsapH6iiYYqs+Pd8XKSgWGztfj4i2c2R1fcY625Zip9gwm+qwActQSRIstb85caT9sFWCLfVVog2HLZqvK8s3LmT4IZ2Mv9nnokiwaVZVn4BS6DUt1gT3MwvJ+DpDqNWW2NvaIEi9y3U+/wSifrZmYCMeGShCiNLT+AlGsF5j02CJIHYzUeBxPVHROIgMOxsNo419A3hH0hcWFjYtSIUlVb+VjTbAdHjAJFAfhRm9hUyLyViU/jaPjwuRTJURLC98L+ZFlgFAsSXtvRlmAA6e0G6lioojZsYjFJjB+Qr4oaph2U2Oz52/i3Phfv/yJUR53Jm5gcH0HdZFYaHvQ3TQm4TslXOv6qyJb0ZVC+KtaihbRnt38Aw55vOEvfKf9LN2y/P5kE9Pwc9XQaT0h5tmubz+NnDFVlRVukkwWFgNXrOnJTjhPhIKQvVMTB859ZqQ3T89TKbX1UWAji4hwCDbdQuyQErNE9fWuUSEEe9hKHTq1Vf8Tr6X2pQbV1I33/jgt1RrKpgQy/V0Ajm102+V4CvySMMvYsDgcqHgguN44NXWo1J9awqTMZUjT3LhMKmIOeIQSfONXYDpk0MyVdooJOC66tm99KduGNIWP9OAmQZfe81EUtHOiMUfAl+eJHy/bm/eXFMWNrIY4uMup0anwhQ+9DXtcwmFl1D4keV3BVSyCWqbIAop90jnHnKRUAU+/S3CTDKHRKWOPfNhfcL2r2rWkoYAccRdWwNAdhLaYWSeUD8Q0/2ACyEHgUUwWF63yofGOKwB/op+IgbhHvZWEcxB7yzFzf/Rd9H8n6mIXs4KichNw2UcsJMqgEVtXmf+t3gy/8SlZqEePktV36qix7o4WzPhGwNCV5IYiCH4YyQQl7LoF8mh76BkblmUcnlDfgvKieMRknKG+FVByMYb2Dy1GUW1bb/SjDjdj3wDZyJhrwDhdwilxBvm5nK1GgztIEtnY+BSBmI7DvbIMkE5YR4MGL5BOpAkSpOfD4cKPcSZkfFvaAqNwqEZUuHviCVfo36qj7MbHORZ9D9VBhMspGPPAIUxAxFfr3VkilpWCPSOOYopPaLKprrUDPbysS08KnUkjHimWQaTu3NIrrvhQizVw8a/A0pbkfHEEATbJuGQV81staD5i9ukWT5hXoya68Ldm3378xVM7MCQ+RjkjXI9V1Z6uPQDzQoFqac5dPf3FGLgJJG2XnrvP7aylQPUQbk5cfAvnPv1MHV54AfevUbqAH2/NRSb6U+ME20dYbZf7zxy5TBxxvQsqHCqrx5qK49RV6EyywWikqkORPorHIbl5OXMimwSqg+VOE9r+++RXzMIvbG/OxZsL6deH3Sh6zcBAXA4VrFR7hfFSWNBAILUuHPRs1X9U9c9dtoAp5OeoLV76krKWdu0UnVbJyPbfH+N85SLlVC9PCb9ejNBTlG+EwMEnSLHdFUubFe06uu/iKjUzihJdJQ0JbJTvqMxNSsCK0+LaUr2pDuVyrhj+f3NVJO0IMGWxhCiD9cFAe8OqsNb7v4OI4YMZG5KsC9HrQ41ODJKRaiO9aT6f7mXIlaq9gr0IbzuWsDT8wAssOg8fTjDhafdyRBK2hQl1mexZYyemVL4VL9/wZt/C3qfZJ+bCeDCmIsCDKl42mTJ6zAB/+hr0DVuEHZHWzq1u1Zm2IY6lPGaIoxxX86gxdmFIlrFnDdSRRGgYqkrOUh+yujR3HI1rF+wGX+S+ODpOKB7/HVFZ1ELQtDP+wUL2cZ9YKIgANVNf/VKCIDlVX8aPOb+qFdvfrheW1TFkS+FnbhbJL++9lsAbahQjUbHaT6xSkkeDSLpatoj7dosVii4inG+u6LcwLIFwlkQZSriSn9LdFiGOGkeHVPx0vdPFSj0yB27LFi9kCjTs6avYtIfkPEQJOLx1migRGjqnpbMty32FqhJ1hBwiLnO7RXZ0YRX3QneggzO5wG05lZJBqyTSL61n6+qmVqYjOHo5/nDIsPW92fwiCiIjbTbXCwNev22M3ushm9XffCBc+WyzI9LPdEYvE0eShaOcE8VK3qCIUTKOrZaAOILP/stA1J82ixuK5BaOQj63suq0Y2sG5tYoIb3DlwgYDrNqTzdP78oMZUbHx26oPKnGil7XJYDP4mGk1MmDfNEwhEkmDJQmAv1lE8SDn7mvyO/gDsULGQrviSPgjvLVOgZoE3fjEg20vzm82j0ujLenHD50hcmEFkUVtB2XIkZAsu3SH5ZI40nyHULHzlpQ0CulHJfe8repivSv/hjhDFp9IgoaHWlF5Ota/LO/LCOYXVD3JhsgHruX0piKzqcnT7628O2zzh7qSiJvJRBx1rJCzthGAB3YIqwWiULglBSo5n6mHqoK4Gs/xlXF3QiKL5M7Gr3JnddbMyyDe6VpNPKbEJqnJQtMxbcNEKwcr/DALwoT6xXw6+akSMuIlve+T8Vb+0JGXO/yypZ5FFEIkrGeP6tw3bj9U1+WsGlUHGx70afPSv5v9BL/TfAFaYbRm8AV/ruCafYf0OAih9m3pdwUC88Kom0KypxkqRGwmvka4hJULEbrhbLmHSHkfpi1k3dqxn/AqBWLdtYnLNT2EdbpTPVNQU6hGQ5fj8gcoEC9Ni1blukZm3fV3O8DBGt0oSMaKxSPabjsWDErMHe/8X5ygq0/au+4HKO9X2Z/N9qXkUQ6pm0nE6q6c1JNg2Se2dRR35XxgSRUG998KzYWDuV2DN8O7hNMD1Y6I541NG6uPe9QeQMOnAaN8r4zEewM0770735f/XVH8iqz4vmylaNvIpYfRqSnboONavxAFyooYcxZmwUPxlwlqf5NjPlc09Utx3jRNxnoc9x5qQJzjnS5AkKdbiXU+IO5bSwM6f21fjaNUU8eOoW1aJIAkpzqC/6Zu7J1mbZRdCG6iG8eWiV05EhioRlApp96y7qYIyyIwvZLkJQ60K0LeNkuZbWGTGXX/sz0P59FksIdKlt/2Q2A7iMGoVHy8X2LiNDP56ppNR/yH3YRP+OpVTiSbyA3XxmdRkluQ7Bax3JIPnqxoUuzrsGgzS6NFLmTSUErcjIOVCUu5Tyjr/pnM6I6QvIsnNgeigv9PmssCZBvrQvPoQhrrba5quyuc+c+3QCGkHoS9/K2o6C55I2WmncxkMsMG+erarTmiXLsog9sXbPVEiBanZvOpwLELQO/M4juPu7hM3HS9ud3w0S4qHO7OzZbZDRuj2XXyEIDnbAvwAixqqJmLIr3/1mcc4jNuJ/qAnPVmNMrlUt0JVLPTjDGezdu9Artsw6hgrjWfvwRY9uM/SnyjXm+qwpkxEc8mnuSB1cZK8tIQauHb89bX7z2SGH0fUX2QyvPWEHbrOYiEJPhIwlfJ8jjvBwogrWYSmqXQS93jqViVMe5EFiAJRbqMO/fQ/S0rV6PaxG6vc6cqvWElxEHbRl5LR/FIFlj3Z8lj8qpFCUgbQkzPoyzi2c7NX0pPkUBFmp0DcOLjAlQka+Mj7gMnOSinKb2iqVvuAeKRh58OgcAVHfO1Mve8i8f+lkw7L4hxZZNndq7dwf84Gc0qRx1PRFCcl+PeCfg7FLmgAiXAcjKMYExz/i1hi+PLX/nVCg/T+9VwfCDL58BLeu/sW0ofVhiLQmpVKJlR4Wf5UctYaM5BKMbDzIdWLFE8Tz1zyXCmO++E0MypTGmASLT+GRyNJLWWXwzzPt7cfLSxSCSR9l/puw7aiQ/Jgikiqwq9yQdVuY1R0ykA03ABgiH+vi4cSyoWVWENLKdFLhNQwMTYdDWmjkS4ujRjCXkl6gxG0yD75BQSMUeIX9NOfosq9G399uYIylpZ3ocIw9J5eXA6uuMHLqTsKgn0uCbIUdv0nXyRG24liFoeKcnBIG27K8YSEH0OAH96UrEA2BbbqomWENBHavzAKGeYzwvrvZYkNoxfpNaGWC/k8avFMGhxgfun7RYLtImKwWZhRpnvnAZAlMYVc0qsWHgDaqCD0YUWEQxrw3IRvu+oyAyO+WP86tnFoPORTq5l6vs/HqQnf8NH6pJS9YtVFXhCFzMAc1S2+AS53TPMQfdRhrT/F9cehGOBQwDHGos1oHj7moRmMjjUPXEXhi3IFI2nsoP8+t00lfl+E4wZk2sjTQxlCg/I4mfYqOtQalrFN7J95wUyb6yUNofb/BKDpk3LrH23gcsfzZeHcWhFwtei38XyPhi9oEoaZr1XM76JDNV1xTeQdnJg+6i0GU1c+43X5MkHtnbOd346uuO5eUq/xJZLpd/lblVpDxuXIP7aCNU6s8CfMuDqO9goIpO0Xw1jHZTK0VhxvyxszWHg0mMW/L9+CM17CO4Hb7hTddhDRk21i4NyskIZz9jKVK/x3/pSOlVPyJnovwosDPHyR9x5Gqbf1fhlFVs1G7V7b8buIS/gh9ZlruRSo3dgD0fxhBzeB4u5TOoguFO2K4x3tXyc7h1J+sQ+VbYpxjwaE4sBvzOwpwo4faGQBZ7oKPbZcceMPSsnKvwmfs8s0x2/lXpTMJTKLflKxcy+8Ugp6vXQsejkCgZM699+ZBGv2/p/9w0ORbsWm6tqwmlmftaAMhmxdAjWg8m0oVIM/Ty5nEaugH1CxA96Goy+8TbktkWma6D+0giFPSO41SiWnmo3mcIX7XgNo0b8yoB4cp64/qunYA4PoHd6Wy/C/wyC1ewP+xESi1YJa1kNbHO1mxEsuo31WidNMSqX+Wwi0igrqwuRvbb4Vlaah4rHfIbqtYOvwaezejR66s1GqFDaHP5gQ/9DP3tds5MsVKP0JbsaPK7qbuoIFZCE/Y++WjlQAG1AjC/6PUD/uqeEglLnQeTD+4pn6j42GgbF8ATHP9mWE1Q2zqUwQB+jalKQNJk5rT7x7FcVpcU9KsaS+hF6+GOV8ntppZ9c0cT54SK0qFKso3+woHATgNMVofiskdjR0NruwUAWPgpvWWKR3q3MfBmd1EaNRwBGjs6jD37WjbGqJUTRucgxPd9PSpDHer5o1dUlKTBl6VVS6Hz3q/KQXk/PeWMrvwG/nooQrDFQotVnNyC1dF+s0unr/68RKWBOGdpWCK7Wvf+4tSq3xcOt/5oSfkzOYyqc8nXFL1MN0RAzKJToGuOpZ6cbsCjg6Fz2PfvQtrVwz2nM9gt7TfLMARwCbKnU8r0iTkHdX3k44b3383ZsqPxciD9SR38bIZJ0bUF0sGBgxFSPzrMcW0Szvxdk6mys/taOmF8d1C+hvEGbDjVk0TdIMXdPqgADz2NS9JJxe1+oIVlAjn4S0dC6iGamgLgMdf1y3oxQBP9WAbwvnFwOOB5ROFDfDb4bwkmZqWnFrExKXFhNVORYZTjXBtJx2e1BO4DwOd8/3FB33w5QI1+bFRgmulzVSlc6+Gcpv51ae9KJGDA51qRdnGIggOkW5u9KAw1TBU7c/+FGbxSeY42moqN65SUjaS5vLI4ax0NbU1RJmS46a5wSir55IEaz94kPc5Nyh7FyyaLOIHlRjYrQqYMOq7GwaAehWMkkxgCb78G90fNx+FMcv8unUCERXJNsn7skTUdFplgGKfb9FVku/Id0z7mh1iEfA0bHON9GPVfDs2kuC084BPMczAXQzakJGN6LSv1R7YNolgVdeajCf5s4Pi695saG4GxucbD6cQvKuZE3v7L5kmSEWXqRwsyLQ+QNdbhig22RjCLoCcEDgHkb43LggXbCF8Im4uRB4JWdBWnBipHChg5ArHQEvnH8Fn7yx8XYMiN2Psxg2ypviLpmpxjUdpFTj/UQ/Fc03XHOYlU/cMtVCS4dLB0JsSrb/ep1xirKXDWZu+kE10jmDP8VpsKL+cucYo1HjWfBpeODf2O5/hMLBIQlGDNTOYUh4VqzULmlzo0LfdS/E+ZWdx4ZzX/SSyfIKnTmkNkdA0yF+U11UiiECMnzfN9UnzcEITlpXKJ1aZzs2uKv8YuZlDpn1cdTga3H5hmwP8dEQ6VHTqYbet1CvJablwG22kfduZnWdDEv57IhMkNFHymv7IpSerajRKj4DxWIyV4k9keHjl9wj7YDI7Bs9FYJJNvx1h2kLV5XwGsZIz+F+nC5kTiJtp3S3Ll+0gfV1MVgjGpM9Cf4CnzspcfK/N5mp0zKOmD9yvh3nNk4SUCTS7K+qPPoElRmwDMKu3J2y0H0Cj7fCpTOWhhnHzvg0jcec69EnQ247dhNOPFnQh3dIdzLhr5BelNDZN/cM3VROY8lVhHLpgz1miVqy3dEnv02szoiCTtv5RwhdN69C4a+4q4raEEctRuaw1oB8F0BLO+DWbtzh4IHFsyYPvhyMhop38sCQH/zM20//FwixPv5VbyLd873kh8zIdChgm9RrznrTvBmd4i5Qu68RwqS6++VwAjcHdWMddOrBgIkznlUVQZxkZhyRR09qBv8LHzRvrFIi6Nj5SJyLMdwONBsfYIWAIYFGatVzC4UYQwC5y666gyMKjeH2evlsEird4Vmk2mI99m0dOQH8wTmWF7RkheIQedXXZaqAMsZXW7zQB0QgYoFX92L2P4kcvqweYn+jbF3te06rbV41PcjivFOMBKhB02di7kCeWT/7c8OvO+OGTbCCrGAxxtTY9Xzihb7zP0citIdb6R1gDSJLXiPfi9j79uRCbwlk+Dn379kcIkVeqnXSHsYBsEwJJ/Sg3k9vTj0xj8GIm8IKWxCjyp2Kaq9pM4JSrNEOk3qBosCp+7gD1U73/1reIy8B7y/4+MG8GqKahkdJQlZ2AihfKwVeFP/SW8Nc6XzIg91u/BQH3gV4HC5raTvUjt5zt3yD5Wb5e/EcYd+WJzbDV7bMD6/mbOO2n3lDI6//E3R0X9cpH+5SWiBwTqZn3hURxhzj4TlrqAxDHNCiMPlWB6qPCO2u06Y9M2ZkSvru8mkM1eTxs6BBkAjRqb6A2lksQlsu7ZL3asTfW1ZDfkEnlN5Re+nATDY9PxOCfXgNDJ8oApckwigM0hz1Y9lyPRF6kgqA13KU8STXPW4+dX7Zgg1tvRGM2Sa9YKfVLC4RIOhuR3CCqvGu6lNMYqvaUWln+cT/wPAsq8TwntBdDzpZmJRKYvUT02+3NcdrdvcbgNtAo1UEIf++xiftLNFNe2C2I7HMHbxtVwncxEJqnGUJ8Q69nBX5rCEUf3bLkTq0d9FrdTjijfFHXOt15YYPlFrRe6OJ+MJumdsxQNFe9h7zHI45cRt0J0PHEfzwhO/eoxhD9bC+0v/62KKPgneFAL9VcLNrZUD+68UVUj4KW6Jk438J6Cxh/xHLR60vJrsxzVTiuFy90PX7v2ll5R0mOZNNVpc5qX0pADM3iy+HnVixHq4MTxcuCUfwjycf9R9Vapwq6DbZ/hls/nnnxSnN/IlcgNpcB54MrhhLg3xiHMISrWsF9BcIzgH6orQBNlOkX+YbRCS2QYkzU3bhp7laa+GC+k4rXE/lmaW/xBZkpkAoA2g+xR79/KaQ87lkieIC7u2sIhvfPSLs24HZv268dYC/Hb9KVlrYKV8S0SNvvPb24RyXdpSCB+dfxaS19hvapWRC1bu1TQtLaD7ytS8ocqHvHPLhxJtWRXGjxyf2UkEDItKDBCfjGNAkFQOHJIgQQXKfBWLIlyP/YA264EnWeT03PBWcnmjYvHf7ct4qSkGMvxe/YKaBy0gZVkm6INiJB270Fjc/bDDrlOcXN7FDQcYzU4Am5rDrhv3RRDJVgy9TdgmYkTS8bjky652B5FTUI+GAzx4U3kLSdwu/90FlIiQSm5hPiqFyEQDjDi/4JEBTft2n14qRMu5inq5GifQ6fPqtH7iEVg6n9Zliz619jXZBJTOOxOUGJs9NuD75XStKtUMefeybi1HYw2m3INZzw+2HQi3XWMCCCBxKF25Eb5CinHyje/y6wHB59FlNX7k6wW0Jgu61QmWnyTbNg2jzZB40rqESiEUp7Bs0vkYZIFhRYDcPUK4ot1z2bznrSknZ23b6Z7C+PubQ2cqPo7ps7ALCVYebtAxKmNU4zF464tgRCQtZRYON7HSww7ZXcLkH0HxqXRPHxeLQ4kqvzeXYwtykBjsdExMNxQZsJos2E6xnH0vnLhoLa/chfHhXfiaIOE+fPZvITCv1mJ+JctEltS6ldZVdCCErYU8mknyaOXqEjQ+6vrk7X1cgUOAbFK5DY04Fq7pNA6YSs8n5lNgIbqjsMD0QzpJcAI4UbKZPYLO1yHXUd34qvB77PqqNRbnUf0nDRvVfK7AdV/dkCsYBTqbp+VUcQL5cmq33mP9z4T5RnWQC8AN7qbWeMNvT85PIe4q/VV/5kMhLwWZPOfP8Q9H4x72WRuAeOI6CyQ+PuWepttNWYsu3S5Lyvz1FoKgAWJswMIlrindzzrZSSW5AHN93nGBXTwhWVy8gcKpV+qZf03o7Samm55y43an8JsxyLusAeMFomjb89uaI6VgjaGGOnaNqZIcziBbQWo+pJEupzsXZvfXfLt+i1U4STgkvzUgxtJJBbjcUl9tp7CQ+hsf0Fr1eeFu5ak1fYCfmZHU/5Zg5+bol7WNVwa6KECONdTHpcrQj3EzQF6S2mbskGDB5gS/PG/G4JyI4YismJIQ0K9Ne33JjaBR8wTDTqUFc9HeFZIhUDOxhZzax19RBhEh5jclxjJHQ6ev2OnpcI2K1VOyxuOyMWdeJeQfUuorcNofLkMP+IrBmn/6HW2yRvHkcLcFFIznnXhLpKa2xRNF8eYP4GkzO/6d1X4BvE0O8lhMiZkWCkhLLn2Nl5EuEFCE+rag5AkY6J+RCZeEHl0p5i4gq65soA/PhRW2BIxI+Xt/EEnnzvQ3X6IttCxuRA1IXYFwiknfbayP9y5q0pgfkWu3ch6TRtwyRrRCpEN5B7tTXEc1O1SS3MdVWJxoQRT1pVlZBdK8IiQT2mYhqdzfzNXGEbmKOfv2Pc4U4Wt1Firff8sHFj8rOXsX87u+LDlmr/G/7wbN2kSVKBL+Cb9++6+HSFIfwwIcZuzKjYVrf9r2psdRMGry22rB1++AJs3qwJHWYln3thnWx2V9aRl17Og+IYsYbBHikWy7eRIDamLiH+wjy9giM9FHJ5ptYLjf19Ileej8W73kouO4sx/4DuGPWEno5p3aUC1lw+zvK6/Rgcl7kTnDNrvk1jb621f+NprgOA/UE6wNWssxMM2PHNmbPtyklH79MkvUbeM3R2OukZZc8iIu/IV6d8GTN5HxacdDENHw09XKQ5Z7EMrP9HVs2asZe39fj8qJ2u7X7Ca+5ve9PHOrDrgxEsHmeVA9ZahLAWPnAHUuvdJUZxgl5cqulOFS7jplt2fZsTUrLCDZEh3nCBGhUiFzujgFw4efKO7bNMiqp91xbcRmo87X9Ct6uqxId215Sziw8OiyLGCGwWw0AV8HvDreJOmWYOb5N3tojE3kAz/RdgIhIWoYMdN2P/Tvha4VlyipXAtnJkQGegZQR8rhYfIwi65oNFi/kGHs7p7KiFUh4fm7ad+bDnzY8t5FCHrdDO6ROTI+nrywUwQaAOW7htkf0d1tJhBtdlhvf6BKd2anwGbwxwwnGGgGPEBgfPxUm/dcjhHAIgFz+xWn+LEnkvsTlXa/QfxBb74BzUuyU4ssLwY8lipCgivGyn0Br+Zu6DSoXOAA+UvdFTGUdkxMg/blgz22QBpS7lHYahYFWRw5IrndacC6y+acndPhqwz/DGxvu47TmU7KOXbqwjxDkkfcHJelUXfMIvZ5zcKea2IXIV8V3HJ/mKfOqGCFbXFiXu8ogPF3RBElwz+Lbtawl0zyCkIMUkWwtw+/qoR7L8O8UTg2rQtt9Q0ajvvs8ggVG/1LpIZdd408/41RfA8RubmizRjyKnnlB3jOpLz9WSmNMh3obVq3p9Z2O4gFrqVA6UJ1KSM4VmIFlBtKezw/gYplfg7QsS2euwX1AUFXsnO5qZ3wCfNHfOVxhKcPiFk2i16t5UlPKw2vkRe2OwcRmqw1aD/UBhTmrTio4PY1TMHphQUSD6RFJSg08NV6/yKG3FCFenr2xfXt5258miU/68BcF7FT7StbaMrpOCtBBH/T0Asugtpy4fbCgnX1xW1WWXckk1pYuLMcK/nKrvBWWtdtfto6m7WmyHfdAoGSvX3LXo3Gd0bGYv4bmgLrJJcqeVc11T+TllPMLxYw9X8rPQ631IS8BQBP6/invKU22y8rCHPJjAv3IVSmewlE6JTR46sUrhu6WhcHcfR3hzOlIXC1VEbziLJlTo9RS4l15sLGUgLNscsSVLSTnJG7WtvizPLL2aiafGUI2MPBNWeT0XN/ykjniSkh9C7Xoya23DX3ihP1zmKAlPCN70hujsuo88/9YFz3CWHNW6NUSYSqY32R5qxb+t34aD1YRUGX0f60CISIbE945lX2i7fGO7afjTUgld55cbA+mN8S1LdmfIYeQzLKYLkxrBimxgNSHdpKG92HJ9BpI60YF6SamEF/CvA4NDKmKvD85SFeG4LvOpKjAJR6K1jNeMX2tWqZF/DSaCYr6q7e4mFZQpNxMcedlYR3iSVufT5XsvDJsHyUT/e4pdMk87HrodykYwbME9Cw3AuAtKxJWa2hGeSCQQSHwEAmtLwoMk/FzNaAjB9Z4G2vzEYj6egn/BAxaue1u1mrE1YKKmOOvSup9Xs4kMqdqgFvNQfVynwRAAKacFKv3syCR0NZK09Vb6N9Xyb4luTIqJr7/17z138VbnbfNluD77lm6eRXOIUSLiinUqa09M4jq2DvqZD2JWGFCck2R1TKomXHbMPdol4gvHqvlxwRVbKwBWGk4Zvg2N4SI6QX22JhCCCxQ7aJs+FGvmiAOs9cxK2SOxDbxsltm6WiIGbUQu4yVX+pALnMrvMMlQciQgdnlte4lVIJZJBj9EPCZ2LgHOBxW9q1oB5itHp08fsqemYOGPxxvzYyRvCbIsJeE2Bv78/gZuPx7z2IV1KyBp7sTnNpWir/NkDOVfEhyLpaQeaz1KRXmNCdueRKFT+4LTj/3fYu93XSIbdvUnLMDNuT2D0CRtcdpwMC2rsmvFlo2E2BLLzbCDHAqltOgorjNTomQfHbhGnwWQpsD3/Ju8uyRG+INrqrlqG0dGqzeQ3h70EttEVowJqWC8R6yUA/w0rXlNbrStMqWhFheXkUPgVyQrIOjzQI7ez3P4h/8iQQFxwIGf3tLwxxXpb+K9eOgw6OTvMb8OqTKgn5fMHkk2WmLb6idMuIGkL4n8aXHmg5JuFI2Bhr96KYFsNC2VuuarDcld8RR7SsZhQjXhANikryyHQoHX4cO8/9aHhOQK6LyMtje+A9PqvbDNTyxezoGmZD1L+V6rZ1P+018zOhzEd3QlBz5ixQZ9m0AtFM+8yYu8l9Xx80OwKaHY31lEIhloqqg/2UpWvBxIfz0jVIiVV1nyfSB/opyl3FHRDsNIl6Fl/K30Wk0yihYSXjLHJY5AlIW2tyAfB3aIDvWvI3WehR40Qg5eZ63ptBtSH9s9Rd2A4iT8Bwh+jAVSSj8FGIgCcTe2C3sOfd/8r8S75Q6C2qHb3F5uCm+HpdT+Q8WTt0EolAnKsai7ALFDMWr6/6mQToJmmbIkqTT4IevjAEoC8O/rvOBCs1fHG19t5lpYCc7oveGhxpbA3u7wlLmc6zJdyBoKybWwybBJY6ljRN+a5S22ntW1y8KMeZxc/i3E2BhN99yM49rMhMWJJ7DIZFj6+s7du3IZh5jpO3yUS0nrO4fiFi9PUg26rAh08eh3I+frywOfqFzzkBQ6vBNWgL1sfFLWOxqBVjSoWFSMAUQz6OwOZ/epBRpafFHjezz8SvDmWlFVuIiERURNuvg2ECxwvtZ/BBVEbWNhNpfVFbwn9fZyITE8iyooLUdZp7KOP6PmoZsfyX0VaJFyWJ7EGVGdbmk4WbkiVTb3mBGrnhzxhlPsQ7LZOXEAj/Xt07GDjxzdANp+9AQoNrIig6VRx6U1cnmRs3aR1ez6nFi7gTilsRK4wQHGwXs4os7cWmGMvoWFy1gfraJcFGIXurkiZW0EZdyAQXwWi927h7d+KUrVTh6jO9obVz8SWct0peCUqadDYkbHMHFl60Ui96QA12SYWGaI7rBt6fpDYxKbULDBIkyf8kuVvr+7cD9GDsMlj4jQGrUzeyEh9R+g41iSmUm7ned+pSlVl2YSSRpWAfyGbFCAcWxTKt2x0oTcj9FWh2EXBbY53D8H8+nFb+AVIkSjefQ/Cu6E25FM7z1KaQ2xda9uSuCSOzbn8qKaCGxtAY20a2mlGSpQxPIBp6hNI/iUcopgqMxu+KhpLDsmWTz2H6LqYjdi/hcLT4bNmdUhhM1Bd78OeIp+GvsI4Delp+Pg3ATO4nkh33fAsk6Qif5DfvCi67pDJvkgd2/2d7i6hyLv7+TWXssD2O2PtlxVVHyVspPPPB+kbVHmjybvasbDriAGxtpKiAei2hG8mCsQ/r44QiQeFyx0SwZrkqE29xHiTxAeoQWIRWzpU42bGU1boMW2TUbovxQam7pp3YYaVbZm9NOIGpVmqW1kQx5SQpGXpQ1MTPd5/9IP1eHIRTX+aO9hzUksWf58wgt04SC2fhCOaG4V5AyPhlrFIFwp/sppmCM6H+mLtZeWmSh9V77dThb7mjIfQgYeYgDo/I/uYmZSIPenZq3h5YFF0+gRWcpDw28MTIOcQRnNMDaxlzCF7aEb5lQp7SKb2PSTv0Jzvr0RZqps7IbZzjZcsECRMwEqQVfit3FOlCpZEn7bQpPMr7MiRuh+mrBZxA4/ZlYY1bp4ViHbsaKNez9ntbO53/sv22hlQjhSA13RmReB487YIDi1bMQ9cqbqHW/7dBkdc4LTdbqQS0ZU2HRAQQjuOffUCKUcbJZDiYRgKWoCtiYWUOvzB/226KCTWqe9wOrSspKJ/pJ2GtdmrCJ9F2KmnyLh6+q/Xj+JOrGoDURGL4A8owYD86kgUx91CahWhQ7+8TXGaWO9z5Y8Gyo3i/V7U2rRsGCPi2DT9K9R8HhT9XoMJ++1wUWDWwi3+/lwXE6EenB7nPflAFvm0fjb5hzvrGpJm6CzkCm7QNZCrilWiWGX2TvPRUD3fDylLZ3mzFNq8mWgF5WjKQnzB9cvbnu5KbehQCGp5JGniASMCQhe8sZp1GgSP/uoV4YzdZXwajNYdXc9aFRDVp43h31SFmahcceCKHzsX/p8GfQVi7mUuV007YSTXBRWgybwO3xVxS8sCVDV4fJ/gWNOCP8w7a6b/glKwH8RnaW3jRgcsXxSMrT2QM77doI482NJJd4vhLiYSp5VpGplHSWLX1JR3g73Zpj0o98gl8/DECKj6cMUE0eEjEd2ixEwsjtKWfLE8hFySzRV27eVRFeZXdrKM/8LPxVMN2cwYBWaqVL6xPHaKfVb+24oLnyZvWkxSKcr1hKulhUwuP5L99eUJeVn4y+VWUfYMNp3zTzZ1l5RvrwNdqfI05BJjsq1da2L2aQRuBakoBewTWqdu3Eygca63PHKey32dKCZqOJGPTdLtUSMl5k6ye4uoPL02QlDC4IVR3uZAAs61vvK5DJoSetsafVqXtBPKdRYZ2lJE7VIWcQFaugHNZbuqAi74xAidpk6wCcH4MDpYnX2kCvVHdsn1lCkQ9Miz+zMMv0Wel8Uvrgo2N31Yr+a+2ZbxpbHBsHX/fv6Yvt4430Nuc2xHA4sgSa9wyuIMQOhEODkJadFancHHk2cjFbsXoHhx5r3CyI8jKJkPoSexHNW0o6+h35FcYlEyQPaB7Ew1Y9sckHCeR7inPgwJvrcdh7KhMmJ89Zy3mpOUwtDrUbCxdR7M0OGNKewIXr8q0gsPYd4mlcACuinchnd7RQWrGVF3yATX6rwQYyhW3Aq/BFzurJ2tRfbKpc7BzUYKpCv4WJhv51jQQMrFZewG5PPECIlcUO5rJn7RyZeScFq8uKflvgXg/4+JVccypWvzq7T82dwL0qOQSvg3QBb8Mlm9l8bCI0LPBAf8zAL9sne9qB7k/zKHsp9KSyvGf9EfrEVtPwUBn9UK89FXecmuOYfZhsXocu/1/J7TgblBd5Icd2Yst0jBI4ea6r8aLjrKkwP7P3BO1Dr3XMjyPDvRbvtxOTQFwh1dNuKI9wCPTIYsUlWtPQ3489nUmdIT6cUFE3cbKhLgXbeY+79oIrWVeH6NeTF6QwmJZt1XuQZmMp/TG0+fhOmdSGlCDuXFhwKa1m+TIq1ujG0WSpKGDLGnw7WBO36Gsm2uwzfMY5faMKheqZgu1smPB0m8lyDhOU5U3huZekQCRBTLph8vpnnBA/uQWLwNPQj9Vn2D0DZVipZ+MQZS7gPxbV50dc0BAqEPI+Ps5agqWYziCyevN/JfvdeTqVUZbXtr6THcBmKqMS0+eAIqZ1EoG4XOohViSI1ZRvasT4HsQnFeYaRU52BxdbVSE58wRDRSlvv6cLOUdEY1tevcJPVAfyDkiWnJqMtHJB4icVNSw9YBKxEWVSOQZqnlSWvWnY9hKyf3/xvnxAj1MTZ1z2eF8MnmNo9k0ESfGNIrqHfkU746pLWssU0t/iYiWPGOm2XZijbSPvi9aMFWJdKFdL9K1Cgrx7t5nUpQIU2kr33Prb+nRbuZ75//BApt0krEXI3lu+oSKxM0/kyyvYLmAtFwgXqaEWfbasjCMMD5vlCePattEmnbhzgZYxci/OGsySPsvRSamdZjucDh0ChW3jFg81ql8+XLQYtP24j9HoerwbSXJa2VMBxvJh3QNaKW3FwtEXDUPNeB6eX/GH/kG50vldhTRqk3MOmAzA8SEdvfjWjRQswaYwAY1VQ6ndM2U1/bErt9cD9FCkvfn7DPc9Nzkak3EdLU9IpNoit8/7H6tYqjAzScsUsFUSRsGM49Mfhc7oIK7uDYKCYXr+Ceb1PCsZk4HnEAJCWfxzpBgDmxB7gXD9qz+nN8v0YXouI4VoHArYjgvV08x8eJATp4lKoOVWIqysZPjiBM3Qhjm1Id8Cg0jCLmlKXjY27YDNIx8CwSbDpTN/WaRgBJqrGa1yNgX5KPSnSTl1VEp2cB+m+xDxR6Ns6C5e1mIfN8GyOz6a0CB0SVT8N/eGoeZkxhsP/p+dcmQayC95im7YhWC4w2m7f0pUqovTzjBkm9SOYnXApk6c09hS3lxJ6GaRrh7iZZ5d5VIYqd+D4l3y6fMv62Nlc03d5svuDacczzRTq+SqJ2/lBY24iZ56cBGQ9L5JWoIe0KgB8RbMV6hFv+j9xwrBXygKcgXr4wmlJprbOaUXWYsuqMuYRyz72uMuvnolIiPZf63vVHkDioEnL5Gi1+IeSllIyFAPXs6/QtfwJ+WVuyBTU8/wBJTqFISV6VvdmpAJxax297f9PhJpiBhJf2DYgBmTbfEXQBSBeMFz2A6kjgUU0M5CdNy8LAJEjHDkITkGXMeCkA42DUvjveCz1j1kN6NCyNZM1fTwvjiudYPlTr8QkytbYXm1uFCi3ORJ9902ggoLf27UiQ3BX7fcBqZkJ0RHX++CHaFHOZTD+dfgUttgTkJmzo4ToKNXf7NZcvS3YV22buqdK1R+xstEFw5uu62uL0v6f+s6XNZ+w5iR2ls2LEVrD3ESkXCivD0Tqnbzr7U2h9DMmUW54h7ZVVmiPo9F7ep/52RQQHXArlxXzqdMk7042QUDvSBBF+UwqxVTVbQYHF/fkLc3TCi5+TWg6W2ipTpe8uewavwkg4v/KJU9jSideJ9LTqMMucOIeSQDXEvmxYTx7ogmEBJBy1VReccGXI1vW5kKsIWn9wz9po42dtKpOgaPLMaFRKj+SZVw0/R2Fd1mvsgBS7ONCST1L05jhq9RcOgb1zPneyupwGNuy1bNQ08HNmMZc45SXqqRlt88WuE6FRjxxTeOLZCRlhKpY3LRCJD2MNMhKjMu4tclSaFqNU1PE76kVqCUIEGDgKOCxya/cCe9LYjBBNHJ0zt/LXZmkA6eKWy+Cdv6qYIGfLw07fWkFIJtEGGpOF7WQp8t+UICvB/ZPYFx2rEZKS6luWb19jn2r8f/QksVBVnkTJ5B7l8QPhoL+vdgYJB15LCEvu0CxTbGjI+3A6g3q+V2UJZWp8u0vYRvZd85Dl1ONsT2lI667/HkMFfoizR/Qb50Hk8+TJQflXudCo9xfahlUnz58DUkPHBUq855nTXTf8CdXgE6UPbjbVbQ6NMqgW5hQ8voj4sHuRgndZpgOf+JuIdNTezfJqWcweqowOxjzrLqAv2U9GLChGiZ14lUked0JdUpAPUJok51qZquPneVUPOaMK13OfxlbRsY3Yy16sH3ciYUs2I+95XUbmkuCrWwdE6J/tqy2FPvn2NvrvgVDsfn0enAs6aoolx+4xm0PgqitItMOu/vYAL6IhqXE5zqIMjLGiqqD44CJvJn+yJ8rS+9WCGbrSyLW5UjECbBCajc4RfAbkQb1+dPlY2F1yavWU9zttVAlyq3tIA0XJhh27KT414x7v4RQ+lq/J9butM8CzjFrXXNN/Fy6PDYy0sn9Qe3h9pH9xuBSP9qneveo8RoGXS5oI+PJrFatt6N0UmwIIy6Ml3lqbhogDi8rhXi8QpCCgnq0zI8NvmEpDR8E7UMhaePZu3Wp5A9W9HuU0JKRYpBc2kweTI4EXJ8Loi/5siOECGe8nQHk9gceYf1652B9ckzHV7pQn8VoffbmkcKu67BAYoSDnBGeTR5rsMK8FdMw6NpSZfcjJSbXxZt0e+i7SmDRV76Hs1vMYV9MQq4o4VcTlRC+b1xsnWGSleotqyE0e3LTd/0G9N9DSNbLMV+DkUgDsPWo3aRriCU2utd6CpYsDCCtreb8G2j/ziw2uXVsDa+QbMf71+BfBGcfD/BXXO/5BcqxSuFgTZjBAde1n3zlmY0l5efkYwzxmzhVOfveBrFCAroaZEeT2kC9QSCl3pjI9g+7981rzwXTZYyWvn5eDhs3HY2MHGDPUSRTzFyKtxmYUMTwSsgMQxpt2NesuaBbjMRZmkSyJW1ZdYG/8GmxVrcbL+pc6rEhkepJUqW7r+fqC0rHxrsQeMp8DRr0a+6mDsX5rAlEAXuVJtw30vM0/mOjk10QE3FwphjwxmoVRu+G2eY5HkoeKDpjMA0QgVoEIkxjnuauOdsEUkZKnmxMWg1YMrxMJekvOl984Nn+LxvCe8ceGmJH3QBcbB0vZxSBV+0iT79nrwrdLq2UvehAuYGiVJ6as0XHtvsxLccok3X+vw9613J8jOuQQzUdGSSO3TZ6Try6omBVxB4pE5R+zW1rrNdOMDRgpUPTUwcVlHXcv0qzM6BThZ4qj4MOdOkOArzYhAYVCx4RDKUKdKxMeOqupZ4YqHoCQM/8k54bDAaJCqvDfRB1eb5rC4rijBJT7s7y+CbojzQN7eYWaH86tqlHYuCjN8NwDK6m81K5fv78nOr4v/3k+dmghh6q69W9qSAn/EPx6ikptcNTihaTzQP91uWojd3fXnSfXlgwuHxDUD55tQhbCNsDsebbOIisDXsPPOvG6ZQU/wMb6vOmeD4Ttfx/DLW324DshFSFsStOkO0Ab3uglhp9ney2KA5nTzgx66fAw2T5/YTj8IzKgFMIEJZRowawuomDSZlGDIINUqQqpp4/E0o9CnXewJao0ku9W/0g3UWjRQnxfimHbJTbqKPbiTnkYHt4SYn7ohOCLCvPh/5uMQC4ETUFlVr/liXkYj0yZPWZ2gTkogaZdQcD6KiOZrrrKKZQB6h8+F7tAZGJftO4uSKQ+fUkdWMNE+LQUoQjZKfeOreg5Bp+VKAfXvHXdB+mE6OXJ+EUXJzP/sOADMa5uwKFjgr7/eQETuRUYGGNWLaOlmFWrpKMwbIPi5ZPy1JuAk3k97jHOkVlZEOmyk4+cVPp3LWeRPZg3LkFfXTElGNgcfV8oNZdK26/vFpbnpl2unIc9iqe1w9HT3oTP2w8ObmGi7NNFAkNTOF8v5DwzDx3fGmiBuh8i4BTCKHi9VsfuNvQnLj+U65e18Kyo7HXoFG0U0E1KKtCeE3M8XyHyw12YZ0O8Ta1dTQRAuc9w+WQnLh4kkG4CxwSp0kspx3UtuJ8eX4MFb735hse3otbgaERSALPLRDcg8CQLhUOI2sKdyQt0u0yow/ytJwi2NuZKp6/MFIUv8C28BAUQaHr7TfJoBoU0V7Lao1lwrCgwUoYyG3oDL/gv11oOXglNbbCKc4PmKh818oQCDsZfcIcvYC8sNPvUa7MLMobxeTjTnieJQ6p6Mc5hKJueI6747iYiEqvyv50D09dIsSy8xN8ykddZH1EBKjqsiK0l6yjp11yHwJlJpwkXmydUv6mvc4G5TJi1veFMSpdyhto7rabOIBJ92uMnbl6XlyTaSV7HQWdo0zpnl26qpqn1b7SCKvD2Y/qQOuQSFtQ4us3dYI4HHMrwYpkBEi9/qdyn+AHrsbA/UW04GJWbCnCbf2DBhnMh/2p+sTw3r6F2y7LnWzr5WevpAZjcnsGXjzswjfEwc8xYWBcJ7eILdzo5WRyRtVbjEhhPFj/gbpBpZHFlxkK9cD6cSwRDEHz+uLaTRP+077uh4MaglwKd8k2hwU02RADrU6hyaVqpDIQtmFXKBGQmalUqrEuv6TVtf6lW3E0dFrdkVyZp6bYMeRuI+MtxAyBGrYT4boX6N/NV83Ehd11/stTuYX+1zh1WfkOZYC2kEfvZfU3WDsZZg0+Dq4QRFxuNVs5erFD/bO2z1NubHhEZnXHBtKPpmIooVP4Natq9sZn3x8zWbuHoOOK6WzXt+IJviWrnfUAYsv7CmNBfUzzbdmxJdWstDxOwLzzdvxplZNOlYHu4ECr6zG2j1ZKcdO/mEaWaWxoDx7gKc1JBYFBlsvYBSQ/ynktdCWsBq2/zxANxoyV8Br99/DDVr7GU0fIsRUW9mNIeLqE1lNojk0p0XBqM5nbPorEP6zI06jdEqrXnjkPwU2y/hwphFyg99FtMQed8IqFn4Spce7+ab8xbZzvnqqjpv+6qMz0fst2rylbHQc/dJr1gnFER0xpqU/kEvUwVwThAh7dsdob0cqfWNOARMbOJ9u3BSyrZmifzLTjp39U9JKPAufpdcHOnxZT2NmH1m5Xa+19/33mUGYIiGPyGbksbwCZD9aNsJesNH/AJIHw4sUBY/Q1BhApFZWuLj5pDzL77KDjX5qthjC2/LeoNc5GJuakcdqTtmyvGBXebL/LKnsOsn9UwaKniDZQP/nx+etxqT/o48Wa6FmuLGs8ju1C50pOwpWl+t7oYC1u1sZ5v1FUdb7d5ELQaC2asbll8Gg9vPgiqvABJoJgxiSvz9seIvdgGa+1TxBJu/FzPSViNxv9u72ehimzbdEPQQ33KGXRz+3EWkYFywp+MBOTpHzjRouHNrEB9MtkmpXe2xE8oXSFTIl9fsClGgct2ybZNPh4ey6lMI5OmSGcEZt1hCbYw38bcBzoovwQvA0KvCadGBkcveMDncd5A0T5YQH75pZzDowhrYrw0AOVPfKdE9zq0m/WA20Bb52eJSOifBJSkMNFriRxnmg4sVvPqAC9ePPi/WKDjFPGFU1XboqIpeWcPMRrS/tXTSP0DCUUBPatM/lC16qNq+TXazvW3thiHl/2/hJAnaVzeOVSVHTeo/NWkFwFKn+Xpi6Vo1N43sFpdkhmD9mftiEy7jiAmuM5mxOhrrY54QszV0LcJedmwRR6CmexOa7e2Q4YbH2DyUzj04HZM7x+DxkPrlsxfhpSEAQpGx/oWdKlBTGEkk5+ScWJpKDKjCcIYeD2aZ/qPGyflwIVbYbGkszbReJ782Jbby86SmMFt5wGS2jdUFyzfOCw1XZkQJgJ1uqPnXd6nyhQdPg8fDYMmyyDWkbSMuz1pAmACjxxSwH2Xuo5Wpz/fN7zRD35TX3W8DwoOa3Bkg9QtNgOlcw0kDA424FVcsEjMoozT2eYPegXsyInIIBL/UilNwTcARQ1XFTkGYPlw3YO+WIkF5couoL1ussY+6JlSji9JEUKAFca1nD9sPKW32F2uoD6qTpJ2f1UZluX5GCRtQgM+MdfjVAVkreFTvDCIgC47IrIComUipcyC3hjuZ959bi5ClOLv8iPKZNX15cge4ZyyQpxDo0r1NXrO4R3cmY0iSF7EjFcmxel5mjtYYoGQaCus49oyrgD8RJ3W3o57VPlDi97sJh/YRQ6mdpSpMfiageCD+U6Kun67sDIH2VnQokCv/516o/HhIiVYJ9S9BsCkz9LVxUkjWnXw9milZRaJ7Y/8sNQutgiVZCDQCcO1f8fw21zMkCURkQfsTpKRWy6SxNxmMo2/7XY2Ehzg0JRR0NmYdJB4w0EWf1jXdjA+G1Dqv/xPV2D45IUs9mYv4LUquFJD0u3jSUKp/GpqHWiomp7EaxT+ZuVWLMFZl/2RNcxTYZ0cMvXziLEusNoVBCtDMmQDQgF68TRHcgA5nRxlhCWmpR0DaIepDmukjV/hvbYKl94bxpbKG/yam/jt84VaL7xIAidRNoPKF4huY5dCQRPr60oLZuVjZW89kdgLLyrLjrIGcLk0tvUDwPsboj/8lSkMT7ZD6jE4Vg6RfG4Nfx7LJueAFlGWneG9aM4KFe1zVQWUHrbiExf+skO9bcR4bumRyLo8jQaNaMTVu/BhHCH7hN6Xr+49OEcBaYdI8tM4gxBkZXibmNInj2aFfo0C/f9EUzRajL5rtOiYWTypQa7muyDlz9LpQAW7nvoGwQTPFE0eXt1DMQgcvUbWRnm+5KXSxDhUXyoZsCvgHc40+kVlxyEbs97YfCsfX6jSh90xW6GDICr+4qLEgam/xMSMd3qUuTlS75W7cy3eW1VlB+fsyPUhUuN3oj8CHvoyR0H7oziYU403aGnX0oBkedkyud3WAlcYsEVF5qTbHThu2IFMpCeXrcihZ4Q+3DFMm86qiAGewoFzcufmEHwMCRHkROJFgh+lNkdMrW5TkybUhwi7Kj+XFghW0emsqdI3frX7OfC09CVd6ZTHDrU+CTmcfElZPSJftgtyVj5gP1dWCICTLivgVsMGcpYJLcxYSq7TCFFmk3EBnIlKzT9Ka42Crk4pNLARZoZlR54yqM1XXWzQvY0ZZy3fdPhTbJZCA7NSahDhoqBr0ACnrev6K+LWov69en6kUh1cWjbq3MMXbBbYTMR9cNVstBoSlW5Oop4QcOluXi+NBLzS9TwBSg7rRt3iLzh9GeMNRjYvyLj8ScjIewobA08wfH8BR/WebGYH5lovDuKkrB93XCPe3Z7oip025xLYorilwXTYiyFL9MRHCFgAFK3lTXSlyxa78Qgwq3slw/rncRG9l7VqVHQ4qfHJBl5Be+OHtNhEgiu2vq7yYN9U/hUyZDFt0AU7cGcguhbD4XfSptFsuZd6SFYIFHy6zNnM+i4nuyCy/d9tYVkdE4R31fwjbniQCN5qcCq1N8xO1MpP0jvaBErZDmTOt+QNXFmoTSbiiRKG1dMWLqq+VfqT/O6wXQI3WGvlZGfNivz+t4J+kmOsjy1KGFXulmZo68v/iAv5KFozfgolXwxEruHoprw0AYgRh2AmdqCAy6Uj0JntGVxMRQLFUQgIFK3jYZ9wKb4HxNgSqCVDY4SEvT+iBtEHtJmJ2RwSNZFVKk1TuKqloEEyxLvACJg9nkQG0R1rC2VQX0Rr8f0saRMKRZPWx7BCGe5aFt/Zop2yctbZoAd8EqgpBMTsQH1c7i5S4XhxvDpHmCdgKbkfOkeRev9elCXel51k+u7YHi0jwfrKUs1OmSXM2GuLX4HHNhMAEV5ZBMiFSaXC9UQPVblcbLYCxygwZAvSKxpb84vHa0tXCs5pPNevSGUReaVD4nO3rSncBCauWeI4j09qpCLAHflGCbVNuFwcO4FxKZjscGp3CeOuZRtdxnZzQrUlpx9P8tBmTAlNHyiyTYzv8AS0AltNY83U39imFgTXiQ0BVIUmFWkYgprLeg+bMv4PihBK/onNbX+gZP6fPtExM21FEbcPN/QaPZxQr9QfUGZDUK0yrFwVUDba/8W1JrMfOXswuA3POUiPP/mEZbBgXA3bb4awAcV0Omlz3RnVWi8uUBamHEUo8RrjiEsAN0HIp+ZKFmHyw6nrc8+ZCPDbCkqZuQTJgIHIQ+7e6H1UiQTDRYhbkJ7tHiEbz7EkCwZjltv97OeECZuoG26hPLLueDvon+4g+uc3Yp3+ShlMtdOsxFSNrFG7pQCBQE/y2WO9r41+r0cEQojmuHhhzGl4og9+15UmhG+b6xLylmeW0LNlR9EsegM/EZf6aMml3rBVBCHIbXO4pxSdquCyHnAIlAnVqitk/UpkNVEMa0c4+xAWHg2ZjTgCwkQYU7KK8pj5sK/MjNUN+MxeVSDDYeHkOS9e+LqRNdav9dPza984k9b12zXBBxHZQ+wY56TP2H2lJ+b+Rg9VxRfxriGmYsQ2KI5HpFObKHz9aqoi/Zj4CA9dOFhFyhyqicwuXfKbBl98ECJH67qeJQ0u/kEzB5i25DpBip57uKFICMejClia82AzyKvDRHCXLTsAfKnf0CZ33DPAcTOGyLXw3MUQFvCsUE8JtdO0Yq+gR0HXYPPRLpZjk6aT+QUQeRY4LnFVtpq/++NHLlPwbBB/wMb7LxGl29DsCmCHhcn48KSO4z+01lcB3AdwHIi92iWxvKofbXy9thR055EEjPJCK9kMFpLymPC5RkwPpXfqzlF7I2RHf9bYW0T/+5+owVENCXhzEf5jxKrACnevJNQO5Y+SjdMtkxJcJYGtAUmaaOWfQ9lArpGJVVLzbDfMmiJxBSFoLBtpimwFi/9c7byXtEItO45YL2xcBsaua1TjWrc7LBtjvXRqOGa2RXiFNvPWrwQBaPQQ9mspnOq1pXpdLzVCdZ8QEXmIGtxhBAf9S3UE/ERum6ICnukyF7xZngCFC+zEb0sRiYjn3WxcCp7rWnH+o1RHt2dlrJs6fGXkWkOOJqcy5AcNNwgKCQ5oRsb69xdM7cQ1Ne0791lpYUUE8QFLTtumSGFfOtdWjXtihnSEXSzIR+c9/Adwy3KiXTWp539hEYf8XBamKmb6LW2Pps+6+HQA9LrtKqOSEpBUNkgw5ErmvA/T41hBp5tPFkQ+dN6HoYG9N2nllW8isxV5vT7r1ZAd5RZX2iFH3k+/Dt3FxNZ4N83ANU/rGbHhSvJ3ECDBdA9GjuhJ7M9ueqSdSrS/LR0w933sLAXDOBQBITLnyLK7NyPGY16SiHzv3bCCborSNse7seMWjARaXWYHxvmC7t+9fNdczk4d6xRQvsujs7+/4dlg8BS5pIaZBHUNhv5Qy/6ecGetKRtDdxG3XxwEV1P+4xUQfoAxg7TgcilL4BJWf8v9xA+7RFE/JkGukOAbCt+lj3QfXAtlAx5zPnV6MC+9DHayRzGopa1LgYoYro8qSEAD8k5RS2gZdWDmVUx80TPzmN6sMaz81y9LTp2dvoOLiY5gfVH6E+StPxX4WRH1F2F8X0hJcH6nxKkQoCXrBXWA6lHdAv5a+uCETlMW+MNWQETSBKdYt/SozroNc5ZKsPZxiss4nZ/31Fiofu2duoPEMEJK+NCGsyKn10YHQwzf9fNkkpm2noOCC94W7J7mDeW5JQx1Kdnujg4yPSQG+Uo4QclF/F0Zopr+9q4jFaUf1pJuT/TaqoBwiZNrw18GUjU/te5fNYQV0M8gX5HPNAmwTf2/LeaBxUVkK5ZnVLm9IH0NPXGZKvXTSBxYdSM/fgWffWhKpjeLn6tb6rQipurI3Mhj1KHOS7J/AU0Hgp4Ah/5iSAi4hWS+n4dSlwCYR4Mhzh18eJc+7G9871ukScNs78oq0XuWCMl/mhXnFzidh3itzx7/eQBD+9RF0PhjiQ5K3HLUiRuE+dtdx97XW8nYsWNXOnZ7H5BjqpwktCRaCuXjkNOQQ0PhVMFq/EccHgakNDClaGPFvQJOOlk5ADXiO8tVQRHGNXrB44oGvnUoUaDj9y7hsrUHsSFlX06GM9p/nsbfykkUFc7h2HoBR7dJgdiQYMLiF56b9usnOWkGEWfTCipYXC4Z40F+hR9oH7gym+teNRulla0JfupBwBR/JB1uai9IKmjrgYsN3JhN5TYvarnfsTFxuA4Po9F1LC6dOyyZ2wvN7LQrwVSrsjoo35cYKg6tLx+0l4P9aTqoj+QUgz3A4ttUcyCTvs4D702U5jbJx/tSsoSHuS3QGeyEoToFfYJXElZn0tWt1kMk42db9sFTWIXoUTbxKMmzWsHGBpPa5ANOjRNj3oypWGOJNXhWJz+rrDx3tNAcocs1doszJsDaHQGbeZOE0Ze/0HKUerw/TkF7V1YDHWyV7zEvO68Ftobiuy9TCaqn+BNtcEAfYkbJXALpgELwqmp9PELAKHXomUR+PUWJaSi11Fq/A/R7ZdFGjemm3FCE+Qq2tJClMidKpdtZMWCeOQgE2jsZGmKDfk9UQg7RxOPY6xZubnMLUDJ6bYWrXfcCm9HLymxpLAI0089jNq6pcb9bjHx2iO6uSJGw4ytqOsyyjZMe8tBFpbDDPUc13x7nQEoQ9mRg+bFN+Zcy5WU56+J6rsVU0vuZ07wzHWVHPdI1JglX4JAYdWUfSwlWh8TDm3xqO5ddFEoRbCSjRgNEsYcUCWjsrkh7Yv5szln0j1L7+94wwcqfNiprgeZ/CJwahHIVNP2NWyO/qkEA5o75NJWt79TDmgeYPrjZYASmmmRxkylIzQfFBd01zlsOsjDD93bA/SE2i4JwzJV+RIdlNszXP4xCB/azF+p32hAG0ILoZDXvA7pU1NB+nz9/Yi843UAY6sXNvp9bAPRumyJthTJP3L53G2IDTnxLyZQ/MOz3AtrZjXaHNJmEKXQ9b/gdMlJP3sGJDloiboRPIf9QbTeYgBk9QlAGcNnBEpn964Xwq/BTGG74kvQX9xoWKUGxQObg+X3d7BRvC+ussH0Ssw50p9CM5N+kw5h9hdmmfvA9xUyFZ3rO+RWXBLJPmiT6ry2mcpDSeMQAZ/V5jivCT6ojqVLf59rI5XeRGc29s1604pTekdvnqdJ/nBVe0aRpNCsX0IH7Q8/rmGGP16X5GZcNzFBpnwEosYXO1QZQY7jJLOu+gWwOzZPJzDemSYbhoPJnGedZaGdvBXGaFW6imQd0EfGGPT6Qsc2KFZmw5d8udPyXIilM0MICtpn1ZlgrynwcNf6yI1iXo1Hpj9yhj3GzY+e7Tg8MyqpoVGQ4J88aMh9WzVEXc4CQ8lYQz6lxz+/bjPBomLPQdj904Lj0xQF9nsigrUKuxs/aFGDZKakzgKS9twydCezd/oCpyms5Sff1Jbvlj3mmxDp6xDhEK0OBlChknK0IQJ3by1U1O9q6TDFcxVXH8SIEPIfEMKHhgnkWzCdRSvM+496nZ7NHNn+jvS2nduFeTPi8Sb+bAt3FoOmtwy6UKRgaki+nRvugeMFc2yJYzN6fMDwB0q1nBfX/CjzHLAjfRMZ9bOO+vcH2Vxz6cTMA4LeUga+kWHn4PHEZingtr0yh93eh1/VbVymOqquhInRIeZeT9OD0U+FHEsmmsK6Qr54pYfWDcbDYg/2IP1pjKNytSAiL2AZqdYE87QY3bg1CT+SJo6GJ6GmTNeld3DJT29LKORMHZ1DQmde1LELIhSfAcHbaTHDD34NgfmbHyQIPoQcbO38EUlXmOLCd/kz4WlsG7LONy27CLaXVN8A79zhYDuhISpOK32FbABBgfpEyBhdnW/VFBRDGwhX3NicaPvGijd0byUoH7FHnHmNECx0sW5Z5LXrsihlbnkWQZhBUvJRzC1QYBn25PXv2jDu/A0jpEkRL4qQ0YUB1ET7+u/3Znj26AZTIZNUd3L8bJU/cwIkahOkWjbh/jaolQz4vgVs2vV5PRtO2j86+Y38MTlnqzLkiaCeZSue6vctygWS7ymjzOzvsIRtXVsL6pAnfzJ7wF+wtq7H1S36svrok7LAQbGZM9l8Zj0mYBp5rdqTb1WTLMUJV21cW+QMCpd34mbre9AAXphrVEOLU1p53kAC1VmAZh3C6bir0Syk1soQoMbRj/8xM+XlWEQ2u1UBAYly4bIav9x8Wb7GCA3ezma2UTAyqnYKuUsKRPmMHoiNkJKny4d1CkqkUmLfidi1z1a6oYNmdiiTtBiERTeY8YfiugI/+e2Ro89yqYsGNhQEnbtgxP/e+ohVVQ4xjjK38hjKj+h5yHD8uMMcfuxxtkOVmNRs38pj/YeQV2uDkN+7NXm1zUFeakXnFY6D6HitFl22UnpTAyKR3MvkcnLl++fIcMdDnu+za0sJTpCHRao0720Q4k+EEYdjIb1J0oQGQCMC5TzB9xwwKPuqx0Uhzu+NgxFcDBZYeYAY/JLEcQugBS3lxY9irOp/I+eqavE7E7RztFksqBiXWptjbbF0qS5tr5lf9J/9TOGOqonRgRJxwNhVhUfvuRTPkAJA8EdWV5+zjt3oZafxV9OXVHDu/uomHJCln4xAqhXLGQxccrJnSRmKvp1xkAJ5V6HRzsJh6MR6dRe+758+9thSYiKAVAs2PLrUhcod7OvIlxyZYHH5lYFf4DZAKbsSnmJSmeRonFHNpcZp2XI6Ww6IYLt9lLpsssjJ0+hreAjHoPwY4u2VuOhE1W9xhHRZUaJ8YVrJsW5Q+thfIJE6z6YFJSDnlH59huI6fDpYyGSwh9YdufTsRBoBLhO19zcrOFfw8mA46RjUxHjjsfKqQX5jPVrX0g7FQbzpoBY+/gMTYVLe3XBYTJjy3+4Qo8kuMrFiQloo38u5naeLf5s5kpqKZclpYddMJQHuju5sSk/dy9fHnSCc6amJEDoM1wHJnwvfh0ZINZ9nLZPOXt1aDrK6SIkdAIWzGyCuXMqpjPmbWY7fs3ol7TaoE8xvfrtfMyTFO4ltPM7VkLI0IDCZyPS+ceqWPxSWmji+DowXwlIy/swZUYIhZQwqki2FJrbVvGkF0eCMX2h+DyK6iCvNHV4F33fEtdR00GAJOboZlO7SUxgm2l1xjOn845BGzTgcOP8n/qo+JzWnPcm+AzE9jXFg3GTlKTYTvhANW7bcc5ziTAtKEPzN9yp1mt63oR/XZ0WVt4EjO8WuOKEZCFp9LdK6ddgvlhmAPv86+N0ijdr1JcVew+fixJUrt6lYjSlVABRlgL4Mduutgv7DOqND3yGNg1gJtGnwjiQIy2m/tJ9aUNagm5yk7ocHL16PrAwqyuSShI7SIBFh6B0Nea4lj+MuPlYUDgud2dZH3MUA2dQK4eKZesdfKh+wCq5tLaGth7Gjdbh0klqMi2Kv8rfGhrCbiagqWlL/u6dtJAehSREeho74+sDsKJtcVFJ+e1uHKKpRHiUJCAiO7kcDIw2EmJUKvvWKyDmJxt5l4mj4wqGkJvpMxw95OYH3S1cZPDKqE1bjFiPqqiWgBlhaNPxJvp/g2aBG1JhFTunHQzvAp7BRpTNh0j/AlVmRcR7ByVc7z9kmUJRYndQEitPDFAVsYKLfYdGxCSyY0TfUKY/0wgqKfrZgSbjGM0d3VapkNhdcO2H7EdqDT+n1WM/2/4JZjDSi8ZxgkqQU9BEm2QWQqwW/Pa2YkEmmxyJeBkSjS9LHnGY5K/PN3zDzsSCU+LFzkCnwcXMfTFsUav67miDMJ8J+PNA7KN14+bPlip/kIhsyYCXTukEHWV7Y5Zt8KwjZrWiho9xB5K2NS7upVYv4fF9hx5E/C/lo2t4y3qvofp/f6QFZiGRuCb/A1HAiCk0UX1Pi/TEgAyPWjQo69RrormgnCQw82e5bz1rji6BHQ/fCNfmru32wu5OeRcZ/+GdnHiwWbfs+W3BHz9VYQWPJXIDFKaMRcfVf3jwTJ/PUSwgnDyQ2XCxjTo/bf5AONi+RtKnsaCD7+5AaEg0vhaCTCHlhWUSKfkjWqBaUOwsPg42EylRVcIJaTOhmoFITDKwCOW2pv/Gmcra4Ja1AoUqFIf/jRnjDeQ/XCTrwW90ETq2gZDPLRPuOQWUbi4VSttHOJ7k0pm9s4ufw+atQxQFBdb6Y+e9R+jezdh++usab7X8GgY1YzthKalX6WfQ7L04/w89TTDkmhaQyuVImM2HDnQDCfTtfL/0WwOLfNXXLtg66VfOcP8y9WluNaO8lLFZh3bACH1JzhQ9JEJo3LxkuZL8HX3lWtqx2zGBsFg6f9Vg8cAeFYRqf5rQ3NOPhi4bVrt/bJl9ijgRt1eIClR3ASA+eDq4cwpHmwvnWZJ5fabSaxQjrQ1cdcM1awPJZFgGnCfvJGstgc/T7+5MEFv9hYe9k93hSBOQqaMLcb9n/KlodS0wQaEaW4D+yshiSLPtjj22OnAqB1bSxTpaVf++GXSCow761VS6yEadyve7FbmXRTeMz2BJg9s65brDBqmI57L3ZsAkDJAc+q12ITkGC2LLT463QdbXW+Uv3wFte6lTo9TTH4f7+pZ3fZfUzDQC9QAEJrwX/Ps3L/Jk8lcU54QdJmAkT2Kx6kWVRC/3YLAfj9LBUiJjWtjt8w+Mqe0STFKvI3ajSvUYKnfs//mfyfH7g9m92GfClmeU3fejzlrzBuEgfVpjE+krvABL4OEDH/WDSFXC8b9PL8sdV9UCqvLLVNPtwsDcRkjXevIHAgYENSeBU/o0EVcL3CxMh1m3Wb6BQKdIFGNV4piG9DEi5Hx9Lo6bNCdQgDEkamTfHOVKozhkczeBknGBpesIOotNdidfD+yuX/PFbTAjsuSYBX6piNHul3U/MZBmCumZ0BHJLMPXwzyIyUAev3HsYqxvHzulXryIPG7alCASWQcZLaoZ8/AubKzgCUQuzlv4LIjnuL4mtafIZnpKkFhUjZkBYPdLL8B4o55+QbPvdD8MTjHc7rTfBWBPFGZhrJPun4UJ92FR3nfaWUJDlBqP3aGY9t57Dh3KMy/qy0Gt7ZZUdYCxWH+f9RExT/xWTmKXWXrwIvEm9uH3ZkAk3uvGXUIqfBywqIXo6TQtz7drYNz4p7TVeMikQGFyDVVQp2VdM4u1/we8MxZpToSyknusd/gg6niA6bASEXWtazMnIYychgIEQtnJzmBmwqvlP3umV7RiO+vKIJ+LQTI18zkPxLg/KQzIuZPaGvgDC5pFG/OPJije5PPO6eSM992R0DIfBAEreRpRBrR0MCVwK1hh0L8lLJiDlHFGvH8AXVCJDJ4ZwnUDc8aekUYMQdk1i+ikahgyOBngubolHyIrkwN7IiVQOMignXXmtcl+nnyMXx3A1bQ2kToKLIxT/2zvKyKWNAUxXYHjYrCb83PPS0Ba1X1yaTykAAqricv/KIeXVg59UqVkM8HdEf8WgvpuB0E0YwzuUMJ3Lq429fSyeo1kU2hSVPHSfd6WYTZO+drDNsn9FaN4qohO8vdEO7SyEouAc/7M582W5xXRLntlwbvtIuqRTPRUWJEkxakr/a04vodDjxL1fV3Kd+h2uKCe02aSP4yOh+zpH75PDxANfmDCYVX4cKy6sJ1eRBcrdRu1YhJPXFJ6lqaKt1PbsHjuT0WYiNR/CqSv2WDuE0BLxkHuWxn+efxb8MUJdwYF3XCdN1XjJkE5omQr/KK+fkEfvTmOX81XS2yXd5YsXBuILPqZUOBZvGbbOOcQfZW0qeuufoiQwcAlAJcnufwMN665F1nOy73lT+h4DXqXO/7bWPLjRtLUHkaUFf/SfJOsx+Z69uN624uW+BULxj0l5x0RjzjCrU8vmkQgBPqYNCk/gfNZA6eneXvbuSwSUkh6EmWVXVjj8tByqKd7kOf6K6Z12SYYMxTkrZhlEwNLtFxa4oBcCK1SiuKMCZoub6xWs0YNtH+Wf1akMI2Dd3TI1ONSJpM45lF9P0F/MGuPvc/UHZs2EFAxzkoFSoDHhbwp0brndND+2Ml49X2Y2tLTTwV+85NFpa3SnPl9DnXfbmqlL+YaQNfWeHywnbPnclNHShDe0L16QYI+DzzCyT/CJce364KsSeq0IaGwa8TR3TfaAFKn8Krscsm7Og5XlwO9VO2Y30QB7KHmlIyGfwrefw1QKEAkxUIXMO7VKPZSQB+AfiU11RY7OX7MNDtYllqAhiD3Swy32XiVPgMOAmBEJvObt2sLm7KRrO2MnLxxllcGu/wxXI2NwF/upbbQBJKq6b/SSAHMtkstU+YScOGEnBJMPqki9pqCy7jvFh5GCiiZj4ZFK0d9n4N1jcCmPhX92YqImTN77GmCqsXbpM2PoEkzgWQWJkqT02UMH3m+e2yXoNHiuiSK2G3oZmDYqfFDZEvJPMTl+XgkJZ4gTomNoDz17mDepY0B31wzYkOyAmzpIW6HKjMBuSU0Er6Ki9pdn2KzyB8E29EkTBdjk0RV5Zrv2jCLdRHB9lMh9Gb84N9IN0sYwr0a5JYrQsviIyHdgTjyWo94HzUNlyVeyiegAp/RKLoPwJ372PJuF4JTYYRyGq2zuGFOKelRa87+ts9w1PIne67+Hj+6sfIU+q4Z8fK1bgDSRDtm4ekl6KfgvPVXWBh17vwrrh9m053MSxboKmkPN0a2T33BNpti9smxVJQ0GlS/+guNecYX9i1belgTTb/R+28M0zI0yHMSj0vpaaySoDyqKgMWhQoNDctLydv2X1EhYmY8jtDMu/+/f6/OznmGCuHfuGFTcrVGEkCA33bR0bl10LOAmfXLaXnea7aRYmBCzLFZeGBk0/WCQDW8wm9aalqR0CxbW6pq7iGIMc6KAvZZgu8aJLz6vm2lbcwQtb70v3fLB+QNPmv8l/uIPK4qJy0NhDudsF72S85A4qHL5C7Eq2vYtpV/jbIU3VFRUvpQpBa9JpXv7obxsTZdR2GmepmwrbuHiFA66JxX19T3/ubL9t9EbD0AqhKKzfqUupbR+YBLw6CuLqHJSqB/JUjlIozla6WM2rYMxZRVx3SyE9OspxoLHQ6wKG9GNTsALo5n5pTByJCbLLJNDV9tVFFFed3F73JpFOFrN5Hf4OznN1EXLPigbWjXtQGE1dfRiCRedVaz2DDxc0Hh/KyDrUTtlxKFMRAC7+TvGmg0RbazKyraiFAvRjF3cw/V1DRoaaUXFPnbSuGj2YJSgiQNLyVMeQQQ+0BoB/ImsDav1UG5WW8cS+XKUdlHrZv4WaYZo8UDTSW0iQ38lchY5fJAzIZtY+K3fVwpvgUtrS7u61mVuSQVo2E1F7j7tgm19G3A4AuxopC8UyJLZE74rZE719Aq5ElYjX+XIEDqOzBxiTdPNJrm6Xgt4ehwytgmPoHhkoF6aEMp9wWCf0DudJ89xERz8BZ8ljCTx0vp6ZZHyA6mlVWvtcdZpuKSqUVKPi9/DIlB6EZqgra9MbJhRfYJ9Wer4f6w2NnLNr3AkPUIHGY0lVLRAByfA0aR3HKm8VVUOwOJ6f8ysWDVLDDQmpiKFswb5W+MnjCKpPFZQn3YAuatScNZnrWFvlf1xLIJ0HyKwN8JUOnYbZuWt5h7HJiD46mWqoTy59RCn4usXnY/6KiIOL6/aXb0I4HNT71FC2/OmNnvH6QpEBhHtUYauwd83zzzIKPE7rsAig1UdUsxOi+td4FDuHU3Ju0xSDXRWDGaG0qiLO7hQlPaycpnqXxo9OJIToLaCANztQr/IlpJvE8WMbZX6t92OZzAlqPkmyBHpqaapjpptIF8l+UQITTgHkfxVoWKGJ6L2K00FfyLvV9FzDEf2U+aTGXpsqc2X1ES35Nr0QiinHoLNWmF+kQYMZboRyaqXti/xjEUamG/Rw9BFeUK2DcAe17pvPbU7cAugL+6A3iXvWcEPwdkhTj0A6Giob5bEA+7Bzhdu5F5gy4JXOZfQzDXllGXPn286s5fkONk8T91OVyouEm0C5etuKu9U1ZiuiIUg6wdPfBHb02a7Xl8Gu8yeHQT7WG/k+O4EOlud6Jeyb5x5fFXo0n6FbYthUsk9ZpxEx07zBIWXyba7+x7zRzwm8hCFoZcPiRKPXTrAI+1i3dBhr3SMMGagctYQ16KXOV9BJIUn68mPSMg8uBGJcSDOu+UTlKfnFIfOEkXUatq0gpjhHnNcOcQ/c8zYnY7bSa3/47bNyBB+1Pr3rhAD1RPR41WHuhZmny2XcNQ32SFmIdzk4xt/BT1AcGvAsOEE0v+tlZR04HaWq0iSdFoYWvN7PBpzsIoFK7le6OSnvnfZ9nEYx4f4DQh/GxuuX4+qo4L4X3zAk1bI83u81FmKV7+cTYyRf2pu2S2OuIiGbGdSqDfcZh7jUz4dgGmDgeRyyv5tN652vNe3+8aufhsnoOYOqLpQNesRBqE5ygt8qwx2s/KjYYYBV/4TjoZTN4LCqlbhL9w91FTEScvQR8fU1LCDbJO07E7X7jkGQkYYmGNTQc6U7ZBlLGtfcQviZU7uGxeEGDwnEsOlZ+zA6vALYUqnMN643kagsl8Pf8lpshNUkbl/UAeiYoby+vvfN8cMkNGIvXK1PO4NyvgtOO2r0SS186O1ceUw7QGCbxkCQb0Rid8duLkHL01y1KS1760SN0sXBBZ4N/kZpPQQ5V54IE9H5B3cwg0xSRr8bbVupBmXNbNbESgoq1vvDyYXvaX0x67BwvpfZhW8lTXiZSRIMvLgMUv+NdYrTHaUphaO4AKqSy3c3rZhpXY0HqYQrIgUeVWIEhy3f+XhXRENSHeA+kIjIvZGtNQywkb8wAAR85iFacjeCz8jvvfknnYnYYNOrpKRQVwbrt+6Xn+W4+5ifVMr/U0vcSfLzEupuJDgo8U3ZWR77bJ4GmG5LaLEISx1pXujVagKSQlq9WOkaLa7/QPL6pIWdANnkP1Zw2m3fmT1bQ31dA5M9xz+6/o5kYj8O5J9cy0HrThw5GxPSDCGDyby8rhLuRCoWoa7gWtKRrTANnS5xJJYtSpkfTxx7dD9goqfZTcX7poAMpkhVz/ymai1tz1RiO8hYsrKR8VzQB5AQoT0QUoU/WWw8BrxV2fyS67+G1VxlthEhq9Oqap9+jUrsf9wTDOoa0Drzbw9y53+DypG8VfsP2shOtGxy6RpwLH1O4On0iXUNbXijBMJzKpretkA88McSv0lTnvabckWrS0EwI7dFInTluZI/aTI2LKv3Zo8rZKv80ca4JDicZfXRijmaOLXLs68L3sEfwECq0Vg1AiuBel3fhvlj8BkTHRmJOiC7LPs+Y7n/H9WsTGDp6A/HTDfR1vl3XXkNvQzEydl6sxUh47A1c38KJjapL3R2MaCqcOylq+zmdUzN96q8bEmjPgwDjUiOh9F5XSsHg9RN0TuI2tLzF73IV1BXaI2ChwNPq3LqGWjw00JQer0Gj9TxkDgffQi4T9dFN9k2s+KtCG2+exWie31hzYAb4nBciVoTmVz8CbKO/x7Wvjb8DPHLUVWyhupsotR10FX5/WjSaUiv0qpIEW2NF5mGBzv9iG6Pns1pC3v+p0NwT+N7GVnVIR0anBZ8wo0aWafkoBwAddZU9TMoBMdKU7YSXVLJeXUY+JFnBGmFpqQn4S9/zTEoXnJa4W9xTo8UOSjDtCo9wToDNAz/KkePYDA8YMOzZHNz2gob2vSYCT3Vsh3Kf5JNAXHjZTLOhPknzx9QT3iW5xaxAeNz8mxnVPAQvFXAMpENrN5ufe2YDw6CI2n2+8VAfJaoQg+I5ScaKjKu2+l/9mwRaeyigEJlunxH35I4d30GEji4lmnIbZPOJ1QKEA7NiZ8E8rmWFOP07TWziPegsO2bG+pTptns9CyprCoxcxjGlABjfb/srm2a1xBHFcLoZKL+NdVGYcsEq8z2nZ3Sy3naIPZvwQSpDXtkT8azRU5iAdpueSf8toiHynQcmx9Hkww2E+q4IxolchZnriwQxV3SXGwy91NFOjtfkCQ1oFfkmrJm+HbvcxqoRvcYHvkM2OPVeEGRd/uFS8ZgVqUAQmyeY425n0Dgm8f/jVkF7iZKYTmzfIf1OVew/tnHREb0ds7vOLy5qxdSH2DvBIgGNoJUHdWZQcavs4iGv12fxh+C4PXUNZytmY9jcOKkSmTNpkzFNSeJR20qrmx3ZMEYGZAkiccJanTaVuWevVk6Sgee2X9BYrWeNy1gk3AO1yTJ+kVRLKgk37JFxsY/tSr3HL5I30n0WeEaUfBAgs1WAhMN2kM88Lx94oSZb11PS31B35ONGvzOpM1jdj7MoOOBkNha3FXWZbmCKFW74UFAMs18DSJ1m0zmzzjJ+OBMLd4MkRNUngJX0FDnrLa6H3HeTFU5Lz6rrdX74D6eflBdgb2koQwgpROQ9t67xAIru3w5TdkQyUyXM9PyYzyHyz2kCSa+u2zN7IIlpLxsfyRJUzh4/9fAnIcJmwWVX1mSGArUTWjtnhN4eEc/26xJBUPhg7e4T1SDxScVCsqHXE0CTM3a3VZtMfHXgp794/G3MvGJQzUcFJOxo5n23MYeqKC0ac6kS2sioPYnqRG1ebDpDZ76TbWXejkJcpce3VwEYyJrnFU4/JDnLGINauJ92YZXaYN1Z4j/F51cR44DUz1fLlXot6L4EUiCBUAZLD67o0oOUWJcXnfrX8OnOveUMQwfGPKIrIWHzrj21ZBA3KTck0jXvSCWBxjVh/UpTo27kY4R2CFy1S7MF3LVlgGNQqh6KItB3neMmGyyFDO/xFK4Y7fIG70IPRD9Y/24MaSSkLbzRwWzyTYVatOhyZhCi+pSl7DjtgICjKR/V9SZbdQz1b59H8LfHkxjyL7vbdh/pTvO0DRlBRing2a8g26PfH9cCTOeNCxIaWajPbBu+ybpn/kpqPlGqD/oSm8f9fkwZ9S/mluIwc5sXt2Dbv10jIULb8LrOKzEgJzEMpMY+Uv2DAlbBHDDJx1UKNCJ8BmI4uMpvDpWKZRurbrI+DImUGe5vTOgOCJnml2SqsQ4Ye0xGA5grY+buQ2rUAyrDXA14CzGlh8oXjY81W/YLvKmNg1Udvqfe/zkunXVcL3q/wn3EHllG+W7kWqOfQGJOtQ522fGLFnFsphxZncLDM5WqfkjqrGfo0BhllRh2d9kYopS2r60wtpOCRg7ByY7yxBPN0pqbHHZ5MzQmkNnsO1FbCSidoFUSUJzfItcPCQdJc3qciasokjv/jN1AY2d5CXlGmuEltaJbYoKOuOXRcpafo6ppM0vyzMLweZTarShHzRonETOfD5YAdEbhgY666wTbPaxaE3jcJKNaG2lHqp1HE8VYZkIbIn7v/8jhxCfB1x9j8zTInN6raANjSbNgtsaxM6vsQ03syVoGszYw+8x/elBGSNH8zUb6lXce4F1/8ErIQQAcfU3pYfYdM7o6IxCCVmygqUw4jvWGyR3FnYwpjHVs+UYdAnCEP6yUZ1poKsNCX3LpQsEXjcAiqT1aX0YbsoZIy5q6CbUiaroVTkHivJwyKbI+5B6fvR890Z5IfGHgkJE4xd+Q7VE4U7DK1Gmh5m1eSptqp1B2BKcVMMH3NKZ6Na+ylFVTGmzxt089I9rAOEnmVo3RQ1ITLusFvCo2nMMMd0+Xx7kNaD/UIQEtpURTnyLU2A1OsP4XWJ7A1PxU0F2PkImergEfu7Xcbgg1/9iBgwjG5UGU/NtzOMquySGmjMWNiEVCW51iln8YM/gbrAPf17TVKiwnfAVdGN/SV/R1YZBYUklRHYdx9177qXe4v0Clth2Vv3lY2KauwWtUl+aw5uMYNKHozXPY8S56YNEt6I1pbVT5tlKD3iqAYpNdImG7NE2NtkDeV9zrQ5J18UaOWv9A2jILxSsVont/IcaLIyunwk9ljwjnMeZOsVxyyGhmpOUH065ZKM1H3BTKjHgmlFMDarRugl3ZPgyfrlhegd0gZJEufctzMEGwTRVNSwdg8wc2gNiKHpyJPA+J4KsAlX2MBaAFixvZ5tGLorLhS3/W64J/pigYsMJjxqdpEZZTvMv62zCg/v6KxeqhYB2W3Xzy97eh1tHu7FpRLWWKQmcFmN3kOJUZg1dHJt/Q4RmcF7E+ELpeAVtZX+kdDZlMq8HPvt+t0ux8qum301WvYJGVpTha/3dq7vQnkePV6Xu6rk00KSYCKt03oGBDHlmHF8fg9dgitzSAaghWjUX2dMPOsH9eoqkNaoNCwsu9GEKtf+BhxKk+cimY1xi5BrpkZ0xBeHDm154WdWeXrn4qiUQRJ6zW4cYryd1aRFeW/0HVNDXPucOLx19qiwNWCBDiNaoOXigSqT5NZ29F8PLrltm6rblOaHsRT5+yLiTmyjgTXfd0LfNhXk8NJpmbWCUNTzU8Iwgt5Scba8DR3SWC2w3pzqHRhTTzmnoDmIxhpMu8xWP8s1LpTNoQGG/UowUY44WOzqdMVLGUxEAvc93ZYQWJmkZpipxyWtD3FV8u05PQS2ygbV2hHCEVBGOFZJJYZWrVYSDn0CizUb2RnWm5XYztRwPHvTSD1nKNCeaIs5ounLp5KA1dNH7hRH9CaXtG8N58lLzo+jBXONDgx3uqyqihXRx4RD9pOsy6jE6xur+lBZVJpfbW7U72M+wDP0EIZLmSFLHMLqSkhmPKaHcsuBdSLeXX7ULmffQ0PGfjg7otpce9m7bh5mA4LZmWxN2/Y6xmAnzqgPWcssix7aaRKRazf0gw0oHaV5UgBnPvMt68McLbQJfwWwaYki9cIKhfkRWrNO3jdMiIShJeqbwTU+Gs13xz8P+W7xfaWGfO/Nvz+2uO4P8rAOuOV/Ta2WIsvy9S6AkIKpZjq1QYyp8ExDufHWuDNMcfBKjJev/F7n9THKwgFqq+RIMVBOBP3hrAd4dOoXweUGfopDZrN/2vbRIy41Ob/32j43l7Rq8VpTfRRgsIB4/OdFmuXHe334h5yRHHKchZxNq+vOKf5l2HoFpd47VBPCeKxO1C0j4bj/N+dlm/7KTmr0TK5q9q+mai/RyVU0JxZrHeG1tlE0RUYSLnYl3bKggPgse4oUAzNwpNISS8XCDsKsSPiI7/2h+kFwevdq0DNAmhT99mynNWLp/JSM4KAyxsp1gyIcE3N/tcnCfOWo00r8SQdK7Y2I+PH2DpJyJGNhYBZhbGEBiTit8nxn0j21EbQ16qy5PYrTh4TLNqlIpCK/klK7wy7jloKKbOOe5/LAdJovl/zBFADxRExoesKxFnzdFnzAYLndapX7dxLg4UxCGX2qeORoLDTVL20fH07BvDff3i8/Aq8vpcmJCrVvjDRMq+D1PCv2cgRgC8y/BpWyKv2G/Yy2IKy7NKVXu1+eTwW0VQsBho/RVWs4p0Jcj/HBEmUsjFYWQaAm4mcUSxDu3If/KCUHTdMwV3gDWBLHtX6DUjH9lfVEzcqqQQgVEF+gIiNgcS5FY60FshZSMzPOc17SAl79mgi5BAk70ztVrhF0V/BR8VKoUpeNUgiG0g57ctAfObxQGVpacRiCdMXKLZDS1cyQiH+enUx2aNXxzSZ7F5xt31CbroUkKlzbVVdyw80vxaqyB/CvodqVjTR13mVXhx49n3bZ9gW+bHSehUABDWL1Cd0CoPqt/favVEvnU8K81TybqSd4T6GZREgmhYD2TZZS/pXNA+K8jfR1qk5GIBA3itkKl5rZdoT/TIpeQtFd9uH5LbOpgEzBGe7P986i/yqIYfdryohGELSd87QtT36yDTqllD+GWJ+kAsKpohAz4w2TD5bcRskakKZoVgNo2q1ft0EPXZR6EbWEFF0w36J94s99w7gH84rssFJvKYx0oZM6JrPdrlcqg70Zh1RgCvQfATkERMdobd9hjpAP2M/6m5L7vWkFeVVpG8qX5wUUWfPchI8nOjAd0JW5ytLT1wLpAsGsMELHeuWSb9Q7/izNqXoAqkhvXcJaY0bHlPTEQmRi45NJXCcAhD8GYFrhQ2gF0geZflwcf2VHOsgU1JlEQy7aXnt5Iny2XlSM9MuyHODutAF25eVjSKbLpekZBMDNDGU4XPuCpi0kGx9MUrnPv9SBOjP1q31su3mvH2sWD4mV0hW0BLXJkcOHndtYg0zmMrhwl6w6oAUT6oxGTGaTz1yzYVsaPYyGJuNchrApfZFXfuKbDtWGXULqXgpW1A/EBRsBzDs1TxF62dz9v6Cc1ufv5ZG6bFV/Rg4HivN+wwmNu/FZoweu51mhauqd0UK+CM5rc3NX0IdLwQ/EhSXmkMogyfH3YQIZFxBENsS9sS0BquJXINrmbg+mcMhA/AhIZkhp9O66/lJyE/gVKY1/1hJj22DFQ6r/M6gKvb7zIgjQaQqCFiU5fbkcrSqcxVLJLqWkq4g8Q0rYf0LnLM2ZnwROe6MmftAVZAt9Xg/3hGeznl17uFEtDHDtPTDm5IIoAUWdomg6hFCvb2XkBrGUfLYrlVRMBfEdAO80OOX+qUh5goi4vjChnQjupZ7lwtHj1xlVxQj81gLQuITMVkJ0X2N/rfGKu0TMFN+STGgCiQyLzDnOjsT0ers4SB5WhYLWppXUt9KvtSf+ej2X4vLFhJXHyWBkBGPLDNE2DQ2f+22CCyZTkR27AMIa2/XlxznYLDZUhtqzb73TgiVA+EJGZGBg2ouV2c8+8pMIzhoSp5YchRhR5MKg3lEjUqMvjsuJDpbpOYV6hD3SoufApMO0pHvcdRnFRGImWMtL8nDsgJDniHrmJBgK4EYTuA50CQbkQL1uVmH+hVEqhPGQlBY0VXSPqdtJkaorAwLSxuw2bkm5bJ3+yayEtZbyEHCD5dD6RhbjAw5avnjRh5yTmNRGQ3+jjRghrKpXf+iuramsqdGkDmWUNhCiEJwzFSd3pPhPY6wesU4BaK6wRk7gbbM131Eokf25CD0h4bLglBHUkjvpWwWUqIlWGY3iS+CpqIHm3ZxXX4N791L/Ng4YYfdpMEWRMbQ/2SRXsDQzXplkaciHLNZMerkRD3jM1s9lV9uyfECgQbiNagNDw/lgjIMjFhg/IeNEiINzCiCrCP2UDYJ/dc1YF+FrkBIwy/2cdn8Ihxo47gfYxxouGRGzWwU45+Vv1b5BhYnADIczohSZeo7DDs3BviBUwpXLVGdEvxWndKkXJdKMQ0JS576f1o7AT55rEFiMsJyUUSINZVGNM2cQ/yJ7weQSqiHVLrpbtRaLlW2BRG4LpdStpVjYfRgiPb1pAIn5XwCljbnMTBJ0CqFa51reuVY/6LmcMKNiHaMt+mFdfd7fJz+y0DX2p4uo7odMTsWUnoIHjiwLQqBIUQb+EPr3C71xsuFG7Io56ShAJc5/IYguegZmM5/I/UFbwhXZ9bffOhQsEgyeR8sKsmtxVyg6j7bevccFhRZETRV8nReFSl3qZySd7nCzw+Ko1LG1Q2cq+8q68CaAghhygoDp8OgzJxR6jmhHf0+yes5wtf7+YvelQmk40BSl1zbiAc2AjKnSlaxgqb+ad8qTOqyfM26T7pSvUMmM0aOrvTvQV/ynsmJLFYLAPnjBYLVSGXbP3IRmqwj7b6tpGvpDEvuVTZ+7gCZ5UBJq7SUJu0H2B5IRJeoi1UC2YsW9ucHdOj+IvT72PVi4eszOTcIr1EuDp0NIlrN5n3PxUwOTKfXO7KALsxjWz0jWLNFuU+c1T6Ffdqci+j3anUPwL21YeqMQHQMzcucLFxKtAEkBSXA9BvFqRVirYZD2/vAyZ6BzEaBZa9IHDwDhqbA6GeQCFwPdR0+soKawBJRkvy61T9sDW7hLj82JVdFMZEaUyuWuPU7/bMPUBS+6bXrBqrw/o2+Fhdu8BAYAYYTpyXLQzN+bIRWseI4kBKBadlbsTSKkjtnNlOG6pF5TC9NOyx7aekSoAHCnf1Ax1g+MBXAN9E/rDfbFVym8t82Gsn1iPJ2eA6Ep/Rk1mZsnH36In49b7Rrvp2b1Q9fKw3ZSeQ90NttuZn8BrJ7ukWGpcNNTQ+hSq9709Vb0wWu+m6hHF7tVybWvZoT+xVy+y9Yo6OCm5oNK1TcFJzRsm9jZmc7yqHAqWmHD9KBnQ2mVLQb7H5I8xa9PLIXtOdqtMntASY8HZWbT4lyij3Se3xJdUzgRfT2OQyilP1Tls6SrN7/z76VRXHqnHiSVJ175lxX1ZsS8H9+XPgZRFpXU9+RBy7dcYLi8aHvIog96SywvzAnIPxfmWjIpIVOEPPcuKVM96GvYtp2xkL2VpIiX+KY5aM6cEZI4WSIPM28lL1wiMGwHSj3t/zTHMEazXglIwGXN9dqfzg3auWeXGvvnYjqOjVd88z3eJvso1bQI8iAj+KqzhZmzjuDuShM4Y67FS7JNBKE6gu+vG6Sw/bzI2H6SU3tSZW+n6UHfGcA5LixIjwZrSi3wHDeLorSmQd2yFZFMIa1jTCG33IXNgyeIFxRbGw7/+EqS9lVE4QaFpWWZmp22c0UGBLR6gNvDkzZTbdqivv10afDfGefd2oETYNrNpzEhht4WDoKlD7yYf30PAzfLyDEb8cNtwRy8eMufCYkeaKtu9gXt5ucRw6oGas2Z1zHnxKPdzcfs5hvgKuyqm+2PcIIpPFemcjl73qnjuOofFQ1b6ltlnKtrRNGtbY6T95w7/J0l94SKv0hL54c6Pyz9eJ4evRAYX5uKgz+FM3l5EkE43QmZMYmJxykzE1cl9scaFIL8ze8BjcWiA0eXyoKxevHZ4io0fD9zKBoXbab8b5Z2LrX2uCmpwheM5JMTYAn+DRif9fOMEu0chhndDuYN02Ttk5uYzIXw6gBFDxtLQnt+DnxvL3gvzIrDjNhDeKqaw4DkQeehZk1mq3mr1Ax/jxOkUioG4lRjr3zpoKQ0mWQ/5Gb1X0smqc25ccuLlLTWITt/rbUerj6J86W87P+gd/PNLB9YBsLbadXZPVGzfS1opx3HTy6uQqnVsyj1EaLcjh6+WRM6b2Bo5sy4cxIu1gb/FBDn8J53PbxROJ78UecomZ9ZCF7o6ZhmyilzGZITaOJdQ1K4jUSL+Wdf17FvDtxDYA3K2RFHw47ZtoD6yM6AhBb0e3+QQH3pMZByHQzwEvqzZTtbyRg34Ff8sLmOy1BMchbfa1Rx/eeMkD0dFe7NsOMdWhaph8hXXrwMH2jIsn2DpA1L4MkVSRf21MJ6qcasGlPWBnR9cBNQ7q99ySyu/MsmNKIQtu272FuPLFh48ARoSxfOIPBuGh+C+f0PSwLL/jR11eFvlSaB5XcrBSVeYEPQyWx93ohOh6Xewv2S2nOQ8VPwADpGwD5+URh7/wPSNX3B5tAAJp87/IenAqLCRlOB/CI3EDGXEO4g1k8nQajQEblONJ6SonWc/owesV/EZp9E23KqxmYuuPFtSLqsDG+7kBTNQHhN3SZH6CdvfuumDhFtEvBPdX4RZ/TJejFN/x4u5exRfSgM61PecXcKwIz+vEVn5uh4G8HkG6Kpnm9IYvXBoP68FyewOSbchavPI0rwdNPVgQeT5x5pxs0MtpSdzLkXNX79IQe5PCaGTCwNghfNsGCIoLqNNMPNFcR2I2dy5oYK7x4/gEk5/w1ojVUKrC42YvtfPSvVawO+zMAXHzJn1G2x5jWIXhKadn3KYBAv+NQlgzSsLfS+EOS0AU/5uVyC+LR9G9AqT+SR/yJDEyWZUtnYSQ7nEfDfQ85lhHDktTx8jFYGixwAtTtINmgTLZSFqvw5BDqVg49aaliwLGxgQY+nheRZxOSO2Rvt2utKIfzOkJOrCho/gcQVNPc8r5lXABk7vaqtSOyXdE+Om3DhZRYRES1ifP0nFjQ62QzAPNpf6hm63Vy3hoTTRxRkpwXdDFeUaQLQUoaIDAzBcrIBmweXsw7chLXwjI85kVw25QRpeH+bJFFhuHAr84mGUAEE5fUhC5xh9BPwJ5Iskg2Cs/iS6BDVTdnNAltfjiLQSVBieP1j5+DEiH0xJcCZ8cZfbmG8b1DkUfSIfIJE2LnUPYjkbBmaluzOz49u7OM7TfWXv2RsUiQkCRycVLWZn9a0Y0P9ydE+CaKTLp+tvcnapUhXxsmaBEXjHIMZwdov1YqU7AIWoxQqXwco/isEYiwAtQL1BahKjK1bv0JZipNFxuKZnt8gGE8qPAAUExhZmOuymZvvyZm+JLWif28MVLneZm66OeX+kXwpLNyRpoYqQxe/AnCHPrwxXWuSpoc9tDEf00NeIcmXygpJMUnsxZHOw8XrtE73EpIEMCDsK5AfqUnuStYyF5dof+4pZofvrqftpScReiYve9V5QM5oWMyn90xZyRxobuiG2+nNQ/dUE5KqolYb5HbNV/+yPuomcJ9ysXWd5ArD55WIwt+JYthLq6fC57YovwB4Ts+TyPXDwiuX2/FgKzSQC8w8eXYpS7hjfSEOCvW36DRbqaXdnAHzCWmTvNZktUxafbArGTvrziUwP/n5LMPyiDHwj7LS1HUFvW0UoKSgkXtc5s/PCLwJ4PmFmtziyqHRfz/V+0V34GvqcRU/qLSURhhQa8iuPdRcRu7Lq9VPLuzUx+v2JU3MsjCAGDR/b6HYWpMMITg3+f00feWp+a/48sHVhOQ9eNXMF9hW5snUwwHYDUIPN+f5HC7AFZ4ow0U+v20OfgyHMj3hBUTV9YVKZHGhu+o+hZYYIsgkXEnB4WX7p8DeyIbg3MsGDrpB+VI1lM/1dTLJUxKRjXuKP+tgsaHBFmkQZYK/YjR3Chiyi1TUQ13ywGY1/E0vpEIaH+rr976wGa1EFUnaRleVxPyso+AikSzkYLsU3JfF688q4oUP4iDmk9SGXrYK6incprVO6SCRqzCppzZz/ol2FGf+9RklMBHXe92izOqBwAbD0WjkdN4uyc0665KZBCh7lobglHPmuIPHdptRr5EhI4K98t/VFWzBVStmzhIE80ekAH6JKLng74/hySWu8kW5EyhSLbGqL/P6IUGoJBCh1W8KMwXI8J22qBB+dzYUdEeHRr/xFM9EuKmfaGJ9mlNUGiAbBBtgEvnw+cGbgmPnJS5ezDSHjphdzUdInDAkw+UyvFhXnb9cbuwOuRa9lEq5ci47lN9OcZQkp2TMOJt9QTURzNsgtECF+v6LZFiE/LdBlLksuNXoJ2MQVYEXIoDmldKlXqj87SvhJ6fIDVVrmEHzrtZZDo2cSHKmW0Jw4N8n/hPV2EEoj5zk3lWS7Hm/Mb1DHS5yvRZmqJtcqlsETbnq6jCOJlvZZQqQhih+RPoeFwrI7umMtcLN3Ylaj1KGt1Or+b9PVheDcrKp8mg7nfDO2SYkEgzqsmzmo7hbkvdEUlkD++ZlGbxnklWNNfI/N8CK6+HwY0/F+zk5PHRu1HUjpcbQUYTUNVQ1vfmZ7D4bEM9z7y2OgBVArhkZCgT1Cm4ExLZOB5ny2Bm8tgpTxq4lO+s+e8AStYQlIZ2fc4K+jWfxeIlFliDDghD3zUEWReM+7HaXnGrdQtfPucPRNeqLTWQpGHoBpe7rtQ7mf1QIjb26ONbkhP/ch4deBU5Na7W33ROx2HIlk8JxDE1D1H4MvmcepIltRsVukKXwNhEHCZbgaIoDeZVgY/q/5Z3ojzY/TlA7fxJAiNbpvO2BmHWDuHFE3euFgIvwVcCawD6o1rkpaemMd2vqRX9l/08hMeXy3HDurPlP17lK/XThn1TLTRC1vKO2CpVY//FrpytBdN5jDcG8P6uIp2tHc/XWC9sbD01b5RGAm+lfiZE6wuq9vdIYI7Szt2t7IdlhpufvPU2f9ByIXLe9V+oHP71/qvXm5PRJg+CYSZR4CrPcj87hWrvJmg2fYqhx3++1xE7qY3mcUsZDSGDkEqs5NS+7wwUEwOwEda2Z1+yuXqT776C6NAwyfQKgqZ7S2mv6+H/uhpEkz8eV6/vHZSoXPKRvhpefxa+892gNeTA/ByjUkCac3620QSHCG4qdEN3CJsmZVExcGOZhht6oQF413RC3qoPc0ePMX4SDEKeQWgQeBndDMJOeUfLZs8XDVyWX0gbx6cpCGjt3j0r2ldXmEUPX0ehTp+LGe3S2qLZ9GuDokhUyxUYoh19qc0qC1f7LXm7qJ0XezIR6GiXPZ1Zq+3liPY9TaXPOFNq6m/JFxceetnbISwpEIthtyjmJabb71Ix7CpSCehq8SfhW+PJzFw63/COhZnQwubXnM57BnMUfN5vIHujbhuoNYwo0hFPPSUGi5e1WPkZiBCTLWgOSQK7ZC1ndC7wp3+PBSKTv+M/Yet6lStANJoiFihMjynCq2m6a4Xa0lyFfw0303ll4/nyY9nuOSjuYiimrvoAHyjwn8Y68TLqX9LbvkRRUx+X2vaSbPkaulX1gBH5WNNbG2/umVuEOiwXh528UIftEKzuaOz2C/tR3w8998J/E1auLjjj013Zhf+xdaOYZjExxXWkBPIbubtK+EwK1kvQXFrosegtxSvV9TR8mKqRXMFoc5gwU+8bzVBD2GifTWTvvvsEkNsWgAj+gDGWX9EZCAVg/pkyCUVwH4kAUr0smcn7fUxWgrVXxEGIBLH6rRZqQqJfKSyD1latq9IYLw0w6EkjvBlAO6lpsLyFhh8Mj9fg/zuuzlwOagvqkdJrS+5QiWT7TSimEdJQNRpKlYJlcdfu43P2GXQ9v5ar2avXd41+/lRnxtxL+xay4Tu8tLut53M1WCPWsKbD8FzsZX0RgFi1mL8R3UTVsbgk56fWwD8+7dEsRqMxeE/zykystE4lxvGawu+s+icuLVGaFN5itMTHLUCDjPShgDdaZKzb9yrsNgRG9qdOOBF2uAktKubTwyKeN2bcInp3BIm/qSZ7eb5EmiVzUWPetoITTT2om6EFVV3ticQZb3ttasdI+saVUgEb5OwRGt1MbfQ/0XlesaIBXOktMZVq0NApmPr6BY7zKpR9oZgCWR+wCL0hb8sRZMYgCh7h+/Xmd13WInVDSFbfUshmFuCPc+K2UazJW/VBxct0ckfTEoKB9D50Lpab+/MYxXTXzu2Eqq4XPNK8HruZxYX7JrlpolzslKwzWN4IJVZos1Womqam1OMiGg55lmHoG4lC+/t18uf8ulOm4wKPBbiWw/Kvyt+Ay9Ujh4PGwPZQfr+RFl8fLgdy3I6YbPCQ4xpENvPOH9szC+qIK7SQF2l4bo9sevBfsHJkvhxArqJwxvjRqCc0AOyTE9siyLSYo17LnV5gkZeNiyCUfEUBycSoopodPSTY2WA5b+c9GVPryUhfqcKETk/dHNYzwIwrdRnLvQaO7YvQw+Ug3B6o5CqPqGkuAPUodL/VtoUWYt96R7qU2+d/bJrRPXQwjZjn4v25uRcfAQTXnwgzH9xhdJ+qBvdioex1QedSgQaxIyCFX5V9BUDQ06bK+J2dywyA89tdmGUkd5/dhiLxIDENKsTvwf2usZwanJqh5LUkZF+7tFBicuzl3afzyfD3obu2g9puqFUXE77jzfeTkPOK7SFisFHtNfYiNHU4J84jeENVXYt5kzSjGJ9BODifS6KG1jgaa4K6OKC6MIZ5fJ+LhSlGAqaGGufUwBt4dDwUP77eaT+w8WSAGXzWA6dL1CuAD1Q9d+qfFgVzzHhStdFiy2LWwk/spsK1mlBRxwIdirb0nZn+gl6gV7kDEqpWRt8f9gfOKo3lpUkipUADDtuDbTmPOIZJu3qBnFOUQi4+LI5mKD6MUzgySWIwHl7x8T/EVYpmo/JFjVBWJE+Th0bd3qYhAvEYoxnFX2w2gWpYSj8NXucOL/s7X2AMAQ4Vw9oO6stNiIFceLB2zk3txs0JLECd4xamllKcN8LL7nUeNydJS1FRS+llZfnzsXGxRfDbu/QhElY5SZhUIvNdtI61dUYxN37UbcmjQPj0kJ1yEE+ng5qiRnMbcNZu0ERBEB1z6ZUELBkVdAIJmVHCq4YCruI83ac3Wjt13ibUMIBZtpcTaZonpW0qne1HEhSKulimlG81j/7TvB5n560ObwIdu4jKb2sTh4CKe2bdWKD6/ia83uIBlg4Tmg3ewB0U34/ooX2ZpcAGgt9cz4c9nvYdSqLe8urcVMTvKNul3E2QmaW/QAcyHEBIPnzG8muy59uQGtWF26rTuq+YzW5IFktSm9Qw5HyE6OzdWj/WsyG8b8esVNdIUkcRYQaZK/sDIXdOu1qTj03ssqC9/AKwBsr487OC0X12JJPfvLglP9ognHlmxKUDYtuKa9Luy7W0TIAHXqZEhrS45BezYV6bAVuusaHsZ8GrwIEOFrpxQ6RUio5Ctksv2CK9ceB599ta4spihTXeT2uVSq+jG1DSlLqTkkG9Yg0YZb2vDg4rtBvOVJUlvYHxNjf7w3Lsg8oZHeKBc2YzRPtMm71VrjADZf0dIRzPn7zufVPYYGcsVDeImYMnajR3yxR0sq1FmDT905RXOaAnLJD7G8Ou7x1LlJuJQBeJfyV8sy5kbIVjZ93Gt6hD9hMVm4KMZezLKmhBZSEsAWQx+3Ak5aHa4T3WJHFh/LtNafnNZf2yPEXNkrBobG+7I2TdHPO4JBLPH3XgZdhBX1ze3gzuAhAzSiQuzGGMS/finSevB5Ega8bl8NxsQlqxfEyQd3EcNZP326yAMQMZSp9V+N0DeREMVvs0Nex2mmOi2hhLPlmSgDwYPZFoKTMrx15IM6Dh1J8SRuOj5wLHXQ1aPsMHV4Do9MjcFvFAbp8DM6zfizi8lt92+eRcHrgqBps40owNgw9w+Qffp1KSm0or91ZGE1OnynDy/SMDhy6IRRsLNdvcDSCakJsCi/WvvOcoiE79TyBizeapexJy4o83q4kohEjiB7nmiu86wmKmZ9rAhqsM5t5PvXRVm3ibp4bo6rvpX8owQwJgI4GujuL0lhmUOufJA0LsSUiSyWfgB3ZGeddZqh8u95VjW/YiFPJUc8MMDjMK3v614NC5OY8ifupUrTE8Ljo1ZctiwYDlcBAkVBKZRi1sCxTKBWYv8eeONwQsawEU6/++NPfm2nCnvcP4trjI1JmGldy+43xQz8P92A0NTvYutKoi0utMD3t67YO33qbfccK0lx7MXY8DjukrkzHM/bsOR59gv1zv0itlkKqZvKcVCBE3JKsVFi+Vyvi6IzH7UMxT2MMMfGj1dwRfsvmfQriL5204dcCI5T3S59V1pKvoEjKL4oe+0jFOtxWSRtamhDeCXxxjETkfqDfiHAvsO5VTeC1hmG3kKWsPgNaXI0L17pSrOGNVYo4FSNxaUx/mcigjeQqvkfNZHK7RpyoyTmakmTlYSmghokGPLB71HjS3d+VVHhtu43SmE1DdQGZxv/OkGDl+vprwmjb8kuwzvp7g3M4GQhhaVV5tF6sfCwiWe8HM4FaclC0wmAQGAl1V+LsPmkskmlV3MG2U77Gnt8nwQ57Tb4uGnQTAB6UzXxFEtBaLEeyeEXjoIdOKv9oilmyBOnkY2S75V0Rf2gkfu4q85ZN+fgZBVa9mZy/C2btjgUd5AtGQld5CuI5evLpbwSMR+kI6Wy71kyDA+60zk4lrGKE8gjNhkcw+pNQCKEfy3EoJUUKjjjvWPE8sprlqtxL+qENJUsDvvNSe5ci/+e/yjOYkMzQwrdG/utxy0okBAmcc5Y5XgQY9lIPTMIn+lj6Hx1LG2mu6uKZrG1iU+pC+a7heE6QONW4elZN5itYPb7gv35yUa0ruAY4InMx/cJCxarPBEQOnRL/DV+tnCZ/Lfdr2ZBmVc4/oXk8oHqjPAmbwHTN/GrQ0Imsb7DvpqEynKy+5QgSyulUqADMnzxlwMFPBEpCXRvYDl9gEYnpy2NDHC7BjUP16QV7aK25dfneabFuW+rDzMxn/hJj4eAsV/4MSebxdKhBCzzFrh5SLknJXVow6a3ooQ/OzPYto2H5o9folN/0lDgRijhX+2PrKs8C88WfMCLeMozy71w47/OnClqHyB8eIG4JOV66+51/AuRECrTI7oi9dzZviNIMZAit9p7rPqkS50lTf1XezZM3B3n+2BiOyXeL51dd1ivaZ7N7ig9K+Mc8GwT8nY2CuhAl6zSSPavSQUg5QNRJrB/cx+XVQVo8eT5vl7tJRFYXmLcVCxVAdpfjzANNVJopdNxZN3sv1miAzFN3uQWssIbO6yqHiUrxDVXfeR5uncdtFtVJ1Dj1JZQWvHkgv/jhSAee7uaeiaTGgoWLpyqopubdHJs1E4reYs5QWkSeENtVbmP+EqSpgEPXmd69DRJv6l+hQfxwzfrbkSlrD9P1DgoFAXyU3ZGtNZvVa40dtwNo0qePIcidGXvxs1c6TOV56RT26p523mDVZvvD2bk73eO73FVBsEACR1d7G5ufcIwtBF0px372oUjktH75m0Mmo6vYRswt86FMQtYB+rbBE54Kjx+BJiXL7NfxJkhmKWkeU7a+JtLSDrw43nf91JORya6DRaVHwZMnpAw5WrGI7BKpuSyuPfdO3/0FHQqX+HaQ2RbzRE7RMq+VmhUfy2QrrkUDed4s30hHSfEQ3HP3WC2ZEnyrCxF7NqFmZ/2JpigHSLnDDnu4QV/zr+4oYJW3wU6056pNspOeox5fofsJpwNEi+GlIcbU+Mjk3m+DP50a96KMfQqvCOUOmtozjqXc7PiaS1Wxpd8gXVc9oQxWNxriY7nuFSu4Q7qvVEYmp+Rk39MK9ffeI7KKZp6bvlyAYXZl466DQr4ryv1FPG/cJmAT47Xb1H4Y3/PI95wH4nenR458z9Q49INDjNoMPzoMqLkSmil9UlzvftAUn/CcZMx0jh8xDekTQ3m/rGimQjlz36iOFlIbPSyQsMqoDJF+KoBhr2K7AChUMuPoUDFiQFFRgR/E1LX77lrF/dOAtxA13iMJojgxh85JVFw5hz9wehASd3jvxilp6H+b4zupwjcM+/XSciMov9A+7Hl30eDj77XL/c88+Pa1PR68r+S+zEJLYxPdnCpmZrwVfwDJFJKxTd+HzyxSlEBegRjM+Oj4dkgvW6IGFjq9msQWEA+At9SWYcyma0zXw4bhWE+yQxmswQkHke9BRaLvheHrm9tao2Q8GAmqAvmQig21vZ4HH+GjWG2EM4mDoMLdi8J9dm27dS8caS6XcVZgHHb9kpRmJ9GKE57dXjaPJpyPZ/X/QVq55XkUAmRilrK/6AdHulo+EjxDWlb/IDzjBlQh0FqLc7/7vK/hx0UykFlARgh/XmoLEf+kRQP7bo22nBRjvU+bj0eRY8KEso+5ikFStEihGgI19kXSuwCM81+ge/KisUw9TAFNgPQwsEyNqVnJ00K63EKBARWp74ph1REE8e4uLSj/bf76z0VrKqIphYH1MibLLHzIkzDZNB+47G1SRumtCi3ys47n+1BhF5oIvvrdo1UGHffmG8heFMbDKEOKgO5lt7qbz4pbANOeJycq2pqy76KQXvKzIye0ebn/TVF9PDVZ0focaUfJGkY2PidRCes0sk5EgWCmEcFLhFfGew2CKq6AEdgQql9mLraONddgOQapQ6NSnQlvvy/zIuj5zi7N2/3ZGZYdpdbCrfQCzrr8ar9SA17GIHPxeciEc76tTkQcBkiYyqAmO+JiyZfgezm0XiPViGt3/baEVHk+KjxGEpAuForcSp84IEoG4p6CAa+6uJJ2XKRQPI5QjfhCwysHWjW55LjQvCCjCDS1I2GSfDO27BDDCRvlGjLXWjQ27hiRnEQeTFuWe0Erp2AiF6b9BN+kGrHyV7VGJWwZ0D0NOwaFMRPigJNbaVwVQrm51cIzvpj3W0spW4Jl+U7CABngcWc9U2z2YvHAeaO+wNpGXVRR0bjQt/Jr4FFw7IEfyapV7LyYReIbcLNdG3g+yAuMhkUZOtqA98arDdWf+zI/eWnrhaQBXcYMnBjl2QO+OdUy9Uo7E2JCQJa96XKODiPd8nE+xN0gf4Gq7NzjTiG9Nn5XeYOWU+OqjvJF4xyn5HKc3I56iaHV6XktoAXm9vatnNDc20OIiw/3cn9FN+JJCv6S/CrvlEXzm+MuE8Jw7KXtQ5CMIyDvQmv8iJ42ej5qLW0BvE8gQW0KldjvkX/PJQtN29RTgA1nndW/Y0X3mfCqwkpV6EL33WLFMDyvGd3r1auI6j8jLjmwGopUgAN8PC3SlUeINIWSJhk9QMV4dE8b6lrG5lraYL2OI4qZzWCDASnNbML+hIWKrCXk2rX2UZuJ0GHrnqfHnXV/K+TdF0Un1T6kEWlt3wcrzsg8zcVXMetvzNaTS+wgl7+tGVM2EX8QGoml8Vz3boAn0rpwBWzXH+7UbEbvlb/VYzG2Uvo8j9PxKcP97whNfFpR8hbdolWRFNqRxLdl5kOw1pb1guubeVk0T5rvvoKTxEZU2IyWfcks0RDpA+cNzxUoGxdXd316IHngBMWHCkfgu3MkEhzcaNElYkyOMxGhOb1lJ4AZiC3UOrqo8+2WH9c2Vjve5af35KPSmNoKl/LtA87q7uzhTTf9+ZAsVymyrvm0uxFaklGRk2qTDZF8gAFIRMd560hc/PWExKyxKNW5BvbwF6Ui4PfeWXB6v3CCI1ix876j3QToh0T6My0c8cwyMBoswJ1j3QJCGhp+/LLO+UzpBrTHDhYaQLsJ7URVJ1vgS3NwQLTvvEj9JUrF2DR2IMSirgPAmJMXYB6c4pRUDZT1oinSJOpD7YpaBZEKiPmn+Yo85vXVsO+f4+IDDL9AXE+cRWt1eeXVg2M7Zy2XJudai7HHckpTYZNAUR1P1jJLSFZ0P0Bn1N2T/1I+vPGjju0bYQxi0T25EbCCikfIhEOfl9zX7uBdpn223kwTXE246O9WRpvrrmqgEzVH/eWYq1X9MTJ0ms6pr36DQcDbhx1Np+jIwBZvkHwbYg/q47T+XwlNC/dIE02Afp7FPsSj93Lc/G7MU5n9wk/++RUIi9UjMIQbAJl0k4u3yumMRjGHyorO4FSZ98m1jbuTNzYYwVtC4+jkDFbS9fQbj9rtFIdVs1PSDQ4YFoalNS/Qgu8/S9Ofvb4khgEzxEQuzEFwa03j+yHX0MXx275EjlwIXqkwzVJG/qRm1w8Z374RGEaXW0nZLrnuq3xPKEwgZb0sUO4604kZoHtZKqKtfGuTgSfSdkyqpIrh3Hpi8E+chpW//CUS4KUVpucCyikuMiAkTShWHP6HV/qgGyunHNvMvGvtlmdJBAGhIdtCRWhO8T8+L18icG78LEiTqg5WFLKKCxfh0ntKIo8Q/cq9Hl+XMw69e5gWa2nLJGmxInV3w0VJxbGPbj5wN/ues4hursCYlBI2pTzX/GW85v/2b8AVzF6YfpA2b/JHuL6G6OVoGirGn1wrTubVu3ggXWGuwUx2+LUwI2NMJNgWGJMc8XyWy0zz3+tsevk+xKjAgo0GZhpgcRcPlf8co/3rUcEwwfcoOS5qFGv1AB7heuAkRU51pxmBr+AVg62xiQKrMx7R3JkC1u95ju1lrzgOMpDvcN/qpMoqD/nBZwO5MXu6Ktxr8u9IsoceyShAQgcqH4MOvGJp6snsyWlE5vhEZL3wc87Vt/ZcFZKAXxWraaY3uYKcIYfhGldilgF3VQAM7/gHJkLCGJ15wwx21KgBJFk3z54nNqOvHSFVFmLcKRUmioCOWNI+nkRQkA7rHz4kzpAe5pIi7j5t6hbstZD5J05zgwQJReIkdyod3Sr+sOiB/a7ClG3I82b4i71hXTrPqfKN9njIF0ps0G4KztmdNTskxrYZcDmpn+a/SZe1Ri+KfcZRCy4hlVv6X6TAlf46b17nrrcgIG4PsYK90EPHJL6u1QsRnJBXKy0K8HQC7fuoEvN2eai68uUDd/ii7F+6A+HLIZgmrkYCk503bOxqrmWME314PzGD3Nu3/ht86oWcyskrf7LAx98hAOHARjVPoEMWGPlCRN0iraANauaoN0kUFb/TTCURzUBwJkJrbf3JhPfImOEd+3APyXAtN/GR8m3U3Z9g+QSCcPx9gAQD1rbSEjqaLaERTy6xiXSWSslm8E5wAgqa3Jksj1aEx5vLNWm9CtW/rLbQlemmQpTZhGxM1W0zgoPwUIC1re9CA5OF6My142LoIQk4AwAzZ46xHV827kQYK0EcjT7hFB0KoE5KfZMQY2HW9kWUweq7EQmLD+gdHBMhw8wIOVh+KuTIx52Wdnz3tcNOa0ez2bZvCAByoKMpHnHK4bIErWdWOtpvRurZgzh/hu2KIx8lYv0n6rDacCVv7Hjn3M7kjFm+mb83nOp5awDD2gnZnXh025ir+rp2t1/TWbA4Spn79SEjkWIlf/lik/gETlCYgeYa5HW0PmzkCb1CkfL04cp7TTRgJhq0I02MgbStgQ2QSIV3tWm+YG7/3+IE+xqb/kRPmO892WWZZv3CcIHAQqcmCJOVmuSuOiXp/FHLMbtoZxEAoF/vAzc7CV/rnw+KP0Uf1+PzCIq2lt6T8ToWvLPtRvj1U+h5bqI1y8SYCHV+mf7JW1XRW83mnCbxZtz3Hl1RAkUlVn5Omdj47FyBclaeBh5EkrZiYs5QWC+8w+u/+/vNoU5wersVmT/EiRE6+sZ03E+0lv2NUFxiJUrQLLjVvO4I2/7M3KBMMXp2NSUc+UFixmdfKxjZq6QOdj+nHN8fFrlIdhxBcOKcs7J70V8KGF9ctN92BUp+9CQKiXkwN1eCkduFOd627AYVx3ypeDH8DcYcTt21+gb8fX3zPqChXkP7LxvJ83zahBpIGFU/XLXd5qGpz58s6CLCaSyORWHW8e6uxhS3GsdIHhIVxfw28+4i5dR4K6IysS9nq9XFx7SaAJtenNdPq2dj12I7oPUPTa/rwRm75k2FIHqP+CILJ/rFCHX2+AtjX0P49Bo+UEc4FOUgNiMbriTbT+oPweRtSW0wboVgaTtzsiKdyW4zamZZ9vhaD3LAJmDZgCVhHSKgBk4uwTpeHkalF2cJzIK3rsnbfsDTRQvQHsBVCZAppciAFiahrr8H06MmlQJwpvZ2Mniv04PR58BrL0XqP80p8LCVDwMY9ZCmdO/QNvwBGh9CXUwt7odxgm3Bk1hCqn09EoZSMlnFz/5rnwY+t/tpnl43Xf/Mjx+TLZ1ZW4K8ZmCQyMc8svAw765mv964WZ3t7nkyAaVvqtQRWcxWBNBewP8iI45tBhlq5zmnFMPUn2eZZpWGlxQhduWX6vF7qXfIJDpLz+P/ZAtq568S3P2LdnAV2+51hPCNp1igwQPBmj5N8o9AawafW+Y1F/teorG51I4e4YTpBJGQjneLkOv/409m6lRnLEVyQMtzUNpCxssOEVXqEPjOmfvvco/u7MJY1GHJZvtjpvh0nb1OAvqaykJdI6eNXsqB8EeMQ7swrJIPhkfCAer8S/1fxuXVgMSrxIdTqYRn/FWKIiFXnvBj4ZRwjZsMQ+McYfJ6ZQidGOZVwNfU4cjYLiOL9LTwiJ1NBwf78iVwmHA7oN4GGX+ZAwlZdMOMNtrPvpgfhK+JWSH8FQEuxZqHYvrVF68gx/P2h8rv5h1lLrsNO87CkQ23bnBK4eENQnSTbf6BH01EZrlF5PC8WJM1ZXPz6+SMtuDK4Y0NH7cky2lUFqMFVQuh9+X7RE2COLeTGU+fuuCMdXQ6ALGrZfGpNyO8UaTz7WKJ0hPp91Wicm4aBfZsz9aFTSNjUEwY9z094Steo8ODIzBOnZbO3aZwO1MwDFToHn85JI8mDSOLC3VaaCl+mP+ww0BXyZF+YteMPnKSeJ7XOp1gQDOlM2C3ahhVjF56Tv+wQdjis42RSYYaPP5cVLbKikDwJTIdd5PjtzalZ2siuxeDp1VTLQ0JZur3aG3aMtoFwvgNJkWdThkCkBP5Bw71VppAxDpgw/xpP4hBDjCkIRW4jHaKHdaFBJcH6+cK3TENJCIRg+vKwsNL7ghta6d32cituSP7I3RBNY+lSgjR4OjHqCHrzplTYbtGj4y1xs+p62rXBMv+eE2shE0Tc+dRBBcjeHdmnnPThwGk6g9htUhAX+ADHxpoeW+ByoPzRP6NUF7g8HuSGWSu7WIy6FbFdY9xstF9lzCyoQpGeO2J2uR2KyEXtxi12PPm52Krs4gsAF4AQjzM037Iwlo/ZKbLMfFEjAY7+EVrQpmvfsWwKNXetAvLqwOHAlw1sHwf2NhVo/38ywFqhJqP2EfijPHAyjAfOpqPtheGIn2oBytnfUd3cpBJPpWeGFFuIz/EFXjzAg7v34Ry31NXE6oSr/MD+rdfHjjwiRmfX1hlELkKFI38lmS9GEnbA1m0cwyWM1ToxI1v1VHJSqv49/j2c5FfMGHoi5BLdNdb/IPcWBlHdiTW+qFZuX7E1/qj2hQrp4fWGnGsREx7nOdTy3EnVIpVjIxtaBZCfmOk7ImPlaez3UBSLwGWJrW5aqfCVI6rrWBIDcfwNTHbUUpyVYzFtNgDevIuWZ6ws4ESlwL+VaP6bQFc7hE7mARnp7Yo+CTlZIKOcbD7MLN/GI1JyxzZG+t8jLc8OY9ZIVBjeU8B/EwvgkOa3Msi4cHTeLemQYW1X3GdJ4Ymdtp+iYnjGgc3JnqrVSe0F0q65VOv6fIqTd54ttPdfW+p6iB0c0YLpcgQg0T62lSuAb3jexq2nJ0T7oNHSYGm9+YwpwQ4UMV5vibA4PlFjqUIQhFGHb0mGExx0br1VLJyigcRXIx+1txeWQ2MAwvJ3DqTVfHJKup8UucKfSQsKk/xAOC5XpclfceFOACBmLU4+1hJbaEx0Cjb9lffhwGVDA4ZdD4qzpXvgYerz18oEv1mms7Qykt/0WBKG7KtgP4IUVmImgfd9hNc+4PR7MfyjLkpeRAayk+TDDNpGzt1ux4VSjpC+a0Bf+qJiZDR6ud9fFygx9IJZ3O07CCvGpRKM3Db5/7V62+z82hV5ABWSkECjT1miWbgyStb44Q9CMt8Gnk5nKEyrnvCCJ3rVeT/ZkDAuvAsyzesjzGhpmInjmH8lR0C7M8D+roLop88DgPhQbxu4ZdBTdL2RrRxEbvX9QjleUddhcNa6zDQfR0HN9foNcUEnfm318eLL6RL1PL/p5uzDwKQUF9GxK4UC/YLtpZnLPvkj+smNapQSdAN6X+UDKrjjiRWaBlurVvVkYdskbKjNxkLbGfEFq5nlCJQylmEcTuR0OwYFveqqLCqe28dsVgfIYtaJ91lKsY+bSdZzaTWCe2OemDXgVo8tYCVz/mfghqV9dhhXxA7f/Fp8ubt0qPb20+Mz4fmScskI2ajRM4C+HLp3JVGZaY4bHvJCIvYK9NdVvjO8drDbCsckrh0CaLtWkfm6Qftx+IS/gcrDp2vZqjZUKkVPb0u5pc92M7hwj9AZgef/SLmNrkHZJQSOA3dD4bcLzHdgnPlAA0dvo8efqMKI7faV5TqF7I4iv5COgdihXa83NWY/5z88REXzdzrGiWjNoAQoAkxqTqZQd6ZYsEsbOo3aKs6meqHSBbmZFxu2V0NUBscUDzpcFzOFYia873E3QMoAzKfur0RZ4mZ8gtxdsMbZe1ZZHhfGm6P+GJtBKTZ37lMOh1S2al7BR7LC33R+wXOo45rIukBszYi5rbfaPiCOI7m0iwjSv94GWKrs+9ye064DOhidnMSzSc+LXMB0OACKYkisu1t2BZoZgoEaMSfeBGjaIhD7SCDFX53jBLWbL+WN2ubQz/6UMmiWKSP61vpdxf7loEWdnLHW6uUZbOsXj/lZ9WaCQMtyxSPu0Fm7LkyFf/CeLWZ8PdTcoKr4ORN+nuHJ/kzL+0Rphpu/WQiT/4DSlvcif/TVzzH8rtnTWtxAgNRb4QGfBheTBiiBp+HqRo7d3cE6+QPGCkrnNsNORWYN2jvlQLrqgou+grLxQ0s1Nc6jmhEj//mHK+5ypC+yCSNv3XaoSHh3RvxQcW3FkBOfoqHuccM0gCD/cT3oqUWR6Jkex0dtN71ZtZ6twApUr4QaOeYSw7hj0qdNno9yR9bHisSWWV8xXbaEEa7TfYSBKc7xeHXYsjXwqKK7makFSUtCXzaovtsKbbz2w3PIAycbrHvxSQ44Rxaui5Kw+fchiVSIHhc3oSCsnBodXRL11Cw2EGqPO9EUoA2QUbWu5EESczryFWRjPoTKQSM7hIYsa/zWRRKET1JwWoq0Jdtvi0OpqlwSoDVmwHPZ/+pBhVYc8X0LnsXbn/9oz3sw37z4NxwSfLbKfz9CAaxKCCw/rwLAHnRH9/bZFdKHOIdJ6NEKFxAM1cEwigsEyPqtoeyvgi5/88ZqevPpa5LSQ7C5hs4y7smvoFtT4eYFesyO7AXNe8v85Z6cFvV8AFPBpeDiYkpLjO0HZET5yPA5S8dRCfFq3CALTZJZRyuSKC/VsXbQoTHJ3PqfRzxrgIxw4judavSRPEh/YfO/sI5jazH8G1Rr6CYD0R7MrxTsE49x0ML4Bc8BG8aAk3V08mwxy0WXo9Wobs1umpVWrQBMs6ITRO8j7iVk8oYNrcZFy2ZxHoslW1hpv25fjIDsqGFx/Pz53qUZI+SttnYORNMw7oiMZx9/0z97A2rXVCAm7rLaHnZfzlYNuGJxez+M3YewSu1OCOEokD8KVt92M/VcASRRnpbOFRZ8tvlMYC4KChgLxaENqOE6rAEqXqNV8xXOMQ/jsrpuUOwE8S0/nNcZfOQnFEM6EsGiZNDZBRJzz67qyTYiJ0V65Evvs4BdxEAqTvcPpWxw9OdmK1A8xeWAX1sO1B1qtAulQ2sxiqRqEF3VyIiyvnya5sLf60V+NRgFZ0TcKXwuu2peZ6QUFSLvhOlpots0PGv34ZhfXyJTfVwC/yA2hyDTj6bswt9WH3sRriskbf1f8wUeKXgzoJiA8qcg3HS3PjNA1KooQKQdE+Heh1NTDhRUgdlmYwVkuWrSDrRrZcBjxrx8pvGqzEJXzRqE4iBbIiCHkedHjaEOFDbcy641IwURn1YDYWJDtzEALkZc1SgLunkpYVVErLt4iNFNAWiwmLqf3NN3fY/aY9ryTuUD22Kt6gIFkbomBK09df+eyWUFQ1ewwR32eihiYWuDpfRFkfQ3tjdplYlVESvjcZtKIYNYyz5FuQJ6H9q5Wc4flF6FXiPtiQ4+sUUxAnTo1lgfmWOLeB4/LDoKWr0ktEh2OLaywOjPsqLdCYNiM0TIO8Wc4HeiASMnC8Q1ysMo19x83kGpb+7sev7ihfp2nYPgBpnbFTFfNVUb8LJIXSr/+o58RocxLXM8ljvWwv7Jz2pPuLhSiqDpfQO1++FV/8KdFn8r+So7d7ELzVSxiTx4W2vGDMlMs3Rm7mfqN15WfM0x+OvKzp0vMiRNztI0yHNuKvr+Paa53pbjwEwF5UatpRNvS0mqadADBlDblefrEGoRFEMYvpUzhhMtp9v9A9GFCe8V02Qkf7ozT18lQvw/W9PECORKUGhm5IskmuZIyMwG4JMPl7Ev1zODiaFYDiEBQ3HEaJpyKAUnizAcRlcJCG9d5B8dD8c5N4Bgf6EigRQq5WFKSlP5YxC8jAm9OVY4S5pI93+DPEtWf/HiHLMLxRvfiwgA8Yzgo3XZ2V+kTQSzOUWbrLgPnSLCWW4iyxYQ26KtnQsRxkMQN4Z1pRaxVX/W/st1t+S8FGMJu81bUhAiaIHhLPV7A0SGCJUe29EvsKK/ZTbeQQNaMA5H62ntXm9ZFOeu1+XXAL05qwUbAHc8fomv15jAS2v+FjU4D+PZZWn2R6/2kcsF3lNRHEU2Jtb8B2av7gN0h34FWP9YSZ4HsuPOAknWYhnX7N/i5GwzzSSHtv9Kr/Rsv6YYBSw7HENkUH0jjJ2H/Vk49UAMTqs/u108LSKO6m6pzOeM9QxSXtu0aFw5Ljc38IEsPoh0ejMl9gCZ/sqbsmrIBAVh0+gIgTuvMIO/K/2QKKeWs3/4lyFT8eIkKp9pAFntgav8/ND4L+hgJm3xJoUzigq862UUNoqdKImcu9jMJ35YP2gbo9Psj5FNAs7vWy2/QS3YxRAYelmfl2EPXYP7c9AhWmPqnFaC/PeW6q35/gv/ac1GgMLhcCpgxbKsQsESa1Tj1BjUh82PmLGTAacZrGkjmbJOcZ6lnGFJjz8bD7aqL4A0oazw09f/68WR1oYFMKvyvk3W0M5tg0CLdZW2ndY19ZgZC3gKPT0Op2/nko/kLYr0kPvCN6DV7mR5+0LoDTk5QsY+mjfVl/i3sc8BAEhuuwf2Wic5dQC+HvwlyzGh0sDxXN/dkOk7EHYPtT1D+oyOH+sUnxiiUiQmqlLRNZd4M8diP+Y24nyrNdmsqKlZyVaVT49tzcizfZyexUKQJnbLUgbE4XjBxSHFc1oFJnl+59p2Z2n6WgdEwq/qTYdrBN6cmFcQrdAZFBrT9xVewWnAUeW6Qm/d2BDy0zo4Ztplf3+yLETzKFP4oam5j1mfT2ncw8k2CCTYjTzJ2jbBS4ZfDN9a+9MwuXhKeuvu+qg1Yr5ylIaNorStYmEbzeOa23Ezrp4G1wYPEHWAVASF2U4boGhku7fzMsArVDCC+VTTWxVqaNS3GQWS22maHMTVcBop4Z3IRLjoMvfpjzU0oNJO7Rf3LX63hiySv/xgtLt5nA1TF1rPZDwRTIsFGE4whGN9mRR9+iV1Sq4HdjWlPTaY+2dlwhYplbof0ui7anmrbRwkNMSZobxTf/LjTQdU0NV8Bko2TDi+LCOU8SLf+DBAKkYIHy9EI6HFDLDr0vFuXSuaEOaB32dUr3YRLPRAwy/RlxdMnAx8NGIWaUJF1G1gRCC8K9kd9NWaAjOuReYD8xlAsM0D4ob8DTb1kGFSzt1000Qp+VfFMa9PUNf3LoeG2IwdE2KlMOyD1nkU0ms16Nj3lh66x7JpKuTdHvrXh9i3L7Ay5igIlQCaxh8pXDXM8AkG4yA0bvkAPpTMaw4HpBaGCmYeaNsiKapDMD15L+swtoZyTfvb0Kh3KEdkgXTuNv/nImkTHVtm731Tzdsxl2MisMXTMKpUct0WgwKbSAPq4oj2vqOMQJKJfbh1Lc7pSKnB7G2T1ks/gP/BbyY+aHVzVM+ImkQf3d8zmPbCl+CUbnJAulRrXm7g5+2OzDWiLrAU1q/d/LXv2RHtunkh0xQjMr0amx9s10vJ6tPimTENw2RLfUjv+JE2Nwc6DzS1MyniJleorGMeDC3UEMb7vmFHwQJjabwNnlG8f/1fsXPfhCaSCdGuQcEDmGNioM3uPMTZ1nEnuOzU/vniYSJYaR0tMdPxwD0z0DsmM/B7mmgFvaMfNP5c9F4mhFIWa7bXjj767ucLHYswFduoTSZnNYa16me3RKXrMMTN7uTHbTq/iwMUwHgjksy9oZ+7HzTs0hjLM5iUI3dFi2zHwWGWFlQDKfx8xZSONV8r599Ct0GaJsxC+LCNIqD0770mFfZ7N3fVuQ5ATyydS8tVRsgBEnNpZkhy78MQEcD01vXQQRARfeqx7/9adl0Xpg6ehJebgNsZn8iT1c/bwdJgew7lUWNLZ6v2EX7Cjhe3x0N9piYf+Ds9yVEhq3HtNeDlGyWugk8ckAQnMiTX5Ij0g/jXXs1TrHh+uYmqApDDfWGp/1qYO7HYR/k7AJm6QiafzK9knDq+ktK+bwzLjs8Zobey+6cfpRlzvKQiMBQpIRezN9r56X4T0R/1V9sInj0Uh+dfXWwge1tizZnixJ/vXJsIR+hBsCEkaA7FaLD2hpr7hkhw00vl7exWYW6mDSDcm1nikZMYvNKWMYmfg+o6dxFkjOMpzYd8i/xrz6okQ/ZJdmVZLCfiiP9eZlq0Agm0ElhEuoLuN3fEuUG426Ni/X42J/gzP8W/BvawE1yIY2b8yJp3nCEVO8fnfmNb23n+OYRPpfEOI+jrtICYgwhkKHD9MvxXys6TAURB3LoEVNclmYR1KL1jWVV7lENKx2+lTvDyhbu70Ki+jv2JuqGwrC18bDZtBvAwqgJHSRtFuvjyARYmhmQ6gFMRzAxa87CbZwi+yoEfzRBz2Wt90rReR6nzy4RPSKLYCiV8ZYqFBJ9n9d9Irhhb1LE1qWqgxcYUT3E45lDGSDzcKxhXICSxjkF1gWPTtoYmSdSOoasONzU7ayVbQEszh4qxV4xt7JZq5c14VG1ewsAm1yYHXSpdaK6GSXTFAmX4G/E3YEs3csnoVQZDvdeG0BtUZ19TmfMyGsbigoOGDu06OmGhjAeyBOLOCPb5aYucSXzK5yRg/iVghL7jKQNzQ7eJrfO1+TegudKR+QKCd+hu6DR6P00exe9svQ3jQKPphGNT8QJtAeMdoQX4I+Un0U+3KNWPDz7KZfTLv+BOTtC2wuLoudizmE5zIApEON1/chpD2sqCWNT7k/yZdoNI4r371Cj/LHJGGWmSWPQGT+hni0VNkP8U1FLuj+haRfDpNyqcxo6K+c97ChWXh2oIOT/MpZBpA4RIIRPvOk623b9z6qCbF7r/aDtn/ak1SkdiFJwnvc6b+0EnmySQB+cfFoDHHPkYu6+BkxquC/MOfdJ5J4jFdfxzLe6bsRs8lggJMjo9MvrisHjH2ceAGblYa8Ti61/eX70b30Nj+yqMBAhxl1h461vlMwltf0M3/xYaChCIgGXGZ14xj3LNljPsI0OgCNRkvJZoJ/Lwk7TpCpHKHELFkeMR2HSZ0nBdNFWGgGcRI1V7C+O05EBZ9jX4XT82K4DbM27vHownZr1Mn+lIHkiweIvfjYsA5tKYgPawIpqvmBVOtjHMTy3lreVOrAb5GLZm9zxMtAC0zg96DWWVlD643ZCjhoSwKbFqJdnvh0DJHvNHtU3iTWEtjysi+mzhL4BrTfA4uSHaPNjKS0AIajS3tH36CC7hbLCmKOLsn88016TiYcuS5XMAcrkqJ8MJF51TyIAQ21aMtEN6R3SjpqGvJ/soCzTfAByqUFS0fUHTJ6sk66vx4QRdtCiQFVA8wEr74r8lgglJN3fyZdP19oBG5vZGl5NSriR3myon60Qf15NCIz59QBfY/caR0Oywmd6CVOZIhUtH/91lUjUsREo+0SauXuO/kFxcPQlyZ2H496wDOj/PbQL1aVDm8WYnG6Brzfvbp9FYTuYO/C0zfDcCIxOmAix8mBRFwmmLGQOdJeElZbbjwLyNLMhULytbUrYX5wzY6tBUPf7Lv0KG5NZZijsO2HbRN+N/QblGz3dM4AGZcDwqZlgm2pRG7U9NNe+zliljYqXQUnS5meygFvRuD1Z1sApBPFgfSLInFKh7xAr2vhBe7QdRl4y74iFPBo9tSgXQg0NdP+IhOTT2MgbjSRxVtsGbzwVniXE/LvfgoMgMWTxVgKL4ZFfAGXcCsYqMWDIMBXdLnRzkMUtUdfPXuhKGrDUjJaXQYiQknyMOFfmqPqi1oytCTgH9LJgPbPFVFceCfZ4zHEQAPZYNiOV5BI4Su8uMjUSCR5oL7C7sP9hajqwBMdYxDjVCYBSZr6xZnlmK7GxuNqOcEyyixfUDQV+lCHV2dMJWSZLCla0rm+6/cYeLPEEGtKDMim+yuKXmbZwsBL0MYeJZILpQNndfcb0xfDu+6qUedy4QpdAR+zjgH5i3/2D2UQ/17mwWIHLijX61/ceuoMbnSUqb8FeH/5hl59Ci+f5Q761YAQU/JtbkhsKV2343cTfmEEWJYKN42/I9HUQ3R0wsEPTrjWKTjBOP3zrx7wN1s5ORpIbsfoKRzEamsOpS0ZhL1BFPVi9QLNd6Jg1z4PSajFZqORQB/pju5NN5WKLjPJeTABXHgihUtAq7a1KZFySnKbrW2RZcN5ybVmrfb2JywwMOohL4+KPl1372q7/ZKv3WlQp3fjWWpqvx0pS1Uqg8IeWHf7MjtJFfjv+x5y1NBJJy6t+G/F19uYFxZY5OUQq7F9Upb0rZ+Z/EabGOGms1MPv1AANUa3pdtRFUux+uRVnI/NtbcAXlcsjbV6mhuZQRSihih6SU7jniBOfwVmF4Fpqf8zrnknFoWoqTYth9Xjj9JP4jszWF2OBOfFyf+qpIApx8odzo6E2RFws/v0070t9pC5kWHeFteX/QweUA4w/doxA/FxpgLCNIKRigrzANaaQX25Pn69h4DshlQIDOoG8R9UzfkBKiIS4YoJ88SgIPzRI0ygG/XKoG0ENtFgf2TlaK9ghrQXhRnrENNjC8Gn6v/K56OJUv6EKZckhk5lDhb6KW0Tgt+YbccePiY6kiRyTJOCmd6QnH3zJhZMbwlwMSC1/7Nu7iDal5+vP0UDW0G8yR6MyYbXn2XtWbXJUzSAPwgTDJD8soJquRAlHwTqgblL1sC1YF8+rHIY4ScLLZ5iy3lyr6HQD8WZeq5iMJeoB0/GA8PZ9QxJyS37xPOLZScA4c8k936lMGt7EqKXcFnw1NOTkWoC7+W/gb2YoK/Tji2uf94h9LbbYGCD4qGleCeRbT/RS+Qn8r8/i00rcwltE4VOzDahRCPfcQxPvwxzozwovbJpsVtK3qMgH2Y+uzn2X48lAVziFaw6PwZWVN1D0Zvg9O3R7Oj0OHSLb9VeaNwlLnrWT9MGMGPgb/ghwOET6HE50qpX3Vhgu2Y44MWafP4ImTvuhMCCtnbXz+1ho0LIUI+1KibOqVzJk8g2D/+93GuqBE9hRXX+Ie7UVt4fDXkl9iX1nc1vISQyLVuwZp6tOSPQLd53mBTyM+vnmfd6UAu/8BpLTm0wWjKtuaqzgY41AVbBqCRXz6UvdEi8aUept3P3Cf1u3AZQ5trl71NW4CUHENfHOqednT2AIWVcxsxk+fMOBi+Tr0oxqdy+Wvb0wCesxsj/P+R1qzkWt1esgkCejsfX/nLSczfjKkuiau1cu+psXxSUfMGpjDMfvNL2z9PYdfpyeb+z8lqcaz2jpL7Cyf2sjfuZ8mdwFrzAYeIYhU9KTUznLeLTRE03Ildvp2p7OsF2HffeJ6lbjKblcfaOo2bXiokNBNfZuQ0ndBIiWOZwcRy8bPIHQhdpBeA4L9jImIdHonepzQCTxrfGPkCO4Gqi6QgnueP9a6tTD/G7nJjcEFQ38hGIRvbV7zQRGKN5GP+Ribu6s+jcuOVtdjeieHdZpf6NX4B9wOWjytaiqRrfeoHz+p5Rp54JE8HsJwTjbK6iW2GAVFQW8GKOaKbgdGRSdIxEBbN/L7lBubNQCtQ/WDX+evIRRZZEurJofBF1j3vbMJNSQmBW4aPxts+SnkD+BFM9t/U0pa9ztNylwknpB6COhSROSEFDO37TI9BHLpc7OtoQ+fifbbypwNM6TKPNdbuGV53p+xRYDZNd3v7qliqXYlFFxxluWUjwLgLEo7YeFOTKDf8Px3mwHtaEMMVOqQzb1lrbX2VmEwiTzMMyRAnMUc3CNaJIg4VyB6+9qERT23iPbjdOpypJtRtzjw8W42z+J9XInoPKf1AmDX4syS0FapRXnX9D7zgfddubbzbyz3BY7lgDgbG52Ftop60RjCnWS0mwu1UBjEPIq7eZ3p9KmqiQMpz8ZRL9Xp350ei85p5F1KNGAG8vE6JPQTdL0FQtAIhZeIRjU6fjHwxradK7Vt15s5ZeXZFY7soMxCEE7pI9tsj8rYpYmK5YxYm0XH6EvP5dimMGPyoPHuG/11pq2d0l66xLL7WSe+1KUkexQj/yI1aXoaA2mhz1JZdawEtH+oeQvaUBmwyXFgSc9zJjDWrAYBxlJ1quyrKY7u4BiG/EuMqcdmqc5HA3McZpjVeEUxExAV5/VjOj/m5FnKv5CQr1DfDYpRcdS4IPQcoKCVnzfYVvbnzrU84DTfy1xbXN/Y6T9Nx4LJzgyvZmq/tIRpAwKqYrvoVD3kykwPukSFHFgtqy0tG971CVBCUM+9eH92CtyRr4JGAuStICuwKRhT39hIxwSDNtZXGEdmzQ3iZnecEAjcF3PDW2uAY8VnqDjH21XUNPYBZHdCAaHAbmpFE8Ql8U02iNyO/dMmJ1SMAjBs4fftJmy8NizhMX1JqVnL/WjhKxdfrE8irJOycGWJTbtOssf65WpN+snqiDsZfvHvfrdp1K0dptOZRK3saAbC+/fgFiVOTY01AswnqKoY6RcbHih9E7m9qxZdgo20QvugwisJbQud3dL0RxDj5kw4ggHWOJgn8bNWX2x9xaUZvN+nWlyJ63Q413X9xMhBnAp6mO+xUptmEyUUjEByWf1vnign6ibwUaaHh1VxluQhohNJVGLHSf2sfUczgHJC6vKA4SQxevWxkO8OEbPKu+M5wi1y1Rw31R6VYz1ZIACw3v9KCoQKJ6IGD96OpCrq2AWljpk7i9O5ECjqccMFsejHJDX8wwp/kxuiJaq5xswfO4bI4BaI9lvk7mQ+yngbqVke6S/7Y2fE7b/5HQWC2Hvb/GukBFoHhjPnuyi9OTVFAmbrouUQ7BliF+biQ/66Zf4+zJZb3w36Bfv8PjqTdWWDuZbV03DwnokRS/NK/mziyfqUtub9GGfaCvetNmZ0isLKpRe3Y5mha0MMXFUE4S8sSF7D+d9lbqqbCEcj7aqjrptlMZfBRmYglo4TEm3n/t8sL6m+0J6QPtgNkYWQZyQDR1jF+8QApG1F0gHReelThwesn5pUHcTMjV5OcfUbulUMXYxlq4bvZYApo+iqaPniIIQ4aXl6YKNEXsnQiSGDSjbYrreae9bEgP3skWzQYPca1k8YvirnnEpIetBAouyxLYtDIpCFit2CbiJds4c4a/QC4AMCwpOv7DCB99gWvA/qZLkfbTdJsNPunfIxJCj/CZJcg8FsMQ1/jbL+WFxsNITYW8GqHt3liT1MiiJ8farUgWgWrBOC24MRzQ8UZzYaueL/nN44y65BDmsVsdoCOa4Rp35YJVEnxep/cei5wJEbX0CY+xgoBJVEyVczwxLGns33a6sox0+MmFjbL5mF32iHWWsaIqDLpKbV8V6w67CS562LD8c+1/y56SLqexl3lznzJlg3VgEb1I2PU6wEBEgwdt3N3mCuX830cUee1hoER1Cl2BqtjksN4vclUTnxiTd7/ueTeVPpvycjMskacSTHPupAkrWBCCVgdJ9UIzCxOyfIH1j0N3tvEJiZ/vlk938i9FfHEJf5JHRpEPyZsdbAbd/ACBnw849brNs+mxqCLbDUM8Gy+KDX2Kr3bwWAQFpFoKj/73fBhVlPknv5ALwj1UWxLs92hMQFGhhxXZh6djmruAFdASyqQoq3u/e1U3r3hq9c/zOACPp4j8khbeZRArBd33W1OjJaa4VtWFFjLZs9W2A+ZZuqiu81Jk0mbC8RS6M9Z9eDNuUPj3dYuRmKC+sxMlrxbKe+ES29XizYKl1AjVKwKO4d7u3rDO2MSZ7PkMN892mwGgVV17jz97W5b398x0pxvbTXqW2jYCvlYu895V2tN74ZIhW482a32+LRZfirnb58CnjsGAO9wqZ6+yRp91JgNO3V0fwwfxjwi9G0rc5OVWwP6kaEBQHCBZA0EmC1SC15A6LytYgWM8pCYS0daUQiRLIGIucKAMK0BSeOEAY6BYyYRJRiiC3aPbT8UourqL5FNUPpYl6a0QT5ofOOjFAb2+wve089Ozqr3VKS5/lygRMB5Dc/z3lXUlzpX4VGyshvkOxY5sJun8h6snySx3xtSYOpsgWyrbEqTxpZUouYMn0yjKvVvF54r93+tMB4ApE6OhZvcRbSkx/w2Pctt+lFI7kodcpcBA0xwLng/QkroniY401KvRGGA3qPmtTG1v19mWKqn1IMrkxgTBjK4Omx42m7zRTqVgV6KzzpnqoEr5nq41m5nDCZhXiJwWngQ4TeWHCEZDOsc+ef+67eBtZwcPB3OjItC4LaqNgg2StdDVwUTcidTxsU7xyOb1f+P7ltxeXmh7quZLbpqf2SQX9Vc6bqwd0ojgEj1nlFGOpbXAvaDXy58qudEdLT59ISWfWdw1vWcebb1/cqmAD2oXRl6yCAIRsSd7fdYf7PMUOpI7lBMCV0f4Q9aHMDn0IRU5oZVMBGPZ1w+t/MuVKqsfEc46IwnOJCXc7oRJIm/YXS3uJo298Qd3luesGH0nmXogejU5KbjO/VwQopggaYYIYISRbDIbh3quE9ZfXhXBH7zgFmb7yKIgD2E4xtVJ8M3SrC5Ccp4mQsaojILy7Zr7Zm4BbVBEm3skUFg3lx7U8ZzAZ//ARUZXGkPyciiwleJslKqB5wumsepm2gcce+yTKbc2BbEdILxRPXvBU52ynPC7vgqTu5Bn/WXUMzgxK+X4Mo1CulvVS1GA612WknMxj9QKVBILF9ETmf9str1J9WfX4L1aBrSMyPaLGOppxmLwJ1mAzhwoxhKecXJNmYGOoP3vF+8CopDDnVFr/jgUa7+1Y2rObsoCWYbICmRVlDln9/ItVEj8F2aaHNtNzda0uujJymMhfYR4Dip85/1Oce4e4I28ikwiu5is9cDERpGWbrO9lJh3UAoLq7taJN56mWsVSDd5B6Opgove8O1GSzUQz1V8T8x+5lkv/Qevri1NNelyRo2xjsd6+2UdNLmUnNL2sEPrRewr5QpI7SrvG0lr9MY/Ra/6PgofBwLN0E41ellDmwARMP91Saxw8aJAiixy8+k8vAYAMLx86E3sJ4bHmI6dR1Kw+L/Ugni05sSL0KraYCzzZxfH1qIc2Ia6vMtqD2AxIFESdPPyYk4PWJlTjI6u7GETs3+T3jguhRpiLgGeANeOxNaQeOmZaxsgwm5SJUnyRfl5DSyufijhOLK5oLODduO4u4d4ne94/pUP7+4eiknm/ZbDC97lO8z67S6PYoXqE7YgEe1yfcuZE2cYcFBHCCy2ZiCcFMXjhS4aKPSittMHk3k9lDPXQPaLBXyUprPPl9apGQfVWqYNzq7Os08qt4CUefwqADtM//8JRZGwbF9+T0ISyPIg1e6K/z3hwxMehlIcGq0VQNboUPkIPQcxA1kbkgtcOr4G/MkxT2DmJz5w913Q7Wd1jswRzX8Q7rBNmmPixIkjeSIII1lne6iTVvPOvXADDgktPEwau1FZQRsuZbHsmEldPEJr6rncrZAeGN41L8w7VZ3U0yG43HA7zxX04XNkAZVGrSpZHeWz9PYuovj98AMjdEqM/0Z3lJU5fLOzu0EJsgZCxy7r1NuU+rWjuPAM2lAGjLjST3vTUBfZEoP5m7EWoK363mIiQKJ5PyxchNIJs6Zg1wovzc2ciYyrrBugbtzp0/BrYfWzkiOzMvNdwFsxMjpoGACddxhIwYSlKMdqzOZ6GFjcUh8zQ6/dmNjRUtaipyDPKdPISeSmGLmKfnmBpfyLDivjoU1TZ3uY+QKq2XTCB4H71JLin/w+94oX792VB+0jg3MtE5o2XsnIjVgbFTMmHBUhoo6wLG2UlyCtSuHLLmWLr2EkYG0fGDSbc8Lj2nqJynWLIWNLb5dmNHj+GCy8WLFN54c3FOXO8BTG7ohpFu94gtesgqLcJ+kZ3HZKenpxGcm86nIh0i/OHypeH97a6KTOkYOMoT5VTSkHtTrUTVN0QHsbmOJZsN4zg5cmy94W5w5aY659UePlB1FpYtds2aJgo4QtX3/lgahqB0fnrH9xFGHpq1OFLTrHDrrMSHo1oJqVFdz/LVZcBV8XsxkGfUOLTnUzS+qJFvv7LmItjoUyssj+T/8GqTLCH9nm/dkyui1sfhWpU3y18ukn84Kbwreu+ADot4Z1oe6FqLK9ki5CHLpW7lS8nBDRrKLMBxozwmQsu9V7KnjOHlUPRowUE//i37qeF2o/YDf9Anq6l+kdvIOa4K07rJRkrLolTLmPttKFnL4as36Ult0ALWcf/XxXyFl4rFf+q+u3GWjCmNZH1p6iJzTpXxJAJsyh3HsVZjNd1bLgCWPjk9IsVenFWmoRHOMSJpIuUXDrucC+zLhRDWSGmYxkpI9eTQuFi+g3dyLOvVZ9iIaPO2Sw8ZkSHjQAW6++luuKsQTSE5xQrhING+a+obEj8MRMKo+KGjWhL/we8zNJ5cTb30rboOmE5gGof8iZcx6AfVOA0FfBuHFAaKvelLJmyGN8My2Cdwmt/lfFrRP7XqFNIGWOdki4Ohlf86AvV5+TtyPW9nE9Tkbx86BRTXYQ5b+SMSXoJ77y7oQdSfuGMcrNXnYIINhZDRE9+AhYeBeas90Oj0etRgWzys2JRWfaSYz81juvrlZOH5RPSKtBIrjty44zffT0axDNrmnJrTaoMPOzZyevSjDmFUvUWt8gQN0LE6x8M4sTk4BomDHVXNt1vCV+3hrxGA58iWwre4AWAoupcpWpKWM5B3jeoYdE6VtvvbGruwcZuZEMYJ2d5sa7QF5/imTSTOaHByKWR0cat4zELcTADFVA047epEL6JdFlW8ymZBX4rZ9Z9VPjddT3b9AbsWImfukB01xOSHZyR8SHuuq5EPZ4w9T/QfbV+Wg2Dq519JynWNk9jWA98Dw6RpcIEhJIZFGurM71CsUOgY8XRGm5/McQyOIOL0iIU2LUHiDd4PNqNmRbWQXPFphRJcHH1VLPSJ5XlxvGwVeBAnPKX6r7jxs7Wq56+bsc/Z2JpPrq2JiObtqH0MnTWN7BlJ/FmtYX7G5peQjubWCdWUEpUXuKQ8MI0NYqfeaVzpTpKmwirppvX1TN7IBQ8h867u/RHB9+oZP+ATXo3cCv3QfB5TqIyyw2WjpSubcg3QkLamddQVSyvbdGQ5raCfj8QS88vrc7atbbd4rWfboKY9XPG3cfRgzYA759lW1AlB0iX37ntIVsphIBYxJoTSf9PN7WdRJR1S9GRCmTSttLmFgClG7tBH7dc8SAPN+i8sweVRp6LVXTz9GKXBPSNXRVfpv/60RObbBHjlcjDrcLQVn1urOh37c+Y3bfxxeq3tX6BO5namfQ+oX0Zic5YKLcZ05+miyUnkhyAcvu/w2e+R+0RjqjjqHPJ5FAdsqv2QdcStpg0UMq6pclc75ufcspVhwMrc2PWrk4rRNPTnA/kOQLR79+o/RYiK1StWv5SQ7vQglm63+h9mav4WWp/z8VQ0YSWj47YOqf9QFnN6conBz6b09xtDXRT3Do28xRv8BM8GMDfVkOtsN6Go77aeU5aGBPrNuut3usCfPnL5ShPYC1MvVliOoiqbpqIeB6MCxKFkcB03HppubpPZOpkBPsNe93nH4E83sHwgOJ2bJIK2gkYm4lhaWiqb/ERaEN9S6Vs5vkiR9WM2C+akTt4dnoavRgw3y+xvLNiIxapn2EOSrFiRGa3lxUJEetdr7nUxLStC7Fw/Rkze2kQH+B/ekv4iajBbvtKZiO3d1mwS32RWoLGuHpgIqR97qQOe/XE7dFt1frosu7noa50gm8P4Tpxr7arINCA37kxOJPcxBaiGCbFJ8ezhCJa5cEhNxzTwN7ckaEyAjSsnGYSWBVYH69X5uG2ykXqWIPK4v1vh4kTr3g/jpH3DjKqfORQr/eVe5/Qu9Ni9NqoFXbcOdbku3uNBsZ6dCC7DwzViQuMUaifTGG3y40wx0ezMNcRNIc5tEIfv3KLon3SL00S9DTwRIhRJCkhYQX1jIJygyWhb1i97tUWKR3d9fEu3mrm2c1+1w+9cNNbrZKSZwUU10QqmjQAWS/86nRRNZAdNJf+kNGKQycaJSwyhoRDAUslGFKwbVZVTtFl0z/LPuCruXL9Yo9Y8BBarBU6tNzuLvc4v31R/yp2sg6LHzFBdXKAE8bwCwAe8MIyK23VrHvwxqhXdULzzI9AGXElLB83Nkgp/SJBQKgenwvJa2t74Td22IRrNSUr+jYOTAWlIisabP/Pjnk6nx89jz+Ha91xs0/3YoIPvnjP1mm7CpO/AXj/iBuc3YCixdqc2a+VgzyurcDJ0YdfnlXrim9zQtjS8vOmMltVqkXV8EroAR33GV2j9HBX7A/drxLDYnm9lFYDCg9Fvyr4+k3u2/kNNeSA6BeYh+j8HX18EPTlG9Dnscf42pmLwePXd9Y5LSCzy8AqEaqA7AP1CtolxZL/WfYts3lovjhQNLCz92fcyXT6vjHxQqLhHdLoV6vjEi+bHGsdF1KW4Iixak8lbfDnYLv/qAMSBxdt7WFWRfXYqrm/Y/4m6p9jewUkCX9GlhU80hUVykO93HvKmrYel5XtTSOq293x+zpC5vVsC7RQbpOuuJBDaRKq7cOnTTJVMuWRMvHRKKwmuBpA55UGWb3u2TtIpOcF/0m8BLn52yHRvx1UjcEo1sri5o/uEQo68EU15tmSzAbgX2xD5ikcr1DNPXWacuAa0SCQLDAQuyBeX2CNztIQp64jTTIPZGJW/NHTAXSjeDcsfnECsMEFB6mV6/JsKl+t/fFAPdBWPw1JYaXppt4T13NZ+73x/B9ZwTZ+pD7eEIll/D8XYW4vuWtB2gWtTteZGaoaesZS9XQtgxjhfZzm3evWsuLXJzDOGKdl7wKV21RXqLoXX2bz9v/JdRfKod2SVT2nGCIkNknme0HFN9m8UMxbjX3ZSQwMOqd1NA1cik8zsgHzs/tsqkqby0JOQh3cXoKTfrionnNm+gLO4ijA6LWLXd3deeWWueObF9kh3jBGhwqm0cXXfb3E8lBsL9cNkV/nOQMX+7aia51FkxWzrDtJHTkyNQH8mLyfxjrvNLeBCHHxy2gWasKULgUtVGW4nssTK6XGBYrhQ1wcF9lHlJRxj6w+e9LjKXu6aPfZdM/eeAQx9m+1ahZYC3FMWLpbitLoQBly0QcbnqcdeoLx+6N0nBS6HRzEGjgR6bbJXcSLEq99gQOvF2KHdlXCzPFFsmdn4asnnfvnW7G+tlAgsP/Yq0oCapmyltuNMlSfQi4GCCiQwcyoAFuw5EIMN57O4+w9esl5XGpCLYmKC/eZ8GByZHtpm/KgUDOtaBJ4WDL5811RmzH5k17IO695/9padlTT3/1YnCuaJa1nKh52UIyA5i/6GHjoe/54AX8VLgKQmDsHUaTKnyjhYXfsqkTU8y4udmPM8yXV/2nHp7OF5h+KQwc6cqhoj9aNlfTGwV/mK03TrBELB0rrvet/dYyfBi97bE40sJgCB/p0Mxksdqy9zLMRpwLWCAQpBgPkMD5QXemvPBr14P57ITaP6iiCnUZabsk4L6gZqlkKtBb3goy2WL83FuTZlWIWnBiHeqL/m8ZldoC8SJz2nPwthhJouvoJ10ppsSbwxVTAzzJ6YN94iz547SazCmaB2Ojk2nIMTXKk3KYpRhEmIyQ9/mrDPCJaTbLig9KiN9anJ2yA3eI5uCieb7U6iWPVlhh2BWMq7qSiGKdrZpVggxKYGt9cwJL5p7IOm1LvwTvsRWwoueS6zXcdFojx6ER3ZNhsemJHPjcdtPPwlFMStbr9ZGZYwaJByr88hU47EROXQU2v1l+uMaJO6Yqb9O7HzecxrWwFlA2JegeSBWwY/BztxHdCVLMzFvnaI5O06mOziGCJjA921gHSPOMUapD2ZFOJVliBbn3x7yGK78GHdoPaKbjqbzY0Z2bvuuJndvQgwVwgmwu8F0ekhVd1J80nVoDNHOGYkjrInXx+ewjKQM6mjg5TO0oRAYL8wfBhd/B+sCpX91iIvIHihsiERM7p8SRZEdFbW9/0k09P98aJStW/BzEOA4MEmIf3/VSxTz7cTGQwOkD4AzETv+buLP7wyBKuFB1GzCK3eoJ0va8WxLYUnHE0UJtg8xwONHgO0/NxpZn3JSRAt3+PmVI2rH6NBTck2lQ4eNYSjni0Vfv7o0wjouiLrqfGN1vRybFd0e9ttKTcG28Ws35cIEbt+eT2MWte4l2qISC4uZ/PJzVSfZutlfZ6G85OMcE3ddvTwARbF+rNX2rrfiPnSc8qtdCOY7s4j7PJJSPUfF7/ZqhWD1OcTcBcShPZVEQs80TEqabHA9rXXlydPtLcMAKKZLqel9mwaPOUTVQdSINl0tKAAPZ5nqp4TLE6mkLY+DZVoCixJYTKDMB//C+6yengdYjZKeSQfofb2oErkbGZgHVHSMpvknu7tMCYxJt7XVPxG2G0J+piLR0tTcAVIMVixvf2XkawJLT4idvxv05nBNaTIw6Bzh/AQhxDGIdK2SRF8FjKTSTU59S8IL/JiYM0fqBy2UY0IQt0l5Rp/xKESfc40almGLPevRvJ/p1iKwR57Qbmv6vswsCreLjDpm+tUng9JthMfZxi7XCpcEEbCRWNDxbbrFQkDQ/rzk7mlmt410L5XTmd4to36GSD0vLkK7P0EolZNwNT8KQpVV24iTpsDRJ7UoxUqKGtHa0QNKvfs7cYX54D/iRXL34rFO8OgaOK6WUIsEMVv6f1EnIPSr76cmA+CuABD5GPp/h4+a29FqnMPjv3NlbFjVrtwy7unsob88BFpIE22kok7qlV0QwoM1MkMPaX11YIi1fJpIvLKSP0YeBPFprn5C06wxRVYZTxC9VGdTmSLwOETvAGcy80E39b8ASSc6BRDkYnQgjhYK1/81k2y+iM9izDMLCHxqHF2mHdy1Z342KEIg6aSTFh4yTHcy6xEFph5vZhz1kf2m7HNsIlPJwmQPxtimHZhQpMza39mADBbzI6LPM2xWulNPR0O/QGIlWiqXE9zyDOywEnI+K9pxLGQuuHi8aDCv57nr0m2Kv2hJulybJHCQpwwxX80UGfi0kU9cIlymVl4k35twFwANKzI3Jdz1wexh5GsWixkJchx7VyhVeh+syfLpcE6wT6Xvka8h/JknGVT4ye4FmBqB44ZrOl755714TmPm4cBxCEkKcIIuGax9VoxYRQ9931fqOu58XXiadZt27gVk3rt7mOW3Bysa4IAC8Ietr59GFltmvNJtzfOQMhrEXJRSMusQBlNKpJhf/Vc6eG6z8N0fIu0BgdltZ0IlvLOZ6HTcqcbVfmhzUw46VFrRPenMxp1i3WvryPRyjtG2I+4XnYRYeWjpVnIJSU7TJIPLPFimdj77mBzq0wUbFjXYYCyOkH6SYtIt1UYFXEtz8t17Aahef37XDqMXh/qjcE2Vdlq0P3mzfgxkWzgKzBf1sK6ZHEdbIkDEZTd+Ve9NWoX3fXY4+KJ1eY1gcK0+IpXGL3WbJTSBRD9rD0NVmYribS+mPtiMO5KvI76dk3E98w1waeEQW88iy2DRBZlOrp/6kElCBTprw6go/LJMELHeqbXgd4bb0N1X6ETDnjMvLYRC0mcOW9GNY783p+qdTPQBIB8a0V6j/YAosfvqBomaf+Dd8CEQG8HoHtpvJMsSFYmw3LX4ynLkf6DMlDSxzYBUSEmBcmEeilHVBACk3+8j4UsKmUq9H1FWwlnDKviD91PuQbDrUAFcQVZhcErEWwHwE9fgJprpa7sHIZf3/co6IgqXmSuTDAJIS+sWkpFE2yLqv3s2ZZU2tq1+BlBsmxsEPU5g5cykN3gt57VhwPrAld5u3M0tOW4RcBpTJPZ9M0yws59pO1ONL3/gUnxtqpUseYcvFCvNBYoLcw64LtTBR9121lnROPd3BYlijCrCyEpfupB8vv+hJr4BkEtiKErwwwp2GHQWvxUauRnHapABBWil++DS/fn7OajEVvivTohOpzu9fbb9b8KTcmKlPm9T5X/R+Fmfe2usnn+q8Wqx3HeZFvY3FDWey1Y7EUrorr4DX0PizyPFk/QK//UXwKQx3RGL0OgkbCJ0d0E+pA9HAYH+dOgjhcf9ZVjBCYiYvIRObLOMGhrT/klx5pm+sXH396B+4XR9JY+9zpDogfhR3amQlIQ2YAu2RDOH8ZQ8m6a/mCu5T5nFeJaMsJhui0caQmW+Ax0EW2j8bM0+ybd3Yc700lDSfQ9aukoYkUu0GtW5dfStFB4lasQAj0NPBAzZ87AQhL8hlZZ9RxnuQW3Yk+DK5kTNKCrOzEU6NdCHPcEhohe8zReQQDCW3wlsooctno4/36pYGIjqQiy6pLufm/iy7wceuFtFnUZbu0D6WqQ8vqccwhC5OhTaPah38CnXjjjY87Lt+MN3PVMeHBc2Lc2ht3k5GBDlJ270QTyMwdL+078tPzyt2BGJ0e2k3mncGLkn19ws0sG+JK8pr9yU/lb9TgCKRqKQx4lsGuhGu7PaVWAEctMX0LaztUSitiiyQD9biDo3oAmcSigmM5w6UQBkpKtqbvmJJ8U57vykg7WYP8iEAshzeGcbTT/Apl4bC+dFyYQnzDUzsZUj+wUEn0iiz08hNfQk02/PLM9iHQef8vdgAtj8+a9TvGgH2sKl5LKkzm9c0TwC4PmGpU+q6H9ZJ3eF/fuM9mgkPHX6grMYmg7IUqYuS8RKPdy5sOW5HaAtsFnfZFP0CWnqZQQ4jfp4eVhlL2RwUNgyC7u52af2quD1oJ0Fb5MCGL3qfZDgu/g9mhsWIBrvCz/C13b5ScJrC8jGSFjs5vVqZEMeNPhPMSAgKFi8J1B4xfBIN9W64CDll6/+bvZCndshJ3bj88gWdYWSm8hF0l2xfIUcgDMdgYMw526Upfc3O3eZfnyRf4HWfBcrk1qcVwptvsIXnRg1t6C9lNAI4QFCVtRGN2jNUTzKS7hTadKjlV7no+0p9lpPXTSHTnwSR5VKSlMF1wfcx4uzUOU1cNzSYcx0mSpA5M9AoZzEZONExOmpfSic30ftvL6JvhqhxFgaFP71FNNwJck8/ekWyMMeTTrcVOMkgwCmPet6pS35C3UEuTI06nCAJQp62zd3c6SGYYVq4MVq+83vfLjpN6mR/+YaejI4Q1nkmOCvJdSmiTida0SNY8VoFQFNt4mwCdnZAR2Zt9r5dlbUSOfjswx9lGjnd2nS1hXbGirhnwETj19it3csxZmvFKkay8erXyPuQcIP1gbzlwEQW15Z6Tq7FPQeHMHzxyqE00oQ6B3Yz7K5pXKqDp0jg61bupSGiQ/pt7+xGn8Favzo+9lFbDi1xkfvR2/hpgRsKGGQB1Z5ohs5yFW8OYu4KMKpBVWzQFHXvceaSI7Wx7iHSFrpWnFac2VUuiIatQsIvux5+qIoCTruwBVWMPdFlyKD5W52xg4zVEI8jnf8wPN6MYyvtvnFn0nA1DGV+f3W7aeITHjxxiU+2FcWYqetLfvOXu65zG9qls5tLsWyAtqL4LiXvJSBh3nI4WOO26ct8MtTr+4lcOhBx/6oCG94rL5fCKkzgx0fhEEZ479nxOTVjeGybRJz4e6+FCFvSo40f29560Wa7sB4keTdl/aIR1auGhNPGgjJYbJbvb2H9QiND/7XUxzIu1IOSfoPHJnfbVT6jIxp6no+6XwdZFGBudmLhuusn/9gm4g0HIeHl4lFV8qWg+VkwJk5iS8CXaPnh2J0MOjbjXkVshJI2rrbXhrsfo2lQyi8yfzxfExTzntIwYwygYbMqLdAtzky96KOCfaWwb8zzdboHLyWBrux1Y9eJQf1w/C/4fVsAzHxaqBGfhnUK6H0ts1ko+2x3vshPPfqO2OIBXd+fb9Q5XBuNtOpeC0zkWAIKC3axdWxSElGTl2pVbrsuA+16CbaGyDQBEdvC84hk40QDNHQEaDaHh4pRpd6uGC5eO0f+xF/0nXqw5pxjxSRhA6Xne/shjrDLA2G/AhUH8I8y2KQ2aXd84m3j1/dCsLImq0JcZI3cleUWtAZdloUled4T/p2CWZmuC/sr0Oy5vVBds7s6L8SRryjGP0VbnQan8oE2a7spMtLvSXBM5xQHtQpbsf3VpuPWllm7YUsoSgI1n467twrDRW1xqjgFAUHVdvp+V7rdpHHFlc4A+NBwy+s5ZCxJyWqhFRqPrK6+3XzwwcNKgHSMoFMqdD05RoQsErLvlPIUX1NNsLfwRuKnLT7VxJkrMzGDRrVBnh1Y/XklaFcz1Z0rBZWgREyX/KyPKyV4Q4X0ZvuNcWCRBAZUS0vGX9ZZuVuXEn2K3adbHI786bwI9HRhAi8l4vKWswbduCVZr1JplC0bv746UvnDn3y2f5mSensC6Ps/akw571NmwghhdoCepsvre0nxZZmqMWXdmO5H2HIw0syHA6h0gNgSwYn4pEW+HvaRvvcUYpTci1gT8po/7QGJ+l4MbWFbJRZv39cN2VL/e6CfMbq1J+kTKB8ZTd4V7xqX3z7qu4VLPUaPcklYGS3f/ZF8/+HPGk5ZL0sNP3+l9eKfroqrsP4VxARW14xU/yJzJv5KxVW2XMLywOtSRKodbqZfU9xVAi5/MYbuffD9zrNOHcg+pIw6JQYYDw36a5SumOUfj46sSmhT6sM0iaAV3PjR4zL2QHkoLrJoRKDLbbAHeh9nkA6J+Mj7jgSTJpKx52lfbxYKP40wCJQTd52c9pAzexgRqsHOGCiBH49wgcDyL+4iWpLAwMj33Boi8eVvQU6ejGrjnO7d5VNu3RemRBN6amhWKlhGx2jdLqDeBpM3/ZhNIprCsYaKWJhlBWZgD6bYf8IworOcK00RAMNk0go9R03WaFWqo5rMXk/UXm3+63OmkexxAeNKN15LsD2lVMPssC0b1wYh5AWO2RkYnyxGdlcKf6iioasNyEPdMHwLTcfjgF1a61QpfI8Y+1qliOhUrnOVDSbK9JQOopBl75TUka51Eo4wcjn4f3SgUFqGOFF+JbRwTDtntXSNcT2+1iLq4ZPUMHh67yNQDIQMjK6C17+0ZyRhgX3WRKj/J7PEr2/9/Px5Jz2z6DgR6mgfvu8tWjf7GlY1UdAeiCyRpZxIK/WYz9stjArKli+2+jbBWicV4FXd/3vLEOkwN49t+ltUqThyd7csTc12rRn1e5G2WhXjHXw6eNqGFNAvdkkpa5SiKuFEdlejAlM973dxFg3ZV7kzkAkpmjRXQqWfZgqw9zSbEy9Gdq+yEt6KNvajIMDJYO0lbv23EFZpc8v8qyhlcIf1xooK0SJtQBXmKP+BFidia7Gsaprm7QSTk99xhfTs/Tus2ZgqQExiYyWcjap+LQo82mSjcthxps2yzYfsg+eqgZMa+0gp2pPgTxo8CpQjokiyGs84Szhxt2vBP2adXGqzUXI1eHZtFov3/wm6KqVlhkbfBoxQHGuTHDquIvaarJ+1uL4dTmMFW6qWN3VPSbaLtOz6SSFSUoHrL02CqGVits/bX5Q55rb0fX2wa3fxcN90t2gNJ/Nx13fC2+neTpDQtghBINZIfDciZMine0Tw5lI4R+tpV2Q9g3kFkK1e2NGb+DtS/ZPuCKFPooQQccAthVhHifmXwrz5dVzBsaPXhDRjlRFcNi0SU5YBdm5ol9fM507MCtclh+LAD1WDbT0eKygV9af5WmxKbGOjvZA9auoH5MNj6s8Qx4ShDeHR+Os7trf3e5gRpFqbBW4LyR4wSpxq+Bmsxbxl8enC0Aag21vj8zDq0OVq5z+kbcZ45rrpTji299iMLuVDfMazWT+4l6tLF2lXa/ZxZtJcSfnWejMAMm1Z1f1s8B5HUxAV7lrNAzu2exkKdrgtV/4Ii/N2orqkfmHM93RQZmTW3g12vXtoGzXQc40OZEeqKVYxSpRA/EsSJxTXXlRjJjXvK4L/RS8T1E8rmXKQD2drxggpKCSPr5cAp4z1cC8mvMycHr7JsSauezbB/OkWLua5Nttvwc0dcYwRT2zF8Y3BLgC+mYsYd/4oPJWyoZBAemInvZjzkam/h2RtyNqLu4/IKR6cDxjZ/hFZhjBcWwDudQi2IBVqo2TRfEp/H63m5tKEHBvW7nHTcC1/pJUnnDYLOyN+Y7AzMncv0pJ3mHNYjYLqSATrnQkD5YcneAubT9s0wXvmT0kwtaUhjGPI09AJbtPN9lEi5Ce+cUC2GN+pK3Meg3N3J5dikv02/n5fZXN+03QUJNK9hv7/HrsKhpgf6KNQZkujTBd7k/lB4O+AJLqzqEaQBE7ta1WkwhfhosSj+oA8P3gO8z+8wbDfzJA9ksDfXh1dcFPs87kkfK2ng6lRuV6c51geds88bhdOonfFtzdBwauHFFV5mPXRY2DE+ygI+Nv1ZexXB2bxKO2SEb4r5ui/+MYltm+qsWZzhzznvQ44iPwR/Iu805s3GiwVB1+pKfWpQFnrR6Q+9AVcPFHZhz/YquEwhGmy5Iwc9ANuYpxOFJMO4e55F+t050Y6X4XBTEb3jQZ9s3dRixeBc4Twj+p49EI3OJOQHo2O+Y0VHOhSk0qjyHuNBcWGsQ1NFEJiIT59K2ms5hZ+Fs1nM4nxFIOgXVLQcf+b2UhFQomk+3vg9l0eSVulkLY2M8HS73WzXHTek0/XoVrJt0dj7bOimtnD+HG8kfCILUL302EASpaONsHOUpHFp1eRLfKMPn27SH2Xd1OXAFhsoqlnBs8vqWbAAe/XcGLoBr+TID1Q9McPnBQ7cRh53mjAMQpjqLK/wxq0nshO4EmMiUFD3yOzoZzO5nr0dlZ41VuU2OzUKHwuILou9jEzMnIb9o+VK5JRXj6BpGl6jAiKs//OqVtHOfxX8ufYWAfd+uPOhE0P85V2/efvBn50ptEoAbaWijtIgdAvMAr8RMwjSUBat4MVekMAHE8Eeo4WW9a3EKp/TA9Y2lQHj8iDXpjcv3POkxRiLD/L49ehZx0nCM+m6061whqcuO80rn3trFzBKHNTtvC14yBvnanMMZqS3ZyHRbypI7rsC6UMmzMDsq0fvsX6/oYUPX2noYWp4LxQmTniN6k/7qRvC+dWr07g3DKW53fYQEf4EJq4eLKsIHONhFZYtYw/GQBw+SNEyeFQcuT6EAxppilSu0oysuYXT3hpqJDpuWAvrkTCTB0p51JKlJ1aIR0PABLPSZ4cT12mzUtdwB7aNJ7IBsbeaV07CvN4JP+pVvB6inNziLrx21Gv9KccOJpEjqO7PcVzQjUbUTYQoLU1H/isNBnlOAW8jCnAkGyQkHv3K4SrXDAiba4rd4V6BGfFOSQRAB8V9+85sKwaZKd8aO4RubkToJPfJkaE0gE+RLGjThhcpwwrn26QONZHwGZjmnHBMF9n77R5HmOzOjZmrAEuxGyYjMClxAGodW16xBtbC5ERZ2uzzpKGR6yh20LjJPtHfMERse6vqu6zndTJV577OhXQguP4AUEaehJsDLHdcYhevNTHR4dE7/XVx3Wc5y8INPjmIHLLxmyRyWNHJX4iKjDHDHpmP318XA++ATu8BZ+wy03VYqj/dfUj6T0GrwaDmEafpWenn2AWcjkaqDgBOx/yiCssfFycAjp/rq+4SQSVEqQ3HX92sH9ZkYYz70Yy1YedqxsvXIrekxvJeBnqTM4HQDWWdF5Yh985S1x9bQad8lEqvM0TMKMLcjm1cD82VEEfeyroRroho0aDpcN2Vjr4kxrPDCMSWcBrvGRTgrY8O1sQpS/H7yDf+cRaXnm5jtCPBFXB060qw/75EbYKKRaXVgNJlwnaXYWRakoAJNg/grCFWTDWaU3hv2qP+dv8tnWvIYsrLnQT1PbhejS3sYQEr+ggsedTM3ZmV/PPY96TMi7hUdATxjw+hi9fNscQW3KzrIITYsxTo+D2kQ31IwnFRTVUgp8oY9Xc0YSIyktZY6UoGeCK+zRtoYw20Da2tUHygbRzFVHCcubGtledKbv6lH8ybqThq1yiPVSbu62weOKGJRBeFjpcPMDFRUlfKUkCqmmPojxwdYMT0v0kBRlPV9LF6w0iGds4FP64WvdLs/BMZvdq4Ez4HUYDOqOUWSeX0T3stoqFRxo/8/eMTZQ2jtOBfuy1JSbL+cATDsuMLLh7R/1Pk7Lz58pfwsYIAdSFoY+eEDTO/3X7se6uKeMC69NEfUzoas3F9y61IdCJV/BG822wac83VArysXX2QX8CJU/hyU/7ADAnwVnE9egd4FJeKmSx2ml1JJEnKGbNMKwzwn0aCrAzm9o306/JY68auLJTKxmPlqAUytf34q9C4fIovA3CpTkCkNvKcop/fzdbuI7TIZ9YqzPbUarvFYuHdNHBKbOEtvMnrudybSqnsRgx4lsjR8iacLZVWKC5BMKJmxOcY4byX1hucB1a5cujRqw9LcSWG+ROpu4kFDs1JN7ldu+8Goj0pi8qsME41xseEGis/Qbp8Bry59R+aH5VkAvaCbnFDcAhm0+iP8UM9m5/q8Ej3a8sxKFOiRwUqlg5IFyhJCIiCkURch8mOO9tYCG0NLhQFg7+pWPlqL2CBq7LquH1jHeNZjRpovV9BpnzjW/I6kySGfYRt1TKu5fBMf+zqXiZXJ6qbDTMglOLBq54YbE66MOjTrvl1R0U+r0xRUA+EppUo4JkDUMVtvxxyHHmX9InRjfJ3P2H/3zyUJQvcNkZSzSOIermaUvVnqh6MQkIngRRpRLZ2E0/oFYJkGk70cTwEZ46NoTSP2vPG8Yvg7ziZ4e9rJuiLFMK1OPLcvoweyB9tFYej8UFQ6K7rYennYI5kUJNbSKMxpJ89hq4nLSHO8pBfADGo/HpdL7UN/tLzHcO97ubldITBtwLl3znd8wMZmA6+aHbNbJ49awFJ+3bTxvOJEPFVW8TtaidM9VVHekIw/ZER7Esmu8k4FAOx24icPVWNZ/q8XazhxuVKG1z3vaM1zgtI20eqsL41BPHP9p4RmqYQTwzWfm2w8X5+UNHnLTj3Vlj9zZFYMDpt8P174u8EiU9VMBKf8A6BuD727IgE/i5RHJl0xFcsi8TbrU0L9qXM0BtGynOl8QV4hh0QWHEEGbRpktTpmbwA6veRKbBuWzUONZrcOTyfj8AuOL/WtOQdPmt7OqT2QDCVOHyDMyf5HXH86WYKihmUY25pLRRbNjsnZ446vy22vVS6m8kOymG5xLUK6Pa4SAosqZuNgSmAeemZtreahmCbRvMlpqsQna0IYtmG8uGGjmdXX5YZbsZ/JZiqao7vAA+3ZbSIK9IqgVSUIrWUS/hmuHjVfugCc4tbLXwfP7dUUYZReEuLt3tcWU/O8EicX5eRdL9iiUJrDNSnKQIXahQssEtOVXUHgW54H4IP7dz+oZ90gthusKcnBVfA7BdwrgWXuqcEYbFH5gGjBktbUbfSyYAfn2w75PYUSdGWukrm4W5mM7i0ti5fWMFbAMGi/SSFgKYrb6u6Raaog7SH3Q2PZUu7RMMVX9fFqCwiNc44bb6fcODidsPJoXhQ+Krw4Yy3GetMdMcuWKELjj1f+Z/4mwXV3pi2DSeLsR/DBvvU+rMGNfRG74gKIkm9xQs+l7nMKB9tp1ybA1WBD8+L76sF6y4QiTnBGzLIcDr4Qn9EulE3X7nuR0u5xMRNJhLZZZJniT33edZWisxyQcyFMdiRYDCBnXqX9LGBbfpHIMcl+sDqgR/2M/kj1PY1HkbNNS7GI2BIYUqGIbuS4Zd0nJYxOuolVzvn6ImwIUmu/J10qvjPZ9JdKSNCHVDYngqXu808W7FndbEnAgWrbqaebATZBUN1oExVArz0Av5ZqDZ7QBXBYVG9t02Yj71HXi0OP32MjIHIPQk958dXv/jRUTm+8yL87SDXcg71+UVNSDNVzuKBxE33mPQ7+APi3sz/1VupmRV1VCcv4NHjCR90qJAoMqzsrOmeVSu1rMLzUvUETkkXtb7ZnoySNJiahLCfHbR4HI4jPu+JRpoy/MSwvRva2pP29sGd+ZFobG+MI7aPU0VMhWSiP5SrRwxsuZfxa8LybIVPiUFNWhsdgIar81oKoomONajnkbtoD++MCQZw3MkXF67/vELpnEhZsjYSDXJAA0/eSffHqIK788AGN2toTk91QTyV6SLhKLkl1wv1uz45UXo6KrUoIUqPEWHAHx/TP77vutMmuDdwCMSnLec+JA6L0KUphYRlucvPCipibzjX7l4sVw++KHJ4HUwRG3zIcgNbknB8i7e3u7c+CjW83xNtBs9qpNPhZAJgJcp5hWmJJqtEEedgDl0t2flOai7fNTbOmB10gE1Y6a3VpOJ9Q2JtOkzft2Iw3AeO6gDVU8KkoBCmE0mA8cklirF3uMGAPhpT8nprI8ywJW6tEBwb6sqtje55Jj5BRjc3kFKjefpYVjALO8pNi1p789Lg/1RBEcl31wmLVqFmLat3qHsP0LKvsdabBkRnksv72hGfCtTrcIUi+2YflL662gIIbF9D1JXepAzpH9WBQ0H1kgFNwNLGQn8a6uUsy7Q5JtJBAJ7MVAcyN+xpqZZHnb8AA20HvXOC7o90RXptOU/D1uhX5aUcSmGK3p3MIi1ieMP0cODhZ7Tan1f0ZpRdS3bN9huboKF1c67rBuDA6uwAfcmEy27mIGyIp8ZtmFnv5HKlwSC+8NtlgOVUSGKzJ8yqAh70ELIQnWV0bI4+MYkP9kPcE2t0b29KjHofM3ryzhXPQBlqYGE9SDquZbC/z5uSh9j5FpA4WioSifhU2X2Peno6in3IBfMSFrEXfzhcEB3Eibb+H96t6uc7CLxVie9xswfNBTkhKsHep/orrX0XdYnUhMFWvlGJ4uNBqsuPbjecoL801hl/q93R9RPrU/hXu35JZAc9XzGUQk3zSaBqLePZUWzPFLwVpfs3RUz0Srz9BeRhvXBxkrXSEajBkP2x6zPysB+dIIvLLv05GpPmO7Taimj7NX8zkDDkMoM2NCUozxzF5yu9w8Zj1JxC9TztxScstHF83tk09245941sRaU8W32IeYD8lNejFkdCXlHoohncFGA4W21gm+dbU91r5qMLKZhObUPohczbHCatxQmLmv023I/EdR+Ak2cpz3lwLbqDyYOxOUILqIgYklhtcsGWWQZPTS56BFrCpz3QgHPWX7LzdoOsvsw42gxPUg9iW9UE6IEOV2iLcY2URO0YkqAneOzUwkufJZ7nKUhOg/l1TdS5PJm6PUfdQCGhveTEOXG6IUd2bDQgKVZyMU+/dHx1bCoSx4q3tiaXLUH4fnwiKeTpy6b7bzCHdiMJDzquAAQEGNA4Q3kD7XZhZj5IgzT41+sUTFTBq7+7Bx4uG3SGm292yMPiyVaWWdKarT3haMj8Ef4M7VvOyzpEnurZHdCUnEi2jGCxzlf/O0tCc9l3/h2UttSNehCKMf0UeoKt2Kj3f98n5CuNn243yzq5CWZ4sNDdFs//r9esF7WeBmvJJrTpNuheyvK5GYlt7fU1z1xcqIngKzA4TudgDB++qq1FSX8wLHC+Qk/0OBiMVhMZzGAEA/Tc82hvKf47f5C9v8OjXFQgmYE9fFxfPX8ew/x1lCaKd7hSKFapVc1cDcR4sXFd3tC1kKdEx55yjy8S7kO9p9KbyJD2CmAltsZgcYuMkQvuihh6KOf3zwTdlkSci9mH/IEUtwtKu2jZZTwNb+3AQSyQdyNzuazK3PRjHrhdWxfmWUZVMn3eBMhkSRoGA9dbovYqO0+WoI7Qboo1JjKuvYw4DBwJH2X8b4elD8ylOADR2Dkssj5/7oDaLcsEhHJvIbYm+Df59GXVlcH+3gfzN8UnTIMd1e6d2z89eUBMtNA440ALtDZS+eh2Sx8uQyqEyf77iO6BSDZR1hvspVbGA7KZfdRkQC7U0c2r+uEAW77A1RH7m0xIkuluvHoFdsDcjK55RYSaT33x97BIC8nvHkbGhBWiAr3xRiiNS9DoGhbLudllWg7Gku83DGdJUi8rglIBwJhtBVRcZyBHVisHkK4VmFzIBioReUyY0Ra1QDH/i+tEHTtgcSq7gGOkOLKIXeKLjg5tTnIIRUe+Wk3Lj22zBUV2wAzgMZhOfa4pD7+umSaQ2uIWS694FklNno5TTNgnu2qmZaQA9FIVbcJ3EVlDkr4WWSmAnArRotYJrZBZ6LAdyiBgMklaP3HpZUYnnxEs2FyKlp+Mj6lZepAR1tapZTh5wqKPm69qysUkFVsj0p3XX0Y2ygLJK1YDNzl6cTRGqhWlUy9tB7h6SMhHmWVxV+HQ1Imw+PggnNnqaWjAtxkCcuiG1P11Tot89tsFZSwyiYxZcNtLdNGnarp1zurIYGQlSoE+rQdtwa5F73x5v4i9mQ9pHYNntLboVC9TA5dcFWJ8jzf/YO8hbUwAYZSEtWKAY/boLl7SKi96h93no8wrNxNO7OrZiJfbjtRBQD4CW7PCe89bqSrN2kpuJvxPzm8IuwqEYqDvzBinBo0Qc2RGMcasSK9o0KgTKocd1pECwA6jJxctKG5Osyk4y78ahhjiRv2B9RpTj+7ywDs2QWH0EobqrTpzd3KVozLYnmhx5hRdkHAfcafkCDWpGLmNwrRPM1+IF+uAsoUhQ4Cj0Wgs+gNMoo4Y6Rll2cg2MZZ2Rj3tYzt273pm+J2twDrZ1HVpFh6yxLoj6t3YNXYqa3NrpGwvl0N7z1jPLFl0IDUYOKgTwbIxRhlffZndpSQISxCEltgnRtR6FiI2cOphV0RJlS/9/MsFnMP8kIhGpVhvtSxnInchqjiXHpZL8MsvM7hmJwU/d+AKyRyvW+cHpfSbuBSEYFwZtsDFvtUFEvR6sW2H2xINbJuU4q/zCCJlMQWvYT7i7K+QICW7ulJrwEQbqWWIsmkli1qR7uGStkisI5BAqxgGrwc0h9hzdRCYY/sbDnnBPLX1vac30ithd6lhcO9Ul+iF6fA2d3FkfYmFd0ats6HxnMFidIA40joYq4oLuO6YuDP4hCFz7eJ9b3OQEVZillIRWkJWcXSgeWJCQYAbHSyg114KqkpwvsxmQuQ+zxZTR2ZLKp6yW7jJXwGLY0RkQHF8L99pfz9OfRGwiTAfUU4zhcNZnv2Osf03GjB2a7R6dUz5IfNzC6rG3YIHjeVV2M83tX1fixeBBTZIr7qGwGHIQ/zeusLO6MsCXuw5GE3qIG/g77xhFkogkhFrHvyGsYk0cjhxaxZiXxcDHwvxUHJE3jbrZF/qEAsRxB3JCNicEe+dgI2PF0eILtocc5YtE/uZUohpDIDsqxAQQs++rupEvq1LJ1JQ0/2jiRdjbxtNMqjg0Ml2OcghFZKg84CbmkoPOc1Hy8qmARsdQbJ5VpKOHMka6wdXdWHpy5dJ1zAvRZRI6p9spnG4ZrvFmzgGpjnxP2Xma/xL9SeOArA4LKsI234wrx5sk6sVQNT2SOjcqj8CVLi3w+W3doorOO6m83xkYOudrtI8lo77VzSjtzRF8RHgKy75CkvL0FUXCqBoTYxpbYbz3NbXdvdahHgX6tVm/AHKI8WlASd3xxU4oEAttw9CrxD0x+ATnJwXxFYz3JX8XOgwcIosBUFmQTZhfObi0teP8jbAK3346+TJ3NZ4sbcwFldjlzFxM3XJYVycbPnwUMPCpDebAm4ZyqRxn4JF0d5ocaRTtF3d5zs31Qt3yNjjYcPbCgwf0ASPGUxQkKruZuSTR2i4ah08s6IdxSep+DsxZhMPYr74ocTjDTDw5ZInb+0ZK9bKIFKqxApsMGi4IG5KK+xUHIvskGGjqlrdzfntE83jx4J2rFqLgNk5Yp9fkPX+p0R6ntL78DtPKIj/VC8j/sxwhrctNOI8QGTi0nojigEQ7kH5XN0v/DVTLlLh03ZlOAxmuS4Qqf7/F2fwfHOsWOZ8pU18md6++Z8QoPzFNncfpWFEh2ohqv8L4PDAW8t2t4Mv1G/GtUTRk8hdE9/mVtrfmUiEzjIEkt+nvMwht4ttBEmymeby5kMv+YmNsR8uq/1cK5rZMpBpZHC9FTueCzDyrMEF8z1t5sRsUa8YHg8OJJBHX/arw/4Cek6eAD0mh0COK+KAI679ZMAqPr3QHp/e/2dAgFArISqeXgx9fkvg2/e49GsoxifV+UJ6Uj9hnum/y1eKaz+mwNmynMqp0karehbURx4FGDN88zFy8TTTRn0Kvwbnr7djPp1HCPEHpBL2DM6sfPoLrxBmJu4UXzywy8jPpBfL2R22maho7WsYDBdoJTJ9vq+nTxYv1fIAftC0SL0lgDc7BjIuN6HYF/tJUEwmjjU+f2+1466U5yeN78TGhnK4k6v32jD+XpmpjdJSVzRy70L7B89LxZRV1u0P/mGHFYtj9qavRy5+ukLvkFbroDXUzzOTJTMK6P0P5nQqiJa+bq6Nel7ehgtPolZv+znfX6iLotDmIaORj5SCgEnTQziM2mRoEZbHqhvfEHVsX24QkoRfCbOY+SE88wy1Iq++IS47chIKxXIqR1a9yHjPUJNc7OvhLdTrhV28HnH5R/EK7kJpDdfIlNTxrvSYCthRC1ytOlQIW5M7OXFzYjKchIJJbxTd6D2z9r1uR+Sw1L4MC+RqYfAdjFb16OfFX4U41lWLri+IjHy/ViGh6ObHdthLBJB9Tvrf+Vd/7yumzwIgATjDw/zzjaURz2D50T7Vastd1W7D8854se1kYxVJmyJACVD0mRVYJqrmL8yFszfEgvIioqhP/tXNoEPtXqQdJGmaOQ7dLHPsxCCGtJh2j90Ed6flH6f/9Yz/9q9L8uqfKpiLqfjBjUq8ugvYKNZn7zw2qEG+goI/kzms4m5+l2eRIWykyIqAjuR7PAhzRrwzCO6RjYRcYd38rgvpO5+7ouj7BzF9U/cnHsLReSiSuZGPl0o5aWdmq2LBgEVWt8z0Bh1Lsv2XQb+ppXCRPB1vHyBsjHXRrsGOfJIET3fj0On14RklYW4SROIEfDwNZmd8Ql/j8zNZ04XQmYQqqbzd6wdpkEkzXxx5byZs/1GR8jtJpw4J28shl4VJBVsYtmUhqdX4q5Qoiu4JscLFbSzMZBmCoOJ0Amiw3F2cjINs8Q+1krH+z5X8Q5My9MTfm3YkxqYTxO/R1LKLNAHtOFWCDNsyJVK2a6aMus/n55mZzoSdLRXqYvYHvwA8SGhjfBFAJlepk9hJmjwN9/cJlKoN6NVWQjk03WWKpsYLVjL2Y5LuPyAkHLrP1/Lhp3PRITw6FgHqquLPujBv+7xYywJwO7wlNkHIklSfNBY+7TgGUbGrjNZBrwRnO0f87HowGwDDCCOtBfy326q+lPWXXIr5yX0X5uUS8c7N25Yq54fLUApTfRJVUGQXl02RFuFT6AjrlI902aANhrvgUnzk54IvwbfuidK7vIlVPmCxyESYl71qviVu6tMcCFFOHi2Q23sdtDUAlPwEUernIVYmRuaVScQLwJXm5kU/5NEX2cEaEsaDhYE8vSxUPpqMKqnhY4aDdSY1n1T4PSSeSpfatDMgPCKW7/dFnZmDqTXAsZDegNaZXhUFcxXcvpRLtKwiAtne6iN7gCvswGjj7hAIW9cc9jqmBnsrjy7BQDhLzOhhrSg2kA1TPvvOZ+d6dxFgs/M3tZlMTEoaZNzixzg5KVvI2eQd7z27USNnbmBxtTy5eBbToVlCFa4cKHaa/20hpHLv46t7TmjLgw50rjXcvPqsbueJna+zYv5T5KnGdezPuXEYyMhhKJHostAXChOLw0YEoHH/P/0YmJitS30nBawIf13rYxBA8F4wXwnUOX+EaxtzlYK7dpf81r2d6itsH8vxjm5R8114Z4cfOwFGVaAYQIqCXs+V/U3JXCrQuj9wNYQNUsgXjag6UdOjMFrj9fVH0WRCMJN5cEigAN7SvCGyOBNIfqRLzJbLwxFK+XTIclfKwdcfIWFQbenGq+ifPkFPnugL+CLMAym072Qh/0nsjuBfsM6q6pARRQNPXJ1Y5Sr9igfg4tV3pUBGXtu/8Xpn2x7YaERjcXUCf9IwybP4EkWfQiEeirFbywgb/3Pjh834FUCqRZZ1UpDKC0CWrgbl9qE4vHePzkGwE4usYIsaw5PC9ASZoXBAc3QaFRKLZMh10BDdH6Oa46p1kzi/SFM/547xrI7KmsWDb0WsFprGpcJ/QlSv8IIO4lCyuMFjTuCJWmaSAEGvD3niHultoNlJLjq8DtrYkAO2VS7GSDn3tmjJf+P2dBtC9FVnOKf4pXRRXBZ4YvvoKw/mPPOZMXvFyt9ufVSPsIP6FY+WwlAMLY3NopfPdbjV2EjRkfUYfLaipdFwez4sRjZ+P7yy1Rsg3IK6S2RCWEndG7nStFROokWAZupTqyEXN/+kOAGWJDQRvUQ1haZOKE+YBpi2tK7TbGXTra3sOgjVT198ypwV9vIoOHfTV5WrAOK3A+1xMMfIDg0K/ndMzGxLBi9oI3tSM/S19I/PmRlTuWc/JLc0P+snexKuTDlQOZUA6h78h9yFCCcnbuwiXG5vFqA9h5cCYrvK+BHsewt8u+jluvvwvqQJzVb7tFn2dN00nKaJOUj7C6GNidMYfISHhu62q+XI2bYduTZNVibWsV6UoFGDpUdj9c1xMQDCxqraQ28oRhpuzWSUUD5eUizCHwcm5BeGDd9kNJJDZcUcC5G4K1oaQhQvm5knr83P+2mGWWsJkPyRjRo7IQrfjUBwap8fXI4ppoxDqvIO85tf4jhSwlpn/r+qlkueDQbq1yQwPRlK09RY/kPzkbbYlZfK52kyhTtYG8EWJZqNzT6pUJPEwanIG3zoHdEPPC1xYeQCRzsP9a/49JTHUYMdwsywlRYME2VaKooFMHxC50xJKJA3SD7PMOG/PTlRcn0/iSM70PJiy0kfPP24g74Cu7SsdKIDYSQQAKzWTad0LaouSQE2XDf9AhfNRAYaYjNy7FGG8mfx8EKx3GetlJSPi8eRNlq0h1RuN5h+ENURkc7IEWKsePjfo9UX8bgLL5Pla/RgTuogE/8vjL2X0qX/KE0VTjPwH4rtfgDpPLepKzd9P/H4hGvZSDic2uxLDScI8QmY12oJC+taDtVxhmi1Ka3se19Yj8iHpuFB12ExCSkLLAolzkFbn+Ufpr2cjPL2GBHJtQFkQKcKqeKWTMEwF8okQCKs4ANsgEtfpGVzS8ko4S+V+Zv2qPm2mIPwrze7tkVOx2Ie0gy5Ozpy0IP54tq+HvjV7qJHOVxukWeLTyicMSGsE2fnIro19h++8tCEHH3b+FRRNWb4kLixHuvfKGhPYFmdYy8tG/q1g5A4kGmo60O3h9oCKDnqA8pRrrgBnZfP6+cd20DtcM+3eIJDEGX0tNBQxgqe+fKguaRzZaIUWAxyDum9JqBERlkZUEAQVdmTAkT3rmj2i5NT4c+K/dVfe4FBUPXWyQ/zJO6qxpL4f8n8ScE1CLYrpcJTJ8neyuVTQhZLI1GDxGIvtvuRz5t2LAxblYir5M0ObNve/j7kca8fK0HnkNyp+ffgnaVueDwjvGMYL4+1XpQJ60iDLcPtIB0ttnC0GK+DYmH6DINELYnezA9JkgiHWcBPx+2GDOtXA45L+dUJHhmwpDzdK+1CNWRHcByw51Dea+8cAswu3l+oETz1CHAov2ouJsPVTZJUGD21/0a0iG9hsKysFs1GFQLxmZIa3ZD4voxmzrengQbRw2C5KYMd58Q514A9Mbp7otMCZu5K3vTFbI+sYyr4nqwJC5ClNAibnsHC5SAhH1z6KHGRsFBpK2DluS4Uw6jMuyOs9w4ESJYHNKPN5DcClMygGtYtcMK692OFnXTU0q8VmiVLaCdm/fQ+obMU6kYf4MErz0HJtTpGlyNMCbIMZpd1DTeGxe2Ml1GIsnwxxhKyxNQ6/7jkBArARq2d329LsdHm985upt9WDLCwSlAJN8zuERTKe1zpUK4qAi/lrM2sgOUnoGGAv9Gz8Mcc/Z/FsAHKfKa3WmjlsHkYEekx2E00nrdpIu15MhNmPZLEKXQH7E3CfB9CS9wOQdoeM2xz/URanJwT0ZBg5YR5ZEMovUtXDPcGLfiYMC+sfRQNFojxO4GoaRj+nl8ROUxOV8tkH4aKLNjiHDqXeeLmYU1WsiWk6rZ7RXENrpEHg8w7mqa2ZoVEexoEmK5dG6fZgBSR5OrOTh1DBzrMcv7eb2hwbeI8IB4YYtZOvaP4BKsXTAr4a1d67fy90EuQlaf2T5UKpj+CNRyHk5z6RsA/L/Kxd+jK5qezZ3+sQ/Nn+cR+1B729fzblgidzc7qfcHI1JuBQlghbBCO4iOkWVzC0oKBYoZIgXTe4DkGnk58IpAaOocnqC7yjCQmJdbCjFPQb0+TkaeWmFWovgmq849kQOd56+Urwa9P39ySCZgdLfD6sDlYLoS9OihQ93hS0hmd97nOOU9Oiz0a0RStHJI+fJG7iYA6qA695lieAy6qb288BV4k4pHaHzbWxozTx7WP/2xIsG/AQog3QhG1Pg7FnKbAlvQbGDugrxBLq8wxJSVP/EhQ0e6epJ1RONp7NOffFopAbHN8WfmlFO+m4D4vsErQh9z8X71YUEnf97VoIYXjFUOxqc7GqZUwbiIKVoWi4xzsjCRfUOPPdyo1KhUBrfrxOO71jbaeYiSuR7ZjECgSOThI2j193quITpTWZLe6P0P2gnu4bnrkaOvj0xSv/9IEVIw2UgLCd8CfVCjNw6KQ+lN56pvLI0QE6ZFX2gTU+I57W351aBeYbsKL4dcGOFogHufRY0j5VrtcbsLCf9Xh/ojhkavSvZHIQ8igNLrvph24M/WskFsLZEChbiLNw/7JFcXwOWSX438NbQarbqN9lH+e6Og3bdmpthqHw2HTMsV2J5xQ77nhiOmTXtTaafXJ3GZAuiMWRSUUHVD841p7paQcvLMD2qnHjJa525LJL2A/DPb3AEa17rwBK/sv93FW00hf3F96XTTGcxdXfbpe1carC1rhsHx1QaQcomGsGwT2cZO6fsqXu+E3p5CBHvtM/vOKSsMgtHCYRKOC94az/df0Dd+WiOEzOuPdsRXwO/HGNzUVVRMsDf0qiQOSlXhOgV3BB4CWycsUZlxHrE/lOTeKIvP3XN+D3vcAh60qx2T60WYE+baQUDXFCHGXZkSWSAJ858UwAjFRtqz2G+FHI73LUlLwNMbPk9epTg3rJyaOsIx41eX3zl7yFuPC36vFrBjGlA4SPG3N6cUQslbzbOmLxocJ54g9ufhPtcHGajofFhqcH4Hh1a5s2a+1LVU829XH4bNzQkACsQRpynkq4FsFsS68dyQy7YDu51e2rrbnRWXKI9bXEARtODcWE/51bvO44/WaYz5DTReAsla12LiP71sUXFPxv+o+jPUfF2vioiskR2rjMJLZqWijpmwmddTj/egdWjRNhdxPnihSPfjGyvCT0LPQY4Zyi8we72Iwc6s6Mg1NeiRn44gY2JVrTPe49t76kifskBs2qU9kZA47srSSq16O6qpBmvmUdh7FWqKzqddtj0IuHcRShhben50usbZcAXwLYlJvY7TahKQwfjrwRJZjN/TRHNc7YMbqIp64hHplpDtNT7/T/8nHqYgxwlg90I0wv00iLSUtvUDZDOB7arHTnB3ZSnferUWDiPvvAQFPsQevjL3hhuiZxD7alvhSASlbUZBOeI38onp/eMeXVD62ypHIOVAxdGA3DNeQu5Q+yQajOD1re9jc4NZ/ShYr3+Onyn16DNJAP6rTenCIDuEM2H0UTrzL0vs6JTqEnwXW5y3+YlJmF3oBfMDgcvXKNIjyEB29CFv04k18Ih7RhJSyZthav/DthdMNi7av6Gg90kPz3DTRjTYoqgbk8GsQ/nrLKOs+I4wdK9EOCziUz2ZniG5K2kjTvDuKUhKX+Q43VOBHnqXjlGu1+BroY9167YctBhOKLL1pJZdEhU3maLqSw4bgYZdRmU23ckttueZwAzjqb8V+F8t36zFPdhAUMQT0p73uAzZBizJT9SLFbpQPkX6TW5OznxKIu4GrsRWuKfUSOO00iUiNY9fahAGe8T5LAmSdSxIRtf3NbcrXLWmB4zlPtvyJps8CXPlNxuiCzfChABqW2SgtusMHJgJ5SPHAAk2mpvZP/G5ajlBVFwUM+V5rJ8trjvi7Kq8/b4l4X3z/ceKvP5fE2w4M6Fafoy4Zl8zuvXq7ztIwffBHxuS500nZrwJTLtowgyyh6cqd03xtNSu+/ZLvDLkv/Kc6dBttXjkZlSYoF1Dsryo1/Tb9FR1TU/DgDEYwZS4ZwpoNlFew2k2R6rMw/VvedRfml8ZidvH+7hC/gMufg/trE2/SC5JFDO7K/0oliXWXz4tnw+gDTfQ/hWyWxDVWgcDUlYzVQI7oWeI0vrLxg8X+qEfL6ez0n/mY0maoi22Rgap5071giKoRaIFlDP77FjcctfQu8nCkKXZ9wQXQT/s871ijrebN5ardY9E72o4jzXRl3OrWqcYvg1ZtSvYZz3XswRdmplHoRkr4izIEjfpv+WIPSLLWGsxCKs5Bd5RkHzORkPqKZCQRB2ClV4aUtgINbZNEkGEBHuk20fFc0ftyCELJCjY3AUMk2j8crErZfwGiRq0FHfAfIS+vpTnxs7dhOdED3kaBpz4LOz+QZA5sJm9uYCEetAVfKGzPRAFLtL4T+1NlaB6KSCNcxJZrVEKuRxsXR4j+sPNPeEN/s4/cGgmnOZ0NYXE3wBux8f8KIJ1820fqx7r74Hq3Ndhu4ngLJpuZJ3tJdIoLtnwuE7bcp+MUdot207WmlCvsk8DOKZEmGkJlQGYPcyYtLsHc7HpXnxgZRq9pbMUBpCDTgNsCXFX5NKRciZicpBXPnmrii7LQUbHcZwY8OncKUwjjkum4sIbiGfYvJpGcg4Tao7n3K3xUUcPmMUuNH5uUmhs9DTORPIk/DBf6yQdZhYtv20WGFkzURDZAYMY5Y0yHOX76GgFnLjnt4Hmxf3FIHzeV1vK3bYpKkEVcXixiRuN9hlKPvDjDiuMyaeScp6yHeJjwRy4qgHwc/nXOqvIojxfMJpHo4RGuJ7FN7KjRCHCZ6Dz6v2goJ6sLz9JlNZWjgz1Pda0nRK2pCc340NXSfTzfR/nxQjNR27E/PBnjkWrPl16KYFJF71+wFyevORuQIf4CzWevTYECEMXt7K///r/zAin34khEGwfbb7TbYchCfhOnfNaOFYhplfl+KRVETdAYfI73EbTmDF/zrihuJxkUXlDGrLWGS7DPjMnI2I5HfX8ULdgmoIWJ3G6e/WJgX+Po9aVPUHrXEgYk42YQ5007GLkpE9Sbzo4rnApGPPkSZ1PHa6VixcY0obHlbm8Sin1Uq9Ikmwss7UbdBy4njE1L7fj67BFeczWrFiMJYcmrsjqXUgkro2viGOW5sh/CewS3ncPNGfy9BlUweD6wBNTQU58moE/A0WNW3EQgGZyO6nTIE33YnAfBVsBUtvJJEUf7ytCNrv6k+S64pyASBWjLLKEZlfbduFUHcHLBddPiIUbg4mwdyco2dbHHlYIWDNw4623t4JkT14vf758fQxCvD0TzH5vUcnVjhE9Wds0XSKwg2aHKRVh/xobQL4r4Jox/bdl+r108FxCxjqykdSrZT2YEBAcqD/bdddoXDTMTJGjrl7UeZD26xTYnVuTfSkp6vlbah9mD+US4JGWqd9Mc0HP2Sv6rQ/JW8iwre58UmNQDS7ihXyGdc1E7wLxmTfIwjrq/D6g037RD+r0AsLg/jltyTnayG5Fo0ndI5QgQ4fhAubwAmfFu8zbLAbKP0kT8sP1PyY4R+BIf8nyz+BizYpODPyyPdBwyRA+bpyS24KWvjJQfr/Xlm+S2Va/FkSangwUl0VqDfsBPVu0RjittZ4tge0rPr46zNyH9Pi50JEMDU7ZqnhE5SnvSQxOQXpl1Kt9ZdOAsegtXRULzDFlSICe43UD+SJ7VOGbi/tm8nRgozGJFdKtlqYW0+NZqBxfy/t1ghke77R84T9SMNc2pAoJpWfiSkzjB8JvHLmQ314Ts8nAKjDjNkA1/4cy1tKc9X0PIzJ6SEUeYlywxxrbqJ1/cOoq//bcGyHsTSOAs/zD4dVrXG82KkKHzH9Sw34Mj8zTs5GH/zEpRPI5Y9M7aBHbVkn4n3WmS5OALUX5LmhHUHEtysZqBbN4IgTpX7Jeg3HvSdjx8EK4BCuK2BIwVaLWFFmnPLED+/jGL/WJGBmMDfKcuW1kYXqgyHZqOX8FfjCAqgMfZJwflD44KT9cVC84F8jLUSvfQDlvmCR8Y1uOw83EP9uTnChJAiY3zFHmLc2BiZ4GPqbXlHhfsrgAhDbUGYzeuv0u6ptheMljDUmxYKGc4q9m4/ZOwqEHAFt10hIIkeJCsjIMWPTcBOMl7JEsFrCR3elyYZDbU6ZESzoXy5Wbe8/T6mfCT6RC0HvSNVWuiOhI+fDgvAw84Dt49r3h2imXqfOOex/uPMlY00dGXMkIJ5hS7m2DWf8KlK2653EXx22UKUJu/xP3mJGjaICQMkNoFdRhu02xDF9ykfl6tp7P0pkH0SYrRb7b/QRvWUeillPrNTRM1yI/MKUhU2SX8PSDDmJcVvYG5x8svMvL9aE3LnxsDzU/whTpumIjCqQwxbRMlMp7bQmB43Vg4a3hzyJK5HlQqY1nby/jMY98yBcBk/sE3KLLLwaGNripqCsEInYkEcGM1U5Vs+m8u+66h4XwCZyAU6arWkZgLrsN8P2RQOHzSYhgTGJ+TdYCmrMY0pWkBeyM+kNXWDmhaWsqFvG/uRlcT+zRY0AXzdT6aFLm3Bvp3JWB2QdK5vBCh2cZFrl37WyocaM60O6Fse8xUoJYlEIoN6mjO/fJuXgAfC3yPYme6xO2XIgW6essNzbVt26xf2VqmApB9Ig0YkZPB6l0NGDe+SYO9aYHSRdfr+JeDa5lrak18oNU0aba0IlEvbBUYJo2Bdz4HhXZ3Hni3kzkcpQ9TK4b3WygMyXyoD5NJacxctWa341nXijNkeDfDJeTtYEpjRp9h0hNeBjS3Dy4vEnXSH6hRtDEIaaRCEzsSvAIwCV2Uk3IG2tv/YYjLgV7l398OJsHivHhjdSFTTHraHU9+dvU0nztJzuELAG5b3ouigsp2MHWEEWP6ygohsQNJbgh/wWRHu6Y9EKO7tQ8y/Ps+IzwdR7FpPPV3t+ugqcQt4GOX0KVkgvv6yHXTVSlVBE3vsnnQEckWVbERI0drge+blLfeyaQJdtQJ7NtDzZm+EAYFOmVU7rV82+mTM/B4yDrT2dL1P2ICTT/QBNq5GAP5Fn+xlbO/LnuEypf2M6EcJp1nw4d5Jw3nT86Lz/GC+r2at7uegFYts37vushzV9HuBX16LoWhMOKsWsq/fvZrNAywnTVp3vxK3iWTkb8IIYaX8vHJW0zXKX7RwCyd1xB30XWbbhmpLaSdjaRla3d/JGfrvbX6BKNGd+H0Bg7gBH2GhPBx1ncnn4e8zPIa/8vetcJlQ0G0bI+RyWrt0yd66+L5+SmGxFG+uptFv7gqRohJs4eEJiPNcjI7GYO0R2B/dZzzIiz5mo5LHoo7dh0Cd0+awb5mWDAQg1FG0vwAj5bqbiLby6DYqZGBVXVjt/mciVWstU/oGRU70lwdbc2ky0JuxUL+sbKcLvejx8h41tTDAM/shnvVDvrXvYTI0OVkiGshfpiDYyHafZoFaeUuKEACM4anvPe0LMgVArV5M5rpuSWmI+zqu69h+6pW1yccQxKCtYjMcu/QSq1IolANsNty0tNmY4ktyK1lVn7mKhWEe8N/vFFppqOfqUH8nIickYhLI0yOSgC1nY0L+i81RvQ+Hg2Q8MHmYa26QuN4oMkKHo7j1fOdBKtcdD/smYu3C95aascOnmmqfYCHHsmAumX0hpjZoOet6ZXN6Eg1kyqdwn0Zantv56kWsorNnud10+tHhcXP79m2CVKgptArPFPVtfY4nPpQFMkkXDdjlCdVKrZIYHKRbKOEulHtXLX5bm7BEosJwqi+aXftqt4iKBlShbM/Vjas+QcaXx3+7M87iLrM5FW5N9EgK08BRx2Ai7A68QfEk5LI6DZuyvbIr/Lfwcn8FLM4mfnaRabvOFJaq48oURvgYmBO55DHuuyDnVBLUnyUUypC7vWd+cICgWtTJSSfYQnXVDgAGoUQjpASlCs4CE2aCuCgnah9v/cEThpXmGSrPgygMnUVcg5R/y2glwMSeOPeA0MTq77cvmfCwj3fISxqHCIk1sw33MmH+q6Xoqb3KShMYT+qSJwjN6hJ06gNB9qiTEhNe4LVpaW/7jeHvLeLvb7mHi25RZGUI7YdSy3N0rhaVEEFYRKDc/0JyTkSXO0Eqg+AQDhtYjKwO1ruwAsEBd8DQMHyiqNmZBYn3ntXpz4sQGkrDYlyW03xbQS6cKVcFkiGXwIT9mB+Cz5VvW5QC1dsNH2iNt3No+4/aI10jG8VkTRhdultAtjPLLN+ednurz9Jw7AzS7o0ls/zaohqKVYZu3txzIT1wzKzsqu0aooUOtlK+eKRU5efloi8Cpycm1DXKguIx7R1SM67oU2X/tEiA6r/X5POFBLxsKEPme82Zd6XByZDXT/dQ/I8fOgFOWSIaHKjartlqalSSQw1cvA74Xtj2BJokY9MiFf9N5SzHZY5Ixo8D481yswiFZIgWEde3Ut6CjeYYaamYmy8C/Ne2aHv6Q/YyJBh/X/koP+MoPeL8AmVnmJOeieHX2am6ysOXQOFS8HB+Yjlupp50bfkpClHBNp9FMc9hB1l3AmjTQGpW71YaVmmyPWCmpGXbMajVLS58FoYiRRPesSYTWbZk2ueBX+pK7dPgj2i5zrrMnb6eC1A5u6SHGJLFpHmANfrnfpKSPm2DbZJ0nLPcGsXvd6PexebQEQlD8NzjfFuALEwFFtZ9LE2Np5Ioyb0fp+YNhUPpqjgC6Sz/sAiXOtcgcVAD/MHiOPw6X9259CMkKnIRKwgq3l7FYIWrtWbYvSlyZEiQz6ftB68jCEa8IOI48ir3XmIXu84uBDMppv4B6vW+tPIPPJj0fR+crkeA+g4jwKMCFYg5IBMuFHEKGNQtSsg3aEoeK6QtllZEHPeWjDFdSuA9K7Fh3IQaVsaxLC9x82y7mkQFYkvtT8FvTc2L7LQv4BeY3CB/9Aa48E/7rdjs2Z2Rv3CWCvPI8SIsIll1W4S7dmAyDgzjOeYdV0+RjNCblNZcMTZh/oCH++y+OdAZlOF/DFQjI1mmgirRzFA7sX1s6OlVsW7BzVMsVVpj+j+gzbSkZFHTRhorL7wiTLwnOthLLcJZkfghuYoRklMQTjTag+7A4ra+Gs6q1m6fY1L7ZESJCS3+D8sAaT5jEiJkFM97mWU7UW6aQu4sNGIreBFnBqetBxS3JZLEEmkQzTRhynsvFtldOYi2+k19j8K8/PvWdnWP6SotY7FJcIbPU3jnGYb37fbr3maxVZmuqx1RuRoUmHNwiUtmo7apuPh6PYqBuYg3f4NSbpIDzTGC4uzAY1tjEkNUaxZ2KoungoAeD6iF/50BAvFGpq6OZBiYUjhzQxofGmqbYuWRP1FE2z38EzShWcHxf8z3oBEzbFBXCI7WSkhyYkm08X3a6Uh2DjvwafCFaKmgn2FwIgPMFxs2mTeDra1g7dWO6KFUDKUvcdE0+S5oegYAZjJ/f86QXDRkS2dnKbADCiOVzn8m+OqW6SuFhMUXomImjcV4HAZTNIkzZffqqajb33RMbWIGjTJfE6EZYsJsz6FVW9CR+LePb6U0PsDgvhlcuDjDwBr8X/vqPxxKypqsbzhxiuI7mZIfovYGBpx/zHDSPKP07fnKx49/LbiW9ljuXXr4Bp1sCEXuPBl18HZZmv7RfXhD4PhcX8elK9a1qaLPdplZMzMtBUIYyXthCMkFYIvQ3ok9t4ZpfCEfNq5oe2ireuRH5ppK/D2QhclVpbAhnw635Zj3tAGtFQdsLdIDIEv1VmyhFS9FwnGyYF9+nS4jldE+PwbxwvrVJR1/NUZnOgT7bIL50raYQrP3iP3mw5ukOA0G7cxBzdZCnV/IIs7NE7Sn/6/vwnHriaU7/tXk+VbS95jlsgPYQ+6RNDjEoq+2GWZD01+vQ2Aspb3zS3Ng1QoJymjE1RHpcfPCKu0sonujUG/uKk9JdOzVPpIA42EybOHQiKUyJbv+5of3yl6urmcmBcXzj56LY01Rj6e6JBXjAyeeQFGMI5O6KETwOrw7A7g6ysBCA2KXzx4NawI0MeWSHuatmepEp1cwIzpL6CYCEY8/FBhN9Tiznh6eWbaiXjL2FFVbrjjeiijpSWrV5aKUwsMjAKa7ofAY4NwDLKXH/P+zE5uprmLphiEIw9LVIwIqaFBEVkcE22O/ga2p5HXlaaZFI7pnhlXEAa8DyovI9dLA5as08HxNh/CmuLfGQg3liCubcvc8KwTAx3CIh7A73zBv6IJeF4BYa2AvErwGcHr6qjBdyvyp55qPzl5J6k8Ngc9xzevi78vP/25h6R2Io5UcbHRc+miCg6THtVUIDIWunXkYeE5Ylp3fS6y2bVdKob15tSiAMX2svV+lpCti7nos72iG5ACUGz88coAonvVsjmAQXZvDPUA+D4K6pKJGJcXCx80Wt/csUx4nDqkCFMxBtYP0cXgIv/9J5umrp5Y9Vf0AQsd6lGsrt0c6RucSHFSMQh6Co/3q/4OJTULdv3EUdc3tYLxEykef2LLmydR967kNcJzV4AYk2sOUQhwsB4CVOc1sO9nTQxSaUBtYSbX0T/ePk37e9gr9nZ+NLx3l/ZAp+SqJ1SYBkns3zKuZRmt5ovvvYVPHAkanhvm/BZ+v7/LOpn7Yozq9R0RhcPFodvjvrJ9eJyCWy2KgH5Msy0Slh2yr060vFW7dAckU8/uog5+NKNuatrNPgIWzG/EAhQOF9hbfYl8z8BgAfBQ0WHcOOgcY+LGsTREntq5RmEFbXIgNvCg7Y1d104cDTYEvDDY5EzDAJyRwy43+JH/VSy8ikG91bMXlb/aXa9icESaRC33k5Nbj5Is7415GbsgE1PiHW3vQJFhn/67l42xXdkif4bQpLLEE+thcr8WRYWNZrjAU/Qv0Kfl3nOKjpicpB0NXtVy+zpH3bIua6b4IeBKwyfreFdj8EGFfIVvqMHrxa+E7+EHk8EgQ7JDjLJZYsn1R1XJWXkiU7rlrt/HU/rC3/u6ecsnDvaDi6/1dC3awdlFSZFIKMRxpgHraV72Mc+PFmE2s9KtU1V/nAco8X2ebfAhFWq+ICqNDpZrBEjBCzeWSmDEhj3gir+IbMTvxB354KMsb344nwRtb8kq4VfCs0b/amAReTpLOBQh+FMFhOM9iPsR7ldaXX20efjYlDCjnVm0btswlWAH6sSCdLyea1i0fVODt/JjbU3eSLVDbG7hhDn/SuAEUJCElQq/XES0SHZHuElHqULwbFF9gOk1A8ndvcvK2nY5r3j65fvjzwY3r5zx1qYdsy9NwOGUr0T2+QqFckJQc1ShB4cYvgGaT7PPMn/2dRXRCAXhVrtMBeaVqp2RdD36Sof5m1nvlEHZ2JzJfU2PR4N4zqeses49k9zyvxLwf4KmpI+7FyTaE5xZrp2A3UwXWc/HI0f1MOxB/ikcKaU/DE3/BW3QSdHG82pelAOW83ddPOoTtuLA/T2fA0ch8zBMk1xQNEs/guYlnab2F5JpSB8xSBMBunUleXPwK5bAnBk4HrCsBS9Bh3s5w6yqyDAXvTeNBPfI21Twp+/0Hm9ay/YUbHQzhMSEgpLhoXmrgC07mtirHCfc5iw35wBonmGVExQ72jnYqQW8psNSPdG6Dr8BtFRLTq9DIXaE5dcG/c03N5vNZ5O77cQkxZxcpZh8igcQmDIVbIl9r/50oj70xy2az3g2xQKPGFYm9+eBr+v5Fv7fKRntpPq2jnhxue+nrwp8MrkHxUnnDCyLFm4AAdqjCCuq+9naUafwKUsAJc7eqSaO14v1FpS/IaRbUMCz8kEeDGIZlmG/r9W4RtBrYq/8TFA+YBiiR1+cTaP/s4RI2x/T4/5Q7kIC9j52CKzBSoK8o7vNWTQR0pxRoTp9RMDJGD7uYidP34dCrHlis5AdmkbLtYPiRfSRN6HVjYnipcrOUN0nYppVygiMmlJM94nGtO150hiMZ9rDSS8b5PHKm5vnSsVaNI3C7xKerpD3Tpbyf73ltWkGKe43Xfy2mN4jFaN3QYN/fN4hzb76nHgtJzqPV+pkuVbdWtZWstQwLeaS0E3/Df5QBSSbBk4irSmglz9S7lyM3gRZLVzImdeNB6YCFOp6p9uLzg1+j8CYK7qOGCoel8BtSOykOzIcDMqiCckhDeq3s7UzLov7gC1bpZWYFyZ/dv7414V1n8ZmutG6PRkUQsOnLWvnW6AsIYnVfVvgbwH68uIKzLVoqW28aas6leaZcQchUxV08XBNr4fVktvUET5M9Pc+Se0xJcS7PllK+l3l8dLDLIWIwHr0DS2D1woI3JVQAKeXwTDTZMh/yWyNT2A4Yghv3Z/DfUGaQ8PY/PQt+UUd24txpK2Nf3CBfallTk15vtAsH2Ub7bZ0ChT/JjN9p2xjsbOhkIB8HG5i7RH8I4XfEUXqfjQ8452cZV7Pdfj5KNApw+px2RCnbgxeVKFJJJ5GmduujvVakf/pO5vqu6HUIwdpRriUL2wIJhXyxwiJ0QyAYOM3KmNPBdBlTNuSEG/XI3m2y6ZMpfC+FhSAJGDCxbLreorgrrrfiqLg6/g3kpWqDez1bzsnSfFphpQ826HC+VpR4H/+drOF17m3D63DnbnB2ECxjuk766cbPdKSEO4kADsABdf8jcyvbi1bfyu2HkO6aWjlYlObMhPdvu01XxZ2PmLoAdDe7+VGX8t1fIU170cw2++jMUyYMg3g8+FbVBVTqr1EzobIYE1wuuYvca7u/5G8sGWOC8IjmFOn8g3K0Rma1IDWbQDJtgrahziHWlj/eRj6yfbUjd+fKTH6vmoiBpaT65SIABZgYtstvBTxVR+W+qpeXtfNOJ/owSboJ6D3VWN1HFLK7KK9MIj3AK+pDv0QUp9EbLdx3ekRC0MGSn0iofrgqudxDKKdVz8iXa54HKe/vdvI1ik+6rAn3eaSQAh4b6mF5cDS6Q3tpjC8eC2qpA5h6a9bUWn2auuhzJ9Rst6XOUfA5Pk5AEhssPtGVzRvrv1yD6OTIxdC64oBsrn+6Z1sa9xtxxYvl0NuOHBc98EKxaw1vE0zxyUwtfgWD5hmUB6Ar87zkt3mVZKKnl2Ir4a2O4J+sNzyLSzANh7U5ELZD1R8D19EDdfrPdjMlhDLFOWRrso/vbi2r2dnLgWgLrnL6BoR6zTbQa9+eUnAKpB8OAASZXGIm2tTE/i6lFeLaM2JrRsdDRdbAKMBr0sUeqEjKRPU2N3+0emOV1FBeCPrLFO5JHkIU5qGtpyxV5aHXZdd3dSdaGbgnWNOZEwrNtkESKYYPr2gc3WUfaGeDUyKnWCh8gfxOqkRBr7kzoUgacDvUkIIG517EW1e4aHGPv8Yxr7jL7HGYqECKz38OTfR5ZCrRb35UpIXYlnJ226i+aPmdAAJJj8Xv31RuXt9KjLLpLew3hposWofJ3NSVS7Wg77kj51wKGhuzRySImpaVbjlSYusoPq6YqbROF1CkneLPIMwL9aPf+vAt1wyZuBF6w1POzQwyiW02JqB8UMEMOxTZGz0Dgj4Yfy452nfNvO5a4t+GN2/LT74F6na73i8IR5FVaC8gJ87wRbC8eEZuOp6gwJ36W8DeczSX0WKG7V05idY4W/OBqLy8VOYjSVe7FC016fin0AmpmeCR+g2ETRhfUgjaPcRbNJkzZnmJO0F3TMaFIyvymDvJrIH9vWTDArEOQ1uwiTQTWDURivw33HARRPanAk6yD8lRJ5dl2L3BNQdMf0qL6amnWjDRhou5B0hII3mqxjB+AHjvXEU9IpcM0ILF22JKgKAErXh8S9NMJdlkt/vucODAWtHCGXarXXP16+F+ici0Y2Sp+0Zx93zkNcYSAMI7RVn9me8UO4Te8iUhzEBqXoDDnnDuz14v6CoIG0c2ttZCz3TtKkerePz9pfswzAaOvAVGBRbiUQAIla0337fvx4ilHioivCLydtDf2oPbdIsDCpli1OhfSvgo+xCfZllf8jujAE85rKiSnaM889PYFdt2Q3kWbbsvdg4W+sl6mUn0Aa6zJZ24G6ROevbgu0tasNvO0MHFLwBRjTMuWWqMPWlgJYXaZ31HUlzG9NQWKI7xmubJ1lZaxSIvWUpftF+Pq3r7wMErXS2ef+qXoBfqz0CU5AmKhdrWEYR10c00A1AoTvKvddv7DIHv5WnXGNmovTC5cn0U/swZlWCoU1WMIajOD2tP4aYZhV/ICCkfI608F3Coj2riH43qm8oDviE8imaCzYTUuKLpq+JWoIcONJZ9xHuIKSifLPRywHQaPU1gp+hRtZX2C1UjEZizYS8xUvPmriEoL/BfLsH5XSYvvgvnWTceDDlsB59UokORmSRqo8FDZ648NrKqMHmNitXVMeWf/5hULFcC0NqkBPrM8q/UTg7Rm/at/nQO1XEoAKZsGSHh7BPhVOJ7D3L8RCu23GCYb0LefUIHq8iSIJ9BTgdHXXuGDhNLWdLFSHXTWNzkbH3QTneJozMmb19WhnQHp1CkawQUIrZvyOAYWwe4Mrvf7AMZeDxs/DuHzvYNuqqup2r59aAp+Eqm7IYc3XWR65tNdfq5f3KuJYnWP8J04NI/SttQYnJtBBf/TEQQ6NGSh6iT/F6Kavd01z3ihT9m5ov7s84dvRfgbMThKIwSesV6HmL4y0jR2FCgJCOxDpaBkKmafe1yrEXTy4iBnUsw3LpOS86FF0U1VD5UGOWJ5zHoasCF294PlidfEXISDvYw8pLM4TAWx2x0Yhh40JRKQgJ7gp3UvIYcR4MrMeg7VnVcpMETG7yPex9kjHACUraGs9T8J4hWwFjlC3G3XbbLHdd52pjJHDq2poGdU7Nhx0jQMGhqXOwCrui6G3w2teKf9XG9o5FsZaUOWZPbYoyycB7Q9Q3LkBZba1JUof3IWpwmP1QpMHb2Xb41HGqVdJb5hQVg+n+9QvxWwMLuTZW3I61UdwCG5YlQzlyXIK/kx3Ib1fZVWqpxhrlg1r0dXyVl4Id1jMl3xoXPZhMIYz2jWapL/V6L+a8QjEIceuHPdRt2Ex7XAaqb8L124izg+B+uLOthfzJNu500a6yKeHEoJOIe1obgt+LaEZGBRt7iIIpUhBUScAjH73Sji1IuRad5jrQoyJ2uDCdbCOB+s30NGNrZ3dTatg8q6AMOq2dtwiMjrLyoWNbRLS122+DHs9e2rD6T2HiZuN/nHG5c8SR9DJCNzk4kZNcwX3TX8voCgtzvcpkQjnwBtCj7j/crk4Z1MXHcKhaK7iB9+NqVDjWaw9gjJR9FEsr/tRCyrkS2AgffntsZzdUmL2lqq3YFIJhzn4ktCJBzhA00AuKCtaPKsIHsXKmS0LGbtTjSZEDcRTeNLTjR89eStUn0oCrh/GOGmxl5Cps3XxHdxsqS7zQnYa2CmMjlCUIcCzF/h/qHLYrlJ2TECC9vbgpoh/JQDJEqPiuKYUYz/pGwcPyqMUlf8dhaR6hFaIR5yV/neg0XUyM1ew/gEPC+sNiiRNiF482u37xnoLYHK46XW30/bG0kzbxR7xld/wn0xfijzXV4oiRMwvlMc23zds+NP4SfRxFkDXwOXJJBrXuffodjgE3qM73iu0id0Jr6KaKJcRBHufQpznSM813xlQtm+/nOzy73SBlG6TdRq/E2dFrm3HQn5jInSFgrj8GOyKDGjwj8Q7dN5QBKi7XBy3qS6cKe4cI1tsKZf+unT4BKX75rpInsQK8KQ+1eGH9nXmL69j2HZOA8SJutrFxPu1TSPMzcSOz7hTy8CCzF0d8V2LGOMnUwFiYbNRfygurRc5MWTApGBUHCvvP8xm54LWI7b8lktAF24sX41Kl7mJVT9bN8i5EIK4tpMzRyjqQe5VFMDU6+QuCD6Cxt/1CraXHIAPXDzYEaCMWeswmRxx7xuHL9iVZ0DkdJspH5Yo7rpsgpeqYmUUq2Ozd91FW1p7/vSEi4Bfyo47832Lbr6O57vcQVAbntfdtMEOkvPnHb0BXFaNQrchsNBcRvn9g7kx0iUL9k78a3iiaoiRzddBWq2OtqJOU4UeQbuI8+5+BLoW4h1e4UfffTpaQn9SBsgK2T1ilWwFVz1waHrjUz3zoj1zrot1VTmosE0MS6BINaU/DfTkHf1b9HpFzsVRiC8T2AsX5xa9ikIsxhDJfXNiOpJLYAjQtgj2U0xBNrV6HcqUlQpFP9PVRfS4xuT2+PlbRPaJ7ibLcHjU/yjEW8A0Scx5W4Y8f4652ky8mhEYuKGhmW4E5n8vFLNnkT+ym3bfnVCjj5ixm1qpWXd2zofFk6z3sewfFdCKeUYmrJO40e684+xB5IUmdD6NFwVvFf+q1OJ8EESemifYi9OUNRmP3fBVLeFEp5aE6SEfKeZsZTucBua0u6DCYbG1Gj/9viwNTbXRPuLBuPRJzTcO27FU/t14UfSaA9Z9rrniFcuEQu0C0GnoaK3IaLo7GC5CwQ0td+O3mMDlZ+lM0JvbMgCwBn2hdxgV66/EVOidgPByImzqt7JVbhTxhwMCTyfd7a3fuFgUMhN+mKtwjXs6UcGSmIL7bsm+zJR0vtW+h6NDJNX4CIXcdX33at/FMVxjJWBeq7LDT8R5w8bY77LmF7PE1zI8dQ+Fh8eFsvfMSh55mPBFgklaW0cjuhH1Ao6SUKqfe6j194lLAWDHoGXPSrl8E3tJIhIVbrGiQi3S767PPHD9i/xBLERLdKTrPcMYao3WiPus33/H6nYKUrJt1pdyIPEwvKiCFS1N8XQ1zvUffRkbeDvSddTpaZRMnBMz2EkjHTuoywrMOnmZV2M3og4/AQENWo0v9PJmnZ2MV5wQKPkZ/ftB0QHOCDhHLJhm916kThB/BmlXCkIVAqYOxiE+/15DaGj/rYLl1vIq0X2K/6wBVOezF3uBep7y49+mYZJklGt6vAyNkuufKmTUVnxco4wuwy3I/VLhKZ77I25PcvLUsBK4B8rkHIOo7x3vFQiXBI3lKV6nAG+mvRM6/70fSkUaWkDDGItv1zQ/wvmAHTM5chNykTKMJoZaBCCHCHU67BP4YfXtF7qCx3qV/OMTc9XI8rZItkycTjCHP3IyVEDz878lBzjXjDp3htIQx/liI++YKbnjnfuku3RWS6aMVhw7bo+LkCcOz6UfO0wRh4bAIO8XSCYGs+hS/JFvO3lBl7FMY1lPDs1zuFprlWSn3FCqWWiQb6f+VIw4bC2uTctItGCc5jub+ywMJ/OdpzBm9u/92imh2naU6CT73Dru+m1Q7HxWHU+asmibSb+vPEsQU+KRsbaIOQKPLca2ORxoFnqUZ1So717BOlJjWQdGXFouCuvRL2008w1F85KUogz7YI4kejjTHagicg7APB0ju5WyWcSbX+TFyKTktPVBLhhg0M4vZ4+tPoLm1I+nahSJiNEGTUkXNNafR7nxQVfSs4Cv1gPmwbsL6RMJNRi8QigO8W9qdywzZWbLBD5dy/Dxk8AtbewvJIWJmYdHfZQ3BRJWGj5R2eWWdwmZBb5ze8yU53JSEq2rK/yBQ1pMU3+gVvrzI8p7WCMK3OZZooWwLLbq/4Bh+N9IRWun/AENH80nv/XB4xrdaf2EnbsWvX5Bk5MfIOgt8yiZKKBE6dANYUfNIA37qz0Yt3i+SEmSyuz4Ll6tahOrHCKdCR1IPV/LCldsD6xh800YFYyEx86um5pTOPCEkWPmfhNl40Bg9zvRIrNduzA33FopuJYUNlyN78pBiTuHpzd3e+++ZpeDaGQ7cnU3rRWjwoqbvZS8giCk2lE5fV4Ydbg+Dh7oknvd4vkfgDDAwXPpDxjnUk7dWAKQn5d/SQywMLGneRaCCALpK4VTiI73aXMPGYU1iB/U/E/TZ40Vkv+0biKHNztkfWhts3B5EIPfmh7Yzkca5eEt1Z+oJ59SSEZRqYMXEu+8xCvYTDmU/UdWJWmjlhnWpW0emLP7F9xgWKE2YJVPgPbUB3BXMC/gVZw6Usw/DiYwXicbWszjYr+7dphPMo35551twRAI9AOTxSyd/SzVmVznnhSTylA3n3Q/S2VFjX6Xjo3VgnxvwvtntkSqlf4cU1e8DYhjl0j9B4vdSUIDoaspY6Rhez+/9Sw3RZMcbO1FmH4dV66kDzluzmGhFwpfMgLjQSUZuTCwmWs8T//hAqYHXgwpIXRxGzGMnSlfAK4NufPW6iU3g2K7hBfvq2i9BgYhN7hdqSa1+ujkHRgba5P1RbKB80N7E/MXBTWNQtCPHM1hmbHiJ94gl112swApO9A+ZouwpVqDuXlsh+un35tOvjNzZNVmCLSr7mUms1kagD4VmMlEcLTqCcyNqF7ctkqiyMg3cv3hZ2kSh2fxS8eo1cZUiO4qgGJ93LNep8HtJEgeZkaqMas6s269+26ZLV4qlmPdv+PJbmIYJ8Rn0g53N+VHU3UKyHUyaVAf46c/8Q+iUJ7Bfk1YhKxHKylyi3JbSok4nG6CcrocqLfbN0hKv6PZFC11NFC7C3j+BrlY6leOFq5kbkkz7tUBH78ZG8d/xgbIbQCiekaa4Dor2qvTwIPaGISEXxH+onTNyKvjk7aE16wMg9U5JBkKPIq42thKCcwMaLS8f34n02Fb2VtAtk1j+OuikKK+d3hX09AXPTy6kedq5Exbs+lV5tqaAoioE3BdG+rkpHbXR9KJJHBT82EJgqEScIMcGNDi2zcSj65WaT72C03WS9BwtsJgP1cNkr/U0L7QO9BSK921av7W93gz7kZILwq6++ToBQ50OwIMiN4972yQPQrzhO/7ZApCZvf6khukjAyQuPOlYyOn7ftmdcBUpM3HF3glbh+5IHPoOqm9fuUXVzbFEj8Se+yI7p1us/gZeK3SIRSu3nPPGB0dB1RezwEJ9UXuG8PmmXVR60d1MLxfHHnGHXw+fMyEqyJJ2URQMf62cSdn6QhxbPZLtWm792zgZvtmKFj9pcJ5huyvptu3S/ekNrC4XHPv5NKI0Ge3mf+Pll47xhWG+tMXRciYrmCQbeHR4Ldo/srZx7OVQ22OqTDTh9gC0nYqLsETTaio27qAvBuGszth7WSVIjPoEu91R864qTAM/YlzdRavv3Rkayo7xHBTq880vF3ZCm04kKCqFO/T5GR/kSAv83G8XehhIVnO8eLo1fMAhUy8jBpXAZDULp7vc9XeK/1urkGQbbcpEOHEgAoy6jk6qM3cADrT60VlwIcU3UM52CJIZYey/SLEKUBILn4q1xEbM1CsJOpXfwApZmqZ2u74qKMSCDK5MOU9vFmBMtpPeXvq5T56GuPixGRXi3MtAZ8KIpCtJ3IZGyXZLYv/Jl11XeO3pJGPUFV+uuqGqVidh5Gdb8TF+f+totRltqOdCB5qxMb1b1dUFuYcUPcXcSDYOqd5pe9wUPaD8s+U75Aakk8HmqFPEbdAls2LRQG703KFM/K8rU0Xzi5thtYgrjZCEWvLNUJKohb+xj/NA2wNSSEOnYT9HuWGEDT38oDilLG4devv+K4WFGDU87gTMMwl/No6STqvLfybxld/ymPsyEReg9Xch4B5arY9TgFZFxDp65ZYnhHJyttuJhgnvWgTh/grVMQfgV6HOnGG1T/p8H54IAnC/OosXyQwk2IoUQypq+6vXD3UEgviSy+r8O+ENM7cRJXkJyNIpUG9plymsAL/HdSAYp/6XMQS7zYra/ggAlrMu+sJIcTEqXQEkt1gQS1siXIpBHscj6i78Sfv34OefqbAARF1VBAkDTRoPyW+aWdsNG8bBDL4ao3n+rHEVmNbzDQabMNTDZNjBa7vzalYYFN+qePYSVN+K/OrCg1Hh8v0wxrjaPhxRtibKpAxjoayl84UDuS9YBNuKo1U0gpRr8gi2EH9MSqVp7WuSjGlbl/wt5rO/GTvegTbmKUZq9XxhM8N8FaAp4cgvWJNAPGRJNmJCcHGe7LF6phd2eJMuso6BZsc2N3a3j7rBfGUDPYInM59zD3TN4xd8WULejL1wwXF9wgqw2Dgbn5Pf984RFZ06nR25tmBsTqUBrOi+mZWcqLP0yrmGuENVBK7Wzj1lpuOfUIJK46CNYNMf8L0g6SWqwzvtHUvOhaI4O7sq0CwKcGC1DaervL84Pfv4H1w625ispEBahLUREBPmQoLKXAIuq/TNw37+cZMnDEOZbzzUa0/nlavTrOvk5L1hulvB9VlfzldQY7ttmfofho4bdy3ozsUKjz+O0OsWvHWvW54Bi9Fopcuo9aEgZI2XY8+xs9Yilb+CC5Pa1tKs6Fh9yiujJuTh+zUAOBhN5yq+gLu9v4BO0p+ZM8iyKrk82XAy+obaF1AuVWKtxAkziFT+9QeLELTniYW3zQax6yb9+Jtd3TZxx5rKbiGhmp2viWoQDP6cJcaG5fVgPNpTHV/X/VzUwctaRRlON4N2BdCm1n+xNyzDdYAFj7Ydufc+cvguyZ6YwzMQTmuRFKRgKJQcsCFq9M/PXx7DTfsDqUBHO/hpKqtnbN+cQ/ipWfQvZcCHPGLF6Fk/8RwoR5nD7zHorASihFIP2EyS3d6tJWTeO5bP0Lmio+inqODbpUhIFGyc5uRwph9zMInGRZU7r4qj9+ZdttXNcpIaOQD7tCVH3z8sga1f2UUFXffVJrAuQ+uuCINOZ+PpIgCXLVlK6aBpGlGIjs7m9vcexYIqKS/ZKsQly7RNNSmCtVdCwslqh2mCa0+jxsO9xJeNAujl8jcKH1Hg/4t+jHYlWOy1XUPffyuYMYq5tvTmPKoMHW3M4H153PYp2You8K2WghHnBa92b5KVhYy3yx7vBNRIX+zOUdQzf9ocgbNvz7qrlY0gJVedLWsOwESzRAahOovZfE+mC46jmgosg5xgaBVmXR+1JvQzqi3VZZxdqOM1YeEuBu8zXEdstm+amKHN9l0NUKKuc8eQ0OpsGb2OhgdTr27h3lbjnDwavF1YIl+Az+jzTVomkPyUjaoQGWOGmpZ1BZpABBJk2/WrUKMUiqxkspJOiDmdnuKZrVorrwGAs/MpLyUwOkC08q5G1j/kwrBFRejH9HUazP9Z0iF8vpO3Me70y7zQLZ9KnzTqlcMGVeSu+BhM6t2dYQOTJHjXjtpStE/ZBptqPwX2CiPvNLREDAl1zBnl3T/QmCNPJaLrxwRX9uVQ656a7AVY92Ot8zMUq2xTal/o4HuSnvophz6uchnHADMmClPGuHGq4PnVbdv0M1C5cbIpjVWqdVu0NcKQvhGQqwviHPctxnCjUJ14zxqXY3L8X/isEN2jLrX0/f/Y2Av/A82S+2G3N/dwTb8NTE6k6MOTKg6hUdNsJHcUFikcPqq5I3n8mOmlRLYGpMv0Pl0aO47anSKXz/gGPyCB3wY7BEzJ7KuNp8+fKsm5cxgAJ1Qqmn6FP5gr107gXTiOQ/zhlwsRN+yhkNgOd/0yw0fQKuQwb/rHL+ONYiMsu5th+vcTmmKZy3JnrG/MgHVdtta/tz73DDNDgqZYGVxJYEGOPNksl45VC0BUfcI/Zhi1HnAZ4/tSSz1kxFJnBLLO9FeJQmEaM8Al3G7EKv7azVM9zWlBX71FLcxbNLObhpzSy0kI+pCX8PgOHWxhRBFnh1jYgL4afq5/j0yM75PM0hwuYw6tKCgKhYtuaLiHs3CvoATs3OwZSPm3F75VJ2ttbUsdjoxkT3iCpukB4i9RyYyXg75mAMm/bzSgL0HpTUZ4RgVWSY2UgAyA6oQkEV+cJBu2i5MAUggKAqYxcR80XPE2IGu4vRmrtoAu7OsZuXlbtu9vMftc1vvnQRrpy5AwaohZL0MtTGvf5myA1lbmRzdHJlYW0NZW5kb2JqDTcgMCBvYmoNPDwvTGVuZ3RoIDE3Nj4+c3RyZWFtDQqPw62rawAxjR/lOaiohT5GN9f4i9ZoOaJ+t1uvl1cL1/qUr98RVSR2Auf0jsT7QhQn+bSFv9+WNNjQVXEmgZBzZhr4rAVlL9Q+n2NkM8vFPesFIeCujdTY8SwUVFGpcGuKQhnXUpp0Qi7yUjvzHH0ZRUZXK6OYhtp9QgR7HIAjhXcsJoltv//gZCzZLmf0Fd+DPdA9hoWnqKjsQcw2KcddUCVcFjG6ALOGURwIkaSPNA1lbmRzdHJlYW0NZW5kb2JqDTggMCBvYmoNPDwvRmlsdGVyWy9BU0NJSTg1RGVjb2RlL0ZsYXRlRGVjb2RlXS9MZW5ndGggNDI4Pj5zdHJlYW0NCjg7WF1PPkVxTkAlJydPX0AlZUA/SjslKzgoOWU+WD1NUjZTP2leWWdBMz1dLkhEWEYuUiRsSUxAInBKK0VQKCUwCmJdNmFqbU5abiohPSdPUVplUV5ZKiw9XT9DLkIrXFVsZzlkaEQqImlDWzsqPTNgb1AxWyFTXik/MSlJWjRkdXBgCkUxciEvLCowWyo5LmFGSVIyJmItQyNzPFhsNUZIQFs8PSEjNlYpdURCWG5Jci5GPm9SWjdEbCVNTFlcLj9kPk1uCjYlUTJvWWZOUkYkJCtPTjwrXVJVSm1DMEk8amxMLm9YaXNaO1NZVVsvNyM8JjM3cmNsUUtxZUplIyxVRjdSZ2IxClZOV0ZLZj5uRFo0T1RzMFMhc2FHPkdHS1VsUSpRPzQ1OkNJJjRKJ18yajxldEpJQ2o3ZTduUE1iPU82UzdVT0g8ClBPN3JcSS5IdSZlMGQmRTwuJylmRVJyL2wrKlcsKXFeRCphaTU8dXVMWC43Zy8+JFhLcmNZcDBuK1hsX25VKk8oCmxbJDZObitaX05xMF1zN2hzXWBYWDFuWjgmOTRhXH4+DWVuZHN0cmVhbQ1lbmRvYmoNOSAwIG9iag1bL0luZGV4ZWQvRGV2aWNlUkdCIDI1NSA4IDAgUl0NZW5kb2JqDTEwIDAgb2JqDTw8L0Jhc2VGb250L1hQVEpIRCtGcnV0aWdlckxUU3RkLUJvbGRJdGFsaWMvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nL0ZpcnN0Q2hhciAzMi9Gb250RGVzY3JpcHRvciA0IDAgUi9MYXN0Q2hhciAxNTAvU3VidHlwZS9UeXBlMS9Ub1VuaWNvZGUgNSAwIFIvVHlwZS9Gb250L1dpZHRoc1syNzggMCAwIDAgMCAwIDAgMCAzMzMgMzMzIDAgMCAwIDM4OSAyNzggMCA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgMjc4IDAgMCAwIDAgMCAwIDcyMiA2MTEgNjExIDcyMiA1NTYgNTAwIDcyMiA3MjIgMjc4IDAgNjY3IDUwMCA5NDQgNzIyIDc3OCA1NTYgMCA2MTEgNTU2IDU1NiA3MjIgNjY3IDEwMDAgNjY3IDY2NyAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA1MDBdPj4NZW5kb2JqDTExIDAgb2JqDTw8L0NvdW50IDAvVHlwZS9PdXRsaW5lcz4+DWVuZG9iag0xMiAwIG9iag1bMzcgMCBSIDM1IDAgUiAzMyAwIFIgMzEgMCBSIDI5IDAgUl0NZW5kb2JqDTEzIDAgb2JqDTw8L0Jhc2VGb250L0x1eHVyeS1Hb2xkL0VuY29kaW5nIDE3IDAgUi9GaXJzdENoYXIgMC9Gb250RGVzY3JpcHRvciAxOCAwIFIvTGFzdENoYXIgMjU1L1N1YnR5cGUvVHlwZTEvVHlwZS9Gb250L1dpZHRoc1s1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDI4MiAyNzMgMzc3IDU1OCA4MDQgMTAyMSA4OTUgMjEyIDMyNSAzMjUgNDQwIDQ5NCAyODMgMzQwIDI4MyA0MTQgOTA2IDQwNiA3MzcgNzU4IDc4OSA3NjEgODE4IDc0OCA4MjYgODE4IDI5MyAyOTMgNDc5IDQ3MCA0NzkgNjg4IDEwNjkgOTA1IDg4MSA4MzYgOTAwIDc5MiA3NjUgODc2IDkxNyAyODkgNzE2IDg2NyA3NTkgMTAxNSA5MDUgOTQ2IDg2MiA5NDYgODcwIDgyNiA4MDMgOTA2IDkwNSAxMjI1IDgyOCA4MDMgNzcyIDM0OSA0MTQgMzQ5IDU5NSA0NjYgNTAwIDY4NiA3MzcgNjU0IDczNyA2ODUgNDg1IDcxMSA3MjcgMjUzIDI1MyA2NzUgMjUzIDExMzYgNzI3IDczNCA3MzcgNzM3IDQ5NiA2NDggNDg3IDcyNyA3NDcgOTk1IDY4MSA3MTQgNjMyIDM3NCAyNzUgMzc0IDUwMCA1MDAgOTA1IDkwNSA4MzYgNzkyIDkwNSA5NDYgOTA2IDY4NiA2ODYgNjg2IDY4NiA2ODYgNjg2IDY1NCA2ODUgNjg1IDY4NSA2ODUgMjUzIDI1MyAyNTMgMjUzIDcyNyA3MzQgNzM0IDczNCA3MzQgNzM0IDcyNyA3MjcgNzI3IDcyNyA1MDAgMzkwIDY1NCA3MTAgNzkyIDQ4OCA4MDggNzYyIDQ3MSA5NDYgNzcyIDUwMCA1MDAgNTAwIDEzODkgOTQ2IDUwMCA1MDAgNTAwIDUwMCA3NzEgNzI3IDUwMCA1MDAgNTAwIDUwMCA1MDAgNTUwIDU4NSA1MDAgMTE3NCA3MzQgNjg4IDI3MyA2MzAgNTAwIDUzMCA1MDAgNTAwIDUwNiA1MDYgODAzIDUwMCA5MDUgOTA1IDk0NiAxNDIzIDEyNDcgNTQwIDc0MCA0MjAgNDIwIDIzNiAyMzYgNDk0IDUwMCA3MTQgODAzIDI2MiA4OTEgMzAwIDMwMCA3MDggNzA4IDUwMCAyODMgMjM2IDQyMCAxNTAzIDkwNSA3OTIgOTA1IDc5MiA3OTIgMjg5IDI4OSAyODkgMjg5IDk0NiA5NDYgNTAwIDk0NiA5MDYgOTA2IDkwNiAyNTMgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwXT4+DWVuZG9iag0xNCAwIG9iag08PC9CYXNlRm9udC9NaW5pb25Qcm8tUmVndWxhci9FbmNvZGluZyAxNSAwIFIvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgMTYgMCBSL0xhc3RDaGFyIDI1NS9TdWJ0eXBlL1R5cGUxL1R5cGUvRm9udC9XaWR0aHNbNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCAyMjcgMjc2IDMxOCA0ODAgNDgwIDc1NiA3MTEgMTY5IDM0NiAzNDYgNDA0IDU4MCAyMjggMzU2IDIyOCAzMzEgNDgwIDQ4MCA0ODAgNDgwIDQ4MCA0ODAgNDgwIDQ4MCA0ODAgNDgwIDIyOCAyMjggNTUyIDU4MCA1NTIgMzc5IDc1MyA2OTEgNTg4IDY2NSA3MzUgNTY4IDUyOSA3MTUgNzY2IDM0MSAzMjkgNjczIDUzOCA4OTEgNzQzIDc0NyA1NjMgNzQ1IDYyMSA0NzQgNjE3IDczNiA3MDMgOTcxIDY1NCA2MzQgNjAzIDM0NSAzMzMgMzQ1IDU2NiA1MDAgNDAwIDQzOSA1MDggNDIzIDUyOCA0MjUgMjk2IDQ2OCA1MzQgMjY4IDI1NiA0OTYgMjUzIDgxOSA1NDcgNTEwIDUyNCA1MTEgMzcxIDM2NyAzMDUgNTMxIDQ2MyA2ODUgNDcyIDQ1OSA0MjAgMzQ3IDI2MyAzNDcgNTgwIDUwMCA2OTEgNjkxIDY2MSA1NjggNzQzIDc0NyA3MzYgNDM5IDQzOSA0MzkgNDM5IDQzOSA0MzkgNDIxIDQyNSA0MjUgNDI1IDQyNSAyNjggMjY4IDI2OCAyNjggNTQ3IDUxMCA1MTAgNTEwIDUxMCA1MTAgNTMxIDUzMSA1MzEgNTMxIDQ5MCAzNDMgNDgwIDQ4MCA0NzcgMzkwIDQ5NyA1NDUgMzIxIDcwMiA0NTkgNDAwIDQwMCA1MDAgODY5IDc0OSA1MDAgNTgwIDUwMCA1MDAgNDgwIDUxMiA1MDAgNTAwIDUwMCA1MDAgNTAwIDMwNSAzMzQgNTAwIDY3MSA1MTMgMzc5IDI3NiA1ODAgNTAwIDQ4MCA1MDAgNTAwIDQ0NCA0NDUgOTcwIDUwMCA2OTEgNjkxIDc0NyA5NzMgNzcwIDUyMCA5MjIgMzk4IDQwMSAyMjQgMjIzIDU4MCA1MDAgNDU5IDYzNCAxNTkgNDgwIDI3OSAyNzkgNTM1IDUzMyA0ODkgMjI2IDIzOSA0MjkgMTA2MiA2OTEgNTY4IDY5MSA1NjggNTY4IDM0MSAzNDEgMzQxIDM0MSA3NDcgNzQ3IDUwMCA3NDcgNzM2IDczNiA3MzYgMjY4IDQwMCA0MDAgNDAwIDQwMCA0MDAgNDAwIDQwMCA0MDAgNDAwIDQwMF0+Pg1lbmRvYmoNMTUgMCBvYmoNPDwvQmFzZUVuY29kaW5nL01hY1JvbWFuRW5jb2RpbmcvRGlmZmVyZW5jZXNbMjE5L0V1cm9dL1R5cGUvRW5jb2Rpbmc+Pg1lbmRvYmoNMTYgMCBvYmoNPDwvQXNjZW50IDk4OS9DYXBIZWlnaHQgNjUxL0Rlc2NlbnQgLTM2MC9GbGFncyAzNC9Gb250QkJveFstMjkwIC0zNjAgMTY4NCA5ODldL0ZvbnRGYW1pbHkoTWluaW9uIFBybykvRm9udE5hbWUvTWluaW9uUHJvLVJlZ3VsYXIvRm9udFN0cmV0Y2gvTm9ybWFsL0ZvbnRXZWlnaHQgNDAwL0l0YWxpY0FuZ2xlIDAvU3RlbVYgODAvVHlwZS9Gb250RGVzY3JpcHRvci9YSGVpZ2h0IDQzNz4+DWVuZG9iag0xNyAwIG9iag08PC9CYXNlRW5jb2RpbmcvTWFjUm9tYW5FbmNvZGluZy9EaWZmZXJlbmNlc1syMTkvRXVyb10vVHlwZS9FbmNvZGluZz4+DWVuZG9iag0xOCAwIG9iag08PC9Bc2NlbnQgODU0L0NhcEhlaWdodCA2MjQvRGVzY2VudCAtMjU0L0ZsYWdzIDMyL0ZvbnRCQm94Wy0xOTAgLTI1NCAxNTUxIDg1NF0vRm9udEZhbWlseShMdXh1cnkgR29sZCkvRm9udE5hbWUvTHV4dXJ5LUdvbGQvRm9udFN0cmV0Y2gvTm9ybWFsL0ZvbnRXZWlnaHQgNDAwL0l0YWxpY0FuZ2xlIDAvU3RlbVYgOTYvVHlwZS9Gb250RGVzY3JpcHRvci9YSGVpZ2h0IDQ0OT4+DWVuZG9iag0xOSAwIG9iag08PC9CaXRzUGVyQ29tcG9uZW50IDgvQ29sb3JTcGFjZSA5IDAgUi9GaWx0ZXJbL0FTQ0lJODVEZWNvZGUvRmxhdGVEZWNvZGVdL0hlaWdodCAyNS9MZW5ndGggMjQ3L1dpZHRoIDM5Pj5zdHJlYW0NCjg7VzpoWW1uVm8kcTctZFEnKVReXm0yJm5hXS9gTSleSC47P0MvdCdTOk9UdU9UYUYpSzdwdDFJX0g1YjZFWjI0CkVPbVx0O3VuMGc1RU0iaCJ0V2xrTkZfaS1lcl1VKyEjPlthQiNOZnU+VzhSPj1HWSdAQXQ/VEhvSTIidEo6QE5LClIyMSMyTmpjKFBbZjoiQWQzZkNjZCQoJzVCc15eTF1vNmZQMmF1I0pwNyxAWSgvXkJlS1UraGJYYThfKmhLIUtyClhsUkxNQzJRLi5wOD91Mmg3J3UvQDc3LlhYczFGOmhMYioqJCJfdXAhIz1MUC1Ofj4NZW5kc3RyZWFtDWVuZG9iag0yMCAwIG9iag08PC9CaXRzUGVyQ29tcG9uZW50IDgvQ29sb3JTcGFjZSA5IDAgUi9GaWx0ZXJbL0FTQ0lJODVEZWNvZGUvRmxhdGVEZWNvZGVdL0hlaWdodCAyNS9MZW5ndGggMjQyL1dpZHRoIDM5Pj5zdHJlYW0NCjg7VzpoOyVlQyUjWGw0aD9RSCQzXVttSGwtLE43Jl85bGtJa0dqJj9mM0JJXFNJJV49ZnJoYWhQRi9LbmI6WyxpCkM+M1gmMj1JZFZQO3JaMEZJcGJCaiRhKEtzMFduYUAiOUo3TCE/WVNecTpULEZOZUBJSzs+W0s+SGo1OTdhJFEwCkliNkNga0syLUAlMl9KWTRMc0E3PlA0JFI3SjNkMExHOSJsYCEtVmssUyxmT29WbEslbz5gZiI7UFdGTm9GM1YyCkkmPl5ZIkFfM11eWmkmOURuUCw5XVBGRChVXFhHY0lgaCdaISRcX1Jpcn4+DWVuZHN0cmVhbQ1lbmRvYmoNMjEgMCBvYmoNPDwvQ291bnQgMi9LaWRzWzI3IDAgUiAxIDAgUl0vVHlwZS9QYWdlcz4+DWVuZG9iag0yMiAwIG9iag08PC9MZW5ndGggMjQ4Ni9TdWJ0eXBlL1hNTC9UeXBlL01ldGFkYXRhPj5zdHJlYW0NCjw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDEwLjAtYzAwMCAyNS5HLmVmNzJlNGUsIDIwMjUvMDYvMjctMTg6NTQ6MDUgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnBkZj0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDI2LTAyLTA4VDE4OjU4OjU5LTA1OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyNi0wMi0wOFQxODo1OTowMC0wNTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjYtMDItMDhUMTg6NTk6MDAtMDU6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIEluRGVzaWduIDIxLjIgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+dXVpZDowZDEwMDhiOC03ZWU2LWJhNGUtOWVjOS1lZTI4Y2RiYzY3ZGE8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpiN2M1ZDM3Ni1iYjQyLTQ5ODMtYjExMC1hNDI2MDRjMmNhOGI8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmlkOmM3ZWNiZmYwLWZmNDYtNGExMy05YzZhLWEzYzBkZjYxNmY3MTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOlJlbmRpdGlvbkNsYXNzPnByb29mOnBkZjwveG1wTU06UmVuZGl0aW9uQ2xhc3M+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24veC1pbmRlc2lnbiB0byBhcHBsaWNhdGlvbi9wZGY8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIEluRGVzaWduIDIxLjIgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjYtMDItMDhUMTg6NTg6NTktMDU6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDo5NjVjOWE4OC0zNDUwLTQ5MWMtOGVjMS05NmViZmNjOTYwN2U8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6ZThiZGM0NTgtZjJmNy00NGM1LTk4Y2YtZDgxNjA4ZGZmNTAyPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6YjdjNWQzNzYtYmI0Mi00OTgzLWIxMTAtYTQyNjA0YzJjYThiPC9zdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpyZW5kaXRpb25DbGFzcz5kZWZhdWx0PC9zdFJlZjpyZW5kaXRpb25DbGFzcz4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPGRjOmZvcm1hdD5hcHBsaWNhdGlvbi9wZGY8L2RjOmZvcm1hdD4KICAgICAgICAgPHBkZjpQcm9kdWNlcj5BZG9iZSBQREYgTGlicmFyeSAxOC4wPC9wZGY6UHJvZHVjZXI+CiAgICAgICAgIDxwZGY6VHJhcHBlZD5GYWxzZTwvcGRmOlRyYXBwZWQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+DWVuZHN0cmVhbQ1lbmRvYmoNMjMgMCBvYmoNPDwvQ3JlYXRpb25EYXRlKEQ6MjAyNjAyMDgxODU4NTktMDUnMDAnKS9DcmVhdG9yKEFkb2JlIEluRGVzaWduIDIxLjIgXChNYWNpbnRvc2hcKSkvTW9kRGF0ZShEOjIwMjYwMjA4MTg1OTAwLTA1JzAwJykvUHJvZHVjZXIoQWRvYmUgUERGIExpYnJhcnkgMTguMCkvVHJhcHBlZC9GYWxzZT4+DWVuZG9iag14cmVmDQowIDI0DQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMjI4ODcgMDAwMDAgbg0KMDAwMDAyMzg5NiAwMDAwMCBuDQowMDAwMDI0NzQxIDAwMDAwIG4NCjAwMDAwMjc1MzcgMDAwMDAgbg0KMDAwMDAyNzk3OSAwMDAwMCBuDQowMDAwMDI4NDU3IDAwMDAwIG4NCjAwMDAxMzE1MzMgMDAwMDAgbg0KMDAwMDEzMTc1OCAwMDAwMCBuDQowMDAwMTMyMjcwIDAwMDAwIG4NCjAwMDAxMzIzMTYgMDAwMDAgbg0KMDAwMDEzMjgxNyAwMDAwMCBuDQowMDAwMTMyODYwIDAwMDAwIG4NCjAwMDAxMzI5MTMgMDAwMDAgbg0KMDAwMDEzNDA4NCAwMDAwMCBuDQowMDAwMTM1MjUyIDAwMDAwIG4NCjAwMDAxMzUzMzkgMDAwMDAgbg0KMDAwMDEzNTU3NSAwMDAwMCBuDQowMDAwMTM1NjYyIDAwMDAwIG4NCjAwMDAxMzU4OTMgMDAwMDAgbg0KMDAwMDEzNjI4MCAwMDAwMCBuDQowMDAwMTM2NjYyIDAwMDAwIG4NCjAwMDAxMzY3MjEgMDAwMDAgbg0KMDAwMDEzOTI4NCAwMDAwMCBuDQp0cmFpbGVyDTw8L1NpemUgMjQvSURbPEZBNzExNzI0NTZFOTQyMDA5MTg2RTgxMDU4QzAxNjMwPjw5NzZDM0ZFRTQ3MEM0RDM1QTc4REJGQTI5MkY5NjJEMz5dPj4Nc3RhcnR4cmVmDTExNg0lJUVPRg0=",
  "name-plate": "JVBERi0xLjcNJeLjz9MNCjE1IDAgb2JqDTw8L0xpbmVhcml6ZWQgMS9MIDczNzg5L08gMTgvRSA2NjYxMi9OIDEvVCA3MzM3NC9IIFsgNzk2IDI1Ml0+Pg1lbmRvYmoNICAgICAgICAgICAgICAgICAgIA14cmVmDQoxNSAyNQ0KMDAwMDAwMDAxNiAwMDAwMCBuDQowMDAwMDAxMDQ4IDAwMDAwIG4NCjAwMDAwMDExOTAgMDAwMDAgbg0KMDAwMDAwMTI4MiAwMDAwMCBuDQowMDAwMDAyMzE5IDAwMDAwIG4NCjAwMDAwMDIzNTEgMDAwMDAgbg0KMDAwMDAwMjU1OSAwMDAwMCBuDQowMDAwMDAyNzM4IDAwMDAwIG4NCjAwMDAwMDI5MzkgMDAwMDAgbg0KMDAwMDAwMzExNiAwMDAwMCBuDQowMDAwMDAzMTUxIDAwMDAwIG4NCjAwMDAwMDM5MjMgMDAwMDAgbg0KMDAwMDAwNDYzOCAwMDAwMCBuDQowMDAwMDA1MzI4IDAwMDAwIG4NCjAwMDAwMDYwNzMgMDAwMDAgbg0KMDAwMDAwNjYyMiAwMDAwMCBuDQowMDAwMDA3MjY2IDAwMDAwIG4NCjAwMDAwMDgxNDQgMDAwMDAgbg0KMDAwMDAwODkzNSAwMDAwMCBuDQowMDAwMDA4OTY2IDAwMDAwIG4NCjAwMDAwMDg5OTcgMDAwMDAgbg0KMDAwMDAxMTY0NSAwMDAwMCBuDQowMDAwMDExNzU4IDAwMDAwIG4NCjAwMDAwNjYzODYgMDAwMDAgbg0KMDAwMDAwMDc5NiAwMDAwMCBuDQp0cmFpbGVyDTw8L1NpemUgNDAvUm9vdCAxNiAwIFIvSW5mbyAxNCAwIFIvSURbPDQ3MUE4MDFGMTlEQjRFNjU5N0NDNTA1MUE1NTIxQTVBPjw4NDhDQjNDOTc1OTY0ODI0ODBBMEI1QkY0QTZBQzMxMT5dL1ByZXYgNzMzNjM+Pg1zdGFydHhyZWYNMA0lJUVPRg0gICAgICAgICAgICAgICAgICAgDTM5IDAgb2JqDTw8L0ZpbHRlci9GbGF0ZURlY29kZS9JIDIwMC9MZW5ndGggMTU0L08gMTU4L1MgNDEvVCAxMTYvViAxNzQ+PnN0cmVhbQ0KaN5iYGAQY2BgXsUABP/7GFABMxCzMHA8YGDgaAAyGRkYmS0YwBoYJMAK5BkEGGyZ3wFlNjJMYVjFMImBhekp0xqmyUynmNiYUpn9mX6AlHFZMgRddWU4zMDP+BBiMjcDo6A32EgQEQcWY2TABpgZGFnToLJaYPcwsk4A0uxAQ3YDaTYGVsmEDJAIHwOjzEOoym0AAQYA0JoWMw1lbmRzdHJlYW0NZW5kb2JqDTE2IDAgb2JqDTw8L0Fjcm9Gb3JtIDE3IDAgUi9MYW5nKGVuLVVTKS9NZXRhZGF0YSAxMyAwIFIvT3V0bGluZXMgMyAwIFIvUGFnZXMgMTIgMCBSL1R5cGUvQ2F0YWxvZy9WaWV3ZXJQcmVmZXJlbmNlczw8L0RpcmVjdGlvbi9MMlI+Pj4+DWVuZG9iag0xNyAwIG9iag08PC9EUjw8L0ZvbnQ8PC9MdXh1cnktR29sZCA1IDAgUi9NaW5pb25Qcm8tUmVndWxhciA2IDAgUj4+Pj4vRmllbGRzIDQgMCBSPj4NZW5kb2JqDTE4IDAgb2JqDTw8L0Fubm90cyAxOSAwIFIvQXJ0Qm94WzAuMCAwLjAgNjEyLjAgNzkyLjBdL0JsZWVkQm94WzAuMCAwLjAgNjEyLjAgNzkyLjBdL0NvbnRlbnRzWzI1IDAgUiAyNiAwIFIgMjcgMCBSIDI4IDAgUiAyOSAwIFIgMzAgMCBSIDMxIDAgUiAzMiAwIFJdL0Nyb3BCb3hbMC4wIDAuMCA2MTIuMCA3OTIuMF0vTWVkaWFCb3hbMC4wIDAuMCA2MTIuMCA3OTIuMF0vUGFyZW50IDEyIDAgUi9SZXNvdXJjZXM8PC9Db2xvclNwYWNlPDwvQ1MwIDI0IDAgUj4+L0V4dEdTdGF0ZTw8L0dTMCAzNiAwIFI+Pj4+L1JvdGF0ZSAwL1RhYnMvVy9UaHVtYiAxMSAwIFIvVHJpbUJveFswLjAgMC4wIDYxMi4wIDc5Mi4wXS9UeXBlL1BhZ2UvUGllY2VJbmZvPDwvSW5EZXNpZ248PC9Eb2N1bWVudElEPEZFRkYwMDc4MDA2RDAwNzAwMDJFMDA2NDAwNjkwMDY0MDAzQTAwMzcwMDY0MDAzMTAwMzAwMDMzMDAzMzAwMzMwMDM1MDAyRDAwMzMwMDYzMDA2NTAwNjUwMDJEMDAzNDAwNjQwMDMxMDA2NTAwMkQwMDM5MDAzNDAwNjEwMDY0MDAyRDAwNjUwMDM0MDAzOTAwMzkwMDM5MDAzMjAwMzcwMDMyMDA2NjAwNjUwMDM2MDAzMj4vTGFzdE1vZGlmaWVkPEZFRkYwMDQ0MDAzQTAwMzIwMDMwMDAzMjAwMzYwMDMwMDAzMjAwMzAwMDM5MDAzMDAwMzAwMDMxMDAzMTAwMzEwMDMwMDA1QT4vTGlua2VkSW1hZ2VzPDw+Pi9OdW1iZXJvZlBhZ2VzIDEvT3JpZ2luYWxEb2N1bWVudElEPEZFRkYwMDc4MDA2RDAwNzAwMDJFMDA2NDAwNjkwMDY0MDAzQTAwMzcwMDM3MDAzMjAwMzMwMDYyMDA2NDAwMzcwMDY0MDAyRDAwMzkwMDYyMDA2NjAwMzEwMDJEMDAzNDAwMzIwMDM3MDAzMTAwMkQwMDM4MDAzODAwMzQwMDM2MDAyRDAwMzgwMDY2MDA2MzAwMzQwMDM0MDAzMTAwMzMwMDY2MDA2NjAwNjEwMDMxMDA2NT4vUGFnZVRyYW5zZm9ybWF0aW9uTWF0cml4TGlzdDw8LzBbMS4wIDAuMCAwLjAgMS4wIDAuMCAwLjBdPj4vUGFnZVVJRExpc3Q8PC8wIDI0Nz4+L1BhZ2VXaWR0aExpc3Q8PC8wIDYxMi4wPj4vUHJpdmF0ZVszNyAwIFIgMzggMCBSXT4+Pj4+Pg1lbmRvYmoNMTkgMCBvYmoNWzIwIDAgUiAyMiAwIFJdDWVuZG9iag0yMCAwIG9iag08PC9BUDw8L04gMjEgMCBSPj4vQlM8PC9TL1MvVyAxPj4vREEoL0x1eHVyeS1Hb2xkIDIzIFRmIDAgZykvRiA0L0ZUL1R4L0ZmIDIvTUsgMzQgMCBSL1AgMTggMCBSL1EgMC9SZWN0WzMyLjI4NjggNDkwLjExOCA0OTEuNjQ2IDU5OC4wMzZdL1N1YnR5cGUvV2lkZ2V0L1QoSm9iIFRpdGxlKS9UVShKb2IgVGl0bGUpL1R5cGUvQW5ub3Q+Pg1lbmRvYmoNMjEgMCBvYmoNPDwvQkJveFswLjAgMTA3LjkxOCA0NTkuMzU5IDAuMF0vRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAyMi9NYXRyaXhbMS4wIDAuMCAwLjAgMS4wIDAuMCAwLjBdL1Jlc291cmNlczw8Pj4vU3VidHlwZS9Gb3JtPj5zdHJlYW0NCkiJ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cmVhbQ1lbmRvYmoNMSAwIG9iag1bL0luZGV4ZWQvRGV2aWNlUkdCIDI1NSAyIDAgUl0NZW5kb2JqDTIgMCBvYmoNPDwvRmlsdGVyWy9BU0NJSTg1RGVjb2RlL0ZsYXRlRGVjb2RlXS9MZW5ndGggNDI4Pj5zdHJlYW0NCjg7WF1PPkVxTkAlJydPX0AlZUA/SjslKzgoOWU+WD1NUjZTP2leWWdBMz1dLkhEWEYuUiRsSUxAInBKK0VQKCUwCmJdNmFqbU5abiohPSdPUVplUV5ZKiw9XT9DLkIrXFVsZzlkaEQqImlDWzsqPTNgb1AxWyFTXik/MSlJWjRkdXBgCkUxciEvLCowWyo5LmFGSVIyJmItQyNzPFhsNUZIQFs8PSEjNlYpdURCWG5Jci5GPm9SWjdEbCVNTFlcLj9kPk1uCjYlUTJvWWZOUkYkJCtPTjwrXVJVSm1DMEk8amxMLm9YaXNaO1NZVVsvNyM8JjM3cmNsUUtxZUplIyxVRjdSZ2IxClZOV0ZLZj5uRFo0T1RzMFMhc2FHPkdHS1VsUSpRPzQ1OkNJJjRKJ18yajxldEpJQ2o3ZTduUE1iPU82UzdVT0g8ClBPN3JcSS5IdSZlMGQmRTwuJylmRVJyL2wrKlcsKXFeRCphaTU8dXVMWC43Zy8+JFhLcmNZcDBuK1hsX25VKk8oCmxbJDZObitaX05xMF1zN2hzXWBYWDFuWjgmOTRhXH4+DWVuZHN0cmVhbQ1lbmRvYmoNMyAwIG9iag08PC9Db3VudCAwL1R5cGUvT3V0bGluZXM+Pg1lbmRvYmoNNCAwIG9iag1bMjAgMCBSIDIyIDAgUl0NZW5kb2JqDTUgMCBvYmoNPDwvQmFzZUZvbnQvTHV4dXJ5LUdvbGQvRW5jb2RpbmcgOSAwIFIvRmlyc3RDaGFyIDAvRm9udERlc2NyaXB0b3IgMTAgMCBSL0xhc3RDaGFyIDI1NS9TdWJ0eXBlL1R5cGUxL1R5cGUvRm9udC9XaWR0aHNbNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCAyODIgMjczIDM3NyA1NTggODA0IDEwMjEgODk1IDIxMiAzMjUgMzI1IDQ0MCA0OTQgMjgzIDM0MCAyODMgNDE0IDkwNiA0MDYgNzM3IDc1OCA3ODkgNzYxIDgxOCA3NDggODI2IDgxOCAyOTMgMjkzIDQ3OSA0NzAgNDc5IDY4OCAxMDY5IDkwNSA4ODEgODM2IDkwMCA3OTIgNzY1IDg3NiA5MTcgMjg5IDcxNiA4NjcgNzU5IDEwMTUgOTA1IDk0NiA4NjIgOTQ2IDg3MCA4MjYgODAzIDkwNiA5MDUgMTIyNSA4MjggODAzIDc3MiAzNDkgNDE0IDM0OSA1OTUgNDY2IDUwMCA2ODYgNzM3IDY1NCA3MzcgNjg1IDQ4NSA3MTEgNzI3IDI1MyAyNTMgNjc1IDI1MyAxMTM2IDcyNyA3MzQgNzM3IDczNyA0OTYgNjQ4IDQ4NyA3MjcgNzQ3IDk5NSA2ODEgNzE0IDYzMiAzNzQgMjc1IDM3NCA1MDAgNTAwIDkwNSA5MDUgODM2IDc5MiA5MDUgOTQ2IDkwNiA2ODYgNjg2IDY4NiA2ODYgNjg2IDY4NiA2NTQgNjg1IDY4NSA2ODUgNjg1IDI1MyAyNTMgMjUzIDI1MyA3MjcgNzM0IDczNCA3MzQgNzM0IDczNCA3MjcgNzI3IDcyNyA3MjcgNTAwIDM5MCA2NTQgNzEwIDc5MiA0ODggODA4IDc2MiA0NzEgOTQ2IDc3MiA1MDAgNTAwIDUwMCAxMzg5IDk0NiA1MDAgNTAwIDUwMCA1MDAgNzcxIDcyNyA1MDAgNTAwIDUwMCA1MDAgNTAwIDU1MCA1ODUgNTAwIDExNzQgNzM0IDY4OCAyNzMgNjMwIDUwMCA1MzAgNTAwIDUwMCA1MDYgNTA2IDgwMyA1MDAgOTA1IDkwNSA5NDYgMTQyMyAxMjQ3IDU0MCA3NDAgNDIwIDQyMCAyMzYgMjM2IDQ5NCA1MDAgNzE0IDgwMyAyNjIgODkxIDMwMCAzMDAgNzA4IDcwOCA1MDAgMjgzIDIzNiA0MjAgMTUwMyA5MDUgNzkyIDkwNSA3OTIgNzkyIDI4OSAyODkgMjg5IDI4OSA5NDYgOTQ2IDUwMCA5NDYgOTA2IDkwNiA5MDYgMjUzIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMF0+Pg1lbmRvYmoNNiAwIG9iag08PC9CYXNlRm9udC9NaW5pb25Qcm8tUmVndWxhci9FbmNvZGluZyA3IDAgUi9GaXJzdENoYXIgMC9Gb250RGVzY3JpcHRvciA4IDAgUi9MYXN0Q2hhciAyNTUvU3VidHlwZS9UeXBlMS9UeXBlL0ZvbnQvV2lkdGhzWzUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCA1MDAgMjI3IDI3NiAzMTggNDgwIDQ4MCA3NTYgNzExIDE2OSAzNDYgMzQ2IDQwNCA1ODAgMjI4IDM1NiAyMjggMzMxIDQ4MCA0ODAgNDgwIDQ4MCA0ODAgNDgwIDQ4MCA0ODAgNDgwIDQ4MCAyMjggMjI4IDU1MiA1ODAgNTUyIDM3OSA3NTMgNjkxIDU4OCA2NjUgNzM1IDU2OCA1MjkgNzE1IDc2NiAzNDEgMzI5IDY3MyA1MzggODkxIDc0MyA3NDcgNTYzIDc0NSA2MjEgNDc0IDYxNyA3MzYgNzAzIDk3MSA2NTQgNjM0IDYwMyAzNDUgMzMzIDM0NSA1NjYgNTAwIDQwMCA0MzkgNTA4IDQyMyA1MjggNDI1IDI5NiA0NjggNTM0IDI2OCAyNTYgNDk2IDI1MyA4MTkgNTQ3IDUxMCA1MjQgNTExIDM3MSAzNjcgMzA1IDUzMSA0NjMgNjg1IDQ3MiA0NTkgNDIwIDM0NyAyNjMgMzQ3IDU4MCA1MDAgNjkxIDY5MSA2NjEgNTY4IDc0MyA3NDcgNzM2IDQzOSA0MzkgNDM5IDQzOSA0MzkgNDM5IDQyMSA0MjUgNDI1IDQyNSA0MjUgMjY4IDI2OCAyNjggMjY4IDU0NyA1MTAgNTEwIDUxMCA1MTAgNTEwIDUzMSA1MzEgNTMxIDUzMSA0OTAgMzQzIDQ4MCA0ODAgNDc3IDM5MCA0OTcgNTQ1IDMyMSA3MDIgNDU5IDQwMCA0MDAgNTAwIDg2OSA3NDkgNTAwIDU4MCA1MDAgNTAwIDQ4MCA1MTIgNTAwIDUwMCA1MDAgNTAwIDUwMCAzMDUgMzM0IDUwMCA2NzEgNTEzIDM3OSAyNzYgNTgwIDUwMCA0ODAgNTAwIDUwMCA0NDQgNDQ1IDk3MCA1MDAgNjkxIDY5MSA3NDcgOTczIDc3MCA1MjAgOTIyIDM5OCA0MDEgMjI0IDIyMyA1ODAgNTAwIDQ1OSA2MzQgMTU5IDQ4MCAyNzkgMjc5IDUzNSA1MzMgNDg5IDIyNiAyMzkgNDI5IDEwNjIgNjkxIDU2OCA2OTEgNTY4IDU2OCAzNDEgMzQxIDM0MSAzNDEgNzQ3IDc0NyA1MDAgNzQ3IDczNiA3MzYgNzM2IDI2OCA0MDAgNDAwIDQwMCA0MDAgNDAwIDQwMCA0MDAgNDAwIDQwMCA0MDBdPj4NZW5kb2JqDTcgMCBvYmoNPDwvQmFzZUVuY29kaW5nL01hY1JvbWFuRW5jb2RpbmcvRGlmZmVyZW5jZXNbMjE5L0V1cm9dL1R5cGUvRW5jb2Rpbmc+Pg1lbmRvYmoNOCAwIG9iag08PC9Bc2NlbnQgOTg5L0NhcEhlaWdodCA2NTEvRGVzY2VudCAtMzYwL0ZsYWdzIDM0L0ZvbnRCQm94Wy0yOTAgLTM2MCAxNjg0IDk4OV0vRm9udEZhbWlseShNaW5pb24gUHJvKS9Gb250TmFtZS9NaW5pb25Qcm8tUmVndWxhci9Gb250U3RyZXRjaC9Ob3JtYWwvRm9udFdlaWdodCA0MDAvSXRhbGljQW5nbGUgMC9TdGVtViA4MC9UeXBlL0ZvbnREZXNjcmlwdG9yL1hIZWlnaHQgNDM3Pj4NZW5kb2JqDTkgMCBvYmoNPDwvQmFzZUVuY29kaW5nL01hY1JvbWFuRW5jb2RpbmcvRGlmZmVyZW5jZXNbMjE5L0V1cm9dL1R5cGUvRW5jb2Rpbmc+Pg1lbmRvYmoNMTAgMCBvYmoNPDwvQXNjZW50IDg1NC9DYXBIZWlnaHQgNjI0L0Rlc2NlbnQgLTI1NC9GbGFncyAzMi9Gb250QkJveFstMTkwIC0yNTQgMTU1MSA4NTRdL0ZvbnRGYW1pbHkoTHV4dXJ5IEdvbGQpL0ZvbnROYW1lL0x1eHVyeS1Hb2xkL0ZvbnRTdHJldGNoL05vcm1hbC9Gb250V2VpZ2h0IDQwMC9JdGFsaWNBbmdsZSAwL1N0ZW1WIDk2L1R5cGUvRm9udERlc2NyaXB0b3IvWEhlaWdodCA0NDk+Pg1lbmRvYmoNMTEgMCBvYmoNPDwvQml0c1BlckNvbXBvbmVudCA4L0NvbG9yU3BhY2UgMSAwIFIvRmlsdGVyWy9BU0NJSTg1RGVjb2RlL0ZsYXRlRGVjb2RlXS9IZWlnaHQgOTkvTGVuZ3RoIDIxMC9XaWR0aCA3Nj4+c3RyZWFtDQo4O1pdX1ltblQpJGo9QEA/YTB0dE9HNy8+Jk5IVkJNKDNbUC1hXEZ1KzxqKCQ1SlpbSCtodEJDckBQQ24vNCEsRQpbSycjT1ozMWk4SnIyNklAcClPMExxMjxSVS90VG5VS143W2ovZU5aN2VSYmBzJilTU3BILmRIbC5KXlg2cEp0OwpOMGleUWBWVlhbZmlSbSlMaztfYFFSb2FAWTBqUyZnRWpKWGBTXC06Il07YjdHQEsxPD9VUjpNNnBzRjI2cHNGMgo1UD5ycEhYVTZPfj4NZW5kc3RyZWFtDWVuZG9iag0xMiAwIG9iag08PC9Db3VudCAxL0tpZHNbMTggMCBSXS9UeXBlL1BhZ2VzPj4NZW5kb2JqDTEzIDAgb2JqDTw8L0xlbmd0aCAyNDg2L1N1YnR5cGUvWE1ML1R5cGUvTWV0YWRhdGE+PnN0cmVhbQ0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgMTAuMC1jMDAwIDI1LkcuZWY3MmU0ZSwgMjAyNS8wNi8yNy0xODo1NDowNSAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIj4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjYtMDItMDhUMTk6MTE6MTAtMDU6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDI2LTAyLTA4VDE5OjExOjExLTA1OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAyNi0wMi0wOFQxOToxMToxMS0wNTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW5EZXNpZ24gMjEuMiAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD51dWlkOjRhMzcyNDljLTQ5NTItNjA0NS1hMGIxLWQzNDlhZmY3MmNjNzwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjc3MjNiZDdkLTliZjEtNDI3MS04ODQ2LThmYzQ0MTNmZmExZTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuaWQ6N2ZhZDAyMDItMzdmNy00NDVlLTk1M2MtM2NkNWI4YzJhZDA0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06UmVuZGl0aW9uQ2xhc3M+cHJvb2Y6cGRmPC94bXBNTTpSZW5kaXRpb25DbGFzcz4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi94LWluZGVzaWduIHRvIGFwcGxpY2F0aW9uL3BkZjwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSW5EZXNpZ24gMjEuMiAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyNi0wMi0wOFQxOToxMToxMC0wNTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjEzZDcwNTcyLTA3OWMtNDMxNC05YzlmLTEzMTJmMWVhNTc0Yjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo3ZDEwMzMzNS0zY2VlLTRkMWUtOTRhZC1lNDk5OTI3MmZlNjI8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo3NzIzYmQ3ZC05YmYxLTQyNzEtODg0Ni04ZmM0NDEzZmZhMWU8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOnJlbmRpdGlvbkNsYXNzPmRlZmF1bHQ8L3N0UmVmOnJlbmRpdGlvbkNsYXNzPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8ZGM6Zm9ybWF0PmFwcGxpY2F0aW9uL3BkZjwvZGM6Zm9ybWF0PgogICAgICAgICA8cGRmOlByb2R1Y2VyPkFkb2JlIFBERiBMaWJyYXJ5IDE4LjA8L3BkZjpQcm9kdWNlcj4KICAgICAgICAgPHBkZjpUcmFwcGVkPkZhbHNlPC9wZGY6VHJhcHBlZD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz4NZW5kc3RyZWFtDWVuZG9iag0xNCAwIG9iag08PC9DcmVhdGlvbkRhdGUoRDoyMDI2MDIwODE5MTExMC0wNScwMCcpL0NyZWF0b3IoQWRvYmUgSW5EZXNpZ24gMjEuMiBcKE1hY2ludG9zaFwpKS9Nb2REYXRlKEQ6MjAyNjAyMDgxOTExMTEtMDUnMDAnKS9Qcm9kdWNlcihBZG9iZSBQREYgTGlicmFyeSAxOC4wKS9UcmFwcGVkL0ZhbHNlPj4NZW5kb2JqDXhyZWYNCjAgMTUNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDA2NjYxMiAwMDAwMCBuDQowMDAwMDY2NjU4IDAwMDAwIG4NCjAwMDAwNjcxNzAgMDAwMDAgbg0KMDAwMDA2NzIxMiAwMDAwMCBuDQowMDAwMDY3MjQzIDAwMDAwIG4NCjAwMDAwNjg0MTIgMDAwMDAgbg0KMDAwMDA2OTU3NyAwMDAwMCBuDQowMDAwMDY5NjYzIDAwMDAwIG4NCjAwMDAwNjk4OTggMDAwMDAgbg0KMDAwMDA2OTk4NCAwMDAwMCBuDQowMDAwMDcwMjE1IDAwMDAwIG4NCjAwMDAwNzA1NjUgMDAwMDAgbg0KMDAwMDA3MDYxOCAwMDAwMCBuDQowMDAwMDczMTgxIDAwMDAwIG4NCnRyYWlsZXINPDwvU2l6ZSAxNS9JRFs8NDcxQTgwMUYxOURCNEU2NTk3Q0M1MDUxQTU1MjFBNUE+PDg0OENCM0M5NzU5NjQ4MjQ4MEEwQjVCRjRBNkFDMzExPl0+Pg1zdGFydHhyZWYNMTE2DSUlRU9GDQ==",
};

// ─── PDF FIELD MAPPINGS PER ENTERPRISE ───
const PDF_FIELD_MAP = {
  nhbp: {
    front: { "First Last Name": d => `${d.firstName} ${d.lastName}`, "Job Title ": d => d.title, "Cellphone": d => d.cellPhone ? `c: ${d.cellPhone}` : "", "Fax": d => d.fax ? `f: ${d.fax}` : "", "Email Address": d => d.email ? `e: ${d.email}` : "" },
    back: { "NHBP Main": (d, loc) => loc ? `${loc.displayLabel}\n${loc.address.toUpperCase()}  |  ${loc.city.toUpperCase()}, ${loc.state} ${loc.zip}\nnhbp-nsn.gov` : "" },
  },
  "tribal-court": {
    front: { "First Last": d => `${d.firstName} ${d.lastName}`, "Job Title": d => d.title, "Phone": d => d.officePhone || "", "Cell": d => d.cellPhone || "", "Fax": d => d.fax || "", "Email ": d => d.email || "" },
    back: null,
  },
  "tribal-police": {
    front: { "Name": d => `${d.firstName} ${d.lastName}`, "Job Title": d => d.title, "Phone ": d => d.officePhone || "", "Cell Phone": d => d.cellPhone || "", "Email": d => d.email || "" },
    back: null,
  },
};

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
          fontFamily: "Tahoma, sans-serif", letterSpacing: "0.05em",
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
          fontFamily: "Tahoma, sans-serif", letterSpacing: "0.05em",
          transition: "all 0.3s ease",
        }}>
          {generating ? "Generating PDF..." : "⤓  Download Filled Name Plate PDF"}
        </button>
      </div>
    </div>
  );
};

function StationeryKitForm({ onBackToPortal }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fading, setFading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
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

  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  useEffect(() => {
    const handler = (e) => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

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

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-SK");
    setTicketNumber(t);
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\u25CE ${form.items.join(", ") || "Stationery Kit"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Title: ${form.title || "N/A"}`, `Department: ${form.department || "N/A"}`, "",
        "\uD83D\uDCE6 STATIONERY REQUEST", `Enterprise: ${form.enterprise || "N/A"}`, `Items: ${form.items.join(", ") || "None"}`, `Reason: ${form.reason || "N/A"}`,
        `Office Location: ${form.officeLocation || "N/A"}`, `Quantity: ${form.quantity || "N/A"}`, form.notes ? `\nNotes: ${form.notes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Employee Stationery Kit", serviceId: "stationery",
      requesterName: name, email: form.email,
      department: form.department, title: form.title, enterprise: form.enterprise,
      items: form.items, reason: form.reason, officeLocation: form.officeLocation,
      quantity: form.quantity, notes: form.notes,
    });
    setSubmitted(true);
  };

  const canAdvance = () => {
    switch (step) {
      case 0: return form.enterprise !== null;
      case 1: return form.items.length > 0;
      case 2: return form.reason !== null;
      case 3: return form.firstName.trim() && form.lastName.trim() && form.title.trim() && form.email.includes("@");
      case 4: return form.officeLocation !== null;
      case 5: return true;
      default: return true;
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && canAdvance()) { e.preventDefault(); goNext(); } };
  const filteredLocations = OFFICE_LOCATIONS.filter(l => l.enterprise === form.enterprise);

  const Background = () => (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: `radial-gradient(ellipse 800px 600px at ${mousePos.x}% ${mousePos.y}%, ${NHBP.turquoise}08, transparent), radial-gradient(ellipse 600px 500px at 20% 20%, ${NHBP.maroon}15, transparent), radial-gradient(ellipse 500px 400px at 80% 80%, ${NHBP.turquoise}06, transparent), linear-gradient(160deg, #08090c 0%, #0d1117 30%, #0c1018 60%, #080a0e 100%)` }} />
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", pointerEvents: "none", background: `radial-gradient(circle, ${NHBP.turquoise}0a 0%, transparent 70%)`, top: -100, right: -100, animation: "float1 25s ease-in-out infinite", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 350, height: 350, borderRadius: "50%", pointerEvents: "none", background: `radial-gradient(circle, ${NHBP.maroon}12 0%, transparent 70%)`, bottom: -80, left: -80, animation: "float2 30s ease-in-out infinite", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.015, pointerEvents: "none", backgroundImage: `linear-gradient(${NHBP.turquoise}20 1px, transparent 1px), linear-gradient(90deg, ${NHBP.turquoise}20 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 20px) scale(1.1); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, -25px) scale(1.05); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        input:focus, textarea:focus { border-color: ${NHBP.turquoise} !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        ::selection { background: ${NHBP.turquoise}40; }
        *, *::before, *::after { direction: ltr; unicode-bidi: normal; }
        input, textarea, select { direction: ltr !important; text-align: left !important; unicode-bidi: plaintext !important; }
      `}</style>
    </>
  );

  const slideStyle = { width: "100%", maxWidth: 620, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", opacity: fading ? 0 : 1, transform: fading ? `translateY(${direction * 24}px)` : "translateY(0)" };
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#f0f0f0", fontSize: 18, fontFamily: "Tahoma, 'Segoe UI', sans-serif", padding: "14px 16px", outline: "none", transition: "border-color 0.3s ease", caretColor: NHBP.turquoise, boxSizing: "border-box", direction: "ltr", textAlign: "left", unicodeBidi: "plaintext" };
  const labelStyle = { fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, display: "block" };

  // ═══════════ CONFIRMATION ═══════════
  if (submitted) {
    const loc = OFFICE_LOCATIONS.find(l => l.id === form.officeLocation);
    const ent = ENTERPRISES.find(e => e.id === form.enterprise);
    return (
      <div dir="ltr" style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", direction: "ltr" }}>
        <Background />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 24px", position: "relative", zIndex: 1, animation: "scaleIn 0.5s ease" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 28, background: `linear-gradient(135deg, ${NHBP.turquoise}, ${NHBP.turquoiseDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff", boxShadow: `0 0 50px ${NHBP.turquoiseGlow}` }}>✓</div>
          <h1 style={{ fontSize: 32, fontWeight: 300, margin: "0 0 8px" }}>Stationery Kit Submitted</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>Your order is ready for printing verification</p>
          <GlassCard style={{ padding: "14px 32px", marginBottom: 24 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>Request</span>
            <span style={{ fontSize: 24, fontWeight: 600, color: NHBP.turquoiseLight, fontFamily: "monospace" }}>{ticketNumber}</span>
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
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>01 / 0{totalSteps}</p>
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
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>02 / 0{totalSteps}</p>
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
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>03 / 0{totalSteps}</p>
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
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>04 / 0{totalSteps}</p>
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
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>05 / 0{totalSteps}</p>
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
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>06 / 0{totalSteps}</p>
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
    <div dir="ltr" style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", direction: "ltr" }}>
      <Background />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", padding: "0 24px" }}>
        <div style={{ padding: "20px 0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>◎</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Employee Stationery Kit</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>NHBP Communications</div>
        </div>
        <div style={{ padding: "16px 0 0", maxWidth: 620, width: "100%" }}>
          <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: `linear-gradient(90deg, ${NHBP.turquoise}, ${NHBP.turquoiseLight})`, width: `${((step + 1) / totalSteps) * 100}%`, transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 12px ${NHBP.turquoiseGlow}` }} />
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 0" }}>{renderStep()}</div>
        <div style={{ padding: "16px 0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 620, width: "100%" }}>
          <button onClick={goBack} style={{ background: "none", border: "none", color: step === 0 ? "transparent" : "rgba(255,255,255,0.3)", fontSize: 14, cursor: step === 0 ? "default" : "pointer", fontFamily: "Tahoma, sans-serif", padding: "8px 0", pointerEvents: step === 0 ? "none" : "auto" }}>← Back</button>
          {(step > 0 || form.items.length > 0) && (
            <button onClick={canAdvance() ? goNext : undefined} style={{ background: canAdvance() ? `linear-gradient(135deg, ${NHBP.turquoise}, ${NHBP.turquoiseDark})` : "rgba(255,255,255,0.05)", border: "none", borderRadius: 28, color: canAdvance() ? "#fff" : "rgba(255,255,255,0.2)", fontSize: 14, fontWeight: 600, padding: "12px 32px", cursor: canAdvance() ? "pointer" : "default", transition: "all 0.3s ease", boxShadow: canAdvance() ? `0 4px 20px ${NHBP.turquoiseGlow}` : "none", fontFamily: "Tahoma, sans-serif" }}>
              {step === totalSteps - 1 ? "Submit Order →" : "Continue →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN PORTAL
// ═══════════════════════════════════════════════════════════

// ===========================================================
//  EMPLOYEE HEADSHOTS FORM
// ===========================================================
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

  const [form, setForm] = useState({
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

// ===========================================================
//  INSTANT ALERT FORM
// ===========================================================
function InstantAlertForm({ onBackToPortal }) {
  const URGENCY_LEVELS = [
    { id: "emergency", icon: "🚨", label: "Emergency", desc: "Immediate — safety, closures, critical notices", color: C.red, glow: "rgba(186,12,47,0.3)" },
    { id: "urgent", icon: "⚡", label: "Urgent", desc: "Same day — time-sensitive announcements", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
    { id: "priority", icon: "📢", label: "Priority", desc: "Within 24 hours — important but not critical", color: C.turquoise, glow: C.turquoiseGlow },
  ];

  const CHANNELS = [
    { id: "email", icon: "📧", label: "Email Blast" },
    { id: "website", icon: "🌐", label: "Website Banner" },
    { id: "social", icon: "📱", label: "Social Media" },
    { id: "text", icon: "💬", label: "Text / SMS" },
    { id: "flyer", icon: "📄", label: "Printed Flyer" },
    { id: "all", icon: "🔊", label: "All Channels" },
  ];

  // ── Local sub-components ──
  const IaCard = ({ children, active, onClick, style: s = {}, glowColor }) => {
    const [h, setH] = useState(false);
    const gc = glowColor || C.turquoiseGlow;
    return (
      <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          background: active ? `linear-gradient(135deg, ${glowColor || C.turquoise}18, ${glowColor || C.turquoise}08)` : h ? "rgba(255,255,255,0.04)" : C.glass,
          border: `1px solid ${active ? (glowColor || C.turquoise) + "50" : h ? "rgba(255,255,255,0.12)" : C.border}`,
          borderRadius: 14, padding: "16px 20px", cursor: onClick ? "pointer" : "default",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: active ? `0 8px 32px ${gc}, inset 0 1px 0 rgba(255,255,255,0.06)` : h ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
          transform: h && onClick ? "translateY(-1px)" : "translateY(0)",
          position: "relative", overflow: "hidden", ...s,
        }}>
        {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${glowColor || C.turquoise}60, transparent)` }} />}
        {children}
      </div>
    );
  };

  const IaInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      {multiline ? (
        <textarea ref={ref} value={value} rows={4} placeholder={placeholder} onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
      ) : (
        <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
      )}
    </div>
  );

  const IaDeptSelect = ({ value, onChange }) => (
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

  const IaBadge = ({ name, color }) => (
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

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    department: "", urgency: null, channels: {},
    subject: "", message: "",
    audience: "", effectiveDate: "", effectiveTime: "",
    approvedBy: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const toggleChannel = (id) => setForm(p => ({ ...p, channels: { ...p.channels, [id]: !p.channels[id] } }));

  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);

  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-IA");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    const chList = Object.entries(form.channels).filter(([,v]) => v).map(([k]) => k).join(", ");
    await createTrelloCard(
      `\u26A1 ALERT: ${form.subject || "Instant Alert"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Department: ${form.department || "N/A"}`, "",
        "\u26A1 INSTANT ALERT", `Urgency: ${form.urgency || "N/A"}`, `Subject: ${form.subject || "N/A"}`,
        `Message: ${form.message || "N/A"}`, `Channels: ${chList || "N/A"}`, `Audience: ${form.audience || "N/A"}`,
        `Effective Date: ${form.effectiveDate || "N/A"}`, `Effective Time: ${form.effectiveTime || "N/A"}`,
        `Approved By: ${form.approvedBy || "N/A"}`,
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Instant Alert", serviceId: "instant-alert",
      requesterName: name, email: form.email,
      phone: form.phone, department: form.department, urgency: form.urgency,
      channels: form.channels, subject: form.subject, message: form.message,
      audience: form.audience, effectiveDate: form.effectiveDate,
      effectiveTime: form.effectiveTime, approvedBy: form.approvedBy,
    });
    setSubmitted(true);
  };

  const labels = ["", "Requester", "Urgency", "Alert Message", "Distribution", "Review"];
  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;
  const urgencyObj = URGENCY_LEVELS.find(x => x.id === form.urgency);
  const accentColor = urgencyObj?.color || C.turquoise;

  // ── Local styles ──
  const IA = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
    bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.red}08, transparent 70%)`, pointerEvents: "none" },
    bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
    bgOrb3: { position: "fixed", top: "40%", left: "50%", width: "30vw", height: "30vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.turquoise}04, transparent 70%)`, pointerEvents: "none", transform: "translateX(-50%)" },
    progressWrap: { position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` },
    progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
    progressBar: { height: "100%", borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" },
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
      <div style={IA.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={IA.bgOrb1} /><div style={IA.bgOrb2} />
        <div style={IA.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>{urgencyObj?.icon || "⚡"}</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Alert Submitted</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your {urgencyObj?.label.toLowerCase()} alert has been routed<br />to Communications for immediate action.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            {form.urgency === "emergency" && <IaBadge name="🚨 Emergency" color="#eb5a46" />}
            {form.urgency === "urgent" && <IaBadge name="⚡ Urgent" color="#ff9f1a" />}
            {form.urgency === "priority" && <IaBadge name="📢 Priority" color="#00c2e0" />}
          </div>
          <IaCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Urgency", `${urgencyObj?.icon} ${urgencyObj?.label}`],
              ["Subject", form.subject],
              ["Channels", Object.entries(form.channels).filter(([,v]) => v).map(([k]) => CHANNELS.find(c => c.id === k)?.icon).join(" ")],
              ["By", `${form.firstName} ${form.lastName}`],
              ["Submitted", submissionDate],
            ].filter(([,v]) => v).map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 5 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? accentColor : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </IaCard>
          <button onClick={() => { setSubmitted(false); setStep(0); }} style={{ ...IA.btn, marginTop: 20 }}>Submit Another Alert</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={IA.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Instant Alert</h1>
          <p style={{ fontSize: 17, color: C.redLight, marginBottom: 4, fontWeight: 500 }}>Urgent Communications</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            Need to get an urgent message out fast?<br />Closures, emergencies, time-sensitive announcements —<br />this is the fast lane.
          </p>
          <button onClick={() => goTo(1)} style={{ ...IA.btn, background: C.red, boxShadow: `0 4px 16px rgba(186,12,47,0.3)` }}>Submit Alert →</button>
        </div>
      );

      case 1: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>Who's requesting?</h2>
          <p style={IA.stepDesc}>We need to know who to follow up with.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <IaInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <IaInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <IaDeptSelect value={form.department} onChange={(v) => u("department", v)} />
          <div style={{ display: "flex", gap: 12 }}>
            <IaInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
            <IaInput label="Phone" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" />
          </div>
          <div style={IA.navRow}>
            <button onClick={() => goTo(0)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.department} style={IA.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>How urgent is this?</h2>
          <p style={IA.stepDesc}>This determines how fast we act.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {URGENCY_LEVELS.map(l => (
              <IaCard key={l.id} active={form.urgency === l.id} onClick={() => u("urgency", l.id)}
                glowColor={l.color}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28, filter: form.urgency === l.id ? `drop-shadow(0 0 8px ${l.glow})` : "none" }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: form.urgency === l.id ? l.color : C.textPrimary }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{l.desc}</div>
                </div>
              </IaCard>
            ))}
          </div>
          <div style={IA.navRow}>
            <button onClick={() => goTo(1)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={!form.urgency} style={{ ...IA.btn, background: accentColor }}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>{urgencyObj?.icon} Alert Message</h2>
          <p style={IA.stepDesc}>What do people need to know?</p>
          <IaInput label="Subject Line" value={form.subject} required onChange={(v) => u("subject", v)} placeholder="e.g. Building Closure - Jan 15" inputRef={inputRef} />
          <IaInput label="Full Message" value={form.message} required onChange={(v) => u("message", v)} placeholder="The details people need to know..." multiline />
          <IaInput label="Who is this for?" value={form.audience} onChange={(v) => u("audience", v)} placeholder="All employees, specific department, tribal members, public..." />
          <div style={{ display: "flex", gap: 12 }}>
            <IaInput label="Effective Date" value={form.effectiveDate} type="date" onChange={(v) => u("effectiveDate", v)} />
            <IaInput label="Time" value={form.effectiveTime} type="time" onChange={(v) => u("effectiveTime", v)} />
          </div>
          <IaInput label="Approved By (if applicable)" value={form.approvedBy} onChange={(v) => u("approvedBy", v)} placeholder="Director, Council, Department Head..." />
          <div style={IA.navRow}>
            <button onClick={() => goTo(2)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(4)} disabled={!form.subject || !form.message} style={{ ...IA.btn, background: accentColor }}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={IA.stepWrap}>
          <h2 style={IA.stepTitle}>Distribution Channels</h2>
          <p style={IA.stepDesc}>How should this alert go out? Select all that apply.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {CHANNELS.map(c => (
              <IaCard key={c.id} active={form.channels[c.id]} onClick={() => toggleChannel(c.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: form.channels[c.id] ? C.textPrimary : C.textSecondary }}>{c.label}</span>
              </IaCard>
            ))}
          </div>
          <div style={IA.navRow}>
            <button onClick={() => goTo(3)} style={IA.btnBack}>← Back</button>
            <button onClick={() => goTo(5)} disabled={!Object.values(form.channels).some(v => v)} style={{ ...IA.btn, background: accentColor }}>Review →</button>
          </div>
        </div>
      );

      case 5: {
        const selectedChannels = Object.entries(form.channels).filter(([,v]) => v).map(([k]) => CHANNELS.find(c => c.id === k));
        const items = [
          ["Requester", `${form.firstName} ${form.lastName} — ${form.department}`],
          ["Urgency", `${urgencyObj?.icon} ${urgencyObj?.label}`],
          ["Subject", form.subject],
          ["Message", form.message],
          form.audience ? ["Audience", form.audience] : null,
          form.effectiveDate ? ["Effective", `${form.effectiveDate}${form.effectiveTime ? ` at ${form.effectiveTime}` : ""}`] : null,
          ["Channels", selectedChannels.map(c => `${c.icon} ${c.label}`).join(", ")],
          form.approvedBy ? ["Approved By", form.approvedBy] : null,
          ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`],
          ["Submitted", submissionDate || new Date().toLocaleString()],
        ].filter(Boolean);

        return (
          <div style={IA.stepWrap}>
            <h2 style={IA.stepTitle}>Review Alert</h2>
            <p style={IA.stepDesc}>Confirm everything before sending.</p>
            <IaCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: k === "Urgency" ? accentColor : C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </IaCard>
            <div style={IA.navRow}>
              <button onClick={() => goTo(4)} style={IA.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...IA.btn, background: `linear-gradient(135deg, ${accentColor}, ${C.maroon})` }}>⚡ Submit Alert</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={IA.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={IA.bgOrb1} /><div style={IA.bgOrb2} /><div style={IA.bgOrb3} />
      {step > 0 && (
        <div style={IA.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: accentColor }}>{Math.round(progress)}%</span>
          </div>
          <div style={IA.progressTrack}><div style={{ ...IA.progressBar, width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)` }} /></div>
        </div>
      )}
      <div style={{ ...IA.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ===========================================================
//  TURTLE PRESS — SUB-MENU + QTP FEEDBACK FORM
// ===========================================================
function TurtlePressForm({ onBackToPortal }) {
  const [subView, setSubView] = useState("menu"); // "menu" | "submission" | "article" | "feedback"

  const TpGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  // ─── SUB-MENU ────────────────────────────
  if (subView === "menu") {
    const options = [
      { id: "submission", icon: "🎉", label: "Birthdays, Celebrations & Photos", desc: "Submit birthdays, anniversaries, births, weddings, and photo contributions", color: C.maroonLight },
      { id: "article", icon: "✍️", label: "Article / Story Submission", desc: "Submit a written article or pitch a story idea for the Turtle Press", color: C.turquoise },
      { id: "feedback", icon: "💬", label: "Feedback & Corrections", desc: "Corrections, compliments, suggestions, or questions about a published edition", color: C.gold },
    ];

    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={{ position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}08, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ zIndex: 2, textAlign: "center", maxWidth: 480, width: "100%" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🐢</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>The Turtle Press</h1>
          <p style={{ fontSize: 15, color: C.goldLight, marginBottom: 4, fontWeight: 500 }}>Quarterly Newsletter</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            What would you like to do?
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {options.map(o => (
              <TpGlassCard key={o.id} onClick={() => setSubView(o.id)}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", textAlign: "left" }}>
                <span style={{ fontSize: 32, filter: `drop-shadow(0 0 8px ${o.color}40)` }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.5 }}>{o.desc}</div>
                </div>
              </TpGlassCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── SUBMISSION FORM ──────────────────
  if (subView === "submission") {
    return <QTPSubmissionSubForm onBack={() => setSubView("menu")} />;
  }

  // ─── ARTICLE / STORY FORM ─────────────
  if (subView === "article") {
    return <QTPArticleSubForm onBack={() => setSubView("menu")} />;
  }

  // ─── QTP FEEDBACK FORM ───────────────────
  if (subView === "feedback") {
    return <QTPFeedbackSubForm onBack={() => setSubView("menu")} />;
  }

  return null;
}

// ── QTP FEEDBACK SUB-FORM ──────────────────
function QTPFeedbackSubForm({ onBack }) {
  const FEEDBACK_TYPES = [
    { id: "correction", icon: "✏️", label: "Correction", desc: "Something needs to be fixed" },
    { id: "compliment", icon: "⭐", label: "Compliment", desc: "Something we did well" },
    { id: "suggestion", icon: "💡", label: "Suggestion", desc: "Ideas for future editions" },
    { id: "question", icon: "❓", label: "Question", desc: "Something you'd like to know" },
  ];

  const EDITIONS = [
    "Spring 2026", "Winter 2025", "Fall 2025", "Summer 2025", "Spring 2025",
    "Winter 2024", "Fall 2024", "Summer 2024", "Spring 2024",
    "Older Edition", "Not Sure"
  ];

  // ── Sub-components ──
  const FbGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const FbInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline, maxWords }) => {
    const wc = multiline && maxWords ? value.trim().split(/\s+/).filter(Boolean).length : 0;
    return (
      <div style={{ marginBottom: 20, flex: 1 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label} {required && <span style={{ color: C.turquoise }}>*</span>}
        </label>
        {multiline ? (
          <div style={{ position: "relative" }}>
            <textarea ref={ref} value={value} rows={4} placeholder={placeholder} onKeyDown={onKeyDown}
              onChange={(e) => {
                if (maxWords) { const w = e.target.value.trim().split(/\s+/).filter(Boolean); if (w.length <= maxWords || e.target.value.length < value.length) onChange(e.target.value); }
                else onChange(e.target.value);
              }}
              style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
              onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
            {maxWords && <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, color: wc >= maxWords ? C.maroonLight : C.textDim }}>{wc}/{maxWords} words</div>}
          </div>
        ) : (
          <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKeyDown}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
            onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
            onBlur={(e) => e.target.style.borderColor = C.border}
          />
        )}
      </div>
    );
  };

  const FbSelect = ({ label, value, onChange, options, required, placeholder }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: value ? C.textPrimary : C.textDim, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%2340b5ad' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
        <option value="" style={{ background: C.dark }}>{placeholder || "Select..."}</option>
        {options.map((o) => <option key={o} value={o} style={{ background: C.dark }}>{o}</option>)}
      </select>
    </div>
  );

  const FbBadge = ({ name, color }) => (
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

  const [form, setForm] = useState({
    firstName: "", lastName: "", tribalId: "",
    email: "", phone: "",
    edition: "", feedbackType: null,
    pageNumber: "", articleTitle: "",
    feedback: "", correctionDetails: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTF");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDC22 Turtle Press Feedback \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Tribal ID: ${form.tribalId || "N/A"}`, "",
        "\uD83D\uDCF0 TURTLE PRESS FEEDBACK", `Edition: ${form.edition || "N/A"}`, `Feedback Type: ${form.feedbackType || "N/A"}`,
        `Page Number: ${form.pageNumber || "N/A"}`, `Article Title: ${form.articleTitle || "N/A"}`,
        `Feedback: ${form.feedback || "N/A"}`, form.correctionDetails ? `Correction Details: ${form.correctionDetails}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Turtle Press Feedback", serviceId: "turtle-press",
      requesterName: name, email: form.email,
      phone: form.phone, tribalId: form.tribalId, edition: form.edition,
      feedbackType: form.feedbackType, pageNumber: form.pageNumber,
      articleTitle: form.articleTitle, feedback: form.feedback,
      correctionDetails: form.correctionDetails,
    });
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Name", "Tribal ID", "Edition", "Feedback Type", "Details", "Contact", "Review"];
  const progress = step > 0 ? Math.min((step / 7) * 100, 100) : 0;

  const FB = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
    bgOrb1: { position: "fixed", top: "-20%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}08, transparent 70%)`, pointerEvents: "none" },
    bgOrb2: { position: "fixed", bottom: "-25%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.maroon}06, transparent 70%)`, pointerEvents: "none" },
    bgOrb3: { position: "fixed", top: "40%", left: "50%", width: "30vw", height: "30vw", borderRadius: "50%", background: `radial-gradient(circle, ${C.turquoise}04, transparent 70%)`, pointerEvents: "none", transform: "translateX(-50%)" },
    progressWrap: { position: "fixed", top: 0, left: 0, right: 0, padding: "16px 24px 12px", zIndex: 10, background: `linear-gradient(180deg, ${C.dark}ee, transparent)` },
    progressTrack: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
    progressBar: { height: "100%", background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, borderRadius: 2, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 12px rgba(201,168,76,0.3)` },
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
    const ft = FEEDBACK_TYPES.find((x) => x.id === form.feedbackType);
    return (
      <div style={FB.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={FB.bgOrb1} /><div style={FB.bgOrb2} />
        <div style={FB.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🐢</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your feedback has been received.<br />We appreciate you helping us improve the Turtle Press.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            <FbBadge name="🐢 QTP" color="#0079bf" />
            <FbBadge name="💬 Feedback" color="#c9a84c" />
            {form.feedbackType === "correction" && <FbBadge name="✏️ Correction" color="#eb5a46" />}
            {form.feedbackType === "compliment" && <FbBadge name="⭐ Compliment" color="#61bd4f" />}
            {form.feedbackType === "suggestion" && <FbBadge name="💡 Suggestion" color="#00c2e0" />}
            {form.feedbackType === "question" && <FbBadge name="❓ Question" color="#f2d600" />}
          </div>
          <FbGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Type", `${ft?.icon} ${ft?.label}`],
              ["Edition", form.edition],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
            ].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit" }}>{v}</span>
              </div>
            ))}
          </FbGlassCard>
          <button onClick={() => { setSubmitted(false); setStep(0); }} style={{ ...FB.btn, marginTop: 28 }}>Submit More Feedback</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={FB.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🐢</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Turtle Press</h1>
          <p style={{ fontSize: 17, color: C.goldLight, marginBottom: 4, fontWeight: 500 }}>Feedback & Corrections</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 32px" }}>
            Spot a typo? Have a suggestion? Want to say something nice?<br />Your feedback helps us make the Turtle Press better for everyone.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => goTo(1)} style={FB.btn}>Share Feedback →</button>
            <button onClick={onBack} style={FB.btnBack}>← Back</button>
          </div>
        </div>
      );

      case 1: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>What's your name?</h2>
          <p style={FB.stepDesc}>Let us know who's sharing feedback.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <FbInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <FbInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
          </div>
          <div style={FB.navRow}>
            <button onClick={() => goTo(0)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>Tribal ID Number</h2>
          <p style={FB.stepDesc}>Enter your 4-digit tribal identification number.</p>
          <FbInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
          <div style={FB.navRow}>
            <button onClick={() => goTo(1)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={form.tribalId.length !== 4} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>Which edition?</h2>
          <p style={FB.stepDesc}>Select the Turtle Press edition your feedback is about.</p>
          <FbSelect label="Edition" value={form.edition} required onChange={(v) => u("edition", v)} options={EDITIONS} placeholder="Select edition" />
          <div style={FB.navRow}>
            <button onClick={() => goTo(2)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(4)} disabled={!form.edition} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>What kind of feedback?</h2>
          <p style={FB.stepDesc}>We want to hear it all — the good and the fixable.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {FEEDBACK_TYPES.map((f) => (
              <FbGlassCard key={f.id} active={form.feedbackType === f.id} onClick={() => u("feedbackType", f.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.feedbackType === f.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{f.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{f.desc}</span>
              </FbGlassCard>
            ))}
          </div>
          <div style={FB.navRow}>
            <button onClick={() => goTo(3)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(5)} disabled={!form.feedbackType} style={FB.btn}>Continue →</button>
          </div>
        </div>
      );

      case 5: {
        const ft = FEEDBACK_TYPES.find((x) => x.id === form.feedbackType);
        return (
          <div style={FB.stepWrap}>
            <h2 style={FB.stepTitle}>{ft?.icon} {ft?.label} Details</h2>
            <p style={FB.stepDesc}>
              {form.feedbackType === "correction" ? "Help us fix it — the more specific, the better." :
               form.feedbackType === "compliment" ? "We love hearing this — what stood out?" :
               form.feedbackType === "suggestion" ? "Great ideas make great publications." :
               "We're happy to help."}
            </p>
            {form.feedbackType === "correction" && (<>
              <FbInput label="Page Number (if known)" value={form.pageNumber} onChange={(v) => u("pageNumber", v)} placeholder="e.g. Page 4" inputRef={inputRef} />
              <FbInput label="Article Title (if known)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Title of the article" />
              <FbInput label="What needs to be corrected?" value={form.correctionDetails} required onChange={(v) => u("correctionDetails", v)} placeholder="Describe the error and what it should say..." multiline />
            </>)}
            {form.feedbackType === "compliment" && (<>
              <FbInput label="Article or Section (optional)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Which article or section?" inputRef={inputRef} />
              <FbInput label="What did you enjoy?" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="Tell us what you liked..." multiline maxWords={40} />
            </>)}
            {form.feedbackType === "suggestion" && (<>
              <FbInput label="Your Suggestion" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="What would you like to see in future editions?" inputRef={inputRef} multiline maxWords={40} />
            </>)}
            {form.feedbackType === "question" && (<>
              <FbInput label="Article or Topic (optional)" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Related to which article or topic?" inputRef={inputRef} />
              <FbInput label="Your Question" value={form.feedback} required onChange={(v) => u("feedback", v)} placeholder="What would you like to know?" multiline maxWords={40} />
            </>)}
            <div style={FB.navRow}>
              <button onClick={() => goTo(4)} style={FB.btnBack}>← Back</button>
              <button onClick={() => goTo(6)} disabled={!(form.feedback || form.correctionDetails)} style={FB.btn}>Continue →</button>
            </div>
          </div>
        );
      }

      case 6: return (
        <div style={FB.stepWrap}>
          <h2 style={FB.stepTitle}>Contact Information</h2>
          <p style={FB.stepDesc}>Optional — in case we need to follow up on your feedback.</p>
          <FbInput label="Email" value={form.email} onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && goTo(7)} />
          <FbInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(7)} />
          <div style={FB.navRow}>
            <button onClick={() => goTo(5)} style={FB.btnBack}>← Back</button>
            <button onClick={() => goTo(7)} style={FB.btn}>{form.email ? "Review →" : "Skip to Review →"}</button>
          </div>
        </div>
      );

      case 7: {
        const ft = FEEDBACK_TYPES.find((x) => x.id === form.feedbackType);
        const items = [
          ["Submitted By", `${form.firstName} ${form.lastName}`],
          ["Tribal ID", form.tribalId],
          ["Edition", form.edition],
          ["Type", `${ft?.icon} ${ft?.label}`],
          form.pageNumber ? ["Page", form.pageNumber] : null,
          form.articleTitle ? ["Article", form.articleTitle] : null,
          form.correctionDetails ? ["Correction", form.correctionDetails] : null,
          form.feedback ? ["Feedback", form.feedback] : null,
          form.email ? ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`] : null,
          ["Date Submitted", new Date().toLocaleString()],
        ].filter(Boolean);

        return (
          <div style={FB.stepWrap}>
            <h2 style={FB.stepTitle}>Review Your Feedback</h2>
            <p style={FB.stepDesc}>Make sure everything looks good.</p>
            <FbGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </FbGlassCard>
            <div style={FB.navRow}>
              <button onClick={() => goTo(6)} style={FB.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...FB.btn, background: `linear-gradient(135deg, ${C.gold}, ${C.maroon})` }}>🐢 Submit Feedback</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={FB.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={FB.bgOrb1} /><div style={FB.bgOrb2} /><div style={FB.bgOrb3} />
      {step > 0 && (
        <div style={FB.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: C.gold }}>{Math.round(progress)}%</span>
          </div>
          <div style={FB.progressTrack}><div style={{ ...FB.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...FB.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ===========================================================
//  QTP SUBMISSION SUB-FORM (Celebrations & Photos)
// ===========================================================
function QTPSubmissionSubForm({ onBack }) {
  const SUBMISSION_TYPES = [
    { id: "birthday", icon: "🎂", label: "Birthday", desc: "Celebrate a tribal member's birthday" },
    { id: "anniversary", icon: "💍", label: "Anniversary", desc: "Honor a couple's milestone" },
    { id: "birth", icon: "👶", label: "Birth Announcement", desc: "Welcome a new family member" },
    { id: "wedding", icon: "💒", label: "Wedding", desc: "Share wedding news" },
    { id: "photo", icon: "📸", label: "Photo Submission", desc: "Share photos for publication" },
    { id: "other", icon: "💬", label: "Other", desc: "Something else for the Turtle Press" },
  ];

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const PHOTO_DISCLAIMER = `The Turtle Press editors and Tribal Council have discretion when accepting a photo or other content for publication. Photo guidelines do not allow photos with alcohol present nor any hand gestures. Communications will not print photos with a visible copyright. By submitting you acknowledge these guidelines, are stating that you own the rights to the photo, and are allowing NHBP to use the photo for publication in the Turtle Press.`;
  const DEADLINE_NOTICE = `Deadline for birthday/celebration submissions is the 10th of each month for the next edition.`;

  // ── Sub-components ──
  const SmGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const SmInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline, maxWords }) => {
    const wc = multiline && maxWords ? value.trim().split(/\s+/).filter(Boolean).length : 0;
    return (
      <div style={{ marginBottom: 20, flex: 1 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label} {required && <span style={{ color: C.turquoise }}>*</span>}
        </label>
        {multiline ? (
          <div style={{ position: "relative" }}>
            <textarea ref={ref} value={value} rows={3} placeholder={placeholder} onKeyDown={onKeyDown}
              onChange={(e) => {
                if (maxWords) { const w = e.target.value.trim().split(/\s+/).filter(Boolean); if (w.length <= maxWords || e.target.value.length < value.length) onChange(e.target.value); }
                else onChange(e.target.value);
              }}
              style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
              onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
            {maxWords && <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, color: wc >= maxWords ? C.maroonLight : C.textDim }}>{wc}/{maxWords} words</div>}
          </div>
        ) : (
          <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKeyDown}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
            onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
            onBlur={(e) => e.target.style.borderColor = C.border}
          />
        )}
      </div>
    );
  };

  const SmSelect = ({ label, value, onChange, options, required, placeholder }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: value ? C.textPrimary : C.textDim, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%2340b5ad' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
        <option value="" style={{ background: C.dark }}>{placeholder || "Select..."}</option>
        {options.map((o) => <option key={o} value={o} style={{ background: C.dark }}>{o}</option>)}
      </select>
    </div>
  );

  const SmBadge = ({ name, color }) => (
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
  const [photoAgreed, setPhotoAgreed] = useState(false);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", tribalId: "", identity: "",
    email: "", phone: "", submissionType: null,
    bdayFirstName: "", bdayLastName: "", birthDate: "",
    anniName1First: "", anniName1Last: "", anniName2First: "", anniName2Last: "",
    anniMonth: "", anniDay: "",
    newbornFirst: "", newbornLast: "", motherFirst: "", motherLast: "",
    fatherFirst: "", fatherLast: "", dateOfBirth: "",
    brideFirst: "", brideLast: "", groomFirst: "", groomLast: "", weddingDate: "",
    photoCredit: "", photoPeopleNames: "",
    message: "", from: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTP");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDC22 ${form.submissionType || "Turtle Press"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`,
        `Tribal ID: ${form.tribalId || "N/A"}`, `Identity: ${form.identity || "N/A"}`, "",
        "\uD83D\uDCF0 TURTLE PRESS SUBMISSION", `Type: ${form.submissionType || "N/A"}`,
        `Department: ${form.department || form.committee || "N/A"}`, `Title: ${form.articleTitle || form.activityName || "N/A"}`,
        form.articleContent ? `Content: ${form.articleContent}` : "", form.storyDescription ? `Story: ${form.storyDescription}` : "",
        form.whyNewsworthy ? `Why Newsworthy: ${form.whyNewsworthy}` : "", form.whenHappening ? `When: ${form.whenHappening}` : "",
        form.photoCredit ? `Photo Credit: ${form.photoCredit}` : "", form.additionalNotes ? `Notes: ${form.additionalNotes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Turtle Press Submission", serviceId: "turtle-press",
      requesterName: name, email: form.email,
      phone: form.phone, tribalId: form.tribalId, identity: form.identity,
      submissionType: form.submissionType, department: form.department || form.committee || "",
      articleTitle: form.articleTitle || form.activityName || "",
      articleContent: form.articleContent, storyDescription: form.storyDescription,
      whyNewsworthy: form.whyNewsworthy, whenHappening: form.whenHappening,
      photoCredit: form.photoCredit, notes: form.additionalNotes,
    });
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Name", "Tribal ID", "Identity", "Submission Type", "Details", "Photo", "Contact", "Review"];
  const progress = Math.min((step / 8) * 100, 100);

  const SM = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
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
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    successWrap: { textAlign: "center", zIndex: 2, maxWidth: 440 },
  };

  // ── SUBMITTED ──
  if (submitted) {
    const t = SUBMISSION_TYPES.find((x) => x.id === form.submissionType);
    return (
      <div style={SM.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={SM.bgOrb1} /><div style={SM.bgOrb2} />
        <div style={SM.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🐢</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your {t?.label.toLowerCase()} submission has been received.<br />Our team will review it for the next Turtle Press edition.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            <SmBadge name="🐢 QTP" color="#0079bf" />
            {form.submissionType === "birthday" && <SmBadge name="🎂 Birthday" color="#ff78cb" />}
            {form.submissionType === "anniversary" && <SmBadge name="💍 Anniversary" color="#c377e0" />}
            {form.submissionType === "birth" && <SmBadge name="👶 Birth" color="#51e898" />}
            {form.submissionType === "wedding" && <SmBadge name="💒 Wedding" color="#f2d600" />}
          </div>
          <SmGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Type", `${t?.icon} ${t?.label}`],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
              ["Tribal ID", form.tribalId],
            ].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit" }}>{v}</span>
              </div>
            ))}
          </SmGlassCard>
          <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>{DEADLINE_NOTICE}</p>
          <button onClick={() => { setSubmitted(false); setStep(0); setForm({ ...form, submissionType: null, message: "", from: "" }); setPhotoAgreed(false); }} style={{ ...SM.btn, marginTop: 28 }}>Submit Another</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={SM.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🐢</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Turtle Press</h1>
          <p style={{ fontSize: 17, color: C.turquoiseLight, marginBottom: 4, fontWeight: 500 }}>Submission Form</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 380, margin: "16px auto 8px" }}>
            Share birthdays, celebrations, announcements, and photos<br />with your community through the Turtle Press.
          </p>
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, maxWidth: 360, margin: "16px auto 32px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.border}` }}>
            📅 {DEADLINE_NOTICE}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => goTo(1)} style={SM.btn}>Get Started →</button>
            <button onClick={onBack} style={SM.btnBack}>← Back</button>
          </div>
        </div>
      );

      case 1: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>What's your name?</h2>
          <p style={SM.stepDesc}>Let us know who's submitting.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <SmInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <SmInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(0)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>Tribal ID Number</h2>
          <p style={SM.stepDesc}>Enter your 4-digit tribal identification number.</p>
          <SmInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
          <div style={SM.navRow}>
            <button onClick={() => goTo(1)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={form.tribalId.length !== 4} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>I am a...</h2>
          <p style={SM.stepDesc}>This helps our team route your submission.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {[
              { id: "employee", icon: "🏢", label: "NHBP Employee", desc: "Staff or department member" },
              { id: "member", icon: "👤", label: "Tribal Member", desc: "NHBP community member" },
            ].map((o) => (
              <SmGlassCard key={o.id} active={form.identity === o.id} onClick={() => u("identity", o.id)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{o.desc}</div>
                </div>
              </SmGlassCard>
            ))}
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(2)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(4)} disabled={!form.identity} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 4: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>What are you submitting?</h2>
          <p style={SM.stepDesc}>Choose your adventure 🐢</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {SUBMISSION_TYPES.map((t) => (
              <SmGlassCard key={t.id} active={form.submissionType === t.id} onClick={() => u("submissionType", t.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.submissionType === t.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{t.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{t.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{t.desc}</span>
              </SmGlassCard>
            ))}
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(3)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(5)} disabled={!form.submissionType} style={SM.btn}>Continue →</button>
          </div>
        </div>
      );

      case 5: {
        const t = SUBMISSION_TYPES.find((x) => x.id === form.submissionType);
        return (
          <div style={SM.stepWrap}>
            <h2 style={SM.stepTitle}>{t?.icon} {t?.label} Details</h2>
            <p style={SM.stepDesc}>Fill in the details for your submission.</p>

            {form.submissionType === "birthday" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Person's First Name" value={form.bdayFirstName} required onChange={(v) => u("bdayFirstName", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last Name" value={form.bdayLastName} required onChange={(v) => u("bdayLastName", v)} placeholder="Last" />
              </div>
              <SmInput label="Birth Date" value={form.birthDate} type="date" required onChange={(v) => u("birthDate", v)} />
              <SmInput label="From" value={form.from} onChange={(v) => u("from", v)} placeholder="Who is this from?" />
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Happy birthday wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "anniversary" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Name One - First" value={form.anniName1First} required onChange={(v) => u("anniName1First", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last" value={form.anniName1Last} required onChange={(v) => u("anniName1Last", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Name Two - First" value={form.anniName2First} required onChange={(v) => u("anniName2First", v)} placeholder="First" />
                <SmInput label="Last" value={form.anniName2Last} required onChange={(v) => u("anniName2Last", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmSelect label="Month" value={form.anniMonth} required onChange={(v) => u("anniMonth", v)} options={MONTHS} placeholder="Month" />
                <SmSelect label="Day" value={form.anniDay} required onChange={(v) => u("anniDay", v)} options={Array.from({ length: 31 }, (_, i) => String(i + 1))} placeholder="Day" />
              </div>
              <SmInput label="From" value={form.from} onChange={(v) => u("from", v)} placeholder="Who is this from?" />
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Anniversary wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "birth" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Newborn's First Name" value={form.newbornFirst} required onChange={(v) => u("newbornFirst", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last Name" value={form.newbornLast} required onChange={(v) => u("newbornLast", v)} placeholder="Last" />
              </div>
              <SmInput label="Date of Birth" value={form.dateOfBirth} type="date" required onChange={(v) => u("dateOfBirth", v)} />
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Mother (optional)" value={form.motherFirst} onChange={(v) => u("motherFirst", v)} placeholder="First" />
                <SmInput label="Last" value={form.motherLast} onChange={(v) => u("motherLast", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Father (optional)" value={form.fatherFirst} onChange={(v) => u("fatherFirst", v)} placeholder="First" />
                <SmInput label="Last" value={form.fatherLast} onChange={(v) => u("fatherLast", v)} placeholder="Last" />
              </div>
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Welcome message..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "wedding" && (<>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Bride - First" value={form.brideFirst} required onChange={(v) => u("brideFirst", v)} placeholder="First" inputRef={inputRef} />
                <SmInput label="Last" value={form.brideLast} required onChange={(v) => u("brideLast", v)} placeholder="Last" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <SmInput label="Groom - First" value={form.groomFirst} required onChange={(v) => u("groomFirst", v)} placeholder="First" />
                <SmInput label="Last" value={form.groomLast} required onChange={(v) => u("groomLast", v)} placeholder="Last" />
              </div>
              <SmInput label="Wedding Date" value={form.weddingDate} type="date" required onChange={(v) => u("weddingDate", v)} />
              <SmInput label="Brief Message" value={form.message} onChange={(v) => u("message", v)} placeholder="Wedding wishes..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "photo" && (<>
              <SmInput label="Names of People in Photo" value={form.photoPeopleNames} required onChange={(v) => u("photoPeopleNames", v)} placeholder="List all people shown" inputRef={inputRef} multiline />
              <SmInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
              <SmInput label="Brief Description" value={form.message} onChange={(v) => u("message", v)} placeholder="What's in the photo, when/where taken..." multiline maxWords={40} />
            </>)}

            {form.submissionType === "other" && (<>
              <SmInput label="Describe Your Request" value={form.message} required onChange={(v) => u("message", v)} placeholder="Tell us what you'd like to submit..." inputRef={inputRef} multiline maxWords={40} />
            </>)}

            <div style={SM.navRow}>
              <button onClick={() => goTo(4)} style={SM.btnBack}>← Back</button>
              <button onClick={() => goTo(6)} style={SM.btn}>Continue →</button>
            </div>
          </div>
        );
      }

      case 6: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>📸 Photo Upload</h2>
          <p style={SM.stepDesc}>Optional — attach a photo to your submission.</p>
          <SmGlassCard style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, border: `2px dashed ${C.border}` }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
            <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Drag & drop or click to upload</p>
            <p style={{ fontSize: 11, color: C.textDim }}>300KB – 5MB • JPG, PNG, PDF</p>
            <p style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>Trouble uploading? Email to <span style={{ color: C.turquoiseLight }}>turtlepress@nhbp-nsn.gov</span></p>
          </SmGlassCard>
          {form.submissionType !== "photo" && (
            <SmInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
          )}
          <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7, marginBottom: 12 }}>{PHOTO_DISCLAIMER}</p>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div onClick={() => setPhotoAgreed(!photoAgreed)} style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, border: `2px solid ${photoAgreed ? C.turquoise : C.border}`, background: photoAgreed ? C.turquoise + "20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {photoAgreed && <span style={{ color: C.turquoise, fontSize: 14 }}>✓</span>}
              </div>
              <span style={{ fontSize: 12, color: C.textSecondary }}>I agree to the photo submission guidelines</span>
            </label>
          </div>
          <div style={SM.navRow}>
            <button onClick={() => goTo(5)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(7)} style={SM.btn}>{photoAgreed ? "Continue →" : "Skip Photo →"}</button>
          </div>
        </div>
      );

      case 7: return (
        <div style={SM.stepWrap}>
          <h2 style={SM.stepTitle}>Contact Information</h2>
          <p style={SM.stepDesc}>In case we need to reach you about your submission.</p>
          <SmInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.email.includes("@") && goTo(8)} />
          <SmInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(8)} />
          <div style={SM.navRow}>
            <button onClick={() => goTo(6)} style={SM.btnBack}>← Back</button>
            <button onClick={() => goTo(8)} disabled={!form.email.includes("@")} style={SM.btn}>Review →</button>
          </div>
        </div>
      );

      case 8: {
        const t = SUBMISSION_TYPES.find((x) => x.id === form.submissionType);
        const reviewItems = [
          ["Submitted By", `${form.firstName} ${form.lastName}`],
          ["Tribal ID", form.tribalId],
          ["Role", form.identity === "employee" ? "NHBP Employee" : "Tribal Member"],
          ["Type", `${t?.icon} ${t?.label}`],
          ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`],
        ];
        if (form.submissionType === "birthday" && form.bdayFirstName) reviewItems.push(["Celebrating", `${form.bdayFirstName} ${form.bdayLastName} — ${form.birthDate}`]);
        if (form.submissionType === "anniversary" && form.anniName1First) reviewItems.push(["Couple", `${form.anniName1First} ${form.anniName1Last} & ${form.anniName2First} ${form.anniName2Last}`]);
        if (form.submissionType === "wedding" && form.brideFirst) reviewItems.push(["Couple", `${form.brideFirst} ${form.brideLast} & ${form.groomFirst} ${form.groomLast} — ${form.weddingDate}`]);
        if (form.submissionType === "birth" && form.newbornFirst) reviewItems.push(["Newborn", `${form.newbornFirst} ${form.newbornLast} — Born ${form.dateOfBirth}`]);
        if (form.message) reviewItems.push(["Message", form.message]);
        reviewItems.push(["Date Submitted", new Date().toLocaleString()]);

        return (
          <div style={SM.stepWrap}>
            <h2 style={SM.stepTitle}>Review Your Submission</h2>
            <p style={SM.stepDesc}>Make sure everything looks good.</p>
            <SmGlassCard style={{ marginBottom: 16 }}>
              {reviewItems.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < reviewItems.length - 1 ? 12 : 0, borderBottom: i < reviewItems.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </SmGlassCard>
            <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, marginBottom: 24, textAlign: "center" }}>
              Submission does not guarantee placement. Placement is at the discretion of the editors and Tribal Council.
            </p>
            <div style={SM.navRow}>
              <button onClick={() => goTo(7)} style={SM.btnBack}>← Back</button>
              <button onClick={handleSubmit} style={{ ...SM.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>🐢 Submit</button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={SM.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={SM.bgOrb1} /><div style={SM.bgOrb2} /><div style={SM.bgOrb3} />
      {step > 0 && (
        <div style={SM.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step]}</span>
            <span style={{ fontSize: 11, color: C.turquoise }}>{Math.round(progress)}%</span>
          </div>
          <div style={SM.progressTrack}><div style={{ ...SM.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...SM.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ===========================================================
//  QTP ARTICLE / STORY SUB-FORM
// ===========================================================
function QTPArticleSubForm({ onBack }) {

  const COMMITTEES = [
    "Cemetery & Parks Committee", "Cultural Committee", "Education Committee",
    "Elders Committee", "Election Board", "Enrollment Committee", "Housing Committee",
    "Journey to Wellness Committee", "Planning and Land Use Committee",
    "Tribal Emergency Preparedness Committee", "Tribal Environmental Advisory Committee",
    "Veterans Committee"
  ];

  const SUBMISSION_FORMATS = [
    { id: "article", icon: "📝", label: "Article Only", desc: "Written content, no photos" },
    { id: "photo", icon: "📸", label: "Photo Only", desc: "Photos with captions" },
    { id: "both", icon: "📰", label: "Article With Photo", desc: "Written content + photos" },
    { id: "lead", icon: "💡", label: "Story Lead / Tip", desc: "Something newsworthy is happening" },
  ];

  const PHOTO_DISCLAIMER = `The Turtle Press editors and Tribal Council have discretion when accepting a photo or other content for publication. Photo guidelines do not allow photos with alcohol present nor any hand gestures. Communications will not print photos with a visible copyright. By submitting you acknowledge these guidelines, are stating that you own the rights to the photo, and are allowing NHBP to use the photo for publication in the Turtle Press.`;
  const DEADLINE_NOTICE = `Article submissions are due the 1st of each month for the next edition. Submission does not guarantee placement — placement is at the discretion of the editors and Tribal Council.`;

  // ── Sub-components ──
  const ArGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const ArInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, onKeyDown, multiline, maxWords }) => {
    const wc = multiline && maxWords ? value.trim().split(/\s+/).filter(Boolean).length : 0;
    return (
      <div style={{ marginBottom: 20, flex: 1 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label} {required && <span style={{ color: C.turquoise }}>*</span>}
        </label>
        {multiline ? (
          <div style={{ position: "relative" }}>
            <textarea ref={ref} value={value} rows={4} placeholder={placeholder} onKeyDown={onKeyDown}
              onChange={(e) => {
                if (maxWords) { const w = e.target.value.trim().split(/\s+/).filter(Boolean); if (w.length <= maxWords || e.target.value.length < value.length) onChange(e.target.value); }
                else onChange(e.target.value);
              }}
              style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
              onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
            {maxWords && <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, color: wc >= maxWords ? C.maroonLight : C.textDim }}>{wc}/{maxWords} words</div>}
          </div>
        ) : (
          <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKeyDown}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
            onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
            onBlur={(e) => e.target.style.borderColor = C.border}
          />
        )}
      </div>
    );
  };

  const ArSelect = ({ label, value, onChange, options, required, placeholder }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: value ? C.textPrimary : C.textDim, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%2340b5ad' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
        <option value="" style={{ background: C.dark }}>{placeholder || "Select..."}</option>
        {options.map((o) => <option key={o} value={o} style={{ background: C.dark }}>{o}</option>)}
      </select>
    </div>
  );

  const ArDeptSelect = ({ value, onChange }) => (
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

  const ArBadge = ({ name, color }) => (
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
  const [photoAgreed, setPhotoAgreed] = useState(false);
  const inputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", tribalId: "", identity: "",
    email: "", phone: "",
    department: "", committee: "",
    submissionFormat: null,
    articleWrittenByFirst: "", articleWrittenByLast: "",
    titleStatus: "",
    articleTitle: "", activityName: "",
    eventDate: "", eventTime: "", eventLocation: "",
    interviewNames: "", interviewContact: "",
    articleContent: "",
    storyDescription: "",
    whyNewsworthy: "",
    whenHappening: "",
    photoCredit: "", photoPeopleNames: "",
    additionalNotes: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-QTA");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDCDD ${form.articleTitle || form.activityName || "Article Submission"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`,
        `Tribal ID: ${form.tribalId || "N/A"}`, `Identity: ${form.identity || "N/A"}`,
        `Department: ${form.department || form.committee || "N/A"}`, "",
        "\uD83D\uDCDD ARTICLE SUBMISSION", `Format: ${form.submissionFormat || "N/A"}`, `Title: ${form.articleTitle || form.activityName || "N/A"}`,
        form.articleContent ? `Content: ${form.articleContent}` : "", form.storyDescription ? `Story: ${form.storyDescription}` : "",
        form.whyNewsworthy ? `Why Newsworthy: ${form.whyNewsworthy}` : "", form.whenHappening ? `When: ${form.whenHappening}` : "",
        form.photoCredit ? `Photo Credit: ${form.photoCredit}` : "", form.additionalNotes ? `Notes: ${form.additionalNotes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "Turtle Press Article", serviceId: "turtle-press",
      requesterName: name, email: form.email,
      phone: form.phone, tribalId: form.tribalId, identity: form.identity,
      department: form.department || form.committee || "",
      submissionFormat: form.submissionFormat, articleTitle: form.articleTitle || form.activityName || "",
      articleContent: form.articleContent, storyDescription: form.storyDescription,
      whyNewsworthy: form.whyNewsworthy, whenHappening: form.whenHappening,
      photoCredit: form.photoCredit, notes: form.additionalNotes,
    });
    setSubmitted(true);
  };

  // Dynamic step routing: employees get an extra "Department" step
  const getFormatStep = () => form.identity === "employee" ? 5 : 4;
  const getDetailsStep = () => form.identity === "employee" ? 6 : 5;
  const getPhotoStep = () => form.identity === "employee" ? 7 : 6;
  const getContactStep = () => form.identity === "employee" ? 8 : 7;
  const getReviewStep = () => form.identity === "employee" ? 9 : 8;

  const labels = form.identity === "employee"
    ? ["Welcome", "Your Name", "Tribal ID", "Identity", "Department", "Format", "Details", "Photo", "Contact", "Review"]
    : ["Welcome", "Your Name", "Tribal ID", "Identity", "Format", "Details", "Photo", "Contact", "Review"];

  const maxStep = getReviewStep();
  const progress = step > 0 ? Math.min((step / maxStep) * 100, 100) : 0;

  const AR = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
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
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    successWrap: { textAlign: "center", zIndex: 2, maxWidth: 440 },
  };

  // ── SUBMITTED ──
  if (submitted) {
    const fmt = SUBMISSION_FORMATS.find((x) => x.id === form.submissionFormat);
    return (
      <div style={AR.container}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={AR.bgOrb1} /><div style={AR.bgOrb2} />
        <div style={AR.successWrap}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>📰</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Miigwech!</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 28, lineHeight: 1.7 }}>
            Your article submission has been received and routed<br />to the Communications Hub for review.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
            <ArBadge name="🐢 QTP" color="#0079bf" />
            <ArBadge name="📝 Article" color="#00c2e0" />
            {form.submissionFormat === "lead" && <ArBadge name="💡 Story Lead" color="#f2d600" />}
          </div>
          <ArGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[
              ["Ticket", ticketNumber, true],
              ["Format", `${fmt?.icon} ${fmt?.label}`],
              ["Submitted", submissionDate],
              ["By", `${form.firstName} ${form.lastName}`],
              form.articleTitle ? ["Article", form.articleTitle] : null,
              form.department ? ["Department", form.department] : null,
            ].filter(Boolean).map(([k, v, accent], i) => (
              <div key={k + i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 5 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </ArGlassCard>
          <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>{DEADLINE_NOTICE}</p>
          <button onClick={() => { setSubmitted(false); setStep(0); setPhotoAgreed(false); }} style={{ ...AR.btn, marginTop: 28 }}>Submit Another</button>
        </div>
      </div>
    );
  }

  // ── STEPS ──
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div style={AR.stepWrap}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>📰</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Article & Story</h1>
          <p style={{ fontSize: 17, color: C.turquoiseLight, marginBottom: 4, fontWeight: 500 }}>Submission Form</p>
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, maxWidth: 400, margin: "16px auto 8px" }}>
            Submit articles, story leads, and news tips for the<br />Quarterly Turtle Press. Share what's happening in our<br />community and beyond.
          </p>
          <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, maxWidth: 360, margin: "16px auto 32px", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.border}` }}>
            📅 {DEADLINE_NOTICE}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => goTo(1)} style={AR.btn}>Get Started →</button>
            <button onClick={onBack} style={AR.btnBack}>← Back</button>
          </div>
        </div>
      );

      case 1: return (
        <div style={AR.stepWrap}>
          <h2 style={AR.stepTitle}>What's your name?</h2>
          <p style={AR.stepDesc}>Let us know who's submitting.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <ArInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
            <ArInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" onKeyDown={(e) => e.key === "Enter" && form.firstName && form.lastName && goTo(2)} />
          </div>
          <div style={AR.navRow}>
            <button onClick={() => goTo(0)} style={AR.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName} style={AR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={AR.stepWrap}>
          <h2 style={AR.stepTitle}>Tribal ID Number</h2>
          <p style={AR.stepDesc}>Enter your 4-digit tribal identification number.</p>
          <ArInput label="Tribal ID #" value={form.tribalId} required onChange={(v) => { if (/^\d{0,4}$/.test(v)) u("tribalId", v); }} placeholder="0000" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.tribalId.length === 4 && goTo(3)} />
          <div style={AR.navRow}>
            <button onClick={() => goTo(1)} style={AR.btnBack}>← Back</button>
            <button onClick={() => goTo(3)} disabled={form.tribalId.length !== 4} style={AR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 3: return (
        <div style={AR.stepWrap}>
          <h2 style={AR.stepTitle}>I am a...</h2>
          <p style={AR.stepDesc}>This helps us route your submission.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {[
              { id: "employee", icon: "🏢", label: "NHBP Employee", desc: "Staff or department member" },
              { id: "member", icon: "👤", label: "Tribal Member", desc: "NHBP community member" },
            ].map((o) => (
              <ArGlassCard key={o.id} active={form.identity === o.id} onClick={() => u("identity", o.id)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{o.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{o.desc}</div>
                </div>
              </ArGlassCard>
            ))}
          </div>
          <div style={AR.navRow}>
            <button onClick={() => goTo(2)} style={AR.btnBack}>← Back</button>
            <button onClick={() => goTo(form.identity === "employee" ? 4 : getFormatStep())} disabled={!form.identity} style={AR.btn}>Continue →</button>
          </div>
        </div>
      );

      // DEPARTMENT (employees only)
      case 4: {
        if (form.identity !== "employee") { goTo(getFormatStep()); return null; }
        return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>Department</h2>
            <p style={AR.stepDesc}>Which department is this submission from?</p>
            <ArDeptSelect value={form.department} onChange={(v) => u("department", v)} />
            {form.department === "Committees" && (
              <ArSelect label="Which Committee" value={form.committee} onChange={(v) => u("committee", v)} options={COMMITTEES} placeholder="Select committee" />
            )}
            <div style={AR.navRow}>
              <button onClick={() => goTo(3)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(getFormatStep())} disabled={!form.department} style={AR.btn}>Continue →</button>
            </div>
          </div>
        );
      }

      // FORMAT + DETAILS + PHOTO + CONTACT + REVIEW (dynamic steps)
      default: {
        const formatStep = getFormatStep();
        const detailsStep = getDetailsStep();
        const photoStep = getPhotoStep();
        const contactStep = getContactStep();
        const reviewStep = getReviewStep();

        if (step === formatStep) return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>What are you submitting?</h2>
            <p style={AR.stepDesc}>Choose the format that fits your content.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {SUBMISSION_FORMATS.map((f) => (
                <ArGlassCard key={f.id} active={form.submissionFormat === f.id} onClick={() => u("submissionFormat", f.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                  <span style={{ fontSize: 28, filter: form.submissionFormat === f.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{f.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                  <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{f.desc}</span>
                </ArGlassCard>
              ))}
            </div>
            <div style={AR.navRow}>
              <button onClick={() => goTo(form.identity === "employee" ? 4 : 3)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(detailsStep)} disabled={!form.submissionFormat} style={AR.btn}>Continue →</button>
            </div>
          </div>
        );

        if (step === detailsStep) {
          const isLead = form.submissionFormat === "lead";
          return (
            <div style={AR.stepWrap}>
              <h2 style={AR.stepTitle}>{isLead ? "💡 Story Lead Details" : "📝 Article Details"}</h2>
              <p style={AR.stepDesc}>{isLead ? "Tell us what's newsworthy." : "Fill in the details for your article."}</p>
              {isLead ? (<>
                <ArInput label="What's the story?" value={form.storyDescription} required onChange={(v) => u("storyDescription", v)} placeholder="Describe what's happening..." inputRef={inputRef} multiline />
                <ArInput label="Why is it newsworthy?" value={form.whyNewsworthy} onChange={(v) => u("whyNewsworthy", v)} placeholder="Impact on community, timeliness, cultural significance..." multiline />
                <ArInput label="Who's involved?" value={form.interviewNames} onChange={(v) => u("interviewNames", v)} placeholder="Key people, contact info for interviews" multiline />
                <ArInput label="When is this happening?" value={form.whenHappening} onChange={(v) => u("whenHappening", v)} placeholder="Date, timeframe, or if it's time-sensitive" />
                <ArInput label="Additional Notes" value={form.additionalNotes} onChange={(v) => u("additionalNotes", v)} placeholder="Anything else" multiline />
              </>) : (<>
                <div style={{ display: "flex", gap: 12 }}>
                  <ArInput label="Written By - First" value={form.articleWrittenByFirst} onChange={(v) => u("articleWrittenByFirst", v)} placeholder="First" inputRef={inputRef} />
                  <ArInput label="Last" value={form.articleWrittenByLast} onChange={(v) => u("articleWrittenByLast", v)} placeholder="Last" />
                </div>
                <ArInput label="Title / Tribal Status" value={form.titleStatus} onChange={(v) => u("titleStatus", v)} placeholder="e.g. Communications Specialist, Tribal Elder" />
                <ArInput label="Title of Article" value={form.articleTitle} onChange={(v) => u("articleTitle", v)} placeholder="Article title" />
                <ArInput label="Name of Activity / Event" value={form.activityName} onChange={(v) => u("activityName", v)} placeholder="What the article covers" />
                <div style={{ display: "flex", gap: 12 }}>
                  <ArInput label="Date of Event" value={form.eventDate} type="date" onChange={(v) => u("eventDate", v)} />
                  <ArInput label="Time" value={form.eventTime} type="time" onChange={(v) => u("eventTime", v)} />
                </div>
                <ArInput label="Location" value={form.eventLocation} onChange={(v) => u("eventLocation", v)} placeholder="Where it's happening" />
                <ArInput label="People Willing to be Interviewed" value={form.interviewNames} onChange={(v) => u("interviewNames", v)} placeholder="Names — at least one if possible" multiline />
                <ArInput label="Interview Contact Info" value={form.interviewContact} onChange={(v) => u("interviewContact", v)} placeholder="Phone or email" />
                {(form.submissionFormat === "article" || form.submissionFormat === "both") && (
                  <ArInput label="Article Content" value={form.articleContent} onChange={(v) => u("articleContent", v)} placeholder="Paste your article here, or upload a file on the next step" multiline />
                )}
                <ArInput label="Additional Notes" value={form.additionalNotes} onChange={(v) => u("additionalNotes", v)} placeholder="Anything else we should know" multiline />
              </>)}
              <div style={AR.navRow}>
                <button onClick={() => goTo(formatStep)} style={AR.btnBack}>← Back</button>
                <button onClick={() => goTo(photoStep)} style={AR.btn}>Continue →</button>
              </div>
            </div>
          );
        }

        if (step === photoStep) return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>📸 Files & Photos</h2>
            <p style={AR.stepDesc}>Upload photos, articles, or supporting files.</p>
            <ArGlassCard style={{ textAlign: "center", padding: "32px 20px", marginBottom: 20, border: `2px dashed ${C.border}` }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
              <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Drag & drop or click to upload</p>
              <p style={{ fontSize: 11, color: C.textDim }}>Photos, documents, PDFs • Up to 5MB each</p>
              <p style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>You may upload multiple files</p>
            </ArGlassCard>
            {(form.submissionFormat === "photo" || form.submissionFormat === "both") && (<>
              <ArInput label="Names of People in Photos" value={form.photoPeopleNames} onChange={(v) => u("photoPeopleNames", v)} placeholder="List all people shown" multiline />
              <ArInput label="Photo Credit" value={form.photoCredit} onChange={(v) => u("photoCredit", v)} placeholder="Photographer name" />
            </>)}
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7, marginBottom: 12 }}>{PHOTO_DISCLAIMER}</p>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div onClick={() => setPhotoAgreed(!photoAgreed)} style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, border: `2px solid ${photoAgreed ? C.turquoise : C.border}`, background: photoAgreed ? C.turquoise + "20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {photoAgreed && <span style={{ color: C.turquoise, fontSize: 14 }}>✓</span>}
                </div>
                <span style={{ fontSize: 12, color: C.textSecondary }}>I agree to the photo submission guidelines</span>
              </label>
            </div>
            <div style={AR.navRow}>
              <button onClick={() => goTo(detailsStep)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(contactStep)} style={AR.btn}>{photoAgreed ? "Continue →" : "Skip →"}</button>
            </div>
          </div>
        );

        if (step === contactStep) return (
          <div style={AR.stepWrap}>
            <h2 style={AR.stepTitle}>Contact Information</h2>
            <p style={AR.stepDesc}>In case we need to reach you.</p>
            <ArInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@email.com" inputRef={inputRef} onKeyDown={(e) => e.key === "Enter" && form.email.includes("@") && goTo(reviewStep)} />
            <ArInput label="Phone Number" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" onKeyDown={(e) => e.key === "Enter" && goTo(reviewStep)} />
            <div style={AR.navRow}>
              <button onClick={() => goTo(photoStep)} style={AR.btnBack}>← Back</button>
              <button onClick={() => goTo(reviewStep)} disabled={!form.email.includes("@")} style={AR.btn}>Review →</button>
            </div>
          </div>
        );

        if (step === reviewStep) {
          const fmt = SUBMISSION_FORMATS.find((x) => x.id === form.submissionFormat);
          const items = [
            ["Submitted By", `${form.firstName} ${form.lastName}`],
            ["Tribal ID", form.tribalId],
            ["Role", form.identity === "employee" ? "NHBP Employee" : "Tribal Member"],
            form.department ? ["Department", `${form.department}${form.committee ? ` — ${form.committee}` : ""}`] : null,
            ["Format", `${fmt?.icon} ${fmt?.label}`],
            form.articleTitle ? ["Article", form.articleTitle] : null,
            form.activityName ? ["Activity", form.activityName] : null,
            form.storyDescription ? ["Story", form.storyDescription] : null,
            form.interviewNames ? ["Interviews", form.interviewNames] : null,
            ["Contact", `${form.email}${form.phone ? ` • ${form.phone}` : ""}`],
            ["Date Submitted", new Date().toLocaleString()],
            ["Routes To", "The Hub [Wigwam] → 🐢 QTP"],
          ].filter(Boolean);

          return (
            <div style={AR.stepWrap}>
              <h2 style={AR.stepTitle}>Review Your Submission</h2>
              <p style={AR.stepDesc}>Make sure everything looks good.</p>
              <ArGlassCard style={{ marginBottom: 16 }}>
                {items.map(([k, v], i) => (
                  <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 14, color: k === "Routes To" ? C.turquoiseLight : C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                  </div>
                ))}
              </ArGlassCard>
              <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, marginBottom: 24, textAlign: "center" }}>{DEADLINE_NOTICE}</p>
              <div style={AR.navRow}>
                <button onClick={() => goTo(contactStep)} style={AR.btnBack}>← Back</button>
                <button onClick={handleSubmit} style={{ ...AR.btn, background: `linear-gradient(135deg, ${C.turquoise}, ${C.green})` }}>📰 Submit</button>
              </div>
            </div>
          );
        }

        return null;
      }
    }
  };

  return (
    <div style={AR.container}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <div style={AR.bgOrb1} /><div style={AR.bgOrb2} /><div style={AR.bgOrb3} />
      {step > 0 && (
        <div style={AR.progressWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{labels[step] || "..."}</span>
            <span style={{ fontSize: 11, color: C.turquoise }}>{Math.round(progress)}%</span>
          </div>
          <div style={AR.progressTrack}><div style={{ ...AR.progressBar, width: `${progress}%` }} /></div>
        </div>
      )}
      <div style={{ ...AR.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ===========================================================
//  GENERAL / OTHER REQUEST FORM
// ===========================================================
function GeneralRequestForm({ onBackToPortal }) {

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
  const GrGlassCard = ({ children, active, onClick, style: s = {} }) => {
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

  const GrInput = ({ label, value, onChange, placeholder, type = "text", required, inputRef: ref, multiline }) => (
    <div style={{ marginBottom: 20, flex: 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label} {required && <span style={{ color: C.turquoise }}>*</span>}
      </label>
      {multiline ? (
        <textarea ref={ref} value={value} rows={4} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
      ) : (
        <input ref={ref} type={type} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
          onFocus={(e) => e.target.style.borderColor = C.turquoise + "60"}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
      )}
    </div>
  );

  const GrDeptSelect = ({ value, onChange }) => (
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

  const GrBadge = ({ name, color }) => (
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

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    department: "", area: null, priority: null,
    subject: "", description: "", deadline: "", notes: "",
  });

  const u = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  useEffect(() => { if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 400); }, [step]);
  const goTo = (n) => { if (animating) return; setAnimating(true); setTimeout(() => { setStep(n); setAnimating(false); }, 250); };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP-GR");
    setTicketNumber(t);
    setSubmissionDate(new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }));
    const name = `${form.firstName} ${form.lastName}`.trim();
    await createTrelloCard(
      `\uD83D\uDCA1 ${form.subject || "General Request"} \u2014 ${name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${name}`, `Email: ${form.email || "N/A"}`, `Phone: ${form.phone || "N/A"}`, `Department: ${form.department || "N/A"}`, "",
        "\uD83D\uDCA1 GENERAL REQUEST", `Area: ${form.area || "N/A"}`, `Priority: ${form.priority || "N/A"}`,
        `Subject: ${form.subject || "N/A"}`, `Description: ${form.description || "N/A"}`,
        `Deadline: ${form.deadline || "N/A"}`, form.notes ? `Notes: ${form.notes}` : "",
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: "General Request", serviceId: "other",
      requesterName: name, email: form.email,
      phone: form.phone, department: form.department, area: form.area,
      priority: form.priority, subject: form.subject, description: form.description,
      deadline: form.deadline, notes: form.notes,
    });
    setSubmitted(true);
  };

  const labels = ["Welcome", "Your Info", "Category", "Details", "Priority", "Review"];
  const progress = step > 0 ? Math.min((step / 5) * 100, 100) : 0;

  // ── Local styles ──
  const GR = {
    container: { minHeight: "100vh", background: `linear-gradient(145deg, ${C.dark} 0%, #0d1420 50%, #0a1018 100%)`, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" },
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
    btn: { padding: "13px 28px", background: C.turquoise, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: `0 4px 16px ${C.turquoiseGlow}` },
    btnBack: { padding: "13px 20px", background: "transparent", color: C.textDim, border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
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
            {form.area === "design" && <GrBadge name="🎨 Design" color="#00c2e0" />}
            {form.area === "content" && <GrBadge name="✍️ Content" color="#51e898" />}
            {form.area === "tech" && <GrBadge name="💻 Tech" color="#c377e0" />}
            {form.area === "print" && <GrBadge name="🖨️ Print" color="#0079bf" />}
            {form.area === "question" && <GrBadge name="❓ Question" color="#f2d600" />}
            {form.priority === "low" && <GrBadge name="🟢 Low" color="#61bd4f" />}
            {form.priority === "medium" && <GrBadge name="🟡 Medium" color="#f2d600" />}
            {form.priority === "high" && <GrBadge name="🟠 High" color="#ff9f1a" />}
            {form.priority === "urgent" && <GrBadge name="🔴 Urgent" color="#eb5a46" />}
          </div>
          <GrGlassCard style={{ textAlign: "left", maxWidth: 340, margin: "0 auto 24px" }}>
            {[["Ticket", ticketNumber, true], ["Category", `${areaObj?.icon} ${areaObj?.label}`], ["Subject", form.subject], ["By", `${form.firstName} ${form.lastName}`], ["Submitted", submissionDate]].map(([k, v, accent], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{ fontSize: 13, color: accent ? C.turquoise : C.textPrimary, fontWeight: accent ? 700 : 400, fontFamily: accent ? "monospace" : "inherit", textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </GrGlassCard>
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
            <GrInput label="First Name" value={form.firstName} required onChange={(v) => u("firstName", v)} placeholder="First" inputRef={inputRef} />
            <GrInput label="Last Name" value={form.lastName} required onChange={(v) => u("lastName", v)} placeholder="Last" />
          </div>
          <GrDeptSelect value={form.department} onChange={(v) => u("department", v)} />
          <div style={{ display: "flex", gap: 12 }}>
            <GrInput label="Email" value={form.email} type="email" required onChange={(v) => u("email", v)} placeholder="your@nhbp-nsn.gov" />
            <GrInput label="Phone" value={form.phone} onChange={(v) => u("phone", v)} placeholder="(555) 555-5555" />
          </div>
          <div style={GR.navRow}>
            <button onClick={() => goTo(0)} style={GR.btnBack}>← Back</button>
            <button onClick={() => goTo(2)} disabled={!form.firstName || !form.lastName || !form.department || !form.email.includes("@")} style={GR.btn}>Continue →</button>
          </div>
        </div>
      );

      case 2: return (
        <div style={GR.stepWrap}>
          <h2 style={GR.stepTitle}>What area does this fall under?</h2>
          <p style={GR.stepDesc}>Your best guess helps us route it faster.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {REQUEST_AREAS.map(a => (
              <GrGlassCard key={a.id} active={form.area === a.id} onClick={() => u("area", a.id)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontSize: 28, filter: form.area === a.id ? `drop-shadow(0 0 8px ${C.turquoiseGlow})` : "none", transition: "filter 0.3s" }}>{a.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{a.label}</span>
                <span style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>{a.desc}</span>
              </GrGlassCard>
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
          <GrInput label="Subject / Title" value={form.subject} required onChange={(v) => u("subject", v)} placeholder="Brief summary of your request" inputRef={inputRef} />
          <GrInput label="Description" value={form.description} required onChange={(v) => u("description", v)} placeholder="Describe what you need, any context, background info..." multiline />
          <GrInput label="Deadline (if any)" value={form.deadline} type="date" onChange={(v) => u("deadline", v)} />
          <GrInput label="Anything else?" value={form.notes} onChange={(v) => u("notes", v)} placeholder="Links, references, file names..." multiline />
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
              <GrGlassCard key={p.id} active={form.priority === p.id} onClick={() => u("priority", p.id)}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{p.desc}</div>
                </div>
              </GrGlassCard>
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
            <GrGlassCard style={{ marginBottom: 16 }}>
              {items.map(([k, v], i) => (
                <div key={k + i} style={{ paddingBottom: 12, marginBottom: i < items.length - 1 ? 12 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </GrGlassCard>
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
      <div style={{ ...GR.content, opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {renderStep()}
      </div>
    </div>
  );
}

// ===========================================================
//  ADMIN PASSWORD GATE
// ===========================================================
const ADMIN_SESSION_KEY = "nhbp_admin_auth";

function AdminGate({ onExit, children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === "1");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const expected = import.meta.env.VITE_ADMIN_PASSWORD || "nhbp-admin";
    if (password === expected) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      setAuthed(true);
    } else {
      setError(true); setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  if (authed) return children;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #080a10 0%, #0d1220 50%, #080a10 100%)", fontFamily: "'DM Sans', Tahoma, sans-serif", color: C.textPrimary, padding: "40px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`@keyframes headShake { 0% { transform: translateX(0); } 12.5% { transform: translateX(-6px); } 37.5% { transform: translateX(5px); } 62.5% { transform: translateX(-3px); } 87.5% { transform: translateX(2px); } 100% { transform: translateX(0); } }`}</style>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${C.turquoise}25, ${C.maroon}15)`, border: `1px solid ${C.turquoise}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 28 }}>🔒</div>
      <h2 style={{ fontSize: 24, fontWeight: 300, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Admin Access</h2>
      <p style={{ fontSize: 14, color: C.textDim, margin: "0 0 28px" }}>Enter your password to continue</p>
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 340, animation: shake ? "headShake 0.5s ease" : "none" }}>
        <input
          type="password" value={password} onChange={e => { setPassword(e.target.value); setError(false); }} autoFocus placeholder="Password"
          style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${error ? "#ba0c2f60" : C.border}`, borderRadius: 10, color: C.textPrimary, fontSize: 15, outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" }}
        />
        {error && <p style={{ fontSize: 12, color: "#ba0c2f", margin: "8px 0 0", textAlign: "center" }}>Incorrect password</p>}
        <button type="submit" style={{ width: "100%", marginTop: 14, padding: "13px 0", background: `linear-gradient(135deg, ${C.turquoise}20, ${C.turquoise}10)`, border: `1px solid ${C.turquoise}40`, borderRadius: 10, color: C.turquoise, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
          Sign In
        </button>
      </form>
      <button onClick={onExit} style={{ marginTop: 20, background: "none", border: "none", color: C.textDim, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
        ← Back to Portal
      </button>
    </div>
  );
}

// ===========================================================
//  ADMIN DASHBOARD
// ===========================================================
function AdminDashboard({ onExit }) {
  const [submissions, setSubmissions] = useState(SubmissionStore.getAll());
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const refresh = () => setSubmissions(SubmissionStore.getAll());

  const serviceTypes = [...new Set(submissions.map(s => s.serviceType))];

  const filtered = submissions
    .filter(s => filter === "all" || s.serviceType === filter)
    .filter(s => statusFilter === "all" || s.status === statusFilter)
    .filter(s => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (s.requesterName || "").toLowerCase().includes(q)
        || (s.id || "").toLowerCase().includes(q)
        || (s.email || "").toLowerCase().includes(q)
        || (s.department || "").toLowerCase().includes(q)
        || (s.subject || "").toLowerCase().includes(q)
        || (s.headline || "").toLowerCase().includes(q)
        || (s.articleTitle || "").toLowerCase().includes(q);
    })
    .sort((a, b) => sortBy === "newest"
      ? new Date(b.submittedAt) - new Date(a.submittedAt)
      : new Date(a.submittedAt) - new Date(b.submittedAt)
    );

  const counts = { all: submissions.length, new: 0, "in-progress": 0, completed: 0 };
  submissions.forEach(s => { if (counts[s.status] !== undefined) counts[s.status]++; });

  const statusColors = { new: "#40b5ad", "in-progress": "#e0a630", completed: "#40916c" };
  const statusLabels = { new: "New", "in-progress": "In Progress", completed: "Completed" };

  const changeStatus = (id, status) => {
    SubmissionStore.updateStatus(id, status);
    refresh();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const deleteSubmission = (id) => {
    SubmissionStore.delete(id);
    refresh();
    if (selected?.id === id) setSelected(null);
  };

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const cols = ["Ticket", "Service", "Status", "Submitted", "Name", "Email", "Department", "Phone", "Priority", "Subject/Title", "Description/Notes"];
    const escape = (v) => { const s = String(v || "").replace(/"/g, '""'); return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s; };
    const rows = filtered.map(s => [
      s.id, s.serviceType, statusLabels[s.status] || s.status,
      s.submittedAt ? new Date(s.submittedAt).toLocaleString() : "",
      s.requesterName, s.email, s.department, s.phone,
      s.priority || s.urgency || "", s.subject || s.headline || s.articleTitle || s.title || "",
      s.description || s.message || s.feedback || s.notes || "",
    ].map(escape).join(","));
    const csv = [cols.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `nhbp-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const formatDate = (iso) => {
    if (!iso) return "\u2014";
    return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
  };

  const A = {
    page: { minHeight: "100vh", background: `linear-gradient(145deg, #080a10 0%, #0d1220 50%, #080a10 100%)`, fontFamily: "'DM Sans', Tahoma, sans-serif", color: C.textPrimary, padding: "0" },
    topBar: { position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px", background: "rgba(8,10,16,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` },
    logo: { display: "flex", alignItems: "center", gap: 12 },
    logoIcon: { width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.turquoise}30, ${C.maroon}20)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
    logoText: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" },
    logoBadge: { fontSize: 10, color: C.turquoise, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 },
    exitBtn: { background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 18px", color: C.textSecondary, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" },
    body: { display: "flex", minHeight: "calc(100vh - 69px)" },
    sidebar: { width: 260, borderRight: `1px solid ${C.border}`, padding: "20px 0", flexShrink: 0, background: "rgba(255,255,255,0.01)" },
    sideSection: { padding: "0 16px", marginBottom: 24 },
    sideLabel: { fontSize: 10, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8, padding: "0 8px" },
    sideItem: (active) => ({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, color: active ? C.textPrimary : C.textSecondary, background: active ? "rgba(64,181,173,0.1)" : "transparent", border: active ? `1px solid rgba(64,181,173,0.2)` : "1px solid transparent", transition: "all 0.15s", marginBottom: 2 }),
    badge: (color) => ({ fontSize: 11, fontWeight: 700, color, background: color + "18", padding: "2px 8px", borderRadius: 10 }),
    main: { flex: 1, padding: "24px 28px", overflow: "auto" },
    statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 },
    statCard: { background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden" },
    statValue: (color) => ({ fontSize: 32, fontWeight: 700, color, lineHeight: 1 }),
    statLabel: { fontSize: 12, color: C.textDim, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" },
    statAccent: (color) => ({ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderRadius: "0 12px 0 60px", background: color + "08" }),
    toolbar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" },
    searchInput: { flex: "1 1 220px", padding: "10px 14px 10px 36px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textPrimary, fontSize: 13, outline: "none", fontFamily: "inherit" },
    selectInput: { padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textSecondary, fontSize: 13, outline: "none", fontFamily: "inherit", appearance: "none", cursor: "pointer", minWidth: 130 },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: "0 4px" },
    th: { textAlign: "left", padding: "10px 14px", fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${C.border}` },
    tr: (active) => ({ cursor: "pointer", background: active ? "rgba(64,181,173,0.06)" : "rgba(255,255,255,0.02)", transition: "background 0.15s" }),
    td: { padding: "12px 14px", fontSize: 13, borderBottom: `1px solid rgba(255,255,255,0.03)` },
    statusPill: (status) => ({ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: statusColors[status] || C.textDim, background: (statusColors[status] || "#666") + "15", border: `1px solid ${(statusColors[status] || "#666")}30` }),
    detailPanel: { position: "fixed", top: 0, right: 0, width: 440, height: "100vh", background: "rgba(12,14,22,0.98)", backdropFilter: "blur(24px)", borderLeft: `1px solid ${C.border}`, zIndex: 100, display: "flex", flexDirection: "column", animation: "slideInRight 0.25s ease" },
    detailHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${C.border}` },
    detailBody: { flex: 1, overflow: "auto", padding: "20px 24px" },
    detailRow: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` },
    detailLabel: { fontSize: 12, color: C.textDim, minWidth: 110 },
    detailValue: { fontSize: 13, color: C.textPrimary, textAlign: "right", flex: 1, marginLeft: 12, wordBreak: "break-word" },
    detailActions: { padding: "16px 24px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 },
    actionBtn: (color) => ({ flex: 1, padding: "10px 0", border: `1px solid ${color}40`, background: color + "10", color, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }),
    empty: { textAlign: "center", padding: "80px 20px", color: C.textDim },
  };

  const detailFields = (s) => {
    const base = [
      ["Ticket", s.id], ["Service", s.serviceType], ["Status", statusLabels[s.status] || s.status],
      ["Submitted", formatDate(s.submittedAt)], ["Updated", formatDate(s.updatedAt)],
      ["Name", s.requesterName], ["Email", s.email], ["Phone", s.phone], ["Department", s.department],
    ];
    const extras = Object.entries(s)
      .filter(([k]) => !["id", "ticketNumber", "serviceType", "serviceId", "status", "submittedAt", "updatedAt", "requesterName", "email", "phone", "department"].includes(k))
      .filter(([, v]) => v && v !== "" && !(typeof v === "object" && Object.keys(v).length === 0))
      .map(([k, v]) => [k.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()), typeof v === "object" ? JSON.stringify(v) : String(v)]);
    return [...base, ...extras].filter(([, v]) => v && v !== "\u2014" && v !== "undefined");
  };

  return (
    <div style={A.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .admin-row:hover { background: rgba(64,181,173,0.04) !important; }
        .admin-exit:hover { border-color: rgba(255,255,255,0.2) !important; color: rgba(255,255,255,0.9) !important; }
        .admin-action:hover { filter: brightness(1.2); }
      `}</style>

      {/* Top Bar */}
      <div style={A.topBar}>
        <div style={A.logo}>
          <div style={A.logoIcon}>🐢</div>
          <div>
            <div style={A.logoText}>NHBP Portal</div>
            <div style={A.logoBadge}>Admin Dashboard</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={refresh} style={{ ...A.exitBtn, padding: "8px 14px" }} className="admin-exit" title="Refresh">↻ Refresh</button>
          <button onClick={() => { sessionStorage.removeItem(ADMIN_SESSION_KEY); onExit(); }} style={{ ...A.exitBtn, color: "#ba0c2f", borderColor: "rgba(186,12,47,0.3)" }} className="admin-exit">Sign Out</button>
          <button onClick={onExit} style={A.exitBtn} className="admin-exit">← Back to Portal</button>
        </div>
      </div>

      <div style={A.body}>
        {/* Sidebar */}
        <div style={A.sidebar}>
          <div style={A.sideSection}>
            <div style={A.sideLabel}>Status</div>
            {[["all", "All Requests", counts.all], ["new", "New", counts.new], ["in-progress", "In Progress", counts["in-progress"]], ["completed", "Completed", counts.completed]].map(([key, label, count]) => (
              <div key={key} style={A.sideItem(statusFilter === key)} onClick={() => setStatusFilter(key)}>
                <span>{label}</span>
                <span style={A.badge(key === "all" ? C.textSecondary : statusColors[key] || C.textDim)}>{count}</span>
              </div>
            ))}
          </div>
          <div style={A.sideSection}>
            <div style={A.sideLabel}>Service Type</div>
            <div style={A.sideItem(filter === "all")} onClick={() => setFilter("all")}>
              <span>All Types</span>
            </div>
            {serviceTypes.map(type => (
              <div key={type} style={A.sideItem(filter === type)} onClick={() => setFilter(type)}>
                <span style={{ fontSize: 12 }}>{type}</span>
                <span style={A.badge(C.textDim)}>{submissions.filter(s => s.serviceType === type).length}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={A.main}>
          {/* Stats Row */}
          <div style={A.statsRow}>
            {[
              { label: "Total", value: counts.all, color: C.turquoise },
              { label: "New", value: counts.new, color: "#40b5ad" },
              { label: "In Progress", value: counts["in-progress"], color: "#e0a630" },
              { label: "Completed", value: counts.completed, color: "#40916c" },
            ].map((stat, i) => (
              <div key={i} style={A.statCard}>
                <div style={A.statAccent(stat.color)} />
                <div style={A.statValue(stat.color)}>{stat.value}</div>
                <div style={A.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div style={A.toolbar}>
            <div style={{ position: "relative", flex: "1 1 220px" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textDim, fontSize: 14, pointerEvents: "none" }}>&#x2315;</span>
              <input style={A.searchInput} placeholder="Search by name, ticket, email, department..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select style={A.selectInput} value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <button onClick={exportCSV} disabled={filtered.length === 0} className="admin-exit" style={{ ...A.exitBtn, opacity: filtered.length === 0 ? 0.4 : 1, padding: "10px 16px", fontSize: 13 }}>
              Export CSV
            </button>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div style={A.empty}>
              <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>📋</div>
              <div style={{ fontSize: 16, marginBottom: 6 }}>No submissions found</div>
              <div style={{ fontSize: 13, color: C.textDim }}>
                {submissions.length === 0 ? "Submissions will appear here when users complete forms." : "Try adjusting your filters or search."}
              </div>
            </div>
          ) : (
            <table style={A.table}>
              <thead>
                <tr>
                  <th style={A.th}>Ticket</th>
                  <th style={A.th}>Service</th>
                  <th style={A.th}>Requester</th>
                  <th style={A.th}>Department</th>
                  <th style={A.th}>Status</th>
                  <th style={A.th}>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} style={A.tr(selected?.id === s.id)} className="admin-row" onClick={() => setSelected(s)}>
                    <td style={{ ...A.td, fontFamily: "monospace", color: C.turquoise, fontWeight: 600, fontSize: 12 }}>{s.id}</td>
                    <td style={{ ...A.td, color: C.textSecondary }}>{s.serviceType}</td>
                    <td style={A.td}>{s.requesterName || "\u2014"}</td>
                    <td style={{ ...A.td, color: C.textSecondary }}>{s.department || "\u2014"}</td>
                    <td style={A.td}><span style={A.statusPill(s.status)}>{"\u25CF"} {statusLabels[s.status] || s.status}</span></td>
                    <td style={{ ...A.td, color: C.textDim, fontSize: 12 }}>{formatDate(s.submittedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 90 }} onClick={() => setSelected(null)} />
          <div style={A.detailPanel}>
            <div style={A.detailHeader}>
              <div>
                <div style={{ fontFamily: "monospace", color: C.turquoise, fontWeight: 700, fontSize: 15 }}>{selected.id}</div>
                <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>{selected.serviceType}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: C.textDim, fontSize: 20, cursor: "pointer", padding: 4 }}>{"\u2715"}</button>
            </div>
            <div style={A.detailBody}>
              {detailFields(selected).map(([label, value], i) => (
                <div key={i} style={A.detailRow}>
                  <span style={A.detailLabel}>{label}</span>
                  <span style={A.detailValue}>{value}</span>
                </div>
              ))}
            </div>
            <div style={A.detailActions}>
              {selected.status !== "new" && (
                <button className="admin-action" style={A.actionBtn(C.turquoise)} onClick={() => changeStatus(selected.id, "new")}>Mark New</button>
              )}
              {selected.status !== "in-progress" && (
                <button className="admin-action" style={A.actionBtn("#e0a630")} onClick={() => changeStatus(selected.id, "in-progress")}>In Progress</button>
              )}
              {selected.status !== "completed" && (
                <button className="admin-action" style={A.actionBtn("#40916c")} onClick={() => changeStatus(selected.id, "completed")}>Complete</button>
              )}
              <button className="admin-action" style={A.actionBtn("#ba0c2f")} onClick={() => { if (window.confirm("Delete this submission?")) deleteSubmission(selected.id); }}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ===========================================================
//  MAIN PORTAL
// ===========================================================
export { PortalErrorBoundary };
export default function NHBPPortal() {
  const [screen, setScreen] = useState(() => window.location.hash === "#admin" ? "admin" : "welcome");
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [formData, setFormData] = useState({
    service: null, name: "", email: "", department: "",
    title: "", description: "", priority: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const inputRef = useRef(null);
  const totalSteps = 7;

  // Listen for hash changes to navigate to admin
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#admin") setScreen("admin");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (inputRef.current && screen === "form") {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [step, screen]);

  useEffect(() => {
    const handler = (e) => {
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const goNext = () => {
    if (animating) return;
    setDirection(1);
    setAnimating(true);
    setTimeout(() => {
      if (step < totalSteps - 1) setStep(s => s + 1);
      else handleSubmit();
      setAnimating(false);
    }, 300);
  };

  const goBack = () => {
    if (animating || step === 0) return;
    setDirection(-1);
    setAnimating(true);
    setTimeout(() => { setStep(s => s - 1); setAnimating(false); }, 300);
  };

  const handleSubmit = async () => {
    const t = generateTicket("NHBP");
    const svcLabel = SERVICES.find(s => s.id === formData.service)?.label || "Request";
    setTicketNumber(t);
    await createTrelloCard(
      `\uD83D\uDCCB ${formData.title || svcLabel} \u2014 ${formData.name || "Unknown"}`,
      [...trelloHeader(t),
        "\uD83D\uDC64 REQUESTER", `Name: ${formData.name || "N/A"}`, `Email: ${formData.email || "N/A"}`, `Department: ${formData.department || "N/A"}`, "",
        `\uD83D\uDCCB ${svcLabel.toUpperCase()}`, `Title: ${formData.title || "N/A"}`,
        `Priority: ${PRIORITIES.find(p => p.id === formData.priority)?.label || "N/A"}`,
        `Description: ${formData.description || "N/A"}`,
        "", "\uD83D\uDC22 Submitted via NHBP Communications Portal"]
    );
    SubmissionStore.save({
      ticketNumber: t, serviceType: svcLabel,
      serviceId: formData.service, requesterName: formData.name, email: formData.email,
      department: formData.department, title: formData.title, description: formData.description,
      priority: formData.priority,
    });
    setSubmitted(true);
  };

  const canAdvance = () => {
    switch (step) {
      case 0: return formData.service !== null;
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.email.includes("@");
      case 3: return formData.department.length > 0;
      case 4: return formData.title.trim().length > 0;
      case 5: return formData.description.trim().length > 10;
      case 6: return formData.priority !== null;
      default: return true;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canAdvance()) { e.preventDefault(); goNext(); }
  };

  // Animated background
  const Background = () => (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 800px 600px at ${mousePos.x}% ${mousePos.y}%, ${NHBP.turquoise}08, transparent),
          radial-gradient(ellipse 600px 500px at 20% 20%, ${NHBP.maroon}15, transparent),
          radial-gradient(ellipse 500px 400px at 80% 80%, ${NHBP.turquoise}06, transparent),
          radial-gradient(ellipse 400px 300px at 60% 30%, ${NHBP.red}04, transparent),
          linear-gradient(160deg, #08090c 0%, #0d1117 30%, #0c1018 60%, #080a0e 100%)
        `,
        transition: "background 0.8s ease",
      }} />
      <div style={{
        position: "fixed", width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${NHBP.turquoise}0a 0%, transparent 70%)`,
        top: -100, right: -100, animation: "float1 25s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", width: 350, height: 350, borderRadius: "50%",
        background: `radial-gradient(circle, ${NHBP.maroon}12 0%, transparent 70%)`,
        bottom: -80, left: -80, animation: "float2 30s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", width: 200, height: 200, borderRadius: "50%",
        background: `radial-gradient(circle, ${NHBP.turquoiseLight}06 0%, transparent 70%)`,
        top: "50%", left: "40%", animation: "float3 20s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, opacity: 0.015, pointerEvents: "none",
        backgroundImage: `linear-gradient(${NHBP.turquoise}20 1px, transparent 1px), linear-gradient(90deg, ${NHBP.turquoise}20 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 20px) scale(1.1); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, -25px) scale(1.05); } }
        @keyframes float3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-15px, -20px) scale(1.15); } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        input:focus, textarea:focus { border-color: ${NHBP.turquoise} !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        ::selection { background: ${NHBP.turquoise}40; }
      `}</style>
    </>
  );

  const resetToWelcome = () => {
    setScreen("welcome");
    setStep(0);
    setFormData({ service: null, name: "", email: "", department: "", title: "", description: "", priority: null });
  };

  const BackToPortalButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: "fixed", top: 16, left: 16, zIndex: 9999,
        background: "rgba(8,9,12,0.85)", backdropFilter: "blur(16px)",
        border: `1px solid ${NHBP.turquoise}30`,
        borderRadius: 10, padding: "8px 16px",
        color: NHBP.turquoiseLight, fontSize: 12, fontWeight: 600,
        cursor: "pointer", fontFamily: "Tahoma, sans-serif",
        transition: "all 0.25s ease",
        boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
      }}
      onMouseEnter={e => { e.target.style.borderColor = NHBP.turquoise + "60"; e.target.style.boxShadow = `0 4px 24px rgba(0,0,0,0.5), 0 0 12px ${NHBP.turquoiseGlow}`; }}
      onMouseLeave={e => { e.target.style.borderColor = NHBP.turquoise + "30"; e.target.style.boxShadow = `0 4px 20px rgba(0,0,0,0.4)`; }}
    >
      ← Back to Portal
    </button>
  );

  // ─── ROUTE: ADMIN DASHBOARD ────────────────────────────
  if (screen === "admin") {
    const exitAdmin = () => { window.location.hash = ""; setScreen("welcome"); };
    return (
      <AdminGate onExit={exitAdmin}>
        <AdminDashboard onExit={exitAdmin} />
      </AdminGate>
    );
  }

  // ─── ROUTE: VISUAL DESIGNS FORM ─────────────────────────
  if (screen === "visual-designs") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <VisualDesignForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: STATIONERY KIT FORM ─────────────────────
  if (screen === "stationery-kit") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <StationeryKitForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: STUDIO HUB (HEADSHOTS) FORM ────────────
  if (screen === "studio-hub") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <EmployeeHeadshotsForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: INSTANT ALERT FORM ─────────────────────
  if (screen === "instant-alert") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <InstantAlertForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: TURTLE PRESS FORM ──────────────────────
  if (screen === "turtle-press") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <TurtlePressForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── ROUTE: GENERAL / OTHER REQUEST FORM ───────────
  if (screen === "general-request") {
    return (
      <div style={{ position: "relative" }}>
        <BackToPortalButton onClick={resetToWelcome} />
        <GeneralRequestForm onBackToPortal={resetToWelcome} />
      </div>
    );
  }

  // ─── WELCOME SCREEN ─────────────────────────────────────
  if (screen === "welcome") {
    return (
      <div style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Background />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative", zIndex: 1, animation: "slideUp 0.8s ease" }}>
          <div style={{
            width: 90, height: 90, borderRadius: 24, position: "relative",
            background: `linear-gradient(135deg, ${NHBP.turquoise}20, ${NHBP.maroon}15)`,
            backdropFilter: "blur(20px)",
            border: `1px solid ${NHBP.turquoise}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 36,
            boxShadow: `0 0 60px ${NHBP.turquoiseGlow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}>
            <span style={{ fontSize: 42, filter: "drop-shadow(0 0 8px rgba(20, 169, 162, 0.5))" }}>🐢</span>
            <div style={{
              position: "absolute", inset: -1, borderRadius: 24, padding: 1,
              background: `linear-gradient(135deg, ${NHBP.turquoise}50, transparent, ${NHBP.turquoise}20)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor", maskComposite: "exclude",
            }} />
          </div>

          <h1 style={{
            fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 300, margin: 0,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            background: `linear-gradient(135deg, #ffffff 0%, ${NHBP.turquoiseLight} 50%, ${NHBP.pink} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            NHBP Communications
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", color: NHBP.turquoise,
            fontWeight: 300, margin: "8px 0 0", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Request Portal
          </p>

          <div style={{
            width: 80, height: 2, margin: "32px 0",
            background: `linear-gradient(90deg, transparent, ${NHBP.turquoise}, transparent)`,
          }} />

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 380, margin: "0 0 40px" }}>
            Designs, photos, publications, and more —
            <br />all in one place. Let’s make something great.
          </p>

          <GlassCard
            onClick={() => setScreen("form")}
            style={{ padding: "16px 44px", cursor: "pointer" }}
          >
            <span style={{
              fontSize: 16, fontWeight: 600, letterSpacing: "0.04em",
              background: `linear-gradient(135deg, ${NHBP.turquoiseLight}, #fff)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Start a Request →
            </span>
          </GlassCard>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Takes about 2 minutes
          </p>
        </div>
      </div>
    );
  }

  // ─── CONFIRMATION SCREEN ────────────────────────────────
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Background />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative", zIndex: 1, animation: "scaleIn 0.5s ease" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", marginBottom: 28,
            background: `linear-gradient(135deg, ${NHBP.turquoise}, ${NHBP.turquoiseDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, fontWeight: 700, color: "#fff",
            boxShadow: `0 0 50px ${NHBP.turquoiseGlow}`,
          }}>✓</div>

          <h1 style={{ fontSize: 34, fontWeight: 300, margin: "0 0 20px", letterSpacing: "-0.02em" }}>You’re all set.</h1>

          <GlassCard style={{ padding: "14px 32px", marginBottom: 24 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>Request</span>
            <span style={{ fontSize: 24, fontWeight: 600, color: NHBP.turquoiseLight, fontFamily: "monospace", letterSpacing: "0.05em" }}>{ticketNumber}</span>
          </GlassCard>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 400, marginBottom: 28 }}>
            Your {SERVICES.find(s => s.id === formData.service)?.label} request has been received.
            <br />The Communications team will be in touch within 24 hours.
          </p>

          <GlassCard style={{ padding: "20px 28px", width: "100%", maxWidth: 380, textAlign: "left" }}>
            {[
              ["Requested by", formData.name],
              ["Department", formData.department],
              ["Project", formData.title],
              ["Priority", PRIORITIES.find(p => p.id === formData.priority)?.label],
            ].map(([label, value], i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", padding: "10px 0",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{label}</span>
                <span style={{
                  fontSize: 14, fontWeight: 600,
                  color: label === "Priority"
                    ? PRIORITIES.find(p => p.id === formData.priority)?.color
                    : "rgba(255,255,255,0.8)",
                }}>{value}</span>
              </div>
            ))}
          </GlassCard>

          <div style={{ marginTop: 28 }}>
            <GlassCard
              onClick={() => {
                setScreen("welcome"); setStep(0); setSubmitted(false);
                setFormData({ service: null, name: "", email: "", department: "", title: "", description: "", priority: null });
              }}
              style={{ padding: "14px 36px", cursor: "pointer" }}
            >
              <span style={{ fontSize: 14, color: NHBP.turquoiseLight, fontWeight: 600 }}>Submit Another Request</span>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORM STEPS ─────────────────────────────────────────
  const slideStyle = {
    width: "100%", maxWidth: 620,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: animating ? 0 : 1,
    transform: animating ? `translateY(${direction * 24}px)` : "translateY(0)",
  };

  const inputStyle = {
    width: "100%", maxWidth: 440, background: "transparent",
    border: "none", borderBottom: `2px solid rgba(255,255,255,0.1)`,
    color: "#f0f0f0", fontSize: 22, fontFamily: "Tahoma, 'Segoe UI', sans-serif",
    padding: "14px 0", outline: "none", transition: "border-color 0.3s ease",
    caretColor: NHBP.turquoise, boxSizing: "border-box",
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>01 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              What can we help you create?
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Pick the service that best fits your need</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
              {SERVICES.map(s => (
                <GlassCard
                  key={s.id}
                  active={formData.service === s.id}
                  onClick={() => {
                    if (s.status === "live") {
                      if (s.id === "visual") {
                        setScreen("visual-designs");
                        return;
                      }
                      if (s.id === "stationery") {
                        setScreen("stationery-kit");
                        return;
                      }
                      if (s.id === "studio") {
                        setScreen("studio-hub");
                        return;
                      }
                      if (s.id === "instant-alert") {
                        setScreen("instant-alert");
                        return;
                      }
                      if (s.id === "turtle-press") {
                        setScreen("turtle-press");
                        return;
                      }
                      if (s.id === "other") {
                        setScreen("general-request");
                        return;
                      }
                      setFormData(d => ({ ...d, service: s.id }));
                      setTimeout(goNext, 400);
                    }
                  }}
                  style={{
                    padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
                    opacity: s.status === "coming" ? 0.45 : 1,
                    cursor: s.status === "coming" ? "default" : "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <span style={{
                      fontSize: 26, lineHeight: 1,
                      color: formData.service === s.id ? NHBP.turquoiseLight : "rgba(255,255,255,0.5)",
                      transition: "color 0.3s ease",
                      filter: formData.service === s.id ? `drop-shadow(0 0 6px ${NHBP.turquoiseGlow})` : "none",
                    }}>{s.icon}</span>
                    {s.status === "live" && (
                      <span style={{
                        fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
                        color: "#1a1a2e", background: NHBP.turquoise, padding: "3px 8px", borderRadius: 20,
                      }}>Live</span>
                    )}
                    {s.status === "coming" && (
                      <span style={{
                        fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)",
                        padding: "3px 8px", borderRadius: 20,
                      }}>Soon</span>
                    )}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{s.label}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{s.desc}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>02 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>What’s your name?</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>So we know who we’re working with</p>
            <input ref={inputRef} type="text" placeholder="Type your full name..." value={formData.name}
              onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} onKeyDown={handleKeyDown} style={inputStyle} />
          </div>
        );

      case 2:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>03 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>
              Great to have you, <span style={{ color: NHBP.turquoiseLight }}>{formData.name.split(" ")[0]}</span>
              <br />What’s your email?
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>We’ll send updates and your tracking link here</p>
            <input ref={inputRef} type="email" placeholder="yourname@nhbp-nsn.gov" value={formData.email}
              onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} onKeyDown={handleKeyDown} style={inputStyle} />
          </div>
        );

      case 3:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>04 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Which department are you with?</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>Select your department</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 540 }}>
              {DEPARTMENTS.map(d => {
                const active = formData.department === d;
                return (
                  <button key={d} onClick={() => { setFormData(f => ({ ...f, department: d })); setTimeout(goNext, 400); }}
                    style={{
                      background: active ? `${NHBP.turquoise}18` : "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${active ? NHBP.turquoise + "50" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 22, padding: "9px 18px",
                      color: active ? NHBP.turquoiseLight : "rgba(255,255,255,0.5)",
                      fontSize: 13, cursor: "pointer", transition: "all 0.25s ease",
                      fontFamily: "Tahoma, sans-serif",
                      boxShadow: active ? `0 0 16px ${NHBP.turquoise}15` : "none",
                    }}>
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>05 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Give your project a title</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 32px" }}>Something short and descriptive</p>
            <input ref={inputRef} type="text" placeholder='"Spring Pow Wow Flyer" or "Staff Headshots March"'
              value={formData.title} onChange={e => setFormData(d => ({ ...d, title: e.target.value }))} onKeyDown={handleKeyDown} style={inputStyle} />
          </div>
        );

      case 5:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>06 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>Tell us about your project</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>Purpose, audience, specific ideas — the more detail, the faster we deliver</p>
            <textarea ref={inputRef} placeholder="Describe what you need..."
              value={formData.description} onChange={e => setFormData(d => ({ ...d, description: e.target.value }))}
              style={{
                width: "100%", maxWidth: 520, minHeight: 140, resize: "vertical",
                background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)",
                border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 14,
                color: "#f0f0f0", fontSize: 15, fontFamily: "Tahoma, sans-serif",
                padding: "18px", outline: "none", lineHeight: 1.7, caretColor: NHBP.turquoise,
                boxSizing: "border-box", transition: "border-color 0.3s ease",
              }}
              rows={5} />
          </div>
        );

      case 6:
        return (
          <div style={slideStyle}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 14, fontFamily: "monospace" }}>07 / 0{totalSteps}</p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.25, margin: "0 0 8px" }}>How soon do you need this?</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 28px" }}>This helps us prioritize across all departments</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440 }}>
              {PRIORITIES.map(p => {
                const active = formData.priority === p.id;
                return (
                  <GlassCard key={p.id} active={active} onClick={() => setFormData(d => ({ ...d, priority: p.id }))}
                    style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
                      borderColor: active ? p.color + "50" : undefined,
                      boxShadow: active ? `0 0 24px ${p.color}20` : undefined,
                    }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                      background: p.color,
                      boxShadow: active ? `0 0 12px ${p.color}60` : "none",
                      transition: "box-shadow 0.3s ease",
                    }} />
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{p.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{p.desc}</div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", color: "#f0f0f0", fontFamily: "Tahoma, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Background />

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.03)", zIndex: 100 }}>
        <div style={{
          height: "100%", borderRadius: "0 1px 1px 0",
          width: `${((step + 1) / totalSteps) * 100}%`,
          background: `linear-gradient(90deg, ${NHBP.turquoise}, ${NHBP.turquoiseLight})`,
          boxShadow: `0 0 12px ${NHBP.turquoiseGlow}`,
          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", position: "relative", zIndex: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)" }}>
          🐢 NHBP Communications
        </span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
          {formData.service && `${SERVICES.find(s => s.id === formData.service)?.icon} ${SERVICES.find(s => s.id === formData.service)?.label}`}
        </span>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 28px 100px", position: "relative", zIndex: 1 }}>
        {renderStep()}
      </div>

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px",
        background: "linear-gradient(0deg, rgba(8,9,12,0.95) 50%, transparent)",
        backdropFilter: "blur(12px)",
      }}>
        <button onClick={goBack} disabled={step === 0}
          style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.35)",
            fontSize: 13, cursor: step === 0 ? "default" : "pointer", padding: "10px 16px",
            fontFamily: "Tahoma, sans-serif", opacity: step === 0 ? 0.3 : 1,
            transition: "all 0.2s ease",
          }}>
          ← Back
        </button>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              height: 6, borderRadius: 3,
              width: i === step ? 28 : 6,
              background: i === step ? NHBP.turquoise : i < step ? NHBP.turquoise + "50" : "rgba(255,255,255,0.1)",
              boxShadow: i === step ? `0 0 8px ${NHBP.turquoiseGlow}` : "none",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }} />
          ))}
        </div>

        <button onClick={goNext} disabled={!canAdvance()}
          style={{
            background: canAdvance() ? `${NHBP.turquoise}15` : "transparent",
            border: `1px solid ${canAdvance() ? NHBP.turquoise + "30" : "rgba(255,255,255,0.05)"}`,
            color: canAdvance() ? NHBP.turquoiseLight : "rgba(255,255,255,0.2)",
            fontSize: 13, fontWeight: 600, cursor: canAdvance() ? "pointer" : "default",
            padding: "10px 20px", borderRadius: 10,
            fontFamily: "Tahoma, sans-serif", transition: "all 0.3s ease",
            boxShadow: canAdvance() ? `0 0 16px ${NHBP.turquoise}10` : "none",
          }}>
          {step === totalSteps - 1 ? "Submit ✓" : "Next →"}
        </button>
      </div>
    </div>
  );
}
