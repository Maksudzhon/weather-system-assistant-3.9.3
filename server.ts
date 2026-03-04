import express from "express";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";
import path from "path";
import { Telegraf } from "telegraf";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 3000;

// Gemini AI Setup
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({ apiKey: geminiApiKey });
}

async function generateWithRetry(options: any, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await (ai as any).models.generateContent(options);
    } catch (error: any) {
      if (error.status === 503 && i < retries - 1) {
        await new Promise(res => setTimeout(res, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
}

// Telegram Bot Setup (for preview/local)
const botToken = process.env.TELEGRAM_BOT_TOKEN;
let bot: Telegraf | null = null;

const translations: any = {
  uz: {
    welcome: (name: string) => `🌟 *Assalomu alaykum, ${name}!* 🌤✈️\n\nMen *Weather & Flight System* botiman. Sizga ob-havo, parvozlar va boshqa ma'lumotlarni olishda yordam beraman.\n\n🚀 *Asosiy imkoniyatlar:*`,
    select_lang: "Iltimos, tilni tanlang:",
    lang_changed: "Til muvaffaqiyatli o'zgartirildi: O'zbekcha 🇺🇿",
    weather_btn: "🌤 Ob-havo",
    flights_btn: "✈️ Parvozlar",
    stats_btn: "📊 Statistika",
    ai_btn: "🤖 AI Yordamchi",
    info_btn: "ℹ️ Ma'lumot",
    help_btn: "❓ Yordam",
    lang_btn: "🌐 Tilni o'zgartirish",
    city_prompt: "Shaharni kiriting (Masalan: /weather Toshkent)",
    ask_prompt: "AI ga savol bering: /ask [savol]",
    help_text: "Buyruqlar: /start, /info, /weather, /flights, /quiz, /ask, /language",
    info_text: "ℹ️ *Loyiha haqida:*\n*Weather & Flight System (WSA)* - bu ob-havo va parvozlar ma'lumotlarini real vaqtda kuzatish imkonini beruvchi platforma.\n🔹 *Veb-sayt:* [WSA Web App](https://ais-dev-s3hyvclprnkhzjd5sf5yuh-408694823899.asia-east1.run.app)",
    ai_no_key: "⚠️ AI xizmati sozlanmagan (GEMINI_API_KEY yetishmayapti).",
    ai_error: "❌ AI bilan bog'lanishda xatolik:",
    ask_empty: "Savolingizni yozing.",
    weather_title: (city: string) => `🌤 *${city} ob-havosi:*`,
    flights_title: "✈️ *Bugungi asosiy parvozlar:*",
    features: "• Ob-havo ma'lumotlari\n• Parvozlar jadvali\n• AI yordamchi (Gemini)\n• Quiz statistikasi",
    commands: [
      { command: 'start', description: 'Botni ishga tushirish' },
      { command: 'info', description: 'Loyiha haqida ma\'lumot' },
      { command: 'weather', description: 'Ob-havo ma\'lumotini olish' },
      { command: 'flights', description: 'Parvozlar jadvalini ko\'rish' },
      { command: 'quiz', description: 'Statistika va natijalar' },
      { command: 'ask', description: 'AI yordamchidan so\'rash' },
      { command: 'language', description: 'Tilni o\'zgartirish' }
    ]
  },
  ru: {
    welcome: (name: string) => `🌟 *Здравствуйте, ${name}!* 🌤✈️\n\nЯ бот *Weather & Flight System*. Я помогу вам получить информацию о погоде, рейсах и многом другом.\n\n🚀 *Основные возможности:*`,
    select_lang: "Пожалуйста, выберите язык:",
    lang_changed: "Язык успешно изменен: Русский 🇷🇺",
    weather_btn: "🌤 Погода",
    flights_btn: "✈️ Рейсы",
    stats_btn: "📊 Статистика",
    ai_btn: "🤖 AI Помощник",
    info_btn: "ℹ️ Информация",
    help_btn: "❓ Помощь",
    lang_btn: "🌐 Сменить язык",
    city_prompt: "Введите город (Например: /weather Ташкент)",
    ask_prompt: "Задайте вопрос AI: /ask [вопрос]",
    help_text: "Команды: /start, /info, /weather, /flights, /quiz, /ask, /language",
    info_text: "ℹ️ *О проекте:*\n*Weather & Flight System (WSA)* - это платформа для отслеживания погоды и рейсов в реальном времени.\n🔹 *Веб-сайт:* [WSA Web App](https://ais-dev-s3hyvclprnkhzjd5sf5yuh-408694823899.asia-east1.run.app)",
    ai_no_key: "⚠️ Служба AI не настроена (отсутствует GEMINI_API_KEY).",
    ai_error: "❌ Ошибка связи с AI:",
    ask_empty: "Напишите свой вопрос.",
    weather_title: (city: string) => `🌤 *Погода в ${city}:*`,
    flights_title: "✈️ *Основные рейсы на сегодня:*",
    features: "• Прогноз погоды\n• Расписание рейсов\n• AI помощник (Gemini)\n• Статистика квиза",
    commands: [
      { command: 'start', description: 'Запустить бота' },
      { command: 'info', description: 'Информация о проекте' },
      { command: 'weather', description: 'Узнать погоду' },
      { command: 'flights', description: 'Расписание рейсов' },
      { command: 'quiz', description: 'Статистика и результаты' },
      { command: 'ask', description: 'Спросить AI помощника' },
      { command: 'language', description: 'Сменить язык' }
    ]
  },
  en: {
    welcome: (name: string) => `🌟 *Hello, ${name}!* 🌤✈️\n\nI am the *Weather & Flight System* bot. I will help you get weather, flight, and other information.\n\n🚀 *Main features:*`,
    select_lang: "Please select your language:",
    lang_changed: "Language successfully changed: English 🇺🇸",
    weather_btn: "🌤 Weather",
    flights_btn: "✈️ Flights",
    stats_btn: "📊 Statistics",
    ai_btn: "🤖 AI Assistant",
    info_btn: "ℹ️ Info",
    help_btn: "❓ Help",
    lang_btn: "🌐 Change Language",
    city_prompt: "Enter city (Example: /weather Tashkent)",
    ask_prompt: "Ask AI a question: /ask [question]",
    help_text: "Commands: /start, /info, /weather, /flights, /quiz, /ask, /language",
    info_text: "ℹ️ *About the project:*\n*Weather & Flight System (WSA)* - is a platform for real-time weather and flight tracking.\n🔹 *Website:* [WSA Web App](https://ais-dev-s3hyvclprnkhzjd5sf5yuh-408694823899.asia-east1.run.app)",
    ai_no_key: "⚠️ AI service not configured (GEMINI_API_KEY missing).",
    ai_error: "❌ AI connection error:",
    ask_empty: "Write your question.",
    weather_title: (city: string) => `🌤 *Weather in ${city}:*`,
    flights_title: "✈️ *Today's main flights:*",
    features: "• Weather information\n• Flight schedule\n• AI assistant (Gemini)\n• Quiz statistics",
    commands: [
      { command: 'start', description: 'Start the bot' },
      { command: 'info', description: 'Project information' },
      { command: 'weather', description: 'Get weather info' },
      { command: 'flights', description: 'View flight schedule' },
      { command: 'quiz', description: 'Statistics and results' },
      { command: 'ask', description: 'Ask AI assistant' },
      { command: 'language', description: 'Change language' }
    ]
  }
};

const userLanguages: Record<number, string> = {};

if (botToken) {
  bot = new Telegraf(botToken);
  
  // Set localized commands
  const setBotCommands = async () => {
    try {
      await bot?.telegram.setMyCommands(translations.uz.commands, { language_code: 'uz' });
      await bot?.telegram.setMyCommands(translations.ru.commands, { language_code: 'ru' });
      await bot?.telegram.setMyCommands(translations.en.commands, { language_code: 'en' });
      // Default commands
      await bot?.telegram.setMyCommands(translations.uz.commands);
      console.log("Bot commands localized successfully.");
    } catch (err) {
      console.error("Error setting bot commands:", err);
    }
  };
  setBotCommands();

  const getLang = (ctx: any) => userLanguages[ctx.from.id] || 'uz';
  const t = (ctx: any) => translations[getLang(ctx)];

  const getMainMenu = (ctx: any) => {
    const trans = t(ctx);
    return {
      reply_markup: {
        keyboard: [
          [{ text: trans.weather_btn }, { text: trans.flights_btn }],
          [{ text: trans.stats_btn }, { text: trans.ai_btn }],
          [{ text: trans.info_btn }, { text: trans.help_btn }],
          [{ text: trans.lang_btn }]
        ],
        resize_keyboard: true
      }
    };
  };

  bot.start((ctx) => {
    const trans = t(ctx);
    const welcomeMessage = `
${trans.welcome(ctx.from.first_name)}
${trans.features}

Pastdagi tugmalardan foydalaning yoki buyruqlarni yuboring!
    `;
    ctx.replyWithMarkdown(welcomeMessage, getMainMenu(ctx));
  });

  bot.command('language', (ctx) => {
    ctx.reply(t(ctx).select_lang, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "O'zbekcha 🇺🇿", callback_data: 'lang_uz' }],
          [{ text: "Русский 🇷🇺", callback_data: 'lang_ru' }],
          [{ text: "English 🇺🇸", callback_data: 'lang_en' }]
        ]
      }
    });
  });

  bot.action(/lang_(uz|ru|en)/, (ctx) => {
    const lang = ctx.match[1];
    userLanguages[ctx.from!.id] = lang;
    ctx.answerCbQuery();
    ctx.reply(translations[lang].lang_changed, getMainMenu(ctx));
  });

  bot.command('info', (ctx) => {
    ctx.replyWithMarkdown(t(ctx).info_text);
  });

  bot.hears(['ℹ️ Ma\'lumot', 'ℹ️ Информация', 'ℹ️ Info'], (ctx) => ctx.replyWithMarkdown(t(ctx).info_text));
  bot.hears(['🌤 Ob-havo', '🌤 Погода', '🌤 Weather'], (ctx) => ctx.reply(t(ctx).city_prompt));
  bot.hears(['✈️ Parvozlar', '✈️ Рейсы', '✈️ Flights'], (ctx) => ctx.reply('Parvozlar haqida ma\'muot: /flights'));
  bot.hears(['📊 Statistika', '📊 Статистика', '📊 Statistics'], (ctx) => ctx.reply('Statistika: /quiz'));
  bot.hears(['🤖 AI Yordamchi', '🤖 AI Помощник', '🤖 AI Assistant'], (ctx) => ctx.reply(t(ctx).ask_prompt));
  bot.hears(['❓ Yordam', '❓ Помощь', '❓ Help'], (ctx) => ctx.reply(t(ctx).help_text));
  bot.hears(['🌐 Tilni o\'zgartirish', '🌐 Сменить язык', '🌐 Change Language'], (ctx) => ctx.reply(t(ctx).select_lang, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "O'zbekcha 🇺🇿", callback_data: 'lang_uz' }],
        [{ text: "Русский 🇷🇺", callback_data: 'lang_ru' }],
        [{ text: "English 🇺🇸", callback_data: 'lang_en' }]
      ]
    }
  }));

  bot.command('weather', async (ctx) => {
    const city = ctx.message.text.split(' ').slice(1).join(' ') || 'Toshkent';
    const trans = t(ctx);
    const lang = getLang(ctx);
    if (!ai) return ctx.reply(trans.ai_no_key);
    try {
      const response = await generateWithRetry({
        model: "gemini-3-flash-preview",
        contents: `Provide current weather info for ${city} in ${lang} language. Include temp, humidity, wind.`,
      });
      ctx.replyWithMarkdown(`${trans.weather_title(city)}\n\n${response.text}`);
    } catch (error) {
      ctx.reply('Xatolik yuz berdi.');
    }
  });

  bot.command('flights', (ctx) => {
    ctx.replyWithMarkdown(t(ctx).flights_title + `
1. HY231 - Toshkent -> Frankfurt (10:30)
2. HY601 - Toshkent -> Moskva (12:45)
3. TK371 - Toshkent -> Istanbul (15:20)
    `);
  });

  bot.command('ask', async (ctx) => {
    const question = ctx.message.text.split(' ').slice(1).join(' ');
    const trans = t(ctx);
    if (!question) return ctx.reply(trans.ask_empty);
    if (!ai) return ctx.reply(trans.ai_no_key);
    try {
      const response = await generateWithRetry({
        model: "gemini-3-flash-preview",
        contents: question,
      });
      ctx.replyWithMarkdown(`🤖 *AI Javobi:*\n\n${response.text}`);
    } catch (error) {
      ctx.reply('Xatolik yuz berdi.');
    }
  });

  bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    if (text.startsWith('/')) return;
    
    const trans = t(ctx);
    if (!process.env.GEMINI_API_KEY) {
      return ctx.reply(trans.ai_no_key);
    }

    if (!ai) return ctx.reply('AI sozlanmagan.');

    try {
      const response = await generateWithRetry({
        model: "gemini-3-flash-preview",
        contents: text,
      });
      
      const replyText = response.text || "Kechirasiz, javob topa olmadim.";
      ctx.replyWithMarkdown(`🤖 *AI Javobi:*\n\n${replyText}`);
    } catch (error: any) {
      console.error("AI Error:", error);
      ctx.reply(`${trans.ai_error} ${error.message || 'Noma\'lum xato'}`);
    }
  });

  // Start bot in polling mode for preview
  bot.launch().catch(err => console.error("Bot launch error:", err));
}

