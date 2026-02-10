import React from "react";

export class PortalErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error("Portal error:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#080a10", color: "#f0f0f0", fontFamily: "Tahoma, 'DM Sans', sans-serif", textAlign: "center", padding: "40px 24px" }}>
          <div aria-hidden="true" style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(186,12,47,0.15)", border: "1px solid rgba(186,12,47,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 28 }}>!</div>
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
