// Declaración de variables globales para el mapa y el marcador
var mapa;
var marcador;

// Función para inicializar el mapa
function inicializarMapa() {
    // Crear un nuevo mapa y establecer la vista inicial en San Salvador, El Salvador
    mapa = L.map('mapa').setView([13.6929, -89.2182], 13);
    
    // Habilitar la visualización de calles al cargar el mapa
    habilitarVerCalles(true); 

    // Agregar un evento de clic al mapa
    mapa.on('click', function (e) {
        // Si ya hay un marcador en el mapa, eliminarlo
        if (marcador) {
            mapa.removeLayer(marcador);
        }

        // Obtener las coordenadas del clic
        var latitud = e.latlng.lat;
        var longitud = e.latlng.lng;
        
        // Mostrar un marcador en las coordenadas clicadas
        mostrarUbicacion(latitud, longitud);
        
        // Obtener y mostrar el nombre del lugar correspondiente a las coordenadas
        obtenerNombreLugar(latitud, longitud);
        
        // Mostrar las coordenadas en el campo de dirección del cliente
        document.getElementById('direccionCliente').value = 'Latitud: ' + latitud + ', Longitud: ' + longitud;
    });
}

// Función para mostrar un marcador en el mapa
function mostrarUbicacion(latitud, longitud) {
    // Crear y agregar un marcador en las coordenadas especificadas
    marcador = L.marker([latitud, longitud]).addTo(mapa);
}

// Función para obtener el nombre del lugar basado en las coordenadas
function obtenerNombreLugar(latitud, longitud) {
    // Realizar una solicitud para obtener el nombre del lugar utilizando las coordenadas
    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitud + '&lon=' + longitud)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Mostrar el nombre del lugar en el campo de dirección del cliente
            document.getElementById('direccionCliente').value = data.display_name;
        })
        .catch(function (error) {
            console.error('Error al obtener el nombre del lugar:', error);
        });
}

// Función para buscar una dirección especificada por el usuario
function buscarDireccion() {
    // Evitar el comportamiento predeterminado del formulario al hacer clic en el botón de búsqueda
    event.preventDefault();
    
    // Obtener la dirección especificada por el usuario
    var direccion = document.getElementById('direccionCliente').value;

    // Realizar una solicitud para buscar la dirección especificada
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(direccion))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Si se encuentra alguna ubicación correspondiente a la dirección, mostrarla en el mapa
            if (data.length > 0) {
                var latitud = parseFloat(data[0].lat);
                var longitud = parseFloat(data[0].lon);
                mapa.setView([latitud, longitud], 15);
                mostrarUbicacion(latitud, longitud);
            } else {
                // Mostrar un mensaje de error si la dirección no se encuentra
                sweetAlert(4, 'No se encontró la dirección', true);
            }
        })
        .catch(function (error) {
            console.error('Error al buscar la dirección:', error);
        });
}

// Función para limpiar el campo de dirección del cliente
function limpiarInput() {
    document.getElementById('direccionCliente').value = '';
}

// Función para habilitar el modo de visualización de satélite en el mapa
function habilitarModoSatelite() {
    // Evitar el comportamiento predeterminado del formulario al hacer clic en el botón de cambio de modo
    event.preventDefault();
    
    // Eliminar el mapa actual si ya existe
    if (mapa) {
        mapa.remove();
    }

    // Crear un nuevo mapa y establecer el modo de visualización de satélite
    mapa = L.map('mapa').setView([13.6929, -89.2182], 13);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(mapa);

    // Agregar un evento de clic al mapa para mostrar el marcador y obtener el nombre del lugar
    mapa.on('click', function (e) {
        if (marcador) {
            mapa.removeLayer(marcador);
        }
        var latitud = e.latlng.lat;
        var longitud = e.latlng.lng;
        mostrarUbicacion(latitud, longitud);
        obtenerNombreLugar(latitud, longitud);
        document.getElementById('direccionCliente').value = 'Latitud: ' + latitud + ', Longitud: ' + longitud;
    });
}

// Función para habilitar el modo de visualización de calles en el mapa
function habilitarVerCalles(bool=false) {
    // Evitar el comportamiento predeterminado del formulario si bool es false
    if (!bool) {
        event.preventDefault();
    }
    // Eliminar el mapa actual si ya existe
    if (mapa) {
        mapa.remove();
    }
    // Crear un nuevo mapa y establecer el modo de visualización de calles
    mapa = L.map('mapa').setView([13.6929, -89.2182], 13); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);
    // Agregar un evento de clic al mapa para mostrar el marcador y obtener el nombre del lugar
    mapa.on('click', function (e) {
        if (marcador) {
            mapa.removeLayer(marcador);
        }
        var latitud = e.latlng.lat;
        var longitud = e.latlng.lng;
        mostrarUbicacion(latitud, longitud);
        obtenerNombreLugar(latitud, longitud);
        document.getElementById('direccionCliente').value = 'Latitud: ' + latitud + ', Longitud: ' + longitud;
    });
}

// Llamar a la función inicializarMapa() al cargar la página
inicializarMapa();
