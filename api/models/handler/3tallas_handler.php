<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class TallaHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $search = null;
    protected $idModelo = null;
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

        $sql = 'SELECT id_talla, descripcion_talla, estado_talla
                FROM ctg_tallas
                WHERE descripcion_talla LIKE  ? 
                ORDER BY CAST(descripcion_talla AS UNSIGNED)';

        $params = array($this->search);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO ctg_tallas(descripcion_talla, estado_talla)
                VALUES(?, ?)';
        $params = array($this->nombre, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT * FROM ctg_tallas;';
        return Database::getRows($sql);
    }
    public function readExist($valor)
    {
        $sql = 'select descripcion_talla from ctg_tallas where descripcion_talla=?';
        $params = array($valor);
        $data = Database::getRow($sql, $params);

        if (empty($data['descripcion_talla'])) {
            return false;
        } else {
            return true;
        }
    }
    public function readAllById()
    {
        $sql = 'SELECT id_talla, descripcion_talla
        FROM ctg_tallas
        WHERE NOT EXISTS (
            SELECT 1
            FROM prc_modelo_tallas
            WHERE prc_modelo_tallas.id_talla = ctg_tallas.id_talla
            AND id_modelo=?
        );';
        $params = array($this->idModelo);
        return Database::getRows($sql, $params);
    }
    public function readAllByIdTalla()
    {
        $sql = 'SELECT id_talla, descripcion_talla
        FROM (
            SELECT id_talla, descripcion_talla
            FROM ctg_tallas
            WHERE id_talla =?
            UNION
            SELECT id_talla, descripcion_talla
            FROM ctg_tallas
            WHERE id_talla NOT IN (
                SELECT id_talla
                FROM prc_modelo_tallas
                WHERE id_modelo = ?
            )
        ) AS tallas;';

        $params = array($this->id,$this->idModelo);
        return Database::getRows($sql, $params);

    }


    public function readOne()
    {
        $sql ='SELECT id_talla, descripcion_talla, estado_talla
        FROM ctg_tallas
        WHERE id_talla=? ';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto
                FROM prc_modelos
                WHERE id_modelo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE ctg_tallas
                SET descripcion_talla = ?,estado_talla = ?
                WHERE id_talla = ?';
        $params = array($this->nombre,$this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM ctg_tallas
                WHERE id_talla = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT mo.id_modelo, mo.descripcion,mo.foto, mo.estado,ma.descripcion as marca
        FROM prc_modelos mo
        INNER JOIN ctg_marcas ma USING(id_marca)
        WHERE mo.id_marca LIKE ? OR estado="A"
        ORDER BY mo.descripcion';
        /*'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, existencias_producto
                FROM producto
                INNER JOIN categoria USING(id_categoria)
                WHERE id_categoria = ? AND estado_producto = true
                ORDER BY nombre_producto'*/;
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar gráficos.
    */
    public function cantidadProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, COUNT(id_producto) cantidad
                FROM producto
                INNER JOIN categoria USING(id_categoria)
                GROUP BY nombre_categoria ORDER BY cantidad DESC LIMIT 5';
        return Database::getRows($sql);
    }

    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM producto)), 2) porcentaje
                FROM producto
                INNER JOIN categoria USING(id_categoria)
                GROUP BY nombre_categoria ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT nombre_producto, precio_producto, estado_producto
                FROM producto
                INNER JOIN categoria USING(id_categoria)
                WHERE id_categoria = ?
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }
}
