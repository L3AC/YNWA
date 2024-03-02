/*
*   Controlador es de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/public/cliente.php';
const MARCA_API = 'services/public/marca.php';
// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.style.paddingTop = '75px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'YNWA';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se comprueba si el usuario está autenticado para establecer el encabezado respectivo.
    if (DATA.session) {
        // Se verifica si la página web no es el inicio de sesión, de lo contrario se direcciona a la página web principal.
        if (!location.pathname.endsWith('login.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
                <header>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" style="background-color: #CCC8AA" >
                        <div class="container">
                            <a class="navbar-brand" href="index.html"><img src="../../resources/img/logo.png" height="60" alt="YNWA" ></a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav ms-auto">
                                
                                <div class="col-3 nav-link">
                                    <div class="">
                                        <input id="nombreMarca" type="text" name="nombreMarca" class="form-control"
                                        placeholder="Busqueda" >
                                    </div>
                                </div>
                                    <li class="nav-item dropdown ">
                                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"
                                         href="index.html"><i class="bi bi-tags-fill"></i> Marcas</a>
                                        <ul class="dropdown-menu" id="listmarca">
                                        </ul>
                                    </li>
                                    <a class="nav-link" href="cart.html"><i class="bi bi-cart"></i> Carrito</a>
                                    <a class="nav-link" href="cart.html"><i class="bi bi-clock-history"></i> Historial</a>
                                    <a class="nav-link" href="cart.html"><i class="bi bi-person-fill"></i>Cuenta</a>
                                    <a class="nav-link" href="#" onclick="logOut()"><i class="bi bi-box-arrow-left"></i> Cerrar sesión</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            `);

            const LISTA_MARCA = document.getElementById('listmarca');
            const DATA = await fetchData(MARCA_API, 'readAllActive');
            if (DATA.status) {
                // Se inicializa el contenedor de productos.
                LISTA_MARCA.innerHTML = '';
                // Se recorre el conjunto de registros fila por fila a través del objeto row.
                DATA.dataset.forEach(row => {
                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                    LISTA_MARCA.innerHTML += `
                        <li><a class="dropdown-item" 
                        href="products.html?id=${row.id_marca}&nombre=${row.descripcion_marca}">
                        ${row.descripcion_marca}</a></li>
                    `;
                });
            } else {
                // Se presenta un mensaje de error cuando no existen datos para mostrar.
                LISTA_MARCA.innerHTML = `<li><a class="dropdown-item" >No existen marcas</a></li>`;
            }


            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status) {
                // Se asigna como título principal la categoría de los productos.
                MAIN_TITLE.textContent = `Categoría: ${PARAMS.get('nombre')}`;
                // Se inicializa el contenedor de productos.
                PRODUCTOS.innerHTML = '';
                // Se recorre el conjunto de registros fila por fila a través del objeto row.
                DATA.dataset.forEach(row => {
                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                    PRODUCTOS.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="${row.nombre_producto}">
                        <div class="card-body">
                            <h5 class="card-title">${row.nombre_producto}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Precio unitario (US$) ${row.precio_producto}</li>
                            <li class="list-group-item">Existencias ${row.existencias_producto}</li>
                        </ul>
                        <div class="card-body text-center">
                            <a href="detail.html?id=${row.id_producto}" class="btn btn-primary">Ver detalle</a>
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
            location.href = 'index.html';
        }
    } else {
        // Se agrega el encabezado de la página web antes del contenido principal.
        MAIN.insertAdjacentHTML('beforebegin', `
                <header>
                <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" style="background-color: #CCC8AA" >
                    <div class="container">
                        <a class="navbar-brand" href="index.html"><img src="../../resources/img/logo.png" height="60" alt="YNWA" ></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav ms-auto">
                            
                            <div class="col-3 nav-link">
                                <div class="">
                                    <input id="nombreMarca" type="text" name="nombreMarca" class="form-control"
                                    placeholder="Busqueda" >
                                </div>
                            </div>

                                <li class="nav-item dropdown ">
                                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"
                                    href="index.html"><i class="bi bi-tags-fill"></i> Marcas</a>
                                    <ul class="dropdown-menu" id="listmarca">
                                        
                                    </ul>
                                </li>
                                <a class="nav-link" href="cart.html"><i class="bi bi-cart"></i> Carrito</a>
                                <a class="nav-link" href="cart.html"><i class="bi bi-clock-history"></i> Historial</a>
                                <a class="nav-link" href="cart.html"><i class="bi bi-person-fill"></i>Cuenta</a>
                                <a class="nav-link" href="#" onclick="logOut()"><i class="bi bi-box-arrow-left"></i> Cerrar sesión</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        `);
        const LISTA_MARCA = document.getElementById('listmarca');
        const DATA = await fetchData(MARCA_API, 'readAllActive');
        if (DATA.status) {
            // Se inicializa el contenedor de productos.
            LISTA_MARCA.innerHTML = '';
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                LISTA_MARCA.innerHTML += `
                    <li><a class="dropdown-item" 
                    href="products.html?id=${row.id_marca}&nombre=${row.descripcion_marca}">
                    ${row.descripcion_marca}</a></li>
                `;
            });
        } else {
            // Se presenta un mensaje de error cuando no existen datos para mostrar.
            LISTA_MARCA.innerHTML = `<li><a class="dropdown-item" >No existen marcas</a></li>`;
        }
    }
    // Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
                <footer>
                <nav class="navbar fixed-bottom" id="foot">
                <div class="container-fluid">
                    <div>
                        <h6>YNWA</h6>
                        <p><i class="bi bi-c-square"></i>2024 Todos los derechos reservados</p>
                    </div>
                    <div>
                        <h6>Contáctanos</h6>
                        <p><i class="bi bi-envelope"></i> YNWA@gmail.com</p>
                    </div>
                </div>
            </nav>
                </footer>
            `);
}