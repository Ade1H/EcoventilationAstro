<?php
// test-gemini.php - DIREKT TEST AV GEMINI API
define('GEMINI_API_KEY', 'AIzaSyCfBttToftZGy8fnGsZSXmN4skSfS0FyjU'); // ÄNDRA HÄR!

echo "🔍 Testar Gemini API...\n\n";

$model = 'gemini-flash-lite-latest';
$url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key=" . GEMINI_API_KEY;

$data = [
    'contents' => [
        ['parts' => [['text' => "Säg bara 'HEJ' på svenska"]]]
    ]
];

$options = [
    'http' => [
        'header' => "Content-Type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data),
        'timeout' => 10
    ],
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === false) {
    echo "❌ FEL: Kunde inte ansluta till Gemini\n";
} else {
    echo "✅ Svar från Gemini:\n";
    echo $response . "\n\n";
    
    $result = json_decode($response, true);
    if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
        echo "📝 GEMINIS SVAR: " . $result['candidates'][0]['content']['parts'][0]['text'] . "\n";
    }
}
?>