// Constante para completar la ruta de la API.
const PEDIDO_API = 'services/public/pedido.php',
MODELOTALLAS_API = 'services/public/modelotallas.php',
COMENTARIO_API = 'services/public/comentario.php';
// Constante para establecer el cuerpo de la tabla.
const TABLE_BODY = document.getElementById('tableBody');
// Constante para establecer la caja de diálogo de cambiar producto.
const ITEM_MODAL = new bootstrap.Modal('#itemModal');
// Constante para establecer el formulario de cambiar producto.
const ITEM_FORM = document.getElementById('itemForm');

const ID_DETALLE = document.getElementById('idDetalle'),
    CANTIDAD = document.getElementById('cantidadModelo'),
    ID_MODELO_TALLA = document.getElementById('idModeloTalla'),
    STOCK_INFO = document.getElementById('stock'),
    mensajeDiv = document.getElementById('mensajeDiv'),
    IDGUARDAR = document.getElementById('idGuardar');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Carrito de compras';
    // Llamada a la función para mostrar los productos del carrito de compras.
    readDetail();
});

// Método del evento para cuando se envía el formulario de cambiar cantidad de producto.
ITEM_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    console.log(ID_DETALLE.value); 
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ITEM_FORM);
    // Petición para actualizar la cantidad de producto.
    const DATA = await fetchData(PEDIDO_API, 'updateDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se actualiza la tabla para visualizar los cambios.
        readDetail();
        // Se cierra la caja de diálogo del formulario.
        ITEM_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para obtener el detalle del carrito de compras.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function readDetail() {
    // Petición para obtener los datos del pedido en proceso.
    const FORM = new FormData();
    FORM.append('valor', '');
    const DATA = await fetchData(PEDIDO_API, 'searchRows',FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el cuerpo de la tabla.
        TABLE_BODY.innerHTML = '';
        // Se declara e inicializa una variable para calcular el importe por cada producto.
        let subtotal = 0;
        // Se declara e inicializa una variable para sumar cada subtotal y obtener el monto final a pagar.
        let total = 0;
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            subtotal = row.precio_modelo_talla * row.cantidad_detalle_pedido;
            total += subtotal;
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.

            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.descripcion_marca}</td>
                    <td>${row.descripcion_modelo}</td>
                    <td>${row.descripcion_talla}</td>
                    <td>$${row.precio_modelo_talla}</td>
                    <td>${row.cantidad_detalle_pedido}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td>${row.fecha_pedido}</td>
                    <td>
                        <button type="button"
                        onclick="openUpdate(${row.id_detalle})"
                         class="btn btn-info">
                            <i class="bi bi-plus-slash-minus"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        // Se muestra el total a pagar con dos decimales.
        document.getElementById('pago').textContent = total.toFixed(2);
    } else {
        sweetAlert(4, DATA.error, false, 'index.html');
    }
}
CANTIDAD.addEventListener('input', async function ()  {
    const FORM = new FormData();
    FORM.append('idModeloTalla', ID_MODELO_TALLA.value);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MODELOTALLAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status === 1) {
        const ROW = DATA.dataset;
        if(CANTIDAD.value>ROW.stock_modelo_talla){
            mensajeDiv.textContent = 'No puede escoger mas del stock';
            mensajeDiv.style.display = 'block'; 
            IDGUARDAR.disabled = true;
        }
        else if(CANTIDAD.value<0 || CANTIDAD.value>3){
            mensajeDiv.textContent = 'Solo puede escoger 3 existencias a la vez';
            mensajeDiv.style.display = 'block'; 
            IDGUARDAR.disabled = true;
        }
        else {
            mensajeDiv.textContent = "";
            IDGUARDAR.disabled = false;
        }
    } 
});
/*
*   Función para abrir la caja de diálogo con el formulario de cambiar cantidad de producto.
*   Parámetros: id (identificador del producto) y quantity (cantidad actual del producto).
*   Retorno: ninguno.
*/
const openUpdate = async (id, quantity,idmt) => {
    // Se abre la caja de diálogo que contiene el formulario.
    //ITEM_MODAL.show();
    // Se inicializan los campos del formulario con los datos del registro seleccionado.
    /*ID_DETALLE.value = id;
    CANTIDAD.value = quantity;*/


    const FORM = new FormData();
    FORM.append('idModeloTalla', idmt);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MODELOTALLAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        // Se prepara el formulario.
        ITEM_MODAL.show();
        ITEM_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_DETALLE.value = id;
        CANTIDAD.value = quantity;
        ID_MODELO_TALLA.value = ROW.id_modelo_talla;
        STOCK_INFO.textContent = 'Existencias disponibles '+ROW.stock_modelo_talla;
    } else {
        sweetAlert(2, DATA.error, false);
    }

}

/*
*   Función asíncrona para mostrar un mensaje de confirmación al momento de finalizar el pedido.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function finishOrder() {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de finalizar el pedido?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para finalizar el pedido en proceso.
        const DATA = await fetchData(PEDIDO_API, 'finishOrder');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

/*
*   Función asíncrona para mostrar un mensaje de confirmación al momento de eliminar un producto del carrito.
*   Parámetros: id (identificador del producto).
*   Retorno: ninguno.
*/
async function openDelete(id) {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de remover el producto?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define un objeto con los datos del producto seleccionado.
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        // Petición para eliminar un producto del carrito de compras.
        const DATA = await fetchData(PEDIDO_API, 'deleteDetail', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            readDetail();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

