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

const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    SAVE_FORM2 = document.getElementById('saveForm2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2'),
    COMENTARIO = document.getElementById('contenidoComentario'),
    FECHA_COMENTARIO = document.getElementById('fechaComentario'),
    DIVSTARS = document.getElementById('divstars');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Historial de compras';
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
    const DATA = await fetchData(PEDIDO_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el cuerpo de la tabla.
        TABLE_BODY.innerHTML = '';
        // Se declara e inicializa una variable para calcular el importe por cada producto.
        let subtotal = 0;
        // Se declara e inicializa una variable para sumar cada subtotal y obtener el monto final a pagar.
        let total = 0;
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(async row => {
            subtotal = row.precio_modelo_talla * row.cantidad_detalle_pedido;
            total += subtotal;

            /*PARA VERIFICAR SI YA HAY UN COMENTARIO*/
            btnComentario = '';
            const FORM3 = new FormData();
            FORM3.append('idDetalle', row.id_detalle);
            // Petición para obtener los datos del registro solicitado.
            const DATA3 = await fetchData(COMENTARIO_API, 'readByIdDetalle', FORM3);
            /*const ROW = DATA3.dataset;
            console.log(ROW.id_comentario);*/
            if (DATA3.dataset.length > 0) {
                btnComentario = `openRead(${DATA3.dataset[0].id_comentario})`;
                console.log(DATA3.dataset[0].id_comentario);
            } else {
                btnComentario = `openCreate(${row.id_detalle})`;
            }

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
                        <button type="button" class="btn btn-warning" onclick="${btnComentario}">
                            <i class="bi bi-chat-dots"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, false, 'index.html');
    }
}
CANTIDAD.addEventListener('input', async function () {
    const FORM = new FormData();
    FORM.append('idModeloTalla', ID_MODELO_TALLA.value);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MODELOTALLAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status === 1) {
        const ROW = DATA.dataset;
        if (CANTIDAD.value > ROW.stock_modelo_talla) {
            mensajeDiv.textContent = 'No puede escoger mas del stock';
            mensajeDiv.style.display = 'block';
            IDGUARDAR.disabled = true;
        }
        else if (CANTIDAD.value < 0 || CANTIDAD.value > 3) {
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
const openRead = async (id) => {

    const FORM = new FormData();
    FORM.append('idComentario', id);
    console.log(id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(COMENTARIO_API, 'readByIdComentario', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        // Se prepara el formulario.
        SAVE_MODAL2.show();
        SAVE_FORM2.reset();
        // Se inicializan los campos con los datos.
        IDGUARDAR.disabled = false;
        const ROW = DATA.dataset;
        COMENTARIO.value = ROW.contenido_comentario;
        FECHA_COMENTARIO.value = ROW.fecha_comentario;
        DIVSTARS.innerHTML =
            `<div class="rating rating-${row.id_comentario}">
            <input type="radio" id="star-1-${row.id_comentario}" name="star-radio-${row.id_comentario}" value="1" data-rating="1">
            <label for="star-1-${row.id_comentario}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-2-${row.id_comentario}" name="star-radio-${row.id_comentario}" value="2" data-rating="2">
            <label for="star-2-${row.id_comentario}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-3-${row.id_comentario}" name="star-radio-${row.id_comentario}" value="3" data-rating="3">
            <label for="star-3-${row.id_comentario}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-4-${row.id_comentario}" name="star-radio-${row.id_comentario}" value="4" data-rating="4">
            <label for="star-4-${row.id_comentario}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-5-${row.id_comentario}" name="star-radio-${row.id_comentario}" value="5" data-rating="5">
            <label for="star-5-${row.id_comentario}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
        </div>`;
        let ratingValue = parseInt(row.puntuacion_comentario);
        let stars = document.querySelectorAll(`.rating-${row.id_comentario} input[type="radio"]`);

        stars.forEach((star, index) => {
            if (index < 6 - ratingValue) {
                star.checked = true;
            } else {
                star.checked = false;
            }
        });
    } else {
        sweetAlert(2, DATA.error, false);
    }

}
const openCreate = async (id) => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Comentario';
    ID_DETALLE.value = id;
    // Se prepara el formulario.
    SAVE_FORM2.reset();
    DIVSTARS.innerHTML =
        `<div class="rating">
            <input type="radio" id="star-1" name="star-radio" value="star-1">
            <label for="star-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-2" name="star-radio" value="star-1">
            <label for="star-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-3" name="star-radio" value="star-1">
            <label for="star-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-4" name="star-radio" value="star-1">
            <label for="star-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
            <input type="radio" id="star-5" name="star-radio" value="star-1">
            <label for="star-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
            </label>
        </div>`;
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

