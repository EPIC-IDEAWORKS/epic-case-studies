# EPIC Case Studies

Public technical reference hub for Mohawk College's [Energy & Power Innovation Centre (EPIC)]

Hosted at: **https://EPIC-IDEAWORKS.github.io/epic-case-studies/**

---

## What This Is

EPIC's technical reference layer: structured, indexable HTML that is easy to discover, cite, and extract from. Individual components can be embedded into external tools via iframe.

The site serves as EPIC's central hub for:
- **Program areas** — what EPIC offers across its three programs
- **Technical case studies** — detailed, structured project documentation
- **Interactive tools** — calculators, dashboards, and other utilities
- **Embeddable cards** — reusable components that external platforms can embed directly

---

## Site Map

```
epic-case-studies/
├── index.html                          ← main landing page
│   ├── About EPIC + program area blurbs (DSI, Power Systems, LCRP)
│   ├── Project index (filterable by program area)
│   │   Each project links to:
│   │     → Technical case study (/case-studies/[slug]/)
│   │     → Full story on Mohawk College website (external)
│   │     → Interactive tool (/tools/[slug]/, if applicable)
│   └── Tools overview
│
├── case-studies/
│   └── [project-slug]/
│       └── index.html                  ← full technical case study, assembled from cards
│           ├── Link bar: [View on Mohawk College ↗] [Interactive Tool ↗]
│           └── All cards in sequence
│
├── tools/
│   ├── index.html                      ← tools table of contents
│   └── [tool-slug]/
│       └── index.html                  ← individual tool page
│
├── cards/
│   └── [project-slug]-[card-type].html ← individual embeddable components (no site chrome)
│
└── assets/
    ├── images/                         ← project photography (versioned, EPIC-controlled)
    └── epic-theme.css                  ← shared CSS tokens (accent color, fonts)
```

---

## Program Areas

The site covers projects across EPIC's three program areas. Projects are tagged by program area and filterable on the main index. A project can span multiple areas.

- **Data Systems Integration (DSI)** — IoT, cloud platforms, data pipelines, dashboards
- **Power Systems** — energy monitoring, submetering, power infrastructure
- **Low Carbon Readiness Program (LCRP)** — GHG emissions accounting, carbon reduction, sustainability

---

## Cards

Each case study is built from independently embeddable cards. Any card can be embedded into external tools via iframe.

| Card | Purpose |
|---|---|
| `header` | Title, descriptor, phase/date range, location, funding |
| `summary` | Executive summary (150–200 words) + CTA |
| `identity` | Key project details table |
| `phase-header` | Phase label + date range *(multi-phase projects only)* |
| `challenge` | Industry problem / challenges |
| `capabilities` | EPIC capabilities applied |
| `team` | Research team table |
| `partner-contribution` | Partner contributions |
| `collaboration-model` | Engagement type, funding, IP, duration, deliverables |
| `solution` | Solution and implementation narrative |
| `results` | Results and evidence table |
| `impact` | Impact for partner and EPIC |
| `sectors` | Reusability / applicable sectors |
| `tags-cta` | Metadata tags + contact/CTA |
| `chart` | Standalone data visualization *(as needed)* |

---

## Embedding

Any GitHub Pages URL from this repo — a full case study, a single card, a chart, a tool — can be embedded into external platforms via iframe.

Cards are styled for seamless embedding:
- Transparent background — the host page's color shows through
- Fluid width — no fixed pixel widths
- No site chrome — no header, nav, or footer on card templates
- Four CSS variables in `assets/epic-theme.css` control the accent color and fonts

---

## Content Policy

- **Accuracy first.** Only verified data is published. Unconfirmed fields are flagged `<!-- TODO: verify -->`, not filled in.
- **Content clearance required.** All case studies, partner data, images, and reports must be reviewed for partner confidentiality and IP before merging to `main`.
- **Single source of truth.** Content lives here once. External tools link to or embed from this repo — independent copies are not maintained elsewhere.
- **No secrets.** Never commit credentials, API keys, or private partner data.

---

## Contributing

Branch naming:
```
feature/<short-description>
fix/<short-description>
chore/<short-description>
```

Commit format: [Conventional Commits](https://www.conventionalcommits.org/) — `feat:` / `fix:` / `chore:` / `refactor:`

All contributions require a pull request review before merging to `main`. This enforces the content clearance gate.

---

## Contact

**Energy & Power Innovation Centre (EPIC)**
Mohawk College — Hamilton, Ontario, Canada
