/* =========================================================
   MADMEG — composed project pages
   Each project listed here is built from real text + loose images
   (instead of the full-section screenshots in projects.js → sections).
   Projects not listed here keep showing their screenshot sections.

   Block types (rendered by js/project.js):
     trio     — text | image | text
     split    — title + text on one side, image on the other  (side: "left" | "right")
     feature  — centred title + one big image
     phones   — a row of app / game screens inside phone frames
     palette  — typefaces + colour swatches (drawn in code)
     gallery  — a row of images (cols), optional captions; `contain` keeps cut-outs whole
     full     — one image, edge to edge
   Every block takes a `tone` that picks the section colours from the project theme.
   Images live in assets/projects/<slug>/c/  (w/h = real pixel size, used to avoid layout jumps)
   ========================================================= */
(() => {
  const img = (slug, name, w, h, alt) => ({ src: `assets/projects/${slug}/c/${name}.webp`, w, h, alt });
  const mp = (name, w, h, alt) => img("matching-potions", name, w, h, alt);
  const lh = (name, w, h, alt, ext = "webp") => ({ ...img("the-luck-and-the-hare", name, w, h, alt), src: `assets/projects/the-luck-and-the-hare/c/${name}.${ext}` });

  window.PROJECT_BLOCKS = {
    "matching-potions": {
      // colours taken from the game's own palette (Figma, "Typography & palette" section)
      theme: {
        night: { bg: "#272559", fg: "#f6f1e9", accent: "#5cb6f9" },     // Deep Midnight
        parchment: { bg: "#f3e8d2", fg: "#2b1a10", accent: "#5d4ad9" },
        amethyst: { bg: "#5d4ad9", fg: "#f6f1e9", accent: "#ffd76a" },  // Mystic Amethyst
      },
      blocks: [
        {
          type: "trio", tone: "night",
          left: { title: "The Goal", text: "For this Game, we wanted to make the player feel inside of an alchemyst laboratory, taking on the role of a student starting their first year of Elixirs and Potions. We also wanted to make something different, that felt more human and fun than regular Match-3 games." },
          right: { title: "The Feel", text: "Bold, unique and fun. Most Match-3 follow certain style: clean, polished, perfect. We wanted to stand out and make something that felt alive, eye-catching and fun to look and play." },
          image: mp("book", 1313, 948, "Elixirs and Potions — Year 1 journal"),
        },
        {
          type: "feature", tone: "parchment",
          title: "Illustrated Game Icons",
          image: mp("icons", 1729, 1008, "Match-3 board and the sheet of illustrated ingredients and boosters"),
        },
        {
          type: "split", tone: "night", side: "right",
          title: "Potions, Shelfs and Cards",
          text: "Everytime you unlock a potion it automatically goes to your shelf, where you’ll display your whole collection. Each potion has an identification card, where you can discover its alchemy secrets, tips, way of use and cautions.",
          image: mp("shelfs", 1814, 872, "Potion shelves and a potion identification card"),
        },
        {
          type: "split", tone: "parchment", side: "left",
          title: "Sketched Wireframe & user flow",
          text: "After various iterations, we came to a flow that made sense and felt natural:",
          steps: ["Username input", "Potions selection", "Game", "Shelf", "Lose / Win"],
          image: mp("wireframe", 1600, 1045, "Hand-sketched wireframe of the game screens"),
        },
        {
          type: "palette", tone: "amethyst",
          title: "Typography & palette",
          fonts: [
            { name: "Chaloops", role: "Titles", sample: "Matching Potions" },
            { name: "Providence Sans", role: "Body text · Bold for highlights", sample: "Collect all the potions" },
          ],
          colors: [
            { hex: "#5D4AD9", name: "Mystic Amethyst" },
            { hex: "#272559", name: "Deep Midnight" },
            { hex: "#0A3EA6", name: "Lapis Powder" },
            { hex: "#5CB6F9" },
            { hex: "#592202" },
            { hex: "#CE5936" },
          ],
          text: "You can play the game on Itch.io and download the APK on your mobile.",
        },
        {
          type: "phones", tone: "night",
          title: "Game Screens",
          images: [
            mp("screen-1", 640, 1422, "Intro: the alchemy journal"),
            mp("screen-2", 640, 1422, "Potions selection, level 2"),
            mp("screen-3", 640, 1422, "Elixir of Clarity recipe"),
            mp("screen-4", 640, 1422, "Potion’s shelf"),
            mp("screen-5", 640, 1422, "Dew of Eternity identification card"),
          ],
        },
        {
          type: "phones", tone: "parchment",
          title: "Win, lose & play",
          images: [
            mp("win", 700, 1370, "Win screen: Pure magic!"),
            mp("gameplay", 640, 1422, "Match-3 gameplay"),
            mp("lose", 700, 1370, "Lose screen: Ohhh… nice soup"),
          ],
        },
        {
          type: "feature", tone: "night",
          title: "UI Toolkit",
          image: mp("ui-toolkit", 1750, 1020, "UI toolkit: buttons, bars, stars and potion bottles"),
        },
        { type: "full", tone: "night", image: mp("key-art", 1920, 1080, "Matching Potions key art") },
      ],
    },

    "the-luck-and-the-hare": {
      // brand palette from the Figma (Coconut Dream, Blushing Sweet, Black Ink, Conviction Red)
      theme: {
        coconut: { bg: "#fff5ea", fg: "#000000", accent: "#ba1d21" },
        ink: { bg: "#000000", fg: "#fff5ea", accent: "#f2abda" },
        blush: { bg: "#f2abda", fg: "#000000", accent: "#ba1d21" },
      },
      blocks: [
        {
          type: "split", tone: "ink", side: "right",
          title: "Welcome to the burrow!",
          text: "The Luck & The Hare is a plant-based sanctuary for the rebels, the fast-movers, and the dreamers. Here we present the branding and web design produced for this project.",
          steps: ["Unapologetic", "Vintage", "Editorial", "Artsy", "Bold", "Vegan"],
          image: { ...lh("cap", 1024, 1024, "Cap with the brand’s star and “The anti-dairy social club”"), alpha: false },
        },
        {
          type: "split", tone: "coconut", side: "left",
          title: "The Logo",
          text: "The primary logo combines two fonts representing the brand’s nature. On one hand, the delicate, ephemeral and ethereal feeling of The Luck; and on the other, the strength and boldness of The Hare. The star, on the middle represents the union of both worlds. Every element comes together forging the brand’s elegance and aesthetic manifest.",
          image: { ...lh("logo-full", 652, 439, "The Luck & The Hare primary logo", "svg"), alpha: false },
        },
        {
          type: "feature", tone: "coconut",
          text: "The isotype may also be used with the typographic variation of the principal logo, taking the star out of the composition to improve readibility.",
          image: { ...lh("logo-variations", 1058, 208, "Logo variations with the hare isotype", "svg"), alpha: false },
        },
        { type: "full", tone: "ink", image: lh("storefront", 2400, 1153, "Storefront with the brand’s illustrations") },
        {
          type: "palette", tone: "coconut", cols: 2,
          title: "Color Palette & Typography",
          text: "The palette carries the spirit of soft and bold in equal measure. Vegan food and principles, with colorful, risky and bold colors to bring something new to the community.",
          fonts: [
            { name: "Cabinet Grotesk Black", role: "For display and titles" },
            { name: "Cabinet Grotesk Bold", role: "For body and dense texts" },
            { name: "Telma", role: "For highlights and details" },
          ],
          colors: [
            { hex: "#FFF5EA", name: "Coconut Dream" },
            { hex: "#F2ABDA", name: "Blushing Sweet" },
            { hex: "#000000", name: "Black Ink" },
            { hex: "#BA1D21", name: "Conviction Red" },
          ],
        },
        {
          type: "gallery", tone: "blush", contain: true, cols: 5,
          title: "Graphic elements",
          text: "A set of illustrations were developed to extend the brand's world beyond the logo, used for packaging, merch and web illustrations.",
          images: [
            lh("hare-sassy", 233, 243, "Sassy hare", "svg"),
            lh("hare-ears-up", 168, 361, "Ears-up hare", "svg"),
            lh("hare-night-leaper", 253, 229, "Night leaper hare", "svg"),
            lh("hare-napping", 218, 253, "Napping hare", "svg"),
            lh("hare-curled", 218, 226, "Curled hare", "svg"),
          ],
        },
        {
          type: "gallery", tone: "coconut", contain: true, cols: 3,
          text: "The Hare is also the ambassador for The Luck & The Hare’s coffee blends. 3 different roasts to match every single mood: the napper, the hopper or the leaper. Which one represents you today?",
          images: [
            lh("coffee-napper", 900, 1169, "The gentle napper — light roast"),
            lh("coffee-hopper", 900, 1167, "The early hopper — medium roast"),
            lh("coffee-leaper", 900, 1169, "The night leaper — dark roast"),
          ],
          captions: ["The gentle napper", "The early hopper", "The night leaper"],
        },
        {
          type: "gallery", tone: "ink", cols: 3, square: true,
          images: [
            lh("merch-shirt", 1024, 1024, "T-shirt mockup"),
            lh("merch-mug", 1232, 864, "Mug mockup"),
            lh("merch-cap", 1024, 1024, "Cap mockup"),
          ],
        },
        { type: "full", tone: "blush", image: lh("web-shop", 1440, 701, "Web design: the shop") },
      ],
    },
  };
})();
