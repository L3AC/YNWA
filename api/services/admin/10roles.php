<?php
// Se incluye la clase del modelo.
require_once('../../models/data/10roles_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $rol = new RolData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (
                    !$rol->setSearch($_POST['valor']) 
                ) {
                    $result['error'] = $rol->getDataError();
                } 
                elseif ($result['dataset'] = $rol->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$rol->setDescripcion($_POST['nombreRol']) or
                    !$rol->setEstado(isset($_POST['estadoRol']) ? 1 : 0)  or
                    !$rol->setMarca(isset($_POST['estadoMarca']) ? 1 : 0)  or
                    !$rol->setModelo(isset($_POST['estadoModelo']) ? 1 : 0)  or
                    !$rol->setTalla(isset($_POST['estadoTalla']) ? 1 : 0)  or
                    !$rol->setPedido(isset($_POST['estadoPedido']) ? 1 : 0)  or
                    !$rol->setTipoNoticia(isset($_POST['estadoTipoNoticia']) ? 1 : 0)  or
                    !$rol->setNoticia(isset($_POST['estadoNoticia']) ? 1 : 0)  or
                    !$rol->setComentario(isset($_POST['estadoComentario']) ? 1 : 0)  or
                    !$rol->setCliente(isset($_POST['estadoCliente']) ? 1 : 0)  or
                    !$rol->setUsuario(isset($_POST['estadoUsuario']) ? 1 : 0)  or
                    !$rol->setRol(isset($_POST['estadopRol']) ? 1 : 0)  
                ) {
                    $result['error'] = $rol->getDataError();
                } elseif ($rol->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Registro creado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el registro';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $rol->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen registros';
                }
                break;
            case 'readOne':
                //echo $_POST['idTalla'];
                if (!$rol->setId($_POST['idRol'])) {
                    $result['error'] = $rol->getDataError();
                } elseif ($result['dataset'] = $rol->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Registro inexistente';
                }
                break;
                case 'fillSelect':
                    //echo $_POST['idTalla'];
                    if (!$rol->setId($_SESSION['idRol'])) {
                        $result['error'] = $rol->getDataError();
                    } elseif ($result['dataset'] = $rol->fillSelect()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Registro inexistente';
                    }
                    break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$rol->setId($_POST['idRol']) or
                    !$rol->setDescripcion($_POST['nombreRol']) or
                    !$rol->setEstado(isset($_POST['estadoRol']) ? 1 : 0)  or
                    !$rol->setMarca(isset($_POST['estadoMarca']) ? 1 : 0)  or
                    !$rol->setModelo(isset($_POST['estadoModelo']) ? 1 : 0)  or
                    !$rol->setTalla(isset($_POST['estadoTalla']) ? 1 : 0)  or
                    !$rol->setPedido(isset($_POST['estadoPedido']) ? 1 : 0)  or
                    !$rol->setTipoNoticia(isset($_POST['estadoTipoNoticia']) ? 1 : 0)  or
                    !$rol->setNoticia(isset($_POST['estadoNoticia']) ? 1 : 0)  or
                    !$rol->setComentario(isset($_POST['estadoComentario']) ? 1 : 0)  or
                    !$rol->setCliente(isset($_POST['estadoCliente']) ? 1 : 0)  or
                    !$rol->setUsuario(isset($_POST['estadoUsuario']) ? 1 : 0)  or
                    !$rol->setRol(isset($_POST['estadoRol']) ? 1 : 0)  
                ) {
                    $result['error'] = $rol->getDataError();
                } elseif ($rol->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Registro modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el rol';
                }
                break;
            case 'deleteRow':
                if (
                    !$rol->setId($_POST['idRol']) 
                ) {
                    $result['error'] = $rol->getDataError();
                } elseif ($rol->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Rol eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el rol';
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
