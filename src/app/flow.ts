export type Gender = "male" | "female" | "spirit";

export const GUIDES = [
  { id: "vampire", emoji: "🧛", name: "Diablo", title: "Sang Vampire", color: "#8B0000", bgGradient: "linear-gradient(135deg, #FFF0F0 0%, #FFD6D6 100%)", traits: ["Filosofis", "Metaforik", "Mendalam"], desc: "Elegan dan analitis. Diablo akan membantumu menemukan pola tersembunyi di balik setiap jawabanmu.", quote: "Setiap jawaban adalah cermin yang lebih jelas...", typings: { mbti: "INTJ", riasec: "Investigative", financial: "Vigilant", learning: "Read/Write", attachment: "Secure (Autonomous)", wellbeing: "Self-Direction" }, quest: { title: "Observasi Senyap", desc: "Perhatikan satu detail kecil dari orang yang berinteraksi denganmu hari ini, simpan dalam hati." } },
  { id: "angel", emoji: "👼", name: "Seraphiel", title: "Sang Angel", color: "#C9A84C", bgGradient: "linear-gradient(135deg, #FFFCF5 0%, #FFF4D4 100%)", traits: ["Empati", "Lembut", "Menenangkan"], desc: "Hangat dan penuh empati. Seraphiel mendengar setiap sudut hatimu dengan lembut.", quote: "Kamu lebih baik dari yang kamu kira.", typings: { mbti: "ENFJ", riasec: "Social", financial: "Avoider", learning: "Auditory", attachment: "Secure (Loving)", wellbeing: "Benevolence" }, quest: { title: "Satu Kebaikan", desc: "Berikan satu pujian tulus pada seseorang hari ini tanpa mengharapkan balasan." } },
  { id: "tree", emoji: "🌳", name: "Oakhaven", title: "Sang Elder Tree", color: "#2D6A4F", bgGradient: "linear-gradient(135deg, #F0F7F4 0%, #D8F3DC 100%)", traits: ["Sabar", "Akar Kuat", "Tenang"], desc: "Tenang dan kokoh. Oakhaven mengajakmu berakar pada nilai sejatimu.", quote: "Tumbuh perlahan, tumbuh dalam.", typings: { mbti: "ISFJ", riasec: "Conventional", financial: "Planner", learning: "Kinesthetic", attachment: "Secure (Grounded)", wellbeing: "Tradition/Security" }, quest: { title: "Akar Kedamaian", desc: "Luangkan 10 menit duduk dalam diam, rasakan nafasmu dan keberadaanmu di saat ini." } },
  { id: "barbarian", emoji: "⚔️", name: "Ragnar", title: "Sang Barbarian", color: "#8B4513", bgGradient: "linear-gradient(135deg, #FDF8F5 0%, #F5E6DC 100%)", traits: ["Berani", "Jujur", "Apa Adanya"], desc: "Lugas dan berani. Ragnar menantangmu menghadapi diri tanpa filter.", quote: "Hadapi, jangan sembunyikan.", typings: { mbti: "ESTP", riasec: "Realistic", financial: "Spender", learning: "Kinesthetic", attachment: "Dismissive", wellbeing: "Stimulation" }, quest: { title: "Langkah Berani", desc: "Lakukan satu hal fisik yang sedikit membuatmu tidak nyaman namun memacu adrenalin positif." } },
  { id: "werewolf", emoji: "🐺", name: "Lycaon", title: "Sang Werewolf", color: "#5A6470", bgGradient: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)", traits: ["Intuitif", "Misterius", "Liar"], desc: "Misterius dan intuitif. Lycaon mengenalkanmu pada sisi liarmu yang jujur.", quote: "Dengarkan bisikan bulan dalam dirimu.", typings: { mbti: "INFP", riasec: "Artistic", financial: "Avoider", learning: "Visual", attachment: "Fearful-Avoidant", wellbeing: "Universalism" }, quest: { title: "Insting Liar", desc: "Tuliskan satu hal yang sebenarnya kamu inginkan saat ini tanpa mempedulikan opini orang lain." } },
  { id: "knight", emoji: "🛡️", name: "Aldrich", title: "Sang Knight", color: "#0077B6", bgGradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)", traits: ["Optimis", "Setia", "Mulia"], desc: "Optimis dan mulia. Aldrich memandumu dengan integritas.", quote: "Cahaya selalu menemukan jalannya.", typings: { mbti: "ESFJ", riasec: "Social", financial: "Vigilant", learning: "Auditory", attachment: "Secure (Protective)", wellbeing: "Conformity" }, quest: { title: "Sumpah Setia", desc: "Tepati satu janji kecil yang kamu buat pada dirimu sendiri hari ini, sekecil apapun itu." } },
  { id: "qilin", emoji: "🐉", name: "Qiuyue", title: "Sang Qilin", color: "#B5850B", bgGradient: "linear-gradient(135deg, #FFFDF0 0%, #FEF3C7 100%)", traits: ["Spiritual", "Anggun", "Bijak"], desc: "Spiritual dan anggun. Qiuyue membawamu ke kedalaman batin.", quote: "Ketenangan adalah kekuatan tertinggi.", typings: { mbti: "INFJ", riasec: "Artistic/Social", financial: "Balanced", learning: "Visual", attachment: "Secure", wellbeing: "Universalism" }, quest: { title: "Renungan Emas", desc: "Bacalah satu kutipan filosofis atau puisi, dan temukan bagaimana hal itu terhubung dengan hidupmu saat ini." } },
  { id: "ghost", emoji: "👻", name: "Ophelia", title: "Sang Ghost", color: "#9FB4D4", bgGradient: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)", traits: ["Melankolis", "Jujur", "Reflektif"], desc: "Melankolis namun jujur. Ophelia menemanimu menerima hal-hal yang sulit.", quote: "Bahkan bayangan punya cerita.", typings: { mbti: "INTP", riasec: "Investigative", financial: "Avoider", learning: "Read/Write", attachment: "Dismissive-Avoidant", wellbeing: "Self-Direction" }, quest: { title: "Merangkul Bayangan", desc: "Tulis satu kelemahan yang selama ini kamu tutupi, lalu maafkan dirimu karena memiliki kelemahan itu." } },
  { id: "griffin", emoji: "🦅", name: "Lilith", title: "Sang Griffin", color: "#C2410C", bgGradient: "linear-gradient(135deg, #FFF3E0 0%, #FFCC80 100%)", traits: ["Ambisius", "Bangga", "Berani"], desc: "Ambisius dan bangga. Lilith mendorongmu terbang lebih tinggi.", quote: "Langit bukan batas, tapi awal.", typings: { mbti: "ENTJ", riasec: "Enterprising", financial: "Status", learning: "Visual/Auditory", attachment: "Secure", wellbeing: "Achievement/Power" }, quest: { title: "Langit Tanpa Batas", desc: "Tetapkan satu target harian yang lebih tinggi dari biasanya, dan paksa dirimu untuk mencapainya." } },
  { id: "golem", emoji: "🗿", name: "Marrow", title: "Sang Golem", color: "#7A6B5D", bgGradient: "linear-gradient(135deg, #FAF8F5 0%, #E6E1DA 100%)", traits: ["Logis", "Presisi", "Kokoh"], desc: "Logis dan presisi. Marrow menyusun jawabanmu menjadi pola yang jelas.", quote: "Data tidak berbohong - tapi cerita di baliknya pun penting.", typings: { mbti: "ISTJ", riasec: "Conventional/Realistic", financial: "Vigilant", learning: "Read/Write", attachment: "Dismissive", wellbeing: "Security" }, quest: { title: "Struktur Fondasi", desc: "Susun jadwal harianmu esok hari dengan sangat presisi, lalu coba ikuti setepat mungkin." } },
];
export const GUIDE_BG: Record<string, string> = {
  "vampire": "/assets/bg/vampire_castle.png",
  "angel": "/assets/bg/bg_guide_angel_1783274235228.png",
  "tree": "/assets/bg/bg_guide_eldertree_1783274243784.png",
  "barbarian": "/assets/bg/bg_guide_barbarian_1783274254095.png",
  "werewolf": "/assets/bg/bg_guide_werewolf_1783274264145.png",
  "knight": "/assets/bg/bg_guide_knight_1783274280189.png",
  "qilin": "/assets/bg/bg_guide_qilin_1783274291050.png",
  "ghost": "/assets/bg/bg_guide_ghost_1783274301412.png",
  "griffin": "/assets/bg/bg_guide_griffin_1783274310978.png",
  "golem": "/assets/bg/bg_guide_golem_1783274319759.png",
};

