# Madmeg — María José Madrigal

Portfolio of María José Madrigal (Madmeg), graphic designer and illustrator.

Static site: plain HTML + CSS + JavaScript, no build step.

## Structure

- `index.html` — home: typographic cover, tarot-card projects, tools bar, about collage
- `project.html?p=<slug>` — project page (content comes from `js/projects.js`)
- `css/styles.css` — all styles
- `js/main.js` — home interactions · `js/project.js` — project page · `js/projects.js` — project data
- `assets/` — images (WebP), icons, letters of the logo, fonts

## Local preview

Double-click `abrir-portafolio.bat` (Windows) or run:

```
python serve.py 5511
```

then open http://localhost:5511

## Adding or editing a project

Edit `js/projects.js`. Images go in `assets/projects/<slug>/`:
`card.webp` (tarot card cover), `hero.webp` (project banner), `01.webp`, `02.webp`… (case-study sections).

After changing CSS or JS, bump the `?v=` number in `index.html` and `project.html` so browsers load the new version.
