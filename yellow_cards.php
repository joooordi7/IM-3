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

    // SQL query to sum the yellow cards
    $sql = "
        SELECT SUM(yellow_cards) AS total_yellow_cards
        FROM fc_barcelona_match_stats;
    ";

    // Prepare and execute the SQL statement
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch the result as an associative array
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Output the sum of yellow cards in JSON format
    header('Content-Type: application/json');
    echo json_encode(['total_yellow_cards' => $result['total_yellow_cards']], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Handle any database errors
    http_response_code(500); // Set HTTP status code to 500 (Internal Server Error)
    echo json_encode(['error' => 'Fehler beim Abrufen der Daten: ' . $e->getMessage()]);
}
?>
