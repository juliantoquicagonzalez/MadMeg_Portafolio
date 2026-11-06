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
   Every block takes a `tone` that picks the section colours from the project theme.
   Images live in assets/projects/<slug>/c/  (w/h = real pixel size, used to avoid layout jumps)
   ========================================================= */
(() => {
  const img = (slug, name, w, h, alt) => ({ src: `assets/projects/${slug}/c/${name}.webp`, w, h, alt });
  const mp = (name, w, h, alt) => img("matching-potions", name, w, h, alt);
  const al = (name, w, h, alt) => img("alice-in-doomland", name, w, h, alt);
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
          type: "feature", tone: "ink",
          title: "Lyric video soon to be released",
          note: "Animated by Samuel Poveda, Angie López and Carolina Osorio",
          image: { ...al("lyric-video", 960, 540, "Frame from the lyric video"), alpha: false },
        },
      ],
    },
  };
})();
