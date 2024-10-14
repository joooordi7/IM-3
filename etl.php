<?php
// Include the config file, which already contains the database connection info
require_once 'config.php';

try {
    // Bereitet die SQL-Abfrage vor, um alle gespeicherten Spieldaten aus der Tabelle `fc_barcelona_match_stats` zu erhalten
    $sql = "
        SELECT match_id, date, opponent, score_home, score_away, winner, ball_possession, shots, shots_on_goal, yellow_cards, red_cards
        FROM fc_barcelona_match_stats
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Daten als assoziatives Array abrufen
    $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // JSON-Antwort senden, um sie im Frontend anzuzeigen
    header('Content-Type: application/json');
    echo json_encode($matches);

} catch (PDOException $e) {
    // Fehlerbehandlung, wenn die Abfrage fehlschlägt
    http_response_code(500); // Setze den HTTP-Statuscode auf 500 (Internal Server Error)
    echo json_encode(['error' => 'Fehler beim Abrufen der Daten: ' . $e->getMessage()]);
}
?>
