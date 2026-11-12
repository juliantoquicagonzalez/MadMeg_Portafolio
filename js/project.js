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
    const head = (t) => (t ? `<h2 class="cb-title">${t}</h2>` : "");
    const fonts = (b) => b.fonts.map((f) => `<div class="cb-font"><span class="cb-font-name">${f.name}</span><span class="cb-font-role">${f.role}</span></div>`).join("");
    const html = {
      trio: (b) => `
        <div class="cb-trio">
          <div class="cb-col rv">${head(b.left.title)}${para(b.left.text)}<div class="cb-sep">${head(b.right.title)}${para(b.right.text)}</div></div>
          <figure class="cb-fig rv">${pic(b.image, "cb-cut")}</figure>
        </div>`,
      split: (b) => `
        <div class="cb-split ${b.side === "left" ? "is-left" : ""} ${b.wide ? "is-wide" : ""}">
          <div class="cb-col rv">${head(b.title)}${para(b.text)}
            ${b.steps ? `<ol class="cb-steps">${b.steps.map((s) => `<li>${s}</li>`).join("")}</ol>` : ""}
            ${b.stat ? `<p class="cb-stat">${b.stat}</p>` : ""}
            ${b.note ? `<p class="cb-note is-left">${b.note}</p>` : ""}
            ${b.sketch ? `<figure class="cb-sketch">${pic(b.sketch)}</figure>` : ""}
          </div>
          ${b.phone
            ? `<figure class="cb-fig rv"><div class="cb-phone is-solo ${b.tall ? "is-tall" : ""}">${pic(b.image)}</div></figure>`
            : `<figure class="cb-fig rv">${pic(b.image, b.image.alpha === false ? "" : "cb-cut")}</figure>`}
        </div>`,
      feature: (b) => `
        <div class="cb-feature ${b.title || b.text ? "has-text" : ""}">
          ${b.title || b.text ? `<div class="cb-center rv">${head(b.title)}${para(b.text)}</div>` : ""}
          <figure class="cb-fig rv">${pic(b.image, b.image.alpha === false ? "" : "cb-cut")}
            ${b.note ? `<figcaption class="cb-note">${b.note}</figcaption>` : ""}</figure>
        </div>`,
      phones: (b) => `
        <div class="cb-phones-wrap ${b.title || b.text ? "has-text" : ""}">
          ${b.title || b.text ? `<div class="cb-center rv">${head(b.title)}${para(b.text)}</div>` : ""}
          <div class="cb-media">
            <div class="cb-phones" style="--count:${b.images.length}">
              ${b.images.map((im, i) => `<figure class="cb-phone rv" style="--i:${i}">${pic(im)}</figure>`).join("")}
            </div>
            ${b.extra ? `<figure class="cb-fig cb-extra rv">${pic(b.extra, "cb-cut")}</figure>` : ""}
          </div>
        </div>`,
      palette: (b) => `
        <div class="cb-palette">
          <div class="cb-col rv">${head(b.title)}
            <div class="cb-fonts">${fonts(b)}</div>
            ${para(b.text)}
          </div>
          <div class="cb-swatches rv" style="--cols:${b.cols || 3}">${b.colors.map((c) => `<div class="cb-swatch" style="--c:${c.hex}"><span>${c.name ? `<b>${c.name}</b>` : ""}${c.hex}</span></div>`).join("")}</div>
        </div>`,
      gallery: (b) => `
        <div class="cb-gallery-wrap ${b.title || b.text ? "has-text" : ""}">
          ${b.title || b.text ? `<div class="cb-center rv">${head(b.title)}${para(b.text)}</div>` : ""}
          <div class="cb-gallery ${b.contain ? "is-contain" : ""} ${b.square ? "is-square" : ""} ${b.icons ? "is-icons" : ""} ${b.center ? "is-center" : ""}" style="--cols:${b.cols || 3};${b.maxh ? `--maxh:${b.maxh}px;` : ""}${b.ratio ? `grid-template-columns:${b.ratio.map((r) => `minmax(0,${r}fr)`).join(" ")}` : ""}">
            ${b.images.map((im, i) => `<figure class="cb-gal rv" style="--i:${i}">${pic(im, b.contain && im.alpha !== false ? "cb-cut" : "")}${b.captions ? `<figcaption>${b.captions[i]}${b.descs ? `<span>${b.descs[i]}</span>` : ""}</figcaption>` : ""}</figure>`).join("")}
          </div>
        </div>`,
      carousel: (b) => `
        <div class="cb-carousel" style="--n:${b.images.length}">
          <div class="cb-car-stage">
            <div class="cb-col cb-car-text rv">
              ${head(b.title)}${para(b.text)}
              ${b.steps ? `<ol class="cb-steps">${b.steps.map((s) => `<li>${s}</li>`).join("")}</ol>` : ""}
              ${b.note ? `<p class="cb-note is-left">${b.note}</p>` : ""}
              <div class="cb-car-ctl">
                <button type="button" class="cb-car-btn" data-dir="-1" aria-label="Previous image">←</button>
                <span class="cb-car-count" aria-live="polite">1 / ${b.images.length}</span>
                <button type="button" class="cb-car-btn" data-dir="1" aria-label="Next image">→</button>
              </div>
            </div>
            <div class="cb-car-view" tabindex="0" role="group" aria-roledescription="carousel" aria-label="${b.title || "Gallery"}: scroll sideways">
              <div class="cb-car-track">
                ${b.images.map((im, i) => `<figure class="cb-car-item">${pic(im, b.cut && im.alpha !== false ? "cb-cut" : "", false)}${b.captions ? `<figcaption>${b.captions[i] || ""}</figcaption>` : ""}</figure>`).join("")}
              </div>
            </div>
          </div>
        </div>`,
      text: (b) => `
        <div class="cb-center rv">${head(b.title)}${para(b.text)}${b.note ? `<p class="cb-note">${b.note}</p>` : ""}</div>`,
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
        <img src="${p.hero}" alt="${p.title} cover" width="${p.heroW || 1440}" height="${p.heroH || 497}" fetchpriority="high" />
      </section>

      <section class="p-top">
        <div class="info-box title-box">
          <div class="n">${p.num}</div>
          <h1>${p.title}</h1>
        </div>
        <div class="info-box role-box"><div class="k">Role</div><div class="v small">${p.role}</div></div>
        <div class="desc-row">
          <div class="info-box"><div class="k">The project</div><p class="v">${p.summary}</p></div>
          <div class="info-box"><div class="k">My part</div><p class="v">${p.detail} ${link}</p></div>
        </div>
        <div class="p-info">
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

  // carousels: on desktop the section pins and the vertical scroll slides the images sideways
  // (the text stays still); on small screens it is a plain swipeable strip. Arrows work in both.
  safe(() => {
    const mq = matchMedia("(max-width: 1080px)");
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const navH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64;
    document.querySelectorAll(".cb-carousel").forEach((car) => {
      const view = car.querySelector(".cb-car-view"), track = car.querySelector(".cb-car-track");
      const items = [...track.children], count = car.querySelector(".cb-car-count");
      let maxShift = 0, idx = 0, queued = false;
      const carTop = () => car.getBoundingClientRect().top + scrollY;
      const range = () => car.offsetHeight - (innerHeight - navH());
      const setIdx = (i) => { if (i !== idx || !count.dataset.on) { idx = i; count.dataset.on = "1"; count.textContent = `${i + 1} / ${items.length}`; } };
      const nearest = (shift) => items.reduce((best, el, i) => (Math.abs(el.offsetLeft - shift) < Math.abs(items[best].offsetLeft - shift) ? i : best), 0);
      function measure() {
        if (mq.matches) { car.style.height = ""; track.style.transform = ""; return update(); }
        maxShift = Math.max(0, track.scrollWidth - view.clientWidth);
        car.style.height = `${innerHeight - navH() + maxShift}px`;
        update();
      }
      function update() {
        queued = false;
        if (mq.matches) return setIdx(nearest(view.scrollLeft));
        const r = range(), p = r > 0 ? clamp((scrollY + navH() - carTop()) / r, 0, 1) : 0;
        track.style.transform = `translate3d(${-p * maxShift}px,0,0)`;
        setIdx(nearest(p * maxShift));
      }
      const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
      function goTo(i) {
        i = clamp(i, 0, items.length - 1);
        if (mq.matches) return view.scrollTo({ left: items[i].offsetLeft - track.offsetLeft, behavior: "smooth" });
        const shift = Math.min(items[i].offsetLeft, maxShift), r = range();
        scrollTo({ top: carTop() - navH() + (maxShift ? (shift / maxShift) * r : 0), behavior: "smooth" });
      }
      car.querySelectorAll(".cb-car-btn").forEach((btn) => btn.addEventListener("click", () => goTo(idx + Number(btn.dataset.dir))));
      view.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(idx + 1); } else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(idx - 1); }
      });
      view.addEventListener("scroll", queue, { passive: true });
      addEventListener("scroll", queue, { passive: true });
      addEventListener("resize", measure);
      addEventListener("load", measure);
      mq.addEventListener("change", measure);
      if (window.ResizeObserver) new ResizeObserver(measure).observe(track);
      measure();
    });
  }, "carousel");

  // every image of the case study opens bigger (click / Enter), with arrows to move between them
  safe(() => {
    const imgs = () => [...document.querySelectorAll(".cb img, .cs-section img")];
    let box, cur = 0, opener = null;
    const show = (i) => {
      const list = imgs(); cur = (i + list.length) % list.length;
      const el = list[cur];
      box.querySelector("img").src = el.currentSrc || el.src;
      box.querySelector("img").alt = el.alt || "";
      box.querySelector(".lb-count").textContent = `${cur + 1} / ${list.length}`;
    };
    const close = () => {
      if (!box) return;
      box.remove(); box = null; document.body.classList.remove("lb-open");
      removeEventListener("keydown", onKey);
      if (opener && opener.focus) opener.focus({ preventScroll: true });
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(cur + 1);
      else if (e.key === "ArrowLeft") show(cur - 1);
    };
    const open = (el) => {
      opener = el;
      box = document.createElement("div");
      box.className = "lb"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Image viewer");
      box.innerHTML = `<button class="lb-btn lb-close" aria-label="Close">×</button><button class="lb-btn lb-prev" aria-label="Previous image">←</button><img alt="" /><button class="lb-btn lb-next" aria-label="Next image">→</button><div class="lb-count"></div>`;
      document.body.appendChild(box); document.body.classList.add("lb-open");
      show(imgs().indexOf(el));
      box.addEventListener("click", (e) => {
        if (e.target.closest(".lb-prev")) show(cur - 1);
        else if (e.target.closest(".lb-next")) show(cur + 1);
        else close();
      });
      addEventListener("keydown", onKey);
      box.querySelector(".lb-close").focus();
    };
    root.addEventListener("click", (e) => { const el = e.target.closest(".cb img, .cs-section img"); if (el) open(el); });
    imgs().forEach((el) => { el.tabIndex = 0; el.setAttribute("role", "button"); el.addEventListener("keydown", (e) => { if (e.key === "Enter") open(el); }); });
  }, "lightbox");

  // sections rise in as they enter (with a safety net so nothing stays hidden)
  safe(() => {
    // Rise in when the piece's top passes ~85% of the screen. Checked on scroll (rAF-throttled)
    // rather than with IntersectionObserver alone: a fast scroll can carry a piece past the
    // screen between two observer checks, and it would then stay hidden forever. Here anything
    // that is already above the trigger line is revealed, whether it was seen or skipped.
    let pending = [...document.querySelectorAll(".cs-section, .cb .rv")];
    let queued = false;
    const sweep = () => {
      queued = false;
      // at the very bottom of the page nothing can scroll any higher: show whatever is on screen
      const atEnd = scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
      const line = atEnd ? innerHeight : innerHeight * 0.85;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < line) { el.classList.add("in"); return false; }
        return true;
      });
      if (!pending.length) { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); }
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(sweep); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("load", onScroll); // lazy images change the layout once they arrive
    sweep();
  }, "reveal");
})();
