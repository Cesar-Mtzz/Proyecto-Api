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

    const usuarios = JSON.parse(localStorage.getItem("registrado")) || [];

    const userFound = usuarios.find(user => user.usuario === inUser);

    if (userFound) {
        alert("Este usuario ya se encuentra registrado.");
        return;
    }

    const user = new User(inName, inLastname, inUser, inPass, inTipo);

    usuarios.push(user);

    localStorage.setItem("registrado", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente.");

    window.location.href = "../index.html";
}

function iniciarSesion(e) {
    e.preventDefault();

    const inUser = document.getElementById("inputUser").value.trim();
    const inPass = document.getElementById("inputPass").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("registrado")) || [];

    if (usuarios.length === 0) {
        alert("No hay usuarios registrados.");
        return;
    }

    const userFound = usuarios.find(user => user.usuario === inUser);

    if (!userFound) {
        alert("El usuario ingresado no existe.");
        return;
    }

    if (userFound.contraseña !== inPass) {
        alert("La contraseña es incorrecta.");
        return;
    }

    sessionStorage.setItem("sesionActiva", JSON.stringify(userFound));

    alert("Inicio de sesión exitoso.");

    if (userFound.mostrarTodo) {
        window.location.href = "./html/lessInfo.html";
    } else {
        window.location.href = "./html/home.html";
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
