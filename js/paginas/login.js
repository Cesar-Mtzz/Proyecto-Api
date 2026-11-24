class User {
    constructor(nombre, apellido, usuario, contraseña, mostrarTodo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.mostrarTodo = mostrarTodo;
    }
}

function crearUsuario(e) {
    e.preventDefault();

    const inName = document.getElementById("inputName").value.trim();
    const inLastname = document.getElementById("inputLastname").value.trim();
    const inUser = document.getElementById("inputUser").value.trim();
    const inPass = document.getElementById("inputPass").value.trim();
    const inTipo = document.getElementById("inputCheck").checked;

    const user = new User(inName, inLastname, inUser, inPass, inTipo);

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

        if (userFound.mostrarTodo) {
            window.location.href = "./html/lessInfo.html";
        } else {
            window.location.href = "./html/home.html"
        }

    } else {
        document.getElementById("errorMsg").classList.add("mostrarError");
    }
}

function saltarLoginSiAutenticado() {
    const session = JSON.parse(sessionStorage.getItem("sesionActiva"));

    if (session) {
        if (session.mostrarTodo) {
            window.location.href = "./html/lessInfo.html";
        } else {
            window.location.href = "./html/home.html";
        }
    }
}
