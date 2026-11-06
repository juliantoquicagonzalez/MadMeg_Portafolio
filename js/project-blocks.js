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
     full     — one image, edge to edge
   Every block takes a `tone` that picks the section colours from the project theme.
   Images live in assets/projects/<slug>/c/  (w/h = real pixel size, used to avoid layout jumps)
   ========================================================= */
(() => {
  const img = (slug, name, w, h, alt) => ({ src: `assets/projects/${slug}/c/${name}.webp`, w, h, alt });
  const mp = (name, w, h, alt) => img("matching-potions", name, w, h, alt);

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
  };
})();
