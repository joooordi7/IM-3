document.addEventListener('DOMContentLoaded', () => {
    const matches = [
        {
            "date": "2024-10-20",
            "opponent": "Sevilla",
            "competition": "La Liga",
            "location": "Heim",
            "time": "21:00"
        },
        {
            "date": "2024-10-23",
            "opponent": "Bayern München",
            "competition": "Champions League",
            "location": "Heim",
            "time": "21:00"
        },
        {
            "date": "2024-10-27",
            "opponent": "Real Madrid",
            "competition": "La Liga",
            "location": "Auswärts",
            "time": "21:00"
        },
        {
            "date": "2024-11-03",
            "opponent": "Espanyol",
            "competition": "La Liga",
            "location": "Heim",
            "time": "16:15"
        },
        {
            "date": "2024-11-06",
            "opponent": "Roter Stern Belgrad",
            "competition": "Champions League",
            "location": "Auswärts",
            "time": "21:00"
        },
        {
            "date": "2024-11-10",
            "opponent": "Real Sociedad",
            "competition": "La Liga",
            "location": "Auswärts",
            "time": "21:00"
        },
        {
            "date": "2024-11-24",
            "opponent": "Celta Vigo",
            "competition": "La Liga",
            "location": "Auswärts",
            "time": "TBA"
        },
        {
            "date": "2024-11-26",
            "opponent": "Stade Brest",
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
