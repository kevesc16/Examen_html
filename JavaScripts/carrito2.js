const prev = document.getElementById('pagPrev');
const next = document.getElementById('pagNext');

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US';

var pagActual = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGEwNGJkOTViYzdhNTE1OTQxZmE5MTZmZTZmNjcwMiIsInN1YiI6IjY0NWViMzJlNWFiODFhMDBmZGNmMWMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoUAdOfcNP_wkP9V-hqo4XAT38PLFGhjhYPPUWpeNWQ'
    }
};



    async function fetchPeliculas(url){
        lastUrl = url;
        let data = await fetch(url, options);
        let response = await data.json();

        console.log(response)

        let carteleraPeliculas = document.querySelector('.cartelera');
        if (response.results.length !== 0){
            for (let i = 0; i < response.results.length; i++) {
                carteleraPeliculas.innerHTML += `
                    <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
                    <div class="card text-bg-dark shadow item-card">
                        <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${response.results[i].poster_path}" class="card-img item-Imagen" alt="${response.results[i].title}">
                        <div class="card-img-overlay">
                            <h5 class="card-title item-Titulo">${response.results[i].title}</h5>
                            <p class="card-text item-Descripcion"></p>
                            <p class="item-Precio"><b>5000 CLP</b></p>
                            <a type="button" class="btn btn-outline-light btnVerMas" href="https://www.themoviedb.org/movie/${response.results[i].id}">Ver más</a>
                            <button type="button" class="btn btn-outline-info addCarro">Añadir Pelicula</button>
                        </div>
                    </div>
                </div>
                `
            }
            pagActual = response.page;
            nextPage = pagActual + 1;
            prevPage = pagActual - 1;
            totalPages = response.total_pages;


        }else{
            alert('No se encontaron peliculas')
        }

    };
    fetchPeliculas(url);





const agregar = document.querySelector('.addCarro');
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


document.addEventListener('click', botonClick);



const comprarButton = document.querySelector('.comprarButton')
comprarButton.addEventListener('click', comprarClicked)

const tablaCarrito = document.querySelector('.barraCarrito');

function botonClick(event) {
    const button = event.target;
    const item = button.closest('.item-card');

    if (item) {
        const tituloElement = item.querySelector('.item-Titulo');
        const precioElement = item.querySelector('.item-Precio');
        const imagenElement = item.querySelector('.item-Imagen');

    if (tituloElement && precioElement && imagenElement) {
        const titulo = tituloElement.textContent;
        const precio = precioElement.textContent;
        const imagen = imagenElement.src;

        agregarItemCarrito(titulo, precio, imagen);
        }
    }
}

function agregarItemCarrito(titulo, precio, imagen){

    const elementTilttle = tablaCarrito.getElementsByClassName('shoppingCartItemTitle')
    
    for(let i = 0; i< elementTilttle.length; i++){
        if(elementTilttle[i].innerText === titulo){
            let cantidadPeliculas = elementTilttle[i].parentElement.parentElement.parentElement.querySelector('.cantidadPeliculas');
            cantidadPeliculas.value++;
            actualizarTotal();
            return;
        }
    }
    const filaCarrito = document.createElement('div');
    const carritoContenido = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imagen} class="shopping-cart-image imgSu">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${titulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 carritoPrecio">${precio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadPeliculas" type="number"
                    value="1">
                <button class="btn btn-danger eliminarProducto" type="button">X</button>
            </div>
        </div>
    </div>`;
    
    filaCarrito.innerHTML = carritoContenido;
    tablaCarrito.append(filaCarrito);

    filaCarrito.querySelector('.eliminarProducto').addEventListener('click', eliminacionProducto)
    
    filaCarrito.querySelector('.cantidadPeliculas').addEventListener('change', cantidadCambio)
    actualizarTotal();

     // Guardar datos en el localStorage
    const item = {
        titulo: titulo,
        precio: precio,
        imagen: imagen
    };

    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarTotal(){
    let totalP = 0;
    const total = document.querySelector('.totalPagar');
    const itemCarrito = document.querySelectorAll('.shoppingCartItem');

    itemCarrito.forEach(barraCarrito =>{
        const precioElemento = barraCarrito.querySelector('.carritoPrecio');
        const precioB = Number(precioElemento.textContent.replace('CLP',''));
        
        const cantidadElemento = barraCarrito.querySelector('.cantidadPeliculas');
        const cantidad = Number(cantidadElemento.value);
        
        totalP = totalP + precioB * cantidad;
    });
    total.innerHTML=`${totalP}$`
    botonDesactivado(totalP);
}
function eliminacionProducto(event){
    const botonClickeado = event.target
    botonClickeado.closest('.shoppingCartItem').remove();

    const indiceAEliminar = 0; // Índice del elemento a eliminar

    if (indiceAEliminar >= 0 && indiceAEliminar < carrito.length) {
        carrito.splice(indiceAEliminar, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Pelicula eliminado correctamente");
    } else {
        alert("El índice está fuera de rango");
    }
    actualizarTotal();
}

function cantidadCambio(event){
    const cambioElemento = event.target
    if(cambioElemento.value <= 0){
        cambioElemento.value = 1;
    }
    actualizarTotal();
}

function comprarClicked(event){
        tablaCarrito.innerHTML = '';
        localStorage.removeItem('carrito');
        actualizarTotal();
        alert('Su pedido ha sido realizado');
}

let botones = document.getElementsByClassName('comprarButton');
botones[0].disabled = true;

function botonDesactivado(totalP){
    let botones = document.getElementsByClassName('comprarButton');
    if(totalP === 0){
        botones[0].disabled = true;
    }else{
        botones[0].disabled = false;
    }
    
    
}

function showLocal(){
    for(let i = 0; i< carrito.length; i++){
        const array = carrito[i];
        const titulo = array.titulo;
        const precio = array.precio;
        const imagen = array.imagen;

        const filaCarrito = document.createElement('div');
        const carritoContenido = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${imagen} class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${titulo}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 carritoPrecio">${precio}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input cantidadPeliculas" type="number"
                        value="1">
                    <button class="btn btn-danger eliminarProducto" type="button">X</button>
                </div>
            </div>
        </div>`;
        
        filaCarrito.innerHTML = carritoContenido;
        tablaCarrito.append(filaCarrito);

        filaCarrito.querySelector('.eliminarProducto').addEventListener('click', eliminacionProducto)
        filaCarrito.querySelector('.cantidadPeliculas').addEventListener('change', cantidadCambio)
        actualizarTotal();
    }

}
showLocal();

next.addEventListener('click', () => {
    if(nextPage <= totalPages){
        pageCall(nextPage);
    }
})

function pageCall(page){
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page'){
        let url = lastUrl + '&page='+page;
        fetchPeliculas(url);
    }else{
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length -1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        fetchPeliculas(url);
    }
}