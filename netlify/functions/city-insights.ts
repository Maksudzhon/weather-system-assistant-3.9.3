import { GoogleGenAI } from '@google/genai';

const geminiKey = process.env.GEMINI_API_KEY;
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

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { city, lang } = JSON.parse(event.body || '{}');
  if (!city) {
    return { statusCode: 400, body: JSON.stringify({ error: 'City is required' }) };
  }

  if (!ai) {
    return { statusCode: 503, body: JSON.stringify({ error: 'Gemini AI is not configured' }) };
  }

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
      - local_tips: array of 3 insider tips for visiting this city
      Return as a clean JSON object.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: response.text
    };
  } catch (error: any) {
    console.error('City insight error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch city insights' })
    };
  }
};
