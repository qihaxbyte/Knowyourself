export type DialogueEntry = {
  intro: string[];
  mid: string[];
  end: string[];
};

export const GUIDE_DIALOGUES: Record<string, Record<string, DialogueEntry>> = {
  vampire: {
    kepribadian: {
      intro: ["Bayanganmu semakin jelas... mari kita lihat sisi terdalammu.", "Jawablah dengan jujur, jangan ada yang disembunyikan dariku."],
      mid: ["Menarik. Pola pikirmu lebih dalam dari kelihatannya.", "Pilihan yang sulit, tapi aku menghargai kejujuranmu.", "Hmm, ini semakin mengungkap teka-teki dirimu."],
      end: ["Satu langkah lagi... dan wujud aslimu akan terungkap sepenuhnya.", "Tuntaskan ini, aku sudah bisa membaca jiwamu."]
    },
    karir: {
      intro: ["Setiap langkah karir adalah bidak catur. Mari susun strategimu.", "Dunia profesional penuh intrik. Tunjukkan jalanmu."],
      mid: ["Ambisi yang tenang. Pilihan yang elegan.", "Kau lebih memilih makna daripada sorotan, bukan?", "Menarik. Ini jalur yang tak banyak dipilih orang."],
      end: ["Skakmat sudah dekat. Selesaikan pilihan terakhirmu.", "Sebentar lagi takdir karirmu akan terlihat jelas."]
    },
    finansial: {
      intro: ["Kekayaan adalah kekuatan. Bagaimana caramu memanifestasikannya?", "Uang hanyalah alat. Mari lihat caramu mengendalikannya."],
      mid: ["Kau cukup berhati-hati dengan sumber dayamu.", "Investasi yang tajam. Kau berpikir jangka panjang.", "Keputusan finansial yang sangat rasional."],
      end: ["Jawaban terakhir. Mari hitung nilai sejatimu.", "Selesaikan ini, dan aku akan menilai kekayaan batinmu."]
    },
    belajar: {
      intro: ["Pengetahuan adalah keabadian. Bagaimana caramu menyerapnya?", "Mari ungkap rahasia cara akalmu bekerja."],
      mid: ["Membaca pola... ini cara yang sangat efisien.", "Kau belajar bagaikan pemburu mengamati mangsanya.", "Analisis yang tajam. Sangat elegan."],
      end: ["Pecahkan misteri kognitif terakhir ini.", "Sedikit lagi, dan rahasia logikamu akan terungkap."]
    },
    attachment: {
      intro: ["Hubungan manusia selalu rapuh. Bagaimana denganmu?", "Mari lihat dinding apa yang kau bangun di sekelilingmu."],
      mid: ["Kau menjaga jarak dengan elegan.", "Keterikatan adalah kelemahan, sekaligus kekuatan mematikan.", "Sebuah rahasia hati yang mulai merembes keluar."],
      end: ["Satu keping terakhir dari hatimu.", "Tuntaskan. Aku tidak akan menghakimi masa lalumu."]
    },
    kesejahteraan: {
      intro: ["Ketenangan batin... mari kita cari tahu apa yang mengganggumu.", "Seberapa lelah jiwamu sebenarnya dari hiruk-pikuk dunia?"],
      mid: ["Kau terlalu keras pada dirimu sendiri, biarkan bayangan memelukmu.", "Tarik napas panjang. Kegelapan ini hanya sementara.", "Pemulihan butuh waktu. Nikmati prosesnya."],
      end: ["Lepaskan beban terakhir ini kepadaku.", "Selesai sudah. Mari sembuhkan apa yang terluka dalam sunyi."]
    }
  },
  angel: {
    kepribadian: {
      intro: ["Aku di sini menemanimu. Jangan ragu menjadi dirimu yang asli.", "Mari pancarkan cahaya indah dari dalam jiwamu."],
      mid: ["Kepribadianmu sangat hangat dan menginspirasi.", "Tidak apa-apa, setiap manusia punya kelebihan dan kekurangannya.", "Aku mengerti perasaanmu saat memilih itu."],
      end: ["Satu pertanyaan lagi, sayangku. Kamu pasti bisa.", "Hampir selesai! Sisi cemerlangmu sudah terlihat."]
    },
    karir: {
      intro: ["Pekerjaan apa yang bisa menyebarkan kebaikanmu? Mari kita cari tahu.", "Karir sejatimu adalah yang membawamu pada kebahagiaan."],
      mid: ["Wah, kamu sangat memedulikan dampak bagi orang lain!", "Menjadi bermanfaat adalah tujuan yang sangat mulia.", "Pilihan yang indah. Kamu akan bersinar di sana."],
      end: ["Langkah terakhir untuk menemukan panggilan jiwamu.", "Satu lagi! Masa depan cerah menantimu."]
    },
    finansial: {
      intro: ["Mari bicarakan soal uang tanpa rasa takut. Aku akan memandumu.", "Berbagi atau menyimpan? Mari cari tahu gaya finansialmu."],
      mid: ["Kedermawananmu sangat menyentuh hati.", "Tidak masalah memikirkan diri sendiri, kamu juga berhak bahagia.", "Kebiasaan yang baik. Teruskan!"],
      end: ["Satu lagi tentang keuangan. Kamu sudah melakukannya dengan baik.", "Akhirnya selesai. Semoga rezekimu selalu mengalir lancar!"]
    },
    belajar: {
      intro: ["Mari temukan cara paling nyaman bagimu untuk bertumbuh.", "Belajar itu menyenangkan jika kita tahu caranya."],
      mid: ["Oh, jadi begitu caramu memahami sesuatu? Luar biasa!", "Gaya belajarmu sangat unik dan penuh semangat.", "Pelan-pelan saja, yang penting ilmunya meresap."],
      end: ["Pertanyaan pamungkas! Kamu belajar dengan sangat baik.", "Sedikit lagi, dan kita akan menemukan gaya belajarmu."]
    },
    attachment: {
      intro: ["Mari buka hati perlahan-lahan. Kamu aman bersamaku.", "Cinta dan kasih sayang adalah anugerah terbesar manusia."],
      mid: ["Tidak apa-apa merasa rapuh. Itu yang membuatmu manusia.", "Aku mengerti luka itu, biarkan aku membalutnya.", "Pilihan yang penuh kasih. Kamu pantas disayangi."],
      end: ["Hanya tersisa satu pertanyaan. Bernapaslah dalam-dalam.", "Kamu sudah sangat berani membuka diri. Satu pertanyaan terakhir."]
    },
    kesejahteraan: {
      intro: ["Bagaimana kabarmu hari ini? Mari kita periksa kesejahteraan mentalmu.", "Kesehatan jiwamu sangat berharga, mari kita rawat."],
      mid: ["Tarik napas... buang... kamu sudah melakukan yang terbaik.", "Jangan lupakan dirimu sendiri saat merawat orang lain.", "Menangis itu tidak apa-apa. Lepaskan saja perlahan."],
      end: ["Pertanyaan terakhir. Terima kasih sudah kuat selama ini.", "Selesai. Kamu sangat berharga, jangan pernah lupa itu."]
    }
  },
  tree: {
    kepribadian: {
      intro: ["Angin berlalu, tapi akar kita tetap teguh. Mari kenali akarmu.", "Pertumbuhan butuh waktu. Mari mulai dengan tenang."],
      mid: ["Pondasi yang kokoh.", "Itu adalah nilai-nilai yang akan bertahan lama.", "Sangat tenang, seperti hutan di pagi hari."],
      end: ["Satu daun lagi yang akan gugur, mengungkap jati dirimu.", "Selesaikan ini, dan akarmu akan semakin dalam."]
    },
    karir: {
      intro: ["Bekerja adalah menumbuhkan hutan. Mari lihat benih apa yang cocok untukmu.", "Konsistensi adalah kunci. Mari cari tanah yang tepat untukmu."],
      mid: ["Ketekunanmu akan membuahkan hasil.", "Lingkungan kerja ini cocok untukmu bertumbuh.", "Kamu adalah pelindung bagi rekan-rekanmu."],
      end: ["Satu benih terakhir untuk ditanam.", "Langkah terakhir menuju karir yang stabil dan bermakna."]
    },
    finansial: {
      intro: ["Menyimpan air untuk musim kemarau. Mari kita lihat persiapan finansialmu.", "Keamanan adalah kedamaian. Mari periksa hartamu."],
      mid: ["Perencanaan yang sangat bijaksana.", "Kau tidak terburu-buru, itu hal yang baik.", "Menabung sedikit demi sedikit, lama-lama menjadi bukit."],
      end: ["Cabang terakhir dari pohon finansialmu.", "Selesaikan dengan kebijaksanaan yang sama."]
    },
    belajar: {
      intro: ["Menyerap ilmu bagai tanah menyerap air hujan. Mari kita mulai.", "Setiap cincin di batang pohonmu adalah ilmu baru."],
      mid: ["Meresapi teori perlahan namun pasti.", "Praktek adalah cara terbaik bagi akar untuk membumi.", "Kesabaranmu dalam belajar sangat mengagumkan."],
      end: ["Satu tetes ilmu terakhir di kuis ini.", "Selesai. Pengetahuanmu semakin berakar kuat."]
    },
    attachment: {
      intro: ["Terkadang kita merambat, terkadang kita butuh ruang. Bagaimana denganmu?", "Mari lihat dengan siapa kau merajut ikatan."],
      mid: ["Kau menaungi orang yang kau cintai.", "Kepercayaan dibangun perlahan-lahan, seperti pohon cedar.", "Kesetiaan adalah sifat yang kau pegang teguh."],
      end: ["Tinggal satu lagi. Kuatkan hatimu.", "Pilihan terakhir untuk mengungkap akar hubunganmu."]
    },
    kesejahteraan: {
      intro: ["Apakah daun-daunmu mulai menguning? Mari kita periksa.", "Kembali ke alam. Mari kita selaraskan jiwamu."],
      mid: ["Angin topan akan berlalu, kau akan tetap berdiri.", "Beristirahatlah jika kau lelah berbuah.", "Pelihara dirimu sendiri, seindah kau memelihara sekitarmu."],
      end: ["Pertanyaan terakhir. Semoga batinmu selalu hijau.", "Sudah selesai. Sekarang biarkan dirimu beristirahat tenang."]
    }
  },
  barbarian: {
    kepribadian: {
      intro: ["Hiyah! Ayo kita hancurkan kuis ini! Jawab tanpa ragu!", "Jangan berpikir terlalu lama, ikuti insting petarungmu!"],
      mid: ["Hahaha! Jawaban yang sangat berani!", "Itu baru semangat! Hadapi saja apa adanya!", "Aku suka caramu mengambil keputusan. Cepat dan tangkas!"],
      end: ["Satu pukulan terakhir! Habisi kuis ini!", "Langkah pamungkas! Buktikan siapa dirimu sebenarnya!"]
    },
    karir: {
      intro: ["Medan perang mana yang akan kau taklukkan? Mari kita pilih!", "Dunia kerja butuh pejuang sepertimu! Ayo mulai!"],
      mid: ["Strategi yang bagus, langsung ke intinya!", "Pekerjaan ini butuh nyali, dan kau memilikinya!", "Kau jelas bukan tipe yang suka duduk diam di belakang meja!"],
      end: ["Serangan terakhir! Tetapkan karir idamanmu!", "Satu lagi dan kita akan tahu arena bertarungmu!"]
    },
    finansial: {
      intro: ["Uang hasil rampasan! Bagaimana caramu menghabiskannya?", "Simpan untuk senjata baru, atau pesta pora? Ayo jawab!"],
      mid: ["Wah, pengeluaran yang agresif! Aku suka itu!", "Kau sangat memikirkan persediaan logistik, langkah pintar!", "Harta hanya berguna jika bisa dinikmati, kan?"],
      end: ["Satu lagi! Amankan koin-koinmu!", "Keputusan finansial terakhir, jangan sampai ragu!"]
    },
    belajar: {
      intro: ["Teori membosankan? Mari kita langsung terjun ke lapangan!", "Cara terbaik belajar adalah dengan melakukannya!"],
      mid: ["Kau belajar dari bekas luka, itu pelajaran terbaik!", "Eksperimen langsung! Sangat barbar!", "Cepat menangkap poin utamanya. Luar biasa!"],
      end: ["Hancurkan soal terakhir ini!", "Satu pukulan lagi dan kita selesai belajar!"]
    },
    attachment: {
      intro: ["Siapa yang pantas menjaga punggungmu di medan perang? Mari cari tahu!", "Cinta itu seperti pertarungan, butuh keberanian!"],
      mid: ["Kau melindungi mereka yang lemah, pahlawan sejati!", "Terkadang kau butuh ruang gerak, jangan mau diikat!", "Ikatan yang sangat kuat, bagai persaudaraan antar prajurit!"],
      end: ["Satu soal terakhir soal hati!", "Hanya yang paling berani yang jujur soal perasaan. Ayo!"]
    },
    kesejahteraan: {
      intro: ["Apa yang membuat semangatmu padam? Ayo kita bakar kembali!", "Kelelahan? Mari kita periksa kondisimu, kawan!"],
      mid: ["Jangan biarkan masalah mengalahkanmu! Balas pukulannya!", "Tidur sesaat tidak masalah, pahlawan juga butuh istirahat.", "Tetap tegar! Kau lebih kuat dari kelihatannya!"],
      end: ["Lawan rintangan terakhir ini!", "Kuis selesai! Waktunya merayakan kemenanganmu!"]
    }
  },
  werewolf: {
    kepribadian: {
      intro: ["Bulan bersinar terang... mari kita dengar lolongan dari dalam hatimu.", "Instingmu tidak pernah berbohong. Ikuti saja."],
      mid: ["Aku bisa mencium kejujuran dalam pilihanmu.", "Sisi liarmu mulai terlihat.", "Kamu sangat terhubung dengan nalurimu."],
      end: ["Satu langkah lagi sebelum fajar menyingsing.", "Pertanyaan terakhir... biarkan instingmu mengambil alih."]
    },
    karir: {
      intro: ["Hutan beton butuh insting bertahan hidup. Mari cari wilayah perburuanmu.", "Pekerjaan mana yang membangkitkan gairah liarmu?"],
      mid: ["Kau butuh kebebasan, bukan kurungan.", "Ide yang liar dan tidak terduga. Sangat kreatif.", "Kau mengawasi dari jauh, lalu bertindak pada saat yang tepat."],
      end: ["Satu jejak terakhir untuk menemukan wilayahmu.", "Gigitan terakhir untuk menentukan jalan karirmu."]
    },
    finansial: {
      intro: ["Uang bagaikan daging buruan. Mari kita lihat bagaimana caramu menyimpannya.", "Apakah kau serakah, atau berbagi tangkapanmu?"],
      mid: ["Kamu menyimpan persediaan untuk musim dingin.", "Tidak terlalu peduli dengan gemerlap koin, ya?", "Berbagi hasil buruan dengan kawan. Luar biasa."],
      end: ["Keputusan finansial terakhirmu, sebelum bulan tenggelam.", "Tentukan langkah terakhir ini dengan insting."]
    },
    belajar: {
      intro: ["Dengarkan, lihat, rasakan. Mari pelajari cara otakmu menyerap informasi.", "Pelajaran terbaik didapat di bawah sinar rembulan."],
      mid: ["Memvisualisasikan dengan sangat baik.", "Kau belajar lewat insting yang tajam.", "Merasakan secara langsung adalah caramu belajar."],
      end: ["Pertanyaan kognitif terakhir.", "Satu lagi. Biarkan nalurimu yang memilih."]
    },
    attachment: {
      intro: ["Setiap serigala butuh kawanannya. Bagaimana denganmu?", "Siapa yang kau izinkan mendekati sarangmu?"],
      mid: ["Kamu sangat protektif terhadap orang-orang terdekatmu.", "Luka masa lalu membuatmu waspada, aku mengerti.", "Terkadang kau butuh waktu menyendiri di hutan."],
      end: ["Satu ikatan terakhir untuk kita uji.", "Jawab pertanyaan terakhir ini dengan jujur."]
    },
    kesejahteraan: {
      intro: ["Apakah kamu merasa terkurung akhir-akhir ini? Mari kita periksa lukamu.", "Bulan selalu menerima kesedihanmu."],
      mid: ["Kamu butuh berlari bebas untuk melepas penat.", "Jangan pendam amarahmu, lepaskan saja dalam lolongan.", "Penyembuhan datang dari dalam diri."],
      end: ["Satu lagi... kamu sudah bertahan dengan baik.", "Kuis selesai. Waktunya kembali ke hutanmu dan beristirahat."]
    }
  },
  knight: {
    kepribadian: {
      intro: ["Dengan pedang keadilan di tanganku, aku akan memandumu mengenal diri.", "Mari tegakkan kejujuran dalam kuis ini."],
      mid: ["Prinsipmu sangat mulia.", "Keputusan yang diambil dengan pertimbangan moral yang matang.", "Kau adalah pembela kebenaran di duniamu sendiri."],
      end: ["Satu tantangan terakhir, satria!", "Selesaikan ini dengan kehormatan penuh!"]
    },
    karir: {
      intro: ["Bekerja adalah mengabdi. Mari cari tahu di mana pengabdian terbaikmu.", "Mari kita cari tahu jalan ksatria di era modern ini."],
      mid: ["Mendedikasikan diri untuk kemaslahatan orang banyak.", "Pekerjaan yang membutuhkan integritas tinggi.", "Kamu sangat menghargai aturan dan keteraturan."],
      end: ["Langkah pamungkas untuk menentukan takdir karirmu.", "Satu pilihan terakhir, tetaplah berpegang pada prinsipmu!"]
    },
    finansial: {
      intro: ["Bagaimana caramu mengelola perbekalan? Mari kita evaluasi.", "Kekayaan harus digunakan di jalan yang benar."],
      mid: ["Kamu sangat berhati-hati dalam membelanjakan koin.", "Kedermawanan seorang satria. Sangat mulia.", "Keuangan yang terstruktur dan aman."],
      end: ["Satu lagi sebelum kita melaporkan perbekalan kita.", "Pilihan terakhir yang sangat bijak!"]
    },
    belajar: {
      intro: ["Latihan tanpa henti membuat pedang semakin tajam. Mari mulai.", "Mari kita asah pikiranmu layaknya sebilah pedang."],
      mid: ["Kamu menghargai teori dan instruksi yang jelas.", "Disiplin adalah kunci dari pembelajaranmu.", "Praktik yang tak henti-hentinya. Sangat gigih!"],
      end: ["Latihan terakhir kita hari ini, satria!", "Satu lagi! Pengetahuanmu telah teruji dengan baik."]
    },
    attachment: {
      intro: ["Kesetiaan adalah segalanya. Mari kita lihat seberapa jauh kau bisa setia.", "Mari lindungi hati dari pengkhianatan."],
      mid: ["Sangat setia dan selalu melindungi orang yang dicintai.", "Terkadang kau terlalu kaku, cobalah sedikit lebih rileks.", "Prinsip hubunganmu sangat berdasar pada rasa hormat."],
      end: ["Satu sumpah terakhir dalam kuis ini.", "Langkah terakhir. Kesetiaanmu tidak diragukan lagi."]
    },
    kesejahteraan: {
      intro: ["Baju zirah yang kuat pun butuh dilepas sesekali. Mari kita periksa kondisimu.", "Tugas yang berat membutuhkan fisik dan mental yang sehat."],
      mid: ["Jangan terus-menerus memikul beban sendirian.", "Kamu butuh waktu istirahat yang layak, ksatria.", "Pemulihan moral sangat penting. Tetap kuat!"],
      end: ["Satu langkah terakhir menuju kedamaian batin.", "Selesai sudah. Istirahatlah, kau telah bertarung dengan baik."]
    }
  },
  qilin: {
    kepribadian: {
      intro: ["Mari melangkah dengan ringan di atas embun kejujuran.", "Setiap jawaban adalah pantulan dari jiwa semestamu."],
      mid: ["Pilihanmu beresonansi dengan harmoni alam.", "Sangat bijaksana. Kedamaian ada di dalam dirimu.", "Keseimbangan antara Yin dan Yang mulai terlihat."],
      end: ["Satu tetes pencerahan terakhir.", "Mendekati akhir. Jiwamu memancarkan cahaya keemasan."]
    },
    karir: {
      intro: ["Pekerjaan adalah pelayanan bagi semesta. Mari kita cari tempatmu.", "Temukan jalan di mana dharmamu bersinar paling terang."],
      mid: ["Karir yang membawa kedamaian bagi banyak orang.", "Kau tidak mencari posisi, melainkan esensi.", "Keseimbangan dalam bekerja sangat kau hargai."],
      end: ["Satu langkah lagi menuju jalan takdirmu.", "Pencerahan karir sudah di depan mata."]
    },
    finansial: {
      intro: ["Kekayaan materi hanyalah ilusi jika tidak membawa kedamaian.", "Mari lihat bagaimana aliran rezeki di hidupmu mengalir."],
      mid: ["Kau cukup melepaskan keterikatan pada materi.", "Rezeki yang dikelola dengan sangat welas asih.", "Mencari keseimbangan, tidak kurang dan tidak lebih."],
      end: ["Satu lagi soal ilusi duniawi ini.", "Keputusan finansial terakhirmu sangat mencerahkan."]
    },
    belajar: {
      intro: ["Ilmu sudah ada di sekeliling kita. Kau hanya perlu mengamatinya.", "Mari hening sejenak dan dengarkan cara alam mengajarimu."],
      mid: ["Pemahaman mendalam tanpa perlu memaksakan diri.", "Kau belajar lewat intuisi batin yang jernih.", "Menyatukan teori dan perasaan secara harmonis."],
      end: ["Satu hikmah terakhir di bab ini.", "Selesai sudah proses penyelarasan pemikiranmu."]
    },
    attachment: {
      intro: ["Ikatan antar manusia seharusnya seringan awan. Bagaimana denganmu?", "Mari melihat jaring-jaring karma yang kau jalin."],
      mid: ["Kau mencintai tanpa harus menggenggam terlalu erat.", "Sikap welas asih yang tulus kepada semua makhluk.", "Kedamaian hadir saat kau berani memaafkan masa lalu."],
      end: ["Satu benang karma terakhir untuk diurai.", "Hubungan sejatimu telah menemukan kejernihannya."]
    },
    kesejahteraan: {
      intro: ["Beban pikiran membuat roh menjadi berat. Mari kita ringankan.", "Bernapaslah... dan lepaskan semua energi negatif."],
      mid: ["Kau mulai menemukan titik keseimbangan dalam dirimu.", "Meditasi sesaat akan membantumu menjernihkan kabut di pikiran.", "Berdamailah dengan ketidaksempurnaan dunia."],
      end: ["Satu langkah terakhir menuju kesejahteraan batin.", "Selesai. Semoga kedamaian selalu menyertaimu."]
    }
  },
  ghost: {
    kepribadian: {
      intro: ["Aku akan mengintip dari balik tirai. Jawablah dengan sejujurnya.", "Tidak ada yang bisa kau sembunyikan dari roh sepertiku."],
      mid: ["Hooo... jawaban yang cukup melankolis.", "Aku pernah melihat manusia dengan pikiran serupa ratusan tahun lalu.", "Pola pikirmu melayang di luar batasan normal."],
      end: ["Satu pertanyaan terakhir... sebelum aku menghilang sesaat.", "Buka dirimu sedikit lagi."]
    },
    karir: {
      intro: ["Kerja keras manusia sungguh melelahkan. Tapi mari kita cari yang pas untukmu.", "Pekerjaan apa yang tak akan menghisap energimu?"],
      mid: ["Ah, kau suka bekerja dalam diam dan bayang-bayang.", "Itu pilihan yang analitis, sama sepertiku.", "Ide yang tidak biasa, sangat orisinal."],
      end: ["Satu langkah lagi untuk meramalkan masa depan karirmu.", "Selesai sudah. Pilihan yang cukup menghantui pikiranku."]
    },
    finansial: {
      intro: ["Uang tidak bisa dibawa mati. Tapi kau butuh itu untuk hidup sekarang.", "Mari hitung seberapa besar kepedulianmu pada kertas bernama uang."],
      mid: ["Kau tampaknya cukup acuh terhadap harta benda.", "Atau mungkin kau menyimpannya diam-diam?", "Pengelolaan yang pasif namun terstruktur."],
      end: ["Soal uang terakhir. Harta hanyalah titipan, ingat itu.", "Sudah cukup. Aku mengerti pola dompetmu."]
    },
    belajar: {
      intro: ["Membaca buku tua di malam hari sangat menyenangkan. Mari kita mulai.", "Banyak rahasia dunia yang bisa kau pelajari dari kegelapan."],
      mid: ["Kau suka mengumpulkan informasi dengan tenang.", "Pikiranmu meresap bagai hantu menembus dinding.", "Observasi dari kejauhan adalah keahlianmu."],
      end: ["Teka-teki pengetahuan terakhir untuk hari ini.", "Sebentar lagi kepalamu akan terisi dengan pemahaman utuh."]
    },
    attachment: {
      intro: ["Berinteraksi dengan manusia hidup itu rumit. Kau merasakannya juga?", "Mari kita lihat seberapa jauh kau menarik diri dari keramaian."],
      mid: ["Kau bagaikan hantu, sering menghilang tanpa jejak saat dibutuhkan.", "Aku mengerti rasa takut akan pengkhianatan itu.", "Ikatan emosionalmu cukup tipis, tapi sangat selektif."],
      end: ["Satu lagi sebelum kita menutup pintu hatimu.", "Jawaban yang jujur tentang kesepianmu."]
    },
    kesejahteraan: {
      intro: ["Kadang, menjadi transparan dan hilang sejenak itu perlu. Bagaimana perasaanmu?", "Aku mendengar helaan napas yang panjang dari batinmu."],
      mid: ["Jangan terlalu lama bersembunyi dalam kesedihan.", "Energi mentalmu sedang terkuras, aku bisa merasakannya.", "Isolasi diri bukan selalu jalan keluar yang buruk, jika hanya sementara."],
      end: ["Satu lagi... lepaskan semua beban pikiranmu.", "Kuis selesai. Semoga kau menemukan bentuk kehidupanmu lagi."]
    }
  },
  griffin: {
    kepribadian: {
      intro: ["Bentangkan sayapmu dan tatap mataku! Tunjukkan ambisimu!", "Hanya yang berani jujur yang akan terbang tinggi!"],
      mid: ["Karakter seorang pemimpin mulai terlihat jelas.", "Tegas dan tanpa kompromi. Luar biasa!", "Pikiran yang strategis, aku suka itu."],
      end: ["Satu kepakan sayap terakhir!", "Tuntaskan ini dan bersiaplah menguasai angkasa!"]
    },
    karir: {
      intro: ["Karir bukan sekadar kerja, tapi jalan menuju puncak. Mari temukan gunungmu!", "Mari kita rancang rute penaklukan duniamu!"],
      mid: ["Kau mengincar posisi di atas awan, bagus sekali.", "Pekerjaan ini butuh nyali dan visi besar, sangat cocok.", "Bukan sekadar uang, ini soal pengaruh dan kekuasaan."],
      end: ["Langkah terakhir menuju singgasana karirmu!", "Satu lagi! Mari kita patenkan visi masa depanmu."]
    },
    finansial: {
      intro: ["Harta adalah sayap yang memungkinkanmu terbang jauh. Ayo kita tata asetmu!", "Bagaimana caramu membangun kerajaan finansialmu?"],
      mid: ["Investasi yang cerdas dan agresif.", "Kau tak takut mengambil risiko finansial, keberanian yang bagus.", "Status dan kekuasaan tergambar dari caramu mengelola uang."],
      end: ["Satu lagi sebelum kita menutup laporan neraca keuanganmu!", "Selesai! Masa depanmu terlihat sangat mewah dan megah."]
    },
    belajar: {
      intro: ["Pengetahuan adalah cakar untuk mencengkeram peluang. Mari kita tajamkan!", "Mari optimalkan cara kerja otak jeniusmu."],
      mid: ["Kau belajar demi mencapai target yang pasti.", "Sangat terstruktur dan ambisius dalam mengejar ilmu.", "Kau menyerap informasi penting dan membuang yang tak berguna."],
      end: ["Target terakhir di depan mata!", "Soal kognitif terakhir selesai. Otakmu adalah senjatamu."]
    },
    attachment: {
      intro: ["Siapa yang pantas terbang bersamamu? Mari kita nilai aliansimu.", "Hubungan harus memberdayakan, bukan membebani!"],
      mid: ["Kau menghargai pasangan yang setara dan independen.", "Terkadang ambisimu mengalahkan empati, hati-hati.", "Ikatan yang dibangun atas dasar saling menguntungkan dan respek."],
      end: ["Satu soal terakhir untuk menentukan lingkaran terdekatmu.", "Aliansimu telah terbentuk dengan kuat!"]
    },
    kesejahteraan: {
      intro: ["Bahkan elang terkuat pun butuh hinggap. Bagaimana keadaan fisik dan mentalmu?", "Jangan biarkan kelelahan memotong sayapmu."],
      mid: ["Ambisi itu bagus, tapi kau lupa cara beristirahat.", "Cari tantangan baru agar apimu tidak padam.", "Ketangguhan mentalmu sangat luar biasa, patut diacungi jempol."],
      end: ["Satu lagi, mari selesaikan dengan bangga!", "Tes selesai! Sekarang kembalilah berburu mimpimu!"]
    }
  },
  golem: {
    kepribadian: {
      intro: ["Data diterima. Memulai inisiasi pemindaian kepribadian.", "Harap jawab dengan presisi. Evaluasi dimulai."],
      mid: ["Memproses jawaban... Pola logika ditemukan.", "Konsistensi jawabanmu berada di atas rata-rata.", "Menarik. Parameter emosionalmu cukup seimbang."],
      end: ["Mendekati akhir pemindaian. Satu data terakhir.", "Proses pengumpulan data kepribadian hampir selesai."]
    },
    karir: {
      intro: ["Inisiasi kalkulasi potensi okupasional. Harap masukkan input.", "Mari susun matriks probabilitas karir terbaikmu."],
      mid: ["Tingkat efisiensi dalam bekerja sangat ditekankan.", "Sistematis dan terstruktur. Parameter lingkungan kerja terdeteksi.", "Bekerja dengan benda atau sistem lebih dominan daripada manusia."],
      end: ["Membutuhkan satu input terakhir untuk finalisasi matriks karir.", "Proses kalkulasi karir hampir mencapai 100%."]
    },
    finansial: {
      intro: ["Memulai audit neraca finansial. Kejujuran akan mempercepat proses.", "Mari evaluasi tingkat kehati-hatian finansialmu."],
      mid: ["Risiko dihindari. Keamanan diprioritaskan.", "Tingkat kewaspadaan finansial terdeteksi tinggi.", "Pengelolaan sumber daya dilakukan secara algoritmik."],
      end: ["Audit hampir selesai. Satu baris data terakhir.", "Neraca finansial telah dicatat ke dalam memori."]
    },
    belajar: {
      intro: ["Menjalankan modul diagnostik gaya belajar kognitif.", "Mari evaluasi cara otakmu menyandikan informasi."],
      mid: ["Pemrosesan data visual dominan.", "Lebih menyukai prosedur tertulis dan terstruktur.", "Logika sekuensial terdeteksi kuat dalam caramu belajar."],
      end: ["Modul diagnostik hampir rampung. Silakan lanjut.", "Sinkronisasi pengetahuan telah berhasil dicatat."]
    },
    attachment: {
      intro: ["Mengevaluasi parameter koneksi sosial dan keamanan ikatan emosional.", "Kalkulasi tingkat ketergantungan antar-individu dimulai."],
      mid: ["Jarak aman selalu dijaga untuk meminimalisasi error emosional.", "Tingkat kepercayaan dipertimbangkan secara hati-hati.", "Terdeteksi pola stabilitas sosial dalam jawabanmu."],
      end: ["Satu metrik lagi sebelum analisis sosial ditutup.", "Analisis hubungan selesai. Semua data dienkripsi dengan aman."]
    },
    kesejahteraan: {
      intro: ["Memindai tingkat stres dan keseimbangan operasional sistem batin.", "Apakah sistem mentalmu mengalami overload? Mari kita periksa."],
      mid: ["Overload emosional terdeteksi di beberapa sektor.", "Prosedur maintenance (istirahat) direkomendasikan segera.", "Fungsi batin beroperasi pada batas toleransi normal."],
      end: ["Satu diagnostik terakhir sebelum proses shutdown kuis.", "Selesai. Sistem kembali normal. Harap jalankan mode istirahat."]
    }
  }
};

export const getGuideDialogue = (guideId: string, categoryId: string, currentIdx: number, total: number): string => {
  const cId = categoryId || "kepribadian";
  
  // Fallbacks in case data is missing
  const guideData = GUIDE_DIALOGUES[guideId] || GUIDE_DIALOGUES["vampire"];
  const catData = guideData[cId] || guideData["kepribadian"];

  if (currentIdx === 0) {
    return catData.intro[currentIdx % catData.intro.length];
  } else if (currentIdx === total - 1) {
    return catData.end[currentIdx % catData.end.length];
  } else {
    return catData.mid[currentIdx % catData.mid.length];
  }
};
