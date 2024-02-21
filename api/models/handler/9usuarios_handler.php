<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $usuario = null;
    protected $alias = null;
    protected $clave = null;
    protected $estado = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    /*GENERAR PIN*/
    public function generarPin() {
        $pinLength = 6;
        $pin = '';
      
        for ($i = 0; $i < $pinLength; $i++) {
          $pin .= mt_rand(0, 9);
        }
      
        return $pin;
      } 
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_usuario , usuario, clave
                FROM sec_usuarios
                WHERE  usuario = ?';
        //echo($username);
        $params = array($username);
        $data = Database::getRow($sql, $params);
        //echo $data['clave'];
        if (password_verify($password, $data['clave'])) {
            $_SESSION['idUsuario'] = $data['id_usuario'];
            $_SESSION['usuarion'] = $data['usuario'];
            //echo ($_SESSION['usuario']).' 1';
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT clave
                FROM sec_usuarios
                WHERE id_usuario = ?';
        $params = array($_SESSION['idUsuario']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE sec_usuarios
                SET clave = ?
                WHERE id_usuario = ?';
        $params = array($this->clave, $_SESSION['idUsuario']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_usuario, nombres, apellidos, email, usuario
                FROM sec_usuarios
                WHERE id_usuario = ?';
        $params = array($_SESSION['idUsuario']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE sec_usuarios
                SET nombres = ?, apellidos = ?, email = ?, usuario = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->alias, $_SESSION['idUsuario']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_administrador,id_rol, nombre_administrador, apellido_administrador, correo_administrador, alias_administrador
                FROM administrador
                WHERE apellido_administrador LIKE ? OR nombre_administrador LIKE ?
                ORDER BY apellido_administrador';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        //echo $this->clave.' ';
        $sql = 'INSERT INTO sec_usuarios(id_rol,  usuario, clave,nombres, apellidos,email,pin,estado)
                VALUES(1, ?, ?, ?, ?,?,?,1)';
        $params = array($this->alias, $this->clave, $this->nombre, $this->apellido, $this->correo, $this->generarPin());
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_usuario, nombres, apellidos, email, usuario
                FROM sec_usuarios WHERE estado="A" 
                ORDER BY apellidos';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_usuario, nombres, apellidos, email, usuario
                FROM sec_usuarios
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE sec_usuarios
                SET nombres = ?, apellidos = ?, email = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'UPDATE sec_usuarios SET estado="I" 
                WHERE id_usuario = ?';
        /*$sql = 'DELETE FROM sec_usuarios
                WHERE id_usuario = ?';*/
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
