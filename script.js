document.addEventListener('DOMContentLoaded', () => {
    // Funktion zum Abrufen von API-Daten
    async function fetchData(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    // Abrufen der Spieldaten von Football-Data API (Team Statistiken)
    fetchData('php/football_data.php').then(data => {
        // Beispiel-Diagramm für Team-Statistiken
        const ctx = document.getElementById('teamStatsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Balkendiagramm für Team-Statistiken
            data: {
                labels: ['Ballbesitz', 'Tore', 'Pässe', 'Torschüsse'],
                datasets: [{
                    label: 'Team-Statistiken',
                    data: [60, 25, 500, 100], // Beispielwerte, ersetze sie durch API-Daten
                    backgroundColor: ['#A50044', '#004D98', '#FFCB00', '#FFFFFF'],
                    borderColor: '#004D98',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                },
                plugins: {
                    legend: { display: true, position: 'top' }
                }
            }
        });
    });

    // Abrufen der Live-Spieldaten von RapidAPI
    fetchData('php/live_data.php').then(data => {
        // Spielplan mit Live-Daten befüllen
        const liveMatches = data.map(match => {
            return `<tr>
                        <td>${new Date(match.start_time).toLocaleDateString()}</td>
                        <td>${match.home_team} vs ${match.away_team}</td>
                        <td>${match.competition}</td>
                        <td>${match.venue ? match.venue : 'Unbekannt'}</td>
                        <td>${new Date(match.start_time).toLocaleTimeString()}</td>
                    </tr>`;
        });
        document.getElementById('matchSchedule').innerHTML = liveMatches.join('');
    });

    // 3D-Diagramm für Spielvorhersagen
    const predictionsCtx = document.getElementById('predictionsChart').getContext('2d');
    new Chart(predictionsCtx, {
        type: 'line', // Liniendiagramm für Spielvorhersagen
        data: {
            labels: ['Spiel 1', 'Spiel 2', 'Spiel 3', 'Spiel 4'],
            datasets: [{
                label: 'Wahrscheinlichkeit für Sieg (%)',
                data: [70, 80, 65, 90], // Beispielwerte (durch API-Daten ersetzen)
                borderColor: '#004D98',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
