/**
 * KnowYourself — Soul Resonance Engine
 * Lumora Studio | ITEBA 2026
 *
 * Encode/decode results for sharing + chemistry comparison
 */

import type { AllResults, CategoryResult } from "./scoring";

// ──────────────────────────────────────────────
// ENCODE / DECODE
// ──────────────────────────────────────────────

/**
 * Encode results to a compact URL-safe string
 */
export function encodeResults(results: AllResults): string {
  try {
    const compact = Object.entries(results).map(([catId, r]) => ({
      c: catId,
      k: r.code,
      n: r.name,
      s: r.score,
      t: r.traits,
    }));
    const json = JSON.stringify(compact);
    return btoa(encodeURIComponent(json));
  } catch {
    return "";
  }
}

/**
 * Decode results from a URL-safe string
 */
export function decodeResults(encoded: string): AllResults | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const compact = JSON.parse(json) as { c: string; k: string; n: string; s: number; t: string[] }[];
    const results: AllResults = {};
    for (const item of compact) {
      results[item.c] = {
        categoryId: item.c,
        code: item.k,
        name: item.n,
        score: item.s,
        strengths: [],
        weaknesses: [],
        description: "",
        traits: item.t,
      };
    }
    return results;
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────
// CHEMISTRY CALCULATION
// ──────────────────────────────────────────────

export type ChemistryResult = {
  overallScore: number; // 0-100
  shared: string[];     // things in common
  complement: string[]; // things that complement
  tension: string[];    // potential conflicts
  advice: string[];     // relationship tips
  perCategory: { catId: string; catName: string; score: number; note: string }[];
};

// MBTI compatibility matrix (simplified)
const MBTI_COMPAT: Record<string, string[]> = {
  INTJ: ["ENFP", "ENTP", "INFJ", "ENTJ"],
  INTP: ["ENTJ", "ESTJ", "ENFJ", "INFJ"],
  ENTJ: ["INTP", "INFP", "ENTP", "INTJ"],
  ENTP: ["INFJ", "INTJ", "ENFJ", "ENFP"],
  INFJ: ["ENTP", "ENFP", "INFP", "INTJ"],
  INFP: ["ENFJ", "ENTJ", "INFJ", "ENFP"],
  ENFJ: ["INFP", "ISFP", "INTP", "ENFP"],
  ENFP: ["INFJ", "INTJ", "ENFJ", "ENTP"],
  ISTJ: ["ESFP", "ESTP", "ISFJ", "ESTJ"],
  ISFJ: ["ESTP", "ESFP", "ISTJ", "ESFJ"],
  ESTJ: ["INTP", "ISFP", "ISTJ", "ISTP"],
  ESFJ: ["ISFP", "ISTP", "ISFJ", "ENFJ"],
  ISTP: ["ESFJ", "ESTJ", "ESTP", "ISFP"],
  ISFP: ["ESTJ", "ESFJ", "ENFJ", "ISTP"],
  ESTP: ["ISFJ", "ISTJ", "ESFP", "ISTP"],
  ESFP: ["ISTJ", "ISFJ", "ESTP", "ESFJ"],
};

function getMBTICompat(a: string, b: string): number {
  const compatList = MBTI_COMPAT[a] || [];
  const idx = compatList.indexOf(b);
  if (idx === 0) return 95;
  if (idx === 1) return 85;
  if (idx === 2) return 75;
  if (idx === 3) return 70;
  // Same type
  if (a === b) return 65;
  // Share 3 letters
  let shared = 0;
  for (let i = 0; i < 4; i++) if (a[i] === b[i]) shared++;
  if (shared >= 3) return 60;
  if (shared >= 2) return 55;
  return 50;
}

function scoreSimilarity(a: number, b: number): number {
  return 100 - Math.abs(a - b);
}

