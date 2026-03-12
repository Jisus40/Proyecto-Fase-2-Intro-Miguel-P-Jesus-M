document.addEventListener("DOMContentLoaded", () => {
    const listaTabla = document.getElementById("lista-bloqueados");
    const inputUsuario = document.getElementById("usuario-a-bloquear");
    const btnAccion = document.getElementById("btn-bloquear-accion");

    function cargarBloqueados() {
        let datosRaw = localStorage.getItem("usuariosBloqueados") || "";
        listaTabla.innerHTML = "";

        if (datosRaw === "") {
            listaTabla.innerHTML = "<tr><td colspan='2'>No hay usuarios bloqueados.</td></tr>";
            return;
        }

        let bloqueados = datosRaw.split("#");
        bloqueados.forEach((user, index) => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${user}</td>
                <td><button class="btn-desbloquear" onclick="desbloquear(${index})">Levantar Bloqueo</button></td>
            `;
            listaTabla.appendChild(fila);
        });
    }

  // Dentro de tu gestionar-usuarios.js, en la parte donde bloqueas:
btnAccion.onclick = () => {
    // Limpiamos comillas antes de guardar
    let user = inputUsuario.value.trim().replace(/['"]+/g, ''); 
    
    if (user === "") return;

    let datosRaw = localStorage.getItem("usuariosBloqueados") || "";
    let bloqueados = datosRaw === "" ? [] : datosRaw.replace(/['"]+/g, '').split("#");

    if (bloqueados.includes(user)) {
        alert("Este usuario ya está bloqueado.");
    } else {
        bloqueados.push(user);
        localStorage.setItem("usuariosBloqueados", bloqueados.join("#"));
        inputUsuario.value = "";
        cargarBloqueados();
    }
};

    window.desbloquear = (index) => {
        let bloqueados = localStorage.getItem("usuariosBloqueados").split("#");
        bloqueados.splice(index, 1);
        localStorage.setItem("usuariosBloqueados", bloqueados.join("#"));
        cargarBloqueados();
    };

    cargarBloqueados();
});