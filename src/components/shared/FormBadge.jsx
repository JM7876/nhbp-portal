import React from "react";

const FormBadge = ({ name, color }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: color + "25", color, border: `1px solid ${color}40` }}>
    <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />{name}
  </span>
);

export default FormBadge;
