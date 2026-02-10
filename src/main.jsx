import React from "react";
import ReactDOM from "react-dom/client";
import App, { PortalErrorBoundary } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PortalErrorBoundary>
      <App />
    </PortalErrorBoundary>
  </React.StrictMode>
);
