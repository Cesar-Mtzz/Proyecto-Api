async function cargarPosicionesPilotos() {
    try {
        const clasificacion = await obtenerClasificacionPilotos();

        const conPuntos = document.getElementById("conPuntos");
        const sinPuntos = document.getElementById("sinPuntos");

        conPuntos.innerHTML = `
            <div class="pilotos">
                <p>#</p>
                <p>Piloto</p>
                <p>Escuderia</p>
                <p>Puntos</p>
            </div>
        `;

        sinPuntos.innerHTML = "";

        // Ordenar de mayor a menor puntuación
        clasificacion.sort((a, b) =>
            parseFloat(b.points) - parseFloat(a.points)
        );

        clasificacion.forEach((resultado, indice) => {
            const piloto = resultado.Driver;
            const escuderia = resultado.Constructors[0];
            const tienePuntos = parseFloat(resultado.points) > 0;

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("pilotos");

            tarjeta.innerHTML = `
                <p>${indice + 1}</p>
                <p>${piloto.givenName} ${piloto.familyName}</p>
                <p>${escuderia.name}</p>
                <p>${resultado.points}</p>
            `;

            if (tienePuntos) {
                conPuntos.appendChild(tarjeta);
            } else {
                sinPuntos.appendChild(tarjeta);
            }
        });

    } catch (error) {
        console.error("Error al cargar los standings:", error);
    }
}

async function cargarPosicionesConstructores() {
    try {
        const clasificacion = await obtenerClasificacionConstructores();

        const conPuntos = document.getElementById("constructoresConPuntos");
        const sinPuntos = document.getElementById("constructoresSinPuntos");

        conPuntos.innerHTML = `
            <div class="pilotos">
                <p>#</p>
                <p>Escudería</p>
                <p>Nacionalidad</p>
                <p>Puntos</p>
            </div>
        `;

        sinPuntos.innerHTML = "";

        // Ordenar de mayor a menor puntuación
        clasificacion.sort((a, b) =>
            parseFloat(b.points) - parseFloat(a.points)
        );

        clasificacion.forEach((resultado, indice) => {
            const escuderia = resultado.Constructor;
            const tienePuntos = parseFloat(resultado.points) > 0;

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("pilotos");

            tarjeta.innerHTML = `
                <p>${indice + 1}</p>
                <p>${escuderia.name}</p>
                <p>${escuderia.nationality}</p>
                <p>${resultado.points}</p>
            `;

            if (tienePuntos) {
                conPuntos.appendChild(tarjeta);
            } else {
                sinPuntos.appendChild(tarjeta);
            }
        });

    } catch (error) {
        console.error("Error al cargar los standings de constructores:", error);
    }
}

cargarPosicionesConstructores();
cargarPosicionesPilotos();
