// Constante para completar la ruta de la API.
const MODELO_API = 'services/admin/2modelos.php',
    CLIENTE_API = 'services/admin/8clientes.php',
    COMENTARIO_API = 'services/admin/7comentarios.php',
    PEDIDO_API = 'services/admin/4pedidos.php';

//Constantes de variables
const LIST_1 = document.getElementById('list1'),
    LIST_2 = document.getElementById('list2'),
    LIST_3 = document.getElementById('list3'),
    LIST_4 = document.getElementById('list4'),
    LIST_5 = document.getElementById('list5');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Constante para obtener el número de horas.
    const HOUR = new Date().getHours();
    // Se define una variable para guardar un saludo.
    let greeting = '';
    // Dependiendo del número de horas transcurridas en el día, se asigna un saludo para el usuario.
    if (HOUR < 12) {
        greeting = 'Buenos días';
    } else if (HOUR < 19) {
        greeting = 'Buenas tardes';
    } else if (HOUR <= 23) {
        greeting = 'Buenas noches';
    }
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = `${greeting}, bienvenido`;
    // Llamada a la funciones que generan los gráficos en la página web.
    graficoPastelCategorias();
    graficaTopClientes();
    graficaGanancias();
    graficaTopTallas();
    graficaTopPuntuacion();

    // Añadir eventos de cambio a los selectores para actualizar los gráficos.
    LIST_1.addEventListener('change', graficoPastelCategorias);
    LIST_2.addEventListener('change', graficaTopPuntuacion);
    LIST_3.addEventListener('change', graficaTopClientes);
    LIST_4.addEventListener('change', graficaTopTallas);
    LIST_5.addEventListener('change', graficaGanancias);
});

/*
*   Función asíncrona para mostrar un gráfico de barras con la cantidad de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoPastelCategorias = async () => {
    const FORM = new FormData();
    FORM.append('limit', LIST_1.value);
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(MODELO_API, 'porcentajeTop',FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a gráficar.
        let modelos = [];
        let porcentajes = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            modelos.push(row.descripcion_modelo);
            porcentajes.push(row.porcentaje_comprado);
        });
        // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
        doughnutGraph('chart1', modelos, porcentajes, '');
    } else {
        document.getElementById('chart1').remove();
        console.log(DATA.error);
    }
}
const graficaTopPuntuacion = async () => {
    const FORM = new FormData();
    FORM.append('limit', LIST_2.value);
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(COMENTARIO_API, 'topPuntuacion',FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let modelo = [];
        let puntuacion = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            modelo.push(row.descripcion_modelo);
            puntuacion.push(row.promedio_puntuacion);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        horBarGraph('chart2', modelo, puntuacion, 'Modelos', 'Modelo');
    } else {
        document.getElementById('chart2').remove();
        console.log(DATA.error);
    }
}

const graficaTopClientes = async () => {
    //let num = LIST_1.value;
    const FORM = new FormData();
    FORM.append('limit', LIST_3.value);
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(CLIENTE_API, 'topClientesR', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let nombre = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            nombre.push(row.cliente);
            cantidades.push(row.total_productos_comprados);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart3', nombre, cantidades, 'Productos', 'Clientes');
    } else {
        document.getElementById('chart3').remove();
        console.log(DATA.error);
    }
}
const graficaTopTallas = async () => {
    const FORM = new FormData();
    FORM.append('limit', LIST_4.value);
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PEDIDO_API, 'topTallas',FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let talla = [];
        let cantidad = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            talla.push('Talla ' + row.descripcion_talla);
            cantidad.push(row.total_cantidad_pedida);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        polarGraph('chart4', talla, cantidad, 'Tallas', 'Talla');
    } else {
        document.getElementById('chart4').remove();
        console.log(DATA.error);
    }
}
/*
*   Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficaGanancias = async () => {
    const FORM = new FormData();
    FORM.append('limit', LIST_5.value);
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PEDIDO_API, 'prediccionGanancia',FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let mes = [];
        let ganancia = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            mes.push(row.nombre_mes);
            ganancia.push(row.ventas_mensuales);
        });
        mes.push(DATA.dataset[0].nombre_siguiente_mes);
        ganancia.push(DATA.dataset[0].prediccion_siguiente_mes);
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        areaGraph('chart5', mes, ganancia, 'Ganancias $', 'Mes');
    } else {
        document.getElementById('chart5').remove();
        console.log(DATA.error);
    }
}
