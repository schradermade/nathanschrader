# NathanSchrader.com

Personal portfolio and dossier site for Nathan Schrader. Built as a single-page, content‑rich experience that blends an About section, project showcases, and an architecture‑focused HVACOps.ai dossier.

## High‑Level Architecture

- **Framework:** Next.js App Router (React 18) with MDX support.
- **Content Model:** Sections are defined in structured arrays and rendered as discrete “views” inside the main content panel.
- **Layout System:** A two‑column desktop layout (nav + content) and a mobile‑first bottom navigation that opens a sheet for deeper navigation.
- **Interactive Media:** All diagrams and images open into a lightbox for focused viewing; Mermaid diagrams render client‑side.
- **Theming:** Global CSS tokens for typography, spacing, and surfaces to maintain a consistent editorial look.

## What We Implemented / Refined

- **Navigation & Layout**
  - Desktop: aligned nav/content gutters with a grid‑based layout for consistent spacing.
  - Mobile: replaced the full sidebar with a bottom tab bar and sheet‑based navigation for iPhone usability.
  - Added a dedicated Dossier outline in the mobile sheet to surface the full HVACOps.ai structure.

- **Content Presentation**
  - Reworked the About header so the headshot anchors top‑right while titles and roles flow cleanly.
  - Introduced responsive typography for the name/title and controlled word‑wrapping to prevent awkward breaks.
  - Added safe wrapping for long preformatted blocks (e.g., appendix schema) to prevent overflow.

- **Media & Lightbox**
  - Made all images and Mermaid diagrams clickable and viewable in a lightbox.
  - Added a dedicated lightbox background for diagrams.
  - Moved the lightbox to a portal to isolate it from layout flow.
  - Enabled iOS pinch‑zoom via explicit viewport settings.

- **Mobile UX Improvements**
  - Tightened padding and spacing for small screens.
  - Added a warm, theme‑aligned bottom bar color.
  - Improved overflow handling to prevent content escaping the viewport on iPhone.

## Key Files

- `src/app/page.tsx` — Main view composition, navigation logic, lightbox behavior.
- `src/app/globals.css` — Global design system, layout, and responsive rules.
- `src/components/Mermaid.tsx` — Client‑side Mermaid rendering.
- `src/app/layout.tsx` — Root layout and viewport settings.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
