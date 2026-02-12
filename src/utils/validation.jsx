import React from "react";

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (phone) => !phone || /^[\d\s\-().+]+$/.test(phone);

export const ValidationMsg = ({ msg, show }) => (
  <div style={{
    fontSize: 12, color: "rgba(186,12,47,0.7)", marginTop: 4,
    fontFamily: "var(--font-primary)",
    opacity: show ? 1 : 0, maxHeight: show ? 20 : 0,
    transition: "opacity 0.3s ease, max-height 0.3s ease",
    overflow: "hidden",
  }}>
    {msg}
  </div>
);
