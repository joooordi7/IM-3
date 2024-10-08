<?php
header('Content-Type: application/json');

// API-Schlüssel und Team-ID für FC Barcelona
$apiKey = '201773338b6445c483a3179e4d4f09e1';  // Dein Football-Data API-Schlüssel
$teamId = 81;  // FC Barcelona Team-ID
$url = "https://api.football-data.org/v2/teams/$teamId/matches";

// API-Header mit Authentifizierung
$options = [
    "http" => [
        "header" => "X-Auth-Token: $apiKey\r\n"
    ]
];

// API-Anfrage
$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// Fehlerbehandlung, falls die Daten nicht abgerufen werden können
if ($response === FALSE) {
    die('Fehler beim Abrufen der Daten.');
}

// JSON-Daten dekodieren und nur die 'matches'-Daten zurückgeben
$data = json_decode($response, true);
echo json_encode($data['matches']);
?>
