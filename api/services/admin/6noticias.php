<?php
// Se incluye la clase del modelo.
require_once('../../models/data/6noticias_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $noticia = new NoticiaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idUsuario'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (
                    !$noticia->setSearch($_POST['valor']) 
                ) {
                    $result['error'] = $noticia->getDataError();
                } 
                elseif ($result['dataset'] = $noticia->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$noticia->setNombre($_POST['tituloNoticia']) or
                    !$noticia->setDescripcion($_POST['contenidoNoticia']) or
                    !$noticia->setCategoria($_POST['tipoNoticia']) or
                    !$noticia->setEstado(isset($_POST['estadoNoticia']) ? 1 : 0) or
                    !$noticia->setImagen($_FILES['imagenNoticia'])
                ) {
                    $result['error'] = $noticia->getDataError();
                } elseif ($noticia->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Noticia creada correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenNoticia'], $noticia::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el noticia';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$noticia->setId($_POST['idNoticia']) or
                    !$noticia->setFilename() or
                    !$noticia->setNombre($_POST['tituloNoticia']) or
                    !$noticia->setDescripcion($_POST['contenidoNoticia']) or
                    !$noticia->setCategoria($_POST['tipoNoticia']) or
                    !$noticia->setEstado(isset($_POST['estadoNoticia']) ? 1 : 0) or
                    !$noticia->setImagen($_FILES['imagenNoticia'], $noticia->getFilename())
                ) {
                    $result['error'] = $noticia->getDataError();
                } elseif ($noticia->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Registro modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenNoticia'], $noticia::RUTA_IMAGEN, $noticia->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el noticia';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $noticia->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = ' No se encontraron registros';
                }
                break;
            case 'readOne':
                if (!$noticia->setId($_POST['idNoticia'])) {
                    $result['error'] = $noticia->getDataError();
                } elseif ($result['dataset'] = $noticia->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Noticia inexistente';
                }
                break;

            case 'deleteRow':
                if (
                    !$noticia->setId($_POST['idNoticia']) or
                    !$noticia->setFilename()
                ) {
                    $result['error'] = $noticia->getDataError();
                } elseif ($noticia->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Noticia eliminada correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($noticia::RUTA_IMAGEN, $noticia->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la noticia';
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
