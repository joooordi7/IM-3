document.addEventListener('DOMContentLoaded', () => {
    // Spielplan-Daten
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

// Insert match data into the table
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

// Spieler-Daten (2024/2025)
const players = [
    { "name": "Marc-André ter Stegen", "position": "Torwart" },
    { "name": "Iñaki Peña", "position": "Torwart" },
    { "name": "Ronald Araujo", "position": "Innenverteidiger" },
    { "name": "Pau Cubarsí", "position": "Innenverteidiger" },
    { "name": "Andreas Christensen", "position": "Innenverteidiger" },
    { "name": "Eric García", "position": "Innenverteidiger" },
    { "name": "Iñigo Martínez", "position": "Innenverteidiger" },
    { "name": "Alejandro Balde", "position": "Linker Verteidiger" },
    { "name": "Jules Koundé", "position": "Rechter Verteidiger" },
    { "name": "Héctor Fort", "position": "Rechter Verteidiger" },
    { "name": "Marc Casadó", "position": "Defensives Mittelfeld" },
    { "name": "Marc Bernal", "position": "Defensives Mittelfeld" },
    { "name": "Gavi", "position": "Zentrales Mittelfeld" },
    { "name": "Pedri", "position": "Zentrales Mittelfeld" },
    { "name": "Frenkie de Jong", "position": "Zentrales Mittelfeld" },
    { "name": "Fermín López", "position": "Zentrales Mittelfeld" },
    { "name": "Dani Olmo", "position": "Offensives Mittelfeld" },
    { "name": "Pablo Torre", "position": "Offensives Mittelfeld" },
    { "name": "Ansu Fati", "position": "Linksaussen" },
    { "name": "Lamine Yamal", "position": "Rechtsaussen" },
    { "name": "Raphinha", "position": "Rechtsaussen" },
    { "name": "Ferran Torres", "position": "Rechtsaussen" },
    { "name": "Robert Lewandowski", "position": "Mittelstürmer" },
    { "name": "Pau Víctor", "position": "Mittelstürmer" }
];

// Insert player data into the table
const playersTableBody = document.querySelector('#players tbody');
playersTableBody.innerHTML = '';

// Add players in two columns: Spieler - Position
players.forEach(player => {
    const playerRow = `
        <tr>
            <td>${player.name}</td>
            <td>${player.position}</td>
        </tr>
    `;
    playersTableBody.innerHTML += playerRow;
});
});