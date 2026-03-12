// 1. OBTENCIÓN DE PARÁMETROS URL
let parametros = window.location.search;
let url = new URLSearchParams(parametros);
const idProducto = url.get('id');

// 2. CATÁLOGO FIJO (Tus 10 productos originales)
let catalogo = {
    "pr1": {
        titulo: "Empanadas",
        imagen: "../imagenes/empanadas.jpg",
        precio: "1.50$",
        descripcion: "Unas deliciosas empanadas rellenas de carne molida",
        disponible: "30",
        total: "1.50$"
    },
    "pr2": {
        titulo: "Pan Relleno",
        imagen: "../imagenes/pan%20relleno.jpg",
        precio: "1$",
        descripcion: "Deliciosos panes rellenos de dulce de guallaba",
        disponible: "70",
        total: "1$"
    },
    "pr3": {
        titulo: "Tequeños",
        imagen: "../imagenes/tequeños.jpg",
        precio: "1.50$",
        descripcion: "Increibles tequeños rellenos de mucho queso",
        disponible: "20",
        total: "1.50$"
    },
    "pr4": {
        titulo: "Postre de frambuesas con crema",
        imagen: "../imagenes/postre%20de%20frambuesas%20con%20crema.jpg",
        precio: "3$",
        descripcion: "Un postre para disfrutar de un dia maravilloso",
        disponible: "15",
        total: "3$"
    },
    "pr5": {
        titulo: "Salchipapas",
        imagen: "../imagenes/salchipapas.jpg",
        precio: "3.50$",
        descripcion: "Deleitate con este festin de un monton de papas y salchichas cubiertas de mucha salsa",
        disponible: "20",
        total: "3.50$"
    },
    "pr6": {
        titulo: "Sandwich",
        imagen: "../imagenes/sandwich.jpg",
        precio: "2$",
        descripcion: "Delicioso sandwich para quedar satisfecho",
        disponible: "30",
        total: "2$"
    },
    "pr7": {
        titulo: "Hamburguesa",
        imagen: "../imagenes/hamburguesas.jpg",
        precio: "5$",
        descripcion: "Perfecto para esas salidas universitarias",
        disponible: "45",
        total: "5$"
    },
    "pr8": {
        titulo: "Postre de mandarinas con crema",
        imagen: "../imagenes/postre%20de%20mandarinas%20con%20crema.jpg",
        precio: "3$",
        descripcion: "Unico e inolvidable sabor y experiencia que este postre puede ofrecerte",
        disponible: "20",
        total: "3$"
    },
    "pr9": {
        titulo: "Pizza",
        imagen: "../imagenes/pizza.jpg",
        precio: "20$",
        descripcion: "Una gran y deliciosa pizza para comer con amigos y quedar completamente llenos",
        disponible: "30",
        total: "20$"
    },
    "pr10": {
        titulo: "Pollo frito",
        imagen: "../imagenes/pollo%20frito.jpg",
        precio: "10$",
        descripcion: "El perfecto almuerzo que todo universitario quiere",
        disponible: "17",
        total: "10$"
    }
};

// 3. SELECCIÓN DE PRODUCTO
let producto = catalogo[idProducto];

// 4. LÓGICA DE CONTROL DE PANTALLA
if (producto) {
    // Si el producto está en el catálogo fijo, llenamos el HTML
    document.getElementById('titulo').innerText = producto.titulo;
    document.getElementById('imagen').style.backgroundImage = `url('${producto.imagen}')`;
    document.getElementById("descripcion").innerText = producto.descripcion;
    document.getElementById("precio").innerHTML = producto.precio;
    document.getElementById("disponible").innerHTML = producto.disponible;
    document.getElementById("total").innerHTML = producto.total;
    
    let cantidadInput = document.getElementById("cantidad");
    cantidadInput.max = producto.disponible; 
    cantidadInput.min = 1;

    // Ejecutamos las funciones que dependen de que el producto exista
    inicializarCarrito();
    cargarResenas();

} else {
    // Si NO está en el catálogo fijo, revisamos si viene del Admin (localStorage)
    let datosAdmin = localStorage.getItem("productosData") || "";
    let existeEnAdmin = datosAdmin.split("#").some(p => p.split("|")[0] === idProducto);

    if (existeEnAdmin) {
        document.body.innerHTML = `
            <div style="text-align:center; margin-top:100px; font-family:sans-serif; padding: 20px;">
                <h1 style="color: #2c3e50;">📦 Producto en proceso de almacenamiento</h1>
                <p style="color: #7f8c8d;">Este producto ha sido añadido recientemente al menú y sus detalles (precio y stock) se están actualizando.</p>
                <br>
                <a href="../cliente.html" style="display:inline-block; padding:10px 20px; background:#2c3e50; color:white; text-decoration:none; border-radius:5px;">Volver al catálogo</a>
            </div>
        `;
    } else {
        document.body.innerHTML = "<h1 style='text-align:center; margin-top:100px;'>Error 404: Producto no encontrado</h1>";
    }
}

