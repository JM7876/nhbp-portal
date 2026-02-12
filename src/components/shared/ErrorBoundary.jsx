import React, { Component } from "react";
import { SPACING } from "../../theme";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          background: "#070a10", fontFamily: "var(--font-primary)", padding: 24,
        }}>
          <div style={{
            maxWidth: 420, width: "100%", textAlign: "center", padding: "48px 32px",
            backdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
            WebkitBackdropFilter: "blur(20px) saturate(1.2) brightness(1.05)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))",
            border: "1px solid rgba(20,169,162,0.2)", borderRadius: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🐢</div>
            <h2 style={{ fontSize: 22, fontWeight: 300, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              Something went wrong
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, marginBottom: 28 }}>
              This form encountered an error. The rest of the portal is still working fine.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                if (this.props.onReturnToServices) this.props.onReturnToServices();
              }}
              style={{
                padding: "14px 32px", borderRadius: SPACING.buttonBorderRadius, cursor: "pointer",
                backdropFilter: "blur(20px) saturate(1.4) brightness(1.1)",
                border: "1px solid rgba(20,169,162,0.3)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                fontSize: 14, fontWeight: 500, color: "rgba(20,169,162,0.8)",
                fontFamily: "var(--font-primary)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              🐢 Return to Services
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
