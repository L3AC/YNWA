// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/public/producto.php',
    NOTICIA_API = 'services/public/noticia.php';
CATEGORIAS = document.getElementById('categorias'),
    BTNSLIDE = document.getElementById('btnSlide'),
    CARDSLIDE = document.getElementById('cardSlide');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Modelos Recientes';

    // Petición para obtener las categorías disponibles.
    const DATA2 = await fetchData(NOTICIA_API, 'readAllActive');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA2.status) {
        // Se inicializa el contenedor de categorías.
        CARDSLIDE.innerHTML = '';
        BTNSLIDE.innerHTML = '';
        let cBtn = 0;/*CONTADOR DE BOTONES DEL SLIDE*/
        let cElemento = 1;/*CONTADOR DE LOS CARROUSEL DEL SLIDE*/
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA2.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            BTNSLIDE.innerHTML += `
<button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="${cBtn}"
    class="${cBtn === 0 ? 'active' : ''}" aria-current="${cBtn === 0 ? 'true' : 'false'}"
    aria-label="Slide ${cElemento}"></button>

`;
            CARDSLIDE.innerHTML += `
<div class="carousel-item ${cBtn === 0 ? 'active' : ''}">
    <div class="container">

        <div class="slide">
 
            <div class="item" style="background-image: url(../../api/images/noticias/${row.foto_noticia});">
                <div class="content">
                    <div class="name">${row.titulo_noticia}</div>
                    <div class="des">${row.contenido_noticia}</div>
                </div>
            </div>
        </div>
 
        <div class="button">
            <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
            <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
 
    </div>
</div>
`;
            cBtn++;
            cElemento++;
        });

    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        // Se crean y concatenan las tarjetas con los datos de cada categoría.
        BTNSLIDE.innerHTML += `
<button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="0" class="active" aria-current="true"
    aria-label="Slide 1"></button>`;

        CARDSLIDE.innerHTML += `
<div class="carousel-item active">
    <img src="../../resources/img/carousel/img1.jpg" class="d-block w-100" alt="Slide 1">
    <div class="carousel-caption d-none d-md-block">
        <h5>¿Sabías que...?</h5>
        <p>El café reduce el riesgo de padecer Alzheimer.</p>
    </div>
</div>`;
    }


    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(CATEGORIA_API, 'readDesc');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        CATEGORIAS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            CATEGORIAS.innerHTML += `
                <div style="margin-bottom: 20px;" class="col-sm-12 col-md-6 col-lg-3">
                    <div class="car hadow">
                        <div class=""><img src="${SERVER_URL}images/modelos/${row.foto_modelo}" class="img"
                                alt="${row.descripcion_modelo}"></div>
                        <div class="title">${row.descripcion_modelo}</div>
                        <p class="marca">${row.marca}</p>
                        <div class="mmm"><a href="detail.html?id=${row.id_modelo}" class="btn"><span
                                    class="text">Comprar</span><span>Thanks!</span></a></div>
                    </div>
                </div> 

`;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }



});