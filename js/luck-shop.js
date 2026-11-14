/* =========================================================
   The Luck & The Hare — behaviour of the interactive SHOP sketch
   (markup in luck-web.html, styles in css/luck-shop.css + luck-home.css).
   Buttons only react (hover / pressed): nothing goes anywhere, it is a sketch.
   ========================================================= */
(() => {
  const root = document.getElementById("lws");
  if (!root) return;
  const screen = root.closest(".lw-screen");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const safe = (fn, name) => { try { fn(); } catch (e) { console.warn("[luck-shop] " + name + " failed:", e); } };
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const tpl = (sel) => document.querySelector(sel);
  let zoom = 1;

  /* ---- fit the 1440px design to the window ---- */
  safe(() => {
    const fit = () => { if (root.hidden || !screen) return; zoom = screen.clientWidth / 1440; root.style.zoom = String(zoom); };
    fit();
    if (window.ResizeObserver && screen) new ResizeObserver(fit).observe(screen);
    addEventListener("resize", fit);
    root.fit = fit;
  }, "fit");

  /* ---- buttons and links: react, never navigate ---- */
  safe(() => {
    root.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-noop], a[href^='#']");
      if (a) e.preventDefault();
      const b = e.target.closest(".lwh-btn, .lws-add");
      if (b) { b.classList.add("is-tap"); setTimeout(() => b.classList.remove("is-tap"), 160); }
    });
  }, "buttons");

  /* ---- colour strips: endless marquee (hover = faster, click = turn around) ---- */
  safe(() => {
    const unit = 401.459 + 15;
    const strips = $$(".lwh-strip").map((el) => {
      const track = $(".lwh-track", el), cols = el.dataset.cols.split(",");
      const n = 2 * Math.ceil((1440 + 2 * unit) / (2 * unit)) + 2;
      track.innerHTML = Array.from({ length: n }, (_, i) => `<span class="lwh-ph" style="color:${cols[i % 2]}">${el.dataset.phrase}</span>`).join("");
      const st = { el, track, period: 2 * unit, x: 0, v: 0, dir: -1, fast: false, on: true };
      el.addEventListener("pointerenter", () => { st.fast = true; });
      el.addEventListener("pointerleave", () => { st.fast = false; });
      el.addEventListener("click", () => { st.dir *= -1; });
      return st;
    });
    if (reduce) return;
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { const s = strips.find((t) => t.el === e.target); if (s) s.on = e.isIntersecting; }), { root: screen });
      strips.forEach((s) => io.observe(s.el));
    }
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!root.hidden) strips.forEach((s) => {
        if (!s.on) return;
        s.v += (s.dir * (s.fast ? 220 : 55) - s.v) * Math.min(1, dt * 6);
        s.x = (((s.x + s.v * dt) % s.period) - s.period) % s.period;
        s.track.style.transform = `translate3d(${s.x}px,0,0)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, "strips");

  /* ---- the bag falls from the hero to the coffee spot as the page scrolls; the top nav appears after the hero menu ---- */
  safe(() => {
    const bag = $("#lws-bag"), nav = $(".lws-nav");
    const START = { x: 335.1, y: -4.9, s: 1 }, END = { x: 330, y: 685, s: 754 / 760 };
    const DIST = 560;                                    // design px of scrolling it takes to land
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let cur = reduce ? 1 : 0;
    const draw = () => {
      const q = clamp(cur, 0, 1), e = ease(q);
      const x = START.x + (END.x - START.x) * e, y = START.y + (END.y - START.y) * e, s = START.s + (END.s - START.s) * e;
      const rot = reduce ? 0 : Math.sin(q * Math.PI) * -5;     // a little tumble on the way down
      bag.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${s})`;
    };
    draw();
    const tick = () => {
      if (!root.hidden) {
        const st = screen.scrollTop / zoom;
        const target = reduce ? 1 : clamp(st / DIST, 0, 1);
        cur += (target - cur) * 0.16; if (Math.abs(target - cur) < 0.0005) cur = target;
        draw();
        nav.classList.toggle("is-on", st > 640);
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, "bag");

  /* ---- coffee: choose a blend under the product (outline -> coloured) ---- */
  safe(() => {
    const btns = $$(".lws-sel-btn"), bagImgs = $$("#lws-bag img");
    const targets = { name: $("#lws-c-name"), toast: $("#lws-c-toast"), desc: $("#lws-c-desc"), profile: $("#lws-c-profile"), vibe: $("#lws-c-vibe"), best: $("#lws-c-best") };
    const show = (key, first) => {
      const t = tpl(`template[data-coffee="${key}"]`); if (!t) return;
      targets.name.textContent = t.dataset.name; targets.toast.textContent = t.dataset.toast;
      targets.desc.innerHTML = $(".desc", t.content).innerHTML; targets.profile.innerHTML = $(".profile", t.content).innerHTML;
      targets.vibe.innerHTML = $(".vibe", t.content).innerHTML; targets.best.innerHTML = $(".best", t.content).innerHTML;
      if (!first && !reduce) Object.values(targets).forEach((el) => { el.classList.remove("lws-c-fade"); void el.offsetWidth; el.classList.add("lws-c-fade"); });
      btns.forEach((b) => { const on = b.dataset.coffee === key; b.classList.toggle("is-on", on); b.setAttribute("aria-checked", String(on)); });
      bagImgs.forEach((im) => im.classList.toggle("is-on", im.classList.contains("b-" + key)));
    };
    // the template content lives in <template>: fall back to its children when .content is not available
    const fix = () => $$("template[data-coffee]", document).forEach((t) => { if (!t.content) return; });
    fix();
    btns.forEach((b, i) => {
      b.addEventListener("click", () => show(b.dataset.coffee));
      b.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { e.preventDefault(); const n = btns[(i + d + btns.length) % btns.length]; show(n.dataset.coffee); n.focus(); }
      });
    });
    show("medium", true);
    // bag sizes and price
    const price = $("#lws-c-price");
    $$(".lws-gram").forEach((g) => g.addEventListener("click", () => {
      $$(".lws-gram").forEach((x) => { const on = x === g; x.classList.toggle("is-on", on); x.setAttribute("aria-checked", String(on)); });
      price.textContent = g.dataset.price;
      if (!reduce) { price.classList.remove("lws-c-fade"); void price.offsetWidth; price.classList.add("lws-c-fade"); }
    }));
  }, "coffee");

  /* ---- merch: T-shirts / caps / mugs, three variations each ---- */
  safe(() => {
    const list = $("#lws-rows"), title = $("#lws-m-title"), imgs = $$("#lws-m-img img"), cats = $$(".lws-cat");
    const closed = 80;
    const setImg = (name) => imgs.forEach((im) => im.classList.toggle("is-on", im.dataset.img === name));
    const openRow = (row, on) => {
      row.classList.toggle("is-open", on);
      $(".lws-row-head", row).setAttribute("aria-expanded", String(on));
      row.style.height = on ? row.scrollHeight + "px" : closed + "px";
    };
    const render = (key, first) => {
      const t = tpl(`template[data-cat="${key}"]`); if (!t) return;
      const sizes = t.dataset.sizes === "1", desc = $(".desc", t.content).innerHTML;
      title.textContent = t.dataset.title;
      list.innerHTML = [...$$("li", t.content)].map((li, i) => `<li class="lws-row" data-img="${li.dataset.img}"><button type="button" class="lws-row-head" id="lws-rh-${i}" aria-expanded="false">${li.textContent}</button><div class="lws-row-body"><p class="d">${desc}</p>${sizes ? `<div class="lws-sizes" role="radiogroup" aria-label="Size">${["XS", "S", "M", "L"].map((s) => `<button type="button" class="lws-size" role="radio" aria-checked="false">${s}</button>`).join("")}</div>` : ""}<button type="button" class="lws-add">Add to cart</button></div></li>`).join("");
      const rows = $$(".lws-row", list);
      rows.forEach((row) => {
        row.style.height = closed + "px";
        $(".lws-row-head", row).addEventListener("click", () => { rows.forEach((r) => openRow(r, r === row)); setImg(row.dataset.img); });
        $$(".lws-size", row).forEach((sz) => sz.addEventListener("click", () => $$(".lws-size", row).forEach((x) => { const on = x === sz; x.classList.toggle("is-on", on); x.setAttribute("aria-checked", String(on)); })));
      });
      openRow(rows[0], true); setImg(rows[0].dataset.img);
      if (!first && !reduce) { list.classList.remove("lws-c-fade"); void list.offsetWidth; list.classList.add("lws-c-fade"); title.classList.remove("lws-c-fade"); void title.offsetWidth; title.classList.add("lws-c-fade"); }
      cats.forEach((c) => { const on = c.dataset.cat === key; c.classList.toggle("is-on", on); c.setAttribute("aria-checked", String(on)); });
    };
    cats.forEach((c, i) => {
      c.addEventListener("click", () => render(c.dataset.cat));
      c.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { e.preventDefault(); const n = cats[(i + d + cats.length) % cats.length]; render(n.dataset.cat); n.focus(); }
      });
    });
    render("shirt", true);
    // heights are measured again once the fonts are in
    const keep = () => { const o = $(".lws-row.is-open", list); if (o) o.style.height = o.scrollHeight + "px"; };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(keep);
    addEventListener("load", keep);
  }, "merch");
})();
