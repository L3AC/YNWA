<?php
// Se incluye la clase del modelo.
require_once('../../models/data/5tiponoticias_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $tiponoticia = new TipoNoticiaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (
                    !$tiponoticia->setSearch($_POST['valor']) 
                ) {
                    $result['error'] = $tiponoticia->getDataError();
                } 
                elseif ($result['dataset'] = $tiponoticia->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$tiponoticia->setNombre($_POST['nombreTipoNoticia']) or
                    !$tiponoticia->setEstado(isset($_POST['estadoTipoNoticia']) ? 1 : 0) 
                ) {
                    $result['error'] = $tiponoticia->getDataError();
                } elseif ($tiponoticia->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'registro creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el registro';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $tiponoticia->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = ' No se encontraron registros';
                }
                break;
            case 'readOne':
                
                if (!$tiponoticia->setId($_POST['idTipoNoticia'])) {
                    $result['error'] = $tiponoticia->getDataError();
                } elseif ($result['dataset'] = $tiponoticia->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Registro inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$tiponoticia->setId($_POST['idTipoNoticia']) or
                    !$tiponoticia->setNombre($_POST['nombreTipoNoticia']) or
                    !$tiponoticia->setEstado(isset($_POST['estadoTipoNoticia']) ? 1 : 0) 
                ) {
                    $result['error'] = $tiponoticia->getDataError();
                } elseif ($tiponoticia->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'registro modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el registro';
                }
                break;
            case 'deleteRow':
                if (
                    !$tiponoticia->setId($_POST['idTipoNoticia'])
                ) {
                    $result['error'] = $tiponoticia->getDataError();
                } elseif ($tiponoticia->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'registro eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($tiponoticia::RUTA_IMAGEN, $tiponoticia->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el registro';
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
