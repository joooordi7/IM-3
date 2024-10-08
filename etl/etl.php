<?php
// Header setzen, um JSON auszugeben
header('Content-Type: application/json');

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// 2. API-Daten von Football-Data.org (FC Barcelona)
$apiKeyFootballData = '201773338b6445c483a3179e4d4f09e1';  // Dein Football-Data API-Schlüssel
$teamId = 81;  // FC Barcelona Team-ID
$urlFootballData = "https://api.football-data.org/v2/teams/$teamId/matches";

// API-Header für Football-Data.org
$optionsFootballData = [
    "http" => [
        "header" => "X-Auth-Token: $apiKeyFootballData\r\n"
    ]
];

// API-Anfrage für Football-Data.org
$contextFootballData = stream_context_create($optionsFootballData);
$responseFootballData = file_get_contents($urlFootballData, false, $contextFootballData);

// Fehlerbehandlung für Football-Data.org API
if ($responseFootballData === FALSE) {
    die('Fehler beim Abrufen der Daten von Football-Data.org.');
}

// JSON-Daten von Football-Data.org dekodieren
$dataFootballData = json_decode($responseFootballData, true);
$matchesFootballData = $dataFootballData['matches'];

// 3. API-Daten von RapidAPI (Live Football Data)
$apiKeyRapidAPI = '1e29d09e6amsh7da44754e7254c3p13089jsn0af37d90033a';  // Dein RapidAPI-Schlüssel
$urlRapidAPI = 'https://free-api-live-football-data.p.rapidapi.com/matches';

// API-Header für RapidAPI
$headersRapidAPI = [
    "X-RapidAPI-Key: $apiKeyRapidAPI",
    "X-RapidAPI-Host: free-api-live-football-data.p.rapidapi.com"
];

// API-Anfrage für RapidAPI
$optionsRapidAPI = [
    "http" => [
        "method" => "GET",
        "header" => implode("\r\n", $headersRapidAPI)
    ]
];

$contextRapidAPI = stream_context_create($optionsRapidAPI);
$responseRapidAPI = file_get_contents($urlRapidAPI, false, $contextRapidAPI);

// Fehlerbehandlung für RapidAPI
if ($responseRapidAPI === FALSE) {
    die('Fehler beim Abrufen der Daten von RapidAPI.');
}

// JSON-Daten von RapidAPI dekodieren
$dataRapidAPI = json_decode($responseRapidAPI, true);
$matchesRapidAPI = $dataRapidAPI['data'];

// 4. Daten transformieren und in die Datenbank laden (ETL-Prozess)
// Beispiel: Verarbeitung von Football-Data.org API-Daten
foreach ($matchesFootballData as $match) {
    $match_date = $match['utcDate'];
    $home_team = $match['homeTeam']['name'];
    $away_team = $match['awayTeam']['name'];
    $competition = $match['competition']['name'];
    $status = $match['status'];

    // Daten in die Datenbank speichern
    $stmt = $conn->prepare("INSERT INTO matches (match_date, home_team, away_team, competition, status) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $match_date, $home_team, $away_team, $competition, $status);

    if (!$stmt->execute()) {
        echo "Fehler beim Speichern des Spiels von Football-Data.org: " . $stmt->error;
    }
}

// Beispiel: Verarbeitung von RapidAPI-Daten
foreach ($matchesRapidAPI as $match) {
    $match_date = $match['match_date'];
    $home_team = $match['home_team'];
    $away_team = $match['away_team'];
    $status = $match['status'];

    // Daten in die Datenbank speichern
    $stmt = $conn->prepare("INSERT INTO matches (match_date, home_team, away_team, competition, status) VALUES (?, ?, ?, ?, ?)");
    $competition = "Unknown"; // Placeholder, da die RapidAPI keine Angabe für den Wettbewerb macht
    $stmt->bind_param("sssss", $match_date, $home_team, $away_team, $competition, $status);

    if (!$stmt->execute()) {
        echo "Fehler beim Speichern des Spiels von RapidAPI: " . $stmt->error;
    }
}

// Verbindung schließen
$stmt->close();
$conn->close();

echo "ETL-Prozess erfolgreich abgeschlossen.";
?>
