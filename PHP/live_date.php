<?php
$apiKey = '1e29d09e6amsh7da44754e7254c3p13089jsn0af37d90033a';  // Dein RapidAPI-Schlüssel
$url = 'https://free-api-live-football-data.p.rapidapi.com/matches';

$headers = [
    "X-RapidAPI-Key: $apiKey",
    "X-RapidAPI-Host: free-api-live-football-data.p.rapidapi.com"
];

$options = [
    "http" => [
        "method" => "GET",
        "header" => implode("\r\n", $headers)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === FALSE) {
    die('Fehler beim Abrufen der Daten.');
}

$data = json_decode($response, true);
echo json_encode($data['data']);
?>
