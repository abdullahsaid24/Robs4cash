import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Cache to prevent re-generating images on every render
const imageCache: Record<string, string> = {};

export async function generateMarketingImage(prompt: string, aspectRatio: "16:9" | "4:3" | "1:1" = "16:9"): Promise<string | null> {
  const cacheKey = `${prompt}-${aspectRatio}`;
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
         imageConfig: { aspectRatio: aspectRatio }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        imageCache[cacheKey] = imageUrl;
        return imageUrl;
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
}