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
