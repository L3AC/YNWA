// Constante para establecer el formulario de registrar cliente.
const CLIENTE_API = 'services/public/cliente.php';
const SIGNUP_FORM = document.getElementById('signupForm'),
CORREO_CLIENTE = document.getElementById('correoCliente'),
ALIAS_CLIENTE = document.getElementById('usuarioCliente'),
MENSAJEDIV = document.getElementById('mensajeDiv'),
MENSAJEMAIL = document.getElementById('mensajeMail'),
IDGUARDAR = document.getElementById('idGuardar');
// Llamada a la función para establecer la mascara del campo teléfono.


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se asigna como título la categoría de los productos.
    MAIN_TITLE.textContent = 'Crear cuenta';
    // LLamada a la función para asignar el token del reCAPTCHA al formulario.
    reCAPTCHA();
});

// Método del evento para cuando se envía el formulario de registrar cliente.
IDGUARDAR.addEventListener('click', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar un cliente.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'login.html');
    } else if (DATA.recaptcha) {
        sweetAlert(2, DATA.error, false, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
        // Se genera un nuevo token cuando ocurre un problema.
        reCAPTCHA();
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

/*
*   Función para obtener un token del reCAPTCHA y asignarlo al formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function reCAPTCHA() {
    // Método para generar el token del reCAPTCHA.
    grecaptcha.ready(() => {
        // Constante para establecer la llave pública del reCAPTCHA.
        const PUBLIC_KEY = '6LdBzLQUAAAAAJvH-aCUUJgliLOjLcmrHN06RFXT';
        // Se obtiene un token para la página web mediante la llave pública.
        grecaptcha.execute(PUBLIC_KEY, { action: 'homepage' }).then((token) => {
            // Se asigna el valor del token al campo oculto del formulario
            document.getElementById('gRecaptchaResponse').value = token;
        });
    });
}