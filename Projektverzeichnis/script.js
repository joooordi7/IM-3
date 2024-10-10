document.addEventListener('DOMContentLoaded', () => {
    const flickData = {
        win_percentage: 60,
        goals_home: 1.9,
        goals_away: 2.0,
        ball_possession: 67.7,
        shots: 17.3,
        shots_on_goal: 7.2,
        yellow_cards: 1.4,
        red_cards: 0.1
    };

    const xaviData = {
        win_percentage: 65,
        goals_home: 2.41,
        goals_away: 1.59,
        ball_possession: 62,
        shots: 16.18,
        shots_on_goal: 5.64,
        yellow_cards: 1.78,
        red_cards: 0.14
    };

    initCharts(flickData, xaviData);

    const matches = [
        { date: "2024-10-14", opponent: "Real Madrid", competition: "La Liga", location: "Heim", time: "21:00" },
        { date: "2024-10-18", opponent: "Sevilla", competition: "La Liga", location: "Auswärts", time: "19:00" },
        { date: "2024-10-21", opponent: "Bayern München", competition: "Champions League", location: "Heim", time: "20:45" },
        { date: "2024-10-25", opponent: "Villarreal", competition: "La Liga", location: "Heim", time: "18:30" },
        { date: "2024-10-30", opponent: "Getafe", competition: "La Liga", location: "Auswärts", time: "17:00" },
        { date: "2024-11-03", opponent: "Atletico Madrid", competition: "La Liga", location: "Heim", time: "21:00" },
        { date: "2024-11-07", opponent: "Manchester City", competition: "Champions League", location: "Auswärts", time: "20:45" },
        { date: "2024-11-11", opponent: "Real Sociedad", competition: "La Liga", location: "Heim", time: "19:00" },
        { date: "2024-11-15", opponent: "Real Betis", competition: "La Liga", location: "Auswärts", time: "18:30" },
        { date: "2024-11-19", opponent: "PSG", competition: "Champions League", location: "Heim", time: "21:00" }
    ];

    const tableBody = document.querySelector('#calendar tbody');
    if (tableBody) {
        tableBody.innerHTML = '';
        matches.forEach(match => {
            const row = `
                <tr>
                    <td>${new Date(match.date).toLocaleDateString('de-DE')}</td>
                    <td>${match.opponent}</td>
                    <td>${match.competition}</td>
                    <td>${match.location}</td>
                    <td>${match.time}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } else {
        console.error('Tabelle für Match-Daten nicht gefunden.');
    }
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
                    flickData.win_percentage,
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
                label: 'Durchschnittliche Tore (Heim + Auswärts)',
                data: [
                    flickData.goals_home + flickData.goals_away,
                    xaviData.goals_home + xaviData.goals_away
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
