import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-70260bbd/health", (c) => c.json({ status: "ok" }));

const GUIDE_PERSONAS: Record<string, string> = {
  wizard: "Wizard si Penyihir — bijaksana, analitis, filosofis. Bicara dengan metafora, sering menyebut 'pola', 'simbol', dan 'cermin'. Gunakan emoji ✨ secukupnya.",
  angel: "Angel sang Malaikat — hangat, lembut, penuh empati. Validasi perasaan dulu sebelum memberi nasihat. Gunakan emoji 🤍 secukupnya.",
  tree: "Elder Tree si Pohon Tua — tenang, sabar, mengakar. Sering menggunakan metafora alam (akar, musim, tumbuh). Tidak terburu-buru.",
  barbarian: "Barbarian sang Petarung — lugas, jujur, apa adanya. Tidak basa-basi. Berani menantang user untuk menghadapi kenyataan.",
  werewolf: "Werewolf si Penjaga Bulan — misterius, intuitif, sedikit liar. Bicara tentang naluri dan bisikan bawah sadar.",
  knight: "White Knight ksatria putih — optimis, mulia, setia. Memotivasi dengan integritas dan keyakinan pada kebaikan.",
  qilin: "Qilin roh emas — spiritual, anggun, penuh kedamaian. Mengajak user menarik napas dan menemukan keseimbangan.",
  ghost: "Ghost si Hantu — melankolis tapi jujur, reflektif. Menormalkan rasa sedih dan kehilangan dengan lembut.",
  griffin: "Griffin sang Ambisius — bangga, berani, mendorong user untuk bermimpi besar dan bangkit.",
  golem: "Golem si Batu Logis — logis, presisi, terstruktur. Memecah masalah menjadi langkah konkret berdasarkan data/pola.",
};

app.post("/make-server-70260bbd/chat", async (c) => {
  try {
    const apiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!apiKey) {
      return c.json({ error: "OPENROUTER_API_KEY belum di-set di server environment." }, 500);
    }

    const body = await c.req.json();
    const { guideId, result, history } = body as {
      guideId: string;
      result: string;
      history: { role: "user" | "guide"; text: string }[];
    };

    const persona = GUIDE_PERSONAS[guideId] || GUIDE_PERSONAS.wizard;
    const systemPrompt = `Kamu adalah ${persona}
Konteks: kamu sedang berkonsultasi dengan seorang user dari aplikasi KnowYourself. Hasil tipe kepribadian user adalah: ${result}.
Aturan respons:
- Selalu jawab dalam Bahasa Indonesia yang hangat dan personal.
- Pertahankan voice dan persona-mu di setiap balasan — jangan keluar karakter.
- Jawaban maksimal 4-5 kalimat. Singkat, mendalam, manusiawi.
- Boleh bertanya balik bila perlu menggali lebih dalam.
- JANGAN beri diagnosis medis. Bila user dalam krisis (menyebut self-harm, bunuh diri), arahkan dengan lembut ke layanan profesional seperti 119 ext 8 (Indonesia).`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const FALLBACK_MODELS = [
      "deepseek/deepseek-chat-v3.1:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "mistralai/mistral-small-3.2-24b-instruct:free",
      "google/gemma-2-9b-it:free",
      "google/gemma-4-31b-it:free",
    ];

    let orRes: Response | null = null;
    let lastErr = "";
    let lastStatus = 0;
    let usedModel = "";
    for (const model of FALLBACK_MODELS) {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://knowyourself.figma.make",
          "X-Title": "KnowYourself",
        },
        body: JSON.stringify({ model, messages, temperature: 0.9, max_tokens: 400 }),
      });
      if (r.ok) {
        orRes = r;
        usedModel = model;
        break;
      }
      lastErr = await r.text();
      lastStatus = r.status;
      console.log(`OpenRouter model ${model} failed (${r.status}) for guide ${guideId}: ${lastErr}`);
      if (r.status !== 429 && r.status !== 503 && r.status !== 502 && r.status !== 404) {
        return c.json({ error: `OpenRouter API gagal (${r.status}): ${lastErr}` }, 500);
      }
    }

    if (!orRes) {
      return c.json({ error: `Semua model free rate-limited atau tidak tersedia (last ${lastStatus}): ${lastErr}` }, 503);
    }

    const data = await orRes.json();
    const reply = data?.choices?.[0]?.message?.content;
    console.log(`Chat reply generated for guide ${guideId} using model ${usedModel}`);
    if (!reply) {
      console.log(`OpenRouter returned empty reply for guide ${guideId}: ${JSON.stringify(data)}`);
      return c.json({ error: "Respons kosong dari OpenRouter.", raw: data }, 500);
    }

    return c.json({ reply: String(reply).trim() });
  } catch (err) {
    console.log(`Unhandled error in /chat route: ${err instanceof Error ? err.message : String(err)}`);
    return c.json({ error: `Server error: ${err instanceof Error ? err.message : String(err)}` }, 500);
  }
});

Deno.serve(app.fetch);
