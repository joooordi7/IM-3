<?php
$apiKey = '201773338b6445c483a3179e4d4f09e1';  // Dein Football-Data API-Schlüssel
$teamId = 81;  // FC Barcelona Team-ID
$url = "https://api.football-data.org/v2/teams/$teamId/matches";

$options = [
    "http" => [
        "header" => "X-Auth-Token: $apiKey\r\n"
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === FALSE) {
    die('Fehler beim Abrufen der Daten.');
}

$data = json_decode($response, true);
echo json_encode($data['matches']);
?>
