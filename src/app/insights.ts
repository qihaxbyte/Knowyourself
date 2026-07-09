/**
 * KnowYourself — Growth Insights Engine
 * Lumora Studio | ITEBA 2026
 *
 * Database saran pertumbuhan per kombinasi hasil tes.
 * Setiap tipe mendapat: kekuatan, area pertumbuhan, dan aksi mingguan.
 */

import type { CategoryResult, AllResults } from "./scoring";
import { GUIDES } from "./flow";

// ──────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────

export type InsightSection = {
  title: string;
  icon: string;
  items: string[];
};

export type CategoryInsight = {
  harness: InsightSection;   // cara memanfaatkan kekuatan
  grow: InsightSection;      // cara mengatasi kelemahan
  actions: InsightSection;   // aksi konkret mingguan
};

export type GuideComment = {
  summary: string;     // 1-2 kalimat ringkasan dari guide
  encouragement: string; // kalimat penyemangat
};

// ──────────────────────────────────────────────
// KEPRIBADIAN INSIGHTS
// ──────────────────────────────────────────────

const MBTI_INSIGHTS: Record<string, CategoryInsight> = {
  INTJ: {
    harness: { title: "Manfaatkan Kekuatanmu", icon: "⚡", items: ["Gunakan kemampuan strategismu untuk membuat rencana jangka panjang — kamu sangat kuat di sini", "Carikan proyek kompleks yang butuh analisis mendalam, di situlah kamu bersinar", "Jadilah 'orang di belakang layar' yang merancang sistem — kamu tidak perlu selalu di panggung"] },
    grow: { title: "Area Pertumbuhan", icon: "🌱", items: ["Latih mengekspresikan apresiasi secara verbal — orang di sekitarmu butuh mendengarnya", "Coba delegasikan kontrol sesekali, tidak semua harus sempurna", "Luangkan waktu untuk mendengarkan perasaan orang lain tanpa langsung memberi solusi"] },
    actions: { title: "Aksi Minggu Ini", icon: "🎯", items: ["Beri 1 pujian tulus ke seseorang setiap hari", "Tulis rencana 6 bulan ke depan, bagi jadi langkah mingguan", "Habiskan 15 menit mendengarkan teman tanpa memotong atau menyarankan"] },
  },
  INTP: {
    harness: { title: "Manfaatkan Kekuatanmu", icon: "⚡", items: ["Channel rasa ingin tahumu ke proyek riset atau pembelajaran mendalam yang kamu sukai", "Gunakan pola pikirmu yang unik untuk memecahkan masalah yang orang lain tidak bisa", "Tulis ide-idemu — pemikiranmu berharga dan layak diabadikan"] },
    grow: { title: "Area Pertumbuhan", icon: "🌱", items: ["Latih mengeksekusi ide, bukan hanya memikirkannya — mulai dari yang kecil", "Coba express perasaanmu secara langsung, bukan hanya lewat tindakan", "Bangun rutinitas sederhana agar energimu tidak habis untuk keputusan kecil"] },
    actions: { title: "Aksi Minggu Ini", icon: "🎯", items: ["Pilih 1 ide dan eksekusi dalam 48 jam — tidak perlu sempurna", "Ceritakan satu hal yang kamu rasakan ke orang terdekat", "Buat to-do list sederhana setiap pagi, selesaikan 3 hal teratas"] },
  },
  ENTJ: {
    harness: { title: "Manfaatkan Kekuatanmu", icon: "⚡", items: ["Ambil peran kepemimpinan di proyek atau organisasi — kamu natural di sini", "Gunakan efisiensimu untuk membantu orang lain mengorganisir hidup mereka", "Tetapkan target ambisius — kamu punya drive untuk mencapainya"] },
    grow: { title: "Area Pertumbuhan", icon: "🌱", items: ["Latih kesabaran saat orang lain tidak secepat kamu dalam memahami sesuatu", "Belajar menerima bahwa tidak semua orang termotivasi oleh hasil — beberapa butuh proses", "Izinkan dirimu istirahat tanpa merasa bersalah"] },
    actions: { title: "Aksi Minggu Ini", icon: "🎯", items: ["Tanya pendapat 2 orang sebelum mengambil keputusan penting", "Habiskan 1 hari tanpa to-do list dan nikmati prosesnya", "Ucapkan terima kasih spesifik ke 3 orang yang membantumu minggu ini"] },
  },
  // Defaults for types not explicitly listed
  _default: {
    harness: { title: "Manfaatkan Kekuatanmu", icon: "⚡", items: ["Kenali pola kekuatanmu dan gunakan secara sadar setiap hari", "Cari lingkungan yang menghargai keunikanmu", "Bagikan perspektif unikmu — dunia butuh sudut pandangmu"] },
    grow: { title: "Area Pertumbuhan", icon: "🌱", items: ["Identifikasi 1 kebiasaan yang ingin kamu ubah dan fokus selama 21 hari", "Minta feedback jujur dari 1 orang yang kamu percaya", "Coba 1 hal baru setiap minggu yang di luar zona nyamanmu"] },
    actions: { title: "Aksi Minggu Ini", icon: "🎯", items: ["Journaling 5 menit sebelum tidur — tulis 3 hal yang kamu syukuri", "Buat 1 keputusan kecil yang biasanya kamu tunda", "Hubungi 1 teman lama dan tanya kabar mereka dengan tulus"] },
  },
};

