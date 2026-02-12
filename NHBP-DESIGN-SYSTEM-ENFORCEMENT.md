# NHBP DESIGN SYSTEM v3 — FULL PORTAL ENFORCEMENT

You are performing a COMPLETE design system audit and enforcement across the entire NHBP Communications Portal. Every file. Every page. Every style property checked against this spec. One file at a time.

---

## GIT — SAFETY FIRST

Before touching anything:
```bash
git add -A && git commit -m "pre-design-system-v3: snapshot before changes"
git checkout -b design-system-v3
```

Commit and push after each phase. If something breaks, revert:
```bash
git log --oneline              # find last good commit
git reset --hard HEAD~1        # undo last phase
# OR abort everything:
git checkout main
git branch -D design-system-v3
```

---

## THE COMPLETE SPEC — ENFORCE ALL OF THIS

### 01. FONT — Josefin Sans (replaces Raleway)
- Google Fonts: `Josefin+Sans:wght@100;200;300;400;500;600;700`
- CSS: `--font-primary: 'Josefin Sans', -apple-system, BlinkMacSystemFont, sans-serif`
- JS: `FONTS.primary: "'Josefin Sans', sans-serif"`
- Kill ALL Raleway, Playfair Display, DM Sans references
- Weight hierarchy: 200 hero, 300 titles, 400 body, 500 accents/buttons, 600 badges, 700 card headers

### 02. COLORS — NHBP Brand (`import { NHBP } from theme`)
| Token | Value | Usage |
|---|---|---|
| turquoise | #14A9A2 | Primary accent |
| turquoiseLight | #1bc4bc | Hover states |
| turquoiseDark | #0e8a84 | Pressed states |
| turquoiseGlow | rgba(20,169,162,0.25) | Box shadows |
| maroon | #5F0C0E | Brand secondary |
| maroonLight | #8a1518 | Submit buttons |
| green | #094425 | Tribal green |
| greenLight | #0d6b3a | Green hover |
| pink | #FAC6C7 | Completion state |
| red | #BA0C2F | Alerts/emergency |
| redGlow | rgba(186,12,47,0.15) | Alert shadows |

**No hardcoded hex values.** Use `NHBP.turquoise` not `"#14A9A2"`.

### 03. COLORS — FC Form Colors (`import { FC } from theme`, alias `const C = FC`)
| Token | Value |
|---|---|
| dark | #0a0e14 |
| darkCard | #111820 |
| turquoise | #40b5ad |
| turquoiseLight | #5fcec6 |
| turquoiseGlow | rgba(64,181,173,0.3) |
| maroon | #6b2737 |
| maroonLight | #8a3a4d |
| gold | #c9a84c |
| goldLight | #e0c76e |
| green | #2d6a4f |
| greenLight | #40916c |
| red | #ba0c2f |
| redLight | #e02040 |
| textPrimary | rgba(255,255,255,0.92) |
| textSecondary | rgba(255,255,255,0.55) |
| textDim | rgba(255,255,255,0.3) |
| border | rgba(255,255,255,0.08) |
| glass | rgba(255,255,255,0.03) |

### 04. GLASS MORPHISM
```jsx
// Default state
background: "rgba(255,255,255,0.03)",
backdropFilter: "blur(20px)",
WebkitBackdropFilter: "blur(20px)",
border: "1px solid rgba(255,255,255,0.06)",
borderRadius: 16,
boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
// Plus ::before top-edge gradient highlight

// Active state
background: `linear-gradient(135deg, ${color}18, ${color}08)`,
borderColor: `${color}` at 0.35 opacity,
boxShadow: `0 0 30px ${colorGlow}, inset 0 1px 0 rgba(255,255,255,0.08)`,

// Hover state
borderColor: "rgba(20,169,162,0.2)",
boxShadow: "0 6px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
transform: "translateY(-1px)",
```

### 05. BUTTONS — Unified Glass Pill
```jsx
// Shared base — ALL primary buttons
{
  padding: "20px 60px",
  borderRadius: 28,
  backdropFilter: "blur(20px) saturate(1.4) brightness(1.1)",
  WebkitBackdropFilter: "blur(20px) saturate(1.4) brightness(1.1)",
  background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: "0.06em",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
  fontFamily: "var(--font-primary)",
  cursor: "pointer",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
}

// Welcome CTA — turquoise
border: "1px solid rgba(20,169,162,0.2)",
color: "rgba(20,169,162,0.8)",

// ALL form submits — maroonLight
border: "1px solid rgba(138,58,77,0.3)",
color: "rgba(138,58,77,0.9)",

// Hover — ALL buttons
borderColor: "rgba(200,80,130,0.4)",
boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 25px rgba(200,80,130,0.18)",
```
Nav buttons (Back/Next) in BottomFormNav stay small — do NOT make them glass pills.

