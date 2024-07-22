<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se verifica si existe un valor para el cliente, de lo contrario se muestra un mensaje.
if (isset($_GET['idMarca'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/1marcas_data.php');
    // Se instancian las entidades correspondientes.
    $marca = new MarcaData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($marca->setId($_GET['idMarca'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowOne = $marca->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Modelos disponibles de la marca ' . $rowOne['descripcion_marca']);

            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataP = $marca->modelosByMarca()) {
                $count = 0;
                // Se establece el color de fondo para las celdas del encabezado y del total (blanco).
                $pdf->setFillColor(204, 200, 170);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 12);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(155, 10, 'Modelo', 'B', 0, 'C', 1);
                $pdf->cell(31, 10, 'Estado', 'B', 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);
                // Se recorren los registros fila por fila.
                foreach ($dataP as $rowP) {
                    $count += 1;
                    $estado = $rowP['estado_modelo'] ? 'Activo' : 'Inactivo';
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(155, 10, $pdf->encodeString($rowP['descripcion_modelo']), 'T', 0, 'C');
                    $pdf->cell(31 , 10, $estado, 'T', 1, 'C');
                }
                $pdf->cell(186, 10, '', 'T', 0, 'C', 1);
                $pdf->setFont('Arial', 'B', 11);
                $pdf->cell(0, 10, $pdf->encodeString('Total : ' . $count . '  '), 'T', 1, 'R');
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay modelos en esta marca'), 'T', 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'marca.pdf');
        } else {
            print('Marca inexistente');
        }
    } else {
        print('Marca incorrecta');
    }
} else {
    print('Debe seleccionar una marca');
}
?>