export function computeChemistry(myResults: AllResults, friendResults: AllResults): ChemistryResult {
  const shared: string[] = [];
  const complement: string[] = [];
  const tension: string[] = [];
  const advice: string[] = [];
  const perCategory: ChemistryResult["perCategory"] = [];

  let totalScore = 0;
  let catCount = 0;

  // 1. Kepribadian (MBTI)
  const myMBTI = myResults.kepribadian;
  const friendMBTI = friendResults.kepribadian;
  if (myMBTI && friendMBTI) {
    const compat = getMBTICompat(myMBTI.code, friendMBTI.code);
    totalScore += compat;
    catCount++;
    perCategory.push({ catId: "kepribadian", catName: "Kepribadian", score: compat, note: `${myMBTI.code} × ${friendMBTI.code}` });

    // Shared traits
    const myTraits = new Set(myMBTI.traits);
    const commonTraits = friendMBTI.traits.filter(t => myTraits.has(t));
    if (commonTraits.length > 0) shared.push(`Kalian sama-sama ${commonTraits.join(" & ").toLowerCase()}`);

    // Complement analysis
    const myE = myMBTI.code[0], friendE = friendMBTI.code[0];
    if (myE !== friendE) complement.push(`${myE === "I" ? "Kamu introvert, temanmu extrovert" : "Kamu extrovert, temanmu introvert"} — kalian saling melengkapi energi sosial`);

    const myT = myMBTI.code[2], friendT = friendMBTI.code[2];
    if (myT !== friendT) {
      complement.push(`Kombinasi ${myT === "T" ? "logika" : "empati"} + ${friendT === "T" ? "logika" : "empati"} membuat keputusan kalian lebih seimbang`);
    } else if (myT === "F") {
      tension.push("Kalian berdua sangat emosional — berhati-hatilah agar tidak saling memicu kecemasan");
    }

    if (compat >= 80) {
      advice.push("Kepribadian kalian sangat kompatibel! Jaga komunikasi terbuka untuk mempertahankan harmoni ini");
    } else if (compat < 60) {
      advice.push("Perbedaan kepribadian butuh upaya ekstra — cobalah memahami perspektif satu sama lain tanpa menghakimi");
    }
  }

  // 2. Karir (RIASEC)
  const myKarir = myResults.karir;
  const friendKarir = friendResults.karir;
  if (myKarir && friendKarir) {
    const sim = scoreSimilarity(myKarir.score, friendKarir.score);
    totalScore += sim;
    catCount++;
    perCategory.push({ catId: "karir", catName: "Karir", score: sim, note: `${myKarir.code} × ${friendKarir.code}` });

    if (myKarir.code[0] === friendKarir.code[0]) {
      shared.push(`Kalian punya minat karir yang serupa (${myKarir.traits[0]})`);
    } else {
      complement.push(`Minat karir kalian berbeda — ini bisa jadi sumber perspektif baru yang berharga`);
    }
  }

  // 3. Finansial
  const myFin = myResults.finansial;
  const friendFin = friendResults.finansial;
  if (myFin && friendFin) {
    const sim = myFin.code === friendFin.code ? 85 : scoreSimilarity(myFin.score, friendFin.score);
    totalScore += sim;
    catCount++;
    perCategory.push({ catId: "finansial", catName: "Finansial", score: sim, note: `${myFin.name} × ${friendFin.name}` });

    if (myFin.code === friendFin.code) {
      shared.push(`Gaya finansial kalian sama: ${myFin.name}`);
    } else {
      const combo = [myFin.code, friendFin.code].sort().join("-");
      if (combo.includes("Planner") && combo.includes("Spender")) {
        tension.push("Satu planner, satu spender — diskusikan batas pengeluaran bersama sejak awal");
        advice.push("Buat 'fun money' budget yang disepakati bersama — planner tenang, spender bebas");
      } else {
        complement.push("Gaya finansial kalian berbeda — ini bisa saling menyeimbangkan jika dikomunikasikan dengan baik");
      }
    }
  }

  // 4. Gaya Belajar
  const myBelajar = myResults.belajar;
  const friendBelajar = friendResults.belajar;
  if (myBelajar && friendBelajar) {
    const sim = myBelajar.code === friendBelajar.code ? 90 : 60;
    totalScore += sim;
    catCount++;
    perCategory.push({ catId: "belajar", catName: "Gaya Belajar", score: sim, note: `${myBelajar.name} × ${friendBelajar.name}` });

    if (myBelajar.code === friendBelajar.code) {
      shared.push(`Gaya belajar kalian sama — kalian bisa belajar bareng dengan efektif!`);
    } else {
      advice.push(`Kalau belajar bareng, coba kombinasi metode: ${myBelajar.traits[0]} + ${friendBelajar.traits[0]}`);
    }
  }

  // 5. Attachment
  const myAtt = myResults.attachment;
  const friendAtt = friendResults.attachment;
  if (myAtt && friendAtt) {
    let attCompat = 70;
    const myType = myAtt.code.toLowerCase();
    const friendType = friendAtt.code.toLowerCase();

    if (myType === "secure" || friendType === "secure") attCompat = 85;
    if (myType === "secure" && friendType === "secure") attCompat = 95;
    if (myType === "anxious" && friendType === "avoidant") attCompat = 40;
    if (myType === "avoidant" && friendType === "anxious") attCompat = 40;
    if (myType === friendType && myType !== "secure") attCompat = 55;

    totalScore += attCompat;
    catCount++;
    perCategory.push({ catId: "attachment", catName: "Attachment", score: attCompat, note: `${myAtt.name} × ${friendAtt.name}` });

    if (myType === "secure" && friendType === "secure") {
      shared.push("Kalian berdua punya attachment yang aman — fondasi hubungan yang sangat kuat!");
    } else if (myType === "anxious" && friendType === "avoidant") {
      tension.push("Anxious × Avoidant bisa memicu pursue-withdraw cycle. Sadari polanya dan break the cycle bersama");
      advice.push("Yang anxious: latih self-soothing. Yang avoidant: coba express kebutuhan secara verbal, bukan menarik diri");
    } else if (myType === "secure") {
      advice.push(`Attachment amanmu bisa membantu temanmu (${friendAtt.name}) merasa lebih aman — jadilah safe space`);
    } else if (friendType === "secure") {
      advice.push(`Temanmu punya attachment aman — ini kesempatan bagimu untuk belajar trust yang lebih dalam`);
    }
  }

  // 6. Kesejahteraan
  const myWell = myResults.kesejahteraan;
  const friendWell = friendResults.kesejahteraan;
  if (myWell && friendWell) {
    const sim = scoreSimilarity(myWell.score, friendWell.score);
    totalScore += sim;
    catCount++;
    perCategory.push({ catId: "kesejahteraan", catName: "Kesejahteraan", score: sim, note: `${myWell.name} × ${friendWell.name}` });
  }

  // Overall
  const overallScore = catCount > 0 ? Math.round(totalScore / catCount) : 50;

  // General advice if not enough specific ones
  if (advice.length === 0) {
    if (overallScore >= 80) {
      advice.push("Chemistry kalian sangat tinggi! Kunci utamanya: jaga komunikasi terbuka dan saling menghargai");
    } else if (overallScore >= 60) {
      advice.push("Kalian punya potensi hubungan yang baik — investasikan waktu untuk memahami perspektif satu sama lain");
    } else {
      advice.push("Perbedaan kalian cukup besar, tapi justru ini bisa memperkaya — kuncinya adalah kesabaran dan empati");
    }
  }

  if (shared.length === 0) shared.push("Kalian mungkin berbeda di banyak hal — tapi perbedaan justru bisa menguatkan ikatan");
  if (complement.length === 0) complement.push("Kalian saling melengkapi di beberapa area — gunakan ini sebagai kekuatan bersama");

  return { overallScore, shared, complement, tension, advice, perCategory };
}