// 5. LÓGICA DEL CARRITO (Solo se ejecuta si el producto es válido)
function inicializarCarrito() {
    let contador = document.getElementById("contador");
    let cantidad = document.getElementById("cantidad");
    let total = document.getElementById("total");
    let añadir = document.getElementById("añadir");
    let precioBase = parseFloat(producto.precio.replace('$', ''));

    function actualizarContadorVisual() {
        let carrito = localStorage.getItem('carrito') || 0;
        if(contador) contador.textContent = carrito;
    }
    actualizarContadorVisual();

    cantidad.addEventListener("input", () => {
        let cant = parseInt(cantidad.value);
        if (isNaN(cant) || cant < 1) {
            total.innerText = "0$";
            return;
        }
        let calculo = (precioBase * cant).toFixed(2);
        total.innerText = `${calculo}$`;
    });

    añadir.addEventListener("click", () => {
        let cantidadSeleccionada = parseInt(cantidad.value);
        let stockDisponible = parseInt(producto.disponible);
        
        if (cantidadSeleccionada > stockDisponible) {
            alert(`Lo sentimos, solo quedan ${stockDisponible} unidades disponibles.`);
            cantidad.value = stockDisponible;
            return; 
        }
        
        if (isNaN(cantidadSeleccionada) || cantidadSeleccionada < 1) return;

        let carritoDatosP = localStorage.getItem('carritoData') || "";
        let productosEnCarrito = carritoDatosP ? carritoDatosP.split("#") : [];
        let productoEncontrado = false;
        let nuevoCarrito = [];

        for (let i = 0; i < productosEnCarrito.length; i++) {
            let datos = productosEnCarrito[i].split("|"); 
            if (datos[0] === producto.titulo) {
                let nuevaCant = parseInt(datos[1]) + cantidadSeleccionada;
                let nuevoTotal = (parseFloat(datos[2]) + (precioBase * cantidadSeleccionada)).toFixed(2);
                nuevoCarrito.push(`${datos[0]}|${nuevaCant}|${nuevoTotal}`);
                productoEncontrado = true;
            } else {
                nuevoCarrito.push(productosEnCarrito[i]);
            }
        }

        if (!productoEncontrado) {
            let totalFila = (precioBase * cantidadSeleccionada).toFixed(2);
            nuevoCarrito.push(`${producto.titulo}|${cantidadSeleccionada}|${totalFila}`);
        }

        localStorage.setItem('carritoData', nuevoCarrito.join("#"));
        
        let totalItems = 0;
        nuevoCarrito.forEach(p => totalItems += parseInt(p.split("|")[1]));
        localStorage.setItem('carrito', totalItems);
        
        actualizarContadorVisual();
        alert("Añadido al carrito con éxito");
    });
}

// 6. LÓGICA DE RESEÑAS
function cargarResenas() {
    let contenedorHTML = document.getElementById("reseñas"); 
    if (!contenedorHTML) return; 

    contenedorHTML.innerHTML = "";
    let todasResenasRaw = localStorage.getItem("resenasData") || "";
    
    if (todasResenasRaw === "") {
        contenedorHTML.innerHTML = "<p style='color: gray;'>Este producto aún no tiene reseñas. ¡Sé el primero en opinar!</p>";
        return;
    }

    let lista = todasResenasRaw.split("#");
    let hayResenas = false;

    lista.forEach(r => {
        let datos = r.split("|"); 
        if (datos[0] === producto.titulo) {
            hayResenas = true;
            let divResena = document.createElement("div");
            divResena.className = "reseña-item";
            divResena.style.borderBottom = "1px solid #ddd";
            divResena.style.padding = "10px 0";
            divResena.innerHTML = `
                <p style="margin: 0; font-style: italic;">"${datos[1]}"</p>
                <small>⭐ Cliente Verificado</small>
            `;
            contenedorHTML.appendChild(divResena);
        }
    });

    if (!hayResenas) {
        contenedorHTML.innerHTML = "<p style='color: gray;'>Aún no hay reseñas para este producto.</p>";
    }
}