<?php
// Include the config file, which already contains the database connection info and API key
require_once 'config.php';

// Funktion zur Abfrage der API-Daten mit cURL
function fetchFootballData($apiKey, $teamId) {
    $url = "https://api.football-data.org/v4/teams/81/matches";

    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "X-Auth-Token: $apiKey"
    ));

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Überprüft auf Fehler
    if(curl_errno($ch)) {
        die('cURL Error: ' . curl_error($ch));
    }

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
}

// Team-ID (z.B. FC Barcelona)
$teamId = 81;  // Team-ID von FC Barcelona

// API-Daten abrufen
$data = fetchFootballData($apiKey, $teamId);  // Der API-Key wird aus config.php geladen

// SQL-Anweisung für das Einfügen der Daten vorbereiten
$sql = "
    INSERT INTO matches (match_id, date, opponent, score_home, score_away, winner, ball_possession, shots, shots_on_goal, yellow_cards, red_cards)
    VALUES (:match_id, :date, :opponent, :score_home, :score_away, :winner, :ball_possession, :shots, :shots_on_goal, :yellow_cards, :red_cards)
    ON DUPLICATE KEY UPDATE
    score_home = VALUES(score_home),
    score_away = VALUES(score_away),
    winner = VALUES(winner),
    ball_possession = VALUES(ball_possession),
    shots = VALUES(shots),
    shots_on_goal = VALUES(shots_on_goal),
    yellow_cards = VALUES(yellow_cards),
    red_cards = VALUES(red_cards)
";
$stmt = $pdo->prepare($sql);  // PDO-Instanz wird aus config.php geladen

// Schleife zum Einfügen jedes Spiels in die Datenbank
foreach ($data['matches'] as $match) {
    $match_id = $match['id'];
    $date = $match['utcDate'];
    $opponent = ($match['homeTeam']['id'] == $teamId) ? $match['awayTeam']['name'] : $match['homeTeam']['name'];
    $score_home = $match['score']['fullTime']['homeTeam'];
    $score_away = $match['score']['fullTime']['awayTeam'];
    
    // Gewinner ermitteln
    if ($score_home > $score_away) {
        $winner = ($match['homeTeam']['id'] == $teamId) ? 'FC Barcelona' : $opponent;
    } elseif ($score_home < $score_away) {
        $winner = ($match['awayTeam']['id'] == $teamId) ? 'FC Barcelona' : $opponent;
    } else {
        $winner = 'draw';
    }

    // Statistiken abrufen (wenn vorhanden, dies könnte je nach API anpassbar sein)
    $stats = $match['statistics'] ?? [];
    $ball_possession = $stats['possession'] ?? null;
    $shots = $stats['shots'] ?? null;
    $shots_on_goal = $stats['shotsOnGoal'] ?? null;
    $yellow_cards = $stats['yellowCards'] ?? null;
    $red_cards = $stats['redCards'] ?? null;

    // Parameter an die SQL-Anweisung binden und ausführen
    $stmt->execute([
        ':match_id' => $match_id,
        ':date' => $date,
        ':opponent' => $opponent,
        ':score_home' => $score_home,
        ':score_away' => $score_away,
        ':winner' => $winner,
        ':ball_possession' => $ball_possession,
        ':shots' => $shots,
        ':shots_on_goal' => $shots_on_goal,
        ':yellow_cards' => $yellow_cards,
        ':red_cards' => $red_cards
    ]);
}

// Ausgabe bei erfolgreichem Abschluss
echo "ETL-Prozess erfolgreich abgeschlossen.";
?>
