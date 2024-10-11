<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Include the config file for database connection
require_once 'config.php';

try {
    // SQL query to calculate statistics for Hansi Flick
    $sql = "
        SELECT 
            SUM(score_home) AS flick_score_home,
            SUM(score_away) AS flick_score_away,
            SUM(CASE WHEN winner = 'FC Barcelona' THEN 1 ELSE 0 END) AS flick_wins,
            COUNT(*) AS games_played,
            AVG(ball_possession) AS flick_ball_possession,
            SUM(shots) AS flick_shots,
            SUM(shots_on_goal) AS flick_shots_on_goal,
            SUM(yellow_cards) AS flick_yellow_cards,
            SUM(red_cards) AS flick_red_cards
        FROM fc_barcelona_match_stats
        WHERE date >= '2023-01-01'
    ";

    // Execute the SQL query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $flickStats = $stmt->fetch(PDO::FETCH_ASSOC);

    // Manuelle Daten für Xavi (du kannst diese Daten auch dynamisch berechnen, falls gewünscht)
    $xaviStats = [
        'score_home' => 45,
        'score_away' => 30,
        'win_percentage' => 65,
        'ball_possession' => 65,
        'shots' => 16,
        'shots_on_goal' => 7,
        'yellow_cards' => 1.5,
        'red_cards' => 0.1
    ];

    // Assemble comparison data for output
    $comparisonData = [
        'flick' => [
            'score_home' => $flickStats['flick_score_home'] ?? 0,
            'score_away' => $flickStats['flick_score_away'] ?? 0,
            'wins' => $flickStats['flick_wins'] ?? 0,
            'games_played' => $flickStats['games_played'] ?? 1,
            'ball_possession' => $flickStats['flick_ball_possession'] ?? 0,
            'shots' => $flickStats['flick_shots'] ?? 0,
            'shots_on_goal' => $flickStats['flick_shots_on_goal'] ?? 0,
            'yellow_cards' => $flickStats['flick_yellow_cards'] ?? 0,
            'red_cards' => $flickStats['flick_red_cards'] ?? 0
        ],
        'xavi' => $xaviStats
    ];

    // Output comparison data as JSON
    echo json_encode($comparisonData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Datenbankfehler: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ein Fehler ist aufgetreten: ' . $e->getMessage()]);
}
?>
