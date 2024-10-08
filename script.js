document.addEventListener('DOMContentLoaded', () => {
    // Teamstatistik-Diagramm
    const teamStatsChartCanvas = document.getElementById('teamStatsChart').getContext('2d');

    const teamStatsData = {
        labels: ['Tore', 'Vorlagen', 'Ballbesitz (%)', 'Schüsse aufs Tor', 'Pässe', 'Zweikämpfe gewonnen'],
        datasets: [{
            label: 'Teamstatistiken unter Hansi Flick',
            data: [65, 40, 68, 120, 600, 150],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const teamStatsOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    new Chart(teamStatsChartCanvas, {
        type: 'bar',  // Typ des Diagramms (Bar chart)
        data: teamStatsData,
        options: teamStatsOptions
    });

    // Beispiel für den Vergleich (Vergleichsseite: Hansi Flick vs. Xavi)
    const winPercentageChartCanvas = document.getElementById('winPercentageChart')?.getContext('2d');
    const goalsScoredChartCanvas = document.getElementById('goalsScoredChart')?.getContext('2d');

    if (winPercentageChartCanvas) {
        const winPercentageData = {
            labels: ['Hansi Flick', 'Xavi'],
            datasets: [{
                label: 'Siegquote (%)',
                data: [70, 65], // Beispiel-Daten für den Vergleich
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        };

        new Chart(winPercentageChartCanvas, {
            type: 'pie',
            data: winPercentageData
        });
    }

    if (goalsScoredChartCanvas) {
        const goalsScoredData = {
            labels: ['Hansi Flick', 'Xavi'],
            datasets: [{
                label: 'Erzielte Tore',
                data: [90, 85], // Beispiel-Daten
                backgroundColor: [
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        new Chart(goalsScoredChartCanvas, {
            type: 'bar',
            data: goalsScoredData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
