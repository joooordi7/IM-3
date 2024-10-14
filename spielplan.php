<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FC Barcelona | Spielplan</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="spielplan.js"></script>
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="fc_barcelona_logo.png" alt="FC Barcelona Logo" id="fcbarcelona-logo" />
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="index.php">Der Hansi Flick Effekt</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="spielplan">
            <h2>Unsere kommenden Spiele</h2>
            <div class="table-responsive">
                <table id="calendar">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Gegner</th>
                            <th>Wettbewerb</th>
                            <th>Ort</th>
                            <th>Zeit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Spielplan-Daten werden hier dynamisch eingefügt -->
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Neuer Abschnitt für die Spielerliste -->
        <section id="spielerliste">
            <h2>Kader 2024/2025</h2>
            <div class="table-responsive">
            <table id="players">
    <thead>
        <tr>
            <th>Spieler</th>
            <th>Position</th>
        </tr>
    </thead>
    <tbody>
        <!-- Player rows will be inserted here dynamically by JavaScript -->
    </tbody>
</table>

            </div>
        </section>
    </main>

</body>

<footer>
    <p>&copy; 2024 FC Barcelona | Visça Barça</p>
</footer>

</html>