export const CATEGORIES = [
  { id: "kepribadian", name: "Kepribadian", desc: "Pahami siapa dirimu", color: "#6B4C9A", light: "#EDE7F6" },
  { id: "karir", name: "Karir", desc: "Jalur karir terbaikmu", color: "#2D6A4F", light: "#D8F3DC" },
  { id: "finansial", name: "Finansial", desc: "Kebiasaan keuanganmu", color: "#B5850B", light: "#FFF8E1" },
  { id: "belajar", name: "Gaya Belajar", desc: "Cara terbaik menyerap ilmu", color: "#0077B6", light: "#E0F4FF" },
  { id: "attachment", name: "Attachment Sosial", desc: "Pola hubunganmu", color: "#C1121F", light: "#FFE5E5" },
  { id: "kesejahteraan", name: "Kesejahteraan", desc: "Keseimbangan mental", color: "#2A9D8F", light: "#E0F2F1" },
];

// ──────────────────────────────────────────────
// QUESTION TYPES
// ──────────────────────────────────────────────

export type QuizQ =
  | { type: "mc"; q: string; options: string[]; cat: string }
  | { type: "scale"; title?: string; statements: string[]; cat: string }
  | { type: "forced"; q: string; a: string; b: string; cat: string }
  | { type: "rank"; q: string; items: string[]; cat: string }
  | { type: "essay"; q: string; hint?: string; cat: string }
  | { type: "frequency"; title?: string; statements: string[]; cat: string };

