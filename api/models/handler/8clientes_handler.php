<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cliente.
 */
class ClienteHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $latitud = null;
    protected $longitud = null;
    protected $search = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $email = null;
    protected $direccion = null;
    protected $usuario = null;
    protected $alias = null;
    protected $clave = null;
    protected $estado = null;

    /*
     *  Métodos para gestionar la cuenta del cliente.
     */
    /*GENERAR PIN*/
    public function generarPin()
    {
        $pinLength = 6;
        $pin = '';
        for ($i = 0; $i < $pinLength; $i++) {
            $pin .= mt_rand(0, 9);
        }
        return $pin;
    }
    public function checkUser($usuario, $password)
    {
        $sql = 'SELECT id_cliente, usuario_cliente, clave_cliente, estado_cliente,email_cliente
                FROM prc_clientes
                WHERE usuario_cliente = ?';
        $params = array($usuario);
        $data = Database::getRow($sql, $params);
        if ($data && password_verify($password, $data['clave_cliente'])) {
            $this->id = $data['id_cliente'];
            $this->usuario = $data['usuario_cliente'];
            $this->estado = $data['estado_cliente'];
            $this->email = $data['email_cliente'];
            return true;
        } else {
            return false;
        }
    }

    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['usuarioc'] = $this->usuario;
            $_SESSION['correo'] = $this->email;
            return true;
        } else {
            return false;
        }
    }
    public function checkUserM($usuario, $password)
    {
        $sql = 'SELECT id_cliente, usuario_cliente, clave_cliente, estado_cliente
            FROM prc_clientes
            WHERE usuario_cliente = ?';
        $params = array($usuario);
        $data = Database::getRow($sql, $params);
        if ($data && password_verify($password, $data['clave_cliente'])) {
            return array('success' => true, 'idCliente' => $data['id_cliente']);
        } else {
            return array('success' => false);
        }
    }
    public function checkPassword($password)
    {
        $sql = 'SELECT clave_cliente
                FROM prc_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if ($data && password_verify($password, $data['clave_cliente'])) {
            return true;
        } else {
            return false;
        }
    }
    public function changePassword()
    {
        $sql = 'UPDATE prc_clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, email_cliente, usuario_cliente,direccion_cliente,lat,lon
                FROM prc_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE prc_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, email_cliente = ?,
                 usuario_cliente = ?,direccion_cliente=?,lat=? ,lon=? 
                WHERE id_cliente = ?';
        $params = array(
            $this->nombre, $this->apellido, $this->email, $this->usuario,
            $this->direccion, $this->latitud, $this->longitud, $_SESSION['idCliente']
        );
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $this->search = $this->search === '' ? '%%' : '%' . $this->search . '%';
        $sql = 'SELECT id_cliente,usuario_cliente, clave_cliente, 
                nombre_cliente, apellido_cliente ,email_cliente, estado_cliente,direccion_cliente
               from prc_clientes
                WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ? OR usuario_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($this->search, $this->search, $this->search);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        //echo $this->clave.' ';
        $sql = 'insert into prc_clientes(usuario_cliente,clave_cliente,nombre_cliente,
        apellido_cliente,email_cliente,pin_cliente,estado_cliente,direccion_cliente,lat,lon) 
        values(?,?,?,?,?,?,true,?,?,?)';
        $params = array(
            $this->usuario, $this->clave, $this->nombre,
            $this->apellido, $this->email, $this->generarPin(), $this->direccion, $this->latitud, $this->longitud
        );

        return Database::executeRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE prc_clientes 
                SET nombre_cliente = ?, apellido_cliente = ?, email_cliente = ?,estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->email, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_cliente,usuario_cliente, clave_cliente, 
         nombre_cliente, apellido_cliente ,email_cliente, estado_cliente,direccion_cliente
                from prc_clientes 
                ORDER BY apellido_cliente';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cliente,usuario_cliente,clave_cliente,nombre_cliente,
        CONCAT(nombre_cliente," ",apellido_cliente) as nombre,
                apellido_cliente,email_cliente,estado_cliente,direccion_cliente,lat,lon
                from prc_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
    public function readExist($username)
    {
        $sql = 'SELECT usuario_cliente, clave_cliente, nombre_cliente, apellido_cliente, email_cliente, estado_cliente
        FROM prc_clientes
        WHERE usuario_cliente = ?';
        $params = array($username);
        $data = Database::getRow($sql, $params);

        if (empty($data['usuario_cliente'])) {
            return false;
        } else {
            return true;
        }
    }
    public function readExistMail($username)
    {
        $sql = 'SELECT email_cliente
        FROM prc_clientes
        WHERE email_cliente = ?';
        $params = array($username);
        $data = Database::getRow($sql, $params);

        if (empty($data['email_cliente'])) {
            return false;
        } else {
            return true;
        }
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM prc_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
    public function topClientesR($num=20)
    {

        $sql = 'SELECT id_cliente,CONCAT(nombre_cliente," ", apellido_cliente) AS cliente, email_cliente, 
        SUM(cantidad_detalle_pedido) AS total_productos_comprados
        FROM prc_clientes 
        JOIN prc_pedidos USING(id_cliente)
        JOIN prc_detalle_pedidos USING(id_pedido)
        WHERE estado_pedido = "Finalizado"
        GROUP BY id_cliente, nombre_cliente, apellido_cliente, email_cliente
        ORDER BY total_productos_comprados DESC
        LIMIT  ' . $num. ';';
        $params = array();
        return Database::getRows($sql, $params);
    }
}
