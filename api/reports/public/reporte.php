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
        $pdf->setFont('Arial', 'I', 10);
        $pdf->cell(0, 10, 'A nombre de ' . $rowOne['cliente'], 0, 1, 'C');
        $pdf->setFont('Arial', 'I', 10);
        $pdf->cell(0, 10, 'Fecha en que se realizó ' . $rowOne['fecha'], 0, 1, 'C');
        $pdf->setFont('Arial', 'I', 10);
        $pdf->cell(0, 10, 'Forma de pago ' . $rowOne['forma_pago_pedido'], 0, 1, 'C');
        // Ajustar los márgenes a 1.5 cm
        $pdf->setMargins(15, 0, 15);
        // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
        if ($dataP = $pedido->readFactura()) {
            // Se establece un color de relleno para los encabezados.
            $pdf->setFillColor(204, 200, 170);
            // Se establece la fuente para los encabezados.
            $pdf->setFont('Arial', 'B', 11);
            // Se imprimen las celdas con los encabezados.
            $pdf->cell(66, 10, 'Modelo', 'B', 0, 'C', 1);
            $pdf->cell(30, 10, 'Talla', 'B', 0, 'C', 1);
            $pdf->cell(26, 10, 'Cantidad', 'B', 0, 'C', 1);
            $$pdf->cell(26, 10, 'Precio', 'B', 0, 'C', 1);
            // Se establece la fuente para los datos de los productos.
            $pdf->setFont('Arial', '', 11);
            // Se recorren los registros fila por fila.
            foreach ($dataP as $rowP) {
                //($rowP['estado_producto']) ? $estado = 'Activo' : $estado = 'Inactivo';
                // Se imprimen las celdas con los datos de los productos.
                $pdf->cell(66, 10, $pdf->encodeString($rowP['descripcion_modelo']), 'TB', 0, 'C');
                $pdf->cell(30, 10, $pdf->encodeString($rowP['descripcion_talla']), 'TB', 0, 'C');
                $pdf->cell(26, 10, $pdf->encodeString($rowP['cantidad_detalle_pedido']), 'TB', 1, 'C');
                $pdf->cell(26, 10, $pdf->encodeString($rowP['precio_modelo_talla']), 'TB', 1, 'C');
            }
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
