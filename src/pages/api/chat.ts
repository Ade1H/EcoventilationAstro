// src/pages/api/chat.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { message } = await request.json();
        const apiKey = import.meta.env.GEMINI_API_KEY;

        // ===========================================
        // 🤖 DIN GAMLA MODELL - 550ms svarstid!
        // ===========================================
        const model = 'gemini-flash-lite-latest';  // <-- DIN ÖNSKADE MODELL!
        
        // ===========================================
        // 🏭 ECOVENTILATION.SE - UPPDATERAD PROMPT
        // ===========================================
        const systemPrompt = `Du är kundtjänst för Ecoventilation.se - Sveriges ventilationsspecialister.

【VIKTIGA REGLER】
- Svara ALLTID på svenska, var vänlig och professionell
- Prata ENDAST om ventilation, FTX, imkanaler och fläktar
- Frågar kunden om PRIS: Säg "För prisuppgift, vänligen kontakta oss på ecoventilation.se/kontakt eller ring oss så får du en personlig offert!"
- Frågar kunden om OFFERT: Säg "Vi hjälper dig gärna med en kostnadsfri offert! Besök ecoventilation.se/kontakt eller ring oss så återkommer vi inom 24h."
- Avsluta ALLTID med att hänvisa till ecoventilation.se/kontakt
- Håll svaren koncisa men vänliga (max 3 meningar)

【EXEMPEL】
Kund: "Vad kostar FTX?"
Svar: "Tack för din fråga! För prisuppgift på våra FTX-system, vänligen kontakta oss på ecoventilation.se/kontakt eller ring oss. Vi hjälper dig gärna med en personlig offert anpassad efter dina behov! 😊"

Kund: "Hej"
Svar: "Hej och välkommen till Ecoventilation! 👋 Hur kan jag hjälpa dig med ventilation idag? Vi har allt från FTX-system till imkanaler och service. Besök gärna ecoventilation.se/kontakt för mer information!"

Kund: "Vad är FTX?"
Svar: "FTX står för Från- och Tilluft med Värmeåtervinning. Det är ett ventilationssystem som återvinner värmen i inomhusluften och sänker dina energikostnader! Kontakta oss på ecoventilation.se/kontakt för mer information om vilket system som passar dig bäst."

Kund: "Imkanal"
Svar: "En imkanal leder bort matos, ånga och lukt från köket. Ecoventilation har fläktar med låg ljudnivå och bra prestanda! Se hela vårt sortiment på ecoventilation.se/kontakt"

Kund: "Offert"
Svar: "Vi hjälper dig gärna med en kostnadsfri offert! Fyll i dina önskemål på ecoventilation.se/kontakt eller ring oss. Vi återkommer inom 24 timmar med ett personligt förslag! 🌟"

【KUNDFRÅGA】
${message}

【SVAR】`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: systemPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 250,
                        topP: 0.95,
                        topK: 40
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Gemini API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            
            // Om kvotan är slut - ge vänligt meddelande
            if (response.status === 429) {
                return new Response(JSON.stringify({
                    response: "Hej! 🌟 Just nu är det många som söker hjälp. Vänligen kontakta oss direkt på ecoventilation.se/kontakt eller ring oss så hjälper vi dig personligen!",
                    timestamp: new Date().toISOString()
                }), {
                    status: 200,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                });
            }
            
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        let botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        // Rensa bort eventuella prompt-rester
        if (botResponse) {
            botResponse = botResponse
                .replace('Svar:', '')
                .replace('Ecoventilation:', '')
                .replace('【SVAR】', '')
                .trim();
        }
        
        // Fallback om svaret är tomt
        if (!botResponse) {
            botResponse = "Tack för din fråga! Våra ventilationsexperter hjälper dig gärna. Besök ecoventilation.se/kontakt för personlig service! 😊";
        }

        return new Response(JSON.stringify({
            response: botResponse,
            timestamp: new Date().toISOString()
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('❌ Chat error:', error);
        
        return new Response(JSON.stringify({
            response: "Hej! Välkommen till Ecoventilation! 👋 Just nu har vi lite tekniskt underhåll med chatten. Vänligen kontakta oss via ecoventilation.se/kontakt eller ring oss - vi hjälper dig gärna på telefon!",
            timestamp: new Date().toISOString()
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};

// ===========================================
// 🔍 GET-ENDPOINT - KOLLA STATUS
// ===========================================
export const GET: APIRoute = async () => {
    const apiKey = import.meta.env.GEMINI_API_KEY;
    
    return new Response(JSON.stringify({
        status: '✅ Ecoventilation Chat API är igång!',
        engine: 'Gemini Flash Lite',
        model: 'gemini-flash-lite-latest',  // <-- DIN MODELL!
        apiKeyExists: apiKey ? 'Ja' : 'Nej',
        apiKeyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'none',
        timestamp: new Date().toISOString(),
        company: 'Ecoventilation.se',
        language: 'Svenska',
        netlify: 'Ready'
    }), {
        status: 200,
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    });
};