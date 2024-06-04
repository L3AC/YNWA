var mapa = L.map('mapa').setView([13.6929, -89.2182], 13); // San Salvador, El Salvador
            var marcador;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

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

            function mostrarUbicacion(latitud, longitud) {
                marcador = L.marker([latitud, longitud]).addTo(mapa);
            }

            function obtenerNombreLugar(latitud, longitud) {
                fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitud + '&lon=' + longitud)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        document.getElementById('direccionCliente').value = data.display_name;
                    })
                    .catch(function (error) {
                        console.error('Error al obtener el nombre del lugar:', error);
                    });
            }

            function buscarDireccion() {
                var direccion = document.getElementById('direccionCliente').value;

                fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(direccion))
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.length > 0) {
                            var latitud = parseFloat(data[0].lat);
                            var longitud = parseFloat(data[0].lon);
                            mapa.setView([latitud, longitud], 15);
                            mostrarUbicacion(latitud, longitud);
                        } else {
                            alert('No se encontró la dirección.');
                        }
                    })
                    .catch(function (error) {
                        console.error('Error al buscar la dirección:', error);
                    });
            }

            function limpiarInput() {
                document.getElementById('direccionCliente').value = '';
            }