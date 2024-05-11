// Constantes para completar las rutas de la API.
const NOTICIA_API = 'services/admin/6noticias.php',
    TIPONOTICIA_API = 'services/admin/5tiponoticias.php';
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
    ID_NOTICIA = document.getElementById('idNoticia'),
    NOMBRE_NOTICIA = document.getElementById('tituloNoticia'),
    CONTENIDO_NOTICIA = document.getElementById('contenidoNoticia'),
    IMAGEN_PRE = document.getElementById('imgPre'),
    IMAGEN_NOTICIA = document.getElementById('imagenNoticia'),
    INPUTSEARCH = document.getElementById('inputsearch'),
    ESTADO_NOTICIA = document.getElementById('estadoNoticia');
    let TIMEOUT_ID;

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar noticias';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_NOTICIA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(NOTICIA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        ID_NOTICIA.value = null;
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async () => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    const FORM = new FormData();
    FORM.append('valor', INPUTSEARCH.value);
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(NOTICIA_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del registro.
            (row.estado_noticia) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/noticias/${row.foto_noticia}" height="50"></td>
                    <td>${row.titulo_noticia}</td>
                    <td>${row.fecha}</td>
                    <td><i class="${icon}"></i></td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_noticia})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_noticia})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        // sweetAlert(4, DATA.error, true);
    }
}

/*Busqueda en tiempo real*/
INPUTSEARCH.addEventListener('input', function () {
    clearTimeout(TIMEOUT_ID);
    TIMEOUT_ID = setTimeout(async function () {
        fillTable();
    }, 50); // Delay de 500ms
});
/*CARGAR VISTA PREVIA DE LA IMAGEN ESCOGIDA*/
IMAGEN_NOTICIA.addEventListener('change', function (event) {
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
/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear registro';

    // Se prepara el formulario.
    SAVE_FORM.reset();
    //EXISTENCIAS_NOTICIA.disabled = false;
    fillSelect(TIPONOTICIA_API, 'readAll', 'tipoNoticia');
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idNoticia', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(NOTICIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        MODAL_TITLE.textContent = 'Actualizar registro';
        const ROW = DATA.dataset;
        ID_NOTICIA.value = ROW.id_noticia;
        NOMBRE_NOTICIA.value = ROW.titulo_noticia;
        CONTENIDO_NOTICIA.value = ROW.contenido_noticia;
        ESTADO_NOTICIA.checked = ROW.estado_noticia;

        IMAGEN_PRE.style.maxWidth = '300px';
        IMAGEN_PRE.style.maxHeight = 'auto';
        IMAGEN_PRE.style.margin = '20px auto';
        IMAGEN_PRE.innerHTML = '';
        IMAGEN_PRE.insertAdjacentHTML(
            "beforeend",
            `<img src="${SERVER_URL}images/noticias/${ROW.foto_noticia}">` // Backticks para img variable
        );
        fillSelect(TIPONOTICIA_API, 'readAll', 'tipoNoticia', ROW.id_tipo_noticia);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}
/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea inactivar el registro de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idModelo', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(NOTICIA_API, 'deleteRow', FORM);
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

/*
*   Función para abrir un reporte automático de registros por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/registros.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}