### 06. TRANSITIONS — Turquoise → Pink Click
```jsx
clickBorder: "rgba(200,80,130,0.45)",
clickGlow: "0 0 30px rgba(200,80,130,0.25)",
innerGlow: "inset 0 0 20px rgba(200,80,130,0.08)",
duration: "0.3s ease",
```
Replace any old values: 0.25 → 0.45, `0 0 20px` → `0 0 30px`. Applied to ALL interactive glass elements.

### 07. NAVIGATION — BottomFormNav
- `position: fixed` bottom of every form
- Layout: `← Back` | 🐢 Services | `Next →`
- Turtle navigates to **ServiceGrid** ("What can we help you create?") — **NOT** Welcome
- Click triggers turquoise→pink transition
- Must be present on every form. If missing, add it.

### 08. FORM INPUTS
```jsx
background: "rgba(255,255,255,0.03)",
border: "1px solid rgba(255,255,255,0.08)",
borderRadius: 10,
padding: "12px 14px",
fontSize: 14,
color: "rgba(255,255,255,0.92)",
placeholderColor: "rgba(255,255,255,0.25)",
focusBorder: "rgba(20,169,162,0.4)",
caretColor: turquoise,
fontFamily: "var(--font-primary)",
```

### 09. PROGRESS BAR
- Track: 3px height, rgba(255,255,255,0.06), borderRadius 2px
- Fill: gradient from accent color, borderRadius 2px
- Label (uppercase, 11px, textDim) + percentage above track

### 10. SECTION CARDS — Completion States
- Active: turquoise border (0.3), turquoise bg (0.04), pulsing dot
- Done: pink border (0.4), pink bg (0.06), checkmark ✓ on #1a1a2e

### 11. SPACING
```jsx
cardPadding: "22px 18px",
formPadding: "40px 24px",
sectionGap: 18,
cardBorderRadius: 16,
buttonBorderRadius: 28,
inputBorderRadius: 10,
maxWidth: 480 (forms), 720 (Visual Design),
```

### 12. BACKGROUND — PortalBackground
- Every screen renders `<PortalBackground />` → `className="concept-e-bg"`
- Full CSS lives in index.html (compass rose, medicine wheel rings, SVG, Night/Day modes)
- Forms must NOT create their own backgrounds, orbs, or gradient overlays
- Container: `position: relative; overflow: hidden;`
- Content: `position: relative; zIndex: 1;`

### 13. STEP COUNTER
- Format: `01 / 09`
- 11px, rgba(255,255,255,0.2), letterSpacing 0.2em

### 14. IMPORTS — Form Checklist
Every form imports what it uses from:
```jsx
import { NHBP, FC } from "../../theme";
import PortalBackground from "../shared/PortalBackground";
import FormGlassCard from "../shared/FormGlassCard";
import FormInput from "../shared/FormInput";
import { FormDeptSelect } from "../shared/FormSelect";
import FormBadge from "../shared/FormBadge";
import { BottomFormNav } from "../shared/BottomNav";
import SubmitOverlay from "../shared/SubmitOverlay";
import RestorePrompt from "../shared/RestorePrompt";
import { useAutoSave } from "../../utils/autoSave";
import { validateEmail } from "../../utils/validation";
```
Remove unused imports. Add missing ones. VisualDesignForm.jsx is the gold standard reference.

---

## THEME.JSX UPDATES

Add this new export to theme.jsx:
```jsx
export const BUTTONS = {
  glassPill: {
    padding: "20px 60px",
    borderRadius: 28,
    backdropFilter: "blur(20px) saturate(1.4) brightness(1.1)",
    WebkitBackdropFilter: "blur(20px) saturate(1.4) brightness(1.1)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.06em",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
    cursor: "pointer",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  welcomeColor: {
    border: "1px solid rgba(20,169,162,0.2)",
    color: "rgba(20,169,162,0.8)",
  },
  submitColor: {
    border: "1px solid rgba(138,58,77,0.3)",
    color: "rgba(138,58,77,0.9)",
  },
  hoverEffect: {
    borderColor: "rgba(200,80,130,0.4)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 25px rgba(200,80,130,0.18)",
  },
};
```

Update existing exports:
```jsx
FONTS.primary: "'Josefin Sans', sans-serif"
TRANSITIONS.clickBorder: "rgba(200,80,130,0.45)"
TRANSITIONS.clickGlow: "0 0 30px rgba(200,80,130,0.25)"
// ADD:
TRANSITIONS.innerGlow: "inset 0 0 20px rgba(200,80,130,0.08)"
```

---

## INDEX.HTML UPDATES