// ──────────────────────────────────────────────
// ANSWER TYPES
// ──────────────────────────────────────────────

/** One answer entry per quiz page */
export type AnswerEntry = {
  type: QuizQ["type"];
  cat: string;
  mcSel?: number;
  scaleVals?: number[];
  forcedSel?: "a" | "b";
  rankOrder?: string[];
  essay?: string;
  freqVals?: number[];
};

export type QuizAnswers = AnswerEntry[];

// ──────────────────────────────────────────────
// GUIDE MATCHING (dimension-based)
// ──────────────────────────────────────────────

/**
 * Extracts personality dimension scores (0-1) from quiz answers.
 * Uses Kepribadian scale items as primary source.
 * Falls back to other categories for supplementary data.
 */
export function extractDimensions(answers: QuizAnswers): Record<string, number> {
  const dims: Record<string, number[]> = {
    extraversion: [],
    introversion: [],
    openness: [],
    conscientiousness: [],
    agreeableness: [],
    neuroticism: [],
    thinking: [],
    feeling: [],
    intuition: [],
    sensing: [],
    judging: [],
    perceiving: [],
  };

  for (const ans of answers) {
    // Kepribadian batch 1 (E/I items)
    if (ans.cat === "kepribadian" && ans.type === "scale" && ans.scaleVals) {
      const v = ans.scaleVals;
      if (v.length === 10) {
        // Batch 1: soal 1-10 (E, I, E, I, E, I, E, I, E, I)
        dims.extraversion.push(v[0] / 10, v[2] / 10, v[4] / 10, v[6] / 10, v[8] / 10);
        dims.introversion.push(v[1] / 10, v[3] / 10, v[5] / 10, v[7] / 10, v[9] / 10);
      } else if (v.length === 8) {
        // Batch 2: soal 11-18 (C, O, N, C, O, A/N, C, N/O)
        dims.conscientiousness.push(v[0] / 10, v[3] / 10, v[6] / 10);
        dims.openness.push(v[1] / 10, v[4] / 10, v[7] / 10);
        dims.neuroticism.push(v[2] / 10, v[5] / 10);
      }
    }

    // Kepribadian MC items
    if (ans.cat === "kepribadian" && ans.type === "mc" && ans.mcSel !== undefined) {
      // Soal 19: T(0), F(1), T+N(2), F+E(3)
      // Soal 20: J(0), P(1), N+I(2), P(3)
      // Soal 21: T(0), F(1), N(2), S+A(3)
      // Soal 22: J(0), P(1), I(2), E+P(3)
      // Soal 25: A(0), T-A(1), I-C(2), E-A(3)
      // Soal 26: A+F(0), C+A(1), -C(2), T+J(3)
      const s = ans.mcSel;
      if (s === 0) { dims.thinking.push(0.8); dims.judging.push(0.6); }
      if (s === 1) { dims.feeling.push(0.8); dims.perceiving.push(0.6); }
      if (s === 2) { dims.intuition.push(0.7); dims.introversion.push(0.5); }
      if (s === 3) { dims.extraversion.push(0.6); dims.agreeableness.push(0.6); }
    }

    // Kepribadian forced items
    if (ans.cat === "kepribadian" && ans.type === "forced" && ans.forcedSel) {
      if (ans.forcedSel === "a") {
        dims.sensing.push(0.8);
        dims.thinking.push(0.6);
      } else {
        dims.intuition.push(0.8);
        dims.feeling.push(0.6);
        dims.neuroticism.push(0.5);
      }
    }

    // Attachment data → supplements agreeableness & neuroticism
    if (ans.cat === "attachment" && ans.type === "scale" && ans.scaleVals) {
      const avg = ans.scaleVals.reduce((a, b) => a + b, 0) / ans.scaleVals.length / 10;
      if (ans.scaleVals.length === 9) dims.neuroticism.push(avg);  // Anxiety batch
      if (ans.scaleVals.length === 8) dims.introversion.push(avg); // Avoidance batch
    }

    // Karir data → supplements openness/extraversion
    if (ans.cat === "karir" && ans.type === "forced" && ans.forcedSel) {
      if (ans.forcedSel === "a") dims.extraversion.push(0.7);
      else dims.introversion.push(0.5);
    }

    // Kesejahteraan forced → supplements judging/perceiving
    if (ans.cat === "kesejahteraan" && ans.type === "forced" && ans.forcedSel) {
      if (ans.forcedSel === "a") dims.perceiving.push(0.7);
      else dims.judging.push(0.7);
    }
  }

  // Average each dimension, defaulting to 0.5
  const result: Record<string, number> = {};
  for (const [key, vals] of Object.entries(dims)) {
    result[key] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0.5;
  }
  return result;
}

