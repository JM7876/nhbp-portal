import { useState, useEffect, useRef } from "react";
import { NHBP, FORM_DEPTS } from "../constants";
import { useDraftForm, generateTicket, createTrelloCard, trelloHeader, SubmissionStore } from "../utils";
import { GlassCard } from "../components/GlassCard";

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
  const [form, setForm, clearDraft] = useDraftForm("visual-design", {
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
        clearDraft();
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

export default VisualDesignForm;
