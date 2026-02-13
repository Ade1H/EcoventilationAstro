<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $message = strtolower(trim($input['message'] ?? ''));
    
    // Enkel chatbot-logik för Ecoventilation
    $response = match(true) {
        // Hälsningar
        str_contains($message, 'hej') || str_contains($message, 'hallå') || str_contains($message, 'god dag') =>
            'Hej! Välkommen till Ecoventilation. Hur kan vi hjälpa dig med din ventilation idag? 🌿',
        
        // Imkanal
        str_contains($message, 'imkanal') || str_contains($message, 'fett') || str_contains($message, 'kök') =>
            'Vi rengör imkanaler professionellt i hela Sverige! Boka via vår hemsida eller ring 020-123 456. Vill du ha en offert?',
        
        // FTX
        str_contains($message, 'ftx') || str_contains($message, 'värmeväxlare') || str_contains($message, 'ventilation') =>
            'FTX-service ingår i vårt underhållsprogram. Årlig service. Vi kommer till dig i hela Sverige! 🌬️',
        
        // Avlopp
        str_contains($message, 'avlopp') || str_contains($message, 'stopp') || str_contains($message, 'spolning') =>
            'Akut avloppsrensning? Vi hjälper dig! för akut utryckning. Förebyggande underhåll från 1995:-/år. 🚰',
        
        // Pris / offert
        str_contains($message, 'pris') || str_contains($message, 'kostar') || str_contains($message, 'offert') =>
            'Självklart! Vänligen uppge: 1) Vilken tjänst? 2) Stad/område? 3) Ungefärlig storlek? Så återkommer vi med pris inom 24h! 📋',
        
        // Boka
        str_contains($message, 'boka') || str_contains($message, 'beställa') || str_contains($message, 'tid') =>
            'Toppen! Du kan boka direkt på vår hemsida eller ringa 020-123 456. Önskar du att jag skickar en bokningslänk? 📅',
        
        // Kontakt
        str_contains($message, 'ring') || str_contains($message, 'telefon') || str_contains($message, 'kontakt') =>
            'Vår kundtjänst nås på 020-123 456 (mån-fre 8-17). Eller mejla oss på info@ecoventilation.se 📞',
        
        // Standard-svar
        default =>
            'Tack för ditt meddelande! För att hjälpa dig bäst, specificera gärna: 
            • Imkanalsrensning
            • FTX-service
            • Avloppsrensning
            • Prisförfrågan
            • Boka service
            
            Eller ring oss direkt på 020-123 456! 😊'
    };
    
    echo json_encode(['response' => $response]);
} else {
    echo json_encode(['error' => 'Använd POST-metoden']);
}
?>