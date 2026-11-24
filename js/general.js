function cerrarSesion() {
    sessionStorage.removeItem("sesionActiva");
    window.location.href = "../index.html";
}

function toggleContenidoExtra() {
    const user = JSON.parse(localStorage.getItem("registrado"));

    user.mostrarTodo = !user.mostrarTodo;

    localStorage.setItem("registrado", JSON.stringify(user));

    if (user.mostrarTodo) {
        window.location.href = "./lessInfo.html";
    } else {
        window.location.href = "./home.html"
    }

}

function mostrarNombre() {
    const session = JSON.parse(sessionStorage.getItem("sesionActiva"));

    if (session) {
        document.getElementById("showName").textContent = "Hola, " + session.nombre;
    }
}

function mostrarAjustes() {
    document.getElementById("menuFlotante").classList.toggle("activo");
    const btnContenido = document.getElementById("botonContenido");
    const user = JSON.parse(localStorage.getItem("registrado"));

    if ( user.mostrarTodo ){
        btnContenido.textContent = "Mostrar todo el contenido";
    } else {
        btnContenido.textContent = "Mostrar menos contenido";
    }

}

document.addEventListener("DOMContentLoaded", mostrarNombre);
