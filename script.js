document.addEventListener('DOMContentLoaded', () => {
    // Fetch Hansi Flick's data from the PHP file
    fetch('fetch_comparison_stats.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Fetch Hansi Flick's data
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

            // Call the function to initialize charts with both data sets
            initCharts(flickData, xaviData);
        })
        .catch(error => {
            console.error('Error fetching the comparison data:', error);
        });
});