/** Each guide's ideal dimension profile (0-1 scale) */
const GUIDE_PROFILES: Record<string, Record<string, number>> = {
  vampire:   { extraversion: 0.3, introversion: 0.8, openness: 0.9, conscientiousness: 0.6, agreeableness: 0.5, neuroticism: 0.3, thinking: 0.8, feeling: 0.4, intuition: 0.9, sensing: 0.2, judging: 0.5, perceiving: 0.6 },
  angel:     { extraversion: 0.5, introversion: 0.5, openness: 0.6, conscientiousness: 0.5, agreeableness: 0.95, neuroticism: 0.4, thinking: 0.3, feeling: 0.9, intuition: 0.6, sensing: 0.5, judging: 0.4, perceiving: 0.6 },
  tree:      { extraversion: 0.3, introversion: 0.7, openness: 0.4, conscientiousness: 0.8, agreeableness: 0.7, neuroticism: 0.15, thinking: 0.5, feeling: 0.5, intuition: 0.4, sensing: 0.7, judging: 0.8, perceiving: 0.2 },
  barbarian: { extraversion: 0.8, introversion: 0.2, openness: 0.7, conscientiousness: 0.3, agreeableness: 0.3, neuroticism: 0.3, thinking: 0.7, feeling: 0.4, intuition: 0.4, sensing: 0.7, judging: 0.3, perceiving: 0.8 },
  werewolf:  { extraversion: 0.3, introversion: 0.8, openness: 0.8, conscientiousness: 0.3, agreeableness: 0.4, neuroticism: 0.5, thinking: 0.4, feeling: 0.6, intuition: 0.9, sensing: 0.2, judging: 0.2, perceiving: 0.8 },
  knight:    { extraversion: 0.6, introversion: 0.4, openness: 0.6, conscientiousness: 0.8, agreeableness: 0.8, neuroticism: 0.2, thinking: 0.5, feeling: 0.6, intuition: 0.5, sensing: 0.5, judging: 0.7, perceiving: 0.3 },
  qilin:     { extraversion: 0.2, introversion: 0.8, openness: 0.7, conscientiousness: 0.6, agreeableness: 0.7, neuroticism: 0.2, thinking: 0.4, feeling: 0.7, intuition: 0.8, sensing: 0.3, judging: 0.5, perceiving: 0.5 },
  ghost:     { extraversion: 0.2, introversion: 0.9, openness: 0.6, conscientiousness: 0.4, agreeableness: 0.6, neuroticism: 0.8, thinking: 0.4, feeling: 0.7, intuition: 0.7, sensing: 0.3, judging: 0.3, perceiving: 0.7 },
  griffin:   { extraversion: 0.8, introversion: 0.2, openness: 0.7, conscientiousness: 0.7, agreeableness: 0.3, neuroticism: 0.3, thinking: 0.7, feeling: 0.4, intuition: 0.6, sensing: 0.5, judging: 0.6, perceiving: 0.5 },
  golem:     { extraversion: 0.2, introversion: 0.7, openness: 0.3, conscientiousness: 0.95, agreeableness: 0.4, neuroticism: 0.15, thinking: 0.9, feeling: 0.2, intuition: 0.3, sensing: 0.8, judging: 0.9, perceiving: 0.1 },
};

