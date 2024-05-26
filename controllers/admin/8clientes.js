// Constante para completar la ruta de la API.
const CLIENTE_API = 'services/admin/8clientes.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CLIENTE = document.getElementById('idCliente'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    APELLIDO_CLIENTE = document.getElementById('apellidoCliente'),
    CORREO_CLIENTE = document.getElementById('correoCliente'),
    DIRECCION_CLIENTE = document.getElementById('direccionCliente'),
    ALIAS_CLIENTE = document.getElementById('aliasCliente'),
    CLAVE_CLIENTE = document.getElementById('claveCliente'),
    ESTADO_CLIENTE = document.getElementById('estadoCliente'),
    CONFIRMAR_CLAVE = document.getElementById('confirmarClave'),
    MENSAJEDIV = document.getElementById('mensajeDiv'),
    INPUTSEARCH = document.getElementById('inputsearch'),
    MENSAJEMAIL = document.getElementById('mensajeMail'),
    IDGUARDAR = document.getElementById('idGuardar');
    //Variable para poner un tiempo de espera
    let timeout_id;


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar clientes';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});


// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CLIENTE.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTE_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        ID_CLIENTE.value = null;
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
    const DATA = await fetchData(CLIENTE_API, 'searchRows', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
             // Se establece un icono para el estado 
            (row.estado_cliente) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.apellido_cliente}</td>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.usuario_cliente}</td>
                    <td><i class="${icon}"></i></td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_cliente})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_cliente})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
        INPUTSEARCH.value='';
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
    MODAL_TITLE.textContent = 'Crear registro';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    ALIAS_CLIENTE.disabled = false;
    CLAVE_CLIENTE.disabled = false;
    CONFIRMAR_CLAVE.disabled = false;

    async function checkExistence(inputElement, formDataKey, apiEndpoint, messageElement) {
        const FORM = new FormData();
        FORM.append(formDataKey, inputElement.value);
        const DATA = await fetchData(CLIENTE_API, apiEndpoint, FORM);
    
        if (DATA.status === 1) {
            messageElement.textContent = `Ya existe el ${formDataKey}`;
            messageElement.style.display = 'block';
            IDGUARDAR.disabled = true;
        } else {
            messageElement.textContent = '';
            IDGUARDAR.disabled = false;
        }
        IDGUARDAR.disabled = MENSAJEMAIL.textContent !== '' || MENSAJEDIV.textContent !== '';
    }
    
    ALIAS_CLIENTE.addEventListener('input', () => {
        checkExistence(ALIAS_CLIENTE, 'usuario', 'readExist', MENSAJEDIV);
    });
    
    CORREO_CLIENTE.addEventListener('input', () => {
        checkExistence(CORREO_CLIENTE, 'correo', 'readExistMail', MENSAJEMAIL);
    });
    
    /*ALIAS_CLIENTE.addEventListener('input', async function ()  {
        const FORM = new FormData();
        FORM.append('usuario', ALIAS_CLIENTE.value);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(CLIENTE_API, 'readExist', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status === 1) {
            MENSAJEDIV.textContent = 'Ya existe el usuario';
            MENSAJEDIV.style.display = 'block'; 
            IDGUARDAR.disabled = true;
        } else {
            MENSAJEDIV.textContent = "";
            IDGUARDAR.disabled = false;
        }
    });*/
}
//Función asíncrona para preparar el formulario al momento de actualizar un registro.
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCliente', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTE_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar registro';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        ALIAS_CLIENTE.disabled = true;
        CLAVE_CLIENTE.disabled = true;
        CONFIRMAR_CLAVE.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        DIRECCION_CLIENTE.value = ROW.direccion_cliente;
        ID_CLIENTE.value = ROW.id_cliente;
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        CORREO_CLIENTE.value = ROW.email_cliente;
        ALIAS_CLIENTE.value = ROW.usuario_cliente;
        ESTADO_CLIENTE.checked=ROW.estado_cliente;

        CORREO_CLIENTE.addEventListener('input', async function () {
            const FORM = new FormData();
            FORM.append('correo', CORREO_CLIENTE.value);
            // Petición para obtener los datos del registro solicitado.
            const DATA = await fetchData(CLIENTE_API, 'readExistMail', FORM);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status === 1) {
                if (CORREO_CLIENTE.value == ROW.email_cliente) {
                    MENSAJEMAIL.textContent = "";
                    IDGUARDAR.disabled = false;
                }
                else {
                    MENSAJEMAIL.textContent = 'Este correo ya está usado';
                    MENSAJEMAIL.style.display = 'block';
                    IDGUARDAR.disabled = true;
                }

            } else {
                MENSAJEMAIL.textContent = "";
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
    const RESPONSE = await confirmAction('¿Desea eliminar el cliente de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCliente', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CLIENTE_API, 'deleteRow', FORM);
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