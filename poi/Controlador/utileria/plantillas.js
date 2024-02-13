const HEADER = document.querySelector('header');
const FOOTER = document.querySelector('footer');

HEADER.innerHTML = `
<nav class="navbar">
<div class="container-fluid position-absolute top-0 start-0">
  <a class="navbar-brand" href="#">
    <img class="btn" src="../../Recursos/img/logo.png" alt="Bootstrap" width="90" height="80" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
    <img src="../../Recursos/img/Perfilito.png" id="io" class="position-absolute top-0 end-0" width="40" height="40">
    <div class="offcanvas offcanvas-start" style=" background-color: #F1EFEF; border-top-right-radius: 30px; border-bottom-right-radius: 30px;" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header">
          <h3 class="offcanvas-title" id="staticBackdropLabel">Categorias</h3>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
            <div class="offcanvas-body">
                <ul class="list-group list-group-flush" >
                <li class="list-group-item" id="po"><a href="index.html">Inicio</a></li>
                <li class="list-group-item" id="po"><a href="marcas.html">Marcas</a></li>
                <li class="list-group-item" id="po"><a href="modelos.html">Modelos</a></li>
                <li class="list-group-item" id="po">Tallas</li>
                <li class="list-group-item" id="po">Pedidos</li>
                <li class="list-group-item" id="po">Tipo Noticia</li>
                <li class="list-group-item" id="po">Noticias</li>
                <li class="list-group-item" id="po">Comentarios</li>
                <li class="list-group-item" id="po">Clientas</li>
                <li class="list-group-item" id="po">Usuarios</li>
                <li class="list-group-item" id="po">Opciones</li>
                <li class="list-group-item" id="po">Roles</li>
                  </ul>
            </div>
        </div>
      </div>
  </a>
</div>
</nav>`;

FOOTER.innerHTML = `
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
    `;