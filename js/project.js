/* =========================================================
   MADMEG — project page (project.html?p=<slug>)
   Top: banner, then the info in outlined boxes.
   Below: the case study — composed from blocks (js/project-blocks.js)
   when available, otherwise Maria's full-section images.
   ========================================================= */
(() => {
  const safe = (fn, name) => { try { fn(); } catch (err) { console.warn("[madmeg] " + name + " failed:", err); } };

  const projects = window.PROJECTS || [];
  if (!projects.length) return; // nothing to render: the static <h1> stays
  const slug = new URLSearchParams(location.search).get("p");
  const idx = Math.max(0, projects.findIndex((p) => p.slug === slug));
  const p = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const pal = `--p0:${p.palette[0]};--p1:${p.palette[1]}`;
  const root = document.getElementById("project");

  /* ---------- composed sections (js/project-blocks.js) ---------- */
  function renderBlocks({ theme, blocks }) {
    const pic = (im, cls = "", lazy = true) =>
      `<img class="${cls}" src="${im.src}" alt="${im.alt || ""}" width="${im.w}" height="${im.h}" ${lazy ? 'loading="lazy"' : ""} decoding="async" />`;
    const para = (t) => (t ? `<p class="cb-text">${t}</p>` : "");
    const head = (t, n) => (t ? `<div class="cb-kicker">${String(n).padStart(2, "0")}</div><h2 class="cb-title">${t}</h2>` : "");
    const fonts = (b) => b.fonts.map((f) => `<div class="cb-font"><span class="cb-font-name">${f.name}</span><span class="cb-font-role">${f.role}</span></div>`).join("");
    let n = 0;
    const html = {
      trio: (b) => `
        <div class="cb-trio">
          <div class="cb-col rv">${head(b.left.title, ++n)}${para(b.left.text)}</div>
          <figure class="cb-fig rv">${pic(b.image, "cb-cut")}</figure>
          <div class="cb-col rv">${head(b.right.title, ++n)}${para(b.right.text)}</div>
        </div>`,
      split: (b) => `
        <div class="cb-split ${b.side === "left" ? "is-left" : ""} ${b.wide ? "is-wide" : ""}">
          <div class="cb-col rv">${head(b.title, ++n)}${para(b.text)}
            ${b.steps ? `<ol class="cb-steps">${b.steps.map((s) => `<li>${s}</li>`).join("")}</ol>` : ""}
            ${b.sketch ? `<figure class="cb-sketch">${pic(b.sketch)}</figure>` : ""}
          </div>
          <figure class="cb-fig rv">${pic(b.image, b.image.alpha === false ? "" : "cb-cut")}</figure>
        </div>`,
      feature: (b) => `
        <div class="cb-feature">
          <div class="cb-center rv">${head(b.title, b.title ? ++n : "")}${para(b.text)}</div>
          <figure class="cb-fig rv">${pic(b.image, b.image.alpha === false ? "" : "cb-cut")}
            ${b.note ? `<figcaption class="cb-note">${b.note}</figcaption>` : ""}</figure>
        </div>`,
      phones: (b) => `
        <div class="cb-phones-wrap">
          <div class="cb-center rv">${head(b.title, ++n)}${para(b.text)}</div>
          <div class="cb-phones" style="--count:${b.images.length}">
            ${b.images.map((im, i) => `<figure class="cb-phone rv" style="--i:${i}">${pic(im)}</figure>`).join("")}
          </div>
        </div>`,
      palette: (b) => `
        <div class="cb-palette">
          <div class="cb-col rv">${head(b.title, ++n)}
            <div class="cb-fonts">${fonts(b)}</div>
            ${para(b.text)}
          </div>
          <div class="cb-swatches rv" style="--cols:${b.cols || 3}">${b.colors.map((c) => `<div class="cb-swatch" style="--c:${c.hex}"><span>${c.name ? `<b>${c.name}</b>` : ""}${c.hex}</span></div>`).join("")}</div>
        </div>`,
      gallery: (b) => `
        <div class="cb-gallery-wrap">
          ${b.title || b.text ? `<div class="cb-center rv">${head(b.title, b.title ? ++n : "")}${para(b.text)}</div>` : ""}
          <div class="cb-gallery ${b.contain ? "is-contain" : ""} ${b.square ? "is-square" : ""}" style="--cols:${b.cols || 3};${b.ratio ? `grid-template-columns:${b.ratio.map((r) => `minmax(0,${r}fr)`).join(" ")}` : ""}">
            ${b.images.map((im, i) => `<figure class="cb-gal rv" style="--i:${i}">${pic(im, b.contain && im.alpha !== false ? "cb-cut" : "")}${b.captions ? `<figcaption>${b.captions[i]}</figcaption>` : ""}</figure>`).join("")}
          </div>
        </div>`,
      full: (b) => `<figure class="cb-full rv">${pic(b.image)}</figure>`,
    };
    return blocks
      .map((b) => {
        const t = theme[b.tone] || Object.values(theme)[0];
        return `<section class="cb-block cb-${b.type}-block" style="--bg:${t.bg};--fg:${t.fg};--accent:${t.accent}">${html[b.type](b)}</section>`;
      })
      .join("");
  }

  safe(() => {
    if (root.querySelector(".p-top")) return; // idempotent (the static <h1> fallback gets replaced)
    document.title = `${p.title} — Madmeg`;

    const chips = (list) => list.map((t) => `<span class="chip">${t}</span>`).join("");
    const team = p.team.map(([n, r]) => `<div class="team-row"><b>${n}</b><span>${r}</span></div>`).join("");
    const link = p.link ? `<a class="info-link" href="${p.link[1]}" target="_blank" rel="noopener">${p.link[0]} ↗</a>` : "";

    const composed = (window.PROJECT_BLOCKS || {})[p.slug];
    const sections = composed
      ? renderBlocks(composed)
      : p.sections
          .map(
            (s, i) => `
        <figure class="cs-section" style="${pal}">
          <img src="${s.src}" alt="${s.alt}" width="${s.w}" height="${s.h}" ${i > 0 ? 'loading="lazy"' : ""} decoding="async" />
        </figure>`
          )
          .join("");

    root.innerHTML = `
      <div class="p-head">
        <a href="index.html#work">← All cards</a>
        <div class="grow"></div>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>

      <section class="p-banner" style="${pal}">
        <img src="${p.hero}" alt="${p.title} cover" width="1440" height="497" fetchpriority="high" />
      </section>

      <section class="p-top">
        <div class="p-desc">
          <div class="info-box title-box">
            <div class="n">${p.num}</div>
            <h1>${p.title}</h1>
          </div>
          <div class="desc-row">
            <div class="info-box"><div class="k">The project</div><p class="v">${p.summary}</p></div>
            <div class="info-box"><div class="k">My part</div><p class="v">${p.detail} ${link}</p></div>
          </div>
        </div>

        <div class="p-info">
          <div class="info-box"><div class="k">Role</div><div class="v small">${p.role}</div></div>
          <div class="info-row">
            <div class="info-box"><div class="k">Category</div><div class="chips">${chips(p.tags)}</div></div>
            <div class="info-box"><div class="k">Tools</div><div class="chips">${chips(p.tools)}</div></div>
          </div>
          ${p.year ? `<div class="info-box"><div class="k">Year</div><div class="v small">${p.year}</div></div>` : ""}
          <div class="info-box"><div class="k">Team</div>${team}</div>
        </div>
      </section>

      <section class="${composed ? "cb" : "cs"}">${sections}</section>

      <nav class="p-nav">
        <a class="prev" href="project.html?p=${prev.slug}">
          <span class="k">← Previous card · ${prev.num}</span><span class="t">${prev.title}</span>
        </a>
        <a class="next" href="project.html?p=${next.slug}">
          <span class="k">Next card · ${next.num} →</span><span class="t">${next.title}</span>
        </a>
      </nav>`;
  }, "render");

  // sections rise in as they enter (with a safety net so nothing stays hidden)
  safe(() => {
    const els = [...document.querySelectorAll(".cs-section, .cb .rv")];
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    // rise in when the section's top passes ~85% of the screen; once a section is on
    // screen at all, it is shown after 1.5s even if that observer never fires
    const show = (el) => el.classList.add("in");
    const main = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); main.unobserve(e.target); } }),
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );
    const near = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setTimeout(() => show(e.target), 1500); near.unobserve(e.target); } }),
      { threshold: 0 }
    );
    els.forEach((el) => { main.observe(el); near.observe(el); });
  }, "reveal");
})();
