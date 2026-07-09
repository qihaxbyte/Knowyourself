import { Home, Compass, MessageCircle, User, BookOpen } from "lucide-react";

export default function Navbar({ current, onNav }: { current: string; onNav: (target: string) => void }) {
  const NAV_ITEMS = [
    { id: "landing", label: "Beranda", iconImg: "/assets/icons/nav_beranda.png" },
    { id: "perjalanan", label: "Perjalanan", iconImg: "/assets/icons/nav_perjalanan.png" },
    { id: "guide-chat", label: "Guide", iconImg: "/assets/icons/nav_guide.png" },
    { id: "koneksi", label: "Koneksi", iconImg: "/assets/icons/nav_basis.png" },
    { id: "profil", label: "Profil", iconImg: "/assets/icons/nav_profil.png" },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <header className="glass-panel sticky top-0 z-50 hidden md:flex items-center justify-between px-6 py-4" style={{ borderColor: "rgba(232, 224, 213, 0.5)" }}>
        <div className="flex items-center gap-2 transition hover:opacity-80" style={{ cursor: "pointer" }} onClick={() => onNav("landing")}>
          <span className="text-emerald-500 pixel-font text-lg">✦</span>
          <span className="font-bold pixel-font text-sm" style={{ color: "#222" }}>KnowYourself</span>
        </div>
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((n) => {
            const isActive = current === n.id;
            return (
              <button
                key={n.id}
                onClick={() => onNav(n.id)}
                className="group flex items-center gap-2 text-sm transition"
                style={{
                  color: isActive ? "#2D6A4F" : "#555",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <div className={`relative flex items-center justify-center p-2 rounded-xl transition ${isActive ? 'bg-emerald-50' : 'hover:bg-gray-100/50'}`}>
                  <img src={n.iconImg} alt={n.label} className="h-6 w-6 object-contain drop-shadow-sm group-hover:scale-110 transition-transform" style={{ imageRendering: "pixelated" }} />
                </div>
                {n.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-slide-up-fade">
        <nav className="glass-panel flex items-center justify-around rounded-2xl pb-safe pt-2 px-2 shadow-premium" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        {NAV_ITEMS.map((n) => {
          const isActive = current === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className="flex flex-col items-center gap-1 p-2 transition group"
              style={{ color: isActive ? "#2D6A4F" : "#999" }}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full transition ${isActive ? 'bg-emerald-50 shadow-sm' : ''}`}>
                <img src={n.iconImg} alt={n.label} className={`h-7 w-7 object-contain transition-transform ${isActive ? 'scale-110 drop-shadow-sm' : 'opacity-70 group-hover:scale-105'}`} style={{ imageRendering: "pixelated" }} />
              </div>
              <span className="text-[10px] font-medium tracking-wide pb-1">{n.label}</span>
            </button>
          );
        })}
        </nav>
      </div>
    </>
  );
}
