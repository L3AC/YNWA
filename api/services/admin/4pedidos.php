<?php
// Se incluye la clase del modelo.
require_once('../../models/data/4pedidos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedido = new PedidoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (
                    !$pedido->setSearch($_POST['valor']) or
                    !$pedido->setEstado($_POST['estado'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } 
                elseif ($result['dataset'] = $pedido->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedido->setNombre($_POST['nombreModelo']) or
                    !$pedido->setCategoria($_POST['marcaModelo']) or
                    !$pedido->setEstado(isset($_POST['estadoModelo'])? 1 : 0) or
                    !$pedido->setImagen($_FILES['imagenModelo'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto creado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenProducto'], $pedido::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el pedido';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $pedido->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = ' No se encontraron registros';
                }
                break;
            case 'readsubAll':
                    if (!$pedido->setId($_SESSION['idmod'])) {
                        $result['error'] = $pedido->getDataError();
                    } elseif ($result['dataset'] = $pedido->readsubAll()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'Pedidos no registrados';
                    }
                    break;
            case 'readOne':
                if (!$pedido->setId($_POST['idPedido'])) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($result['dataset'] = $pedido->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Pedido inexistente';
                }
                break;
                
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedido->setId($_POST['idPedido']) or
                    !$pedido->setEstado($_POST['estadoPedido']) 
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Registro modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el registro';
                }
                break;
            case 'deleteRow':
                if (
                    !$pedido->setId($_POST['idProducto']) or
                    !$pedido->setFilename()
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($pedido::RUTA_IMAGEN, $pedido->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el pedido';
                }
                break;
            case 'cantidadProductosCategoria':
                if ($result['dataset'] = $pedido->cantidadProductosCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
            case 'porcentajeProductosCategoria':
                if ($result['dataset'] = $pedido->porcentajeProductosCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
                case 'prediccionGanancia':
                    if ($result['dataset'] = $pedido->prediccionGanancia()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'No hay datos disponibles';
                    }
                    break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
