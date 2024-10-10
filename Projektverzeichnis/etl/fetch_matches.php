<?php
// Include the config file for database connection
require_once 'config.php';

try {
    // Bereitet die SQL-Abfrage vor, um alle Daten aus der Tabelle `matches` zu erhalten
    $sql = "SELECT match_id, date, opponent, score_home, score_away, winner, ball_possession, shots, shots_on_goal, yellow_cards, red_cards FROM matches";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    // Daten als assoziatives Array abrufen
    $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // JSON-Antwort senden
    header('Content-Type: application/json');
    echo json_encode($matches);
    
} catch (PDOException $e) {
    // Fehlerbehandlung, wenn die Abfrage fehlschlägt
    http_response_code(500);
    echo json_encode(['error' => 'Fehler beim Abrufen der Daten: ' . $e->getMessage()]);
}
?>
