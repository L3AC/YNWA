// Constantes para completar las rutas de la API.
const MODELO_API = 'services/admin/2modelos.php',
    MARCA_API = 'services/admin/1marcas.php',
    TALLA_API = 'services/admin/3tallas.php',
    MODELOTALLAS_API = 'services/admin/11modelotallas.php';
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
    ID_MODELO = document.getElementById('idModelo'),
    NOMBRE_MODELO = document.getElementById('nombreModelo'),
    DESCRIPCION_MODELO = document.getElementById('descripcionProducto'),
    PRECIO_MODELO = document.getElementById('precioProducto'),
    EXISTENCIAS_MODELO = document.getElementById('existenciasProducto'),
    ESTADO_MODELO = document.getElementById('estadoModelo');
IMAGEN_MODELO = document.getElementById('imagenModelo'),
    IMAGEN_PRE = document.getElementById('imgPre'),
    INPUTSEARCH = document.getElementById('inputsearch'),
    ADD_MODELOTALLA = document.getElementById('addModeloTalla');

// Constantes para establecer los elementos del formulario de modelo tallas.
const SAVE_TREMODAL = new bootstrap.Modal('#savetreModal'),
    TREMODAL_TITLE = document.getElementById('tremodalTitle');
const SAVE_TREFORM = document.getElementById('savetreForm'),
    SELECTALLA = document.getElementById('selectTalla'),
    ID_MODELOTALLA = document.getElementById('idModeloTalla'),
    SUB_IDMODELO = document.getElementById('subidModelo'),
    PRECIO_MODELOTALLA = document.getElementById('precioModeloTalla'),
    TALLA_MODELOTALLA = document.getElementById('tallaModeloTalla'),
    STOCK_MODELOTALLA = document.getElementById('stockModeloTalla'),
    SUB_INPUTSEARCH = document.getElementById('subInputSearch'),
    BTN_TREFORM = document.getElementById('btnTreForm');
//Variable para poner un tiempo de espera
let timeout_id;

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar modelos';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_MODELO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(MODELO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        ID_MODELO.value = null;
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

//Función asíncrona para llenar la tabla con los registros disponibles.
const fillTable = async () => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    const FORM = new FormData();
    FORM.append('valor', INPUTSEARCH.value);
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MODELO_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del modelo.
            (row.estado_modelo) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/modelos/${row.foto_modelo}" height="50" width="80"></td>
                    <td>${row.descripcion_modelo}</td>
                    <td>${row.marca}</td>
                    <td><i class="${icon}"></i></td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_modelo})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_modelo})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                        <button type="button" class="btn btn-warning" onclick="openReport(${row.id_modelo})">
                            <i class="bi bi-filetype-pdf"></i>
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
    ID_MODELO.value = null;
    SAVE_MODAL.show();
    IMAGEN_PRE.innerHTML = '';
    MODAL_TITLE.textContent = 'Crear registro';
    SUBTABLE.hidden = true;

    // Se prepara el formulario.
    SAVE_FORM.reset();
    fillSelect(MARCA_API, 'readAll', 'marcaModelo');
}
/*CARGAR VISTA PREVIA DE LA IMAGEN ESCOGIDA*/
IMAGEN_MODELO.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        imgPre.innerHTML = '';
        imgPre.appendChild(img);
        // Establecer los estilos CSS de la imagen
        img.style.maxWidth = '300px';
        img.style.maxHeight = 'auto';
        img.style.margin = '20px auto';
    };
    reader.readAsDataURL(file);
});