// Add more MBTI types with shared patterns
const INTROVERT_GROW = ["Coba hadir di 1 acara sosial kecil per minggu — tidak perlu jadi pusat perhatian", "Latih small talk 2-3 menit saat bertemu orang baru"];
const EXTROVERT_GROW = ["Luangkan 30 menit sehari untuk refleksi sunyi tanpa distraksi", "Belajar mendengarkan lebih lama sebelum merespons"];
const THINKING_GROW = ["Validasi perasaan orang lain sebelum menawarkan solusi", "Coba journaling emosi untuk memahami perasaanmu sendiri"];
const FEELING_GROW = ["Pisahkan fakta dari perasaan saat mengambil keputusan penting", "Latih mengatakan 'tidak' tanpa merasa bersalah"];

["ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"].forEach(type => {
  if (!MBTI_INSIGHTS[type]) {
    const isI = type[0] === "I";
    const isT = type[2] === "T";
    MBTI_INSIGHTS[type] = {
      harness: { ...MBTI_INSIGHTS._default.harness },
      grow: {
        title: "Area Pertumbuhan", icon: "🌱",
        items: [
          ...(isI ? INTROVERT_GROW : EXTROVERT_GROW),
          ...(isT ? THINKING_GROW : FEELING_GROW).slice(0, 1),
        ],
      },
      actions: { ...MBTI_INSIGHTS._default.actions },
    };
  }
});

// ──────────────────────────────────────────────
// KARIR INSIGHTS
// ──────────────────────────────────────────────

