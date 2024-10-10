document.addEventListener('DOMContentLoaded', () => {
    const matches = [
        {
            "date": "2024-10-14",
            "opponent": "Real Madrid",
            "competition": "La Liga",
            "location": "Heim",
            "time": "21:00"
        },
        {
            "date": "2024-10-18",
            "opponent": "Sevilla",
            "competition": "La Liga",
            "location": "Auswärts",
            "time": "19:00"
        },
        {
            "date": "2024-10-21",
            "opponent": "Bayern München",
            "competition": "Champions League",
            "location": "Heim",
            "time": "20:45"
        },
        {
            "date": "2024-10-25",
            "opponent": "Villarreal",
            "competition": "La Liga",
            "location": "Heim",
            "time": "18:30"
        },
        {
            "date": "2024-10-30",
            "opponent": "Getafe",
            "competition": "La Liga",
            "location": "Auswärts",
            "time": "17:00"
        },
        {
            "date": "2024-11-03",
            "opponent": "Atletico Madrid",
            "competition": "La Liga",
            "location": "Heim",
            "time": "21:00"
        },
        {
            "date": "2024-11-07",
            "opponent": "Manchester City",
            "competition": "Champions League",
            "location": "Auswärts",
            "time": "20:45"
        },
        {
            "date": "2024-11-11",
            "opponent": "Real Sociedad",
            "competition": "La Liga",
            "location": "Heim",
            "time": "19:00"
        },
        {
            "date": "2024-11-15",
            "opponent": "Real Betis",
            "competition": "La Liga",
            "location": "Auswärts",
            "time": "18:30"
        },
        {
            "date": "2024-11-19",
            "opponent": "PSG",
            "competition": "Champions League",
            "location": "Heim",
            "time": "21:00"
        }
    ];

    const tableBody = document.querySelector('#calendar tbody');
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
});
