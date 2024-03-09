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
    NOMBRE_MODELO = document.getElementById('nombreModelo');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idMarca'),
    NOMBRE_PRODUCTO = document.getElementById('nombreMarca'),
    ESTADO_PRODUCTO = document.getElementById('estadoMarca');

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
                    <div class="col-lg-3 col-md-6 col-sm-3" onclick="openModal(${row.id_modelo_talla})">
                    <div class="container">
                        <div class="contenedor-botones">
                            <button class="boton-numero">
                                ${row.talla}
                                <div class="precio" style="font-weight: bold; opacity: 50%;
                                font-size: 14px;">$${row.precio_modelo_talla}</div>
                            </button>
                            <!-- ... -->
                        </div>
                        </div>
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
/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openModal= async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    
    FORM.append('idMarca', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MARCA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Agregar al carrito';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_marca;
        NOMBRE_PRODUCTO.value = ROW.descripcion_marca;
        ESTADO_PRODUCTO.checked = ROW.estado_marca;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

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