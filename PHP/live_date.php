<?php
header('Content-Type: application/json');

// API-Schlüssel und URL für RapidAPI
$apiKey = '1e29d09e6amsh7da44754e7254c3p13089jsn0af37d90033a';  // Dein RapidAPI-Schlüssel
$url = 'https://free-api-live-football-data.p.rapidapi.com/matches';

// API-Header mit Authentifizierung
$headers = [
    "X-RapidAPI-Key: $apiKey",
    "X-RapidAPI-Host: free-api-live-football-data.p.rapidapi.com"
];

// API-Anfrage
$options = [
    "http" => [
        "method" => "GET",
        "header" => implode("\r\n", $headers)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// Fehlerbehandlung, falls die Daten nicht abgerufen werden können
if ($response === FALSE) {
    die('Fehler beim Abrufen der Daten.');
}

// JSON-Daten dekodieren und die relevanten Daten zurückgeben
$data = json_decode($response, true);
echo json_encode($data['data']);
?>
