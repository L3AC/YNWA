// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/public/categoria.php',
    NOTICIA_API = 'services/public/noticia.php';
CATEGORIAS = document.getElementById('categorias'),
    BTNSLIDE = document.getElementById('btnSlide'),
    CARDSLIDE = document.getElementById('cardSlide');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Productos por categoría';


    // Petición para obtener las categorías disponibles.
    const DATA2 = await fetchData(NOTICIA_API, 'readAllActive');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA2.status) {
        // Se inicializa el contenedor de categorías.
        CARDSLIDE.innerHTML = '';
        BTNSLIDE.innerHTML = '';
        let cBtn = 0;/*CONTADOR DE BOTONES DEL SLIDE*/
        let cElemento=1;/*CONTADOR DE LOS CARROUSEL DEL SLIDE*/
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA2.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            BTNSLIDE.innerHTML += `
                <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="${cBtn}" class="active"
                aria-current="true" aria-label="Slide ${cElemento}"></button>
            `;
            CARDSLIDE.innerHTML += `
                <div class="carousel-item active">
                    <img src="../../api/images/noticias/${row.foto_noticia}" 
                    class="d-block w-100 " style="height: 500px; object-fit: cover;" alt="Slide ${cElemento}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${row.titulo_noticia}?</h5>
                        <p>${row.contenido_noticia}</p>
                    </div>
                </div>
            `;
            cBtn ++;
            cElemento++;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }


    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(CATEGORIA_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        CATEGORIAS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros.
            let url = `products.html?id=${row.id_categoria}&nombre=${row.nombre_categoria}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            CATEGORIAS.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" class="card-img-top" alt="${row.nombre_categoria}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${row.nombre_categoria}</h5>
                            <p class="card-text">${row.descripcion_categoria}</p>
                            <a href="${url}" class="btn btn-primary">Ver productos</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }



});