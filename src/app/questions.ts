/**
 * Bank Soal KnowYourself - 126 Pertanyaan, 6 Kategori
 * Lumora Studio | ITEBA 2026
 *
 * Tipe:
 *   scale      - Batch pernyataan skala 1-10 (1 halaman)
 *   frequency  - Batch pernyataan frekuensi PSS-10 (1 halaman)
 *   mc         - Pilihan ganda (4 opsi)
 *   forced     - Forced choice (2 opsi)
 *   rank       - Ranking drag & drop
 *   essay      - Tulis bebas
 */

import type { QuizQ } from "./flow";

// ──────────────────────────────────────────────
// KATEGORI 1: TIPE KEPRIBADIAN (28 Soal → 12 halaman)
// Big Five + MBTI
// ──────────────────────────────────────────────
const KEPRIBADIAN: QuizQ[] = [
  // BATCH 1: Soal 1-10 - E/I Dimension
  {
    type: "scale",
    title: "Seberapa kamu setuju dengan pernyataan berikut?",
    statements: [
      "Aku merasa berenergi setelah menghabiskan waktu bersama banyak orang.",
      "Aku lebih suka bekerja sendiri daripada dalam kelompok.",
      "Aku mudah memulai percakapan dengan orang yang baru aku kenal.",
      "Aku butuh waktu sendiri setelah hari yang panjang dan padat.",
      "Aku sering menjadi orang pertama yang berbicara dalam diskusi kelompok.",
      "Aku lebih nyaman mengekspresikan perasaan lewat tulisan daripada bicara langsung.",
      "Aku menikmati menjadi pusat perhatian di situasi sosial.",
      "Aku lebih suka pesta kecil dengan orang dekat daripada acara besar.",
      "Aku cepat bosan jika tidak ada interaksi dengan orang lain.",
      "Aku perlu memikirkan sesuatu secara mendalam sebelum berbagi pendapat.",
    ],
    cat: "kepribadian",
  },
  // BATCH 2: Soal 11-18 - C, O, N, A, N/I Dimensions
  {
    type: "scale",
    title: "Lanjutkan - seberapa kamu setuju?",
    statements: [
      "Aku selalu menyelesaikan tugas sebelum waktunya.",
      "Aku suka mencoba hal-hal baru yang belum pernah aku lakukan sebelumnya.",
      "Aku mudah merasa cemas ketika rencana berubah mendadak.",
      "Aku menyimpan barang-barangku dengan rapi dan terorganisir.",
      "Aku senang berdiskusi tentang ide-ide abstrak dan filosofis.",
      "Aku merasa mudah terpengaruh mood orang di sekitarku.",
      "Aku bisa fokus mengerjakan satu hal sampai selesai meski ada gangguan.",
      "Aku lebih tertarik pada kemungkinan masa depan daripada fakta masa kini.",
    ],
    cat: "kepribadian",
  },
  // Soal 19 - Thinking vs Feeling
  {
    type: "mc",
    q: "Saat temanmu menceritakan masalah, kamu biasanya lebih dulu...",
    options: [
      "Memberikan solusi praktis dan langkah konkret yang bisa diambil",
      "Mendengarkan dan menunjukkan empati lebih dulu",
      "Mengajukan pertanyaan untuk memahami situasinya lebih dalam",
      "Berbagi pengalaman serupa supaya dia merasa tidak sendirian",
    ],
    cat: "kepribadian",
  },
  // Soal 20 - Judging vs Perceiving
  {
    type: "mc",
    q: "Kamu mendapat tugas besar dengan deadline 2 minggu. Kamu...",
    options: [
      "Langsung buat jadwal terperinci dan mulai hari ini",
      "Kerjakan dulu bagian yang paling menarik, sisanya nanti",
      "Riset dulu selama beberapa hari sebelum mulai",
      "Tunggu sampai deadline mendekat baru benar-benar fokus",
    ],
    cat: "kepribadian",
  },
  // Soal 21 - T/F & S/N
  {
    type: "mc",
    q: "Dalam mengambil keputusan penting, kamu lebih mengandalkan...",
    options: [
      "Logika dan analisis data yang objektif",
      "Perasaan dan nilai-nilai yang kamu pegang",
      "Intuisi dan firasat yang sulit dijelaskan",
      "Pengalaman orang lain yang bisa dijadikan referensi",
    ],
    cat: "kepribadian",
  },
  // Soal 22 - J/P & E/I
  {
    type: "mc",
    q: "Hari Sabtu kosong tanpa rencana. Kamu paling suka...",
    options: [
      "Mengisi dengan kegiatan yang sudah direncanakan sejak kemarin",
      "Spontan pergi ke mana pun yang terasa menarik",
      "Istirahat di rumah dan recharge energi",
      "Bertemu teman dan eksplorasi tempat baru",
    ],
    cat: "kepribadian",
  },
  // Soal 23 - Sensing vs Intuition
  {
    type: "forced",
    q: "Pilih yang lebih menggambarkan cara kamu memproses informasi:",
    a: "Aku lebih percaya fakta konkret dan pengalaman nyata",
    b: "Aku lebih percaya pola, konsep, dan kemungkinan masa depan",
    cat: "kepribadian",
  },
  // Soal 24 - Neuroticism vs Stability
  {
    type: "forced",
    q: "Mana yang lebih sering terjadi padamu?",
    a: "Aku sering overthinking dan susah mematikan pikiran",
    b: "Aku cenderung santai dan tidak terlalu khawatir",
    cat: "kepribadian",
  },
  // Soal 25 - Agreeableness
  {
    type: "mc",
    q: "Saat ada konflik dalam kelompok, peran yang paling sering kamu ambil adalah...",
    options: [
      "Mediator - menjembatani kedua pihak yang berkonflik",
      "Advokat - membela pihak yang menurutmu benar",
      "Pengamat - memilih diam dan membiarkan konflik selesai sendiri",
      "Pemimpin - mengambil alih dan membuat keputusan akhir",
    ],
    cat: "kepribadian",
  },
  // Soal 26 - Agreeableness / T vs F
  {
    type: "mc",
    q: "Temanmu meminta bantuan di saat kamu sedang sangat sibuk. Kamu...",
    options: [
      "Langsung bantu meski harus mengorbankan waktumu",
      "Bilang tidak bisa sekarang tapi tawarkan waktu lain",
      "Bantu setengah-setengah sambil tetap kerjakan tugasmu",
      "Tanya dulu seberapa penting dan mendesaknya",
    ],
    cat: "kepribadian",
  },
  // Soal 27 - Esai
  {
    type: "essay",
    q: "Ceritakan satu situasi di mana kamu merasa paling \"menjadi dirimu sendiri.\" Kamu sedang melakukan apa? Bersama siapa? Apa yang membuat momen itu terasa berbeda?",
    hint: "Tulis dengan bebas - tidak ada jawaban benar atau salah. 2-4 kalimat sudah cukup.",
    cat: "kepribadian",
  },
  // Soal 28 - Esai
  {
    type: "essay",
    q: "Jika kamu bisa mengubah SATU hal dari cara kamu berinteraksi dengan orang lain, apa itu? Kenapa hal itu yang kamu pilih?",
    hint: "Jawab sejujur mungkin. 2-4 kalimat sudah cukup.",
    cat: "kepribadian",
  },
];

