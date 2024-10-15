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

    // SQL query to sum the ball_possession values
    $sql = "
        SELECT SUM(ball_possession) AS total_ball_possession
        FROM fc_barcelona_match_stats
        WHERE ball_possession IS NOT NULL;
    ";

    // Prepare and execute the SQL statement
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch the result as an associative array
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Manually calculate the average by dividing the total by 9 (since you specified there are 9 matches)
    $average_ball_possession = $result['total_ball_possession'] / 9;

    // Output the average ball possession in JSON format
    header('Content-Type: application/json');
    echo json_encode(['avg_ball_possession' => $average_ball_possession], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Handle any database errors
    http_response_code(500); // Set HTTP status code to 500 (Internal Server Error)
    echo json_encode(['error' => 'Fehler beim Abrufen der Daten: ' . $e->getMessage()]);
}
?>