const RIASEC_INSIGHTS: Record<string, { harness: string[]; grow: string[]; actions: string[] }> = {
  R: { harness: ["Cari proyek hands-on yang melibatkan alat atau teknologi fisik", "Bangun portofolio teknis yang menunjukkan kemampuanmu"], grow: ["Latih komunikasi ide ke orang non-teknis", "Coba kolaborasi dengan tipe kreatif (A) untuk memperluas perspektif"], actions: ["Buat 1 proyek DIY kecil minggu ini", "Coba jelaskan karyamu ke 1 orang non-teknis"] },
  I: { harness: ["Deep-dive ke topik yang membuatmu penasaran — keahlianmu tumbuh dari sini", "Cari mentoring di bidang riset yang kamu minati"], grow: ["Latih presentasi risetmu ke audiens umum", "Coba terapkan teorimu ke masalah nyata sehari-hari"], actions: ["Baca 1 paper atau artikel mendalam di bidang minatmu", "Jelaskan temuanmu ke 1 orang dalam 2 menit"] },
  A: { harness: ["Buat karya kreatif secara konsisten — tidak perlu sempurna, yang penting konsisten", "Cari komunitas kreatif untuk umpan balik dan inspirasi"], grow: ["Buat deadline untuk proyekmu — kreativitas butuh batasan", "Belajar sisi bisnis dari karya kreatif (monetisasi, distribusi)"], actions: ["Buat 1 karya kecil dan share ke 1 orang minggu ini", "Tetapkan 1 proyek kreatif dengan deadline 2 minggu"] },
  S: { harness: ["Volunteering atau mentoring — di situlah dampak terbesarmu", "Bangun komunitas kecil di bidang yang kamu pedulikan"], grow: ["Jaga batasan agar tidak burnout dari terlalu banyak memberi", "Belajar mengatakan 'tidak' pada permintaan yang menguras energi"], actions: ["Bantu 1 orang secara konkret minggu ini", "Blokir 2 jam di jadwalmu hanya untuk self-care"] },
  E: { harness: ["Ambil posisi kepemimpinan di proyek atau organisasi", "Gunakan persuasimu untuk mengadvokasi hal yang kamu percaya"], grow: ["Latih mendengarkan sebelum memimpin", "Belajar bahwa kegagalan adalah data, bukan kekalahan"], actions: ["Pitch 1 ide ke seseorang yang bisa membantumu merealisasikannya", "Minta 1 feedback kritis dari seseorang yang kamu hormati"] },
  C: { harness: ["Ciptakan sistem dan SOP yang memudahkan orang lain", "Bangun keahlian di tools produktivitas (spreadsheet, automation)"], grow: ["Coba improvisasi sesekali — tidak semua harus terencana", "Latih adaptasi saat rencana berubah mendadak"], actions: ["Buat 1 template/system yang bisa kamu pakai ulang", "Coba 1 hari tanpa jadwal ketat dan lihat apa yang terjadi"] },
};

// ──────────────────────────────────────────────
// FINANSIAL INSIGHTS
// ──────────────────────────────────────────────

const FINANCIAL_INSIGHTS: Record<string, { harness: string[]; grow: string[]; actions: string[] }> = {
  Planner: { harness: ["Disiplinmu adalah kekuatan langka — terus kembangkan skill investasi", "Bantu teman atau keluarga buat anggaran sederhana"], grow: ["Izinkan dirimu menikmati hasil kerja kerasmu sesekali", "Jangan terlalu kaku — fleksibilitas finansial juga penting"], actions: ["Alokasikan 10% dari pendapatan khusus untuk 'fun money'", "Review anggaranmu dan pastikan ada pos untuk kesenangan"] },
  Spender: { harness: ["Kemampuanmu menikmati hidup adalah gift — jangan merasa bersalah", "Gunakan sifat dermawanmu secara strategis (gift-giving, treating teman)"], grow: ["Mulai menabung otomatis (auto-debit) sebelum sempat belanja", "Tunggu 24 jam sebelum pembelian di atas Rp 200rb"], actions: ["Setup auto-transfer Rp 50rb/minggu ke rekening tabungan", "Catat semua pengeluaran minggu ini — tanpa menghakimi"] },
  Avoider: { harness: ["Ketidakterikatanmu pada materi bisa jadi kebebasan — channel ke minimalism yang sadar", "Fokuskan energimu pada pengalaman dan hubungan, bukan benda"], grow: ["Cek saldo rekening 1x seminggu — mulai dari sini", "Buat 1 tujuan finansial sederhana (tabungan darurat 3 bulan)"], actions: ["Buka aplikasi bank dan cek saldo hari ini", "Tulis 1 tujuan finansial untuk 3 bulan ke depan"] },
  Vigilant: { harness: ["Kewaspadaanmu melindungimu dari banyak masalah finansial", "Gunakan ketelitianmu untuk riset investasi yang aman"], grow: ["Bedakan kewaspadaan produktif dari kecemasan berlebihan", "Izinkan dirimu spontan sesekali tanpa rasa bersalah"], actions: ["Alokasikan uang kecil untuk pengeluaran spontan", "Ceritakan kekhawatiranmu soal uang ke 1 orang terpercaya"] },
  Status: { harness: ["Motivasimu untuk sukses sangat kuat — arahkan ke investasi jangka panjang", "Networking dan personal branding adalah kekuatanmu"], grow: ["Pisahkan identitasmu dari kekayaan — kamu berharga tanpa status", "Evaluasi: pengeluaran mana yang benar-benar membuatmu bahagia?"], actions: ["Identifikasi 3 pengeluaran status yang bisa dikurangi", "Investasikan selisihnya ke instrumen yang menghasilkan passive income"] },
  Balanced: { harness: ["Keseimbanganmu adalah langka — jaga dan terus kembangkan", "Kamu bisa jadi role model finansial bagi orang di sekitarmu"], grow: ["Ambil 1 keputusan finansial yang sedikit lebih berani dari biasanya", "Deepening literasi finansial ke area investasi yang lebih advanced"], actions: ["Baca 1 artikel tentang investasi yang belum kamu coba", "Buat financial plan 1 tahun ke depan"] },
};

