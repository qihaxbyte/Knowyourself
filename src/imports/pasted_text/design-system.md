You are designing "KnowYourself" — a psychological self-discovery 
web app with pixel art RPG aesthetic for Indonesian university students.

=== DESIGN SYSTEM (apply to ALL screens) ===

BRAND IDENTITY:
- Name: KnowYourself
- Tagline: "Kenali Dirimu Lebih Dalam"
- Studio: Pragmata Studio
- Tone: Warm, honest, magical, personal — like a wise friend, not a clinical test

VISUAL STYLE:
- Primary aesthetic: Pixel art RPG meets modern clean UI
- Secondary feel: "Cozy RPG" — like Stardew Valley meets Notion
- NOT cartoonish, NOT corporate — warm and handcrafted

COLOR PALETTE:
- Background primary: #FAF7F0 (warm parchment)
- Background secondary: #F0EBE3 (slightly darker parchment)
- Surface/card: #FFFFFF with shadow rgba(0,0,0,0.06)
- Primary green: #2D6A4F (forest deep)
- Primary green light: #52B788 (forest mid)
- Accent gold: #C9A84C (warm gold)
- Accent gold light: #F0D080 (soft gold)
- Text primary: #1A1A1A
- Text secondary: #555555
- Text muted: #999999
- Border: #E8E0D5

CATEGORY COLOR SYSTEM (each category has its own color):
- Kepribadian: #6B4C9A (deep purple) / light: #EDE7F6
- Karir RIASEC: #2D6A4F (forest green) / light: #D8F3DC
- Finansial: #B5850B (amber gold) / light: #FFF8E1
- Gaya Belajar: #0077B6 (ocean blue) / light: #E0F4FF
- Attachment Sosial: #C1121F (deep rose) / light: #FFE5E5
- Kesejahteraan: #6B4C9A → #0077B6 gradient / light: #F0F0FF

TYPOGRAPHY:
- Display/Hero: "Press Start 2P" OR "VT323" (pixel font) — 
  ONLY for big titles, type codes, hero numbers
- Heading: "Crimson Text" bold — warm serif for section headers
- Body: "Inter" — clean, readable, 14-16px
- Caption/Label: "Inter" medium, uppercase, letter-spacing 0.08em

PIXEL ART ELEMENTS (use as decorative accents):
- Small stars: ✦ ✧ scattered in backgrounds
- Pixel dividers: row of small squares or dots
- Corner ornaments: pixel vine/crystal motifs, max 40px
- Small pixel art icons: 16x16px or 24x24px for category icons

COMPONENT STANDARDS:
- Border radius: 12px for cards, 8px for inputs, 24px for pills/badges
- Shadow: 0 2px 12px rgba(0,0,0,0.08) for cards
- Spacing unit: 8px base (8, 16, 24, 32, 48, 64)
- Button primary: #2D6A4F background, white text, 12px radius, 
  48px height, 16px horizontal padding
- Button secondary: transparent, #2D6A4F border and text
- Input: #FFFFFF background, #E8E0D5 border, 12px radius, 48px height

GUIDE CHARACTERS (10 total, pixel art sprites ~80x80px):
1. Wizard — wise, analytical, purple robe, staff with crystal
2. Angel — gentle, empathetic, white wings, soft glow
3. Elder Tree — ancient, calm, tree-humanoid, green and brown
4. Barbarian — direct, bold, red/brown armor, battle-worn
5. Werewolf — mysterious, intuitive, silver fur, moon symbol
6. White Knight — optimistic, noble, shining white armor
7. Qilin — spiritual, ethereal, Chinese mythical creature, golden
8. Ghost — melancholic, honest, translucent blue, floating
9. Griffin — ambitious, proud, eagle-lion hybrid, bronze
10. Golem — logical, precise, stone body, blue gem in chest

NAVIGATION (bottom bar, mobile):
5 items: Beranda | Perjalanan | Hasilku | Komunitas | Profil
Active: filled icon + label in #2D6A4F
Inactive: outline icon + label in #999999
Height: 64px, background white, top border #E8E0D5=== SCREEN 01: LANDING PAGE ===
Size: 390x844px (iPhone 14 Pro, scrollable)
No bottom nav on this screen.

ABOVE THE FOLD (390x844px, full viewport):
- Background: full bleed pixel art landscape illustration
  * Forest scene at dusk: purple-orange sky, silhouette of 
    ancient trees, distant castle/tower
  * Bottom 30% darker for text readability
  * Subtle animated particles: floating fireflies (3-4 dots)

- TOP BAR (44px height):
  * Left: "KnowYourself" in pixel font, white, 14px
  * Right: gear icon for settings, white

- CENTER CONTENT (vertical center of screen):
  * 10 guide character sprites arranged in semicircle 
    around campfire — campfire is the focal point
  * Campfire: glowing orange, subtle glow radius
  * Characters: 48x48px each, varied poses

