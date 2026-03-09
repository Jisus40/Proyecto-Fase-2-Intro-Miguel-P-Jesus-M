let queryParams = window.location.search;

let urlParams = new URLSearchParams(queryParams);

const idProducto = urlParams.get('id');

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

// Buscamos la info usando el ID que atrapamos de la URL
let producto = catalogo[idProducto];

// Si el producto existe, llenamos el HTML
if (producto) {
    document.getElementById('titulo').innerText = producto.titulo;
    document.getElementById('imagen').style.backgroundImage = `url('${producto.imagen}')`;
    document.getElementById("descripcion").innerText = producto.descripcion;
    document.getElementById("precio").innerHTML = producto.precio;
    document.getElementById("disponible").innerHTML = producto.disponible;
    document.getElementById("total").innerHTML = producto.total;
} else {
    // Si alguien escribe un ID manual que no existe
    document.body.innerHTML = "<h1>Producto no encontrado</h1>";
}