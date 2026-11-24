async function cargarCalendario() {
    try {
        const carreras = await obtenerTemporada();
        const contenedor = document.getElementById("calendario");

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