/** Reason templates keyed by top dimension matches */
const REASON_TEMPLATES: Record<string, string> = {
  extraversion: "Kamu punya energi sosial yang kuat",
  introversion: "Kamu kaya akan dunia internal",
  openness: "Kamu terbuka pada pengalaman baru",
  conscientiousness: "Kamu terstruktur dan disiplin",
  agreeableness: "Kamu penuh empati dan peduli",
  neuroticism: "Kamu punya kepekaan emosional yang mendalam",
  thinking: "Kamu mengambil keputusan dengan logika",
  feeling: "Kamu memproses dunia lewat perasaan",
  intuition: "Kamu peka terhadap pola dan makna tersembunyi",
  sensing: "Kamu menghargai fakta dan pengalaman nyata",
  judging: "Kamu menyukai keteraturan dan rencana",
  perceiving: "Kamu fleksibel dan spontan",
};

export type GuideMatch = {
  guideId: string;
  score: number;       // 0-100
  reasons: string[];   // alasan kecocokan
};

export function computeGuideMatch(answers: QuizAnswers): GuideMatch[] {
  const userDims = extractDimensions(answers);
  const results: GuideMatch[] = [];

  for (const guide of GUIDES) {
    const profile = GUIDE_PROFILES[guide.id];
    if (!profile) continue;

    // Compute cosine-like similarity across all dimensions
    let dotProduct = 0;
    let userMag = 0;
    let guideMag = 0;
    const dimDiffs: { dim: string; sim: number }[] = [];

    for (const dim of Object.keys(profile)) {
      const u = userDims[dim] ?? 0.5;
      const g = profile[dim];
      dotProduct += u * g;
      userMag += u * u;
      guideMag += g * g;
      dimDiffs.push({ dim, sim: 1 - Math.abs(u - g) });
    }

    const cosineSim = userMag > 0 && guideMag > 0
      ? dotProduct / (Math.sqrt(userMag) * Math.sqrt(guideMag))
      : 0.5;

    // Also compute average absolute similarity for a balanced score
    const avgSim = dimDiffs.reduce((s, d) => s + d.sim, 0) / dimDiffs.length;

    // Blend cosine similarity (direction) and absolute similarity (closeness)
    const blendedScore = cosineSim * 0.4 + avgSim * 0.6;
    const finalScore = Math.round(Math.min(98, Math.max(25, blendedScore * 100)));

    // Generate reasons from top 3 most similar dimensions
    dimDiffs.sort((a, b) => b.sim - a.sim);
    const reasons: string[] = [];
    for (let i = 0; i < Math.min(3, dimDiffs.length); i++) {
      const d = dimDiffs[i];
      if (d.sim >= 0.7) {
        const template = REASON_TEMPLATES[d.dim];
        if (template) reasons.push(`${template} - selaras dengan ${guide.name}`);
      }
    }

    if (reasons.length === 0) {
      reasons.push(`${guide.name} merasakan koneksi denganmu`);
    }

    results.push({ guideId: guide.id, score: finalScore, reasons });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export function computeMBTI(answers: QuizAnswers): string {
  const dims = extractDimensions(answers);
  const E = (dims.extraversion ?? 0.5);
  const I = (dims.introversion ?? 0.5);
  const S = (dims.sensing ?? 0.5);
  const N = (dims.intuition ?? 0.5);
  const T = (dims.thinking ?? 0.5);
  const F = (dims.feeling ?? 0.5);
  const J = (dims.judging ?? 0.5);
  const P = (dims.perceiving ?? 0.5);

  const mbti = 
    (E >= I ? "E" : "I") +
    (S >= N ? "S" : "N") +
    (T >= F ? "T" : "F") +
    (J >= P ? "J" : "P");

  return mbti;
}

export type Screen =
  | "landing"
  | "pilih"
  | "gender"
  | "guide"
  | "welcome"
  | "quiz"
  | "loading"
  | "hasil"
  | "koneksi"
  | "profil"
  | "perjalanan"
  | "guide-chat";
