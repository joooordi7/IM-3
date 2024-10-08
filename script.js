document.addEventListener('DOMContentLoaded', () => {
    // Vergleichsdaten zwischen Hansi Flick und Xavi dynamisch laden
    Promise.all([
        fetch('fetch_comparison_stats.php'), // Fetch für Flick-Daten
        fetch('xavi_stats.json') // Fetch für die Xavi-Daten aus der JSON-Datei
    ])
    .then(responses => Promise.all(responses.map(response => {
        // Überprüfen, ob die Antwort OK ist
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok: ' + response.statusText);
        }
        return response.json();
    })))
    .then(data => {
        const flickData = data[0]; // Daten für Hansi Flick
        const xaviData = data[1]; // Daten für Xavi aus der JSON-Datei

        // Konsolenausgaben zur Überprüfung der Daten
        console.log('Flick Daten:', flickData);
        console.log('Xavi Daten:', xaviData);

        // Siegquote Diagramm
        const winPercentageChartCanvas = document.getElementById('winPercentageChart').getContext('2d');
        new Chart(winPercentageChartCanvas, {
            type: 'pie',
            data: {
                labels: ['Hansi Flick', 'Xavi'],
                datasets: [{
                    label: 'Siegquote (%)',
                    data: [flickData.win_percentage, (xaviData.wins / (xaviData.wins + (xaviData.losses || 1))) * 100], // Xavi-Win-Percentage
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
                    data: [flickData.goals, xaviData.score_home + xaviData.score_away], // Xavi-Tore
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
                data: [flickData.ball_possession, flickData.shots, flickData.shots_on_goal, flickData.yellow_cards, flickData.red_cards],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Xavi',
                data: [xaviData.ball_possession, xaviData.shots, xaviData.shots_on_goal, xaviData.yellow_cards, xaviData.red_cards],
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
                scale: {
                    ticks: {
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
    })
    .catch(error => {
        console.error('Fehler beim Abrufen der Vergleichsdaten:', error);
        document.getElementById('error-message').innerText = 'Fehler beim Laden der Vergleichsdaten. Bitte versuchen Sie es später erneut.';
    });
});
