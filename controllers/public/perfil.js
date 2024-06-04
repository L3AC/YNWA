// Constantes para establecer los elementos del formulario de editar perfil.
const CLIENTE_API = 'services/public/cliente.php';
const PROFILE_FORM = document.getElementById('profileForm'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    APELLIDO_CLIENTE = document.getElementById('apellidoCliente'),
    CORREO_CLIENTE = document.getElementById('correoCliente'),
    ALIAS_CLIENTE = document.getElementById('aliasCliente'),
    DIR_CLIENTE = document.getElementById('direccionCliente'),
    MENSAJEDIV = document.getElementById('mensajeDiv'),
    MENSAJEMAIL = document.getElementById('mensajeMail'),
    IDGUARDAR = document.getElementById('idGuardar');
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = '';
    // Petición para obtener los datos del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
        const ROW = DATA.dataset;
        console.log (ROW.nombre_cliente);
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        CORREO_CLIENTE.value = ROW.email_cliente;
        ALIAS_CLIENTE.value = ROW.usuario_cliente;
        DIR_CLIENTE.value = ROW.direccion_cliente;
    } else {
        sweetAlert(2, DATA.error, null);
    }
});
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

// Método del evento para cuando se envía el formulario de editar perfil.
PROFILE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PROFILE_FORM);
    // Petición para actualizar los datos personales del usuario.
    const DATA = await fetchData(USER_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Mètodo del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(USER_API, 'changePassword', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        PASSWORD_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de cambiar la constraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openPassword = () => {
    // Se abre la caja de diálogo que contiene el formulario.
    PASSWORD_MODAL.show();
    // Se restauran los elementos del formulario.
    PASSWORD_FORM.reset();
}