// ──────────────────────────────────────────────
// KATEGORI 2: BIDANG KARIR (24 Soal → 10 halaman)
// Holland RIASEC
// ──────────────────────────────────────────────
const KARIR: QuizQ[] = [
  // BATCH 1: Soal 1-10 - R/I/C Dimensions
  {
    type: "scale",
    title: "Seberapa kamu setuju dengan pernyataan berikut?",
    statements: [
      "Aku menikmati pekerjaan yang melibatkan alat, mesin, atau teknologi fisik.",
      "Aku suka menganalisis data dan mencari pola tersembunyi di balik angka.",
      "Aku merasa puas ketika berhasil memperbaiki sesuatu yang rusak.",
      "Aku tertarik mempelajari cara kerja sesuatu secara mendalam.",
      "Aku lebih suka bekerja dengan benda nyata daripada ide abstrak.",
      "Aku senang melakukan eksperimen dan menguji hipotesis.",
      "Aku merasa nyaman dengan pekerjaan yang terstruktur dan prosedural.",
      "Aku tertarik pada penelitian ilmiah atau pengembangan teknologi.",
      "Aku lebih suka hasil yang bisa dilihat dan diukur secara konkret.",
      "Aku menikmati membaca jurnal, buku, atau artikel ilmiah.",
    ],
    cat: "karir",
  },
  // Soal 11 - Proyek impian
  {
    type: "mc",
    q: "Jika kamu bisa memilih proyek impian, kamu akan pilih...",
    options: [
      "Merancang sistem teknologi yang efisien dan skalabel",
      "Membuat kampanye kreatif yang menggerakkan orang banyak",
      "Mendirikan program sosial untuk komunitas yang membutuhkan",
      "Membangun bisnis dari nol sampai menguntungkan",
    ],
    cat: "karir",
  },
  // Soal 12 - Peran tim
  {
    type: "mc",
    q: "Dalam sebuah tim proyek, kamu paling menikmati peran sebagai...",
    options: [
      "Analis - mengolah data dan menyajikan insight",
      "Kreator - menghasilkan konten atau desain",
      "Fasilitator - memastikan semua orang align dan produktif",
      "Leader - memimpin, memotivasi, dan mengambil keputusan",
    ],
    cat: "karir",
  },
  // Soal 13-16 - A/S Scales (grouped)
  {
    type: "scale",
    title: "Seberapa kamu setuju?",
    statements: [
      "Aku senang mengekspresikan diri melalui seni, musik, tulisan, atau desain.",
      "Aku merasa paling bermakna saat bisa membantu orang lain berkembang.",
      "Aku suka situasi di mana aku bisa mengekspresikan kreativitas tanpa batas.",
      "Aku menikmati mengajar, melatih, atau membimbing orang lain.",
    ],
    cat: "karir",
  },
  // Soal 17 - Lingkungan kerja
  {
    type: "mc",
    q: "Kamu lebih termotivasi bekerja di lingkungan yang...",
    options: [
      "Penuh tantangan baru dan tidak pernah rutin",
      "Terstruktur dengan tanggung jawab yang jelas",
      "Kolaboratif dan hangat dengan hubungan antar manusia",
      "Kompetitif dengan reward yang sepadan dengan performa",
    ],
    cat: "karir",
  },
  // Soal 18-20 - E/C Scales (grouped)
  {
    type: "scale",
    title: "Lanjutkan - seberapa kamu setuju?",
    statements: [
      "Aku senang memimpin orang lain menuju target yang ambisius.",
      "Aku merasa nyaman dengan pekerjaan administratif dan detail.",
      "Aku tertarik pada dunia bisnis, negosiasi, dan strategi.",
    ],
    cat: "karir",
  },
  // Soal 21 - Ranking nilai karir
  {
    type: "rank",
    q: "Urutkan nilai berikut dari yang paling penting bagimu dalam pekerjaan:",
    items: [
      "Kebebasan berkreasi tanpa batasan",
      "Stabilitas dan keamanan karir",
      "Dampak sosial yang nyata",
      "Penghasilan dan status tinggi",
      "Kemajuan ilmu dan pengetahuan",
      "Memimpin dan punya pengaruh",
    ],
    cat: "karir",
  },
  // Soal 22 - Forced: Orang vs Benda
  {
    type: "forced",
    q: "Kamu lebih menikmati pekerjaan yang:",
    a: "Bekerja DENGAN orang - mengajar, memimpin, melayani",
    b: "Bekerja PADA sesuatu - data, sistem, objek, ide",
    cat: "karir",
  },
  // Soal 23 - Forced: Kreatif vs Efisien
  {
    type: "forced",
    q: "Pilih yang lebih menggambarkan cara kamu ingin berkarya:",
    a: "Aku ingin menciptakan sesuatu yang orisinal dan ekspresif",
    b: "Aku ingin mengoptimalkan sistem yang sudah ada agar lebih efisien",
    cat: "karir",
  },
  // Soal 24 - Esai
  {
    type: "essay",
    q: "Kalau semua pekerjaan dibayar sama dan kamu bebas memilih, kamu akan kerja sebagai apa? Jelaskan aktivitas sehari-hari yang paling kamu bayangkan.",
    hint: "Tidak perlu menyebut nama profesi. Ceritakan aktivitasnya. 2-4 kalimat.",
    cat: "karir",
  },
];

