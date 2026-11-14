/* =========================================================
   MADMEG — composed project pages
   Each project listed here is built from real text + loose images
   (instead of the full-section screenshots in projects.js → sections).
   Projects not listed here keep showing their screenshot sections.

   Block types (rendered by js/project.js):
     trio     — text | image | text
     (split takes an optional small `sketch` under the text and `wide` for a bigger image;
      feature takes an optional `note` (credit line); gallery takes `ratio` for uneven columns)
     split    — title + text on one side, image on the other  (side: "left" | "right")
     feature  — centred title + one big image
     phones   — a row of app / game screens inside phone frames
     palette  — typefaces + colour swatches (drawn in code)
     gallery  — a row of images (cols), optional captions; `contain` keeps cut-outs whole
     full     — one image, edge to edge
     video    — a Vimeo player (src), 16:9
     carousel — text pinned on the left, images slide sideways (scroll, arrows or swipe)
   Every block takes a `tone` that picks the section colours from the project theme.
   Images live in assets/projects/<slug>/c/  (w/h = real pixel size, used to avoid layout jumps)
   ========================================================= */
(() => {
  const img = (slug, name, w, h, alt) => ({ src: `assets/projects/${slug}/c/${name}.webp`, w, h, alt });
  const mp = (name, w, h, alt) => img("matching-potions", name, w, h, alt);
  const wf = (name, w, h, alt) => img("wild-forager", name, w, h, alt);
  const am = (name, w, h, alt) => img("astrologia-millennial", name, w, h, alt);
  const al = (name, w, h, alt) => img("alice-in-doomland", name, w, h, alt);
  const ne = (name, w, h, alt) => img("neo", name, w, h, alt);
  const pf = (name, w, h, alt) => img("purple-font", name, w, h, alt);
  const lh = (name, w, h, alt, ext = "webp") => ({ ...img("the-luck-and-the-hare", name, w, h, alt), src: `assets/projects/the-luck-and-the-hare/c/${name}.${ext}` });

  window.PROJECT_BLOCKS = {
    "matching-potions": {
      // colours taken from the game's own palette (Figma, "Typography & palette" section)
      theme: {
        night: { bg: "#272559", fg: "#f6f1e9", accent: "#5cb6f9" },     // Deep Midnight
        parchment: { bg: "#f3e8d2", fg: "#2b1a10", accent: "#5d4ad9" },
        amethyst: { bg: "#5d4ad9", fg: "#f6f1e9", accent: "#ffd76a" },  // Mystic Amethyst
        cream: { bg: "#f6f1e9", fg: "#2b1a10", accent: "#5d4ad9" },
        periwinkle: { bg: "#9ba9f5", fg: "#1f1e1e", accent: "#5d4ad9" },
      },
      blocks: [
        {
          type: "split", tone: "night", textRight: true,
          title: "The Goal",
          text: "For this Game, we wanted to make the player feel inside of an alchemyst laboratory, taking on the role of a student starting their first year of Elixirs and Potions. We also wanted to make something different, that felt more human and fun than regular Match-3 games.",
          image: mp("book", 1313, 948, "Elixirs and Potions — Year 1 journal"),
        },
        {
          type: "feature", tone: "parchment", bleed: "5.4vw",
          title: "The Feel",
          text: "Bold, unique and fun. Most Match-3 follow certain style: clean, polished, perfect. We wanted to stand out and make something that felt alive, eye-catching and fun to look and play.",
          image: mp("icons", 1729, 1008, "Match-3 board and the sheet of illustrated ingredients and boosters"),
        },
        {
          type: "split", tone: "night", textRight: true, big: true,
          title: "Potions, Shelfs and Cards",
          text: "Everytime you unlock a potion it automatically goes to your shelf, where you’ll display your whole collection. Each potion has an identification card, where you can discover its alchemy secrets, tips, way of use and cautions.",
          image: mp("shelves", 1144, 869, "Potion shelves"),
        },
        { type: "full", tone: "cream", image: mp("typography", 2107, 544, "Chaloops font for the titles, Providence Sans for body text, and the game’s colour palette: Mystic Amethyst #5D4AD9, Deep Midnight #272559, Lapis Powder #0A3EA6, #5CB6F9, #592202 and #CE5936") },
        {
          type: "scene", tone: "periwinkle", flat: true, pb0: true, w: 1440, h: 638, itemBg: "#9ba9f5",
          layers: [
            { src: "assets/projects/matching-potions/c/gs-title.webp", alt: "Game Screens", x: 571.3, y: 42.4, w: 297.9, h: 33.8, still: true },
            { src: "assets/projects/matching-potions/c/gs-1.webp", full: "assets/projects/matching-potions/c/sf-1.webp", alt: "Intro: the alchemy journal", x: 90, y: 140.1, w: 256.2, h: 483 },
            { src: "assets/projects/matching-potions/c/gs-2.webp", full: "assets/projects/matching-potions/c/sf-2.webp", alt: "Potions selection, level 2", x: 360.5, y: 92, w: 225.3, h: 461.5 },
            { src: "assets/projects/matching-potions/c/gs-3.webp", full: "assets/projects/matching-potions/c/sf-3.webp", alt: "Elixir of Clarity recipe", x: 610.3, y: 151.2, w: 217.9, h: 458.1 },
            { src: "assets/projects/matching-potions/c/gs-4.webp", full: "assets/projects/matching-potions/c/sf-4.webp", alt: "The potion shelf", x: 856.6, y: 107.9, w: 231.5, h: 464.4 },
            { src: "assets/projects/matching-potions/c/gs-5.webp", full: "assets/projects/matching-potions/c/sf-5.webp", alt: "Dew of Eternity identification card", x: 1113.3, y: 130.5, w: 236.7, h: 466.7 },
          ],
        },
        {
          type: "scene", tone: "periwinkle", pt0: true, w: 1440, h: 683, itemBg: "#9ba9f5",
          layers: [
            { src: "assets/projects/matching-potions/c/potion-cluster.webp", alt: "Prosperity on a Jar identification card and potion", nobg: true, x: 55, y: 120, w: 348, h: 443 },
            { src: "assets/projects/matching-potions/c/wl-lose.webp", full: "assets/projects/matching-potions/c/sf-lose.webp", alt: "Lose screen: Ohhh… nice soup", x: 422, y: 78, w: 335.2, h: 605 },
            { src: "assets/projects/matching-potions/c/wl-game.webp", full: "assets/projects/matching-potions/c/sf-game.webp", alt: "Match-3 gameplay", x: 791, y: 101, w: 268.8, h: 564.9 },
            { src: "assets/projects/matching-potions/c/wl-win.webp", full: "assets/projects/matching-potions/c/sf-win.webp", alt: "Win screen: Pure magic!", x: 1089.8, y: 79.3, w: 332.2, h: 603.7 },
          ],
        },
        {
          type: "scene", tone: "night", w: 1751, h: 1021,
          layers: [
            { src: "assets/projects/matching-potions/c/tk-00.webp", alt: "Toolkit page", x: 0.0, y: 0.0, w: 1751, h: 1021, still: true },
            { src: "assets/projects/matching-potions/c/tk-01.webp", alt: "UI TOOLKIT", x: 642.0, y: 83.5, w: 473.3, h: 87.1, still: true },
            { src: "assets/projects/matching-potions/c/tk-02.webp", alt: "Popup background", x: 197.0, y: 225.0, w: 293, h: 296 },
            { src: "assets/projects/matching-potions/c/tk-03.webp", alt: "Shift Identity option button", x: 444.0, y: 677.0, w: 274, h: 47 },
            { src: "assets/projects/matching-potions/c/tk-04.webp", alt: "Resume button", x: 539.0, y: 295.0, w: 177, h: 55 },
            { src: "assets/projects/matching-potions/c/tk-05.webp", alt: "Pause button", x: 702.0, y: 468.0, w: 69, h: 67 },
            { src: "assets/projects/matching-potions/c/tk-06.webp", alt: "Options button", x: 538.0, y: 375.0, w: 180, h: 56 },
            { src: "assets/projects/matching-potions/c/tk-07.webp", alt: "Menu button", x: 619.0, y: 468.0, w: 69, h: 67 },
            { src: "assets/projects/matching-potions/c/tk-08.webp", alt: "Inventory button", x: 538.0, y: 466.0, w: 69, h: 67 },
            { src: "assets/projects/matching-potions/c/tk-09.webp", alt: "Exit button", x: 538.0, y: 216.0, w: 180, h: 56 },
            { src: "assets/projects/matching-potions/c/tk-10.webp", alt: "Close button", x: 788.0, y: 468.0, w: 69, h: 67 },
            { src: "assets/projects/matching-potions/c/tk-11.webp", alt: "Title frame, blue", x: 765.0, y: 240.0, w: 176, h: 72 },
            { src: "assets/projects/matching-potions/c/tk-12.webp", alt: "Title frame, purple", x: 765.0, y: 354.0, w: 175, h: 67 },
            { src: "assets/projects/matching-potions/c/tk-13.webp", alt: "Slider", x: 675.0, y: 576.0, w: 294, h: 55 },
            { src: "assets/projects/matching-potions/c/tk-14.webp", alt: "Next arrow, right", x: 380.0, y: 677.0, w: 26, h: 45 },
            { src: "assets/projects/matching-potions/c/tk-15.webp", alt: "Next arrow, left", x: 290.0, y: 677.0, w: 27, h: 47 },
            { src: "assets/projects/matching-potions/c/tk-16.webp", alt: "Back button", x: 871.0, y: 468.0, w: 69, h: 67 },
            { src: "assets/projects/matching-potions/c/tk-17.webp", alt: "Locked star", x: 490.0, y: 571.0, w: 61, h: 61 },
            { src: "assets/projects/matching-potions/c/tk-18.webp", alt: "Star", x: 571.0, y: 570.0, w: 63, h: 63 },
            { src: "assets/projects/matching-potions/c/tk-19.webp", alt: "Locked third star", x: 278.0, y: 561.0, w: 78, h: 74 },
            { src: "assets/projects/matching-potions/c/tk-20.webp", alt: "Third star", x: 388.0, y: 561.0, w: 79, h: 75 },
            { src: "assets/projects/matching-potions/c/tk-21.webp", alt: "Ingredient counter, checked", x: 176.0, y: 571.0, w: 72, h: 65 },
            { src: "assets/projects/matching-potions/c/tk-22.webp", alt: "Ingredient counter", x: 783.0, y: 668.0, w: 157, h: 65 },
            { src: "assets/projects/matching-potions/c/tk-23.webp", alt: "Potion identification card", x: 972.0, y: 172.0, w: 334, h: 531 },
            { src: "assets/projects/matching-potions/c/tk-24.webp", alt: "Potion identification card", x: 1409.8, y: 86.0, w: 281.4, h: 428.7 },
            { src: "assets/projects/matching-potions/c/tk-25.webp", alt: "Potion identification card", x: 1282.0, y: 290.0, w: 297.9, h: 438.1 },
            { src: "assets/projects/matching-potions/c/tk-26.webp", alt: "Potion, level 1 · luck", x: 1224.0, y: 770.0, w: 92, h: 128 },
            { src: "assets/projects/matching-potions/c/tk-27.webp", alt: "Potion, level 3 · health", x: 1499.0, y: 744.0, w: 169, h: 182 },
            { src: "assets/projects/matching-potions/c/tk-28.webp", alt: "Potion, level 1 · love", x: 455.0, y: 770.0, w: 85, h: 157 },
            { src: "assets/projects/matching-potions/c/tk-29.webp", alt: "Potion, level 1 · health", x: 139.0, y: 739.0, w: 127, h: 191 },
            { src: "assets/projects/matching-potions/c/tk-30.webp", alt: "Potion, level 2 · luck", x: 307.0, y: 760.0, w: 99, h: 163 },
            { src: "assets/projects/matching-potions/c/tk-31.webp", alt: "Potion, level 2 · love", x: 1100.0, y: 771.0, w: 89, h: 140 },
            { src: "assets/projects/matching-potions/c/tk-32.webp", alt: "Potion, level 3 · abundance", x: 1345.0, y: 742.0, w: 113, h: 188 },
            { src: "assets/projects/matching-potions/c/tk-33.webp", alt: "Potion, level 3 · love", x: 715.0, y: 750.0, w: 99, h: 170 },
            { src: "assets/projects/matching-potions/c/tk-34.webp", alt: "Potion, level 3 · luck", x: 958.0, y: 753.0, w: 98, h: 163 },
            { src: "assets/projects/matching-potions/c/tk-35.webp", alt: "Potion, level 1 · spirit", x: 605.0, y: 757.0, w: 50, h: 170 },
            { src: "assets/projects/matching-potions/c/tk-36.webp", alt: "Potion, level 2 · health", x: 851.0, y: 793.0, w: 73, h: 105 },
            { src: "assets/projects/matching-potions/c/tk-37.webp", alt: "Start button", x: 212.0, y: 123.0, w: 212, h: 66 },
            { src: "assets/projects/matching-potions/c/tk-38.webp", alt: "Loading screen bottle", x: 461.0, y: 110.0, w: 66, h: 79 },
          ],
        },
        {
          type: "split", tone: "parchment", side: "left",
          title: "Sketched Wireframe & user flow",
          text: "After various iterations, we came to a flow that made sense and felt natural:",
          steps: ["Username input", "Potions selection", "Game", "Shelf", "Lose / Win"],
          image: { ...mp("wireframe", 1565, 1045, "Hand-sketched wireframe of the game screens"), lbbg: true },
        },
        { type: "video", tone: "night", title: "Matching Potions gameplay video", src: "https://player.vimeo.com/video/1177791247?h=c8d50ffe95&dnt=1" },
      ],
    },

    "the-luck-and-the-hare": {
      // order and layout follow the Figma (PURPLE-JAMS, frame "WebSite"); its stock placeholders are left out.
      // Palette: Coconut Dream, Blushing Sweet, Black Ink, Conviction Red. Fonts: Cabinet Grotesk + Telma.
      font: "luck",
      theme: {
        coconut: { bg: "#fff5ea", fg: "#000000", accent: "#ba1d21" },
        ink: { bg: "#000000", fg: "#fff5ea", accent: "#f2abda", title: "#f2abda" },
        blush: { bg: "#f2abda", fg: "#000000", accent: "#ba1d21" },
        red: { bg: "#ba1d21", fg: "#fff5ea", accent: "#f2abda", title: "#f2abda" },
      },
      blocks: [
        // sticker strip from the Figma, sliding sideways without end
        { type: "marquee", tone: "blush", src: "assets/projects/the-luck-and-the-hare/c/sticker-strip.webp", w: 720, h: 113 },
        {
          // text on the left, the cap reaching the right edge with the brand words floating on it
          type: "split", tone: "ink", bleedRight: true,
          title: "Welcome to the burrow!",
          text: "The Luck & The Hare is a plant-based sanctuary for the rebels, the fast-movers, and the dreamers. Here we present the branding and web design produced for this project.",
          sub: "Branding / Packaging / WebDesign",
          image: { ...lh("cap", 1024, 1024, "Cap with the brand’s star and “The anti-dairy social club”"), alpha: false },
          tags: [
            { t: "Unapologetic", x: 14.8, y: 13.1 }, { t: "Vegan", x: 82.3, y: 21.7 }, { t: "Bold", x: 6.2, y: 36.7 },
            { t: "Artsy", x: 78.9, y: 56.6 }, { t: "Editorial", x: 12, y: 77.6 }, { t: "Vintage", x: 62.1, y: 81 },
          ],
        },
        {
          type: "split", tone: "coconut", side: "left",
          title: "The Logo",
          text: "The primary logo combines two fonts representing the brand’s nature. On one hand, the delicate, ephemeral and ethereal feeling of The Luck; and on the other, the strength and boldness of The Hare. The star, on the middle represents the union of both worlds. Every element comes together forging the brand’s elegance and aesthetic manifest.",
          image: { ...lh("logo-full", 652, 439, "The Luck & The Hare primary logo", "svg"), alpha: false },
        },
        {
          // colour variations of the isotype: the background splits in three (Figma)
          type: "panels", tone: "coconut",
          panels: [
            { bg: "#fff5ea", src: "assets/projects/the-luck-and-the-hare/c/isotype-on-cream.svg", alt: "Isotype on Coconut Dream, pink star", w: 262, h: 150 },
            { bg: "#f2abda", src: "assets/projects/the-luck-and-the-hare/c/isotype-on-pink.svg", alt: "Isotype on Blushing Sweet, red star", w: 262, h: 150 },
            { bg: "#ba1d21", src: "assets/projects/the-luck-and-the-hare/c/isotype-on-red.svg", alt: "Isotype on Conviction Red, cream star", w: 262, h: 150 },
          ],
        },
        { type: "feature", tone: "blush", maxw: "43%", image: { ...lh("isotype", 262, 150, "The hare isotype with the star", "svg"), alpha: false } },
        // the strip again, then the colours over the coffee-beans photo (Figma)
        { type: "marquee", tone: "blush", src: "assets/projects/the-luck-and-the-hare/c/sticker-strip.webp", w: 720, h: 113 },
        {
          type: "cards", tone: "ink", bg: "assets/projects/the-luck-and-the-hare/c/beans.webp",
          colors: [
            { hex: "#F2ABDA", name: "Blushing Sweet" },
            { hex: "#000000", name: "Black Ink", name2: "#f2abda", fg: "#f2abda" },
            { hex: "#BA1D21", name: "Conviction Red", name2: "#f2abda", fg: "#f2abda" },
            { hex: "#FFF5EA", name: "Coconut Dream" },
          ],
        },
        {
          type: "typeset", tone: "coconut",
          title: "Typography",
          text: "The typeface pairing reflects the same balance the brand is built on: warmth and grounding, playfulness and purpose, elegance and audacious.",
          fonts: [
            { family: "'Cabinet Grotesk', sans-serif", weight: 900, size: "1em", name: "Cabinet Grotesk Black", role: "For display and titles" },
            { family: "'Cabinet Grotesk', sans-serif", weight: 700, size: ".76em", name: "Cabinet Grotesk Bold", role: "For body and dense texts" },
            { family: "'Telma', serif", weight: 700, size: ".62em", name: "Telma", role: "For highlights and details" },
          ],
        },
        // the clip frame (Figma order: Typography, this, Graphic elements): the stickers pop in over the espresso machine (STICKERS_FRAME)
        { type: "clip", tone: "ink", src: "assets/projects/the-luck-and-the-hare/c/stickers-frame.mp4", poster: "assets/projects/the-luck-and-the-hare/c/stickers-frame-poster.webp", w: 2560, h: 1428, alt: "Coffee stickers popping in over an espresso machine" },
        {
          type: "split", tone: "coconut", side: "left", lead: true,
          title: "Graphic elements",
          text: "A set of illustrations were developed to extend the brand’s world beyond the logo. Coffee, tea and croissants meet The Hare: the mascot who embodies the brand’s essence.",
          image: { ...lh("hares-cluster", 705, 518, "The Hare in five poses: sassy, night leaper, ears up, napping and curled", "svg"), alpha: false },
        },
        {
          type: "gallery", tone: "blush", contain: true, cols: 3,
          text: "The Hare is also the ambassador for The Luck & The Hare’s coffee blends. 3 different roasts to match every single mood: the napper, the hopper or the leaper. Which one represents you today?",
          images: [
            lh("coffee-napper", 900, 1169, "The gentle napper — light roast"),
            lh("coffee-hopper", 900, 1167, "The early hopper — medium roast"),
            lh("coffee-leaper", 900, 1169, "The night leaper — dark roast"),
          ],
          captions: ["The gentle napper", "The early hopper", "The night leaper"],
        },
        {
          type: "gallery", tone: "coconut", cols: 2, square: true, maxw: "760px",
          images: [
            lh("merch-mug", 1232, 864, "Mug: “No harm, just charm!”"),
            lh("merch-shirt", 1024, 1024, "T-shirt: “Eat kindly, stay lucky.”"),
            { ...lh("merch-bag", 872, 696, "The Night Leaper coffee bag next to the “Eat kindly, stay lucky.” mug"), pos: "71% 50%" },
            lh("merch-store", 1080, 1080, "Storefront: “Coffee, Dark. Conscience, Clear.”"),
          ],
        },
        // the menu frame (Figma), edge to edge; replaces the "Shop" web mockup
        { type: "full", tone: "ink", edge: true, centerStart: true, image: lh("menu", 1440, 744, "Menu: All-day eats, Our roastery, Drinks & tea, Desserts and Treats") },
        {
          type: "text", tone: "red",
          title: "Thanks for watching!",
          text: "The Luck & The Hare is a plant-based sanctuary for the rebels, the fast-movers, and the dreamers. We’re Anna, Joshua and Poppy, three friends united by a cause 6 years ago.",
        },
      ],
    },

    "alice-in-doomland": {
      // asylum greys from the Figma renders (#6A6A6A) + aged paper and dried-blood red
      theme: {
        asylum: { bg: "#6a6a6a", fg: "#f2ece2", accent: "#e6c98f" },
        ink: { bg: "#161414", fg: "#efe7dc", accent: "#c8473d" },
        paper: { bg: "#efe7dc", fg: "#1a1616", accent: "#8c2a24" },
      },
      blocks: [
        {
          type: "gallery", tone: "paper", cols: 2,
          title: "Moodboards & Refs",
          text: "Working really close to Alice in Doomland’s band director, we created this comic-like, 2D aesthetic, using references such as Little Nightmares, Alice Madness Returns and Don’t Starve, where horror meets childness to create a unique, eery and intriguing aesthetic.",
          images: [al("mood-aesthetic", 1400, 875, "General aesthetic moodboard"), al("mood-light", 1400, 875, "Lighting and colors moodboard")],
          captions: ["General aesthetic moodboard", "Lighting and colors moodboard"],
        },
        {
          type: "gallery", tone: "paper", cols: 4,
          text: "Each character is a band member, with its unique personality embedded into Alice’s Story",
          images: [
            al("mood-alice", 1000, 625, "Alice moodboard"), al("mood-kenneth", 1000, 625, "Kenneth moodboard"),
            al("mood-jack", 1000, 625, "Jack moodboard"), al("mood-twins", 1000, 625, "Quentin twins moodboard"),
          ],
          captions: ["Alice", "Kenneth", "Jack", "Quentin twins"],
        },
        {
          type: "feature", tone: "ink",
          title: "Character lineup",
          text: "This project was not only aimed to evolve the band’s Universe, but also to create visualizers, video lyrics and 3D optimized characters for a future videogame. That’s why every design choice was made for a 3D pipeline.",
          note: "Concept art by Maria José Madrigal",
          image: al("lineup", 1879, 899, "Lineup of the five band members"),
        },
        {
          type: "split", tone: "ink", side: "right", wide: true,
          title: "Alice Baker",
          text: "Alice has stayed on Ostyum Assylum for a long time, no one remebers when she came here. She doesn’t speak to anyone, at least not on our reality. Always with a distressed look, always searching for something she doesn’t find... Or maybe someone?",
          sketch: al("alice-sketch", 900, 506, "Alice shape sketches"),
          image: al("alice", 2000, 1134, "Alice turnaround"),
        },
        {
          type: "split", tone: "asylum", side: "left", wide: true,
          title: "Kenneth",
          text: "Kenneth is the Assylum’s principal. He is neither good or evil, maybe a mix of both. Mysterious, only speaking what is strictly needed and always accompanied by Jack and Quentin. We only know he’s a famous psychiatrist, but nothing more... Some say it it was his unorthodox healing methods what made him so popular.",
          sketch: { ...al("kenneth-sketch", 900, 506, "Kenneth shape sketches"), alpha: false },
          image: { ...al("kenneth", 2000, 1134, "Kenneth turnaround"), alpha: false },
        },
        {
          type: "split", tone: "ink", side: "right", wide: true,
          title: "Jack",
          text: "We have never seen Jack’s face. He doesn’t speak with his voice, he only communicates through his gestures, and you can immediately tell he’s tremendously sad and insecure. For a man this tall, he really knows how to make himself look small, like not wanting to interfere with anything.",
          sketch: al("jack-sketch", 900, 506, "Jack initial sketches"),
          image: al("jack", 2000, 1134, "Jack turnaround"),
        },
        {
          type: "split", tone: "paper", side: "left", wide: true,
          title: "Quentin twins",
          text: "The Quentin Twins are, to put it simple, disgusting. I still remember the profound discomfort I felt when I first met them. The small one is always on top of the other, it seems like he whispers and controls him. It is like the bigger one doesn’t even have a mind of his own. But Junior? It sometimes looks like his big brother is his biggest impediment.",
          sketch: al("twins-sketch", 900, 506, "Quentin twins initial sketches"),
          image: al("twins", 2000, 1134, "Quentin twins turnaround"),
        },
        { type: "feature", tone: "paper", image: al("twins-junior", 1600, 577, "Quentin Junior in color") },
        {
          type: "gallery", tone: "asylum", cols: 2, contain: true, ratio: [2.2, 1],
          title: "The instruments",
          text: "Inspired on vintage instruments, each member of the band has its own tool. Everything redesigned to fit the aesthetic of the universe.",
          images: [{ ...al("instruments", 2000, 1134, "Kenneth’s guitar, Jack’s guitar and Alice’s bass"), alpha: false }, { ...al("chair", 1200, 680, "Alice’s chair"), alpha: false }],
          captions: ["Kenneth’s guitar · Jack’s guitar · Alice’s bass", "Alice’s chair"],
        },
        {
          type: "split", tone: "asylum", side: "right",
          title: "Ostyum Assylum",
          text: "Inspired on old mental health hospitals and facilities, the Assylum is where everything occurs and where the characters live. Scary, kind of gross, dirty and abandoned.",
          image: { ...al("asylum", 2000, 1134, "The Assylum room"), alpha: false },
        },
        {
          type: "feature", tone: "ink",
          title: "3D Characters line up",
          note: "Modelled, rigged and texturized by Angie López and Carolina Osorio",
          image: { ...al("lineup-3d", 1920, 1080, "3D characters line up"), alpha: false },
        },
        {
          type: "feature", tone: "ink", bleedTop: "3.6vw",
          title: "Lyric video soon to be released",
          note: "Animated by Samuel Poveda, Angie López and Carolina Osorio",
          image: { ...al("lyric-video", 960, 540, "Frame from the lyric video"), alpha: false },
        },
      ],
    },

    "astrologia-millennial": {
      // pink / lilac of the brand's feed, with its violet for highlights
      theme: {
        pink: { bg: "#fbd6e6", fg: "#24143f", accent: "#5b2be0" },
        lilac: { bg: "#d6cbf8", fg: "#1e1238", accent: "#5b2be0" },
        night: { bg: "#21123f", fg: "#fbe9f1", accent: "#f6b9d6" },
        cream: { bg: "#f6f1e9", fg: "#1c1230", accent: "#5b2be0" },
        peach: { bg: "#ffe6d9", fg: "#21123f", accent: "#5b2be0" },
        periwinkle: { bg: "#c4cbff", fg: "#1c1230", accent: "#5b2be0" },
      },
      blocks: [
        {
          type: "carousel", tone: "pink", big: true,
          title: "Horoscopes, creative writing and editing",
          text: "As part of my contribution to the team, I’ve crafted daily, weekly, monthly and annual astrological reports on a relatable and fun tone. No complex words or technical concepts hard to understand, just the pure substance of it. We’re like your obsessed-with-the-stars bff who just wants the best for you, and is def gonna tell you.",
          stat: "Our horoscope’s audience has grown from 35k likes and 150 comments per post on 2022, to 66.2k likes and 3k comments per post on average.",
          note: "Important note: my role here involves writing and layout, not illustration",
          images: [am("post-0", 572, 900, "Horóscopo semanal"), ...[1, 2, 3, 4, 5].map((i) => am(`post-${i}`, 1080, 1350, "Weekly horoscope post"))],
        },
        {
          type: "carousel", tone: "peach", phone: true,
          title: "Weekend stories",
          text: "More than 260 weeks covered, as well as 200 weekends reports on stories, and annual and daily astrology catch-up on other media.",
          images: [1, 2, 3, 4, 5].map((i) => am(`story-${i}`, 640, 1138, "Weekend horoscope story")),
        },
        {
          type: "carousel", tone: "cream", handles: true,
          title: "From the stars, to the idea, to the meme",
          titleImage: am("memes-title", 1254, 342, "From the stars, to the idea, to the meme"),
          text: "My role also involves designing memes with copys and style guides provided by the team. <mark>This means working on a wide range of styles, but maintaining the brand’s identity.</mark> We work on Canva so everyone can make adjustments in real time.",
          images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => am(`meme-${i}`, 720, 900, "Meme designed for the account")),
        },
        { type: "full", tone: "periwinkle", image: am("may-stars", 2596, 283, "May the stars be always on your favor") },
      ],
    },

    "wild-forager": {
      // the app's own palette (Figma: #102B15 #345938 #7B996A #5C9B37 #FFE600 #E4FDCD)
      theme: {
        forest: { bg: "#102b15", fg: "#e4fdcd", accent: "#ffe600" },
        moss: { bg: "#345938", fg: "#e4fdcd", accent: "#ffe600" },
        mint: { bg: "#e4fdcd", fg: "#102b15", accent: "#5c9b37" },
        sage: { bg: "#7b996a", fg: "#102b15", accent: "#ffe600" },
      },
      blocks: [
        {
          type: "scene", tone: "forest", edge: true, w: 1440, h: 820, grow: true,
          layers: [
            { src: "assets/projects/wild-forager/c/frame-notice-bg.webp", alt: "You probably walk past edible wild plants all the time without noticing them. Wild Forager helps users notice their surroundings again.", x: 0, y: 34, w: 1440, h: 752, still: true },
            { src: "assets/projects/wild-forager/c/phone-notice.webp", full: "assets/projects/wild-forager/c/scr-home.webp", alt: "Plants near you: map and plant list", x: 222, y: 75, w: 343, h: 640 },
          ],
        },
        { type: "full", tone: "sage", edge: true, still: true, spots: [
            { src: "assets/projects/wild-forager/c/mood-logo.webp", alt: "Logo and brand moodboard", x: 5.35, y: 19.74, w: 24.65, h: 30.02 },
            { src: "assets/projects/wild-forager/c/mood-type.webp", alt: "Typography moodboard", x: 65.56, y: 23.44, w: 29.1, h: 29.55 },
            { src: "assets/projects/wild-forager/c/mood-ui.webp", alt: "Visual style moodboard", x: 16.25, y: 46.29, w: 34.17, h: 33.25 },
            { src: "assets/projects/wild-forager/c/mood-illustration.webp", alt: "Illustration moodboard", x: 48.61, y: 59.45, w: 25.62, h: 35.89 },
          ], image: wf("frame-mood", 2880, 1672, "Moodboards and refs: logo and brand, typography, visual style and illustration") },
        { type: "full", tone: "forest", edge: true, image: wf("frame-fist", 2880, 1006, "The Fist Up: Wild Forager is designed to slow the process down. The raised fist holding dandelions, a wink to the next revolution.") },
        {
          type: "gallery", tone: "mint", cols: 2, contain: true, zoom: true,
          images: [wf("logo-a", 886, 393, "Wild Forager horizontal logo"), wf("logo-b", 886, 393, "Wild Forager horizontal logo, light version")],
        },
        {
          type: "scene", tone: "forest", edge: true, w: 1440, h: 322, fit: true,
          layers: [
            { color: "#102b15", x: 0, y: 0, w: 480, h: 322, still: true },
            { color: "#345938", x: 480, y: 0, w: 480, h: 322, still: true },
            { color: "#5c9b37", x: 960, y: 0, w: 480, h: 322, still: true },
            { src: "assets/projects/wild-forager/c/bg-b1.webp", alt: "Round badge, light", x: 122, y: 46, w: 233, h: 233 },
            { src: "assets/projects/wild-forager/c/bg-b2.webp", alt: "Round badge, green", x: 603, y: 46, w: 233, h: 233 },
            { src: "assets/projects/wild-forager/c/bg-b3.webp", alt: "Round badge, dark", x: 1085, y: 48, w: 229, h: 229 },
          ],
        },
        { type: "full", tone: "moss", edge: true, image: wf("frame-experience", 2880, 1938, "The experience: the map, plant profile and the app's key moments, with annotations") },
        {
          type: "gallery", tone: "mint", cols: 9, contain: true, icons: true, circles: true, zoom: true,
          text: "Type of flowers · Type of leafs",
          images: [
            wf("ic-1", 248, 253, "Many-petal flower"), wf("ic-2", 232, 245, "Four-petal flower"), wf("ic-3", 256, 254, "Five-petal flower"),
            wf("ic-4", 183, 233, "Asymmetric flower"), wf("ic-5", 256, 285, "Bipinnate leaf"), wf("ic-6", 251, 295, "Palmate leaf"),
            wf("ic-7", 223, 287, "Odd-pinnate leaf"), wf("ic-8", 122, 333, "Lanceolate leaf"), wf("ic-9", 150, 333, "Spatulate leaf"),
          ],
        },
        {
          type: "carousel", tone: "forest", cut: true, dark: true,
          title: "The Illustrations",
          text: "The first batch of botanical illustrations were focused on common plants in Germany that have high risk of being misidentified, and their dangerous lookalikes are a menace for all foragers.",
          steps: ["The early blooming, blooming and late state", "Its unique characteristics and differentiators from its lookalikes", "The flowers close-up", "The stems details", "The leaf close-up"],
          note: "Currently, the illustrations are being tested for dynamic interaction within the app where users can spotlight each plant’s part, and recieve more information",
          images: [
            { ...wf("cows-parsley-study", 1300, 1762, "Cow’s Parsley botanical study"), alpha: false },
            wf("bears-garlic", 900, 1237, "Bear’s Garlic"), wf("bellis", 900, 1153, "Bellis Perennis or Common Daisy"),
            wf("cows-parsley", 900, 1261, "Cow’s Parsley"), wf("portulak", 900, 1300, "Portulak"),
          ],
          captions: ["Botanical study", "Bear’s Garlic", "Bellis Perennis or Common Daisy", "Cow’s Parsley", "Portulak"],
        },
        {
          type: "carousel", tone: "moss",
          title: "Social media posts",
          text: "Social media Figma templates and a few specific designs to start building the community around ethical foraging. Most of wild forager’s content will be candid photos, and organic or UGC content. Keep on foraging!",
          images: [1, 2, 3, 4, 5, 6].map((i) => wf(`post-${i}`, 720, 900, "Wild Forager social media post")),
        },
      ],
    },

    "neo": {
      // colours of the piece itself: sky title blue, mountain teal, forest green, and the red of Neo's cap
      theme: {
        sky: { bg: "#bfe0f0", fg: "#10384a", accent: "#d23f33" },
        teal: { bg: "#4591a0", fg: "#f4fbf7", accent: "#ffe28a" },
        forest: { bg: "#15351f", fg: "#e8f5df", accent: "#ff7a59" },
      },
      blocks: [
        {
          type: "split", tone: "sky", side: "right", wide: true,
          title: "Let’s meet Neo",
          text: "Straight from the mountains of Colombia, comes Neo: a happy kid and nature's #1 fan. Developed to be presented at the giant screens on Neo Centro comercial passage, bringing nature to one of the most hectic spots in downtown Bogota: San Victorino.",
          image: ne("neo-sitting", 1400, 1691, "Neo sitting, reaching out his hand"),
        },
        {
          type: "gallery", tone: "teal", contain: true, cols: 2, maxh: 640, ratio: [1, 2.6],
          title: "Character sheet",
          images: [ne("neo-clay", 622, 1862, "Neo clay pose"), ne("sheet", 2000, 1397, "Neo character sheet: expressions, poses and details")],
        },
        {
          type: "gallery", tone: "forest", contain: true, center: true, cols: 5, maxh: 250,
          title: "The plants",
          images: [
            ne("pl-anthuriums", 900, 436, "Red and blue Anthuriums"),
            ne("pl-macrolepiota", 700, 601, "Macrolepiota"),
            ne("pl-amanita", 700, 633, "Amanita"),
            ne("pl-pink-guayacan", 800, 926, "Pink Guayacan"),
            ne("pl-yellow-guayacan", 800, 802, "Yellow Guayacan"),
            ne("pl-wax-palm", 800, 1507, "Wax Palm"),
            ne("pl-yarumo", 900, 809, "Yarumo tree"),
            ne("pl-monsteras", 900, 900, "Monsteras"),
            ne("pl-orchids", 900, 441, "Orchids"),
            ne("pl-ferns", 900, 564, "Fern"),
            ne("pl-parasol", 700, 814, "Parasol Mushroom"),
            ne("pl-bromeliad", 800, 743, "Bromeliad"),
            ne("pl-aglaonema", 900, 603, "Aglaonema"),
          ],
          captions: ["Red and blue Anthuriums", "Macrolepiota", "Amanita", "Pink Guayacan", "Yellow Guayacan", "Wax Palm", "Yarumo tree", "Monsteras", "Orchids", "Fern", "Parasol Mushroom", "Bromeliad", "Aglaonema"],
        },
        {
          type: "split", tone: "sky", side: "left", phone: true,
          title: "NEOSCOPE: Open Screen exposition.",
          text: "Neo Centro Comercial. San Victorino - Bogota, Colombia.",
          image: ne("mall-screen", 364, 644, "Neo on the giant screen inside Neo Centro, in San Victorino"),
        },
        {
          type: "text", tone: "teal",
          title: "Thanks for watching",
          text: "You can purchase <a href=\"https://purpleraven.gumroad.com/l/neostylizedcharacter\" target=\"_blank\" rel=\"noopener\">Neo</a> here, for Blender use and any purpose.",
          note: "A Purple Raven creation.",
        },
      ],
    },

    "purple-font": {
      // lilac of the flowers, ink black of the letters, the green of the sticker note and of the RVN poster
      theme: {
        lilac: { bg: "#e9defc", fg: "#1c1230", accent: "#6a2cf0" },
        gray: { bg: "#c4c4ca", fg: "#141414", accent: "#6a2cf0" },
        night: { bg: "#1a0f2b", fg: "#efe6ff", accent: "#a8e68a" },
        sticker: { bg: "#a5cf8e", fg: "#14210f", accent: "#5b25ef" },
      },
      blocks: [
        {
          type: "split", tone: "lilac", side: "right", wide: true,
          title: "Purple Font",
          text: "Purple Font is an experimental 2D font, created from 3D letters. Designed and textured to feel eery, magical and ethereal, combining heavy curves with strong textures to create this fun and wonky typography.",
          image: pf("title", 1400, 861, "Purple Font, the font name set in its own letters"),
        },
        {
          type: "feature", tone: "gray",
          title: "The alphabet",
          image: pf("alphabet", 1752, 737, "The Purple Font alphabet, A to Z"),
        },
        {
          type: "gallery", tone: "lilac", contain: true, center: true, cols: 3, maxh: 420,
          images: [pf("raven", 772, 1082, "Halftone raven"), pf("letter-r", 703, 852, "The letter R of Purple Font"), pf("flower", 800, 1096, "Purple halftone flower")],
        },
        {
          type: "gallery", tone: "night", cols: 2,
          title: "Mockups",
          images: [pf("mock-tote", 1600, 913, "Purple Font on a tote bag"), pf("mock-wine", 1600, 893, "Purple Font on a wine label"), pf("mock-skate", 1600, 899, "Purple Font on a skateboard deck"), pf("mock-shirt", 1600, 899, "Purple Font on a t-shirt")],
        },
        { type: "full", tone: "night", image: pf("metro", 2400, 1350, "Purple Raven poster on a subway billboard") },
        {
          type: "gallery", tone: "gray", contain: true, cols: 2, maxh: 640,
          title: "Posters",
          images: [pf("poster-lilac", 792, 1224, "Purple Raven poster, lilac version"), pf("poster-dark", 795, 1224, "Purple Raven poster, dark version")],
        },
        {
          type: "text", tone: "sticker",
          title: "Thank you for watching",
          text: "You can purchase <a href=\"https://purpleraven.gumroad.com/l/PURPLEFONT\" target=\"_blank\" rel=\"noopener\">Purple Font</a> or <a href=\"https://purpleraven.gumroad.com/l/PURPLE3DFONT\" target=\"_blank\" rel=\"noopener\">Purple 3D Font</a> here, and use it freely.",
          note: "A Purple Raven creation.",
        },
      ],
    },
  };
})();