//Función asíncrona para preparar el formulario al momento de actualizar un registro.
const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idModelo', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MODELO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        SUBTABLE.hidden = false;
        MODAL_TITLE.textContent = 'Actualizar registro';
        SUBMODAL_TITLE.textContent = 'Tallas del modelo';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_MODELO.value = ROW.id_modelo;
        NOMBRE_MODELO.value = ROW.descripcion_modelo;
        ESTADO_MODELO.checked = ROW.estado_modelo;
        ADD_MODELOTALLA.innerHTML = `
        <button type="button" class="btn btn-primary" onclick="opensubCreate(${ROW.id_modelo})">
            <i class="bi bi-plus-square-fill"></i>
        </button>`;
        IMAGEN_PRE.style.maxWidth = '300px';
        IMAGEN_PRE.style.maxHeight = 'auto';
        IMAGEN_PRE.style.margin = '20px auto';
        IMAGEN_PRE.innerHTML = '';
        IMAGEN_PRE.insertAdjacentHTML(
            "beforeend",
            `<img src="${SERVER_URL}images/modelos/${ROW.foto_modelo}">` // Backticks para img variable
        );

        fillSelect(MARCA_API, 'readAll', 'marcaModelo', ROW.id_marca);
        fillSubTable(SEARCHSUB_FORM);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

//Función asíncrona para eliminar un registro.
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el modelo de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idModelo', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(MODELO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
// Método del evento para cuando se envía el formulario de guardar.
SAVE_TREFORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    const FORM = new FormData(SAVE_TREFORM);
    (ID_MODELOTALLA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    /*COMO 
    (ID_MODELOTALLA.value) ? FORM.append('idModeloTalla', id) : action = 'createRow';*/
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(MODELOTALLAS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_TREMODAL.hide();
        SAVE_MODAL.show();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        ID_MODELOTALLA.value = null;
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillSubTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

//Función asíncrona para llenar la tabla con los registros disponibles.
const fillSubTable = async () => {
    // Se inicializa el contenido de la tabla.
    SUBROWS_FOUND.textContent = '';
    SUBTABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    const FORM = new FormData();
    FORM.append('valor', SUB_INPUTSEARCH.value);
    FORM.append('idModelo', ID_MODELO.value);
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MODELOTALLAS_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            SUBTABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.talla}</td>
                    <td>${row.stock_modelo_talla}</td>
                    <td>$ ${row.precio_modelo_talla}</td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="opensubUpdate(${row.id_modelo_talla})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="opensubDelete(${row.id_modelo_talla})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                        
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        SUBROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);

    }
}
//BUSCADOR EN TIEMPO REAL DE LA TABLA DENTRO DEL MODAL
SUB_INPUTSEARCH.addEventListener('input', function () {
    clearTimeout(timeout_id);
    timeout_id = setTimeout(async function () {
        fillSubTable();
    }, 50); // Delay de 50ms
});
//ABRIR UN MODAL DESDE EL HTML
const subClose = () => {
    SAVE_MODAL.show();
}

//Función para preparar el formulario al momento de insertar un registro dentro del modal.
const opensubCreate = (id) => {
    SAVE_MODAL.hide();
    SAVE_TREMODAL.show();
    //SELECTALLA.hidden = false;
    SUB_IDMODELO.value = id;
    //SAVE_MODAL.hidden = false;
    TREMODAL_TITLE.textContent = 'Agregar talla';
    // Se prepara el formulario.
    console.log('SUB ' + SUB_IDMODELO.value);
    SAVE_TREFORM.reset();
    //EXISTENCIAS_MODELO.disabled = false;
    fillSelect(TALLA_API, 'readAllById', 'tallaModeloTalla', null, id, null, BTN_TREFORM);
}

//Función asíncrona para preparar el formulario al momento de actualizar un registro dentro del modal.
const opensubUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    SAVE_MODAL.hide();
    //SELECTALLA.hidden = true;
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
        SUB_IDMODELO.value = ROW.id_modelo;
        STOCK_MODELOTALLA.value = ROW.stock_modelo_talla;
        PRECIO_MODELOTALLA.value = ROW.precio_modelo_talla;

        fillSelect(TALLA_API, 'readAllByIdTalla', 'tallaModeloTalla', ROW.id_talla, ROW.id_modelo, ROW.id_talla, BTN_TREFORM);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

//Función asíncrona para eliminar un registro.
const opensubDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea inactivar el registro de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idModeloTalla', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(MODELOTALLAS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillSubTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

//Función para abrir un reporte automático de un registro.
const openReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/tallas_modelo.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idModelo', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

const openTopReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/modelos_top.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}