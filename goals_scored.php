<?php
// Enable full error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the config file, which already contains the database connection info
require_once 'config.php';

try {
    // Establish database connection
    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to sum goals scored by FC BARCELONA both as home and away team
    $sql = "
        SELECT
            SUM(CASE WHEN winner = 'FC BARCELONA' AND score_home > score_away THEN score_home ELSE 0 END) +
            SUM(CASE WHEN winner = 'FC BARCELONA' AND score_away > score_home THEN score_away ELSE 0 END) AS total_goals
        FROM fc_barcelona_match_stats;
    ";

    // Prepare and execute the SQL statement
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch the result as an associative array
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Output the total number of goals scored in JSON format
    header('Content-Type: application/json');
    echo json_encode(['total_goals' => $result['total_goals']], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Handle any database errors
    http_response_code(500); // Set HTTP status code to 500 (Internal Server Error)
    echo json_encode(['error' => 'Fehler beim Abrufen der Daten: ' . $e->getMessage()]);
}
?>
