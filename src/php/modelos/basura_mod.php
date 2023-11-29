<?php

/**
 * Modelo de la basura
 *
 * PHP version 8.2
 *
 * @category Modelo
 * @package  Basura_Mod
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'php/modelos/db.php';

/**
 * Clase modelo para la gestión de basura.
 */
class Basura_Mod {
    
    /**
     * Instancia de la conexión a la base de datos.
     * @var mysqli
     */
    private $mysqli;
    
    /**
     * Constructor de la clase Basura_Mod.
     */
    public function __construct() {
       
    }
    
    /**
     * Establece la conexión con la base de datos.
     */
    public function establecerConexion(){
		$dbObj = new Db();
		$this->mysqli = $dbObj->mysqli;
	}

    /**
     * Cierra la conexión con la base de datos.
     */
    public function cerrarConexion() {
        if ($this->mysqli) {
            mysqli_close($this->mysqli);
        }
    }

    /**
     * Muestra la información de basura.
     * @return array
     */
    public function mostrar() {
        $this->establecerConexion();
        $sql = "SELECT basura.id, item.nombre, item.imagen, basura.valor FROM basura INNER JOIN item ON basura.id = item.id";

        $result = $this->mysqli->query($sql);

        $basuras = array();
        while ($row = $result->fetch_assoc()) {
            $row['imagen'] = base64_encode($row['imagen']); //Para modificar los datos de la imagen en base 64
            $basuras[] = $row;
        }

        $this->cerrarConexion();

        return $basuras;
    }

    /**
     * Borra la basura con un ID específico.
     */
    public function borrar($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM item WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        return;
    }

    /**
     * Crea una nueva basura.
     * @param string $nombre
     * @param string $imagen
     * @param int $valor
     * @return bool
     */ 
    public function crear($nombre, $imagen, $valor) {
        $this->establecerConexion();

        //Para quitar comillas en la imagen
        $img = $this->mysqli->real_escape_string($imagen);

        $sql = 'INSERT INTO item (nombre, imagen) VALUES ("'.$nombre.'", "'.$img.'")';
        $result = $this->mysqli->query($sql);
        $id = $this->mysqli->insert_id;

        $this->cerrarConexion();

        $this->establecerConexion();
        try {
            $sql = 'INSERT INTO basura (id, valor) VALUES ("'.$id.'", "'.$valor.'")';
            $result = $this->mysqli->query($sql); 
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        $this->cerrarConexion();
    }

    /**
     * Busca la basura con un ID específico para modificar.
     * @param int $id
     * @return array
     */
    public function buscarModificar($id) {
        $this->establecerConexion();
        $sql = 'SELECT basura.id, item.nombre, item.imagen, basura.valor FROM basura INNER JOIN item ON basura.id=item.id WHERE item.id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();

        $fila['imagen'] = base64_encode($fila['imagen']); //Cambio datos recogidos de imagen en codificacion base64

        return $fila;
    }

    /**
     * Modifica la basura con un ID específico.
     * @param int $id
     * @param string $nombre
     * @param string $imagen
     * @param int $valor
     * @return bool
     */
    public function modificar($id, $nombre, $imagen, $valor) {
        $this->establecerConexion();

        //Para quitar comillas en la imagen
        $img = $this->mysqli->real_escape_string($imagen);

        try {
            $sql = 'UPDATE item SET nombre = "'.$nombre.'", imagen = "'.$img.'" WHERE id = '.$id;
            $result = $this->mysqli->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        $this->cerrarConexion();

        $this->establecerConexion();
        try {
            $sql = 'UPDATE basura SET valor = '.$valor.' WHERE id = '.$id;
            $result = $this->mysqli->query($sql);  
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        $this->cerrarConexion();
    }

    /**
     * Recoge datos de basura y los retorna al controlador en json.
     */
    public function ajaxDatosBasura() {
        $this->establecerConexion();
    
        // Consulta para obtener información de basuras
        $sqlBasura = "SELECT basura.id, item.nombre, item.imagen, basura.valor FROM basura INNER JOIN item ON basura.id = item.id";
        $resultBasura = $this->mysqli->query($sqlBasura);
    
        $basuras = array();
        while ($row = $resultBasura->fetch_assoc()) {
            $row['imagen'] = base64_encode($row['imagen']);
            $basuras[] = $row;
        }
    
        $this->cerrarConexion();
    
        return json_encode($basuras);
    }    
}
?>