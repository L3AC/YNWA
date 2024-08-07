// Constantes para completar las rutas de la API.
const MARCA_API = 'services/admin/1marcas.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    INPUTSEARCH = document.getElementById('inputsearch'),
    ID_MARCA = document.getElementById('idMarca'),
    NOMBRE_MARCA = document.getElementById('nombreMarca'),
    ESTADO_MARCA = document.getElementById('estadoMarca'),
    MENSAJEDIV = document.getElementById('mensajeDiv'),
    IDGUARDAR = document.getElementById('idGuardar');
//Variable para poner un tiempo de espera
let timeout_id;

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar marcas';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_MARCA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(MARCA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        //SE VACIA LA VARIABLE ID PARA NO GENERAR ERROR CON EL FORMULARIO
        ID_MARCA.value = null;
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
    const DATA = await fetchData(MARCA_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del registro.
            (row.estado_marca) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.descripcion_marca}</td>
                    <td><i class="${icon}"></i></td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_marca})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_marca})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                        <button type="button" class="btn btn-warning" onclick="openReport(${row.id_marca})">
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
        INPUTSEARCH.value = '';
        fillTable();
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
    MODAL_TITLE.textContent = 'Agregar registro';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    NOMBRE_MARCA.addEventListener('input', async function () {
        const FORM = new FormData();
        FORM.append('valor', NOMBRE_MARCA.value);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(MARCA_API, 'readExist', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status === 1) {
            MENSAJEDIV.textContent = 'Esta marca ya existe';
            MENSAJEDIV.style.display = 'block';
            IDGUARDAR.disabled = true;

        } else {
            MENSAJEDIV.textContent = "";
            IDGUARDAR.disabled = false;
        }
    });
}

//Función asíncrona para preparar el formulario al momento de actualizar un registro.
const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idMarca', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MARCA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar registro';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_MARCA.value = ROW.id_marca;
        NOMBRE_MARCA.value = ROW.descripcion_marca;
        ESTADO_MARCA.checked = ROW.estado_marca;

        NOMBRE_MARCA.addEventListener('input', async function () {
            const FORM = new FormData();
            FORM.append('valor', NOMBRE_MARCA.value);
            // Petición para obtener los datos del registro solicitado.
            const DATA = await fetchData(MARCA_API, 'readExist', FORM);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status === 1) {
                if (NOMBRE_MARCA.value == ROW.descripcion_marca) {
                    MENSAJEDIV.textContent = "";
                    IDGUARDAR.disabled = false;
                }
                else {
                    MENSAJEDIV.textContent = 'Esta marca ya existe';
                    MENSAJEDIV.style.display = 'block';
                    IDGUARDAR.disabled = true;
                }

            } else {
                MENSAJEDIV.textContent = "";
                IDGUARDAR.disabled = false;
            }
        });
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

//Función asíncrona para eliminar un registro.
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el registro de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idMarca', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(MARCA_API, 'deleteRow', FORM);
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
//Función para abrir un reporte automático de un registro.
const openReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/modelos_marca.php`);    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idMarca', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}



