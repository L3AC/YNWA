<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/4pedidos_data.php');
// Se instancian las entidades correspondientes.
$pedido = new PedidoData;
// Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
if ($pedido->setId($_GET['idPedido'])) {
    // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
    if ($rowOne = $pedido->readOne()) {
        // Se inicia el reporte con el encabezado del documento.
        $pdf->startReport('Reporte de compra');
        $pdf->setFont('Arial', 'B', 10);
        $pdf->cell(0, 0, 'A nombre de: ' . $rowOne['cliente'], 0, 1, 'C');
        // Se agrega un salto de línea
        $pdf->ln(12);
        $pdf->setFont('Arial', 'B', 10);
        $pdf->cell(0, 0, 'Fecha en que se hizo: ' . $rowOne['fecha'] . '   Forma de pago: ' . $rowOne['forma_pago_pedido'], 0, 1, 'C');
        // Se agrega un salto de línea
        $pdf->ln(10);
        // Ajustar los márgenes a 1.5 cm
        $pdf->setMargins(15, 0, 15);
        // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
        if ($dataP = $pedido->readFactura()) {
            // Se establece un color de relleno para los encabezados.
            $pdf->setFillColor(204, 200, 170);
            // Se establece la fuente para los encabezados.
            $pdf->setFont('Arial', 'B', 11);
            // Se imprimen las celdas con los encabezados.

            $pdf->cell(78.24, 10, 'Modelo', 'B', 0, 'C', 1);
            $pdf->cell(39.12, 10, 'Talla', 'B', 0, 'C', 1);
            $pdf->cell(29.34, 10, 'Cantidad', 'B', 0, 'C', 1);
            $pdf->cell(39.12, 10, 'Precio', 'B', 1, 'C', 1);
            // Se establece la fuente para los datos de los productos.
            $pdf->setFont('Arial', '', 11);
            $total = 0;

            // Se recorren los registros fila por fila.
            foreach ($dataP as $rowP) {
                // Calcula el subtotal para cada producto
                $subtotal = $rowP['cantidad_detalle_pedido'] * $rowP['precio_modelo_talla'];

                // Suma el subtotal al total
                $total += $subtotal;

                // Se imprimen las celdas con los datos de los productos.
                $pdf->cell(78.24, 10, $pdf->encodeString($rowP['descripcion_modelo']), 'TB', 0, 'C');
                $pdf->cell(39.12, 10, $pdf->encodeString($rowP['descripcion_talla']), 'TB', 0, 'C');
                $pdf->cell(29.34, 10, $pdf->encodeString($rowP['cantidad_detalle_pedido']), 'TB', 0, 'C');
                $pdf->cell(39.12, 10, $pdf->encodeString($rowP['precio_modelo_talla']), 'TB', 1, 'C');
            }

            // Se imprime una línea separadora
            $pdf->cell(155, 10, '', 'T', 0, 'C', 1);

            // Se imprime el total
            $pdf->setFont('Arial', 'B', 11);
            $pdf->cell(0, 10, $pdf->encodeString('Total : ' . number_format($total, 2)), 'T', 1, 'L');
        } else {
            $pdf->cell(0, 10, $pdf->encodeString('No ha realizado pedidos'), 1, 1);
        }
        // Se llama implícitamente al método footer() y se envía el documento al navegador web.
        $pdf->output('I', 'categoria.pdf');
    } else {
        print('Pedido inexistente');
    }
} else {
    print('Pedido incorrecto');
}
