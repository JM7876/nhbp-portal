import { NHBP } from "../theme";

export const PRIORITIES = [
  { id: "standard", label: "Standard", desc: "2–3 weeks turnaround", color: NHBP.turquoise },
  { id: "priority", label: "Priority", desc: "1–2 weeks turnaround", color: "#e0a630" },
  { id: "urgent", label: "Urgent", desc: "Within 5 business days", color: NHBP.red },
];

export const VD_PRIORITIES = [
  { id: "standard", label: "Standard", desc: "2–3 weeks", color: NHBP.turquoise },
  { id: "priority", label: "Priority", desc: "1–2 weeks", color: "#e0a630" },
  { id: "urgent", label: "Urgent", desc: "Within 5 business days", color: NHBP.red },
];

export const ORDER_REASONS = [
  { id: "new-hire", label: "🆕 New Hire", desc: "First time order" },
  { id: "restock", label: "📦 Restock / Reorder", desc: "Same info, need more" },
  { id: "update", label: "✏️ Info Update", desc: "Name change, new title, etc." },
];
