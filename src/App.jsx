import React, { useState } from "react";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import WelcomePage from "./components/welcome/WelcomePage";
import ServiceGrid from "./components/services/ServiceGrid";
import VisualDesignForm from "./components/forms/VisualDesignForm";
import StationeryKitForm from "./components/forms/StationeryKitForm";
import EmployeeHeadshotsForm from "./components/forms/StudioHubForm";
import CommunityOutreachForm from "./components/forms/CommunityOutreachForm";
import DIYFormBuilder from "./components/forms/DIYFormBuilder";
import TurtlePressForm from "./components/forms/TurtlePressForm";
import GeneralRequestForm from "./components/forms/GeneralRequestForm";

// ═══════════════════════════════════════════════════════════
//  MAIN PORTAL — Screen Router
// ═══════════════════════════════════════════════════════════
export default function NHBPPortal() {
  const [screen, setScreen] = useState("welcome");

  const resetToWelcome = () => {
    setScreen("welcome");
  };

  const handleSelectService = (serviceId) => {
    const routes = {
      "visual": "visual-designs",
      "stationery": "stationery-kit",
      "studio": "studio-hub",
      "community-outreach": "community-outreach",
      "diy-builder": "diy-builder",
      "turtle-press": "turtle-press",
      "other": "general-request",
    };
    if (routes[serviceId]) {
      setScreen(routes[serviceId]);
    }
  };

  // ─── ROUTE: VISUAL DESIGNS FORM ─────────────────────────
  if (screen === "visual-designs") {
    return (
      <ErrorBoundary onReturnToServices={resetToWelcome}>
        <VisualDesignForm onReturnToServices={resetToWelcome} />
      </ErrorBoundary>
    );
  }

  // ─── ROUTE: STATIONERY KIT FORM ─────────────────────
  if (screen === "stationery-kit") {
    return (
      <ErrorBoundary onReturnToServices={resetToWelcome}>
        <StationeryKitForm onReturnToServices={resetToWelcome} />
      </ErrorBoundary>
    );
  }

  // ─── ROUTE: STUDIO HUB (HEADSHOTS) FORM ────────────
  if (screen === "studio-hub") {
    return (
      <ErrorBoundary onReturnToServices={resetToWelcome}>
        <EmployeeHeadshotsForm onReturnToServices={resetToWelcome} />
      </ErrorBoundary>
    );
  }

  // ─── ROUTE: COMMUNITY OUTREACH FORM ────────────────
  if (screen === "community-outreach") {
    return (
      <ErrorBoundary onReturnToServices={resetToWelcome}>
        <CommunityOutreachForm onReturnToServices={resetToWelcome} />
      </ErrorBoundary>
    );
  }

  // ─── ROUTE: DIY POST BUILDER FORM ────────────────
  if (screen === "diy-builder") {
    return (
      <ErrorBoundary onReturnToServices={resetToWelcome}>
        <DIYFormBuilder onReturnToServices={resetToWelcome} />
      </ErrorBoundary>
    );
  }

  // ─── ROUTE: TURTLE PRESS FORM ──────────────────────
  if (screen === "turtle-press") {
    return (
      <ErrorBoundary onReturnToServices={resetToWelcome}>
        <TurtlePressForm onReturnToServices={resetToWelcome} />
      </ErrorBoundary>
    );
  }

  // ─── ROUTE: GENERAL / OTHER REQUEST FORM ───────────
  if (screen === "general-request") {
    return (
      <ErrorBoundary onReturnToServices={resetToWelcome}>
        <GeneralRequestForm onReturnToServices={resetToWelcome} />
      </ErrorBoundary>
    );
  }

  // ─── SERVICES SCREEN ──────────────────────────────────
  if (screen === "services") {
    return (
      <ServiceGrid
        onSelectService={handleSelectService}
        onHome={resetToWelcome}
      />
    );
  }

  // ─── WELCOME SCREEN (default) ─────────────────────────
  return (
    <WelcomePage onStartRequest={() => setScreen("services")} />
  );
}
