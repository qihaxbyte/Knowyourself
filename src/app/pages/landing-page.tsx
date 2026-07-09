import { useState } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Compass, ScrollText, Gem, Bell, Sparkles, ChevronDown, Star, Brain, Briefcase, Coins, GraduationCap, HeartHandshake, Leaf } from "lucide-react";
import { GUIDES, CATEGORIES } from "../flow";
import { GuideSprite as Sprite } from "../components/guide-sprite";

const ICON_IMGS: Record<string, string> = {
  kepribadian: "/assets/icons/cat_kepribadian_pixel.png",
  karir: "/assets/icons/cat_karir_pixel.png",
  finansial: "/assets/icons/cat_finansial_pixel.png",
  belajar: "/assets/icons/cat_belajar_pixel.png",
  attachment: "/assets/icons/cat_attachment_pixel.png",
  kesejahteraan: "/assets/icons/cat_kesejahteraan_pixel.png",
};

const NAV = ["Beranda", "Perjalanan", "Hasilku", "Profil", "Koneksi"];

function PixelStar({ className = "" }: { className?: string }) {
  return <span className={`inline-block ${className}`} style={{ fontFamily: "'Press Start 2P', monospace" }}>✦</span>;
}

function FloatingGuide({ guide, size = 64 }: { guide: typeof GUIDES[number]; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full ring-2 ring-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${guide.color}, ${guide.color}cc)`,
        imageRendering: "pixelated",
      }}
      title={guide.name}
    >
      <Sprite guideId={guide.id} size={size * 0.8} animate={false} />
    </div>
  );
}

function Campfire() {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 120 }}>
      <div
        className="absolute -inset-8 rounded-full blur-2xl opacity-70"
        style={{ background: "radial-gradient(circle, #ff8c2a 0%, transparent 70%)" }}
      />
      <div className="relative" style={{ fontSize: 84, lineHeight: 1, filter: "drop-shadow(0 0 18px #ff8c2a)" }}>
        🔥
      </div>
      <div className="relative -mt-4" style={{ fontSize: 32, lineHeight: 1 }}>🪵</div>
    </div>
  );
}

function Firefly({ left, top, delay }: { left: string; top: string; delay: string }) {
  return (
    <span
      className="absolute h-1.5 w-1.5 rounded-full bg-amber-200"
      style={{
        left,
        top,
        boxShadow: "0 0 8px 2px rgba(255, 220, 130, 0.8)",
        animation: `firefly 4s ease-in-out ${delay} infinite`,
      }}
    />
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  const handleStart = () => navigate("/pilih");
  
  const handleNav = (target: string) => {
    const map: Record<string, string> = { "Koneksi": "koneksi", "Perjalanan": "perjalanan", "Guide": "guide-chat", "Profil": "profil" };
    if (map[target]) navigate("/" + map[target]);
  };

  return (
    <div className="min-h-screen w-full" style={{ background: "#FAF7F0", color: "#1A1A1A", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes firefly {
          0%, 100% { transform: translate(0,0); opacity: 0.4; }
          50% { transform: translate(20px,-15px); opacity: 1; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .pixel-font { font-family: 'Press Start 2P', monospace; }
        .serif { font-family: 'Crimson Text', serif; }
      `}</style>

      {/* HERO */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        {/* Background */}
        <ImageWithFallback
          src="/assets/bg/bg_landing_no_human_1783274026895.png"
          alt="Night Pixel Art Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Color tint to make pixel-art-ish dusk */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(74,32,90,0.55) 0%, rgba(28,58,42,0.55) 50%, rgba(13,31,20,0.92) 100%)" }} />

        {/* Fireflies */}
        <Firefly left="15%" top="30%" delay="0s" />
        <Firefly left="70%" top="22%" delay="1.5s" />
        <Firefly left="40%" top="55%" delay="0.8s" />
        <Firefly left="85%" top="60%" delay="2.2s" />

        {/* Top bar */}
        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-8 pt-safe pb-5">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleStart}>
            <span className="text-amber-500 pixel-font text-lg">✦</span>
            <span className="font-bold text-white pixel-font text-sm">KnowYourself</span>
          </div>
          {/* Top right removed as requested */}
        </header>

        {/* Hero content */}
        <div className="relative z-10 mx-auto grid h-[calc(100%-80px)] max-w-7xl grid-cols-1 items-center gap-8 px-8 lg:grid-cols-2">
          {/* Left text */}
          <div className="max-w-xl text-white">
            <h1 className="serif" style={{ fontSize: "3.5rem", lineHeight: 1.1, fontWeight: 700 }}>
              Perjalanan memahami<br />dirimu dimulai di sini. <PixelStar className="text-amber-300 align-top" />
            </h1>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "#C9A84C", color: "#1A1A1A" }}>
              <PixelStar />
              <span className="text-sm font-semibold">Mari mulai perjalanan menemukan jati dirimu</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 relative z-50">
              <button
                onClick={handleStart}
                className="group inline-flex items-center gap-2 rounded-xl px-6 text-white shadow-premium transition-all duration-300 hover:scale-105 hover:brightness-110 animate-pulse-glow"
                style={{ background: "#2D6A4F", height: 52, fontWeight: 600 }}
              >
                <PixelStar className="text-amber-300 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                Mulai Perjalanan
              </button>
              <button
                type="button"
                onClick={() => setShowAbout(true)}
                className="rounded-xl border-2 border-white/80 px-6 text-white backdrop-blur transition hover:bg-white/10"
                style={{ height: 52, fontWeight: 600 }}
              >
                Tentang KnowYourself
              </button>
            </div>
          </div>



          {/* Right: campfire scene */}
          <div className="relative hidden h-full items-center justify-center lg:flex">
            <div className="relative" style={{ width: 520, height: 520 }}>
              {/* Campfire center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Campfire />
              </div>
              {/* 10 guides in circle */}
              {GUIDES.map((g, i) => {
                const angle = (i / GUIDES.length) * Math.PI * 2 - Math.PI / 2;
                const r = 220;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div
                    key={g.name}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      animation: `float-slow 3s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  >
                    <FloatingGuide guide={g} size={72} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wooden signposts (decor, bottom-right) */}
        <div className="pointer-events-none absolute bottom-8 right-8 hidden flex-col items-end gap-1 md:flex">
          {["Kenali Diri →", "Temukan Arah →", "Tumbuhkan Potensi"].map((t) => (
            <div key={t} className="rounded border-2 border-amber-900/60 bg-amber-800/80 px-3 py-1 text-xs text-amber-100 shadow"
              style={{ fontFamily: "'VT323', monospace", fontSize: 16 }}>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bagaimana Cara Kerjanya?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Tiga langkah sederhana untuk memulai perjalanan spiritual dan psikologis menuju versi terbaik dirimu.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: Compass, title: "Pilih Area & Guide", desc: "Pilih kategori yang ingin dieksplorasi dan Spirit Guide yang akan menemanimu." },
              { icon: ScrollText, title: "Jawab Pertanyaan", desc: "Jawab dengan jujur. Tidak ada benar atau salah, hanya refleksi murni dirimu." },
              { icon: Gem, title: "Temukan Dirimu", desc: "Dapatkan wawasan mendalam yang ditenun dari pola jawaban dan pilihanmu." },
            ].map((s, i) => (
              <div key={s.title} className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md text-left" style={{ border: "1px solid #E8E0D5" }}>
                <div className="absolute right-6 top-6 text-5xl font-black opacity-5" style={{ color: "#2D6A4F" }}>0{i + 1}</div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#2D6A4F11", color: "#2D6A4F" }}>
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 CATEGORIES (REDESIGNED) */}
      <section className="py-24" style={{ background: "#FAF7F0" }}>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">6 Kategori Eksplorasi</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Setiap kategori adalah pintu menuju pemahaman yang lebih dalam tentang berbagai aspek kehidupanmu.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <a
                key={c.name}
                href="#"
                className="group flex items-center gap-5 overflow-hidden rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md text-left"
                style={{ border: "1px solid #E8E0D5" }}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-105" style={{ background: c.light, color: c.color }}>
                  <img src={ICON_IMGS[c.id]} alt={c.name} className="h-10 w-10 object-contain drop-shadow-sm" style={{ imageRendering: "pixelated" }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:underline" style={{ textDecorationColor: c.color }}>{c.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 line-clamp-2">{c.desc}</p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 opacity-0 transition group-hover:opacity-100 group-hover:bg-gray-100">
                  <ArrowRight className="h-5 w-5" style={{ color: c.color }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / BASIS ILMIAH SECTION */}
      <section id="tentang" className="relative z-10 bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <h2 className="serif mb-4 text-4xl font-bold text-gray-900">Tentang KnowYourself</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              KnowYourself tidak menggunakan pertanyaan asal atau ramalan acak. Setiap metrik dan algoritma guide-matching dibangun di atas landasan teori psikologi yang valid secara global.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { id: "kepribadian", title: "Kepribadian (MBTI & Big Five)", icon: Brain, color: "#6B4C9A", article: "Menggabungkan indikator Myers-Briggs (MBTI) dan model Big Five (OCEAN) untuk mengukur ekstroversi, keterbukaan, kesadaran, keramahan, dan neurotisme, membentuk profil kepribadian komprehensif.", journal: "Costa, P. T., & McCrae, R. R. (1992). Revised NEO Personality Inventory manual." },
              { id: "karir", title: "Karir (Holland's RIASEC)", icon: Briefcase, color: "#2D6A4F", article: "Berbasis teori pilihan karir John Holland. Membagi minat okupasional menjadi 6 tipe (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) untuk mencocokkan kepribadian dengan lingkungan kerja.", journal: "Holland, J. L. (1997). Making vocational choices: A theory of vocational personalities." },
              { id: "finansial", title: "Psikologi Keuangan (Money Scripts)", icon: Coins, color: "#B5850B", article: "Diadaptasi dari penelitian Dr. Brad Klontz tentang keyakinan bawah sadar terhadap uang (Money Avoidance, Worship, Status, Vigilance) dan dampaknya pada kebiasaan finansial.", journal: "Klontz, B., & Britt, S. L. (2012). How clients' money scripts predict their financial behaviors." },
              { id: "belajar", title: "Gaya Belajar (VARK)", icon: GraduationCap, color: "#0077B6", article: "Menggunakan model VARK oleh Neil Fleming (Visual, Aural, Read/Write, Kinesthetic) untuk memahami preferensi memproses informasi dan efisiensi belajar.", journal: "Fleming, N. D., & Mills, C. (1992). Not another inventory, rather a catalyst for reflection." },
              { id: "attachment", title: "Attachment Sosial (ECR-S)", icon: HeartHandshake, color: "#C1121F", article: "Didorong oleh Teori Kelekatan, mengukur tingkat Kecemasan dan Penghindaran (Secure, Anxious, Avoidant, Fearful) dalam relasi sosial atau kerja.", journal: "Wei, M. et al. (2007). The Experiences in Close Relationship Scale (ECR)-short form." },
              { id: "kesejahteraan", title: "Kesejahteraan Diri (Schwartz & PSS-10)", icon: Leaf, color: "#6B4C9A", article: "Mengintegrasikan Perceived Stress Scale untuk stres, dan Teori Nilai Manusia Schwartz untuk motivasi inti guna menemukan makna kehidupan.", journal: "Schwartz, S. H. (1992). Universals in the content and structure of values." },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <article key={t.id} className="overflow-hidden rounded-3xl bg-[#FAF7F0] shadow-sm transition hover:-translate-y-1 hover:shadow-md" style={{ border: "1px solid #E8E0D5" }}>
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r px-6 py-5 sm:w-1/3" style={{ borderColor: "rgba(0,0,0,0.05)", background: t.color + "08" }}>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm" style={{ color: t.color }}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="serif text-xl font-bold text-gray-900">{t.title}</h3>
                    </div>
                    <div className="p-6 sm:w-2/3 bg-white">
                      <p className="text-sm leading-relaxed text-gray-600">{t.article}</p>
                      <div className="mt-4 rounded-xl p-3" style={{ background: "#F9FAFB", borderLeft: `3px solid ${t.color}` }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Referensi Jurnal</p>
                        <p className="mt-1 text-xs italic leading-relaxed text-gray-600">{t.journal}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white pt-16 pb-8" style={{ borderColor: "#E8E0D5" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="serif text-xl font-bold text-gray-900">KnowYourself</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
                Aplikasi asesmen kepribadian terpadu bergaya cozy fantasy. Didukung oleh teori psikologi valid secara global untuk membantumu menemukan jati diri sesungguhnya.
              </p>
              <button onClick={() => { document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 text-sm font-bold transition hover:text-gray-900" style={{ color: "#2D6A4F" }}>
                Baca Selengkapnya tentang Basis Ilmiah →
              </button>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Navigasi</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><button onClick={() => handleNav("Beranda")} className="hover:text-gray-900 hover:underline">Beranda</button></li>
                <li><button onClick={() => handleNav("Perjalanan")} className="hover:text-gray-900 hover:underline">Mulai Perjalanan</button></li>
                <li><button onClick={() => handleNav("Profil")} className="hover:text-gray-900 hover:underline">Profil</button></li>
                <li><button onClick={() => handleNav("Koneksi")} className="hover:text-gray-900 hover:underline">Koneksi Sosial</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Legal & Support</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setShowAbout(true)} className="hover:text-gray-900 hover:underline">Tentang</button></li>
                <li><button onClick={() => setShowPrivacy(true)} className="hover:text-gray-900 hover:underline">Privasi</button></li>
                <li><button onClick={() => setShowContact(true)} className="hover:text-gray-900 hover:underline">Kontak</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t pt-8 text-center text-xs text-gray-500">
            Made with <span className="text-rose-400">♥</span> by Lumora Studio
          </div>
        </div>
      </footer>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6 backdrop-blur-md transition-all" style={{ zIndex: 9999 }} onClick={() => setShowAbout(false)}>
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-premium animate-slide-up-fade" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-2xl font-bold text-gray-900">Tentang KnowYourself</h2>
                <button onClick={() => setShowAbout(false)} className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                  ✕
                </button>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                  <strong className="text-gray-900">KnowYourself</strong> adalah platform penemuan jati diri interaktif yang menggabungkan psikometri modern dengan estetika naratif spirit guide.
                </p>
                <p>
                  Proyek ini dirancang di atas landasan teori psikologi yang valid dan komprehensif, mencakup 6 pilar: Kepribadian (MBTI & Big Five), Karir (Holland RIASEC), Finansial (Klontz), Gaya Belajar (VARK), Attachment Sosial (ECR-S), dan Kesejahteraan (PSS-10 & Schwartz).
                </p>
                <div className="mt-8 rounded-2xl bg-amber-50 p-5 text-center text-xs">
                  <p className="font-bold text-amber-900">Technology for Society Project</p>
                  <p className="mt-1 text-amber-700">Lumora Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6 backdrop-blur-md transition-all" style={{ zIndex: 9999 }} onClick={() => setShowPrivacy(false)}>
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-premium animate-slide-up-fade" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-2xl font-bold text-gray-900">Kebijakan Privasi</h2>
                <button onClick={() => setShowPrivacy(false)} className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                  ✕
                </button>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
                <p><strong>Privasi Anda adalah prioritas kami.</strong></p>
                <p>
                  Semua data psikometri dan jawaban yang Anda berikan selama menggunakan platform KnowYourself diproses murni di perangkat Anda (lokal) dan tidak disimpan di server kami tanpa persetujuan eksplisit Anda.
                </p>
                <p>
                  Kami hanya mengumpulkan data anonim terkait metrik penggunaan untuk keperluan riset akademis dan peningkatan kualitas platform, sesuai dengan prinsip etika teknologi.
                </p>
                <p className="italic mt-4 text-xs text-gray-500">Terakhir diperbarui: 6 Juli 2026</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6 backdrop-blur-md transition-all" style={{ zIndex: 9999 }} onClick={() => setShowContact(false)}>
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-premium animate-slide-up-fade" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-2xl font-bold text-gray-900">Hubungi Kami</h2>
                <button onClick={() => setShowContact(false)} className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                  ✕
                </button>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl">
                    🦉
                  </div>
                </div>
                <p>
                  Punya pertanyaan, umpan balik, atau ingin berkolaborasi dengan Lumora Studio?
                </p>
                <div className="mt-6">
                  <a href="mailto:hello@knowyourself.id" className="inline-block rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800">
                    Kirim Email ke Kami
                  </a>
                </div>
                <p className="mt-4 text-xs text-gray-500">Atau ikuti perjalanan kami di Twitter: <a href="#" className="text-amber-600 hover:underline">@LumoraStudio</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
