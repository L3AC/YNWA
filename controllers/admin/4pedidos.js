// Constantes para completar las rutas de la API.
const PEDIDO_API = 'services/admin/4pedidos.php',
    DETALLEPEDIDO_API = 'services/admin/12detallepedidos.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm'),
    SEARCHSUB_FORM = document.getElementById('searchsubForm');
// Constantes para establecer el contenido de la tabla.
const SUBTABLE_HEAD = document.getElementById('subheaderT'),
    SUBTABLE = document.getElementById('subtable'),
    SUBTABLE_BODY = document.getElementById('subtableBody'),
    TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound'),
    SUBROWS_FOUND = document.getElementById('subrowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    SUBMODAL_TITLE = document.getElementById('submodalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    INPUTSEARCH = document.getElementById('inputsearch'),
    SUBINPUTSEARCH = document.getElementById('subinputsearch'),
    ID_PEDIDO = document.getElementById('idPedido'),
    CLIENTE_PEDIDO = document.getElementById('clientePedido'),
    FECHA_PEDIDO = document.getElementById('fechaPedido'),
    FORMA_PAGO = document.getElementById('formaPago'),
    ESTADO_PEDIDO = document.getElementById('estadoPedido');
    let ESTADO_BUSQUEDA = "Pendiente",
    timeout_id;

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Pedidos';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable(ESTADO_BUSQUEDA);
});


// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    //(ID_PEDIDO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PEDIDO_API, 'updateRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        ID_PEDIDO.value = null;
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable(ESTADO_BUSQUEDA);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

//Función asíncrona para llenar la tabla con los registros disponibles.
const fillTable = async (estado=null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    ESTADO_BUSQUEDA=estado;
    // Se verifica la acción a realizar.
    const FORM = new FormData();
    FORM.append('valor', INPUTSEARCH.value);
    FORM.append('estado',estado); 
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDO_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            console.log(DATA.dataset);
            // Se establece un icono para el estado del PEDIDO.
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.cliente}</td>
                    <td>${row.forma_pago_pedido}</td>
                    <td>${row.fecha}</td>
                    <td>${row.estado_pedido}</i></td>
                    <td>
                        <button type="button" class="btn btn-success" onclick="openUpdate(${row.id_pedido})">
                            <i class="bi bi-info-circle"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}
/*Busqueda en tiempo real*/
INPUTSEARCH.addEventListener('input', function () {
    clearTimeout(timeout_id);
    timeout_id = setTimeout(async function () {
        fillTable();
    }, 50); // Delay de 50ms
});

//Función para preparar el formulario al momento de insertar un registro.
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    IMAGEN_PRE.innerHTML = '';
    MODAL_TITLE.textContent = 'Crear PEDIDO';
    SUBTABLE.hidden = true;
    // Se prepara el formulario.
    SAVE_FORM.reset();
    //EXISTENCIAS_PEDIDO.disabled = false;
    fillSelect(MARCA_API, 'readAll', 'marcaModelo');
}


//Función asíncrona para preparar el formulario al momento de actualizar un registro.
const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idPedido', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PEDIDO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        SUBTABLE.hidden = false;
        MODAL_TITLE.textContent = 'Información del pedido';
        SUBMODAL_TITLE.textContent = 'Detalle del pedido';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        CLIENTE_PEDIDO.disabled = true;
        FECHA_PEDIDO.disabled = true;
        FORMA_PAGO.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PEDIDO.value = ROW.id_pedido;
        CLIENTE_PEDIDO.value = ROW.cliente;
        FECHA_PEDIDO.value = ROW.fecha;
        FORMA_PAGO.value = ROW.forma_pago_pedido;
        //SE COLOCA EL VALOR QUE VIENE DE LA BASE AL SELECT EN EL HTML
        for (var i = 0; i < ESTADO_PEDIDO.options.length; i++) {
            // Si el valor de la opción es igual al valor que quieres seleccionar
            if (ESTADO_PEDIDO.options[i].value === ROW.estado_pedido) {
                // Seleccionar la opción
                ESTADO_PEDIDO.selectedIndex = i;
                break; // Salir del bucle una vez seleccionada la opción
            }
        }
        fillSubTable(SEARCHSUB_FORM);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

//Función asíncrona para eliminar un registro.
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea inactivar el PEDIDO de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idModelo', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PEDIDO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable(ESTADO_BUSQUEDA);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
//Función asíncrona para llenar la tabla con los registros disponibles.
const fillSubTable = async () => {
    SUBROWS_FOUND.textContent = '';
    SUBTABLE_BODY.innerHTML = '';
    const FORM = new FormData();
    FORM.append('valor', SUBINPUTSEARCH.value);
    FORM.append('idPedido', ID_PEDIDO.value);
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DETALLEPEDIDO_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            SUBTABLE_BODY.innerHTML += `
                <tr>
                <td>${row.descripcion_modelo}</td>
                <td>${row.descripcion_marca}</td>
                <td>${row.descripcion_talla}</td>
                <td>$ ${row.precio_modelo_talla}</td>
                <td>${row.cantidad_detalle_pedido}</td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        SUBROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}
/*Busqueda en tiempo real dentro del modal*/
SUBINPUTSEARCH.addEventListener('input', function () {
    clearTimeout(timeout_id);
    timeout_id = setTimeout(async function () {
        fillSubTable();
    }, 50); // Delay de 50ms
});
//ABRIR EL MODAL DESDE EL HTML
const subClose = () => {
    SAVE_MODAL.show();
}

const opensubCreate = () => {
    SAVE_MODAL.hide();
    SAVE_TREMODAL.show();
    SELECTALLA.hidden = false;
    //SAVE_MODAL.hidden = false;
    TREMODAL_TITLE.textContent = 'Agregar talla';
    // Se prepara el formulario.
    SAVE_TREFORM.reset();
    //EXISTENCIAS_PEDIDO.disabled = false;
    fillSelect(TALLA_API, 'readAll', 'tallaModeloTalla');
}

//Función asíncrona para preparar el formulario al momento de actualizar un registro.
const opensubUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    SAVE_MODAL.hide();
    SELECTALLA.hidden = true;
    const FORM = new FormData();
    FORM.append('idModeloTalla', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MODELOTALLAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_TREMODAL.show();
        TREMODAL_TITLE.textContent = 'Tallas del modelo';
        // Se prepara el formulario.
        SAVE_TREFORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_MODELOTALLA.value = ROW.id_modelo_talla;
        console.log(ROW.stock + ' ' + ROW.precio_modelo_talla);
        STOCK_MODELOTALLA.value = ROW.stock_modelo_talla;
        PRECIO_MODELOTALLA.value = ROW.precio_modelo_talla;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}
//Función asíncrona para eliminar un registro.
const opensubDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea inactivar el PEDIDO de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idModelo', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PEDIDO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable(ESTADO_BUSQUEDA);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


/*
*   Función para abrir un reporte automático de PEDIDOs por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/PEDIDOs.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}