// ──────────────────────────────────────────────
// KATEGORI 3: KEPRIBADIAN FINANSIAL (20 Soal → 5 halaman)
// Klontz Money Script
// ──────────────────────────────────────────────
const FINANSIAL: QuizQ[] = [
  // BATCH 1: Soal 1-10 - Money Scripts
  {
    type: "scale",
    title: "Seberapa kamu setuju dengan pernyataan berikut tentang uang?",
    statements: [
      "Uang adalah sumber dari banyak masalah dan konflik di dunia.",
      "Uang banyak akan membuat hidupku jauh lebih bahagia.",
      "Aku sering merasa bersalah ketika menghabiskan uang untuk diri sendiri.",
      "Aku rela kerja keras melampaui batas demi menghasilkan lebih banyak uang.",
      "Membahas uang dengan orang lain terasa tidak sopan atau tabu.",
      "Uang adalah ukuran utama kesuksesan seseorang.",
      "Aku merasa tidak layak memiliki uang banyak.",
      "Kekayaan materiel adalah tanda bahwa seseorang bekerja keras dan cerdas.",
      "Tidak pernah ada uang yang cukup - selalu butuh lebih.",
      "Orang yang peduli dengan penampilan mahal dinilai lebih sukses.",
    ],
    cat: "finansial",
  },
  // Soal 11-14 - Vigilance/Planning
  {
    type: "scale",
    title: "Bagaimana kebiasaan keuanganmu?",
    statements: [
      "Aku selalu mengetahui dengan tepat berapa saldo rekeningku sekarang.",
      "Aku memiliki anggaran pengeluaran bulanan yang aku ikuti dengan disiplin.",
      "Aku sering membeli sesuatu secara impulsif tanpa merencanakan sebelumnya.",
      "Aku menabung secara rutin meski jumlahnya kecil.",
    ],
    cat: "finansial",
  },
  // Soal 15-18 - Spending/Security
  {
    type: "scale",
    title: "Lanjutkan - kebiasaan keuanganmu:",
    statements: [
      "Aku sering menggunakan belanja sebagai cara untuk merasa lebih baik.",
      "Aku merasa cemas jika tidak punya tabungan darurat.",
      "Aku bersedia menunda kepuasan sekarang demi keuntungan finansial di masa depan.",
      "Aku lebih suka menikmati uang sekarang daripada menabungnya.",
    ],
    cat: "finansial",
  },
  // Soal 19 - Uang tak terduga
  {
    type: "mc",
    q: "Kamu mendapat uang tak terduga sebesar Rp 1.000.000. Yang PERTAMA kamu lakukan:",
    options: [
      "Langsung tabung seluruhnya ke rekening simpanan",
      "Beli sesuatu yang sudah lama aku inginkan",
      "Bayar utang atau tagihan yang tertunda",
      "Bagi sebagian untuk ditabung, sebagian untuk dinikmati",
    ],
    cat: "finansial",
  },
  // Soal 20 - Esai
  {
    type: "essay",
    q: "Apa hubunganmu dengan uang saat ini - apakah kamu merasa aman, cemas, atau punya perasaan lain? Ceritakan satu keputusan finansial yang pernah kamu sesali atau banggakan.",
    hint: "Ceritakan sejujurnya. 2-4 kalimat sudah cukup.",
    cat: "finansial",
  },
];

