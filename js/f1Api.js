const API_URL = "https://api.jolpi.ca/ergast/f1";

async function obtenerTemporada() {
    const respuesta = await fetch(`${API_URL}/current/races/`);
    const datos = await respuesta.json();

    return datos.MRData.RaceTable.Races;
}

async function obtenerProximaCarrera() {
    const respuesta = await fetch(`${API_URL}/current/next/races/`);
    const datos = await respuesta.json();

    return datos.MRData.RaceTable.Races[0] || null;
}

async function obtenerUltimosResultados() {
    const respuesta = await fetch(`${API_URL}/current/last/results/`);
    const datos = await respuesta.json();

    return datos.MRData.RaceTable.Races[0] || null;
}

async function obtenerPilotos() {
    const respuesta = await fetch(`${API_URL}/current/drivers/`);
    const datos = await respuesta.json();

    return datos.MRData.DriverTable.Drivers;
}

async function obtenerEscuderias() {
    const respuesta = await fetch(`${API_URL}/current/constructors/`);
    const datos = await respuesta.json();

    return datos.MRData.ConstructorTable.Constructors;
}

async function obtenerClasificacionPilotos() {
    const respuesta = await fetch(`${API_URL}/current/driverstandings/`);
    const datos = await respuesta.json();

    return datos.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

async function obtenerClasificacionConstructores() {
    const respuesta = await fetch(`${API_URL}/current/constructorstandings/`);
    const datos = await respuesta.json();

    return datos.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
