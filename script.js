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
            // Ruft die initCharts-Funktion auf, die bereits in index.html definiert ist
            initCharts(flickData, xaviData);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Vergleichsdaten:', error);
        });
});
