// src/pages/api/list-models.ts
export const prerender = false;

import { GoogleGenerativeAI } from '@google/generative-ai';

export const GET = async () => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_API_KEY);
    
    // Tyvärr har inte @google/generative-ai en inbyggd listModels-metod
    // Vi får testa några vanliga modeller istället
    
    const modelsToTest = [
      "gemini-1.5-pro",
      "gemini-1.5-flash", 
      "gemini-2.0-flash-exp",
      "gemini-2.0-pro-exp",
      "gemini-2.5-flash-preview"
    ];
    
    const results = [];
    
    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hej");
        await result.response;
        results.push({ model: modelName, status: "✅ Tillgänglig" });
      } catch (e) {
        results.push({ model: modelName, status: "❌ Inte tillgänglig", error: e.message });
      }
    }
    
    return new Response(
      JSON.stringify({ results }, null, 2),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};