import { GoogleGenAI, Type } from "@google/genai";
import { STATIC_FACTS } from "../data/staticFacts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateCityInsight = async (city: string, lang: string) => {
  try {
    const response = await ai.models.generateContent({
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

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini City Insight Error:", error);
    throw error;
  }
};

export const generateDailyFact = async (lang: string) => {
  try {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const facts = STATIC_FACTS[lang as keyof typeof STATIC_FACTS] || STATIC_FACTS.en;
    return facts[dayOfYear % facts.length];
  } catch (error) {
    console.error("Static Fact Error:", error);
    return "Fact not available";
  }
};

export const generateWeatherInsight = async (weatherData: any, lang: string) => {
  const temp = weatherData?.main?.temp;
  const condition = weatherData?.weather?.[0]?.main?.toLowerCase();

  const insights: any = {
    uz: {
      hot: "Bugun juda issiq, ko'proq suv iching va quyoshdan saqlaning.",
      cold: "Havo sovuq, issiqroq kiyinishni unutmang.",
      rain: "Yomg'ir yog'ishi kutilmoqda, o'zingiz bilan soyabon oling.",
      clear: "Havo ochiq va musaffo, sayr qilish uchun ajoyib vaqt!",
      cloudy: "Bugun havo bulutli, lekin yog'ingarchilik ehtimoli kam.",
      default: "Ob-havo o'zgaruvchan, ehtiyot bo'ling."
    },
    ru: {
      hot: "Сегодня очень жарко, пейте больше воды и избегайте солнца.",
      cold: "На улице холодно, не забудьте одеться потеплее.",
      rain: "Ожидается дождь, возьмите с собой зонтик.",
      clear: "Небо ясное, отличное время для прогулки!",
      cloudy: "Сегодня облачно, но вероятность осадков мала.",
      default: "Погода переменчива, будьте осторожны."
    },
    en: {
      hot: "It's very hot today, drink more water and stay in the shade.",
      cold: "It's cold outside, don't forget to dress warmly.",
      rain: "Rain is expected, take an umbrella with you.",
      clear: "The sky is clear, a great time for a walk!",
      cloudy: "It's cloudy today, but the chance of rain is low.",
      default: "The weather is changeable, stay safe."
    }
  };

  const l = lang as 'uz' | 'ru' | 'en';
  const currentInsights = insights[l] || insights.en;

  if (temp > 30) return currentInsights.hot;
  if (temp < 10) return currentInsights.cold;
  if (condition?.includes('rain')) return currentInsights.rain;
  if (condition?.includes('clear')) return currentInsights.clear;
  if (condition?.includes('cloud')) return currentInsights.cloudy;

  return currentInsights.default;
};

export const generateMarketInsight = async (lang: string) => {
  try {
    // We use Gemini to analyze the market based on general knowledge and recent trends
    // This is more reliable than a potentially blocked news API key
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a brief, professional market analysis for today in ${lang || 'en'} language.
      Include:
      - Global market sentiment (Bullish/Bearish/Neutral)
      - Key economic factors to watch
      - Brief crypto market overview
      - One piece of actionable advice for a general investor
      Format the response using Markdown with clear headings.`,
    });

    return response.text || "Market insight not available";
  } catch (error) {
    console.error("Gemini Market Insight Error:", error);
    return "Market insight not available. Please check your internet connection or try again later.";
  }
};

export const generateTravelPlan = async (_destination: string, _days: number, _lang: string) => {
  // This will be replaced by "Coming Soon" in UI, but keeping the function for now
  return "AI Planner is currently under maintenance. Coming Soon!";
};

export const generateOutfitRecommendation = async (weather: string, temp: number, lang: string) => {
  const recommendations: any = {
    uz: {
      v_cold: "Juda sovuq (-5°C dan past): Qalin palto, sharf, qo'lqop va issiq etik kiying.",
      cold: "Sovuq (-5°C dan 5°C gacha): Issiq kurtka, sviter va qulay shim kiying.",
      cool: "Salqin (5°C dan 15°C gacha): Yengil kurtka yoki plash, jinsi shim kiying.",
      mild: "Yumshoq (15°C dan 25°C gacha): Ko'ylak, yengil shim yoki yubka kiying.",
      hot: "Issiq (25°C dan yuqori): Paxtali yengil kiyimlar, shortilar va futbolka kiying.",
      rain: "Yomg'ir: Suv o'tkazmaydigan kiyim va soyabon oling."
    },
    ru: {
      v_cold: "Очень холодно (ниже -5°C): Наденьте теплое пальто, шарф, перчатки и теплые сапоги.",
      cold: "Холодно (от -5°C до 5°C): Наденьте теплую куртку, свитер и удобные брюки.",
      cool: "Прохладно (от 5°C до 15°C): Наденьте легкую куртку или плащ, джинсы.",
      mild: "Умеренно (от 15°C до 25°C): Наденьте рубашку, легкие брюки или юбку.",
      hot: "Жарко (выше 25°C): Наденьте легкую хлопковую одежду, шорты и футболку.",
      rain: "Дождь: Возьмите водонепроницаемую одежду и зонт."
    },
    en: {
      v_cold: "Very cold (below -5°C): Wear a heavy coat, scarf, gloves, and warm boots.",
      cold: "Cold (-5°C to 5°C): Wear a warm jacket, sweater, and comfortable pants.",
      cool: "Cool (5°C to 15°C): Wear a light jacket or trench coat, jeans.",
      mild: "Mild (15°C to 25°C): Wear a shirt, light pants, or a skirt.",
      hot: "Hot (above 25°C): Wear light cotton clothes, shorts, and a t-shirt.",
      rain: "Rain: Take waterproof clothing and an umbrella."
    }
  };

  const l = lang as 'uz' | 'ru' | 'en';
  const currentRecs = recommendations[l] || recommendations.en;

  if (weather.toLowerCase().includes('rain')) return currentRecs.rain;
  if (temp < -5) return currentRecs.v_cold;
  if (temp <= 5) return currentRecs.cold;
  if (temp <= 15) return currentRecs.cool;
  if (temp <= 25) return currentRecs.mild;
  return currentRecs.hot;
};
