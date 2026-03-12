document.addEventListener("DOMContentLoaded", () => {
    const contenedorTabla = document.getElementById("lista-resenas-admin");

    function cargarResenasAdmin() {
        // 1. Obtener los datos con los que trabaja tu página de detalles
        let datosRaw = localStorage.getItem("resenasData") || "";
        contenedorTabla.innerHTML = "";

        if (datosRaw === "") {
            contenedorTabla.innerHTML = "<tr><td colspan='3' class='empty-msg'>No hay reseñas registradas por clientes.</td></tr>";
            return;
        }

        // 2. Separar por # para obtener cada reseña individual
        let lista = datosRaw.split("#");

        lista.forEach((item, index) => {
            let d = item.split("|"); // d[0]: Producto, d[1]: Comentario
            
            if (d.length < 2) return;

            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td><strong>${d[0]}</strong></td>
                <td>"${d[1]}"</td>
                <td>
                    <button class="btn-borrar" onclick="eliminarResena(${index})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `;
            contenedorTabla.appendChild(fila);
        });
    }

    // 3. Función para eliminar (Global para que el onclick la encuentre)
    window.eliminarResena = (idx) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este comentario?")) return;

        let datosRaw = localStorage.getItem("resenasData") || "";
        let lista = datosRaw.split("#");

        // Quitamos la reseña seleccionada por su índice
        lista.splice(idx, 1);

        // Volvemos a unir el string y guardamos
        localStorage.setItem("resenasData", lista.join("#"));

        // Recargamos la tabla
        cargarResenasAdmin();
    };

    cargarResenasAdmin();
});