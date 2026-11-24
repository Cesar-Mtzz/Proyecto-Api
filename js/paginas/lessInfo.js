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

async function cargarFullCalendario() {
    try {
        const carreras = await obtenerTemporada();
        const contenedor = document.getElementById("calendario2");

        const hoy = new Date();

        // Obtener el día de la semana (domingo = 0, lunes = 1...)
        const dia = hoy.getDay();

        // Calcular el lunes
        const lunes = new Date(hoy);
        lunes.setDate(hoy.getDate() - (dia === 0 ? 6 : dia - 1));
            lunes;

        // Calcular el domingo
        const domingo = new Date(lunes);
        domingo.setDate(lunes.getDate() + 6);
            domingo;

        carreras.forEach(carrera => {
            const fecha = new Date(`${carrera.date}T00:00:00`);

            let estado = "";
            var textoEstado = "- Actual";
            var textoEstadoColor = "var(--color-fuente)";

            if (fecha < hoy) {
                estado = "completada";
                textoEstado = "- Completada";
                textoEstadoColor = "var(--color-verde)";
            } else if ( fecha <= domingo && fecha >= lunes ){
                estado = "actual";
            } else {
                estado = "proxima";
                textoEstado = "- Siguiente";
                textoEstadoColor = "var(--color-acento)";
            }

            const tarjeta = document.createElement("div");
            tarjeta.className = `ronda ${estado}`;

            tarjeta.innerHTML = `
                <p class="rondaTxt" style="color: ${textoEstadoColor};">Ronda ${carrera.round} ${textoEstado}</p>
                <p class="subtitulo">${carrera.raceName}</p>
                <p class="rondaTxt">
                    ${fecha.toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                </p>
                <p class="rondaTxt">
                    ${carrera.Circuit.circuitName}
                </p>
            `;

            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error("Error al cargar el calendario:", error);
    }
}

function mostrarCompletadas() {
    const checkbox = document.getElementById("mostrarCompletadas");
    const tarjetas = document.querySelectorAll("completada");

    tarjetas.forEach(tarjeta => {
        tarjeta.classList.toggle("vistaCompleta", checkbox.checked);
    });
}

cargarCalendario();
cargarPosiciones();
cargarFullCalendario();
