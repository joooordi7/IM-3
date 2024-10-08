<?php
// Datenbankverbindungsdetails
$servername = "localhost";  // Servername (normalerweise "localhost")
$username = "dein_db_username";  // Dein MySQL-Benutzername
$password = "dein_db_passwort";  // Dein MySQL-Passwort
$dbname = "dein_db_name";  // Der Name deiner Datenbank

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}
?>