// Stats Tracking (Persistent using local file)
const STATS_FILE = path.join(process.cwd(), "stats.json");

let stats = {
  totalUsers: 1240, // Initial mock data
  activeUsers: 850,
  dailyActive: 420,
  lastUpdate: new Date().toISOString()
};

// Load stats from file if exists
if (fs.existsSync(STATS_FILE)) {
  try {
    const savedStats = JSON.parse(fs.readFileSync(STATS_FILE, "utf-8"));
    stats = { ...stats, ...savedStats };
  } catch (err) {
    console.error("Failed to load stats:", err);
  }
}

const saveStats = () => {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch (err) {
    console.error("Failed to save stats:", err);
  }
};

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/stats", (req, res) => {
  res.json(stats);
});

app.post("/api/city-insight", async (req, res) => {
  const { city, lang } = req.body;
  if (!city) return res.status(400).json({ error: "City is required" });
  if (!ai) return res.status(503).json({ error: "Gemini AI is not configured" });

  try {
    const response = await generateWithRetry({
      model: "gemini-3-flash-preview",
      contents: `Provide detailed insights for the city: ${city} in ${lang || 'en'} language.
      Include:
      - name: string
      - description: brief overview
      - work: career opportunities
      - study: education info
      - live: quality of life
      - travel: top attractions
      - fact: one interesting weather-related or general fact
      - images: array of 3 keywords for Unsplash images related to this city
      - cuisine: array of {name, description} for 3 must-try local dishes
      - safety: safety and health advice for travelers
      - packing: array of 5 essential items to pack based on current weather/season
      - activities: array of 3 recommended activities based on typical weather`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            work: { type: Type.STRING },
            study: { type: Type.STRING },
            live: { type: Type.STRING },
            travel: { type: Type.STRING },
            fact: { type: Type.STRING },
            images: { type: Type.ARRAY, items: { type: Type.STRING } },
            cuisine: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            safety: { type: Type.STRING },
            packing: { type: Type.ARRAY, items: { type: Type.STRING } },
            activities: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    let data = {};
    try {
      data = JSON.parse(response.text || '{}');
    } catch (e) {
      console.error("JSON parse error for insights:", e);
    }
    res.json(data);
  } catch (err: any) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: err.message || "Failed to fetch insights" });
  }
});

app.post("/api/track-activity", (req, res) => {
  stats.activeUsers++;
  stats.dailyActive++;
  stats.totalUsers++; // Increment total users for each track call as a simple proxy
  stats.lastUpdate = new Date().toISOString();
  saveStats();
  res.json({ success: true });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
