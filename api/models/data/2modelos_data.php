<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/2modelos_handler.php');
/*
 *	Clase para manejar el encapsulamiento de los datos de la tabla PRODUCTO.
 */
class ModeloData extends ModeloHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *   Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del modelo es incorrecto';
            return false;
        }
    }
    public function setLimit($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->limit = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del limite es incorrecto';
            return false;
        }
    }

    /*
 * Establece el nombre del modelo.
 */
    public function setNombre($value, $min = 2, $max = 50)
    {
        // Validación del nombre.
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    /*
 * Establece la descripción del modelo.
 */
    public function setDescripcion($value, $min = 2, $max = 250)
    {
        // Validación de la descripción.
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripción contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    /*
 * Establece el precio del modelo.
 */
    public function setPrecio($value)
    {
        // Validación del precio.
        if (Validator::validateMoney($value)) {
            $this->precio = $value;
            return true;
        } else {
            $this->data_error = 'El precio debe ser un valor numérico';
            return false;
        }
    }

    /*
 * Establece las existencias del modelo.
 */
    public function setExistencias($value)
    {
        // Validación de las existencias.
        if (Validator::validateNaturalNumber($value)) {
            $this->existencias = $value;
            return true;
        } else {
            $this->data_error = 'El valor de las existencias debe ser numérico entero';
            return false;
        }
    }

    /*
 * Establece la imagen del modelo.
 */
    public function setImagen($file, $filename = null)
    {
        // Validación de la imagen.
        if (Validator::validateImageFile($file, 1400, 1000)) {
            $this->imagen = Validator::getFileName();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen = $filename;
            return true;
        } else {
            $this->imagen = 'default.png';
            return true;
        }
    }

    /*
 * Establece la categoría del modelo.
 */
    public function setCategoria($value)
    {
        // Validación del identificador de la categoría.
        if (Validator::validateNaturalNumber($value)) {
            $this->categoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    /*
 * Establece el estado del modelo.
 */
    public function setEstado($value)
    {
        // Validación del estado.
        if (Validator::validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'Estado incorrecto';
            return false;
        }
    }

    /*
 * Establece el nombre de archivo.
 */
    public function setFilename()
    {
        // Obtiene el nombre de archivo desde la lectura.
        if ($data = $this->readFilename()) {
            $this->filename = $data['foto_modelo'];
            return true;
        } else {
            $this->data_error = 'Producto inexistente';
            return false;
        }
    }
    public function setSearch($value)
    {
        $this->search = $value;
        return true;
    }

    /*
     *  Métodos para obtener los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