- BOTTOM CONTENT (bottom 35%):
  * Gradient overlay: transparent to #1C3A2A
  * Title: "Perjalanan memahami dirimu dimulai di sini."
    Font: Crimson Text bold, 28px, white, left-aligned
  * Subtitle: "Biarkan Spirit Guide-mu membantumu menemukan 
    jati dirimu." — Inter 14px, white 80%, left-aligned
  * Counter badge: "✦ 2,341 jiwa sudah menemukan dirinya"
    Small pill, #C9A84C background, dark text, pixel star icon
  * CTA buttons (2, side by side):
    Primary: "Mulai Perjalanan" — #2D6A4F, full saturation
    Secondary: "Tentang KnowYourself" — white border, transparent

SCROLL SECTION 1 — HOW IT WORKS (below fold):
- White background section
- Section label: "BAGAIMANA CARA KERJANYA" — pixel style, green
- 3 steps in vertical cards:
  Step 1: Icon (compass pixel art) + "Pilih Area & Guide" + desc
  Step 2: Icon (scroll pixel art) + "Jawab Pertanyaan" + desc  
  Step 3: Icon (crystal ball pixel art) + "Temukan Dirimu" + desc
- Each card: white, 12px radius, left accent bar in #C9A84C

SCROLL SECTION 2 — 6 CATEGORY PREVIEW:
- Background: #F0EBE3
- Title: "6 Kategori Eksplorasi"
- 2x3 grid of category cards:
  Each card (156px wide, 80px tall):
  * Left: category color background 40px square, pixel icon center
  * Right: category name bold + teaser "→"
  * Border: 1px solid category light color

SCROLL SECTION 3 — SOCIAL PROOF:
- White background
- "Apa kata mereka?" section
- 2 quote cards from fictional users with pixel avatars
- Each quote: 3 star ratings + 2-line quote + name + university

FOOTER:
- Dark background #1C3A2A
- Logo + tagline left
- "Made with ♥ by Pragmata Studio — ITEBA 2026" center
- Small links: Tentang | Privasi | Kontak — muted green text=== SCREEN 02: PILIH AREA (CATEGORY SELECTION) ===
Size: 390x844px, scrollable content

HEADER:
- Back arrow left
- Title "Pilih Area" center, Crimson Text 20px bold
- Subtitle "Pilih satu atau lebih kategori yang ingin kamu jelajahi"
  Inter 13px, #555555, center

PROGRESS INDICATOR:
- 5 dots below header: Step 1 active (filled), rest outline
- "Langkah 1 dari 5" caption below dots

