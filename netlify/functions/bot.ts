import { Telegraf, Markup } from 'telegraf';
import { GoogleGenAI } from '@google/genai';

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

if (!botToken) {
  console.error('TELEGRAM_BOT_TOKEN is missing');
}

const bot = new Telegraf(botToken || '');

// Set localized commands (one-time setup logic for serverless)
let commandsSet = false;
const setBotCommands = async () => {
  if (commandsSet) return;
  try {
    await bot.telegram.setMyCommands(translations.uz.commands, { language_code: 'uz' });
    await bot.telegram.setMyCommands(translations.ru.commands, { language_code: 'ru' });
    await bot.telegram.setMyCommands(translations.en.commands, { language_code: 'en' });
    await bot.telegram.setMyCommands(translations.uz.commands);
    commandsSet = true;
  } catch (err) {
    console.error("Error setting bot commands:", err);
  }
};

const ai = geminiKey ? new GoogleGenAI({ apiKey: geminiKey }) : null;

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

const getLang = (ctx: any) => userLanguages[ctx.from.id] || 'uz';
const t = (ctx: any) => translations[getLang(ctx)];

const getMainMenu = (ctx: any) => {
  const trans = t(ctx);
  return Markup.keyboard([
    [trans.weather_btn, trans.flights_btn],
    [trans.stats_btn, trans.ai_btn],
    [trans.info_btn, trans.help_btn],
    [trans.lang_btn]
  ]).resize();
};

// Bot commands
bot.start((ctx) => {
  const trans = t(ctx);
  const welcomeMessage = `
${trans.welcome(ctx.from.first_name)}
${trans.features}

Pastdagi tugmalardan foydalaning yoki buyruqlarni yuboring!
  `;
  
  return ctx.replyWithMarkdown(welcomeMessage, getMainMenu(ctx));
});

bot.command('language', (ctx) => {
  ctx.reply(t(ctx).select_lang, Markup.inlineKeyboard([
    [Markup.button.callback("O'zbekcha 🇺🇿", 'lang_uz')],
    [Markup.button.callback("Русский 🇷🇺", 'lang_ru')],
    [Markup.button.callback("English 🇺🇸", 'lang_en')]
  ]));
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
bot.hears(['🌐 Tilni o\'zgartirish', '🌐 Сменить язык', '🌐 Change Language'], (ctx) => ctx.reply(t(ctx).select_lang, Markup.inlineKeyboard([
  [Markup.button.callback("O'zbekcha 🇺🇿", 'lang_uz')],
  [Markup.button.callback("Русский 🇷🇺", 'lang_ru')],
  [Markup.button.callback("English 🇺🇸", 'lang_en')]
])));

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

bot.command('quiz', (ctx) => {
  ctx.replyWithMarkdown(`
📊 *Quiz Statistikasi:*

✅ To'g'ri javoblar: 85%
❌ Noto'g'ri javoblar: 15%
🏆 Eng yuqori natija: 100 ball

Bilimingizni sinash uchun saytimizga kiring!
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
    ctx.reply('AI bilan bog\'lanishda xatolik yuz berdi.');
  }
});

// Handle any other text messages with AI
bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  if (text.startsWith('/')) return;
  
  const trans = t(ctx);
  if (!geminiKey) return ctx.reply(trans.ai_no_key);
  if (!ai) return ctx.reply('AI tizimi hozircha faol emas.');

  try {
    const response = await generateWithRetry({
      model: "gemini-3-flash-preview",
      contents: text,
    });
    
    const replyText = response.text || "Kechirasiz, javob topa olmadim.";
    ctx.replyWithMarkdown(`🤖 *AI Javobi:*\n\n${replyText}`);
  } catch (error: any) {
    console.error('AI Error:', error);
    ctx.reply(`${trans.ai_error} ${error.message || 'Noma\'lum xato'}`);
  }
});

// Netlify Function handler
export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 200, body: 'Bot is running' };
    }

    if (!botToken) {
      return { statusCode: 500, body: 'Bot token missing' };
    }

    const body = JSON.parse(event.body);
    
    // Ensure commands are set (async)
    await setBotCommands();
    
    await bot.handleUpdate(body);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('Error in bot handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
