/*
*   CONTROLADOR DE USO GENERAL EN TODAS LAS PÁGINAS WEB.
*/
// Constante para establecer la ruta base del servidor.
const SERVER_URL = 'http://localhost/YNWA/api/';
//const SERVER_URL = 'http://ynwa.000.pe/YNWA/api/';
/*
*   Función para mostrar un mensaje de confirmación. Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmAction = (message) => {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

/*
*   Función asíncrona para manejar los mensajes de notificación al usuario. Requiere la librería sweetalert para funcionar.
*   Parámetros: type (tipo de mensaje), text (texto a mostrar), timer (uso de temporizador) y url (valor opcional con la ubicación de destino).
*   Retorno: ninguno.
*/
const sweetAlert = async (type, text, timer, url = null) => {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
    }
    // Se define un objeto con las opciones principales para el mensaje.
    let options = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: { // Aquí envolvemos la función reload () en una función anónima
            text: 'Aceptar'
        }
    };

    // Se verifica el uso del temporizador.
    (timer) ? options.timer = 3000 : options.timer = null;
    // Se muestra el mensaje.
    await swal(options);
    // Se direcciona a una página web si se indica.
    (url) ? location.href = url : undefined;
}

/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/
const fillSelect = async (filename, action, select, selected = null, id = null, idsub = null, btnId = null) => {
    // Petición para obtener los datos.
    const FORM = new FormData();

    id && FORM.append('id', id);
    idsub && FORM.append('idsub', idsub);

    const DATA = await fetchData(filename, action, FORM);
    let content = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
    if (DATA.status) {
        /*btnId && (btnId.disabled = false);
        btnId.disabled = false;*/
        content += '<option value="" selected>Seleccione una opción</option>';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se obtiene el dato del primer campo.
            value = Object.values(row)[0];
            // Se obtiene el dato del segundo campo.
            text = Object.values(row)[1];
            // Se verifica cada valor para enlistar las opciones.
            if (value != selected) {
                content += `<option value="${value}">${text}</option>`;
            } else {
                content += `<option value="${value}" selected>${text}</option>`;
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
        //btnId && (btnId.disabled = true);
    }
    // Se agregan las opciones a la etiqueta select mediante el id.
    document.getElementById(select).innerHTML = content;
    btnId && (btnId.disabled = !DATA.status);
}

/*
*   Función para generar un gráfico de barras verticales. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
let existingBarChart;
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Destruir gráfico existente si lo hay para evitar superposiciones.
    if (existingBarChart) {
        existingBarChart.destroy();
    }

    // Se declara un arreglo para guardar códigos de colores en formato rgba.
    let colors = [];
    // Se generan colores rgba con transparencia de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        let color = 'rgba(' + Math.floor(Math.random() * 256) + ','
            + Math.floor(Math.random() * 256) + ','
            + Math.floor(Math.random() * 256) + ', 0.6)'; // 0.5 es el nivel de transparencia
        colors.push(color);
    });

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    existingBarChart = new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    color: 'white' // Cambiar color del título a blanco
                },
                legend: {
                    display: false,
                    labels: {
                        color: 'white' // Cambiar color de las etiquetas de la leyenda a blanco
                    }
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico de pastel. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
let existingPieChart;
const pieGraph = (canvas, legends, values, title) => {
    // Destruir gráfico existente si lo hay para evitar superposiciones.
    if (existingPieChart) {
        existingPieChart.destroy();
    }

    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    existingPieChart = new Chart(document.getElementById(canvas), {
        type: 'pie',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

let existingDoughnutChart = null;

const doughnutGraph = (canvas, legends, values, title) => {
    // Destruir el gráfico existente si existe
    if (existingDoughnutChart) {
        existingDoughnutChart.destroy();
    }

    let colors = [];
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    // Crear el nuevo gráfico y guardar la referencia
    existingDoughnutChart = new Chart(document.getElementById(canvas), {
        type: 'doughnut',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw || 0;
                            return `${value} %`;
                        }
                    }
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico de líneas. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
let existingLineChart;
const lineGraph = (canvas, legends, values, title) => {
    // Destruir gráfico existente si lo hay para evitar superposiciones.
    if (existingLineChart) {
        existingLineChart.destroy();
    }

    let colors = [];
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    existingLineChart = new Chart(document.getElementById(canvas), {
        type: 'line',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                borderColor: colors[0],
                fill: false
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico de radar. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
let existingRadarChart;
const radarGraph = (canvas, legends, values, title) => {
    // Destruir gráfico existente si lo hay para evitar superposiciones.
    if (existingRadarChart) {
        existingRadarChart.destroy();
    }

    let colors = [];
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    existingRadarChart = new Chart(document.getElementById(canvas), {
        type: 'radar',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors[0]
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico polar. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
let existingPolarChart;
const polarGraph = (canvas, legends, values, title) => {
    // Destruir gráfico existente si lo hay para evitar superposiciones.
    if (existingPolarChart) {
        existingPolarChart.destroy();
    }

    let colors = [];
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    existingPolarChart = new Chart(document.getElementById(canvas), {
        type: 'polarArea',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}
/*
*   Función para generar un gráfico de área. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
let existingAreaChart;
const areaGraph = (canvas, legends, values, title) => {
    // Destruir gráfico existente si lo hay para evitar superposiciones.
    if (existingAreaChart) {
        existingAreaChart.destroy();
    }

    // Generar un color aleatorio.
    let color = '#' + (Math.random().toString(16).substring(2, 8));

    // Crear una nueva instancia del gráfico.
    existingAreaChart = new Chart(document.getElementById(canvas), {
        type: 'line',
        data: {
            labels: legends,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 2,
                tension: 0.1,
                pointBackgroundColor: color
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico de barras horizontales. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
let existingHorBarChart;
const horBarGraph = (canvas, legends, values, title) => {
    // Destruir gráfico existente si lo hay para evitar superposiciones.
    if (existingHorBarChart) {
        existingHorBarChart.destroy();
    }

    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan colores hexadecimales con transparencia de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    // Crear una nueva instancia del gráfico.
    existingHorBarChart = new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {
            labels: legends,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false, // Deshabilitar el cuadro de leyenda (legend)
                },
                tooltip: {
                    enabled: false, // Deshabilitar el cuadro de filtrado (tooltip)
                },
                title: {
                    display: true,
                    text: title
                }
            }
        },
    });
}




/*
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const logOut = async () => {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para eliminar la sesión.
        const DATA = await fetchData(USER_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}


/*
*   Función asíncrona para intercambiar datos con el servidor.
*   Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
*   Retorno: constante tipo objeto con los datos en formato JSON.
*/
const fetchData = async (filename, action, form = null) => {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se define una constante tipo objeto con la respuesta de la petición.
        // Se retorna el resultado en formato JSON.
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        console.log(RESPONSE); // Muestra la respuesta en la consola para verificar su contenido
        return await RESPONSE.json();
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}
