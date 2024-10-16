// Statische Daten für Xavi
const XaviStats = {
    totalWins: 4,
    totalShots: 121,
    totalGoals: 11,
    ballPossession: 65,
    yellowCards: 17
};

// Funktion zum Abrufen der Daten aus PHP-Dateien
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fehler beim Abrufen der Daten von ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        document.getElementById('error-message').innerText = 'Fehler beim Laden der Daten.';
    }
}

// Funktion zum Laden und Anzeigen der Matchdaten
async function loadMatchData() {
    try {
        // Abrufen der Daten von PHP-Dateien (FlickStats)
        const FlickStats = {
            totalWins: (await fetchData('count_winner.php')).total_wins,
            totalShots: (await fetchData('shots.php')).total_shots,
            totalGoals: (await fetchData('goals_scored.php')).total_goals,
            ballPossession: (await fetchData('ball_possession.php')).avg_ball_possession,
            yellowCards: (await fetchData('yellow_cards.php')).total_yellow_cards
        };

        // Daten anzeigen (optional, falls gewünscht)
        document.getElementById('ball-possession').innerText = `Durchschnittlicher Ballbesitz: ${FlickStats.ballPossession.toFixed(2)}%`;
        document.getElementById('total-wins').innerText = `Gesamte Siege: ${FlickStats.totalWins}`;
        document.getElementById('total-goals').innerText = `Erzielte Tore: ${FlickStats.totalGoals}`;
        document.getElementById('total-shots').innerText = `Gesamte Schüsse: ${FlickStats.totalShots}`;
        document.getElementById('yellow-cards').innerText = `Gelbe Karten: ${FlickStats.yellowCards}`;

        // Diagramme aktualisieren
        updateWinsChart(FlickStats, XaviStats);
        updateShotsGoalsChart(FlickStats, XaviStats);
        updatePossessionYellowCardsChart(FlickStats, XaviStats);

    } catch (error) {
        console.error("Fehler beim Laden der Spieldaten:", error);
        document.getElementById('error-message').innerText = 'Fehler beim Laden der Spieldaten.';
    }
}

