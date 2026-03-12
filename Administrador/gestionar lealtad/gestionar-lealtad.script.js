document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display-puntos");
    const inputAjuste = document.getElementById("cantidad-ajuste");

    // Función para leer y mostrar los puntos actuales
    function actualizarVista() {
        // Usamos la misma llave que tu carrito: "puntosLealtad"
        let puntos = parseInt(localStorage.getItem("puntosLealtad")) || 0;
        display.innerText = puntos;
        
        // Efecto visual de color si tiene muchos puntos
        display.style.color = puntos > 0 ? "#2ecc71" : "#e74c3c";
    }

    // Función para guardar puntos
    function guardarPuntos(nuevoTotal) {
        // Aseguramos que no sean negativos
        if (nuevoTotal < 0) nuevoTotal = 0;
        localStorage.setItem("puntosLealtad", nuevoTotal);
        actualizarVista();
    }

    // EVENTOS
    document.getElementById("btn-sumar").onclick = () => {
        let actual = parseInt(localStorage.getItem("puntosLealtad")) || 0;
        let ajuste = parseInt(inputAjuste.value) || 0;
        guardarPuntos(actual + ajuste);
    };

    document.getElementById("btn-restar").onclick = () => {
        let actual = parseInt(localStorage.getItem("puntosLealtad")) || 0;
        let ajuste = parseInt(inputAjuste.value) || 0;
        guardarPuntos(actual - ajuste);
    };

    document.getElementById("btn-reset").onclick = () => {
        if(confirm("¿Estás seguro de que quieres poner a 0 los puntos de este usuario?")) {
            guardarPuntos(0);
        }
    };

    // Carga inicial
    actualizarVista();
});