// ──────────────────────────────────────────────
// BELAJAR INSIGHTS
// ──────────────────────────────────────────────

const VARK_INSIGHTS: Record<string, { harness: string[]; grow: string[]; actions: string[] }> = {
  Visual: { harness: ["Gunakan mind map, diagram, dan warna saat belajar", "Cari video tutorial daripada buku teks untuk topik baru"], grow: ["Latih juga belajar lewat diskusi — jangan hanya visual", "Coba podcast untuk melatih auditory learning"], actions: ["Buat 1 mind map dari topik yang sedang kamu pelajari", "Tonton 1 video edukatif dan buat catatan visual darinya"] },
  Auditory: { harness: ["Dengarkan podcast edukatif saat commute atau olahraga", "Jelaskan materi ke orang lain dengan keras — ini menguatkan pemahamanmu"], grow: ["Coba buat catatan tertulis untuk melengkapi input audio", "Latih belajar di lingkungan sunyi untuk topik yang butuh konsentrasi"], actions: ["Dengarkan 1 podcast edukatif dan ceritakan isinya ke 1 orang", "Rekam dirimu menjelaskan materi dan putar ulang"] },
  "Read/Write": { harness: ["Buat ringkasan tertulis dari semua yang kamu pelajari", "Blog atau journal tentang ilmu baru — menulis = memahami"], grow: ["Coba praktik langsung untuk topik yang hands-on", "Variasikan input: tonton video atau ikut workshop, bukan hanya baca"], actions: ["Tulis ringkasan 1 paragraf dari hal baru yang kamu pelajari", "Coba 1 tutorial hands-on tanpa membaca instruksi terlebih dahulu"] },
  Kinesthetic: { harness: ["Cari workshop, lab, atau proyek praktis untuk topik yang kamu pelajari", "Belajar sambil bergerak — jalan kaki, standing desk"], grow: ["Latih kesabaran untuk fase teori sebelum praktik", "Buat catatan singkat setelah praktik untuk memperkuat memori"], actions: ["Praktikkan 1 skill baru yang kamu baca minggu ini", "Coba belajar di luar ruangan atau sambil berjalan"] },
  Multi: { harness: ["Kamu bisa belajar dari mana saja — manfaatkan ini dengan kombinasi metode", "Variasikan: video → diskusi → praktik → catatan"], grow: ["Temukan 1 metode yang paling efisien untukmu saat waktu terbatas", "Jangan overwhelmed oleh terlalu banyak opsi — kadang pilih 1 dan stick with it"], actions: ["Coba belajar 1 topik dengan 3 metode berbeda dan bandingkan hasilnya", "Identifikasi 1 metode yang paling cepat untukmu untuk deadline ketat"] },
};

