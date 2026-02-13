// src/pages/api/test-gemini.ts
export const prerender = false;

import { GoogleGenerativeAI } from '@google/generative-ai';

export const GET = async () => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent("Svar bara med 'OK' om du fungerar");
    const response = await result.response;
    const text = response.text();
    
    return new Response(
      JSON.stringify({ 
        status: '✅ Gemini fungerar!',
        svar: text 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        status: '❌ Gemini fungerar INTE',
        error: error.message 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
};