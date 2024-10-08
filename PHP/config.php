<?php
// 1. Verbindung zur lokalen Datenbank
$servername_local = "localhost";
$username_local = "barcelona@etl.mmp.li";
$password_local = "0qTZt1VFTy87R%$#";
$dbname_local = "benhan51_etl";

// Verbindung zur lokalen Datenbank herstellen
$conn_local = new mysqli($servername_local, $username_local, $password_local, $dbname_local);

// Verbindung überprüfen
if ($conn_local->connect_error) {
    die("Verbindung zur lokalen Datenbank fehlgeschlagen: " . $conn_local->connect_error);
} else {
    echo "Erfolgreich mit der lokalen Datenbank verbunden.<br>";
}

// 2. Verbindung zur externen Datenbank
$host = 'etl.benhan51.dbs.hostpoint.internal';
$dbname = 'benhan51_etl';
$username = 'benhan51_etl';
$password = 'MMP2024_fhgr_etl_zuerich';

// DSN (Datenquellenname) für PDO
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";

// Optionen für PDO
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Aktiviert die Ausnahmebehandlung für Datenbankfehler
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Setzt den Standard-Abrufmodus auf assoziatives Array
    PDO::ATTR_EMULATE_PREPARES => false, // Deaktiviert die Emulation vorbereiteter Anweisungen
];

// Verbindung zur externen Datenbank herstellen
try {
    $pdo = new PDO($dsn, $username, $password, $options);
    echo "Erfolgreich mit der externen Datenbank verbunden.";
} catch (PDOException $e) {
    die("Verbindung zur externen Datenbank fehlgeschlagen: " . $e->getMessage());
}
?>
