document.addEventListener('DOMContentLoaded', () => {
    // Daten dynamisch von der PHP-Datei abrufen (Vergleichsdaten Hansi Flick und Xavi)
    fetch('etl/fetch_comparison_stats.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Initialisiere Diagramme mit den abgerufenen Daten
            const flickData = data.flick;
            const xaviData = data.xavi;
            initCharts(flickData, xaviData);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Vergleichsdaten:', error);
        });

    // Dynamischer Abruf der Spiele
    fetch('etl/fetch_matches.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(matches => {
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
        })
        .catch(error => {
            console.error('Fehler beim Laden der Match-Daten:', error);
        });
});

function initCharts(flickData, xaviData) {
    // Hier kommt der Code zur Initialisierung deiner Diagramme hin
    // Z.B. Pie, Bar oder Radar Charts mit Chart.js oder einer anderen Library
}
