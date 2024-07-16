<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se verifica si existe un valor para el cliente, de lo contrario se muestra un mensaje.
if (isset($_GET['idModelo'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/2modelos_data.php');
    // Se instancian las entidades correspondientes.
    $modelo = new ModeloData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($modelo->setId($_GET['idModelo'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowOne = $modelo->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Tallas de ' . $rowOne['descripcion_modelo']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataP = $modelo->tallasByModelo()) {
                // Se establece el color de fondo para las celdas del encabezado y del total (blanco).
                $pdf->setFillColor(204, 200, 170); // Color
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 12);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(120, 10, 'Talla', 'B', 0, 'C', 1);
                $pdf->cell(30, 10, 'Precio', 'B', 0, 'C', 1);
                $pdf->cell(35, 10, 'Estado', 'B', 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);
                // Se recorren los registros fila por fila.
                foreach ($dataP as $rowP) {
                    $estado = $rowP['estado_marca'] ? 'Activo' : 'Inactivo';
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(120, 10, $pdf->encodeString($rowP['descripcion_talla']), 'TB', 0, 'C');
                    $pdf->cell(30, 10, $pdf->encodeString($rowP['precio_modelo_talla']), 'TB', 0, 'C');
                    $pdf->cell(35, 10, $estado, 'TB', 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No ha realizado pedidos'), 'T', 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'categoria.pdf');
        } else {
            print('Cliente inexistente');
        }
    } else {
        print('Cliente incorrecta');
    }
} else {
    print('Debe seleccionar un cliente');
}
?>
