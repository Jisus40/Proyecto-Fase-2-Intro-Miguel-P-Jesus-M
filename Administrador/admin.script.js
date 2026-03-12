document.addEventListener("DOMContentLoaded", () => {
    // 1. EL GUARDIÁN: Verificación de Autenticación
    const sesionActiva = localStorage.getItem("sesionActiva");
    
    // Si no hay sesión, mandamos al usuario al index (Login)
    if (sesionActiva !== "true") {
        console.warn("Intento de acceso no autorizado detectado.");
        window.location.href = "../index.html"; 
        return;
    }

    // 2. Lógica del Botón Cerrar Sesión
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    
    btnCerrarSesion.addEventListener("click", () => {
        if (confirm("¿Está seguro de que desea cerrar la sesión de administración?")) {
            // Limpiamos la llave de seguridad
            localStorage.removeItem("sesionActiva");
            // Redirigimos al inicio
            window.location.href = "../index.html";
        }
    });
});