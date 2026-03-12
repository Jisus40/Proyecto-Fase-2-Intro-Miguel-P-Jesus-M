let iniciarSesion = document.getElementById("iniciar");
let mostrar = document.getElementById("iniciar-sesion");
let formulario = document.getElementById("formulario");
let entrar = document.getElementById("entrar");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let bloqueadosRaw = localStorage.getItem("usuariosBloqueados") || "";
let listaBloqueados = bloqueadosRaw.split("#");

iniciarSesion.addEventListener('click', () => {
    mostrar.style.display = "flex";
    mostrar.scrollIntoView({ behavior: 'smooth' });
});

entrar.onclick = function(event){
    event.preventDefault();

    // .replace(/['"]+/g, '') elimina cualquier comilla simple o doble que se cuele
    const nombreIngresado = usuario.value.trim().replace(/['"]+/g, '');
    const passwordIngresada = contraseña.value;

    const bloqueadosRaw = localStorage.getItem("usuariosBloqueados") || "";
    
    // Limpiamos también el string que viene del localStorage por si se guardó con comillas
    const listaBloqueados = bloqueadosRaw !== "" 
        ? bloqueadosRaw.replace(/['"]+/g, '').split("#") 
        : [];

    // Verificación
    if (listaBloqueados.includes(nombreIngresado)) {
        alert("⛔ ACCESO DENEGADO: Tu cuenta ha sido suspendida por el administrador.");
        return; 
    }
	if (listaBloqueados.includes(usuario.value)) {
    		alert("ACCESO DENEGADO: Tu cuenta ha sido suspendida por el administrador.");
    		return; // Detiene el inicio de sesión
	}
    if(nombreIngresado == "ClienteUCV" && passwordIngresada == "Central_123"){
			localStorage.setItem("sesionActiva", "true");
        	window.location.href = "Cliente/cliente.html";	
    }else if(nombreIngresado == "adminRoot" && passwordIngresada == "cafetinAdmin"){
			localStorage.setItem("sesionActiva", "true");
        	window.location.href = "Administrador/admin.html";	
    }else if(nombreIngresado == "caja_01" && passwordIngresada == "Cajero#123"){
			localStorage.setItem("sesionActiva", "true");
        	window.location.href = "Cajero/cajero.html";	
    }else{
        alert("usuario o contraseña invalidos");
    }
};