// ──────────────────────────────────────────────
// ATTACHMENT INSIGHTS
// ──────────────────────────────────────────────

const ATTACHMENT_INSIGHTS: Record<string, { harness: string[]; grow: string[]; actions: string[] }> = {
  Secure: { harness: ["Kamu adalah stabilizer di hubunganmu — terus jadi safe space untuk orang lain", "Gunakan kemampuan komunikasimu untuk menyelesaikan konflik"], grow: ["Tetap waspada terhadap red flags, kepercayaan tidak harus buta", "Jaga boundaries meski kamu nyaman dengan kedekatan"], actions: ["Check-in ke 1 teman yang sedang kesulitan", "Evaluasi: adakah hubungan yang perlu boundaries lebih jelas?"] },
  Anxious: { harness: ["Kepekaanmu adalah superpower — gunakan untuk empati yang mendalam", "Loyalitas dan dedikasimu sangat dihargai orang-orang yang tepat"], grow: ["Latih self-soothing saat cemas: napas dalam, grounding, journaling", "Ingatkan dirimu: perasaan bukan fakta — overthinking bukan kebenaran", "Bangun identitas di luar hubungan — kamu utuh tanpa validasi orang lain"], actions: ["Saat cemas, tulis 3 bukti konkret bahwa orang itu peduli padamu", "Habiskan 1 hari fokus pada hobby tanpa mengecek HP terus-menerus"] },
  Avoidant: { harness: ["Kemandirian emosionalmu membuatmu stabil di saat krisis", "Kamu membawa rasionalitas yang dibutuhkan dalam hubungan yang emosional"], grow: ["Coba share 1 hal vulnerable ke 1 orang terpercaya per minggu", "Kerentanan bukan kelemahan — ini adalah jembatan ke koneksi sejati", "Latih hadir secara emosional, bukan hanya secara fisik"], actions: ["Ceritakan 1 perasaanmu yang sebenarnya ke orang terdekat minggu ini", "Saat ingin menarik diri, coba bertahan 5 menit lebih lama dulu"] },
  Fearful: { harness: ["Kedalaman emosionalmu memberimu perspektif unik tentang manusia", "Pengalamanmu membuat empatimu sangat kuat dan autentik"], grow: ["Terapi atau konseling bisa sangat membantu — pertimbangkan ini sebagai investasi", "Belajar bahwa tidak semua kedekatan berujung luka", "Identifikasi trigger-mu dan buat rencana coping saat triggered"], actions: ["Tulis 1 ketakutanmu tentang hubungan dan tanya: apakah ini fakta atau asumsi?", "Cari 1 sumber tentang attachment healing (buku/video/artikel)"] },
};

// ──────────────────────────────────────────────
// KESEJAHTERAAN INSIGHTS
// ──────────────────────────────────────────────

