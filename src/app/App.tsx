import { useState, useEffect } from "react";
import LandingPage from "./components/landing-page";
import PilihArea from "./components/pilih-area";
import GenderScreen from "./components/gender";
import GuideSelect from "./components/guide-select";
import Welcome from "./components/welcome";
import Quiz from "./components/quiz";
import Loading from "./components/loading";
import Hasil from "./components/hasil";
import Konsultasi from "./components/konsultasi";
import Koneksi from "./components/koneksi";
import Navbar from "./components/navbar";
import Profil from "./components/profil";
import Perjalanan from "./components/perjalanan";
import PreTestPrompt from "./components/not-tested";
import { CATEGORIES, Gender, Screen, type AnswerEntry, type GuideMatch, computeGuideMatch, QuizAnswers, GUIDES, GUIDE_BG } from "./flow";
import { computeAllResults, type AllResults } from "./scoring";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

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

export default function App() {
  const [screen, setScreenState] = useState<Screen>(() => {
    let hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") as string : "landing";
    if (hash === "resonance") hash = "perjalanan";
    return (hash as Screen) || "landing";
  });
  const [cats, setCats] = useLocalStorage<string[]>("ky_cats", []);
  const [isQuick, setIsQuick] = useLocalStorage<boolean | null>("ky_isQuick", null);
  const [gender, setGender] = useLocalStorage<Gender | null>("ky_gender", null);
  const [guide, setGuide] = useLocalStorage<string | null>("ky_guide", null);
  const [guideMatches, setGuideMatches] = useLocalStorage<GuideMatch[]>("ky_guideMatches", []);
  const [answers, setAnswers] = useLocalStorage<QuizAnswers>("ky_answers", []);
  const [categoryResults, setCategoryResults] = useLocalStorage<AllResults>("ky_categoryResults", {});

  // Sync screen state with URL hash for mobile native back button support
  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace("#", "") as string;
      if (hash === "resonance") hash = "koneksi";
      if (hash && hash !== screen) {
        setScreenState(hash as Screen);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    // Set initial hash if empty
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#" + screen);
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [screen]);

  const setScreen = (newScreen: Screen) => {
    setScreenState(newScreen);
    if (window.location.hash !== "#" + newScreen) {
      window.history.pushState(null, "", "#" + newScreen);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categoryColor =
    CATEGORIES.find((c) => c.id === cats[0])?.color ||
    "#2D6A4F";

  const handleNav = (target: string) => {
    setScreen(target as Screen);
  };

  const withNav = (content: React.ReactNode, id: string) => (
    <div className="flex min-h-screen flex-col">
      <Navbar current={id} onNav={handleNav} />
      <div className="flex-1 pb-16 md:pb-0">{content}</div>
    </div>
  );

  const requireTest = (content: React.ReactNode, id: string) => {
    if (guideMatches.length === 0 || !guide) {
      return withNav(<PreTestPrompt onStart={() => setScreen("pilih")} />, id);
    }
    return withNav(content, id);
  };

  switch (screen) {
    case "landing":
      return (
        <>
          <Preloader />
          {withNav(
            <LandingPage
              onStart={() => setScreen("pilih")}
              onNav={(navTarget) => {
                const map: Record<string, string> = { "Koneksi": "koneksi", "Perjalanan": "perjalanan", "Guide": "guide-chat", "Profil": "profil" };
                if (map[navTarget]) handleNav(map[navTarget]);
              }}
            />,
            "landing"
          )}
        </>
      );
    case "pilih":
      return (
        <PilihArea
          initial={cats}
          initialQuick={isQuick}
          onBack={() => setScreen("landing")}
          onNext={(ids, quick) => {
            setCats(ids);
            setIsQuick(quick);
            setScreen("gender");
          }}
        />
      );
    case "gender":
      return (
        <GenderScreen
          initial={gender}
          onBack={() => setScreen("pilih")}
          onNext={(g) => {
            setGender(g);
            setScreen("guide");
          }}
        />
      );
    case "guide":
      return (
        <GuideSelect
          initial={guide}
          onBack={() => setScreen("gender")}
          onNext={(id) => {
            setGuide(id);
            setScreen("welcome");
          }}
        />
      );
    case "welcome":
      if (!guide) return withNav(<PreTestPrompt onStart={() => setScreen("pilih")} />, "welcome");
      return (
        <Welcome
          guideId={guide!}
          onNext={() => setScreen("quiz")}
          onChangeGuide={() => setScreen("guide")}
        />
      );
    case "quiz":
      if (!guide || cats.length === 0) return withNav(<PreTestPrompt onStart={() => setScreen("pilih")} />, "quiz");
      return (
        <Quiz
          guideId={guide!}
          selectedCats={cats}
          isQuick={isQuick}
          onBack={() => setScreen("welcome")}
          onDone={(ans: AnswerEntry[]) => {
            setAnswers(ans);
            setGuideMatches(computeGuideMatch(ans));
            setCategoryResults(computeAllResults(ans, cats));
            setScreen("loading");
          }}
        />
      );
    case "loading":
      if (!guide) return withNav(<PreTestPrompt onStart={() => setScreen("pilih")} />, "loading");
      return (
        <Loading
          guideId={guide!}
          onDone={() => setScreen("perjalanan")}
        />
      );
    case "perjalanan":
      return requireTest(
        <Hasil
          guideId={guide!}
          selectedCats={cats}
          guideMatches={guideMatches}
          answers={answers}
          categoryResults={categoryResults}
          gender={gender}
          onRestart={() => {
            setScreen("landing");
            setCats([]);
            setGender(null);
            setGuide(null);
            setGuideMatches([]);
            setAnswers([]);
            setCategoryResults({});
          }}
          onChat={(id) => {
            if (id) setGuide(id);
            setScreen("guide-chat");
          }}
          onShare={() => setScreen("koneksi")}
        />,
        "perjalanan"
      );
    case "guide-chat":
      return requireTest(
        <Konsultasi
          guideId={guide || "vampire"}
          categoryResults={categoryResults}
          onBack={() => setScreen("perjalanan")}
        />,
        "guide-chat"
      );
    case "koneksi":
      return withNav(
        <Koneksi
          categoryResults={categoryResults}
          guideId={guide}
          guideMatches={guideMatches}
          selectedCats={cats}
          gender={gender}
          onBack={() => setScreen("landing")}
          onTakeTest={() => setScreen("pilih")}
        />,
        "koneksi"
      );
    case "profil":
      return withNav(<Profil onBack={() => setScreen("landing")} gender={gender} mbtiCode={categoryResults.kepribadian?.code || null} />, "profil");
  }
}