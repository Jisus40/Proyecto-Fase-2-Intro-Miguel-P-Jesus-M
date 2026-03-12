(function verificarAcceso() {
    if (localStorage.getItem("sesionActiva") !== "true") {
        alert("Acceso denegado. Por favor, inicie sesión.");
        window.location.href = "../index.html"; 
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-catalogo");
    const contadorLabel = document.getElementById("contador");

    if (contadorLabel) contadorLabel.textContent = localStorage.getItem('carrito') || 0;

    // 1. PRODUCTOS POR DEFECTO (Tus clases originales)
    const productosDefault = "pr1|Empanadas|img1#pr2|Pan Relleno|img2#pr3|Tequeños|img3#pr4|Postre de frambuesas|img4#pr5|Salchipapas|img5#pr6|Sandwich|img6#pr7|Hamburguesa|img7#pr8|Postre de mandarinas|img8#pr9|Pizza|img9#pr10|Pollo frito|img10";

    // 2. Obtener datos o usar default
    let datosRaw = localStorage.getItem("productosData") || productosDefault;
    
    if (datosRaw.trim() === "") {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    } else {
        contenedor.innerHTML = ""; 
        let lista = datosRaw.split("#");

        lista.forEach(item => {
            let d = item.split("|"); // 0:ID, 1:Nombre, 2:Imagen (clase o link)
            if (d.length < 3) return;

            let divProd = document.createElement("div");
            divProd.className = "producto";
            divProd.setAttribute("data-id", d[0]);

            let imagenContenido = "";

            // DETECTOR INTELIGENTE:
            // Si el texto empieza por "http" es un enlace nuevo del admin
            if (d[2].startsWith("http")) {
                imagenContenido = `<div class="pr-img" style="background-image: url('${d[2]}'); background-size: cover; background-position: center;"></div>`;
            } else {
                // Si no, es una de tus clases originales (img1, img2, etc.)
                imagenContenido = `<div class="pr-img ${d[2]}"></div>`;
            }

            divProd.innerHTML = `
                ${imagenContenido}
                <h2 class="pr-titulo">${d[1]}</h2>
            `;

            divProd.addEventListener("click", () => {
                window.location.href = `detalles de los productos/detalles.html?id=${d[0]}`;
            });

            contenedor.appendChild(divProd);
        });
    }
});


// Lógica de cerrar sesión
document.getElementById("cerrarSesion").onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem("sesionActiva");
    alert("Sesión cerrada. ¡Vuelva pronto!");
    window.location.href = "../index.html";
};