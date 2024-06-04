var mapa;
var marcador;

function inicializarMapa() {
    mapa = L.map('mapa').setView([13.6929, -89.2182], 13); // San Salvador, El Salvador

    habilitarVerCalles(); // Establecer el mapa en el modo de calles al cargar

    mapa.on('click', function(e) {
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

function mostrarUbicacion(latitud, longitud) {
    marcador = L.marker([latitud, longitud]).addTo(mapa);
}

function obtenerNombreLugar(latitud, longitud) {
    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitud + '&lon=' + longitud)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            document.getElementById('direccionCliente').value = data.display_name;
        })
        .catch(function(error) {
            console.error('Error al obtener el nombre del lugar:', error);
        });
}

function buscarDireccion() {
    var direccion = document.getElementById('direccionCliente').value;

    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(direccion))
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.length > 0) {
                var latitud = parseFloat(data[0].lat);
                var longitud = parseFloat(data[0].lon);
                mapa.setView([latitud, longitud], 15);
                mostrarUbicacion(latitud, longitud);
            } else {
                alert('No se encontró la dirección.');
            }
        })
        .catch(function(error) {
            console.error('Error al buscar la dirección:', error);
        });
}

function limpiarInput() {
    document.getElementById('direccionCliente').value = '';
}

function habilitarModoSatelite() {
    if (mapa) {
        mapa.remove();
    }

    mapa = L.map('mapa').setView([13.6929, -89.2182], 13); // San Salvador, El Salvador

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(mapa);
    
    mapa.on('click', function(e) {
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

function habilitarVerCalles() {
    if (mapa) {
        mapa.remove();
    }

    mapa = L.map('mapa').setView([13.6929, -89.2182], 13); // San Salvador, El Salvador

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

    mapa.on('click', function(e) {
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

inicializarMapa(); // Llamar a la función inicializarMapa() al cargar la página