# EPIC Case Studies

Public technical reference hub for Mohawk College's [Energy & Power Innovation Centre (EPIC)]

Hosted at: **https://EPIC-IDEAWORKS.github.io/epic-case-studies/**

---

## What This Is

This repo is the complementary technical layer: structured, indexable HTML that LLMs can reliably extract and cite, and that other tools can embed or link to directly.


---

## Structure

```
epic-case-studies/
├── index.html                          ← landing page, index of all case studies
├── case-studies/
│   └── [project-slug]/
│       └── index.html                  ← full case study, assembled from cards
├── cards/
│   └── [project-slug]-[card-type].html ← individual embeddable components
├── assets/
│   ├── images/                         ← project photography (versioned, EPIC-controlled)
│   └── epic-theme.css                  ← shared CSS tokens (accent color, fonts)
└── README.md
```

---

## Cards

Each case study is built from independently embeddable cards. Any card can be used to embed 

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

Any GitHub Pages URL from this repo — a full case study, a single card, a chart — can be embedded 

Cards are styled for seamless embedding:
- Transparent background — the section color shows through
- Fluid width — no fixed pixel widths
- No site chrome — no header, nav, or footer on card templates
- Four CSS variables in `assets/epic-theme.css` control the accent color and fonts

---

## Content Policy

- **Accuracy first.** Only verified data is published. Unconfirmed fields are flagged `<!-- TODO: verify -->`, not filled in.
- **Content clearance required.** All case studies, partner data, images, and reports must be reviewed for partner confidentiality and IP before merging to `main`.
- **Single source of truth.** Content lives here once. Other tools can use links or embeds from this repo — it does not maintain independent copies.
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

