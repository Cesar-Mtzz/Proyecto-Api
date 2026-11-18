async function cargarCalendario() {
    try {
        const carreras = await obtenerTemporada();
        const proxima = await obtenerProximaCarrera();

        // Mostrar temporada
        document.getElementById("temporada").textContent =
            carreras[0].season;

        // Mostrar próxima carrera
        if (proxima) {
            document.getElementById("premioTitulo").textContent =
                proxima.raceName;

            document.getElementById("circuitoConFecha").textContent =
                `${proxima.Circuit.circuitName} - ${proxima.date}`;
        } else {
            document.getElementById("premioTitulo").textContent =
                "No hay próximas carreras";

            document.getElementById("circuitoConFecha").textContent = "";
        }

    } catch (error) {
        console.error("Error al cargar el calendario:", error);
    }
}

async function cargarPosiciones() {
    try {
        const carrera = await obtenerUltimosResultados();

        const titulo = document.getElementById("resultadosUltimaCarrera");
        const contenedor = document.getElementById("conPuntos");
        const contenedor2 = document.getElementById("sinPuntos");

        if (!carrera || !titulo || !contenedor) {
            contenedor.innerHTML = "<p>No se encontró la información o los elementos HTML.</p>";
            return;
        }

        titulo.textContent = "Ultima carrera " + carrera.raceName + " :";

        // Pilotos que consiguieron puntos
        carrera.Results
            .filter(resultado => parseFloat(resultado.points) > 0)
            .forEach(resultado => {
                const tarjeta = document.createElement("div");

                tarjeta.classList.add("pilotos");

                tarjeta.innerHTML = `
                    <p>${resultado.position} -
                        ${resultado.Driver.givenName}
                        ${resultado.Driver.familyName}
                    </p>
                    <p>${resultado.points} pts</p>
                `;

                contenedor.appendChild(tarjeta);
            });

        // Pilotos que no consiguieron puntos
        carrera.Results
            .filter(resultado => parseFloat(resultado.points) <= 0)
            .forEach(resultado => {
                const tarjeta = document.createElement("div");

                tarjeta.classList.add("pilotos");

                tarjeta.innerHTML = `
                    <p>${resultado.position} -
                        ${resultado.Driver.givenName}
                        ${resultado.Driver.familyName}
                    </p>
                    <p>${resultado.points} pts</p>
                `;

                contenedor2.appendChild(tarjeta);
            });

    } catch (error) {
        console.error("Error al cargar las posiciones:", error);
    }
}

cargarCalendario();
cargarPosiciones();
