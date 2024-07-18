<?php
// Se incluye la clase del modelo.
require_once('../../models/data/2modelos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $modelo = new ModeloData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (
                    !$modelo->setSearch($_POST['valor']) 
                ) {
                    $result['error'] = $modelo->getDataError();
                } 
                elseif ($result['dataset'] = $modelo->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$modelo->setNombre($_POST['nombreModelo']) or
                    !$modelo->setCategoria($_POST['marcaModelo']) or
                    !$modelo->setEstado(isset($_POST['estadoModelo'])? 1 : 0) or
                    !$modelo->setImagen($_FILES['imagenModelo'])
                ) {
                    /*echo 'DATOS '.$_POST['nombreModelo'].' '.$_POST['marcaModelo'].' '.$_POST['estadoModelo']
                    .' '.$_FILES['imagenModelo'];*/
                    $result['error'] = $modelo->getDataError();
                } elseif ($modelo->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Modelo creado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenModelo'], $modelo::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el modelo';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $modelo->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = ' No se encontraron registros';
                }
                break;
            case 'readsubAll':
                    if (!$modelo->setId($_SESSION['idmod'])) {
                        $result['error'] = $modelo->getDataError();
                    } elseif ($result['dataset'] = $modelo->readsubAll()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'Tallas no registradas';
                    }
                    break;
            case 'readOne':
                if (!$modelo->setId($_POST['idModelo'])) {
                    $result['error'] = $modelo->getDataError();
                } elseif ($result['dataset'] = $modelo->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Registro inexistente';
                }
                break;
                
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$modelo->setId($_POST['idModelo']) or
                    !$modelo->setFilename() or
                    !$modelo->setNombre($_POST['nombreModelo']) or
                    !$modelo->setCategoria($_POST['marcaModelo']) or
                    !$modelo->setEstado(isset($_POST['estadoModelo']) ? 1 : 0) or
                    !$modelo->setImagen($_FILES['imagenModelo'], $modelo->getFilename())
                ) {
                    $result['error'] = $modelo->getDataError();
                } elseif ($modelo->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Modelo modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenModelo'], $modelo::RUTA_IMAGEN, $modelo->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el modelo';
                }
                break;
            case 'deleteRow':
                if (
                    !$modelo->setId($_POST['idModelo']) or
                    !$modelo->setFilename()
                ) {
                    $result['error'] = $modelo->getDataError();
                } elseif ($modelo->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Modelo eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($modelo::RUTA_IMAGEN, $modelo->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el registro';
                }
                break;
            case 'cantidadProductosCategoria':
                if ($result['dataset'] = $modelo->cantidadProductosCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
            case 'porcentajeTop':
                if (
                    !$modelo->setId($_POST['limit']) 
                ) {
                    $result['error'] = $modelo->getDataError();
                } 
                elseif ($result['dataset'] = $modelo->porcentajeTop()) {
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
