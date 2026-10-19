# Gergő Abari – Personal Website

Personal portfolio of **Gergő Abari**, junior software developer — Java / Spring Boot backend and SAP ABAP (BSc Computer Science, University of Debrecen).

A static, dependency-free website built with plain HTML, CSS and JavaScript.

## Features

- Hungarian / English language switch (auto-detected from the browser, remembered per visitor)
- Light / dark mode (follows the system setting, can be toggled manually)
- Responsive layout with a mobile menu
- Accessible markup: semantic sections, skip link, keyboard focus styles, ARIA labels
- No build step, no frameworks: ready for GitHub Pages

## Project structure

```
.
├── index.html            # page markup (Hungarian default text)
├── assets/
│   ├── css/style.css     # styles, light & dark theme variables
│   ├── js/i18n.js        # HU / EN translations
│   ├── js/main.js        # language switch, theme toggle, mobile menu
│   ├── img/              # profile photo, favicon
│   └── cv/               # downloadable CV (PDF)
└── .nojekyll             # serve files as-is on GitHub Pages
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

Settings → Pages → *Deploy from a branch* → `main` / `(root)`.

## Editing content

All visible text lives in `assets/js/i18n.js` (one entry per language).
`index.html` contains the Hungarian text as a fallback, so update both when changing copy.

## To do

- [ ] Project screenshots
- [ ] Final URL in the Open Graph meta tags

## License

The source code is licensed under the [MIT License](LICENSE).
Personal content (text, photos, CV) © 2026 Gergő Abari — all rights reserved.
