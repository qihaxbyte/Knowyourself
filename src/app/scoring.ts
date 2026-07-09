/**
 * KnowYourself — Scoring Engine
 * Lumora Studio | ITEBA 2026
 *
 * Menghitung hasil tes untuk 6 kategori:
 *   1. Kepribadian (MBTI + Big Five)
 *   2. Karir (Holland RIASEC)
 *   3. Finansial (Klontz Money Script)
 *   4. Gaya Belajar (VARK)
 *   5. Attachment Sosial (ECR-S)
 *   6. Kesejahteraan (PSS-10 + Schwartz Values)
 */

import type { QuizAnswers, AnswerEntry } from "./flow";

// ──────────────────────────────────────────────
// SHARED TYPES
// ──────────────────────────────────────────────

export type CategoryResult = {
  categoryId: string;
  code: string;
  name: string;
  score: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  description: string;
  traits: string[];
};

export type AllResults = Record<string, CategoryResult>;

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────

function getAnswersByCat(answers: QuizAnswers, cat: string): AnswerEntry[] {
  return answers.filter((a) => a.cat === cat);
}

function avg(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// ──────────────────────────────────────────────
// 1. KEPRIBADIAN — MBTI + Big Five
// ──────────────────────────────────────────────

const MBTI_DATA: Record<string, { name: string; strengths: string[]; weaknesses: string[]; desc: string; traits: string[] }> = {
  INTJ: { name: "The Architect", strengths: ["Pemikir strategis", "Mandiri & percaya diri", "Visioner jangka panjang", "Analitis tajam"], weaknesses: ["Bisa terkesan dingin", "Perfeksionis berlebihan"], desc: "Kamu seorang pemikir strategis yang mandiri. Kamu melihat pola besar di balik detail kecil dan selalu punya rencana matang untuk masa depan.", traits: ["Strategis", "Mandiri", "Visioner", "Analitis"] },
  INTP: { name: "The Thinker", strengths: ["Kreativitas intelektual tinggi", "Logika mendalam", "Rasa ingin tahu tak terbatas", "Pemecah masalah unik"], weaknesses: ["Sering overthinking", "Kurang ekspresif secara emosi"], desc: "Kamu seorang pemikir kreatif yang haus pengetahuan. Dunia ide dan teori adalah taman bermainmu, dan kamu selalu mencari 'mengapa' di balik segalanya.", traits: ["Kreatif", "Logis", "Curious", "Inovatif"] },
  ENTJ: { name: "The Commander", strengths: ["Kepemimpinan natural", "Efisien & terorganisir", "Percaya diri dalam bertindak", "Ambisius & berani"], weaknesses: ["Bisa terlalu dominan", "Kurang sabar dengan ketidakefisienan"], desc: "Kamu seorang pemimpin alami yang ambisius. Kamu tahu apa yang kamu mau dan tidak ragu mengambil langkah besar untuk mencapainya.", traits: ["Pemimpin", "Ambisius", "Tegas", "Efisien"] },
  ENTP: { name: "The Debater", strengths: ["Ide orisinal tanpa batas", "Adaptif & fleksibel", "Komunikator cerdas", "Berani menantang status quo"], weaknesses: ["Mudah bosan dengan rutinitas", "Bisa terlalu argumentatif"], desc: "Kamu seorang inovator yang penuh energi. Kamu menikmati debat intelektual dan selalu menemukan cara baru untuk memecahkan masalah.", traits: ["Inovatif", "Cerdas", "Adaptif", "Berani"] },
  INFJ: { name: "The Counselor", strengths: ["Empati mendalam", "Visioner & idealis", "Intuitif membaca orang lain", "Berkomitmen pada nilai"], weaknesses: ["Terlalu sensitif", "Sering mengorbankan diri sendiri"], desc: "Kamu seorang idealis empatis yang menginspirasi. Kamu memahami orang pada level yang mendalam dan selalu berusaha membuat dunia lebih baik.", traits: ["Empatis", "Idealis", "Intuitif", "Inspiratif"] },
  INFP: { name: "The Mediator", strengths: ["Kreativitas emosional", "Nilai moral yang kuat", "Imajinatif & puitis", "Autentik & tulus"], weaknesses: ["Terlalu idealis", "Sulit menerima kritik"], desc: "Kamu seorang pemimpi autentik yang dipandu nilai-nilai mendalam. Kreativitasmu lahir dari perasaan yang kaya dan imajinasi tanpa batas.", traits: ["Kreatif", "Autentik", "Imajinatif", "Idealis"] },
  ENFJ: { name: "The Protagonist", strengths: ["Karisma menginspirasi", "Empati tindakan nyata", "Natural menggerakkan orang", "Loyal & berdedikasi"], weaknesses: ["Terlalu memberi", "Butuh validasi"], desc: "Kamu seorang pemimpin karismatik yang mengutamakan orang lain. Kamu punya kemampuan langka untuk memotivasi dan memberdayakan siapapun di sekitarmu.", traits: ["Karismatik", "Empatis", "Inspiratif", "Loyal"] },
  ENFP: { name: "The Campaigner", strengths: ["Antusiasme menular", "Kreativitas sosial tinggi", "Koneksi mendalam dengan banyak orang", "Spontan & penuh semangat"], weaknesses: ["Sulit fokus jangka panjang", "Terlalu banyak proyek sekaligus"], desc: "Kamu seorang jiwa bebas yang penuh semangat. Antusiasme dan kreativitasmu menular ke semua orang, dan kamu selalu mencari koneksi bermakna.", traits: ["Antusias", "Kreatif", "Sosial", "Spontan"] },
  ISTJ: { name: "The Logistician", strengths: ["Dapat diandalkan sepenuhnya", "Terorganisir & detail", "Jujur & konsisten", "Disiplin & bertanggung jawab"], weaknesses: ["Kurang fleksibel", "Bisa terlalu kaku dengan aturan"], desc: "Kamu seorang individu yang sangat dapat diandalkan. Komitmenmu terhadap tanggung jawab dan ketelitian menjadikanmu pilar kekuatan di manapun kamu berada.", traits: ["Andal", "Terorganisir", "Jujur", "Disiplin"] },
  ISFJ: { name: "The Defender", strengths: ["Pelindung yang penuh kasih", "Perhatian terhadap detail", "Setia & berdedikasi", "Sabar & telaten"], weaknesses: ["Sering menahan perasaan", "Sulit mengatakan tidak"], desc: "Kamu seorang pelindung yang hangat dan penuh kasih. Kamu memperhatikan kebutuhan orang lain sebelum mereka menyadarinya sendiri.", traits: ["Pelindung", "Penuh Kasih", "Setia", "Sabar"] },
  ESTJ: { name: "The Executive", strengths: ["Organisator ulung", "Tegas & efisien", "Pemimpin yang adil", "Komitmen tinggi"], weaknesses: ["Bisa terlalu mengontrol", "Kurang toleran pada perbedaan"], desc: "Kamu seorang organizer dan pemimpin yang tegas. Kamu menjaga keteraturan dan memastikan semua berjalan sesuai rencana dengan efisien.", traits: ["Teratur", "Tegas", "Efisien", "Pemimpin"] },
  ESFJ: { name: "The Consul", strengths: ["Harmoni sosial tinggi", "Perhatian & caring", "Loyal terhadap komunitas", "Hangat & ramah"], weaknesses: ["Terlalu peduli pendapat orang", "Sulit menerima konflik"], desc: "Kamu seorang individu sosial yang hangat. Kehadiranmu selalu membawa harmoni, dan kamu secara alami menjadi perekat dalam setiap kelompok.", traits: ["Hangat", "Caring", "Loyal", "Harmonis"] },
  ISTP: { name: "The Virtuoso", strengths: ["Pemecah masalah praktis", "Adaptif & cepat belajar", "Tenang di bawah tekanan", "Efisien & langsung"], weaknesses: ["Sulit mengekspresikan emosi", "Bisa terkesan tidak peduli"], desc: "Kamu seorang pemecah masalah yang praktis dan tenang. Kamu belajar paling baik dengan langsung melakukan, dan tetap cool bahkan di situasi paling menekan.", traits: ["Praktis", "Adaptif", "Tenang", "Efisien"] },
  ISFP: { name: "The Adventurer", strengths: ["Sensitivitas estetik tinggi", "Fleksibel & open-minded", "Autentik & genuine", "Peka terhadap keindahan"], weaknesses: ["Menghindari konflik", "Sulit merencanakan jangka panjang"], desc: "Kamu seorang jiwa seni yang autentik. Kamu mengalami dunia melalui indera yang tajam dan selalu mencari keindahan di setiap momen.", traits: ["Artistik", "Autentik", "Fleksibel", "Sensitif"] },
  ESTP: { name: "The Entrepreneur", strengths: ["Berani mengambil risiko", "Energi sosial tinggi", "Cepat bertindak", "Pragmatis & realistis"], weaknesses: ["Kurang sabar dengan teori", "Impulsif dalam keputusan"], desc: "Kamu seorang doer yang penuh energi. Kamu hidup di momen sekarang, berani mengambil risiko, dan selalu siap untuk aksi nyata.", traits: ["Berani", "Energetik", "Pragmatis", "Action-oriented"] },
  ESFP: { name: "The Entertainer", strengths: ["Energi positif menular", "Natural menghibur orang", "Hidup di momen sekarang", "Sosial & menyenangkan"], weaknesses: ["Mudah terdistraksi", "Menghindari hal serius"], desc: "Kamu seorang entertainer alami yang membawa keceriaan. Energi positifmu menular ke semua orang, dan kamu tahu cara membuat setiap momen terasa spesial.", traits: ["Ceria", "Sosial", "Spontan", "Menyenangkan"] },
};

export function computeMBTI(answers: QuizAnswers): CategoryResult {
  const kepribadianAnswers = getAnswersByCat(answers, "kepribadian");

  // Extract dimension scores
  const dims: Record<string, number[]> = {
    E: [], I: [], S: [], N: [], T: [], F: [], J: [], P: [],
  };

  for (const ans of kepribadianAnswers) {
    if (ans.type === "scale" && ans.scaleVals) {
      const v = ans.scaleVals;
      if (v.length === 10) {
        // Batch 1: E/I alternating
        dims.E.push(v[0], v[2], v[4], v[6], v[8]);
        dims.I.push(v[1], v[3], v[5], v[7], v[9]);
      } else if (v.length === 8) {
        // Batch 2: C, O, N mixed — use for J/P and S/N proxy
        const avgC = avg([v[0], v[3], v[6]]);
        const avgO = avg([v[1], v[4], v[7]]);
        dims.J.push(avgC);
        dims.P.push(11 - avgC); // reverse
        dims.N.push(avgO);
        dims.S.push(11 - avgO);
      }
    }

    if (ans.type === "mc" && ans.mcSel !== undefined) {
      // MC questions map to T/F, J/P, S/N
      const s = ans.mcSel;
      if (s === 0) { dims.T.push(8); dims.J.push(6); }
      if (s === 1) { dims.F.push(8); dims.P.push(6); }
      if (s === 2) { dims.N.push(7); dims.I.push(5); }
      if (s === 3) { dims.E.push(6); dims.F.push(5); }
    }

    if (ans.type === "forced" && ans.forcedSel) {
      if (ans.forcedSel === "a") {
        dims.S.push(8); dims.T.push(6);
      } else {
        dims.N.push(8); dims.F.push(6);
      }
    }
  }

  const eScore = avg(dims.E);
  const iScore = avg(dims.I);
  const sScore = avg(dims.S);
  const nScore = avg(dims.N);
  const tScore = avg(dims.T);
  const fScore = avg(dims.F);
  const jScore = avg(dims.J);
  const pScore = avg(dims.P);

  const mbti =
    (eScore >= iScore ? "E" : "I") +
    (sScore >= nScore ? "S" : "N") +
    (tScore >= fScore ? "T" : "F") +
    (jScore >= pScore ? "J" : "P");

  const data = MBTI_DATA[mbti] || MBTI_DATA["INFJ"];

  // Confidence score based on how decisive each dimension is
  const clarity = [
    Math.abs(eScore - iScore),
    Math.abs(sScore - nScore),
    Math.abs(tScore - fScore),
    Math.abs(jScore - pScore),
  ];
  const avgClarity = avg(clarity);
  const confidence = clamp(Math.round(50 + avgClarity * 5), 55, 98);

  return {
    categoryId: "kepribadian",
    code: mbti,
    name: data.name,
    score: confidence,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    description: data.desc,
    traits: data.traits,
  };
}

export function getAvatarForMBTI(mbtiCode: string, gender: "male" | "female" | "spirit"): string {
  // Hanya mockup yang telah dibuat saat ini, jadi sisanya fallback ke base model
  const generatedMockups: Record<string, string[]> = {
    INTJ: ["male"],
    INFP: ["female"],
    ESTP: ["spirit"],
    INTP: ["male"],
    ENTJ: ["female"],
    ENTP: ["spirit"],
    INFJ: ["male"],
    ENFJ: ["female"],
    ENFP: ["female"],
    ISTJ: ["male"],
    ISFJ: ["spirit"],
    ESTJ: ["female"],
    ESFJ: ["male"],
    ISTP: ["spirit"],
    ISFP: ["female"],
  };

  const hasMockup = generatedMockups[mbtiCode]?.includes(gender);

  if (hasMockup) {
    return `/assets/sprites/mbti/${mbtiCode}_${gender}.png`;
  }

  // Fallback to base models
  return `/assets/sprites/adventurer_${gender}.png`;
}

// ──────────────────────────────────────────────
// 2. KARIR — Holland RIASEC
// ──────────────────────────────────────────────

const RIASEC_LABELS: Record<string, string> = {
  R: "Realistic", I: "Investigative", A: "Artistic",
  S: "Social", E: "Enterprising", C: "Conventional",
};

const RIASEC_NAMES: Record<string, string> = {
  R: "Realistis", I: "Investigatif", A: "Artistik",
  S: "Sosial", E: "Enterprising", C: "Konvensional",
};

const RIASEC_STRENGTHS: Record<string, string[]> = {
  R: ["Praktis & hands-on", "Mekanis & teknis", "Mandiri & efisien", "Bisa diandalkan"],
  I: ["Analitis & kritis", "Rasa ingin tahu tinggi", "Pemecah masalah kompleks", "Riset mendalam"],
  A: ["Kreatif & orisinal", "Ekspresif & imajinatif", "Estetik tinggi", "Berpikir di luar kotak"],
  S: ["Empati & peduli", "Komunikasi hangat", "Natural membimbing", "Team player"],
  E: ["Kepemimpinan kuat", "Persuasif & karismatik", "Ambisius & kompetitif", "Pengambil risiko"],
  C: ["Terorganisir & detail", "Akurat & presisi", "Konsisten & andal", "Manajemen data"],
};

const RIASEC_WEAKNESSES: Record<string, string[]> = {
  R: ["Kurang ekspresif secara verbal", "Kurang nyaman dengan hal abstrak"],
  I: ["Bisa terlalu analitis", "Kurang nyaman dengan tim besar"],
  A: ["Kurang suka rutinitas", "Bisa terlalu idealis"],
  S: ["Sulit mengatakan tidak", "Terlalu mengorbankan diri"],
  E: ["Bisa terlalu kompetitif", "Kurang sabar dengan detail"],
  C: ["Kurang fleksibel", "Kurang nyaman dengan perubahan mendadak"],
};

const RIASEC_KARIR: Record<string, string[]> = {
  R: ["Engineer", "Teknisi", "Arsitek", "Pilot"],
  I: ["Peneliti", "Data Scientist", "Dokter", "Analis"],
  A: ["Desainer", "Penulis", "Musisi", "Content Creator"],
  S: ["Konselor", "Guru", "Pekerja Sosial", "HRD"],
  E: ["CEO", "Sales Manager", "Pengusaha", "Politisi"],
  C: ["Akuntan", "Admin", "QA Specialist", "Bank Officer"],
};

export function computeRIASEC(answers: QuizAnswers): CategoryResult {
  const karirAnswers = getAnswersByCat(answers, "karir");
  const scores: Record<string, number[]> = { R: [], I: [], A: [], S: [], E: [], C: [] };

  for (const ans of karirAnswers) {
    if (ans.type === "scale" && ans.scaleVals) {
      const v = ans.scaleVals;
      if (v.length === 10) {
        // Batch 1: R, I alternating (R1,I1,R2,I2,R3,I3,C1,I4,R4,I5)
        scores.R.push(v[0], v[2], v[4], v[8]);
        scores.I.push(v[1], v[3], v[5], v[7], v[9]);
        scores.C.push(v[6]);
      } else if (v.length === 4) {
        // Batch 2: A, S alternating
        scores.A.push(v[0], v[2]);
        scores.S.push(v[1], v[3]);
      } else if (v.length === 3) {
        // Batch 3: E, C, E
        scores.E.push(v[0], v[2]);
        scores.C.push(v[1]);
      }
    }

    if (ans.type === "mc" && ans.mcSel !== undefined) {
      // MC soal 11: R/I(0), A(1), S(2), E(3)
      // MC soal 12: I(0), A(1), S(2), E(3)
      // MC soal 17: A/I(0), C(1), S(2), E(3)
      const s = ans.mcSel;
      if (s === 0) { scores.I.push(8); scores.R.push(6); }
      if (s === 1) { scores.A.push(8); }
      if (s === 2) { scores.S.push(8); }
      if (s === 3) { scores.E.push(8); }
    }

    if (ans.type === "forced" && ans.forcedSel) {
      // Forced soal 22: S(a) vs I/R(b)
      // Forced soal 23: A(a) vs C(b)
      if (ans.forcedSel === "a") {
        scores.S.push(7);
        scores.A.push(6);
      } else {
        scores.R.push(6);
        scores.C.push(7);
      }
    }

    if (ans.type === "rank" && ans.rankOrder) {
      // Ranking: top items get more weight
      // Order maps to: A(0), C(1), S(2), E(3), I(4), E(5)
      const rankMap = ["A", "C", "S", "E", "I", "E"];
      ans.rankOrder.forEach((_, idx) => {
        const weight = 10 - idx * 1.5;
        const dim = rankMap[idx];
        if (dim) scores[dim].push(weight);
      });
    }
  }

  // Calculate averages and find top 3
  const avgScores = Object.entries(scores).map(([k, v]) => ({
    code: k,
    score: v.length > 0 ? avg(v) : 5,
  }));
  avgScores.sort((a, b) => b.score - a.score);

  const top3 = avgScores.slice(0, 3);
  const code = top3.map((t) => t.code).join("");
  const primaryCode = top3[0].code;
  const secondaryCode = top3[1].code;

  const confidence = clamp(Math.round(top3[0].score * 10), 55, 98);

  return {
    categoryId: "karir",
    code,
    name: `${RIASEC_NAMES[primaryCode]} - ${RIASEC_NAMES[secondaryCode]}`,
    score: confidence,
    strengths: [...(RIASEC_STRENGTHS[primaryCode] || []).slice(0, 2), ...(RIASEC_STRENGTHS[secondaryCode] || []).slice(0, 2)],
    weaknesses: [...(RIASEC_WEAKNESSES[primaryCode] || []).slice(0, 1), ...(RIASEC_WEAKNESSES[secondaryCode] || []).slice(0, 1)],
    description: `Profil karirmu dominan ${RIASEC_NAMES[primaryCode]} dan ${RIASEC_NAMES[secondaryCode]}. Kamu cocok di bidang yang menggabungkan ${RIASEC_LABELS[primaryCode].toLowerCase()} dengan ${RIASEC_LABELS[secondaryCode].toLowerCase()}. Contoh karir: ${(RIASEC_KARIR[primaryCode] || []).slice(0, 2).join(", ")} atau ${(RIASEC_KARIR[secondaryCode] || []).slice(0, 2).join(", ")}.`,
    traits: [RIASEC_NAMES[primaryCode], RIASEC_NAMES[secondaryCode], RIASEC_NAMES[top3[2].code]],
  };
}

// ──────────────────────────────────────────────
// 3. FINANSIAL — Klontz Money Script
// ──────────────────────────────────────────────

type FinancialType = "planner" | "spender" | "avoider" | "vigilant" | "status" | "balanced";

const FINANCIAL_DATA: Record<FinancialType, { name: string; strengths: string[]; weaknesses: string[]; desc: string; traits: string[] }> = {
  planner: { name: "Mindful Planner", strengths: ["Disiplin menabung", "Perencanaan matang", "Hemat & bijaksana", "Tujuan finansial jelas"], weaknesses: ["Bisa terlalu pelit pada diri sendiri", "Cemas berlebihan soal keuangan"], desc: "Kamu seorang perencana keuangan yang disiplin. Kamu selalu tahu ke mana uangmu pergi dan punya rencana jangka panjang yang jelas.", traits: ["Disiplin", "Terencana", "Bijaksana"] },
  spender: { name: "Spontaneous Spender", strengths: ["Menikmati hidup saat ini", "Dermawan dengan orang lain", "Berani investasi pada pengalaman", "Tidak stres soal uang"], weaknesses: ["Impulsif dalam belanja", "Kurang menabung untuk masa depan"], desc: "Kamu menikmati hidup saat ini dan tidak takut menggunakan uang untuk kebahagiaan. Kamu percaya uang harus dinikmati, bukan ditimbun.", traits: ["Spontan", "Dermawan", "Penikmati Hidup"] },
  avoider: { name: "Financial Avoider", strengths: ["Tidak materialistis", "Fokus pada hal non-materi", "Rendah hati", "Nilai hidup di atas uang"], weaknesses: ["Menghindari realita keuangan", "Kurang literasi finansial"], desc: "Kamu cenderung tidak mau memikirkan urusan uang. Bukan karena tidak mampu, tapi karena kamu percaya ada hal yang lebih penting dari sekedar materi.", traits: ["Sederhana", "Rendah Hati", "Non-materialistis"] },
  vigilant: { name: "Cautious Vigilant", strengths: ["Waspada & berhati-hati", "Tabungan darurat selalu siap", "Analitis terhadap pengeluaran", "Aman dari jeratan utang"], weaknesses: ["Terlalu khawatir soal uang", "Sulit menikmati hasil kerja keras"], desc: "Kamu selalu waspada dan berhati-hati dengan keuangan. Kamu tipe yang selalu punya tabungan darurat dan jarang membuat keputusan impulsif.", traits: ["Waspada", "Hati-hati", "Aman"] },
  status: { name: "Status Seeker", strengths: ["Termotivasi untuk sukses", "Percaya diri & ambisius", "Networking kuat", "Investasi pada penampilan"], weaknesses: ["Bisa hidup di atas kemampuan", "Mengaitkan harga diri dengan kekayaan"], desc: "Kamu melihat uang sebagai simbol kesuksesan dan pencapaian. Motivasimu untuk menghasilkan lebih banyak sangat tinggi, dan kamu tidak takut menunjukkannya.", traits: ["Ambisius", "Percaya Diri", "Status-oriented"] },
  balanced: { name: "Balanced Navigator", strengths: ["Seimbang antara menabung & menikmati", "Adaptif dengan situasi", "Tidak ekstrem", "Literasi finansial baik"], weaknesses: ["Bisa terkesan tidak punya pendirian kuat", "Kadang menunda keputusan besar"], desc: "Kamu punya hubungan yang sehat dan seimbang dengan uang. Kamu tahu kapan harus menabung dan kapan boleh memanjakan diri.", traits: ["Seimbang", "Adaptif", "Bijak"] },
};

export function computeFinancial(answers: QuizAnswers): CategoryResult {
  const finAnswers = getAnswersByCat(answers, "finansial");

  const dims = { avoidance: [] as number[], worship: [] as number[], status: [] as number[], vigilance: [] as number[], planning: [] as number[], spending: [] as number[] };

  for (const ans of finAnswers) {
    if (ans.type === "scale" && ans.scaleVals) {
      const v = ans.scaleVals;
      if (v.length === 10) {
        // Batch 1: Money Scripts
        // 1-Avoidance, 2-Worship, 3-Avoidance, 4-Worship, 5-Avoidance, 6-Status, 7-Avoidance, 8-Status, 9-Worship, 10-Status
        dims.avoidance.push(v[0], v[2], v[4], v[6]);
        dims.worship.push(v[1], v[3], v[8]);
        dims.status.push(v[5], v[7], v[9]);
      } else if (v.length === 4) {
        // Batch 2: Vigilance/Planning
        // 1-Vigilance, 2-Planning, 3-Spending(reverse), 4-Planning
        dims.vigilance.push(v[0]);
        dims.planning.push(v[1], v[3]);
        dims.spending.push(v[2]);
      } else if (v.length === 4) {
        // Batch 3: Spending/Security
        // 1-Spending, 2-Vigilance, 3-Planning, 4-Spending
        dims.spending.push(v[0], v[3]);
        dims.vigilance.push(v[1]);
        dims.planning.push(v[2]);
      }
    }

    if (ans.type === "mc" && ans.mcSel !== undefined) {
      // Soal 19: Tabung(0)=Vigilant, Beli(1)=Spender, Bayar utang(2)=Planner, Bagi(3)=Balanced
      const s = ans.mcSel;
      if (s === 0) dims.vigilance.push(9);
      if (s === 1) dims.spending.push(9);
      if (s === 2) dims.planning.push(9);
      if (s === 3) { dims.planning.push(7); dims.spending.push(5); }
    }
  }

  // Calculate averages
  const scores: Record<string, number> = {
    planner: avg([...dims.planning, ...dims.vigilance.map(v => v * 0.5)]),
    spender: avg(dims.spending),
    avoider: avg(dims.avoidance),
    vigilant: avg(dims.vigilance),
    status: avg(dims.status),
  };

  // Find top type
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  let topType = sorted[0][0] as FinancialType;
  const topScore = sorted[0][1];
  const secondScore = sorted[1][1];

  // If top two are very close, it's "balanced"
  if (Math.abs(topScore - secondScore) < 1) {
    topType = "balanced";
  }

  const data = FINANCIAL_DATA[topType];
  const confidence = clamp(Math.round(topScore * 10), 55, 98);

  return {
    categoryId: "finansial",
    code: topType.charAt(0).toUpperCase() + topType.slice(1),
    name: data.name,
    score: confidence,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    description: data.desc,
    traits: data.traits,
  };
}

// ──────────────────────────────────────────────
// 4. GAYA BELAJAR — VARK
// ──────────────────────────────────────────────

type VARKType = "visual" | "auditory" | "readwrite" | "kinesthetic" | "multimodal";

const VARK_DATA: Record<VARKType, { name: string; strengths: string[]; weaknesses: string[]; desc: string; traits: string[] }> = {
  visual: { name: "Visual Learner", strengths: ["Kuat dalam visualisasi", "Mudah mengingat diagram & grafik", "Berpikir dalam gambar", "Spatial awareness tinggi"], weaknesses: ["Sulit belajar dari teks panjang saja", "Butuh alat visual untuk fokus"], desc: "Kamu belajar paling efektif melalui gambar, diagram, video, dan warna. Otakmu memproses informasi visual dengan sangat cepat.", traits: ["Visual", "Grafis", "Spasial"] },
  auditory: { name: "Auditory Learner", strengths: ["Mengingat lewat suara", "Komunikator natural", "Belajar dari diskusi", "Mudah mengingat percakapan"], weaknesses: ["Mudah terdistraksi oleh suara", "Sulit fokus di lingkungan berisik tak berstruktur"], desc: "Kamu menyerap ilmu paling baik lewat pendengaran — diskusi, podcast, dan penjelasan lisan. Kamu mudah mengingat apa yang kamu dengar.", traits: ["Auditori", "Verbal", "Diskusi"] },
  readwrite: { name: "Read/Write Learner", strengths: ["Kuat dalam catatan & teks", "Detail-oriented", "Belajar mandiri dengan baik", "Menulis untuk memahami"], weaknesses: ["Kurang efektif di presentasi tanpa teks", "Butuh waktu lebih untuk input audio saja"], desc: "Kamu paling nyaman belajar lewat membaca dan menulis. Catatan, artikel, dan buku adalah sahabat terbaikmu dalam memahami konsep.", traits: ["Literasi", "Detail", "Mandiri"] },
  kinesthetic: { name: "Kinesthetic Learner", strengths: ["Belajar dengan praktik langsung", "Koordinasi fisik baik", "Mengingat lewat pengalaman", "Hands-on & eksperimental"], weaknesses: ["Sulit duduk diam lama", "Kurang nyaman dengan teori abstrak saja"], desc: "Kamu belajar paling baik dengan langsung melakukan. Praktik, eksperimen, dan pengalaman nyata adalah guru terbaikmu.", traits: ["Praktis", "Hands-on", "Eksperimental"] },
  multimodal: { name: "Multimodal Learner", strengths: ["Fleksibel dalam belajar", "Adaptif terhadap metode apapun", "Kuat di banyak gaya belajar", "Versatile & serbabisa"], weaknesses: ["Bisa overwhelmed oleh terlalu banyak opsi", "Butuh waktu menemukan metode optimal"], desc: "Kamu seorang pelajar multimodal — kamu bisa belajar efektif lewat berbagai cara. Ini adalah kekuatan besar karena kamu sangat adaptif.", traits: ["Multimodal", "Fleksibel", "Adaptif"] },
};

export function computeVARK(answers: QuizAnswers): CategoryResult {
  const belajarAnswers = getAnswersByCat(answers, "belajar");
  const scores: Record<string, number> = { V: 0, A: 0, R: 0, K: 0 };

  // MC mapping: each MC answer maps to V(0), A(1), R(2), K(3)
  for (const ans of belajarAnswers) {
    if (ans.type === "mc" && ans.mcSel !== undefined) {
      const s = ans.mcSel;
      if (s === 0) scores.V += 1;
      if (s === 1) scores.A += 1;
      if (s === 2) scores.R += 1;
      if (s === 3) scores.K += 1;
    }

    if (ans.type === "scale" && ans.scaleVals) {
      // Scale cross-validation (4 statements: V, K, R, A)
      const v = ans.scaleVals;
      if (v.length === 4) {
        scores.V += v[0] / 10 * 3;
        scores.K += v[1] / 10 * 3;
        scores.R += v[2] / 10 * 3;
        scores.A += v[3] / 10 * 3;
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  const secondScore = sorted[1][1];

  let type: VARKType;
  const varkMap: Record<string, VARKType> = { V: "visual", A: "auditory", R: "readwrite", K: "kinesthetic" };

  // If top two are very close, it's multimodal
  if (topScore > 0 && (topScore - secondScore) / topScore < 0.15) {
    type = "multimodal";
  } else {
    type = varkMap[sorted[0][0]] || "visual";
  }

  const data = VARK_DATA[type];
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = total > 0 ? clamp(Math.round((topScore / total) * 100 + 20), 55, 98) : 70;

  return {
    categoryId: "belajar",
    code: type === "multimodal" ? "Multi" : sorted[0][0],
    name: data.name,
    score: confidence,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    description: data.desc,
    traits: data.traits,
  };
}

// ──────────────────────────────────────────────
// 5. ATTACHMENT SOSIAL — ECR-S
// ──────────────────────────────────────────────

type AttachmentType = "secure" | "anxious" | "avoidant" | "fearful";

const ATTACHMENT_DATA: Record<AttachmentType, { name: string; strengths: string[]; weaknesses: string[]; desc: string; traits: string[] }> = {
  secure: { name: "Secure Attachment", strengths: ["Nyaman dengan kedekatan emosional", "Percaya diri dalam hubungan", "Komunikasi terbuka & jujur", "Mandiri sekaligus bisa bergantung"], weaknesses: ["Bisa terlalu percaya", "Kadang kurang waspada terhadap red flags"], desc: "Kamu memiliki gaya kelekatan yang aman. Kamu nyaman dengan kedekatan, bisa mempercayai orang lain, dan tidak terlalu cemas atau menghindar dalam hubungan.", traits: ["Aman", "Percaya", "Terbuka"] },
  anxious: { name: "Anxious-Preoccupied", strengths: ["Sangat peka terhadap perasaan orang lain", "Loyal & berdedikasi tinggi", "Ekspresif dalam kasih sayang", "Menghargai kedekatan emosional"], weaknesses: ["Cemas akan ditinggalkan", "Terlalu butuh validasi", "Overthinking dalam hubungan"], desc: "Kamu sangat menghargai kedekatan dan kadang merasa cemas dalam hubungan. Kamu sangat peka dan loyal, tapi bisa terjebak overthinking soal perasaan orang lain.", traits: ["Peka", "Loyal", "Ekspresif"] },
  avoidant: { name: "Dismissive-Avoidant", strengths: ["Mandiri & self-sufficient", "Tidak bergantung emosional", "Tenang & rasional", "Stabil secara emosi"], weaknesses: ["Sulit membuka diri", "Menghindari kerentanan", "Bisa terkesan tidak peduli"], desc: "Kamu sangat mandiri dan tidak mudah bergantung pada orang lain secara emosional. Kamu menjaga jarak bukan karena tidak peduli, tapi karena merasa lebih aman demikian.", traits: ["Mandiri", "Rasional", "Stabil"] },
  fearful: { name: "Fearful-Avoidant", strengths: ["Punya kedalaman emosi yang luar biasa", "Empati tinggi dari pengalaman", "Adaptif & survivor", "Memahami kompleksitas manusia"], weaknesses: ["Konflik antara ingin dekat & takut terluka", "Sulit konsisten dalam hubungan"], desc: "Kamu merasakan tarikan antara keinginan untuk dekat dan ketakutan untuk terluka. Ini memberimu kedalaman emosional yang unik dan kemampuan berempati yang kuat.", traits: ["Empatik", "Mendalam", "Adaptif"] },
};

export function computeAttachment(answers: QuizAnswers): CategoryResult {
  const attachAnswers = getAnswersByCat(answers, "attachment");

  let anxietyScores: number[] = [];
  let avoidanceScores: number[] = [];

  for (const ans of attachAnswers) {
    if (ans.type === "scale" && ans.scaleVals) {
      const v = ans.scaleVals;
      if (v.length === 9) {
        // Batch 1: Anxiety dimension (9 items)
        anxietyScores = v;
      } else if (v.length === 8) {
        // Batch 2: Avoidance dimension (8 items)
        // Note: item 8 is reverse-scored (trust)
        avoidanceScores = v.slice(0, 7);
        avoidanceScores.push(11 - v[7]); // reverse score
      }
    }
  }

  const anxietyAvg = avg(anxietyScores);
  const avoidanceAvg = avg(avoidanceScores);

  // Midpoint is 5.5 on 1-10 scale
  const midpoint = 5.5;
  let type: AttachmentType;

  if (anxietyAvg < midpoint && avoidanceAvg < midpoint) {
    type = "secure";
  } else if (anxietyAvg >= midpoint && avoidanceAvg < midpoint) {
    type = "anxious";
  } else if (anxietyAvg < midpoint && avoidanceAvg >= midpoint) {
    type = "avoidant";
  } else {
    type = "fearful";
  }

  const data = ATTACHMENT_DATA[type];

  // Confidence: how clearly the type is defined
  const anxDist = Math.abs(anxietyAvg - midpoint);
  const avDist = Math.abs(avoidanceAvg - midpoint);
  const confidence = clamp(Math.round(55 + (anxDist + avDist) * 4), 55, 98);

  return {
    categoryId: "attachment",
    code: type.charAt(0).toUpperCase() + type.slice(1),
    name: data.name,
    score: confidence,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    description: data.desc,
    traits: data.traits,
  };
}

// ──────────────────────────────────────────────
// 6. KESEJAHTERAAN — PSS-10 + Schwartz Values
// ──────────────────────────────────────────────

const SCHWARTZ_VALUES = ["Self-Direction", "Security", "Achievement", "Benevolence", "Conformity", "Stimulation"];

type StressLevel = "low" | "moderate" | "high";

const STRESS_DATA: Record<StressLevel, { name: string; desc: string }> = {
  low: { name: "Balanced Soul", desc: "Tingkat stresmu rendah dan terkendali. Kamu mengelola tekanan hidup dengan baik." },
  moderate: { name: "Growing Spirit", desc: "Kamu mengalami tekanan yang wajar. Ada ruang untuk pertumbuhan dalam mengelola stres." },
  high: { name: "Warrior in Battle", desc: "Kamu sedang menghadapi banyak tekanan. Ingat: meminta bantuan adalah tanda keberanian, bukan kelemahan." },
};

const STRESS_STRENGTHS: Record<StressLevel, string[]> = {
  low: ["Manajemen stres yang baik", "Resiliensi tinggi", "Keseimbangan emosional", "Teknik coping efektif"],
  moderate: ["Kesadaran diri yang berkembang", "Motivasi untuk bertumbuh", "Mengenali sinyal stres", "Teknik coping sedang berkembang"],
  high: ["Ketahanan dalam bertahan", "Keberanian menghadapi kesulitan", "Potensi pertumbuhan pasca-trauma", "Empati mendalam dari pengalaman"],
};

const STRESS_WEAKNESSES: Record<StressLevel, string[]> = {
  low: ["Bisa kurang empati terhadap yang stres", "Mungkin menghindari tantangan besar"],
  moderate: ["Perlu mengembangkan teknik coping lebih", "Bisa overwhelmed di saat krisis"],
  high: ["Risiko burnout tinggi", "Perlu bantuan profesional jika berkelanjutan"],
};

export function computeWellbeing(answers: QuizAnswers): CategoryResult {
  const wellbeingAnswers = getAnswersByCat(answers, "kesejahteraan");

  let pssScore = 0;
  let valueScores: number[] = [];
  let copingType = "";
  let topValues: string[] = [];

  for (const ans of wellbeingAnswers) {
    if (ans.type === "frequency" && ans.freqVals) {
      // PSS-10: items 1-10
      // Positive items (4,5,7,8) are reverse-scored
      const v = ans.freqVals;
      const positiveItems = [3, 4, 6, 7]; // 0-indexed
      let total = 0;
      for (let i = 0; i < v.length; i++) {
        if (positiveItems.includes(i)) {
          total += (4 - v[i]); // reverse: 0→4, 1→3, 2→2, 3→1, 4→0
        } else {
          total += v[i];
        }
      }
      pssScore = total; // 0-40 scale
    }

    if (ans.type === "scale" && ans.scaleVals) {
      // Schwartz Values (6 items)
      valueScores = ans.scaleVals;
    }

    if (ans.type === "mc" && ans.mcSel !== undefined) {
      // Coping strategy
      const copingMap = ["Problem-focused", "Social Support", "Distraction", "Meaning-making"];
      copingType = copingMap[ans.mcSel] || "Balanced";
    }

    if (ans.type === "rank" && ans.rankOrder) {
      topValues = ans.rankOrder.slice(0, 2);
    }
  }

  // Determine stress level
  let stressLevel: StressLevel;
  if (pssScore <= 13) stressLevel = "low";
  else if (pssScore <= 26) stressLevel = "moderate";
  else stressLevel = "high";

  const stressData = STRESS_DATA[stressLevel];

  // Determine top Schwartz value
  let topValue = "Self-Direction";
  if (valueScores.length >= 6) {
    const maxIdx = valueScores.indexOf(Math.max(...valueScores));
    topValue = SCHWARTZ_VALUES[maxIdx] || "Self-Direction";
  }

  const valueTraits: Record<string, string> = {
    "Self-Direction": "Otonom & Mandiri",
    "Security": "Stabil & Aman",
    "Achievement": "Ambisius & Berprestasi",
    "Benevolence": "Murah Hati & Peduli",
    "Conformity": "Patuh & Teratur",
    "Stimulation": "Petualang & Berani",
  };

  const confidence = clamp(Math.round(100 - pssScore * 1.5), 40, 98);

  return {
    categoryId: "kesejahteraan",
    code: `PSS:${pssScore}`,
    name: stressData.name,
    score: confidence,
    strengths: STRESS_STRENGTHS[stressLevel],
    weaknesses: STRESS_WEAKNESSES[stressLevel],
    description: `${stressData.desc} Nilai hidup utamamu: ${valueTraits[topValue] || topValue}. ${copingType ? `Strategi coping dominanmu: ${copingType}.` : ""} ${topValues.length > 0 ? `Prioritas hidupmu: ${topValues[0]}.` : ""}`,
    traits: [stressLevel === "low" ? "Tenang" : stressLevel === "moderate" ? "Berkembang" : "Bertahan", valueTraits[topValue] || topValue, copingType || "Adaptif"],
  };
}

// ──────────────────────────────────────────────
// MASTER FUNCTION
// ──────────────────────────────────────────────

const SCORING_MAP: Record<string, (answers: QuizAnswers) => CategoryResult> = {
  kepribadian: computeMBTI,
  karir: computeRIASEC,
  finansial: computeFinancial,
  belajar: computeVARK,
  attachment: computeAttachment,
  kesejahteraan: computeWellbeing,
};

/**
 * Compute results for all selected categories.
 * Returns a Record keyed by category ID.
 */
export function computeAllResults(answers: QuizAnswers, selectedCats: string[]): AllResults {
  const results: AllResults = {};
  for (const catId of selectedCats) {
    const scoreFn = SCORING_MAP[catId];
    if (scoreFn) {
      results[catId] = scoreFn(answers);
    }
  }
  return results;
}