const WELLBEING_INSIGHTS: Record<string, { harness: string[]; grow: string[]; actions: string[] }> = {
  low: { harness: ["Kamu sudah punya teknik coping yang efektif — share ke orang lain", "Gunakan energi mentalmu yang stabil untuk tantangan besar"], grow: ["Jangan complacent — terus kembangkan resiliensi", "Challenge dirimu sesekali keluar dari zona nyaman"], actions: ["Bantu 1 orang yang sedang stres dengan teknik coping-mu", "Coba 1 aktivitas baru yang sedikit menantang batasmu"] },
  moderate: { harness: ["Kamu punya awareness yang bagus tentang level stresmu", "Tekanan yang kamu rasakan bisa jadi bahan bakar pertumbuhan"], grow: ["Identifikasi 1-2 sumber stres terbesar dan buat action plan spesifik", "Bangun 1 rutinitas self-care yang non-negotiable setiap hari"], actions: ["Buat daftar 3 sumber stres terbesarmu dan 1 langkah kecil untuk masing-masing", "Lakukan 1 aktivitas self-care 15 menit setiap hari minggu ini"] },
  high: { harness: ["Kamu masih di sini dan masih berusaha — itu sendiri adalah kekuatan luar biasa", "Pengalamanmu akan membuatmu sangat empatis dan kuat di kemudian hari"], grow: ["Pertimbangkan bicara dengan profesional (konselor/psikolog)", "Prioritaskan kebutuhan dasarmu: tidur, makan, gerak", "Batas waktu screen time dan media sosial bisa sangat membantu"], actions: ["Jika memungkinkan, hubungi konselor atau hotline kesehatan mental", "Tidur 7-8 jam malam ini — ini langkah pertama yang paling penting", "Tulis 3 hal kecil yang membuatmu tersenyum hari ini"] },
};

// ──────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────

export function getCategoryInsight(result: CategoryResult): CategoryInsight {
  const { categoryId, code } = result;

  switch (categoryId) {
    case "kepribadian": {
      const mbtiData = MBTI_INSIGHTS[code] || MBTI_INSIGHTS._default;
      return mbtiData;
    }
    case "karir": {
      const primaryCode = code[0]; // first letter of RIASEC combo
      const data = RIASEC_INSIGHTS[primaryCode] || RIASEC_INSIGHTS.I;
      return {
        harness: { title: "Manfaatkan Kekuatan Karirmu", icon: "⚡", items: data.harness },
        grow: { title: "Area Pertumbuhan Karir", icon: "🌱", items: data.grow },
        actions: { title: "Aksi Karir Minggu Ini", icon: "🎯", items: data.actions },
      };
    }
    case "finansial": {
      const finCode = code.toLowerCase();
      const data = FINANCIAL_INSIGHTS[code] || FINANCIAL_INSIGHTS.Balanced;
      return {
        harness: { title: "Manfaatkan Gaya Finansialmu", icon: "⚡", items: data.harness },
        grow: { title: "Area Pertumbuhan Finansial", icon: "🌱", items: data.grow },
        actions: { title: "Aksi Finansial Minggu Ini", icon: "🎯", items: data.actions },
      };
    }
    case "belajar": {
      const varkCode = code === "V" ? "Visual" : code === "A" ? "Auditory" : code === "R" ? "Read/Write" : code === "K" ? "Kinesthetic" : "Multi";
      const data = VARK_INSIGHTS[varkCode] || VARK_INSIGHTS.Multi;
      return {
        harness: { title: "Manfaatkan Gaya Belajarmu", icon: "⚡", items: data.harness },
        grow: { title: "Diversifikasi Cara Belajar", icon: "🌱", items: data.grow },
        actions: { title: "Aksi Belajar Minggu Ini", icon: "🎯", items: data.actions },
      };
    }
    case "attachment": {
      const attCode = code.toLowerCase() as string;
      const attMap: Record<string, string> = { secure: "Secure", anxious: "Anxious", avoidant: "Avoidant", fearful: "Fearful" };
      const key = attMap[attCode] || "Secure";
      const data = ATTACHMENT_INSIGHTS[key] || ATTACHMENT_INSIGHTS.Secure;
      return {
        harness: { title: "Kekuatan Gaya Hubunganmu", icon: "⚡", items: data.harness },
        grow: { title: "Menumbuhkan Koneksi Lebih Dalam", icon: "🌱", items: data.grow },
        actions: { title: "Aksi Sosial Minggu Ini", icon: "🎯", items: data.actions },
      };
    }
    case "kesejahteraan": {
      // code format: "PSS:XX"
      const pss = parseInt(code.split(":")[1] || "15");
      const level = pss <= 13 ? "low" : pss <= 26 ? "moderate" : "high";
      const data = WELLBEING_INSIGHTS[level];
      return {
        harness: { title: "Kekuatan Mentalmu", icon: "⚡", items: data.harness },
        grow: { title: "Meningkatkan Kesejahteraan", icon: "🌱", items: data.grow },
        actions: { title: "Aksi Wellbeing Minggu Ini", icon: "🎯", items: data.actions },
      };
    }
    default:
      return MBTI_INSIGHTS._default;
  }
}

