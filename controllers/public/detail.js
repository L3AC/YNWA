// Constantes para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
const PEDIDO_API = 'services/public/pedido.php';
const MODELOTALLAS_API = 'services/public/modelotallas.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm'),
TALLAS = document.getElementById('tallas'),
ID_MODELO = document.getElementById('idModelo'),
IMAGEN_MODELO = document.getElementById('imagenModelo'),
STOCK_MODELO = document.getElementById('stockModelo'),
NOMBRE_MODELO = document.getElementById('nombreModelo')
;


// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
// Llamada a la función para mostrar el encabezado y pie del documento.
loadTemplate();
// Se establece el título del contenido principal.
MAIN_TITLE.textContent = 'Modelo';
// Constante tipo objeto con los datos del producto seleccionado.
const FORM = new FormData();
FORM.append('idProducto', PARAMS.get('id'));
// Petición para solicitar los datos del producto seleccionado.
const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
// Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
if (DATA.status) {
// Se colocan los datos en la página web de acuerdo con el producto seleccionado previamente.
IMAGEN_MODELO.src = SERVER_URL.concat('images/modelos/', DATA.dataset.foto_modelo);
NOMBRE_MODELO.textContent = DATA.dataset.descripcion_modelo;
ID_MODELO.value = DATA.dataset.id_modelo;

const FORM2 = new FormData();
FORM2.append('idModelo', ID_MODELO.value);
const DATA2 = await fetchData(MODELOTALLAS_API, 'readAllActive', FORM2);
// Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
if (DATA2.status) {
// Se inicializa el contenedor de productos.
TALLAS.innerHTML = '';
// Se recorre el conjunto de registros fila por fila a través del objeto row.
DATA2.dataset.forEach(row => {
// Se crean y concatenan las tarjetas con los datos de cada producto.
TALLAS.innerHTML += `

    <div class="col-sm-3 col-md-4 col-lg-3 m-2">
    <button>
  <span class="button_top"> 
            <a value="${row.id_talla}" class="btn"><p style="padding-left: 0%   ;">${row.talla}</p></a>
                <p style="margin-top: 0px;">$${row.precio_modelo_talla}</p>
        </span>
    </button>
    </div>
    
`;
});
} else {
// Se presenta un mensaje de error cuando no existen datos para mostrar.
MAIN_TITLE.textContent = DATA.error;
}

} else {
// Se presenta un mensaje de error cuando no existen datos para mostrar.
document.getElementById('mainTitle').textContent = DATA.error;
// Se limpia el contenido cuando no hay datos para mostrar.
document.getElementById('detalle').innerHTML = '';
}
});

// Método del evento para cuando se envía el formulario de agregar un producto al carrito.
SHOPPING_FORM.addEventListener('submit', async (event) => {
// Se evita recargar la página web después de enviar el formulario.
event.preventDefault();
// Constante tipo objeto con los datos del formulario.
const FORM = new FormData(SHOPPING_FORM);
// Petición para guardar los datos del formulario.
const DATA = await fetchData(PEDIDO_API, 'createDetail', FORM);
// Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
if (DATA.status) {
sweetAlert(1, DATA.message, false, 'cart.html');
} else if (DATA.session) {
sweetAlert(2, DATA.error, false);
} else {
sweetAlert(3, DATA.error, true, 'login.html');
}
});