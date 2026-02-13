// src/pages/api/chat.ts
export const prerender = false;

// Företagets data - utan priser
const companyData = {
  services: [
    "FTX-service och filterbyte",
    "OVK-besiktning (obligatorisk ventilationskontroll)",
    "Imkanalsrengöring för kök",
    "Avloppsrensning och vattenlås",
    "Ventilationsrensning av kanaler och don",
    "Frånluftsventilation - service och underhåll",
    "Luftvärmepumpar - service och rengöring",
    "Fuktinspektioner med kamerateknik",
    "Brandskydd för fastigheter"
  ],
  contact: {
    phone: "08-123 456 78",
    email: "info@ecoventilation.se",
    website: "ecoventilation.se"
  },
  regions: ["Stockholm", "Göteborg", "Malmö", "Hela Sverige"],
  serviceAgreements: "Icke-bindande serviceavtal - vi kontaktar dig när det är dags för service"
};

// Hjälpfunktion för att hitta svar - utan priser
function getResponse(message) {
  const msg = message.toLowerCase();
  
  // FTX och ventilation
  if (msg.includes('ftx') || (msg.includes('ventilation') && !msg.includes('ovk'))) {
    return `Vi utför FTX-service och filterbyte. Våra FTX-tjänster inkluderar:
• Service av FTX-aggregat
• Filterbyte (alla modeller)
• Rengöring av kanaler
• Justering och balansering

Kontakta oss för en kostnadsfri offert anpassad efter ditt system!`;
  }
  
  // OVK
  if (msg.includes('ovk') || msg.includes('obligatorisk ventilationskontroll')) {
    return `Vi utför OVK-besiktningar (obligatorisk ventilationskontroll) i hela Sverige.

• Godkända besiktningsmän
• Snabb rapport efter besiktning
• Hjälp med åtgärder om det behövs

Kontakta oss för pris och tillgängliga tider i ditt område!`;
  }
  
  // Imkanaler
  if (msg.includes('imkanal') || msg.includes('kök') || msg.includes('fläkt')) {
    return `Vi rengör imkanaler i kök - viktigt för brandsäkerhet och ventilation!

• Borttagning av fett och smuts
• Minskar brandrisk
• Förbättrar köksventilationen
• Uppfyller brandskyddskrav

Kontakta oss för en kostnadsfri offert!`;
  }
  
  // Avlopp
  if (msg.includes('avlopp') || msg.includes('stopp') || msg.includes('vattenlås')) {
    return `Vi rensar avlopp och vattenlås - akut hjälp inom 24h!

• Rensning av stopp
• Byte av vattenlås
• Kamerainspektion
• Förebyggande underhåll

Ring oss för snabb hjälp och prisuppgift!`;
  }
  
  // Filter och filterbyte
  if (msg.includes('filter') || msg.includes('byte')) {
    return `Vi byter filter i alla typer av aggregat:

• Passar de flesta märken
• Vi kommer hem till dig
• Originalfilter eller motsvarande kvalitet
• Filterguide - vi hjälper dig välja rätt

Kontakta oss för pris på just dina filter!`;
  }
  
  // Priser - här säger vi alltid "kontakta oss"
  if (msg.includes('pris') || msg.includes('kostar') || msg.includes('offer') || msg.includes('vad tar ni')) {
    return `För priser på våra tjänster är du varmt välkommen att kontakta oss!

Vi ger dig en kostnadsfri offert anpassad efter just dina behov.

📞 Ring oss: ${companyData.contact.phone}
📧 Mejla oss: ${companyData.contact.email}

Vi återkommer snabbt med prisförslag!`;
  }
  
  // Serviceavtal
  if (msg.includes('serviceavtal') || msg.includes('abonnemang') || msg.includes('regelbunden')) {
    return `${companyData.serviceAgreements}

Fördelar med vårt serviceavtal:
• Du slipper komma ihåg intervallerna
• Vi kontaktar dig när det är dags
• Förmånligare priser för dig som avtalskund
• Prioriterad service

Helt utan bindningstid! Kontakta oss för mer information och pris.`;
  }
  
  // Områden
  if (msg.includes('område') || msg.includes('ort') || msg.includes('stad') || msg.includes('finns')) {
    return `Vi verkar i hela Sverige med bas i följande städer:
${companyData.regions.map(r => `• ${r}`).join('\n')}

Kontakta oss för att se om vi täcker just ditt område!`;
  }
  
  // Kontakt
  if (msg.includes('kontakt') || msg.includes('ringa') || msg.includes('mail') || msg.includes('telefon')) {
    return `Du når oss enklast via:

📞 Telefon: ${companyData.contact.phone}
📧 E-post: ${companyData.contact.email}
🌐 Webbplats: ${companyData.contact.website}

Vi svarar i telefon vardagar 08:00-17:00. Akutärenden kan du ringa dygnet runt!`;
  }
  
  // Hälsningsfraser
  if (msg.includes('hej') || msg.includes('hallå') || msg.includes('tjena') || msg.includes('god morgon')) {
    return `👋 Hej och välkommen till Eco Ventilation!

Jag kan hjälpa dig med frågor om:
• FTX-service och filterbyte
• OVK-besiktning
• Imkanalsrengöring
• Avloppsrensning
• Serviceavtal

Vad vill du veta mer om?`;
  }
  
  // Standardsvar - uppdaterat utan priser
  return `Tack för din fråga! Våra huvudsakliga tjänster är:

${companyData.services.map(s => `• ${s}`).join('\n')}

För mer information om någon specifik tjänst, eller för att få en kostnadsfri offert, är du varmt välkommen att kontakta oss:

📞 Telefon: ${companyData.contact.phone}
📧 E-post: ${companyData.contact.email}

Vi hjälper dig gärna!`;
}

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const userMessage = body.message || body.text || '';
    
    console.log('📨 Fråga:', userMessage);
    
    const svar = getResponse(userMessage);
    
    console.log('📤 Svar:', svar.substring(0, 50) + '...');
    
    return new Response(
      JSON.stringify({ svar: svar }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('❌ Fel:', error);
    
    return new Response(
      JSON.stringify({ 
        svar: 'Hej! Ring oss på 08-123 456 78 så hjälper vi dig!' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};