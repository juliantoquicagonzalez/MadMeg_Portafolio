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

  /* ---- top dishes: click a dish to see it as a line drawing ---- */
  safe(() => {
    const cards = [...root.querySelectorAll(".lwh-card")];
    const set = (card, on) => { card.classList.toggle("is-outline", on); card.setAttribute("aria-pressed", String(on)); };
    cards.forEach((card) => {
      const toggle = () => { const on = !card.classList.contains("is-outline"); cards.forEach((c) => set(c, false)); set(card, on); };
      card.addEventListener("click", (e) => { if (e.target.closest(".lwh-btn")) return; toggle(); });
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    });
  }, "dishes");

  /* ---- stores: the accordion shows one store at a time ---- */
  safe(() => {
    const stores = [...root.querySelectorAll(".lwh-store")];
    const open = (store) => stores.forEach((s) => {
      const on = s === store;
      s.classList.toggle("is-open", on);
      s.querySelector(".lwh-store-photo").setAttribute("aria-expanded", String(on));
    });
    stores.forEach((s, i) => {
      const photo = s.querySelector(".lwh-store-photo");
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
  }, "days");
})();
