/* =========================================================
   MADMEG — home page interactions
   Classic script (no modules). Every block runs inside safe(),
   so one failing piece never breaks the rest of the page.
   ========================================================= */
(() => {
  const safe = (fn, name) => { try { fn(); } catch (err) { console.warn("[madmeg] " + name + " failed:", err); } };

  const projects = window.PROJECTS || [];
  // ?shot=<section-id> → static capture mode (no animations), used for design reviews
  const shot = new URLSearchParams(location.search).get("shot");
  if (shot) document.documentElement.classList.add("static");

  /* A reload always starts at the hero: no restored scroll, no jump to #work / #about.
     (Links like "All cards" are normal navigations, so they still land on their section.) */
  safe(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    if (shot || !nav || nav.type !== "reload") return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    const top = () => window.scrollTo({ top: 0, behavior: "instant" });
    top();
    addEventListener("load", () => {
      top();
      // keep the browser's normal memory for back / forward navigation
      setTimeout(() => { if ("scrollRestoration" in history) history.scrollRestoration = "auto"; }, 0);
    }, { once: true });
  }, "reload-top");
  // NOTE: Windows often reports prefers-reduced-motion by default, so it does NOT
  // switch off the deal / flip / collage. Only infinite loops are paused (in CSS).
  const isTouch = matchMedia("(hover: none)").matches;
  const mobileMQ = matchMedia("(max-width: 760px)");
  /* Reveal an element when the visitor actually gets there: its top passes `line`
     (fraction of the screen height, 0.7 = 70%). Checked on scroll, rAF-throttled, so an
     element carried past the screen by a fast scroll is still revealed (an observer alone
     can miss it and leave it hidden forever). */
  const revealOnView = (els, onReveal, { line = 0.7 } = {}) => {
    let pending = [].concat(els);
    let queued = false;
    const sweep = () => {
      queued = false;
      // at the very bottom of the page nothing can scroll any higher: show whatever is on screen
      const atEnd = scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
      const y = atEnd ? innerHeight : innerHeight * line;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < y) { onReveal(el); return false; }
        return true;
      });
      if (!pending.length) { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); }
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(sweep); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("load", onScroll);
    sweep();
  };

  const stage = document.getElementById("deckStage");
  const deck = document.getElementById("work");
  const intro = document.getElementById("intro");
  const introSticky = intro.querySelector(".intro-sticky");
  /* Intro scene timeline, in screens of scroll (desktop):
     0.08 → 0.32  the cover darkens          (--dark 0 → 1)
     0.18 → 1.18  the cards are dealt         (commit at 60% = 0.78)
     0.78 → 1.60  pause with the cards resting, then the about */
  const DARK_FROM = 0.08, DARK_TO = 0.32, DEAL_FROM = 0.18, DEAL_LEN = 1.0;
  const introScrolled = () => {
    const navTop = parseFloat(getComputedStyle(introSticky).top) || 0;
    return Math.max(0, navTop - intro.getBoundingClientRect().top);
  };
  let cards = [];

  /* ---------- 1. Build the cards ---------- */
  safe(() => {
    if (stage.children.length > 0) return; // idempotent
    const toRoman = (n) => ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || n;
    document.getElementById("deckCount").textContent = `${toRoman(projects.length)} cards`;

    // Card back — identical for every card, designed by Maria (assets/card-back.webp)
    const backHTML = `
      <div class="card-face card-back">
        <img src="assets/card-back.webp" alt="" decoding="async" />
      </div>`;

    const coverHTML = (p) =>
      p.cover
        ? `<img src="${p.cover}" alt="" loading="lazy" decoding="async" />`
        : `<svg class="ph-star"><use href="#star8"/></svg><span class="ph-label">cover soon</span>`;

    stage.innerHTML = projects
      .map(
        (p) => `
        <a class="card" href="project.html?p=${p.slug}" aria-label="${p.title} — ${p.tags.join(", ")}">
          <div class="card-inner">
            ${backHTML}
            <div class="card-face card-front">
              <div class="num">${p.num}</div>
              <div class="card-cover" style="--p0:${p.palette[0]};--p1:${p.palette[1]}">${coverHTML(p)}</div>
              <div class="card-meta">
                <h3 class="card-title">${p.title}</h3>
                <div class="card-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
                <div class="card-open">Click to open →</div>
              </div>
            </div>
          </div>
        </a>`
      )
      .join("");
    cards = [...stage.querySelectorAll(".card")];
  }, "cards");

  /* ---------- 2. Deal the cards on scroll (desktop) ---------- */
  safe(() => {
    // each card flies in from its own direction (degrees: 0 = right, 90 = down)
    const fromAngles = [205, 115, 290, 65, 245, 335, 20, 160, 300];
    let layout = [];

    function computeLayout() {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const n = cards.length;
      const cw = Math.max(130, Math.min(250, W * 0.15, (H * 0.7) / 1.72));
      const spacing = n > 1 ? Math.min(cw * 1.12, (W - cw - 80) / (n - 1)) : 0;
      const far = Math.max(W, H) * 0.95;
      layout = cards.map((card, i) => {
        card.style.setProperty("--cw", cw + "px");
        const c = i - (n - 1) / 2;
        const x = c * spacing;
        const y = c * c * (cw * 0.04) - cw * 0.05;
        const r = c * 3.6;
        const a = (fromAngles[i % fromAngles.length] * Math.PI) / 180;
        return { x, y, r, sx: x + Math.cos(a) * far, sy: y + Math.sin(a) * far, sr: r + (i % 2 ? 1 : -1) * (35 + i * 6) };
      });
    }

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function dealProgress(s) {
      return clamp((s - DEAL_FROM * innerHeight) / (DEAL_LEN * innerHeight));
    }
    let lastDark = -1;
    function updateDark(s) {
      const dark = shot ? 1 : clamp((s - DARK_FROM * innerHeight) / ((DARK_TO - DARK_FROM) * innerHeight));
      if (Math.abs(dark - lastDark) < 0.001) return;
      lastDark = dark;
      introSticky.style.setProperty("--dark", dark.toFixed(3));
      introSticky.classList.toggle("is-dark", dark >= 0.999);
    }

    // Cards follow the scroll while they fly in. Once the visitor is past COMMIT,
    // the cards still in the air finish on their own (CSS transition) and stay put,
    // so no card is ever left half-way. Scrolling back above RELEASE re-opens the scrub.
    const COMMIT = 0.6;
    const RELEASE = 0.3;
    let committed = false;
    let settleTimer;
    const settle = () => {
      deck.classList.add("is-settling");
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => deck.classList.remove("is-settling"), 800);
    };

    let ticking = false;
    let restingApplied = false; // cards already written at their final spot
    let deckNear = true;        // the deck is on (or close to) the screen
    new IntersectionObserver((e) => { deckNear = e[0].isIntersecting; if (deckNear) requestDeal(); },
      { rootMargin: "50% 0px 50% 0px" }).observe(intro);
    function renderDeal(force = false) {
      ticking = false;
      if (mobileMQ.matches || (!deckNear && !force)) return;
      const s = introScrolled();
      updateDark(s);
      const p = shot ? 1 : dealProgress(s);
      if (!committed && p >= COMMIT) { committed = true; settle(); }
      else if (committed && p < RELEASE) { committed = false; restingApplied = false; settle(); }
      if (committed && restingApplied && !force) return; // nothing moves: skip the DOM writes
      restingApplied = committed;
      const n = cards.length;
      const stagger = n > 1 ? 0.42 / (n - 1) : 0;
      cards.forEach((card, i) => {
        const L = layout[i];
        const t = committed ? 1 : easeOut(clamp((p - i * stagger) / 0.55));
        card.style.transform = `translate(${L.sx + (L.x - L.sx) * t}px, ${L.sy + (L.y - L.sy) * t}px) rotate(${L.sr + (L.r - L.sr) * t}deg)`;
      });
      deck.classList.toggle("is-dealt", committed);
    }
    function requestDeal() { if (!ticking) { ticking = true; requestAnimationFrame(() => renderDeal()); } }

    /* mobile: grid + fly-in on view */
    function setupMode() {
      if (mobileMQ.matches) {
        cards.forEach((card, i) => {
          card.style.removeProperty("--cw");
          card.style.transform = `translate(${i % 2 ? 70 : -70}px, 60px) rotate(${i % 2 ? 10 : -10}deg)`;
        });
        revealOnView(cards, (c) => c.classList.add("in"), { line: 0.88 });
      } else {
        cards.forEach((c) => c.classList.remove("in"));
        computeLayout();
        renderDeal(true);
      }
    }
    mobileMQ.addEventListener("change", setupMode);
    let resizeQueued = false;
    addEventListener("resize", () => {
      if (resizeQueued || mobileMQ.matches) return;
      resizeQueued = true;
      requestAnimationFrame(() => { resizeQueued = false; computeLayout(); renderDeal(true); });
    });
    addEventListener("scroll", requestDeal, { passive: true });
    setupMode();

    /* "Work" / "All cards" should land on the dealt fan, not on cards mid-flight */
    const dealtY = () =>
      mobileMQ.matches
        ? deck.getBoundingClientRect().top + scrollY - 56
        : intro.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(introSticky).top) || 0)
          + innerHeight * (DEAL_FROM + DEAL_LEN * 0.6 + 0.1); // just past the point where the deal commits
    const goToDealt = (behavior) => window.scrollTo({ top: dealtY(), behavior });
    document.querySelectorAll('a[href="#work"]').forEach((a) =>
      a.addEventListener("click", (e) => { e.preventDefault(); goToDealt("smooth"); history.replaceState(null, "", "#work"); })
    );
    if (location.hash === "#work" && !shot) {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      requestAnimationFrame(() => { goToDealt("instant"); renderDeal(true); });
      addEventListener("load", () => { goToDealt("instant"); renderDeal(true); }, { once: true });
    }
  }, "deal");

  /* ---------- 2c. Touch screens: no hover, so cards flip when centered ---------- */
  safe(() => {
    if (!isTouch) return;
    const flipIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-flipped", e.isIntersecting)),
      { rootMargin: "-30% 0px -30% 0px" }
    );
    cards.forEach((c) => flipIO.observe(c));
    document.getElementById("deckHint").textContent = "Scroll to reveal · Tap a card to open";
  }, "touch-flip");

  /* ---------- 3. Tools marquee ---------- */
  safe(() => {
    const track = document.getElementById("marquee");
    if (track.children.length > 0) return;
    const tools = [
      ["photoshop", "Photoshop"], ["illustrator", "Illustrator"], ["figma", "Figma"], ["blender", "Blender"],
      ["zbrush", "ZBrush"], ["procreate", "Procreate"], [null, "Canva", "Ca"], [null, "CapCut", "Cc"], [null, "Unity", "Un"]
    ];
    const item = ([icon, name, abbr]) =>
      `<div class="tool">${icon ? `<img src="assets/icons/${icon}.webp" alt="" width="34" height="34" />` : `<b>${abbr}</b>`}${name}</div>`;
    const html = tools.map(item).join("");
    track.innerHTML = html + html;
  }, "marquee");

  /* ---------- 4. "projects" note in the about collage ---------- */
  safe(() => {
    const list = document.getElementById("noteList");
    if (list.children.length > 0) return;
    list.innerHTML = (window.NOTE_PROJECTS || [])
      .map(([title, line, slug]) =>
        slug
          ? `<li><a href="project.html?p=${slug}"><b>${title}</b>${line}</a></li>`
          : `<li><span class="note-item"><b>${title}</b>${line}</span></li>`)
      .join("");
  }, "note");

  /* ---------- 5. Collage pieces fly in from outside ---------- */
  safe(() => {
    const collage = document.getElementById("collage");
    const pieces = [...collage.querySelectorAll(".piece")];
    const from = { left: ["-70vw", "0px"], right: ["70vw", "0px"], top: ["0px", "-60vh"], bottom: ["0px", "60vh"] };
    pieces.forEach((el, i) => {
      const [fx, fy] = from[el.dataset.from] || from.bottom;
      el.style.setProperty("--fx", fx);
      el.style.setProperty("--fy", fy);
      el.style.setProperty("--fr", (i % 2 ? 1 : -1) * (12 + ((i * 7) % 18)) + "deg");
      el.style.setProperty("--r", (el.dataset.rot || 0) + "deg");
      el.style.setProperty("--d", i * 90 + "ms");
    });
    if (shot) { collage.classList.add("in"); return; }
    // starts once the about's top reaches ~60% of the screen
    revealOnView(collage, () => collage.classList.add("in"), { line: 0.6 });
  }, "collage");

  /* ---------- 6. Hero: each letter of the logo moves on its own ---------- */
  safe(() => {
    if (shot) return;
    const letters = [...document.querySelectorAll(".ltr")];
    const depths = letters.map((l) => parseFloat(l.dataset.depth) || 1);
    const star = document.querySelector(".logo-star");

    // hover / tap: the letter does a little hop (CSS animation on `translate`/`rotate`)
    letters.forEach((l) => {
      const hop = () => { l.classList.remove("hop"); void l.offsetWidth; l.classList.add("hop"); };
      l.addEventListener("pointerenter", hop);
      l.addEventListener("animationend", (e) => { if (e.animationName === "ltrHop") l.classList.remove("hop"); });
    });

    if (isTouch) return;
    // mouse: every letter follows the cursor with its own depth, like layers.
    // Tracked on the whole window (not only the hero) so moving onto the nav bar
    // doesn't snap anything back; work is skipped while the hero is off screen.
    const hero = document.querySelector(".hero");
    let raf = 0, mx = 0, my = 0, heroVisible = true;
    new IntersectionObserver((entries) => { heroVisible = entries[0].isIntersecting; }).observe(hero);
    const apply = () => {
      raf = 0;
      letters.forEach((l, i) => {
        const d = depths[i];
        l.style.transform = `translate(${mx * 16 * d}px, ${my * 12 * d}px) rotate(${mx * 2.2 * d}deg)`;
      });
      if (star) star.style.translate = `${mx * -22}px ${my * -16}px`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    addEventListener("mousemove", (e) => {
      if (!heroVisible || introSticky.classList.contains("is-dark")) return;
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
      queue();
    }, { passive: true });
    // only when the pointer leaves the browser window do the letters glide back to rest
    document.documentElement.addEventListener("mouseleave", () => { mx = 0; my = 0; queue(); });
  }, "hero-letters");

  /* ---------- 7. Active nav link ---------- */
  safe(() => {
    const links = [...document.querySelectorAll(".nav-link")];
    const about = document.getElementById("about");
    let current = null, queued = false;
    const update = () => {
      queued = false;
      const mid = innerHeight * 0.5;
      const inWork = mobileMQ.matches
        ? deck.getBoundingClientRect().top < mid
        : parseFloat(introSticky.style.getPropertyValue("--dark") || 0) > 0.5;
      const hash = about.getBoundingClientRect().top < mid ? "#about" : inWork ? "#work" : "";
      if (hash === current) return;
      current = hash;
      links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === hash));
    };
    addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }, "nav");

  /* ---------- static capture mode: show only the requested section ---------- */
  safe(() => {
    if (!shot) return;
    if (new URLSearchParams(location.search).has("flip")) cards.forEach((c) => c.classList.add("is-flipped"));
    document.querySelectorAll("main > section").forEach((s) => {
      if (s.id !== shot && !s.querySelector("#" + shot)) s.style.display = "none";
    });
  }, "shot");
})();
