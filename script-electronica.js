const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalPrecioElem = document.getElementById('total-precio');
const comprarBtn = document.querySelector('#comprar'); // Referencia al botón "Comprar"

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    comprarBtn.addEventListener('click', redirigirCompra); // Agregar listener para el botón Comprar
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: parseFloat(elemento.querySelector('.precio').textContent.replace('Q ', '')),
        id: Date.now()
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100%">
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            Q ${elemento.precio.toFixed(2)}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}"> X </a>
        </td>
    `;
    lista.appendChild(row);
    actualizarTotalPrecio(); // Actualiza el total después de insertar un producto
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        actualizarTotalPrecio(); // Actualiza el total después de eliminar un producto
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    actualizarTotalPrecio(); // Actualiza el total después de vaciar el carrito
    return false;
}

function actualizarTotalPrecio() {
    let total = 0;
    const filas = lista.querySelectorAll('tr');
    filas.forEach(fila => {
        const precioCelda = fila.querySelector('td:nth-child(3)').textContent.replace('Q ', '');
        total += parseFloat(precioCelda);
    });
    totalPrecioElem.innerText = `Q ${total.toFixed(2)}`;
}

// Listener para redirigir al formulario de compra
function redirigirCompra(e) {
    e.preventDefault();
    // Verificar si el carrito tiene productos antes de redirigir
    if (lista.children.length > 0) {
        window.location.href = 'compras.html'; // Redirigir a la página de compra
    } else {
        alert('El carrito está vacío. Agrega productos antes de continuar.');
    }
}