// ──────────────────────────────────────────────
// KATEGORI 4: GAYA BELAJAR (16 Soal → 13 halaman)
// VARK Model
// ──────────────────────────────────────────────
const BELAJAR: QuizQ[] = [
  // Soal 1
  { type: "mc", q: "Kamu baru belajar cara menggunakan aplikasi baru di HP. Kamu lebih suka...", options: ["Langsung coba-coba sendiri sampai bisa", "Lihat video tutorial di YouTube", "Baca panduan atau artikel step-by-step", "Minta teman menjelaskan dan menunjukkan langsung"], cat: "belajar" },
  // Soal 2
  { type: "mc", q: "Saat mengingat perjalanan liburan, yang paling sering kamu ingat adalah...", options: ["Pemandangan dan warna yang indah yang kamu lihat", "Suara-suara khas di tempat itu - musik, bahasa, bunyi alam", "Pengalaman fisik - rasa makanan, tekstur, gerakan", "Cerita dan informasi yang kamu baca tentang tempat itu"], cat: "belajar" },
  // Soal 3
  { type: "mc", q: "Kamu ingin mempelajari topik baru yang kompleks. Kamu mulai dengan...", options: ["Cari video penjelasan visual atau infografis", "Langsung praktik atau simulasi secara langsung", "Baca buku atau artikel yang komprehensif tentang topik ini", "Diskusi dengan orang yang sudah ahli di bidang ini"], cat: "belajar" },
  // Soal 4
  { type: "mc", q: "Cara yang paling mudah bagimu untuk memahami instruksi panjang adalah...", options: ["Dibuat dalam bentuk diagram alur atau flowchart", "Disampaikan secara lisan dengan penjelasan rinci", "Ditulis dalam list poin-poin yang jelas", "Langsung dipraktikkan sambil mengikuti langkah-langkahnya"], cat: "belajar" },
  // Soal 5
  { type: "mc", q: "Saat belajar untuk ujian, metode yang paling efektif bagimu adalah...", options: ["Buat mind map atau diagram visual dari materi", "Rekam ringkasan dan putar ulang sambil belajar", "Buat catatan tertulis ringkas lalu baca berulang", "Kerjakan soal latihan dan simulasi sebanyak mungkin"], cat: "belajar" },
  // Soal 6
  { type: "mc", q: "Kamu ingin menjelaskan konsep yang rumit ke temanmu. Kamu paling sering...", options: ["Gambari di kertas atau buat sketsa visual", "Jelaskan dengan analogi dan cerita yang relatable", "Tulis poin-poin kunci dan minta dia membacanya", "Tunjukkan langsung dengan contoh nyata atau simulasi"], cat: "belajar" },
  // Soal 7
  { type: "mc", q: "Kamu paling mudah mengingat sesuatu jika...", options: ["Ada gambar, grafik, atau warna yang menarik perhatianmu", "Kamu mendengarnya diulang beberapa kali", "Kamu menuliskannya sendiri dengan kata-katamu", "Kamu melakukannya sendiri secara langsung"], cat: "belajar" },
  // Soal 8
  { type: "mc", q: "Kamu sedang belajar bahasa baru. Cara yang paling cocok untukmu adalah...", options: ["Lihat film atau video dengan subtitle bahasa itu", "Dengarkan lagu, podcast, atau percakapan native speaker", "Baca buku teks tata bahasa dan kosakata secara sistematis", "Langsung berbicara dengan native speaker atau ikut conversation class"], cat: "belajar" },
  // Soal 9
  { type: "mc", q: "Feedback yang paling membantumu berkembang adalah...", options: ["Diberikan dalam bentuk grafik performa atau visualisasi data", "Disampaikan langsung secara lisan dengan penjelasan detail", "Ditulis dalam bentuk laporan atau komentar tertulis", "Diberikan langsung sambil kamu mencoba ulang"], cat: "belajar" },
  // Soal 10
  { type: "mc", q: "Di kelas atau seminar, kamu paling mudah tetap fokus jika...", options: ["Ada slide visual yang menarik dan diagram yang jelas", "Pembicara menyampaikan dengan suara dan intonasi yang ekspresif", "Kamu bisa mencatat poin-poin penting di buku atau laptop", "Ada sesi diskusi, role-play, atau praktik langsung"], cat: "belajar" },
  // Soal 11
  { type: "mc", q: "Ketika mengikuti resep masakan baru, kamu lebih suka...", options: ["Lihat video memasak step by step", "Dengarkan podcast memasak atau minta seseorang menjelaskan", "Baca resep teks yang detail dan terstruktur", "Langsung mulai masak sambil eksperimen"], cat: "belajar" },
  // Soal 12
  { type: "mc", q: "Saat pergi ke tempat baru tanpa tahu jalan, kamu lebih suka...", options: ["Buka Google Maps dan ikuti visual route-nya", "Telepon seseorang dan minta petunjuk arah lisan", "Baca deskripsi jalan yang sudah ditulis sebelumnya", "Jalan saja dan rasakan arahnya secara intuitif"], cat: "belajar" },
  // Soal 13-16 - Scale cross-validation
  {
    type: "scale",
    title: "Seberapa kamu setuju?",
    statements: [
      "Aku lebih mudah memahami materi jika disajikan dengan grafik, diagram, atau peta pikiran.",
      "Aku lebih mudah belajar sambil bergerak, mempraktikkan, atau menyentuh objeknya langsung.",
      "Aku lebih mudah mengingat sesuatu jika aku membaca dan menulisnya.",
      "Aku belajar lebih baik dengan mendengarkan penjelasan daripada membaca sendiri.",
    ],
    cat: "belajar",
  },
];

