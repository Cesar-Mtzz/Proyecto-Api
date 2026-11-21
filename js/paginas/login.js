class User {
    constructor(nombre, apellido, usuario, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

function crearUsuario(e) {
    e.preventDefault();

    const inName = document.getElementById("inputName").value.trim();
    const inLastname = document.getElementById("inputLastname").value.trim();
    const inUser = document.getElementById("inputUser").value.trim();
    const inPass = document.getElementById("inputPass").value.trim();

    const user = new User(inName, inLastname, inUser, inPass);

    localStorage.setItem("registrado", JSON.stringify(user));

    window.location.href = "../index.html";
}

function iniciarSesion(e) {
    e.preventDefault();

    const inUser = document.getElementById("inputUser").value.trim();
    const inPass = document.getElementById("inputPass").value.trim();

    const userFound = JSON.parse(localStorage.getItem("registrado"));

    if (userFound != null && userFound.usuario === inUser && userFound.contraseña === inPass) {
        document.getElementById("errorMsg").classList.remove("mostrarError");

        sessionStorage.setItem("sesionActiva", JSON.stringify(userFound));

        window.location.href = "./html/home.html";

    } else {
        document.getElementById("errorMsg").classList.add("mostrarError");
    }
}

function saltarLoginSiAutenticado() {
    const session = JSON.parse(sessionStorage.getItem("sesionActiva"));

    if (session) {
        window.location.href = "./html/home.html";
    }
}

function cerrarSesion() {
    sessionStorage.removeItem("sesionActiva");
    window.location.href = "../index.html";
}
