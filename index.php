<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hansi Flick Effekt | FC Barcelona</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script defer src="script.js"></script> <!-- Fetching data handled in script.js -->
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="images/fc_barcelona_logo.png" alt="FC Barcelona Logo" id="fcbarcelona-logo" />
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="spielplan.php">Spielplan und Kader</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Der Hansi Flick Effekt</h1>
        <section id="introduction">
            <p>Diese Webseite vergleicht die Leistungen des FC Barcelona unter Hansi Flick und Xavi anhand von wichtigen Statistiken wie Siegquote, Tore, Ballbesitz und Schüsse. Anhand von Diagrammen werden die unterschiedlichen Spielweisen der beiden Trainer veranschaulicht. Während Hansi Flick für schnelles Umschaltspiel und Effizienz steht, setzt Xavi auf den klassischen Ballbesitzfußball des FC Barcelona. Die Statistiken zu offensiven und defensiven Aspekten sowie Disziplinarfaktoren wie gelbe und rote Karten geben Einblick in die jeweilige Teamdynamik.</p>
        </section>

        <section id="vergleich">
            <div id="vergleich-container">
                <h2>Siegquote (%)</h2>
                <div class="chart-container">
                    <canvas id="winPercentageChart"></canvas>
                </div>
                
                <h2>Erzielte Tore</h2>
                <div class="chart-container">
                    <canvas id="goalsScoredChart"></canvas>
                </div>

                <h2>Taktik: Ballbesitz, Schüsse und Karten</h2>
                <div class="chart-container">
                    <canvas id="tacticsChart"></canvas>
                </div>
            </div>
        </section>

        <p id="error-message" style="color: red;"></p>
    </main>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Fetch only Flick's stats dynamically
            fetch('fetch_comparison_stats.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    const flickData = data.flick;

                    // Static data for Xavi
                    const xaviData = {
                        'score_home': 45,
                        'score_away': 30,
                        'win_percentage': 65,
                        'ball_possession': 65,
                        'shots': 16,
                        'shots_on_goal': 7,
                        'yellow_cards': 1.5,
                        'red_cards': 0.1
                    };

                    if (!flickData) {
                        document.getElementById('error-message').innerText = 'Daten konnten nicht geladen werden.';
                        return;
                    }

                    // Initialize charts with both Flick and Xavi's data
                    initCharts(flickData, xaviData);
                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der Vergleichsdaten:', error);
                    document.getElementById('error-message').innerText = 'Fehler beim Laden der Vergleichsdaten. Bitte versuchen Sie es später erneut.';
                });
        });

        function initCharts(flickData, xaviData) {
            // Siegquote Diagramm
            const winPercentageChartCanvas = document.getElementById('winPercentageChart').getContext('2d');
            new Chart(winPercentageChartCanvas, {
                type: 'pie',
                data: {
                    labels: ['Hansi Flick', 'Xavi'],
                    datasets: [{
                        label: 'Siegquote (%)',
                        data: [
                            (flickData.wins / flickData.games_played) * 100,
                            xaviData.win_percentage
                        ],
                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Erzielte Tore Diagramm
            const goalsScoredChartCanvas = document.getElementById('goalsScoredChart').getContext('2d');
            new Chart(goalsScoredChartCanvas, {
                type: 'bar',
                data: {
                    labels: ['Hansi Flick', 'Xavi'],
                    datasets: [{
                        label: 'Erzielte Tore',
                        data: [
                            flickData.score_home + flickData.score_away,
                            xaviData.score_home + xaviData.score_away
                        ],
                        backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Taktik-Diagramm
            const tacticsChartCanvas = document.getElementById('tacticsChart').getContext('2d');
            const tacticsData = {
                labels: ['Ballbesitz', 'Schüsse', 'Schüsse auf Tor', 'Gelbe Karten', 'Rote Karten'],
                datasets: [{
                    label: 'Hansi Flick',
                    data: [
                        flickData.ball_possession,
                        flickData.shots,
                        flickData.shots_on_goal,
                        flickData.yellow_cards,
                        flickData.red_cards
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Xavi',
                    data: [
                        xaviData.ball_possession,
                        xaviData.shots,
                        xaviData.shots_on_goal,
                        xaviData.yellow_cards,
                        xaviData.red_cards
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            };

            new Chart(tacticsChartCanvas, {
                type: 'radar',
                data: tacticsData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    </script>

</body>

<footer>
    <p>&copy; 2024 FC Barcelona | Spielplan und Statistiken</p>
</footer>

</html>
