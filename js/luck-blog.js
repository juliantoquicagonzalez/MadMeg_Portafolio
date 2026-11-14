/* =========================================================
   The Luck & The Hare — behaviour of the interactive BLOG sketch
   (markup in luck-web.html, styles in css/luck-blog.css + luck-home.css).
   Categories and tags filter the entries, the search box filters as you type,
   The "Infinite scroll" switch is on by default (as in the Figma, so the page keeps its short length);
   switching it off shows a "Load more" button that adds a few more entries.
   Nothing leaves the page: it is a sketch.
   ========================================================= */
(() => {
  const root = document.getElementById("lwb");
  if (!root) return;
  const screen = root.closest(".lw-screen");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const safe = (fn, name) => { try { fn(); } catch (e) { console.warn("[luck-blog] " + name + " failed:", e); } };
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const IMG = "assets/projects/the-luck-and-the-hare/web/blog/";

  const POSTS = [
    { id: 1, title: "Collective Action: The March for Animal Rights", tags: ["Community", "Activism"],
      text: "Last month, we organized a local march to advocate for stronger animal protection laws and the promotion of a plant-based economy. This post recaps the highlights of the day and the specific legislative goals we are supporting.",
      short: "Last month, we organized a local march to advocate for stronger animal protection laws and the promotion of a plant-based economy.", alt: "Two women holding a “Vegan” sign at the march" },
    { id: 2, title: "Stop making boring salads", tags: ["Recipes", "Wellness and health"],
      text: "We’ve put together a few tricks to take your vegetables game to the next level.", alt: "A colourful salad bowl" },
    { id: 3, title: "Recap of the Spring Fair", tags: ["Community", "The hare and its friends"],
      text: "A look back at our recent picnic, where local artisans and vegan advocates came together to share resources and craft goods.", alt: "People sharing a picnic at the fair" },
    { id: 4, title: "Where do our donations go?", tags: ["The hare and its friends", "Activism"],
      text: "Meet the specific conservation projects and sanctuaries we have supported this year.", alt: "Hares in a meadow by a barn" },
  ];
  const MAX_BATCHES = 3;
  const state = { cat: null, q: "", infinite: true, batches: 1 };

  /* ---- fit the 1440px design to the window ---- */
  safe(() => {
    const fit = () => { if (root.hidden || !screen) return; root.style.zoom = String(screen.clientWidth / 1440); };
    fit();
    if (window.ResizeObserver && screen) new ResizeObserver(fit).observe(screen);
    addEventListener("resize", fit);
    root.fit = fit;
  }, "fit");

  /* ---- buttons and links react but never navigate ---- */
  safe(() => {
    root.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-noop], a[href^='#']"); if (a) e.preventDefault();
      const b = e.target.closest(".lwh-btn"); if (b) { b.classList.add("is-tap"); setTimeout(() => b.classList.remove("is-tap"), 160); }
    });
  }, "buttons");

  /* ---- entries ---- */
  const norm = (t) => t.toLowerCase();
  const matching = () => POSTS.filter((p) => {
    if (state.cat && !p.tags.some((t) => norm(t) === state.cat)) return false;
    if (state.q) { const hay = norm([p.title, p.text, ...p.tags].join(" ")); if (!state.q.split(/\s+/).every((w) => hay.includes(w))) return false; }
    return true;
  });
  const tagsHtml = (p) => `<div class="lwb-tags">${p.tags.map((t) => `<button type="button" class="lwb-tag${state.cat === norm(t) ? " is-on" : ""}" data-tag="${esc(norm(t))}">${esc(t)}</button>`).join("")}</div>`;
  const large = (p) => `<article class="lwb-card lwb-card--l" tabindex="0"><div class="pic"><img src="${IMG}large-${p.id}.webp" alt="${esc(p.alt)}" width="1186" height="796" loading="lazy" decoding="async" /></div><h2>${esc(p.title)}</h2>${tagsHtml(p)}<p>${esc(p.text)}</p></article>`;
  const small = (p) => `<article class="lwb-card lwb-card--s" tabindex="0"><div class="pic"><img src="${IMG}small-${p.id}.webp" alt="${esc(p.alt)}" width="437" height="412" loading="lazy" decoding="async" /></div><div class="tx"><h3>${esc(p.title)}</h3>${tagsHtml(p)}<p>${esc(p.short || p.text)}</p></div></article>`;
  const batchHtml = (list, k) => {
    const rot = list.map((_, i) => list[(i + k) % list.length]);           // each extra batch starts from a different entry
    const smalls = rot.slice(1, 4);
    return `<div class="lwb-batch">${large(rot[0])}${smalls.length ? `<div class="lwb-small-col">${smalls.map(small).join("")}</div>` : ""}</div>`;
  };
  const box = $("#lwb-entries"), more = $("#lwb-more");
  const render = () => {
    const list = matching();
    if (!list.length) {
      box.innerHTML = `<div class="lwb-empty">No entries found<small>Try another word or category, or clear the filter.</small></div>`;
    } else {
      box.innerHTML = Array.from({ length: state.batches }, (_, k) => batchHtml(list, k)).join("");
    }
    // the page keeps the length of the Figma frame: more entries only appear when "Infinite scroll" is off and the visitor asks for them
    more.hidden = state.infinite || !list.length || state.batches >= MAX_BATCHES;
    $$(".lwb-cat").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === state.cat)));
  };
  const grow = () => { if (state.batches < MAX_BATCHES && matching().length) { state.batches++; render(); } };

  // tags and categories filter (click again to clear)
  const setCat = (c) => { state.cat = state.cat === c ? null : c; state.batches = 1; render(); };
  root.addEventListener("click", (e) => {
    const t = e.target.closest(".lwb-tag"); if (t) { e.stopPropagation(); setCat(t.dataset.tag); return; }
    const c = e.target.closest(".lwb-cat"); if (c) setCat(c.dataset.cat);
  });

  // search as you type
  safe(() => {
    const q = $("#lwb-q");
    q.addEventListener("input", () => { state.q = norm(q.value.trim()); state.batches = 1; render(); });
    q.closest("label").addEventListener("click", () => q.focus());
  }, "search");

  // infinite scroll switch + "Load more" when it is off
  safe(() => {
    const sw = $("#lwb-toggle");
    sw.addEventListener("click", () => {
      state.infinite = !state.infinite;
      sw.classList.toggle("is-on", state.infinite); sw.setAttribute("aria-checked", String(state.infinite));
      render();
    });
    $(".lwh-btn", more).addEventListener("click", grow);
  }, "infinite");

  render();

  /* ---- newsletter ---- */
  safe(() => {
    const form = $("#lwb-form"), email = $("#lwb-email"), msg = $("#lwb-msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { msg.textContent = "Thank you! You are in the burrow now."; email.value = ""; }
      else msg.textContent = "Please type a valid email.";
    });
    email.addEventListener("input", () => { msg.textContent = ""; });
    const hare = $(".lwb-hare");
    hare.addEventListener("click", () => { hare.classList.remove("is-wiggle"); void hare.offsetWidth; hare.classList.add("is-wiggle"); });
    hare.addEventListener("animationend", () => hare.classList.remove("is-wiggle"));
  }, "newsletter");
})();