- Font link: `Josefin+Sans:wght@100;200;300;400;500;600;700` (replace Raleway)
- CSS variable: `--font-primary: 'Josefin Sans', ...`
- `.click-transition:active` → use new 0.45/0 0 30px values
- `.glass-interactive:active` → use new values

---

## EXECUTION ORDER

### Phase 1 — Foundation
1. `index.html`
2. `src/theme.jsx`
```bash
git add -A && git commit -m "DS-v3 Phase 1: Foundation — Josefin Sans, BUTTONS export, transitions"
git push origin design-system-v3
```

### Phase 2 — Shared Components
3. `src/components/shared/PortalBackground.jsx` (verify)
4. `src/components/shared/BottomNav.jsx`
5. `src/components/shared/FormGlassCard.jsx`
6. `src/components/shared/FormInput.jsx`
7. `src/components/shared/FormSelect.jsx`
8. `src/components/shared/FormBadge.jsx`
9. `src/components/shared/GlassCard.jsx`
10. `src/components/shared/SubmitOverlay.jsx`
11. `src/components/shared/RestorePrompt.jsx`
12. `src/components/shared/ErrorBoundary.jsx`
```bash
git add -A && git commit -m "DS-v3 Phase 2: Shared components — full spec enforcement"
git push origin design-system-v3
```

### Phase 3 — Pages
13. `src/components/welcome/WelcomePage.jsx`
14. `src/components/services/ServiceGrid.jsx`
15. `src/components/AdminThemeToggle.jsx`
```bash
git add -A && git commit -m "DS-v3 Phase 3: Pages — full spec enforcement"
git push origin design-system-v3
```

### Phase 4 — All Forms
16. `src/components/forms/VisualDesignForm.jsx` (gold standard)
17. `src/components/forms/TurtlePressForm.jsx`
18. `src/components/forms/StationeryKitForm.jsx`
19. `src/components/forms/GeneralRequestForm.jsx`
20. `src/components/forms/InstantAlertForm.jsx`
21. `src/components/forms/StudioHubForm.jsx`

For EVERY form:
- Check every style property against spec sections 01-14
- Font → Josefin Sans
- Colors → NHBP/FC tokens, no hardcoded hex
- Glass cards → correct recipe
- Submit button → glass pill + submitColor
- Transitions → new brightened values
- PortalBackground → present
- BottomFormNav → present, turtle→ServiceGrid
- Inputs → correct styling
- Spacing → correct values
- Imports → correct and complete
- DO NOT touch form logic, steps, state, handlers — backend is being wired

```bash
git add -A && git commit -m "DS-v3 Phase 4: All forms — full spec enforcement"
git push origin design-system-v3
```

### Phase 5 — Supporting
22. `src/App.jsx`
23. `src/main.jsx`
24. `src/constants/services.jsx`
25. `src/constants/formOptions.jsx`
26. `src/constants/departments.jsx`
27. `src/constants/priorities.jsx`
28. `src/constants/locations.jsx`
29. `src/constants/stationery.jsx`
30. `src/utils/autoSave.jsx`
31. `src/utils/validation.jsx`
```bash
git add -A && git commit -m "DS-v3 Phase 5: Supporting files — cleanup"
git push origin design-system-v3
```

### Phase 6 — Full Audit
```bash
# Must return ZERO:
grep -rn "Raleway" src/ index.html
grep -rn "Playfair" src/ index.html
grep -rn "DM Sans" src/ index.html
grep -rn "rgba(200,80,130,0.25)" src/ index.html
grep -rn "0 0 20px rgba(200,80,130" src/ index.html

# Must return results:
grep -rn "Josefin" index.html src/theme.jsx

# Check for hardcoded colors that should be tokens:
grep -rn "#14A9A2" src/
grep -rn "#8a1518" src/
grep -rn "#5F0C0E" src/
grep -rn "#BA0C2F" src/
```
Fix anything dirty. Re-run until clean.
```bash
git add -A && git commit -m "DS-v3 Phase 6: Audit clean — zero violations"
git push origin design-system-v3
```

---

## RULES — NON-NEGOTIABLE

1. One file at a time. Read it fully. Fix it. Re-read to verify. Move on.
2. Do NOT refactor, restructure, rename, move, split, or merge files.
3. Do NOT touch form logic — steps, validation, state, submit handlers stay exactly as they are. The backend is coming.
4. Do NOT create new files unless absolutely necessary.
5. Do NOT remove functional code. Styles and imports only.
6. Josefin Sans only. No other fonts. Ever.
7. No hardcoded hex colors. Use NHBP and FC tokens.
8. Every screen uses PortalBackground. Every form uses BottomFormNav.
9. Turtle → ServiceGrid, not Welcome.
10. No tepees. Use longhouses.
11. Commit and push after every phase.
12. Take your time. Get it right.
