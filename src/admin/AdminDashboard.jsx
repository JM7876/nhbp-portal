import { useState, useEffect } from "react";
import { NHBP, C } from "../constants";
import { SubmissionStore } from "../utils";

const ADMIN_SESSION_KEY = "nhbp_admin_auth";

export function AdminGate({ onExit, children }) {
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
export default function AdminDashboard({ onExit }) {
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
