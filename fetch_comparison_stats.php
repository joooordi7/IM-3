<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Include the config file for database connection
require_once 'config.php';

try {
    // SQL query to calculate statistics for Hansi Flick
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
        WHERE date >= '2023-01-01';
    ";

    // Execute the SQL query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $flickStats = $stmt->fetch(PDO::FETCH_ASSOC);

    // Assemble data for output (only Hansi Flick data)
    $comparisonData = [
        'flick' => [
            'score_home' => $flickStats['flick_score_home'] ?? 0,
            'score_away' => $flickStats['flick_score_away'] ?? 0,
            'wins' => $flickStats['flick_wins'] ?? 0,
            'games_played' => $flickStats['games_played'] ?? 1,  // Prevent division by zero
            'ball_possession' => $flickStats['flick_ball_possession'] ?? 0,
            'shots' => $flickStats['flick_shots'] ?? 0,
            'shots_on_goal' => $flickStats['flick_shots_on_goal'] ?? 0,
            'yellow_cards' => $flickStats['flick_yellow_cards'] ?? 0,
            'red_cards' => $flickStats['flick_red_cards'] ?? 0
        ]
    ];

    // Output comparison data as JSON (only Flick's stats)
    echo json_encode($comparisonData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

    catch (PDOException $e) {
        error_log('Database error: ' . $e->getMessage());  // Log error to server logs
        http_response_code(500);
        echo json_encode(['error' => 'Database error. Please try again later.']);
    } catch (Exception $e) {
        error_log('General error: ' . $e->getMessage());  // Log general error
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred.']);
    }
    