// Funktion zum Aktualisieren des Liniendiagramms für totalWins pro Spieltag mit den angegebenen Siegen
function updateWinsChart(FlickStats, XaviStats) {
    const ctx = document.getElementById('winsChart').getContext('2d');

    // Spieltage als Labels
    const matchDays = ['Spieltag 1', 'Spieltag 2', 'Spieltag 3', 'Spieltag 4', 'Spieltag 5', 'Spieltag 6', 'Spieltag 7', 'Spieltag 8', 'Spieltag 9'];

    // Siege für Flick und Xavi an den jeweiligen Spieltagen (kumulative Anzahl der Siege)
    const flickWinsPerMatchDay = [1, 2, 3, 4, 5, 6, 7, 7, 8]; // Kumulierte Siege
    const xaviWinsPerMatchDay = [1, 1, 2, 2, 2, 2, 3, 3, 4];  // Kumulierte Siege

    // Funktion zur Berechnung des Gewinnprozentsatzes nach jedem Spieltag
    const calculateWinPercentage = (winsArray) => {
        return winsArray.map((totalWins, index) => {
            const gamesPlayed = index + 1; // Anzahl der gespielten Spiele bis zu diesem Spieltag
            return (totalWins / gamesPlayed) * 100; // Gewinnprozentsatz für den jeweiligen Spieltag
        });
    };

    // Gewinnprozentsatz für Flick und Xavi
    const flickWinPercentages = calculateWinPercentage(flickWinsPerMatchDay);
    const xaviWinPercentages = calculateWinPercentage(xaviWinsPerMatchDay);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: matchDays, // Zeigt die Spieltage auf der X-Achse
            datasets: [{
                label: 'Flick Siege',
                data: flickWinsPerMatchDay,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }, {
                label: 'Xavi Siege',
                data: xaviWinsPerMatchDay,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            // Berechnung des Gewinnprozentsatzes für die Tooltip-Anzeige
                            const index = tooltipItem.dataIndex;
                            const datasetLabel = tooltipItem.dataset.label;
                            const percentage = datasetLabel === 'Flick Siege' 
                                ? flickWinPercentages[index]
                                : xaviWinPercentages[index];
                            return `Gewinnprozentsatz: ${percentage.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 9, // Setzt das Maximum der Y-Achse auf 9
                    title: {
                        display: true,
                        text: 'Anzahl Siege'
                    },
                    ticks: {
                        stepSize: 1 // Siege können nur ganze Zahlen sein
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Spieltage'
                    }
                }
            }
        }
    });
}


// Funktion zum Aktualisieren des Balkendiagramms für totalShots vs totalGoals
function updateShotsGoalsChart(FlickStats, XaviStats) {
    const ctx = document.getElementById('shotsGoalsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Schüsse', 'Tore'], // Zwei Labels für Schüsse und Tore
            datasets: [{
                label: 'Flick',
                data: [FlickStats.totalShots, FlickStats.totalGoals], // Schüsse und Tore von Flick
                backgroundColor: 'rgba(144, 238, 144, 1)'
            }, {
                label: 'Xavi',
                data: [XaviStats.totalShots, XaviStats.totalGoals], // Schüsse und Tore von Xavi
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // Rote Farbe für Xavi
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true, // Startet die Y-Achse bei 0
                    title: {
                        display: true,
                        text: 'Anzahl', // Y-Achsenbeschriftung
                        font: {
                            size: 16, // Schriftgröße
                            weight: 'bold' // Schriftstil fett
                        }
                    },
                    ticks: {
                        font: {
                            size: 14, // Schriftgröße der Werte auf der Y-Achse
                            weight: 'bold' // Schriftstil fett für die Werte
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Schüsse und Tore', // X-Achsenbeschriftung
                        font: {
                            size: 16, // Schriftgröße
                            weight: 'bold' // Schriftstil fett
                        }
                    },
                    ticks: {
                        font: {
                            size: 14, // Schriftgröße der Werte auf der X-Achse
                        }
                    }
                }
            },
            layout: {
                padding: {
                    left: 20, // Padding links
                    right: 20, // Padding rechts
                    top: 20, // Padding oben
                    bottom: 30 // Padding unten
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#000', // Schwarze Schriftfarbe für die Legende
                        font: {
                            size: 14, // Schriftgröße der Legende
                            weight: 'bold' // Fettgedruckte Legende
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        // Entfernt das farbige Kästchen komplett
                        label: function(tooltipItem) {
                            const datasetLabel = tooltipItem.dataset.label || '';
                            const value = tooltipItem.raw;
                            return datasetLabel + ': ' + value;
                        },
                        labelColor: function() {
                            return {
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                borderColor: 'rgba(0, 0, 0, 0)'
                            };
                        }
                    }
                }
            }
        }
    });
}



// Funktion zum Aktualisieren der Kreisdiagramme für ballPossession und yellowCards
function updatePossessionYellowCardsChart(FlickStats, XaviStats) {
    const possessionCtx = document.getElementById('possessionChart').getContext('2d');
    new Chart(possessionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Flick Ballbesitz', 'Xavi Ballbesitz'],
            datasets: [{
                data: [FlickStats.ballPossession, XaviStats.ballPossession],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)']
            }]
        }
    });

    const yellowCardsCtx = document.getElementById('yellowCardsChart').getContext('2d');
    new Chart(yellowCardsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Flick Gelbe Karten', 'Xavi Gelbe Karten'],
            datasets: [{
                data: [FlickStats.yellowCards, XaviStats.yellowCards],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)']
            }]
        }
    });
}

// Startet die Datenladung beim Laden der Seite
window.onload = loadMatchData;
