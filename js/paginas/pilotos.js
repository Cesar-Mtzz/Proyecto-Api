async function cargarEscuderias() {
    try {
        const escuderias = await obtenerEscuderias();
        const clasificacion = await obtenerClasificacionPilotos();

        const contenedor = document.getElementById("escuderias");

        contenedor.innerHTML = "";

        escuderias.forEach(escuderia => {

            const pilotos = clasificacion.filter(resultado =>
                resultado.Constructors.some(
                    equipo => equipo.constructorId === escuderia.constructorId
                )
            );

            if (pilotos.length === 0) return;

            const nombresPilotos = pilotos.map(resultado =>
                `${resultado.Driver.givenName} ${resultado.Driver.familyName}`
            );

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("piloto");

            tarjeta.innerHTML = `
                <p class="subtitulo pilotoTxt">${escuderia.name}</p>

                <p class="pilotoTxt">Nacionalidad: ${escuderia.nationality}</p>

                <p class="pilotoTxt">
                    Pilotos:
                    ${nombresPilotos.map(nombre => `
                        ${nombre}
                    `).join("-")}
                </p>
            `;

            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error("Error al cargar las escuderías:", error);
    }
}

async function cargarPilotos() {
    try {
        const pilotos = await obtenerPilotos();
        const clasificacion = await obtenerClasificacionPilotos();

        const contenedor = document.getElementById("pilotos");

    pilotos
    .filter(piloto =>
        clasificacion.some(
            resultado => resultado.Driver.driverId === piloto.driverId
        )
    )
    .forEach(piloto => {
        const equipo = clasificacion.find(
            resultado => resultado.Driver.driverId === piloto.driverId
        );

        const nombreEscuderia = equipo?.Constructors[0]?.name || "Sin equipo";

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("piloto");

        tarjeta.innerHTML = `
            <p class="subtitulo pilotoTxt">
                ${piloto.givenName} ${piloto.familyName}
            </p>
            <p class="pilotoTxt">Número: ${piloto.permanentNumber}</p>
            <p class="pilotoTxt">Nacionalidad: ${piloto.nationality}</p>
            <p class="pilotoTxt">Escudería: ${nombreEscuderia}</p>
        `;

        contenedor.appendChild(tarjeta);
    });

    } catch (error) {
        console.error("Error al cargar los pilotos:", error);
    }
}

cargarEscuderias();
cargarPilotos();