CATEGORY GRID (main content):
- 2-column grid, 16px gap
- Each category card (168px wide, 120px tall):
  
  UNSELECTED STATE:
  * White background, #E8E0D5 border 1px, 12px radius
  * Top: pixel art icon (48x48px) in category light color circle
  * Category name: Crimson Text 15px bold, #1A1A1A
  * Brief description: Inter 12px, #555555, 2 lines max
  * Small "→" arrow bottom right, muted

  SELECTED STATE:
  * Category light color background (e.g. #EDE7F6 for Kepribadian)
  * Category color border 2px
  * Checkmark badge top-right: category color circle, white ✓
  * Category name: category color
  * Scale: slightly larger (transform scale 1.02)
  * Subtle shadow: 0 4px 16px rgba(category color, 0.2)

6 CATEGORIES IN ORDER:
Row 1: [🎯 Kepribadian] [💼 Karir RIASEC]
Row 2: [💸 Finansial] [🧠 Gaya Belajar]  
Row 3: [💞 Attachment Sosial] [🧘 Kesejahteraan]

ESTIMATED TIME BADGE:
- Below grid, centered
- Pill shape, #F0EBE3 background
- Clock icon + "Estimasi waktu: ~18 menit" (updates dynamically)
- Each category = ~3 menit added to estimate

BOTTOM ACTION:
- Fixed bottom bar (above nav):
  * "X kategori dipilih" counter — animated number
  * "Lanjut →" button — disabled gray if 0 selected, 
    #2D6A4F green if 1+ selected
  * Full width button, 48px height=== SCREEN 03: GENDER/IDENTITY SELECTION ===
Size: 390x844px

HEADER: Same pattern as Screen 02
Title: "Siapa kamu?"
Subtitle: "Pilih gender atau identitas dirimu"
Progress: Step 2 of 5

CONTENT (vertically centered, lots of breathing room):

INSTRUCTION TEXT:
"Ini membantu kami menyesuaikan avatar dan cara 
penyampaian hasil untukmu."
Inter 14px, #555555, center, max-width 300px

SELECTION CARDS (3 options, stacked vertically with gap):
Each card: 340px wide, 96px tall, center-aligned

MALE CARD:
- Left 96px: character pixel art (green-haired male RPG character,
  80px, in light blue circle background)
- Right content: "Laki-laki" bold 18px + "He/Him" muted 13px
- Selected: green border 2px + light green bg + checkmark

FEMALE CARD:
- Left 96px: character pixel art (orange-haired female RPG character,
  80px, in light pink circle background)  
- Right content: "Perempuan" bold 18px + "She/Her" muted 13px

SPIRIT CARD:
- Left 96px: ghost/spirit pixel art character (translucent, 
  ethereal, in light purple circle)
- Right content: "Spirit" bold 18px + 
  "Prefer not to say" muted 13px italic

REASSURANCE NOTE:
Below cards, small text:
"✦ Pilihan ini tidak mempengaruhi hasil tes psikologimu"
Muted green color, 12px, center

BOTTOM: "Lanjut →" button, full width=== SCREEN 04: SPIRIT GUIDE SELECTION ===
Size: 390x844px, scrollable

HEADER:
Title: "Pilih Spirit Guide-mu"
Subtitle: "Mereka akan menemanimu sepanjang perjalanan ini"
Progress: Step 3 of 5

GUIDE GRID:
- 5 columns x 2 rows = 10 guide cards
- Each guide card: 62px wide, 80px tall
  
  UNSELECTED:
  * Pixel art sprite (48x48px) centered
  * Name below: 9px Inter, #555555
  * Subtle border on hover

  SELECTED:
  * Gold border 2px (#C9A84C)
  * Gold glow: box-shadow 0 0 12px rgba(201,168,76,0.5)
  * Name: bold, #C9A84C color
  * Small crown/star icon above character

GUIDE DETAIL PANEL (appears below grid when one is selected):
- Animated slide-down, 280ms ease
- Card: white, 12px radius, full width
- Layout: left 72px avatar | right content
  * Avatar: larger version (64x64px) of selected guide
  * Guide name: Crimson Text 18px bold, guide's theme color
  * Title: e.g. "Si Penyihir" — italic, muted
  * Description: 2-3 lines about guide's personality and style
    e.g. "Bijaksana dan analitis. Wizard akan membantumu 
    menemukan pola tersembunyi di balik setiap jawabanmu."
  * "Gaya komunikasi:" label + 3 trait pills
    e.g. [Filosofis] [Metaforik] [Mendalam]
  * Small quote in italic: guide's signature phrase

GUIDE ROSTER ORDER (5 per row):
Row 1: Wizard | Angel | Elder Tree | Barbarian | Werewolf
Row 2: White Knight | Qilin | Ghost | Griffin | Golem

BOTTOM: "Mulai Perjalanan! →" — gold/green gradient button=== SCREEN 05: GUIDE WELCOME SCREEN ===
Size: 390x844px, no scroll

FULL SCREEN background: pixel art landscape scene
(matches landing but different time of day — early morning,
soft blue-pink sky, mist near ground)

CONTENT BOX (bottom 55% of screen):
- Rounded top corners (24px), white background
- This slides up from bottom on screen enter

GUIDE DISPLAY (above content box, overlapping):
- Guide character sprite (120x120px) centered
  standing at the edge between landscape and box
- Subtle entrance animation: float up from below

CONTENT BOX INTERIOR:
- Guide name in gold pill badge: "✦ Wizard"
- Speech bubble / dialogue box (pixel art border style):
  * Wooden frame or stone frame aesthetic
  * Typewriter text animation (character by character):
    "Hei! Aku Wizard, si Penyihir. ✨
     Aku akan membantumu menggali potensi 
     tersembunyimu sepanjang perjalanan ini.
     Siap memulai petualanganmu?"
  * Blinking cursor at end while typing
  * Pixel art "▼" indicator at bottom when text complete

GUIDE PERSONALITY PREVIEW:
- Below dialogue box
- "Gaya bimbinganku:" label
- 3 small trait chips in guide's theme color

BUTTONS:
- Primary: "Siap! Mulai →" (guide's theme color)
- Secondary text link: "Ganti Guide" — small, muted=== SCREEN 06: QUIZ — MULTIPLE CHOICE ===
Size: 390x844px

BACKGROUND:
- Pixel art landscape (same series as welcome, midday now)
- Bottom 65% covered by quiz panel (white, rounded top 24px)

PROGRESS BAR (inside landscape area, top):
- Category name: "Kepribadian" — white, pixel font 12px
- Hearts: ♥♥♥ (3 hearts = lives/progress indicator)
  Remaining hearts: filled red, used: outline gray
- Fraction: "3 / 12" — white, Inter 13px
- Linear progress bar: thin, category color fill, gray track

GUIDE PRESENCE:
- Guide sprite (56x56px) bottom-left of landscape section
- Small speech bubble with CURRENT REACTION to question
  (changes based on which question — guide comments)
  e.g. for introspective question: 
  "Pikirkan baik-baik..." (Wizard thoughtful expression)

QUIZ PANEL (white section):
- Question text: Crimson Text 17px, #1A1A1A, top of panel
  "Saat menghadapi masalah mendadak, aku cenderung..."
  
- ANSWER OPTIONS (4 options, A B C D):
  Each option card: full width, min 64px tall, white background
  
  UNSELECTED:
  * Left: letter badge (A/B/C/D) — 32x32px circle, 
    category light color bg, category color text, bold
  * Right: option text, Inter 14px, #1A1A1A
  * Border: 1px #E8E0D5, 12px radius

  SELECTED:
  * Left: letter badge — category color bg, white text
  * Border: 2px category color
  * Background: category light color (very subtle)
  * Animated: brief scale pulse on select

- BOTTOM NOTE (below options):
  Small italic muted text:
  "Tidak semua jawaban harus menyenangkan.
   Pilih yang paling mencerminkan dirimu." 

NAVIGATION:
- Two buttons at very bottom:
  Left: "← Kembali" ghost button, muted
  Right: "Lanjut →" filled button, category color
  Disabled state for Lanjut if no option selected=== SCREEN 07: QUIZ — LINEAR SCALE (BATCH) ===
Size: 390x844px, SCROLLABLE (10 statements per page)

BACKGROUND: Same landscape but misty/afternoon
Progress bar same pattern as Screen 06

QUIZ PANEL:
- Page title: "Rate seberapa kamu setuju:" — 
  Inter 13px bold, #555555, below panel top

STATEMENT + SLIDER ROWS (10 per page):
Each row (full width, ~72px tall):
- Statement text: Inter 14px, #1A1A1A, 
  left-aligned, 2 lines max, padding 16px
- Slider below statement:
  * Track: 8px height, rounded, #E8E0D5 background
  * Fill: category color gradient
  * Thumb: 24x24px circle, white with category color border,
    subtle shadow, draggable
  * Number labels: 1 and 10, small, muted, below track ends
  * Current value bubble: appears above thumb when dragging,
    category color background, white number text
  * Default: thumb at center (5)
- Thin separator line between rows: #E8E0D5

SCALE LABELS (once at top of all sliders):
"Sangat tidak setuju 1 ←——————→ 10 Sangat setuju"
Inter 11px, #999999

GUIDE COMMENT (after sliding any item):
- Small toast notification slides from bottom:
  Guide sprite 24px + short reaction text
  Disappears after 2 seconds
  e.g. "Menarik pilihanmu... ✦" (Wizard)

NAVIGATION:
- Sticky bottom: "← Kembali" | "Lanjut →" buttons
- Lanjut disabled if any slider untouched (still at exact 5)
  OR add "Semua sudah dijawab ✓" indicator when complete=== SCREEN 08: QUIZ — FORCED CHOICE ===
Size: 390x844px

Background + progress: same pattern

QUIZ PANEL:
- Question text: Crimson Text 17px, centered
  "Dalam situasi sulit, aku lebih sering..."

- TWO CHOICE CARDS (side by side, equal width):
  Each card: (170px wide, 160px tall)
  
  LEFT CARD UNSELECTED:
  * White background, #E8E0D5 border 1px, 12px radius
  * Icon: pixel art illustration relevant to choice (56x56px)
    centered top portion
  * Choice text: Inter 14px bold, center, 2-3 lines max
    e.g. "Tetap fokus dan cari solusi"
  
  RIGHT CARD UNSELECTED:
  * Same structure
  * e.g. "Mengikuti perasaan dan intuisi"

  SELECTED STATE (either card):
  * Category color border 2px
  * Category light color background  
  * Scale up slightly (transform scale 1.03)
  * Subtle glow shadow
  * Other card: opacity 0.6, slightly scaled down

  VS INDICATOR (center between cards):
  * Circle badge with "VS" text
  * Gold color, 32px diameter
  * When one is selected: changes to small ✓ and ✗

- GUIDE WHISPER (below cards):
  Small italic text in guide's voice:
  "Tidak ada jawaban benar atau salah.
   Pilih yang paling jujur untukmu." 
  Guide sprite 20px + text

NAVIGATION: same pattern=== SCREEN 09: QUIZ — RANKING ===
Size: 390x844px

Background + progress: same pattern
Question: "Urutkan hal berikut dari yang paling penting (1) 
hingga paling kurang penting (4)."

RANKING ITEMS (4-6 items, draggable list):
Each item row: full width, 64px tall

ITEM CARD:
- Left: rank number badge (current position)
  32x32px circle, gold/amber color, bold number
- Center: item text, Inter 15px bold, #1A1A1A
- Right: drag handle icon (⠿ or ≡), #CCCCCC, 24px

DRAG STATE:
- Lifted: shadow increases, slight rotation 2deg
- Drop zone: highlighted with dashed border
- Reorder animation: smooth 200ms transition

POSITION FEEDBACK:
- Number badges update live as items are reordered
- Brief color flash on badge when number changes

INSTRUCTION MICRO-COPY:
"✦ Seret untuk mengurutkan" in muted text below items
Disappears after first drag interaction

GUIDE COMMENT: same pattern as other quiz types=== SCREEN 10: QUIZ — ESSAY (AI PROCESSED) ===
Size: 390x844px

This appears as the LAST question of whichever 
category has an essay question.

Background: slightly darker, more intimate atmosphere

GUIDE FULL PRESENCE:
- Guide sprite larger (80x80px), left side
- Guide has "thinking" expression
- Dialogue box above guide:
  "[Guide name] ingin mendengarmu..."

ESSAY PROMPT:
- Large, warm typography, Crimson Text 20px, centered
  e.g. "Ceritakan satu momen ketika kamu merasa 
       paling 'menjadi dirimu sendiri.'"

- Context note below prompt:
  "Tulis dengan bebas — 2 hingga 5 kalimat sudah cukup.
   AI kami akan menemukan pola tersembunyi dalam ceritamu."
  Italic, muted, 13px

TEXT AREA:
- Full width, min 160px tall (expands with content)
- Background: slightly warm white #FFFDF8
- Border: 1px #E8E0D5, focus: category color border
- Placeholder: italic, muted:
  "Tulis di sini... jangan takut jujur."
- Character counter bottom-right: "0 / 500"
  Changes color: muted → green as user types

AI PROCESSING NOTE:
Small info box below textarea:
🔒 icon + "Jawabanmu dianalisis secara anonim oleh AI 
dan tidak disimpan dalam format yang dapat diidentifikasi."

GUIDE REACTION (live, as user types):
Guide expression changes after ~50 chars typed:
- expression changes to "listening/nodding"
- Small bubble: "Teruskan..." 

SUBMIT: "Analisis Jawabanku →" — full width, category color=== SCREEN 11: LOADING SCREEN ===
Size: 390x844px, no interaction needed

BACKGROUND: 
- Dark, starry night pixel art scene
- Deep forest #0D1F14 with subtle stars
- Bottom: silhouette of ancient trees

CONTENT (centered vertically):

CRYSTAL BALL ANIMATION (200x200px center):
- Pixel art crystal ball on stone pedestal
- Ball: translucent sphere with swirling mist inside
- Mist animation: slow rotation, color shifts
  phase 1: purple mist (#6B4C9A)
  phase 2: green mist (#52B788)  
  phase 3: gold glow (#C9A84C)
- Outer glow: pulsing, matches mist color
- Pedestal: stone/rune carved, detailed pixel art

GUIDE WATCHING:
- Selected guide sprite (64x64px) 
  positioned to the right of crystal ball
- Guide animation: leaning forward, "watching intently"

PROCESSING TEXT (below crystal ball):
- Animated text that cycles every 1.5 seconds:
  Phase 1: "Menganalisis jawabanmu..." 
  Phase 2: "Menemukan pola tersembunyimu..."
  Phase 3: "Merangkai insight terbaik..."
  Phase 4: "Hampir selesai..."
- Font: Crimson Text italic, 16px, white 90%
- Fade transition between phases

PROGRESS BAR:
- Thin bar (260px wide), below text
- Animated fill: 0% to 100% over ~4 seconds
- Color: gold gradient, rounded ends
- Small pixel sparkle at the fill edge

PROCESSING CHECKLIST (appears one by one):
✓ Memahami kepribadianmu
✓ Mencari pola terbaikmu  
✓ Merangkai insight terbaik
○ Hampir selesai...
- Each item fades in sequentially
- White text, 13px, left-aligned, max-width 260px

BOTTOM QUOTE:
- Guide's pixel sprite tiny (32px) + italic quote
  "Setiap jawaban adalah cermin yang lebih jelas..." — Wizard
- Fades in at 70% loading progress=== SCREEN 12: HASIL OVERVIEW ===
Size: 390x844px, scrollable

HERO SECTION (280px tall, not scrollable):
- Background: gradient, Kepribadian color to transparent
  overlaid on blurred pixel art forest scene
- User's avatar (120x120px) — pixel art, customized
  position: bottom center of hero, overlapping panel below
- Personality type: "INFJ-A" — Press Start 2P font, 
  36px, white, centered
- Type name: "The Counselor" — Crimson Text italic 18px, 
  white 80%, centered
- Guide sprite (40px) bottom-right hero with happy expression
- Confetti animation: pixel art stars/sparkles raining down,
  category colors, 2 second burst then stops

CELEBRATION HEADER:
- Just below hero overlap area:
  "Selamat! Kamu adalah..." — Inter 13px, #555555, center

SCROLL CONTENT:
TAB BAR (sticky below hero):
- Tabs: "Ringkasan" | "Per Kategori" | "Saran"
- Style: pill tabs, active = #2D6A4F bg white text,
  inactive = transparent #555555 text
- Scroll behavior: tabs stick below hero when scrolling

=== RINGKASAN TAB ===

HEXAGON RADAR CHART (240x240px, centered):
- 6 axes for 6 categories
- Polygon fill: category gradient, 30% opacity
- Polygon stroke: #2D6A4F 2px
- Axis labels: category name + score (e.g. "Kepribadian 85")
- Dot at each vertex: 8px filled circle, category color
- Background: subtle grid lines, #E8E0D5

RESULT SUMMARY CARDS (below chart):
6 mini cards in 2-column grid:
Each (168px wide, 72px):
- Left 8px: vertical bar in category color
- Category icon (pixel, 24px) in circle
- Category name: 11px bold, category color  
- Result: 14px bold, #1A1A1A
  e.g. "INFJ-A" / "Visual Learner" / "Secure"
- White background, subtle shadow

GUIDE SUMMARY MESSAGE:
- Full width card, guide's theme color border
- Guide sprite 48px left + narrative 2 lines
  Connecting patterns across all 6 results
  e.g. "Aku melihat pola menarik — kamu seorang 
  pemikir mendalam yang justru haus koneksi.
  Ini bukan kontradiksi — ini kamu."

=== PER KATEGORI TAB ===
6 expandable accordion cards:
Each card collapsed: category color left border,
icon + name + result + expand arrow
Expanded: shows dimension bars + 3-line summary

=== SARAN TAB ===
QUEST CARD from Guide:
- Card with guide's illustration (larger, 80px)
- "Quest dari [Guide Name]:" header in gold
- Quest description: italic, warm
- "7 Hari Tantangan" — specific actionable task
- [Mulai Quest] button + [Lewati] text link

3 QUICK TIPS:
- Each tip: colored left border, bold action + 1 sentence=== SCREEN 13: HASIL DETAIL — PER CATEGORY ===
Size: 390x844px, scrollable
(This screen repeats for each of the 6 categories)

HEADER:
- Back arrow: "← Hasilku"  
- Category name + icon centered
- Category color accent

HERO CARD (full width, category gradient bg, 200px):
- Type code: Press Start 2P 28px, white
  e.g. "INFJ-A" / "Visual" / "Secure"
- Type name: Crimson Text italic 18px, white 80%
  e.g. "The Counselor" / "Visual Learner" / "Secure Attachment"
- Guide sprite (40px) with speech bubble:
  1-line guide reaction specific to THIS result

TAB BAR: "Ringkasan" | "Detail" | "Saran"

=== RINGKASAN TAB ===

DIMENSION VISUALIZATION:
(varies by category)
- Kepribadian: Radar chart with 8 dimensions (E/I, N/S, T/F, J/P, O, C, A, N)
- Karir: Horizontal bar chart for 6 RIASEC codes
- Finansial: 4 quadrant map (Avoidance vs Worship, Vigilance vs Impulsive)
- Gaya Belajar: Donut/pie chart for V/A/R/K percentages
- Attachment: 2x2 quadrant plot (Anxiety vs Avoidance axes) 
  with user's dot position marked
- Kesejahteraan: Stress meter (gauge/dial) + value wheel

STRENGTH BADGES (below visualization):
Label: "Kekuatanmu ✦"
3 pills: category color bg, white text, ★ icon
e.g. [★ Empati Tinggi] [★ Pendengar Baik] [★ Visioner]

CHALLENGE ITEMS:
Label: "Tantanganmu"
2-3 items with ⚡ icon, brief text
e.g. "⚡ Terlalu memikirkan orang lain"

=== DETAIL TAB ===
AI NARRATIVE (3-4 paragraphs):
- Each paragraph separated by pixel divider line
- First word of each paragraph: large drop cap in category color
- Pull quote (most impactful sentence):
  highlighted box, category light bg, italic Crimson Text 17px,
  left border 4px category color

GUIDE INSIGHT BOX:
- After narrative
- Guide sprite + "Dari sudut pandang [Guide]:" header
- Guide's unique perspective on this result (different phrasing
  based on chosen guide — same data, different voice)

=== SARAN TAB ===
3 ACTIONABLE TIP CARDS:
Each (full width):
- Icon in category color circle (32px)
- Bold action header: verb-first e.g. "Coba metode Cornell Notes"
- 1-2 sentence explanation
- "Pelajari lebih →" text link, muted

RESOURCE RECOMMENDATIONS:
- "Untuk tipe sepertimu:" label
- 2-3 resource pills: [📚 Buku] [🎧 Podcast] [📱 App]
  Tappable, links to recommendation=== SCREEN 14: AVATAR CUSTOMIZATION ===
Size: 390x844px

HEADER:
- "Wujudkan Dirimu" title, Crimson Text 22px
- "Kustomisasi Avatar" subtitle, 13px muted

AVATAR PREVIEW (centered, 200px circle):
- White background circle with soft shadow
- Pixel art avatar: all layers stacked (body + hair + face + outfit + accessory)
- Subtle animated idle: slight bob up-down, 2px, slow
- Background of circle: category color gradient (based on personality result)
- Rotating sparkle decoration around circle

LAYER TABS (horizontal scroll):
4 tabs: [Rambut] [Wajah] [Outfit] [Aksesori]
- Pill style tabs
- Active: #2D6A4F bg, white text
- Under each tab: number of options available

OPTION GRID:
- 4-column grid of thumbnail options
- Each thumbnail: 64x64px, rounded 8px
- Unselected: white bg, #E8E0D5 border
- Selected: category color border 2px, light color bg
- Option contains pixel art preview of that part

COLOR PALETTE (for items that have color variants):
- Below grid when color variants exist
- Row of 8 color circles (24px each)
- Selected color: checkmark overlay

SAVE BUTTON:
- "Simpan Avatar" — full width, #2D6A4F
- Below: small text "Avatar akan muncul di kartu hasilmu"=== SCREEN 15: SHARE CARD & CONFIGURATION ===
Size: 390x844px, scrollable

HEADER: "Bagikan Hasilmu"
Subtitle: "Pilih informasi yang ingin dibagikan"

CARD TYPE SELECTOR:
- Horizontal scroll of card type options:
  
  [Soul Card] — "Semua dalam 1" — RECOMMENDED badge
  [Per Kategori] — "6 kartu terpisah"  
  [Kompatibilitas] — "Dengan temanmu"
  
  Each option: pill with icon, 
  active: green bg white text, inactive: outline

SOUL CARD PREVIEW (main preview area):
- Scale: approximately 70% of actual size
- Actual card is 1080x1080px, preview ~273x273px
- Rounded 12px, subtle shadow
- Card content (miniaturized):
  * Dark forest green background
  * User's pixel avatar centered
  * "INFJ-A" in pixel font
  * "The Counselor" italic below
  * 2x3 grid of mini result chips
  * Guide name + hashtag bottom

FRAME SELECTOR:
"Pilih Desain Kartu:"
3 frame thumbnail options (horizontal):
- Frame 1: Floral/vines corner ornaments (warm)
- Frame 2: Crystal geometric (cool)  
- Frame 3: RPG ornament (golden)
Each: 80x80px preview thumbnail, border on selected

SHARE OPTIONS TOGGLE:
Checklist of what to include:
☑ Tipe Kepribadian (INFJ-A)
☑ Deskripsi Singkat  
☑ Semua 6 Kategori
☑ Kekuatan Utama
☐ Saran Pengembangan

BOTTOM ACTION BAR:
- "Buat & Bagikan" CTA button — full width, #2D6A4F
- Below: row of social icons: [Instagram] [WhatsApp] [Twitter] 
  [Salin Link] [Lainnya]
  Each 40x40px, outline style=== SCREEN 16: COMPATIBILITY / SOUL RESONANCE ===
Size: 390x844px, scrollable

ENTRY STATE (no code entered yet):
- Illustration: two pixel art silhouettes facing each other
  with question mark between them
- Title: "Kecocokan Kalian" — Crimson Text 22px
- Input field: "Masukkan kode temanmu..."
  With pixel art magnifying glass icon
- "Atau bagikan kodemu:" section
  Code display: "KYS-A1B2" in large monospace font
  Copy button right of code
  Share button below

RESULT STATE (after valid code entered):

HERO COMPATIBILITY SECTION:
- Two avatars side by side (80px each)
  LEFT: User's avatar + name + personality type below
  RIGHT: Friend's avatar + name + personality type below
  CENTER: Large "82%" in Press Start 2P font, 
          warm gold color, glow effect
          Heart pixel art below percentage
          "Soul Resonance" label, small muted

CONNECTION VISUAL:
- Animated thread/energy connecting the two avatars
- Thread color based on percentage:
  80%+: gold sparkle, animated glitter
  60-79%: silver shimmer
  40-59%: blue steady glow
  <40%: purple, "different but complementary"

COMPATIBILITY BREAKDOWN:
3 progress bars with labels:
- Adventure Synergy: pixel bar, amber color, percentage
- Emotional Harmony: pixel bar, pink color, percentage
- Growth Potential: pixel bar, green color, percentage

GUIDE MESSAGE:
- Guide sprite (48px) with speech bubble
- Personalized message based on both personality combinations
  e.g. "Kalian seperti api dan angin — berbeda,
        tapi saling menguatkan satu sama lain."

TIPS SECTION:
- "Tips Kolaborasi Kalian:" header
- 2-3 specific tips based on combined profile
- Each: icon + bold tip + 1 sentence

BOTTOM: 
- "Bagikan Kecocokan Ini" button
- Small: "← Kembali ke Hasilku"=== SCREEN 17: COMMUNITY HUB ===
Size: 390x844px, scrollable

HEADER:
- "Komunitas" title
- Live indicator: green dot + "2,341 petualang aktif hari ini"

TAB BAR: [Beranda] [Ranking] [Aktivitas]

=== BERANDA TAB ===

HERO STATS BANNER:
- Dark green background, rounded 16px
- Two large numbers side by side:
  LEFT: "2,341" (searchers today) + "Pencari hari ini"
  RIGHT: "12,876" (total) + "Total petualang"

TODAY'S INSIGHT CARD:
- Category color rotating (changes daily)
- "Insight Hari Ini" label + category icon
- Main insight: italic quote from collective data
  e.g. "Hari ini, 67% petualang memiliki tipe Visual Learner.
        Kamu tidak sendirian dalam cara belajarmu!"
- Small guide sprite at corner

TOP TYPES THIS WEEK:
- "Tipe Kepribadian Terbanyak" header
- Horizontal bar chart (simple, pixel art style):
  INFJ: ████████ 30%
  INFP: ██████ 18%
  INTJ: █████ 16%
  ENFP: ████ 12%
  Lainnya: ████ 24%
- Category color (purple for personality)

CATEGORY DISTRIBUTION CARDS:
Horizontal scroll of 6 mini cards:
Each shows top result for that category today

DAILY QUOTE:
- Bottom of beranda tab
- Pixel ornament border
- "Kutipan Hari Ini" in gold
- Quote text: Crimson Text italic 16px
  Rotating daily guide quotes

=== RANKING TAB ===
Leaderboard of most common type combinations
Numbered list with pixel rank badges (🥇🥈🥉)

=== AKTIVITAS TAB ===
Recent activity feed:
- "X petualang baru menemukan dirinya [time] lalu"
- Anonymized, no personal data shown
- Guide icon of the guide they used

BOTTOM NAV: active on Komunitas tabDesign a "Soul Card" shareable image for KnowYourself app.

SPECS: 1080x1080px PNG, also 1080x1920px story version

BACKGROUND:
- Deep forest gradient: #0D1F14 (top) to #1C3A2A (bottom)
- Subtle pixel art stars scattered (white dots, varying opacity)
- Very faint landscape silhouette at bottom (trees, 10% opacity)

CORNER ORNAMENTS:
- All 4 corners: pixel art vine/crystal design, 80x80px each
- Color: gold #C9A84C at 60% opacity

TOP SECTION (0-15% height):
- Left: "KnowYourself" in pixel font, #C9A84C gold, 14px
- Right: guide name + tiny guide sprite 24px
  e.g. "Pemandu: Wizard ✦"

AVATAR SECTION (15-45% height):
- Centered: pixel art avatar in glowing circle
- Circle: 200px diameter, category color glow
  box-shadow: 0 0 40px rgba(category color, 0.6)
- Avatar: user's customized character, 160px

RESULT SECTION (45-65% height):
- Type code: Press Start 2P font, 40px, white
  e.g. "INFJ-A"
- Glow behind text: category color, blur 20px, 40% opacity
- Type name: Crimson Text italic 22px, #C9A84C gold
  e.g. "The Counselor"

STATS GRID (65-85% height):
- 2x3 grid of result chips
- Each chip: rounded 8px, rgba(255,255,255,0.08) bg (glass),
  white border 0.5px opacity
- Left of chip: category color dot 8px
- Category name: 9px, white 50%
- Result: 11px bold, white 90%
  [● INFJ-A] [● Artistic]
  [● Planner] [● Visual]  
  [● Secure] [● Balanced]

BOTTOM (85-100%):
- Thin pixel divider line: gold dots
- Guide quote: Crimson Text italic 13px, white 70%
  "Setiap langkah kecil dalam memahami diri adalah..."
- Hashtag: Inter 11px, white 40%
  "#KnowYourselfJourney"Design a category-specific result card for KnowYourself.
Create 6 variations, one per category.

SPECS: 1080x1350px PNG (4:5 Instagram ratio)

EXAMPLE: KEPRIBADIAN card (adapt colors for other categories)

BACKGROUND: Deep purple gradient #2A0A3A → #4A1A6B

HEADER (0-12%):
- Category icon (brain pixel art) in gold circle, left
- "KEPRIBADIAN" all caps, pixel font, gold, center
- "KnowYourself" small wordmark, right, white 50%

HERO (12-50%):
- TYPE CODE: Press Start 2P font, 56px, white
  "INFJ-A" with gold glow behind
- TYPE NAME: Crimson Text italic 24px, gold
  "The Counselor"
- CONSTELLATION VISUAL: 
  4 axes of MBTI as star map
  Introvert ●————————● Extravert
  User's position marked with bright star
  Lines connect the 4 position stars
  Background stars: scattered, low opacity

DIMENSION BARS (50-75%):
4 bars for main dimensions:
Label left (muted) | Bar (category gradient) | % right
Introvert: ████████░░ 78%
Intuitive: █████████░ 85%
Feeling:   ████████░░ 82%
Judging:   ███████░░░ 66%
Bar style: pixel art (segmented, each segment 8px wide)

GUIDE INSIGHT (75-90%):
Guide sprite 48px | "Wizard:" bold |
"Kamu melihat dunia dalam pola —
itu kekuatanmu yang tersembunyi."
Background: rgba(white, 0.06)

BOTTOM (90-100%):
Hashtag + category-specific hashtag
"#KnowYourselfJourney #MBTIIndonesia"