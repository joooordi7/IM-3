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

    // Team-Statistiken Übersicht (Beispiel-Daten)
    const ctx = document.getElementById('teamStatsOverviewChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Balkendiagramm
        data: {
            labels: ['Ballbesitz', 'Tore', 'Pässe', 'Torschüsse'],
            datasets: [{
                label: 'Team-Statistiken',
                data: [60, 25, 500, 100], // Beispielwerte, können durch API-Daten ersetzt werden
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

    // Team-Statistiken Seite (ausführliches Diagramm)
    const teamStatsCtx = document.getElementById('teamStatsChart');
    if (teamStatsCtx) {
        new Chart(teamStatsCtx.getContext('2d'), {
            type: 'line', // Liniendiagramm für detaillierte Team-Statistiken
            data: {
                labels: ['Spiel 1', 'Spiel 2', 'Spiel 3', 'Spiel 4'],
                datasets: [{
                    label: 'Tore',
                    data: [2, 3, 1, 4], // Beispielwerte
                    borderColor: '#004D98',
                    backgroundColor: 'rgba(0, 77, 152, 0.5)',
                    fill: true
                }, {
                    label: 'Ballbesitz (%)',
                    data: [55, 60, 52, 58], // Beispielwerte
                    borderColor: '#A50044',
                    backgroundColor: 'rgba(165, 0, 68, 0.5)',
                    fill: true
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
    }

    // Spielvorhersagen Seite
    const predictionsCtx = document.getElementById('predictionsChart');
    if (predictionsCtx) {
        new Chart(predictionsCtx.getContext('2d'), {
            type: 'pie', // Tortendiagramm für Spielvorhersagen
            data: {
                labels: ['Sieg', 'Unentschieden', 'Niederlage'],
                datasets: [{
                    label: 'Vorhersage Wahrscheinlichkeiten',
                    data: [70, 20, 10], // Beispielwerte
                    backgroundColor: ['#004D98', '#FFCB00', '#A50044']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                }
            }
        });
    }

    // Spielplan Tabelle (Beispiel-Daten)
    const matchSchedule = document.getElementById('calendar');
    if (matchSchedule) {
        fetchData('api/spielplan.json') // Beispiel-API-Aufruf, ersetze durch die echte API
            .then(data => {
                const tableBody = matchSchedule.querySelector('tbody');
                data.matches.forEach(match => {
                    const row = `<tr>
                        <td>${new Date(match.date).toLocaleDateString()}</td>
                        <td>${match.opponent}</td>
                        <td>${match.competition}</td>
                        <td>${match.location}</td>
                        <td>${new Date(match.date).toLocaleTimeString()}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch(error => console.error('Fehler beim Laden des Spielplans:', error));
    }

});
