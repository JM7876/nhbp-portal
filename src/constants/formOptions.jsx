export const PIECE_TYPES = [
  { id: "digital-flyer", icon: "📱", label: "Digital Media Flyer", desc: "Social media graphics, digital flyers, event promos" },
  { id: "printed-media", icon: "🖨️", label: "Printed Media Materials", desc: "Flyers, trifolds, postcards, posters, booklets" },
  { id: "banner-sign", icon: "🏗️", label: "Banner / Sign", desc: "Retractable banners, vinyl, yard signs, window signs" },
  { id: "ad", icon: "📰", label: "QTP Advertisements", desc: "Quarter page, half page, full page ads" },
  { id: "presentation", icon: "🖥️", label: "Presentation", desc: "PowerPoint, Google Slides, templates" },
  { id: "special-request", icon: "⭐", label: "General Special Request", desc: "Something unique — tell us what you need" },
];

export const FORMAT_OPTIONS = [
  { id: "digital", icon: "💻", label: "Digital Only", desc: "Screen, email, social media" },
  { id: "print", icon: "🖨️", label: "Print Only", desc: "Will be physically printed" },
  { id: "both", icon: "✨", label: "Both", desc: "Digital version + print-ready files" },
];

// ─── PRINTED MEDIA SUB-CATEGORIES ─────────────────────
export const PRINTED_MEDIA_SIZES = [
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

export const SIZES = {
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

export const PURPOSES = [
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
export const STYLE_SECTIONS = [
  { id: "cultural", label: "Cultural & Community", icon: "🐢" },
  { id: "modern", label: "Modern & Classic", icon: "✦" },
  { id: "niche", label: "Niche & Specialty", icon: "◆" },
];

export const STYLES = [
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
export const PALETTE_MODIFIERS = [
  { id: "default", label: "Style Default", desc: "Use this style's natural colors", colors: null, icon: "🎨" },
  { id: "nhbp-brand", label: "NHBP Brand Standard", desc: "Official tribal branding", colors: ["#14A9A2", "#5F0C0E", "#094425", "#FAC6C7", "#BA0C2F"], icon: "🐢" },
  { id: "spring", label: "Spring Fresh", desc: "Light greens, soft pastels, renewal", colors: ["#7ec8a0", "#f0c6d4", "#a8d8ea", "#fff9c4", "#c5e1a5"], icon: "🌱" },
  { id: "summer", label: "Summer Bold", desc: "Warm brights, sunny energy, golden", colors: ["#ff6b35", "#f7c948", "#00b4d8", "#ff8fab", "#ffd60a"], icon: "☀️" },
  { id: "autumn", label: "Autumn Warm", desc: "Rich oranges, deep reds, harvest gold", colors: ["#bc4b21", "#e89b3f", "#5c3d2e", "#d4a574", "#8b2500"], icon: "🍂" },
  { id: "winter", label: "Winter Cool", desc: "Icy blues, deep navy, silver accents", colors: ["#1a3a5c", "#87aec5", "#c0d6e4", "#f0f4f8", "#4a6fa5"], icon: "❄️" },
  { id: "trending-2026", label: "Trending 2026", desc: "Current design trend colors", colors: ["#6c5ce7", "#00cec9", "#fd79a8", "#ffeaa7", "#2d3436"], icon: "🔥" },
  { id: "custom", label: "Custom Colors", desc: "Describe what you need", colors: null, icon: "✏️" },
];

// ─── VERBIAGE KEYWORDS ─────────────────────────────────
export const VERBIAGE_KEYWORDS = {
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

export const ALL_KEYWORDS = Object.values(VERBIAGE_KEYWORDS).flat();
