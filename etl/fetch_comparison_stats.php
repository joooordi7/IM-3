<?php
// Include the config file for database connection
require_once 'config.php';

header('Content-Type: application/json');

try {
    // Bereitet die SQL-Abfrage vor, um die Daten für Hansi Flick abzurufen
    $sql = "
        SELECT 
            SUM(score_home) AS flick_score_home,
            SUM(score_away) AS flick_score_away,
            SUM(CASE WHEN winner = 'FC Barcelona' THEN 1 ELSE 0 END) AS flick_wins,
            AVG(ball_possession) AS flick_ball_possession,
            SUM(shots) AS flick_shots,
            SUM(shots_on_goal) AS flick_shots_on_goal,
            SUM(yellow_cards) AS flick_yellow_cards,
            SUM(red_cards) AS flick_red_cards
        FROM matches
        WHERE date >= '2023-01-01' -- Beispiel für das Filterdatum
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $flickStats = $stmt->fetch(PDO::FETCH_ASSOC);

    // Bereitet die API-Anfrage für Xavi vor
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://free-api-live-football-data.p.rapidapi.com/football-league-team-statistics-types?leagueid=7&seasonid=52162",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: free-api-live-football-data.p.rapidapi.com",
            "x-rapidapi-key: 1e29d09e6amsh7da44754e7254c3p193089jsn0af37d90033a"
        ],
    ]);

    $response = curl_exec($curl);
    if (curl_errno($curl)) {
        http_response_code(500);
        echo json_encode(['error' => "cURL Error: " . curl_error($curl)]);
        exit();
    }
    curl_close($curl);

    $data = json_decode($response, true);
    $xaviStats = null;

    // Hier filtern wir die Statistiken für Xavi
    foreach ($data['data'] as $teamStat) {
        if (strtolower($teamStat['team_name']) == 'fc barcelona') {
            $xaviStats = $teamStat;
            break;
        }
    }

    // Zusammenstellung der Statistiken
    $comparisonData = [
        'flick' => [
            'score_home' => $flickStats['flick_score_home'] ?? 0,
            'score_away' => $flickStats['flick_score_away'] ?? 0,
            'winner' => $flickStats['flick_wins'] ?? 0, // Anzahl der Siege
            'ball_possession' => $flickStats['flick_ball_possession'] ?? 0,
            'shots' => $flickStats['flick_shots'] ?? 0,
            'shots_on_goal' => $flickStats['flick_shots_on_goal'] ?? 0,
            'yellow_cards' => $flickStats['flick_yellow_cards'] ?? 0,
            'red_cards' => $flickStats['flick_red_cards'] ?? 0
        ],
        'xavi' => [
            'score_home' => $xaviStats['score_home'] ?? 0,
            'score_away' => $xaviStats['score_away'] ?? 0,
            'winner' => $xaviStats['wins'] ?? 0, // Anzahl der Siege
            'ball_possession' => $xaviStats['ball_possession'] ?? 0,
            'shots' => $xaviStats['shots'] ?? 0,
            'shots_on_goal' => $xaviStats['shots_on_goal'] ?? 0,
            'yellow_cards' => $xaviStats['yellow_cards'] ?? 0,
            'red_cards' => $xaviStats['red_cards'] ?? 0
        ]
    ];

    echo json_encode($comparisonData);
} catch (PDOException $e) {
    // Fehlerbehandlung
    http_response_code(500);
    echo json_encode(['error' => 'Daten konnten nicht abgerufen werden: ' . $e->getMessage()]);
}
?>
