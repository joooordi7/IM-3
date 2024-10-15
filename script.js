document.addEventListener('DOMContentLoaded', () => {
    // Fetch only Flick's stats dynamically
    fetch('fetch_comparison_stats.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const flickData = data.flick;

            // Static data for Xavi
            const xaviData = {
                'score_home': 45,
                'score_away': 30,
                'win_percentage': 65,
                'ball_possession': 65,
                'shots': 16,
                'shots_on_goal': 7,
                'yellow_cards': 1.5,
                'red_cards': 0.1
            };

            if (!flickData) {
                document.getElementById('error-message').innerText = 'Daten konnten nicht geladen werden.';
                return;
            }

            // Call the function to initialize charts with both Flick and Xavi's data
            initCharts(flickData, xaviData); // Call to charts.js function
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Vergleichsdaten:', error);
            document.getElementById('error-message').innerText = 'Fehler beim Laden der Vergleichsdaten. Bitte versuchen Sie es später erneut.';
        });
});
