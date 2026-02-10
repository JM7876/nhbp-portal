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
  turquoiseCard: "#45B3A2",
  maroonCard: "#4B0D20",
  mintDivider: "#a8ddd4",
  namePlateTurq: "#6BC5AA",
};

export const SERVICES = [
  { id: "visual", icon: "\u2726", label: "Visual Designs", desc: "Digital flyers, printed materials, banners, ads, presentations", gradient: `linear-gradient(135deg, ${NHBP.turquoise}22, ${NHBP.turquoise}08)`, status: "live" },
  { id: "stationery", icon: "\u25CE", label: "Employee Stationery Kit", desc: "Business cards, name plates, personalized notepads", gradient: `linear-gradient(135deg, ${NHBP.maroonLight}22, ${NHBP.maroonLight}08)`, status: "live" },
  { id: "studio", icon: "\uD83D\uDCF7", label: "The Studio Hub", desc: "Headshots, photo booth, event photography", gradient: `linear-gradient(135deg, ${NHBP.greenLight}22, ${NHBP.greenLight}08)`, status: "live" },
  { id: "event-coverage", icon: "\u25C9", label: "Event Coverage", desc: "Photography & videography for events", gradient: `linear-gradient(135deg, ${NHBP.greenLight}22, ${NHBP.greenLight}08)`, status: "coming" },
  { id: "instant-alert", icon: "\u26A1", label: "Instant Alert", desc: "Urgent communications & emergency notices", gradient: `linear-gradient(135deg, ${NHBP.red}18, ${NHBP.red}06)`, status: "live" },
  { id: "presentation", icon: "\u25A4", label: "Media / Public Presentation", desc: "PowerPoint, keynotes, public-facing decks", gradient: `linear-gradient(135deg, ${NHBP.turquoise}22, ${NHBP.turquoise}08)`, status: "coming" },
  { id: "turtle-press", icon: "\uD83D\uDC22", label: "The Turtle Press", desc: "Article submissions, birthdays & celebrations, photo contributions", gradient: `linear-gradient(135deg, ${NHBP.maroonLight}22, ${NHBP.maroonLight}08)`, status: "live" },
  { id: "other", icon: "\uD83D\uDCA1", label: "Other", desc: "Something else \u2014 tell us what you need", gradient: `linear-gradient(135deg, ${NHBP.turquoise}15, ${NHBP.turquoise}05)`, status: "live" },
];

export const PRIORITIES = [
  { id: "standard", label: "Standard", desc: "2\u20133 weeks turnaround", color: NHBP.turquoise },
  { id: "priority", label: "Priority", desc: "1\u20132 weeks turnaround", color: "#e0a630" },
  { id: "urgent", label: "Urgent", desc: "Within 5 business days", color: NHBP.red },
];

export const DEPARTMENTS = [
  "Administration", "Education", "Elder Services", "Enrollment", "Environmental",
  "Facilities", "Finance", "Health & Human Services", "Housing", "Human Resources",
  "IT", "Language & Culture", "Legal", "Natural Resources", "Planning",
  "Pow Wow Committee", "Public Safety", "Social Services", "Tribal Council", "Youth Services"
];

export const C = {
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

export const FORM_DEPTS = [
  { value: "Administration", label: "Administration" },
  { value: "Bked\u00e9 O Mshik\u00e9 \uD83D\uDC22", label: "\uD83D\uDC22 Bked\u00e9 O Mshik\u00e9" },
  { value: "Communications \uD83D\uDCF0", label: "\uD83D\uDCF0 Communications" },
  { value: "Culture \uD83E\uDEB6", label: "\uD83E\uDEB6 Culture" },
  { value: "Enrollment", label: "Enrollment" },
  { value: "Environmental \uD83C\uDF0D", label: "\uD83C\uDF0D Environmental" },
  { value: "Finance", label: "Finance" },
  { value: "Gaming Commission \uD83C\uDFB0", label: "\uD83C\uDFB0 Gaming Commission" },
  { value: "Government Records \uD83D\uDDC3\uFE0F", label: "\uD83D\uDDC3\uFE0F Government Records" },
  { value: "Health and Human Services \uD83E\uDD7C", label: "\uD83E\uDD7C Health & Human Services" },
  { value: "Housing \uD83C\uDFE1", label: "\uD83C\uDFE1 Housing" },
  { value: "Human Resources \uD83D\uDCBC", label: "\uD83D\uDCBC Human Resources" },
  { value: "Information Technology \uD83E\uDDD1\u200D\uD83D\uDCBB", label: "\uD83E\uDDD1\u200D\uD83D\uDCBB Information Technology" },
  { value: "Legal \uD83D\uDC69\u200D\uD83D\uDCBC", label: "\uD83D\uDC69\u200D\uD83D\uDCBC Legal" },
  { value: "Membership Services \u26F9\uFE0F\u200D\u2642\uFE0F", label: "\u26F9\uFE0F Membership Services" },
  { value: "Planning \uD83D\uDCCA", label: "\uD83D\uDCCA Planning" },
  { value: "Public Works \uD83D\uDE8F", label: "\uD83D\uDE8F Public Works" },
  { value: "Social Services \uD83E\uDDD1\u200D\uD83E\uDDD1\u200D\uD83E\uDDD2\u200D\uD83E\uDDD2", label: "\uD83E\uDDD1\u200D\uD83E\uDDD1\u200D\uD83E\uDDD2\u200D\uD83E\uDDD2 Social Services" },
  { value: "Tribal Council \uD83D\uDDF3\uFE0F", label: "\uD83D\uDDF3\uFE0F Tribal Council" },
  { value: "Tribal Court \uD83D\uDC69\u200D\u2696\uFE0F", label: "\uD83D\uDC69\u200D\u2696\uFE0F Tribal Court" },
  { value: "Tribal Police \uD83D\uDC6E\u200D\u2640\uFE0F", label: "\uD83D\uDC6E Tribal Police" },
  { value: "Other", label: "Other" },
];
