document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-facturas-finales");
    const rawData = localStorage.getItem("recibosData") || "";

    if (rawData === "") {
        contenedor.innerHTML = "<p style='text-align:center; font-size: 1.2rem; margin-top: 50px;'>No hay facturas emitidas hoy.</p>";
        return;
    }

    let facturas = rawData.split("%%");
    contenedor.innerHTML = "";

    facturas.forEach(f => {
        // En facturas el formato es: DatosDelPedido | Fecha
        // El pedido en sí tiene: Nombre | Productos | Total
        const ultimoPipeFactura = f.lastIndexOf("|");
        const fecha = f.substring(ultimoPipeFactura + 1);
        const cuerpoPedido = f.substring(0, ultimoPipeFactura);

        // Ahora desglosamos el cuerpo del pedido
        const primerPipe = cuerpoPedido.indexOf("|");
        const ultimoPipe = cuerpoPedido.lastIndexOf("|");

        const nombre = cuerpoPedido.substring(0, primerPipe);
        const total = cuerpoPedido.substring(ultimoPipe + 1);
        const productosRaw = cuerpoPedido.substring(primerPipe + 1, ultimoPipe);

        let card = document.createElement("div");
        card.className = "factura-bloque";

        let listaHTML = "";
        let productos = productosRaw.split(";");
        productos.forEach(p => {
            let d = p.split("|");
            if (d.length >= 2) {
                listaHTML += `
                <li style="display: flex; justify-content: space-between; font-size: 1.3rem; padding: 10px 0; border-bottom: 1px dashed #ccc;">
                    <span>${d[0].trim()} (x${d[1]})</span>
                    <span>${d[2]}$</span>
                </li>`;
            }
        });

        card.innerHTML = `
            <div class="etiqueta-finalizado">COMPRA FINALIZADA</div>
            <div class="cliente-info">
                <h2 style="font-size: 2.2rem; margin-bottom: 5px;">${nombre}</h2>
                <p style="color: #666; font-size: 1.1rem;">Emitido el: ${fecha}</p>
            </div>
            <ul style="list-style: none; padding: 0; margin: 30px 0;">
                ${listaHTML}
            </ul>
            <div class="total-final">
                <span>TOTAL PAGADO:</span> ${total}$
            </div>
        `;
        contenedor.appendChild(card);
    });
});