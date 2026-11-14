/* =========================================================
   The Luck & The Hare — behaviour of the interactive HOME sketch
   (markup in luck-web.html, styles in css/luck-home.css).
   Nothing here goes anywhere: it is a sketch, so buttons and links
   only react (hover, pressed, tap) and never navigate.
   ========================================================= */
(() => {
  const root = document.getElementById("lwh");
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const safe = (fn, name) => { try { fn(); } catch (e) { console.warn("[luck-home] " + name + " failed:", e); } };

  /* ---- fit the 1440px design to the width of the window ---- */
  safe(() => {
    const screen = root.closest(".lw-screen");
    const fit = () => {
      if (!screen || root.hidden) return;
      root.style.zoom = String(screen.clientWidth / 1440);
    };
    fit();
    if (window.ResizeObserver && screen) new ResizeObserver(fit).observe(screen);
    addEventListener("resize", fit);
    root.fit = fit; // called again when the tab is shown
  }, "fit");

  /* ---- buttons and links: react, never navigate ---- */
  safe(() => {
    root.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-noop], a[href^='#']");
      if (a) e.preventDefault();
      const b = e.target.closest(".lwh-btn");
      if (b) {
        e.stopPropagation(); // a button inside a card must not select the card
        b.classList.add("is-tap");
        setTimeout(() => b.classList.remove("is-tap"), 160);
      }
    });
  }, "buttons");

  /* ---- stickers wiggle when touched (hover does it on desktop) ---- */
  safe(() => {
    root.querySelectorAll(".lwh-sticker").forEach((s) => {
      s.addEventListener("click", () => {
        s.classList.remove("is-wiggle"); void s.offsetWidth; s.classList.add("is-wiggle");
      });
      s.addEventListener("animationend", () => s.classList.remove("is-wiggle"));
    });
  }, "stickers");

  /* ---- colour strips: endless marquee; hover speeds it up, a click turns it around ---- */
  safe(() => {
    const unit = 401.459 + 15;
    const strips = [...root.querySelectorAll(".lwh-strip")].map((el) => {
      const track = el.querySelector(".lwh-track");
      const cols = el.dataset.cols.split(",");
      const n = 2 * Math.ceil((1440 + 2 * unit) / (2 * unit)) + 2; // even, so the colour pattern repeats every 2 phrases
      track.innerHTML = Array.from({ length: n }, (_, i) => `<span class="lwh-ph" style="color:${cols[i % 2]}">${el.dataset.phrase}</span>`).join("");
      const st = { el, track, period: 2 * unit, x: 0, v: 0, dir: -1, fast: false, on: true };
      el.addEventListener("pointerenter", () => { st.fast = true; });
      el.addEventListener("pointerleave", () => { st.fast = false; });
      el.addEventListener("click", () => { st.dir *= -1; });
      track.style.transform = "translate3d(0,0,0)";
      return st;
    });
    if (reduce) return;
    if (window.IntersectionObserver) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { const s = strips.find((t) => t.el === e.target); if (s) s.on = e.isIntersecting; }), { root: root.closest(".lw-screen"), threshold: 0 });
      strips.forEach((s) => io.observe(s.el));
    }
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!root.hidden) {
        strips.forEach((s) => {
          if (!s.on) return;
          const target = s.dir * (s.fast ? 220 : 55);
          s.v += (target - s.v) * Math.min(1, dt * 6);
          s.x += s.v * dt;
          s.x = ((s.x % s.period) - s.period) % s.period; // stays in [-period, 0)
          s.track.style.transform = `translate3d(${s.x}px,0,0)`;
        });
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, "strips");

  /* ---- image sequences: the truck loops on its own, the menu folds open with the scroll ---- */
  safe(() => {
    const screen = root.closest(".lw-screen");
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const frames = (holder) => {
      const n = +holder.dataset.count, base = holder.dataset.frames;
      const imgs = Array.from({ length: n }, (_, i) => { const im = new Image(); im.decoding = "async"; im.src = base + String(i + 1).padStart(3, "0") + ".webp"; return im; });
      const canvas = holder.querySelector(".seq-canvas"), ctx = canvas.getContext("2d");
      const draw = (i) => { const im = imgs[clamp(Math.round(i), 0, n - 1)]; if (im && im.complete && im.naturalWidth) { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(im, 0, 0, canvas.width, canvas.height); return true; } return false; };
      return { n, imgs, draw };
    };
    const lazy = (el, fn) => {
      if (!window.IntersectionObserver) return fn();
      const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); fn(); } }, { root: screen, rootMargin: "900px 0px" });
      io.observe(el);
    };

    // truck: constant loop, 24 frames per second, paused when it is off screen
    const truck = document.getElementById("lwh-truck-seq");
    if (truck) lazy(truck, () => {
      const seq = frames(truck);
      let on = true, f = 0, acc = 0, last = performance.now(), ready = false;
      if (window.IntersectionObserver) new IntersectionObserver((es) => es.forEach((e) => { on = e.isIntersecting; }), { root: screen }).observe(truck);
      const tick = (now) => {
        const dt = Math.min(0.1, (now - last) / 1000); last = now;
        if (!root.hidden && on) {
          if (!ready) ready = seq.draw(0) && (truck.classList.add("is-seq"), true);
          else if (!reduce) { acc += dt * 24; if (acc >= 1) { f = (f + Math.floor(acc)) % seq.n; acc %= 1; seq.draw(f); } }
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    // menu: the frame follows how far the menu has travelled up the window
    // The menu panel is pinned in the middle of the window for a while (a pause to read it):
    // --stick centres it under the nav, and the section is made taller by the length of the pause.
    const section = root.querySelector(".lwh-menu"), stage = root.querySelector(".lwh-menu-stage");
    let stickCss = 0, holdCss = 0; // (shared with the scroll mapping below)
    const layout = () => {
      const z = parseFloat(root.style.zoom) || 1, Hd = screen.clientHeight / z;
      const stick = 42 + ((Hd - 42) - 719) / 2 - 98;           // panel is 719 tall and starts 98px into the stage
      const hold = reduce ? 0 : Math.round(Hd * 1.0);           // pinned stretch: one window of scrolling (the menu opens during the first part, the rest is for reading)
      root.style.setProperty("--stick", stick + "px");
      section.style.height = 915 + hold + "px";
      stickCss = stick * z; holdCss = hold * z;
    };
    layout();
    if (window.ResizeObserver) new ResizeObserver(layout).observe(screen);
    addEventListener("resize", layout);
    const menu = document.getElementById("lwh-menu-seq");
    if (menu) lazy(menu, () => {
      const seq = frames(menu);
      let cur = 0, ready = false, shown = -1;
      const target = () => {
        if (reduce) return seq.n - 1;
        // closed while the menu comes into view; once it is pinned it folds open over the first 65% of the pinned stretch
        const sr = screen.getBoundingClientRect(), r = section.getBoundingClientRect();
        const d = stickCss - (r.top - sr.top);                         // how far we have scrolled since it got pinned
        const p = clamp(d / Math.max(1, holdCss * 0.65), 0, 1);
        return p * (seq.n - 1);
      };
      const tick = () => {
        if (!root.hidden) {
          const t = target();
          cur += (t - cur) * 0.2; if (Math.abs(t - cur) < 0.02) cur = t;
          const i = Math.round(cur);
          if (i !== shown && seq.draw(i)) { shown = i; if (!ready) { ready = true; menu.classList.add("is-seq"); } }
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, "sequences");

  /* ---- top dishes: pass the mouse over a dish to see it as a line drawing (tap / Enter on touch and keyboard) ---- */
  safe(() => {
    const cards = [...root.querySelectorAll(".lwh-card")];
    const set = (card, on) => { card.classList.toggle("is-outline", on); card.setAttribute("aria-pressed", String(on)); };
    cards.forEach((card) => {
      const slot = card.parentElement;
      let mouse = false;
      slot.addEventListener("pointerenter", (e) => { mouse = e.pointerType === "mouse"; if (mouse) set(card, true); });
      slot.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") set(card, false); });
      const toggle = () => { const on = !card.classList.contains("is-outline"); cards.forEach((c) => set(c, false)); set(card, on); };
      card.addEventListener("click", (e) => { if (e.target.closest(".lwh-btn") || mouse) return; toggle(); });
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    });
  }, "dishes");

  /* ---- stores: the accordion shows one store at a time; hovering a store opens it (click on touch) ---- */
  safe(() => {
    const stores = [...root.querySelectorAll(".lwh-store")];
    const open = (store) => stores.forEach((s) => {
      const on = s === store;
      s.classList.toggle("is-open", on);
      s.querySelector(".lwh-store-photo").setAttribute("aria-expanded", String(on));
    });
    stores.forEach((s, i) => {
      const photo = s.querySelector(".lwh-store-photo");
      let timer = 0;
      // a short hover-intent delay so the row does not jitter while the cards slide under the pointer
      s.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { clearTimeout(timer); timer = setTimeout(() => open(s), 110); } });
      s.addEventListener("pointerleave", () => clearTimeout(timer));
      photo.addEventListener("click", () => open(s));
      photo.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { e.preventDefault(); const t = stores[(i + d + stores.length) % stores.length]; open(t); t.querySelector(".lwh-store-photo").focus(); }
      });
    });
  }, "stores");

  /* ---- weekly stops: each day unfolds its place and hours ---- */
  safe(() => {
    const days = [...root.querySelectorAll(".lwh-day")];
    const closed = 93;
    const set = (d, on) => {
      d.classList.toggle("is-open", on);
      d.querySelector(".lwh-day-head").setAttribute("aria-expanded", String(on));
      d.style.height = on ? d.scrollHeight + "px" : closed + "px";
    };
    days.forEach((d) => {
      d.style.height = closed + "px";
      d.querySelector(".lwh-day-head").addEventListener("click", () => {
        const on = !d.classList.contains("is-open");
        days.forEach((x) => set(x, false));
        set(d, on);
      });
    });
    // Monday is open by default; its height is measured again once the fonts are in
    const keep = () => { const o = days.find((d) => d.classList.contains("is-open")); if (o) o.style.height = o.scrollHeight + "px"; };
    set(days[0], true);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(keep);
    addEventListener("load", keep);
  }, "days");
})();
