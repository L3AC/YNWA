<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Encabezado para permitir solicitudes de cualquier origen.
header('Access-Control-Allow-Origin: *');
// Se establece la zona horaria local para la fecha y hora del servidor.
date_default_timezone_set('America/El_Salvador');
// Constantes para establecer las credenciales de conexión con el servidor de bases de datos.
define('SERVER', 'localhost');
define('DATABASE', 'db_ynwa');
define('USERNAME', 'userSQL');
define('PASSWORD', 'pasf2');
/*define('SERVER', 'sql300.infinityfree.com');
define('DATABASE', 'if0_37082491_db_ynwa');
define('USERNAME', 'if0_37082491');
define('PASSWORD', 'E9ViPoL4eS');*/
error_reporting(E_ALL);
?>