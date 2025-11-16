
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this demo, we'll throw an error if the key is missing.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateProjectIdea(userPrompt: string): Promise<string> {
  if (!API_KEY) {
    return Promise.resolve("Error: La clave de API de Gemini no está configurada. Por favor, configura la variable de entorno API_KEY.");
  }
  
  try {
    const fullPrompt = `
      You are an expert project planner and software architect.
      A user has an idea for a web application. Your task is to provide a brief, actionable, high-level plan for them.
      The output should be a simple, easy-to-read text. Do not use Markdown formatting like ### or lists with *. Just use plain text with newlines.

      The user's idea is: "${userPrompt}"

      Based on this idea, provide the following:
      1.  **Core Features:** List 3-4 essential features for the MVP (Minimum Viable Product).
      2.  **Tech Stack Suggestion:** Recommend a modern tech stack (Frontend, Backend, Database).
      3.  **First Step:** Suggest a clear, simple first step the user can take to start building.

      Keep the entire response concise and under 150 words.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No se pudo obtener una respuesta de la API de Gemini. Por favor, inténtalo de nuevo más tarde.");
  }
}
