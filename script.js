document.addEventListener('DOMContentLoaded', () => {
    // Siegquote-Diagramm
    const winPercentageChartCanvas = document.getElementById('winPercentageChart').getContext('2d');
    const winPercentageData = {
        labels: ['Hansi Flick', 'Xavi'],
        datasets: [{
            label: 'Siegquote (%)',
            data: [70, 65],  // Beispiel-Daten für den Vergleich
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    };
    new Chart(winPercentageChartCanvas, {
        type: 'pie',
        data: winPercentageData,
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

    // Erzielte Tore-Diagramm
    const goalsScoredChartCanvas = document.getElementById('goalsScoredChart').getContext('2d');
    const goalsScoredData = {
        labels: ['Hansi Flick', 'Xavi'],
        datasets: [{
            label: 'Erzielte Tore',
            data: [90, 85],  // Beispiel-Daten für den Vergleich
            backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
        }]
    };
    new Chart(goalsScoredChartCanvas, {
        type: 'bar',
        data: goalsScoredData,
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

    // Taktik-Diagramm: Vergleich Pressing und Formation
    const tacticsChartCanvas = document.getElementById('tacticsChart').getContext('2d');
    const tacticsData = {
        labels: ['Pressing Intensität', 'Formation Flexibilität', 'Ballbesitz', 'Konterspiel'],
        datasets: [{
            label: 'Hansi Flick',
            data: [80, 70, 65, 75],  // Beispielwerte für Flick
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: 'Xavi',
            data: [65, 60, 75, 60],  // Beispielwerte für Xavi
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
});
