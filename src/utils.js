import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
//  SUBMISSION STORE (localStorage persistence)
// ═══════════════════════════════════════════════════════════
export const SubmissionStore = {
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
export const generateTicket = (prefix) => {
  const existing = new Set(SubmissionStore.getAll().map(s => s.id));
  let ticket;
  do {
    ticket = `${prefix}-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
  } while (existing.has(ticket));
  return ticket;
};

// Shared Trello card creation
export const createTrelloCard = async (cardName, descLines) => {
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

export const trelloHeader = (ticket) => [
  "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
  "\uD83D\uDCCB COMMUNICATIONS PORTAL SUBMISSION",
  "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
  "",
  `\uD83C\uDFAB Ticket: ${ticket}`,
  `\uD83D\uDCC5 Submitted: ${new Date().toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}`,
  "",
];

// Auto-save form drafts to localStorage
export const useDraftForm = (key, initialState) => {
  const storageKey = `nhbp_draft_${key}`;
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialState, ...parsed };
      }
    } catch {}
    return initialState;
  });
  const debounceRef = useRef(null);
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(form));
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [form, storageKey]);
  const clearDraft = () => localStorage.removeItem(storageKey);
  return [form, setForm, clearDraft];
};
