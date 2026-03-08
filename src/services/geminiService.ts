import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateDailyFact = async (lang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, interesting daily fact about weather, travel, or geography in ${lang} language. Keep it under 150 characters.`,
    });
    return response.text || "Fact not available";
  } catch (error) {
    console.error("Gemini Fact Error:", error);
    return null;
  }
};

export const generateWeatherInsight = async (weatherData: any, lang: string) => {
  try {
    const prompt = `Based on this weather data: ${JSON.stringify(weatherData)}, provide a short insight or advice in ${lang} language. For example, what to wear or what activities to do. Keep it concise.`;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Insight not available";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
};

export const generateMarketInsight = async (lang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a short insight about current global market trends (crypto, stocks, economy) in ${lang} language. Keep it professional and concise.`,
    });
    return response.text || "Market insight not available";
  } catch (error) {
    console.error("Gemini Market Error:", error);
    return null;
  }
};

export const generateTravelPlan = async (destination: string, days: number, lang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a ${days}-day travel itinerary for ${destination} in ${lang} language. Include top places to visit and local tips. Format as a short list.`,
    });
    return response.text || "Plan not available";
  } catch (error) {
    console.error("Gemini Planner Error:", error);
    return null;
  }
};

export const generateOutfitRecommendation = async (weather: string, temp: number, lang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Recommend an outfit for ${weather} weather with ${temp}°C temperature in ${lang} language. Be specific but brief.`,
    });
    return response.text || "Outfit recommendation not available";
  } catch (error) {
    console.error("Gemini Outfit Error:", error);
    return null;
  }
};