// ──────────────────────────────────────────────
// KATEGORI 5: GAYA ATTACHMENT SOSIAL (18 Soal → 3 halaman)
// ECR-S
// ──────────────────────────────────────────────
const ATTACHMENT: QuizQ[] = [
  // BATCH 1: Soal 1-9 - Anxiety Dimension
  {
    type: "scale",
    title: "Seberapa kamu setuju tentang hubunganmu dengan orang lain?",
    statements: [
      "Aku khawatir bahwa orang-orang yang aku sayangi tidak benar-benar peduli padaku.",
      "Aku takut ditinggalkan oleh orang-orang yang penting bagiku.",
      "Aku sering merasa insecure tentang apakah hubunganku dengan orang lain baik-baik saja.",
      "Aku sangat butuh keyakinan bahwa orang lain benar-benar menyayangiku.",
      "Aku merasa sangat terganggu ketika orang dekatku tidak segera membalas pesanku.",
      "Aku sering khawatir bahwa aku terlalu butuh perhatian dari orang lain.",
      "Hubunganku dengan orang lain sering terasa tidak seimbang - aku yang lebih banyak memberi.",
      "Aku merasa lebih nyaman ketika orang lain sangat dekat denganku secara emosional.",
      "Aku mudah cemburu atau iri ketika orang yang aku sayangi dekat dengan orang lain.",
    ],
    cat: "attachment",
  },
  // BATCH 2: Soal 10-17 - Avoidance Dimension
  {
    type: "scale",
    title: "Lanjutkan - tentang kedekatan emosional:",
    statements: [
      "Aku tidak nyaman berbagi perasaan atau masalah pribadiku dengan orang lain.",
      "Aku lebih suka tidak bergantung pada siapapun secara emosional.",
      "Aku merasa tidak nyaman ketika seseorang terlalu ingin dekat denganku.",
      "Aku lebih mudah mengatasi masalah sendirian daripada meminta bantuan.",
      "Aku merasa canggung ketika orang lain mengekspresikan emosi yang intens.",
      "Aku cenderung menutup diri saat sedang sedih atau stres.",
      "Aku merasa hubungan yang terlalu dekat justru membuatku tidak bebas.",
      "Aku mudah percaya bahwa orang lain akan ada untukku saat aku membutuhkan.",
    ],
    cat: "attachment",
  },
  // Soal 18 - Esai
  {
    type: "essay",
    q: "Ceritakan hubungan yang paling bermakna dalam hidupmu saat ini (bisa teman, keluarga, atau siapapun). Apa yang membuatnya bermakna? Apakah ada ketakutan yang kamu rasakan dalam hubungan itu?",
    hint: "Tulis dengan jujur. 2-4 kalimat sudah cukup.",
    cat: "attachment",
  },
];