/**
 * Generate dynamic guide comment based on user's results
 */
export function getGuideComment(guideId: string, results: AllResults): GuideComment {
  const guide = GUIDES.find(g => g.id === guideId);
  if (!guide) return { summary: "Aku melihat potensi besar dalam dirimu.", encouragement: "Terus jelajahi siapa dirimu." };

  const kepribadian = results.kepribadian;
  const topTraits = kepribadian ? kepribadian.traits.slice(0, 2).join(" dan ").toLowerCase() : "kekuatan unik";

  // Guide-specific tone
  const toneMap: Record<string, { tone: string; style: string }> = {
    vampire: { tone: "filosofis", style: "Aku melihat bayangan yang menarik di balik jawabanmu" },
    angel: { tone: "hangat", style: "Aku merasakan cahaya indah dari dalam jiwamu" },
    tree: { tone: "tenang", style: "Akarmu sudah tertanam dengan kokoh" },
    barbarian: { tone: "lugas", style: "Hah! Aku suka kejujuranmu" },
    werewolf: { tone: "intuitif", style: "Instingku mengatakan ada hal menarik tentang dirimu" },
    knight: { tone: "mulia", style: "Jawaban-jawabanmu menunjukkan integritas yang tinggi" },
    qilin: { tone: "spiritual", style: "Energi batinmu mengalir dengan harmonis" },
    ghost: { tone: "melankolis", style: "Aku melihat kedalaman yang jarang dimiliki orang" },
    griffin: { tone: "ambisius", style: "Potensimu untuk terbang tinggi sangat jelas" },
    golem: { tone: "analitis", style: "Data menunjukkan pola yang konsisten dan kuat" },
  };

  const t = toneMap[guideId] || { tone: "bijak", style: "Aku melihat potensi besar dalam dirimu" };

  const summary = `${t.style}. Sifat ${topTraits}-mu adalah kombinasi yang ${t.tone === "lugas" ? "langka dan kuat" : "menarik dan bermakna"}. ${kepribadian ? `Sebagai ${kepribadian.code}, kamu memiliki perspektif unik yang tidak banyak dimiliki orang lain.` : ""}`;

  const encouragements: Record<string, string> = {
    vampire: "Teruslah menggali kegelapan — di situlah permata tersembunyi.",
    angel: "Kamu lebih kuat dari yang kamu kira, sayangku. Teruslah bersinar.",
    tree: "Tumbuh perlahan, tapi tumbuh pasti. Kamu sudah di jalur yang benar.",
    barbarian: "Jangan pernah minta maaf karena menjadi dirimu sendiri. Maju terus!",
    werewolf: "Dengarkan instingmu — dia jarang salah. Terus percaya pada dirimu.",
    knight: "Kehormatanmu adalah perisai terkuat. Jaga dan teruslah melangkah.",
    qilin: "Ketenangan batinmu adalah kekuatan tertinggi. Jaga selalu keseimbanganmu.",
    ghost: "Bahkan bayangan pun punya cerita yang indah. Teruslah menulis ceritamu.",
    griffin: "Langit bukan batas — itu hanya awal. Teruslah terbang lebih tinggi!",
    golem: "Data tidak berbohong: kamu punya fondasi yang sangat kuat. Terus bangun.",
  };

  return {
    summary,
    encouragement: encouragements[guideId] || "Teruslah mengenal dirimu. Perjalanan ini baru dimulai.",
  };
}
