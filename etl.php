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

    // SQL query to extract relevant match statistics from the table
    $sql = "
        SELECT *
        FROM fc_barcelona_match_stats
        WHERE winner IS NOT NULL;
    ";

    // Prepare and execute the SQL statement
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // // Fetch all the results as an associative array
    $fc_barcelona_match_stats = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // // Output the match data in JSON format
    header('Content-Type: application/json');
    echo json_encode($fc_barcelona_match_stats, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Handle any database errors
    http_response_code(500); // Set HTTP status code to 500 (Internal Server Error)
    echo json_encode(['error' => 'Fehler beim Abrufen der Daten: ' . $e->getMessage()]);
}
?>
