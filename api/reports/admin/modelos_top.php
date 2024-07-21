<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/2modelos_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Modelos más pedidos');
// Se instancia el módelo Categoría para obtener los datos.
$modelo = new ModeloData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataP = $modelo->topModelosR()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(204, 200, 170);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(66, 10, 'Modelo', 'B', 0, 'C', 1);
    $pdf->cell(66, 10, 'Marca', 'B', 0, 'C', 1);
    $pdf->cell(66, 10, 'Cantidad', 'B', 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(240);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataP as $rowP) {
        // Se imprime una celda con el nombre de la categoría.
        $pdf->cell(66, 10, $pdf->encodeString($rowP['descripcion_modelo']), 'TB', 0,'C');
        $pdf->cell(66, 10, $pdf->encodeString($rowP['descripcion_marca']), 'TB', 0,'C');
        $pdf->cell(66, 10, $pdf->encodeString($rowP['total_cantidad_pedida']), 'TB', 1,'C');
        // Se instancia el módelo Producto para procesar los datos.
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay modelos para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productos.pdf');