// ──────────────────────────────────────────────
// KATEGORI 6: KESEJAHTERAAN DIRI (20 Soal → 6 halaman)
// PSS-10 + Schwartz Values + Lazarus Coping
// ──────────────────────────────────────────────
const KESEJAHTERAAN: QuizQ[] = [
  // PSS-10: Soal 1-10 - Frequency Scale
  {
    type: "frequency",
    title: "Dalam sebulan terakhir, seberapa sering kamu mengalami hal berikut?",
    statements: [
      "Merasa kesal karena sesuatu yang terjadi di luar dugaan.",
      "Merasa tidak mampu mengendalikan hal-hal penting dalam hidupmu.",
      "Merasa gugup dan stres.",
      "Merasa percaya diri dalam menangani masalah pribadimu.",
      "Merasa segalanya berjalan sesuai keinginanmu.",
      "Merasa tidak bisa mengatasi semua hal yang harus kamu lakukan.",
      "Bisa mengendalikan rasa jengkel dalam hidupmu.",
      "Merasa berada di atas kendali situasi.",
      "Marah karena hal-hal di luar kendalimu.",
      "Kesulitan menumpuk sampai terasa tidak bisa diatasi.",
    ],
    cat: "kesejahteraan",
  },
  // Soal 11-16 - Schwartz Values Scales
  {
    type: "scale",
    title: "Seberapa penting hal-hal berikut bagimu?",
    statements: [
      "Kebebasan untuk membuat keputusan sendiri tanpa diatur orang lain sangat penting bagiku.",
      "Aku sangat menghargai keamanan dan stabilitas dalam hidupku.",
      "Bagi aku, keberhasilan dan pencapaian adalah hal yang paling mendorong semangatku.",
      "Aku lebih mementingkan kesejahteraan orang-orang di sekitarku daripada kepentinganku sendiri.",
      "Aku percaya penting untuk mengikuti norma dan tradisi yang berlaku di masyarakat.",
      "Aku termotivasi oleh tantangan dan pengalaman baru yang mengandung risiko.",
    ],
    cat: "kesejahteraan",
  },
  // Soal 17 - Ranking area kehidupan
  {
    type: "rank",
    q: "Urutkan area kehidupan berikut dari yang paling ingin kamu tingkatkan dalam 1 tahun ke depan:",
    items: [
      "Kesehatan fisik dan mental",
      "Hubungan sosial dan keluarga",
      "Karir dan prestasi akademik",
      "Keuangan dan investasi",
      "Kreativitas dan pengembangan diri",
      "Spiritualitas dan makna hidup",
    ],
    cat: "kesejahteraan",
  },
  // Soal 18 - Coping Strategy
  {
    type: "mc",
    q: "Saat kamu menghadapi situasi yang sangat menekan, cara yang PALING SERING kamu lakukan untuk mengatasinya adalah...",
    options: [
      "Langsung cari solusi dan action plan yang konkret",
      "Ceritakan ke orang terpercaya untuk dapat dukungan",
      "Alihkan pikiran dengan aktivitas yang kamu sukai",
      "Terima situasinya dan cari makna dari pengalaman ini",
    ],
    cat: "kesejahteraan",
  },
  // Soal 19 - Forced: Time Orientation
  {
    type: "forced",
    q: "Mana yang lebih mencerminkan orientasi hidupmu saat ini?",
    a: "Aku hidup untuk hari ini - menikmati momen sekarang sepenuhnya",
    b: "Aku hidup untuk masa depan - setiap keputusan adalah investasi",
    cat: "kesejahteraan",
  },
  // Soal 20 - Esai
  {
    type: "essay",
    q: "Dalam satu paragraf: apa yang saat ini paling membuatmu merasa hidup ini bermakna? Dan apa yang paling sering membuatmu merasa kehilangan energi atau semangat?",
    hint: "Ceritakan dengan jujur. 2-4 kalimat sudah cukup.",
    cat: "kesejahteraan",
  },
];

// ──────────────────────────────────────────────
// EXPORT
// ──────────────────────────────────────────────

export const CATEGORY_QUESTIONS: Record<string, QuizQ[]> = {
  kepribadian: KEPRIBADIAN,
  karir: KARIR,
  finansial: FINANSIAL,
  belajar: BELAJAR,
  attachment: ATTACHMENT,
  kesejahteraan: KESEJAHTERAAN,
};

/** Menggabungkan soal dari kategori terpilih, menjaga urutan kategori */
export function getQuestionsForCategories(catIds: string[], isQuick = false): QuizQ[] {
  const all = catIds.flatMap(id => CATEGORY_QUESTIONS[id] || []);
  if (!isQuick) return all;
  
  // In Quick Mode, only keep 'scale', 'frequency', and 'forced' to capture core dimensions quickly.
  // We can skip 'essay', 'rank', and 'mc' to save time.
  return all.filter(q => q.type === "scale" || q.type === "frequency" || q.type === "forced");
}

/** Estimasi waktu per kategori (dalam menit) */
export const CATEGORY_TIME_ESTIMATES: Record<string, number> = {
  kepribadian: 8,
  karir: 7,
  finansial: 5,
  belajar: 5,
  attachment: 4,
  kesejahteraan: 5,
};
