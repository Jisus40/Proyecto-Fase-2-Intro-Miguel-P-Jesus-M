(function verificarAcceso() {
    // Verificamos si la llave existe
    if (localStorage.getItem("sesionActiva") !== "true") {
        alert("Acceso denegado. Por favor, inicie sesión.");
        // Ajusta la ruta para salir de la carpeta Cliente y llegar al index
        window.location.href = "../index.html"; 
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    // El Guardián
    if (localStorage.getItem("sesionActiva") !== "true") {
        window.location.href = "../index.html";
        return;
    }

    cargarPedidos();
});

function cargarPedidos() {
    const contenedor = document.getElementById("lista-pedidos-caja");
    const datosRaw = localStorage.getItem("pedidosPendientes") || "";

    if (datosRaw === "") {
        contenedor.innerHTML = "<div class='vacio-msg'><h2>No hay pedidos pendientes</h2></div>";
        return;
    }

    contenedor.innerHTML = "";
    let bloques = datosRaw.split("%%");

    bloques.forEach((bloque, index) => {
        // --- CIRUGÍA LÁSER DE DATOS ---
        const primerPipe = bloque.indexOf("|");
        const ultimoPipe = bloque.lastIndexOf("|");

        // El nombre es todo lo que está antes del primer |
        const nombreCliente = bloque.substring(0, primerPipe);
        // El total es todo lo que está después del último |
        const totalPago = bloque.substring(ultimoPipe + 1);
        // Los productos son todo lo que está en el MEDIO
        const cuerpoProductos = bloque.substring(primerPipe + 1, ultimoPipe);

        let divPedido = document.createElement("div");
        divPedido.className = "bloque-compra";
        divPedido.style = "border: 2px solid #000; padding: 20px; margin-bottom: 25px; background: #fff; box-shadow: 10px 10px 0px #000;";

        // Procesamos la lista de productos (separados por ";" según tu carrito)
        let listaHTML = "<ul style='padding: 0; list-style: none;'>";
        let productosArray = cuerpoProductos.split(";");

        productosArray.forEach(prod => {
            let d = prod.split("|");
            // Filtramos por si acaso hay espacios vacíos
            if (d.length >= 2) {
                // d[0]=Nombre, d[1]=Cant, d[2]=Precio
                listaHTML += `
                <li style="font-size: 1.2rem; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <strong>${d[0].trim()}</strong> — Cant: ${d[1]} — Subtotal: ${d[2]}$
                </li>`;
            }
        });
        listaHTML += "</ul>";

        divPedido.innerHTML = `
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 style="margin: 0;">CLIENTE: ${nombreCliente}</h3>
                <span style="font-weight: bold;">ORDEN #${index + 1}</span>
            </div>
            ${listaHTML}
            <div style="text-align: right; margin-top: 15px;">
                <p style="font-size: 1.8rem; margin: 0;">TOTAL: <strong>${totalPago}$</strong></p>
            </div>
            <button onclick="finalizarVenta(${index})" style="width: 100%; background: #000; color: #fff; border: none; padding: 15px; font-weight: bold; cursor: pointer; margin-top: 15px; font-size: 1.1rem;">
                CONFIRMAR VENTA
            </button>
        `;
        contenedor.appendChild(divPedido);
    });
}

function finalizarVenta(index) {
    let datosRaw = localStorage.getItem("pedidosPendientes") || "";
    let pedidos = datosRaw.split("%%");
    let pedidoFinalizado = pedidos[index];

    let ahora = new Date();
    let fecha = ahora.toLocaleDateString() + " " + ahora.toLocaleTimeString();

    // Guardamos en facturas: DatosDelPedido | Fecha
    let recibosPrevios = localStorage.getItem("recibosData") || "";
    let nuevoRecibo = `${pedidoFinalizado}|${fecha}`;
    
    let dataFinal = (recibosPrevios === "") ? nuevoRecibo : nuevoRecibo + "%%" + recibosPrevios;
    localStorage.setItem("recibosData", dataFinal);

    // Borrar de pendientes
    pedidos.splice(index, 1);
    if (pedidos.length > 0) {
        localStorage.setItem("pedidosPendientes", pedidos.join("%%"));
    } else {
        localStorage.removeItem("pedidosPendientes");
    }

    alert("Venta finalizada con éxito.");
    cargarPedidos();
}
document.getElementById("cerrarSesion").onclick = () => {
    // Quitamos la llave pero NO borramos historial ni puntos
    localStorage.removeItem("sesionActiva");
    
    alert("Sesión cerrada. ¡Vuelva pronto!");
    window.location.href = "../index.html";
};