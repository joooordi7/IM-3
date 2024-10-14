<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Include the config file for database connection
require_once 'config.php';

try {
    // SQL query to fetch the current statistics for Hansi Flick
    $sql = "
        SELECT 
            SUM(COALESCE(score_home, 0)) AS flick_score_home,
            SUM(COALESCE(score_away, 0)) AS flick_score_away,
            SUM(CASE WHEN winner = 'FC Barcelona' THEN 1 ELSE 0 END) AS flick_wins,
            COUNT(*) AS games_played,
            AVG(COALESCE(ball_possession, 0)) AS flick_ball_possession,
            SUM(COALESCE(shots, 0)) AS flick_shots,
            SUM(COALESCE(shots_on_goal, 0)) AS flick_shots_on_goal,
            SUM(COALESCE(yellow_cards, 0)) AS flick_yellow_cards,
            SUM(COALESCE(red_cards, 0)) AS flick_red_cards
        FROM fc_barcelona_match_stats
        WHERE date >= '2023-01-01'
    ";

    // Execute the SQL query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $flickStats = $stmt->fetch(PDO::FETCH_ASSOC);

    // Assemble comparison data (Xavi data can still be hardcoded or stored in the database)
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

    $comparisonData = [
        'flick' => $flickStats,
        'xavi' => $xaviStats
    ];

    // Output comparison data as JSON
    echo json_encode($comparisonData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Datenbankfehler: ' . $e->getMessage()]);
}
?>

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
