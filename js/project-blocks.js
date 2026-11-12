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
          images: [
            mp("win", 700, 1370, "Win screen: Pure magic!"),
            mp("gameplay", 640, 1422, "Match-3 gameplay"),
            mp("lose", 700, 1370, "Lose screen: Ohhh… nice soup"),
          ],
          extra: mp("potions", 1531, 193, "The potion bottles of the game"),
        },
        {
          type: "feature", tone: "night",
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

    "astrologia-millennial": {
      // pink / lilac of the brand's feed, with its violet for highlights
      theme: {
        pink: { bg: "#fbd6e6", fg: "#24143f", accent: "#5b2be0" },
        lilac: { bg: "#d6cbf8", fg: "#1e1238", accent: "#5b2be0" },
        night: { bg: "#21123f", fg: "#fbe9f1", accent: "#f6b9d6" },
      },
      blocks: [
        {
          type: "split", tone: "pink", side: "right", phone: true,
          title: "Horoscopes, creative writing and editing",
          text: "As part of my contribution to the team, I’ve crafted daily, weekly, monthly and annual astrological reports on a relatable and fun tone. No complex words or technical concepts hard to understand, just the pure substance of it. We’re like your obsessed-with-the-stars bff who just wants the best for you, and is def gonna tell you.",
          stat: "Our horoscope’s audience has grown from 35k likes and 150 comments per post on 2022, to 66.2k likes and 3k comments per post on average.",
          note: "Important note: my role here involves writing and layout, not illustration",
          image: am("feed", 572, 1454, "The account’s weekly horoscope post on Instagram"),
        },
        {
          type: "carousel", tone: "pink",
          title: "Weekly horoscopes",
          images: [1, 2, 3, 4, 5].map((i) => am(`post-${i}`, 720, 900, "Weekly horoscope post")),
        },
        {
          type: "carousel", tone: "night", phone: true,
          title: "Weekend stories",
          text: "More than 260 weeks covered, as well as 200 weekends reports on stories, and annual and daily astrology catch-up on other media.",
          images: [1, 2, 3, 4, 5].map((i) => am(`story-${i}`, 640, 1138, "Weekend horoscope story")),
        },
        {
          type: "carousel", tone: "lilac",
          title: "From the stars, to the idea, to the meme",
          text: "My role also involves designing memes with copys and style guides provided by the team. This means working on a wide range of styles, but maintaining the brand’s identity. We work on Canva so everyone can make adjustments in real time.",
          images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => am(`meme-${i}`, 720, 900, "Meme designed for the account")),
        },
      ],
    },

    "wild-forager": {
      // the app's own palette (Figma: #102B15 #345938 #7B996A #5C9B37 #FFE600 #E4FDCD)
      theme: {
        forest: { bg: "#102b15", fg: "#e4fdcd", accent: "#ffe600" },
        moss: { bg: "#345938", fg: "#e4fdcd", accent: "#ffe600" },
        mint: { bg: "#e4fdcd", fg: "#102b15", accent: "#5c9b37" },
      },
      blocks: [
        {
          type: "split", tone: "forest", side: "right", phone: true,
          title: "You probably walk past edible wild plants all the time without noticing them.",
          text: "Wild Forager helps users notice their surroundings again. It’s not a harvesting shortcut made only for consumption, it’s a learning tool created to heal relationships between humans and their surrounding green neighbors.",
          steps: ["Educational", "Edgy", "Anti-System", "Food Sovereignty"],
          image: wf("app-home", 412, 986, "Wild Forager map of plants nearby"),
        },
        {
          type: "gallery", tone: "moss", cols: 2,
          title: "Moodboards & Refs",
          images: [
            wf("mood-logo", 888, 725, "Logo and brand moodboard"), wf("mood-type", 1100, 647, "Typography moodboard"),
            wf("mood-illustration", 1031, 827, "Illustration moodboard"), wf("mood-ui", 1100, 599, "App UI and visual style moodboard"),
          ],
          captions: ["Logo & brand", "Typography", "Illustration", "Visual style"],
          descs: [
            "Lino-cut, flat colors and strong shapes. Inspired on “Food not bombs” logo and the raised fist symbolizing food sovereignty and people’s dignity.",
            "Relaxed, playful, handwritten and bold. But also professional, neutral and easy to understand. Rebelliousness meets accessibility while staying bold.",
            "Colorful, detailed and accurate, but also easy to read and clear. Botanical traditional illustration, created for the people and not scientists.",
            "Lino-cut inspired, strong silhouettes and shapes. Negative and positive space relationship. Hand made, bold, fun and unique.",
          ],
        },
        {
          type: "split", tone: "mint", side: "left",
          title: "The Fist Up",
          text: "Wild Forager is designed to slow the process down: observe first, compare carefully, and prioritize habitats over harvest. Made to help users engage with the Wild as a part of it, and not as an intruder.",
          stat: "The Fist Up as a wink to the next revolution: not only technologic but also environmentally friendly. The dandelion as a symbol of the hope and dreams of a better future.",
          image: wf("fist", 905, 1160, "Raised fist holding dandelions"),
        },
        {
          type: "gallery", tone: "mint", cols: 2, contain: true,
          images: [wf("logo-a", 886, 393, "Wild Forager horizontal logo"), wf("logo-b", 886, 393, "Wild Forager horizontal logo, light version")],
        },
        {
          type: "gallery", tone: "forest", cols: 3, contain: true,
          images: [wf("badge-1", 700, 701, "Round badge, dark"), wf("badge-2", 700, 701, "Round badge, green"), wf("badge-3", 700, 700, "Round badge, light")],
        },
        {
          type: "split", tone: "forest", side: "left", phone: true, tall: true,
          title: "The experience",
          text: "Browse each plant profile with illustrations, photos, traits, habitat, seasonality, and look-alike warnings so what is in front of each user can be compared carefully.",
          steps: [
            "Use the map to identify plants nearby",
            "See each plant’s information, photos and characteristics",
            "Identify each plant’s morphology with illustrative, clear and simple guides",
            "Beware of toxic lookalikes and cautions",
            "Send your own reports, photos, recipes and locations",
            "Create your profile and report plants, warnings or sites",
            "Use all the info to do your own research and go deeper",
          ],
          image: wf("app-plant", 412, 1578, "Plant profile screen"),
        },
        {
          type: "gallery", tone: "mint", cols: 9, contain: true, icons: true,
          text: "Type of flowers · Type of leafs",
          images: [
            wf("ic-1", 248, 253, "Many-petal flower"), wf("ic-2", 232, 245, "Four-petal flower"), wf("ic-3", 256, 254, "Five-petal flower"),
            wf("ic-4", 183, 233, "Asymmetric flower"), wf("ic-5", 256, 285, "Bipinnate leaf"), wf("ic-6", 251, 295, "Palmate leaf"),
            wf("ic-7", 223, 287, "Odd-pinnate leaf"), wf("ic-8", 122, 333, "Lanceolate leaf"), wf("ic-9", 150, 333, "Spatulate leaf"),
          ],
        },
        {
          type: "carousel", tone: "forest", cut: true,
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
