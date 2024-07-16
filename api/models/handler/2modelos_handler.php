<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class ModeloHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $search = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $precio = null;
    protected $existencias = null;
    protected $imagen = null;
    protected $categoria = null;
    protected $estado = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/modelos/';

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $this->search = $this->search === '' ? '%%' : '%' . $this->search . '%';

        $sql = 'SELECT id_modelo, descripcion_modelo,foto_modelo, estado_modelo,descripcion_marca as marca
        FROM prc_modelos 
        INNER JOIN ctg_marcas USING(id_marca)
        WHERE descripcion_modelo LIKE ? OR descripcion_marca LIKE ?
        ORDER BY descripcion_modelo';

        $params = array($this->search,$this->search);
        return Database::getRows($sql, $params);
    }
    public function searchModelos($value)
    {
        $value = !empty($value) ? '%' . $value . '%' : '%%';
        
        $sql = 'SELECT id_modelo, descripcion_modelo,foto_modelo, estado_modelo,descripcion_marca as marca
        FROM prc_modelos 
        INNER JOIN ctg_marcas USING(id_marca)
        WHERE estado_modelo=true AND descripcion_modelo like ?
        ORDER BY descripcion_modelo';

        $params = array($value);
    return Database::getRows($sql, $params);
    }


    public function createRow()
    {
        $sql = 'INSERT INTO prc_modelos(descripcion_modelo, id_marca, foto_modelo, estado_modelo)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombre, $this->categoria, $this->imagen, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_modelo, descripcion_modelo,foto_modelo, estado_modelo,descripcion_marca as marca
        FROM prc_modelos
        INNER JOIN ctg_marcas  USING(id_marca)
        ORDER BY descripcion_modelo';
        return Database::getRows($sql);
    }
    public function readDesc()
    {
        $sql = 'SELECT DISTINCT id_modelo, descripcion_modelo, foto_modelo, estado_modelo, descripcion_marca as marca
        FROM prc_modelos 
        INNER JOIN ctg_marcas USING(id_marca)
        INNER JOIN prc_modelo_tallas USING(id_modelo)
        WHERE stock_modelo_talla > 0 AND estado_marca=true AND estado_modelo=true 
        ORDER BY id_modelo DESC LIMIT 12';
        return Database::getRows($sql);
    }


    public function readsubAll()
    {
        $sql = 'select mt.id_modelo_talla,mt.id_talla,mt.id_modelo,
        mt.stock_modelo_talla,mt.precio_modelo_talla,t.descripcion_talla as talla
        from prc_modelo_tallas mt 
        INNER JOIN ctg_tallas t USING(id_talla)
        INNER JOIN prc_modelos m USING(id_modelo)
        WHERE mt.id_modelo = ?
        ORDER BY t.descripcion_talla';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT mo.id_modelo,mo.id_marca, mo.descripcion_modelo,
        mo.foto_modelo,mo.estado_modelo, ma.descripcion_marca marca
        FROM prc_modelos mo
        INNER JOIN ctg_marcas ma USING(id_marca)
        WHERE mo.id_modelo=? ';
        $params = array($this->id);
        $data = Database::getRow($sql, $params);
        $_SESSION['idmod'] = $data['id_modelo'];
        return $data;
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_modelo
                FROM prc_modelos
                WHERE id_modelo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE prc_modelos 
                SET foto_modelo = ?, descripcion_modelo = ?,estado_modelo = ?, id_marca = ?
                WHERE id_modelo = ?';
        $params = array($this->imagen, $this->nombre, $this->estado, $this->categoria, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM prc_modelos
                WHERE id_modelo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT id_modelo, descripcion_modelo,foto_modelo, estado_modelo,descripcion_marca as marca
        FROM prc_modelos 
        INNER JOIN ctg_marcas USING(id_marca)
        WHERE estado_modelo=true and id_marca=?
        ORDER BY descripcion_modelo';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar gráficos.
    */
    public function cantidadProductosCategoria()
    {
        $sql = 'SELECT descripcion_marca, COUNT(id_marca) cantidad
        FROM prc_modelos
        INNER JOIN ctg_marcas USING(id_marca)
        GROUP BY descripcion_marca ORDER BY cantidad DESC LIMIT 5';
        return Database::getRows($sql);
    }

    public function porcentajeTop()
    {
        $sql = 'SELECT m.id_modelo, m.descripcion_modelo, ROUND(SUM(d.cantidad_detalle_pedido) * 100.0 / total_comprados.total_cantidad, 1) 
        AS porcentaje_comprado
        FROM prc_pedidos p
        JOIN prc_detalle_pedidos d USING(id_pedido)
        JOIN prc_modelo_tallas mt USING(id_modelo_talla)
        JOIN prc_modelos m USING(id_modelo)
        JOIN (SELECT SUM(d.cantidad_detalle_pedido) AS total_cantidad FROM prc_pedidos p JOIN prc_detalle_pedidos d USING(id_pedido)
        WHERE p.estado_pedido = "Finalizado") AS total_comprados
        WHERE p.estado_pedido = "Finalizado"
        GROUP BY m.id_modelo, m.descripcion_modelo, total_comprados.total_cantidad
        ORDER BY porcentaje_comprado DESC LIMIT 10;';
        return Database::getRows($sql);
    }
    public function topModelosR()
    {
        $sql = 'SELECT id_modelo, descripcion_modelo,descripcion_marca ,
        SUM(cantidad_detalle_pedido) AS total_cantidad_pedida
        FROM prc_pedidos
        JOIN  prc_detalle_pedidos USING(id_pedido)
        JOIN prc_modelo_tallas USING(id_modelo_talla)
        JOIN prc_modelos USING(id_modelo)
        JOIN ctg_marcas USING(id_marca)
        WHERE  estado_pedido = "Finalizado"
        GROUP BY id_modelo, descripcion_marca
        ORDER BY  total_cantidad_pedida DESC
        LIMIT 10;';
        return Database::getRows($sql);
    }

    public function tallasByModelo()
    {
        $sql = 'SELECT id_modelo,descripcion_modelo,id_talla,descripcion_talla,precio_modelo_talla,estado_marca
        FROM prc_modelo_tallas
        JOIN prc_modelos USING(id_modelo)
        JOIN ctg_tallas USING(id_talla)
        JOIN ctg_marcas USING(id_marca)
        WHERE id_modelo=?
        ORDER BY id_modelo, id_talla;';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar reportes.
    */

}
