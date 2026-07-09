import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router";
import LandingPage from "./pages/landing-page";
import PilihArea from "./pages/pilih-area";
import GenderScreen from "./pages/gender";
import GuideSelect from "./pages/guide-select";
import Welcome from "./pages/welcome";
import Quiz from "./pages/quiz";
import Loading from "./pages/loading";
import Hasil from "./pages/hasil";
import Konsultasi from "./pages/konsultasi";
import Koneksi from "./pages/koneksi";
import Navbar from "./components/navbar";
import Profil from "./pages/profil";
import PreTestPrompt from "./pages/not-tested";
import { useAppStore } from "./store/useAppStore";
import { GUIDES, GUIDE_BG } from "./flow";

const Preloader = () => {
  useEffect(() => {
    // Preload critical backgrounds and sprites in the background
    const imagesToPreload = [
      "/assets/bg/bg_mystic_forest.png",
      "/assets/bg/bg_golden_sunset.png",
      ...Object.values(GUIDE_BG),
      ...GUIDES.map(g => `/assets/sprites/${g.id}.png`)
    ];

    // Give priority to other network requests by delaying slightly
    setTimeout(() => {
      imagesToPreload.forEach(src => {
        if (src) {
          const img = new window.Image();
          img.src = src;
        }
      });
    }, 1000);
  }, []);
  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 pb-16 md:pb-0">{children}</div>
    </div>
  );
};

const RequireTest = ({ children, withLayout = true }: { children: React.ReactNode, withLayout?: boolean }) => {
  const guideMatches = useAppStore(state => state.guideMatches);
  const guide = useAppStore(state => state.guide);
  
  if (guideMatches.length === 0 || !guide) {
    return <Layout><PreTestPrompt /></Layout>;
  }
  return withLayout ? <Layout>{children}</Layout> : <>{children}</>;
};

const RequireSetup = ({ children, withLayout = true }: { children: React.ReactNode, withLayout?: boolean }) => {
  const guide = useAppStore(state => state.guide);
  const cats = useAppStore(state => state.cats);
  
  if (!guide || cats.length === 0) {
    return <Layout><PreTestPrompt /></Layout>;
  }
  
  return withLayout ? <Layout>{children}</Layout> : <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Preloader />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        
        <Route path="/landing" element={<Layout><LandingPage /></Layout>} />
        
        <Route path="/pilih" element={<PilihArea />} />
        <Route path="/gender" element={<GenderScreen />} />
        <Route path="/guide" element={<GuideSelect />} />
        
        <Route path="/welcome" element={<RequireSetup><Welcome /></RequireSetup>} />
        <Route path="/quiz" element={<RequireSetup withLayout={false}><Quiz /></RequireSetup>} />
        <Route path="/loading" element={<RequireSetup withLayout={false}><Loading /></RequireSetup>} />
        
        <Route path="/perjalanan" element={<RequireTest><Hasil /></RequireTest>} />
        <Route path="/guide-chat" element={<RequireTest withLayout={false}><Konsultasi /></RequireTest>} />
        <Route path="/koneksi" element={<Layout><Koneksi /></Layout>} />
        <Route path="/profil" element={<Layout><Profil /></Layout>} />
        
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </Router>
  );
}