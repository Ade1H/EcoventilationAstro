// src/pages/api/chat-gemini.ts
export const prerender = false;

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_API_KEY);

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const userMessage = body.message || '';

    // TESTA DESSA MODELLNAMN (avkommentera EN i taget)
    const model = genAI.getGenerativeModel({ 
       //model: "models/gemini-1.5-flash-002",        // Specifik version
       //model: "models/gemini-1.5-flash-latest",     // Senaste flash
      // model: "models/gemini-1.5-pro-002",          // Specifik pro-version
      // model: "models/gemini-1.5-pro-latest",          // Senaste pro
       model: "models/gemini-2.0-flash-exp",         // Experimental
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    const result = await model.generateContent(userMessage);
    const text = result.response.text();

    return new Response(
      JSON.stringify({ svar: text }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('❌ Fel:', error);
    return new Response(
      JSON.stringify({ 
        svar: `Hej! Ring oss på 08-123 456 78 så hjälper vi dig!` 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
};