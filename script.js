document.addEventListener('DOMContentLoaded', () => {
    // Funktion zum Abrufen von API-Daten
    async function fetchData(apiUrl, headers) {
        try {
            const response = await fetch(apiUrl, { headers });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    // Beispiel für den Abruf von Football-Data API
    fetchData('php/football_data.php').then(data => {
        // Beispiel-Diagramm mit den abgerufenen Daten von Football-Data API
        const ctx = document.getElementById('teamStatsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar3d', // Verwende den 3D-Balkendiagrammtyp
            data: {
                labels: ['Ballbesitz', 'Tore', 'Pässe', 'Torschüsse'],
                datasets: [{
                    label: 'Team-Statistiken',
                    data: [60, 25, 500, 100], // Beispielwerte, die durch API-Daten ersetzt werden können
                    backgroundColor: ['#A50044', '#004D98', '#FFCB00', '#FFFFFF'],
                    borderColor: '#004D98',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    z: { beginAtZero: true }
                },
                plugins: {
                    legend: { display: true, position: 'top' }
                }
            }
        });
    });

    // Beispiel für den Abruf von Live-Spielen über RapidAPI
    fetchData('php/live_data.php').then(data => {
        const liveMatches = data.map(match => {
            return `<div class="match-card">
                        <h3>${match.home_team} vs ${match.away_team}</h3>
                        <p>Status: ${match.status}</p>
                        <p>Datum: ${new Date(match.date).toLocaleDateString()}</p>
                    </div>`;
        });
        document.getElementById('matchSchedule').innerHTML = liveMatches.join('');
    });

    // 3D-Diagramm für Spielvorhersagen
    const predictionsCtx = document.getElementById('predictionsChart').getContext('2d');
    new Chart(predictionsCtx, {
        type: 'line3d', // Verwende den 3D-Liniendiagrammtyp
        data: {
            labels: ['Spiel 1', 'Spiel 2', 'Spiel 3', 'Spiel 4'],
            datasets: [{
                label: 'Wahrscheinlichkeit für Sieg (%)',
                data: [70, 80, 65, 90], // Beispielwerte, die durch API-Daten ersetzt werden können
                borderColor: '#004D98',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                z: { beginAtZero: true }
            }
        }
    });
});
