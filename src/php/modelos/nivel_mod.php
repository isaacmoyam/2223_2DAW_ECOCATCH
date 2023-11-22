<?php

/**
 * Clase Basura_Mod para la manipulación de datos de basura en la base de datos.
 *
 * PHP version 7.0
 *
 * @category Basura
 * @package  Basura_Mod
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'php/modelos/db.php';

class Nivel_Mod {
    
    private $mysqli;

    public function __construct() {
       
    }
    
    // Establecer conexión con la bbdd
    public function establecerConexion(){
		$dbObj = new Db();
		$this->mysqli = $dbObj->mysqli;
	}

    // Cerrar la conexión con la bbdd
    public function cerrarConexion() {
        if ($this->mysqli) {
            mysqli_close($this->mysqli);
        }
    }

    /**
     * Obtiene y devuelve la información de todas las basuras.
     *
     * @return array|mixed Arreglo asociativo con la información de las basuras o código de error.
     */
    public function mostrar() {
        $this->establecerConexion();
        $sql = "SELECT id,nombre,cantidadItems,velocidadBarco FROM nivel;";
        $result = $this->mysqli->query($sql);

        $niveles = array();
        while ($row = $result->fetch_assoc()) {
            $niveles[] = $row;
        }

        $this->cerrarConexion();

        return $niveles;
    }

    public function mostrarMensajes($id) {
        $this->establecerConexion();
        $sql = "SELECT mensaje.id,tipo,contenido,puntosHasta,idNivel FROM mensaje INNER JOIN nivel ON idNivel = nivel.id WHERE idNivel=" .$id;
        $result = $this->mysqli->query($sql);

        $mensajes = array();
        while ($row = $result->fetch_assoc()) {
            $mensajes[] = $row;
        }

        $this->cerrarConexion();

        return $mensajes;
    }

    /**
     * Borra una basura específica de la base de datos.
     *
     * @param int $id ID de la basura a borrar.
     *
     * @return int|void Código de error o nada.
     */
    public function borrar($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM nivel WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        return;
    }

    /**
     * Crea un nuevo registro de basura en la base de datos.
     *
     * @param string $nombre Nombre de la basura.
     * @param string $imagen Imagen asociada a la basura.
     * @param int    $valor  Valor/puntuación de la basura.
     *
     * @return int|void Código de error o nada.
     */
    public function crear($nombre, $items, $velocidad) {
        $this->establecerConexion();
        $sql = 'INSERT INTO nivel (nombre, cantidadItems, velocidadBarco) VALUES ("'.$nombre.'", "'.$items.'", "'.$velocidad.'")';
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();
    }

    /**
     * Busca información de basura específica para modificar.
     *
     * @param int $id ID de la basura a modificar.
     *
     * @return array|mixed Arreglo asociativo con la información de la basura o código de error.
     */
    public function buscarModificar($id) {
        $this->establecerConexion();
        $sql = 'SELECT id,nombre,cantidadItems,velocidadBarco FROM nivel WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();
        return $fila;
    }

    /**
     * Modifica la información de una basura en la base de datos.
     *
     * @param int    $id     ID de la basura a modificar.
     * @param string $nombre Nuevo nombre de la basura.
     * @param string $imagen Nueva imagen asociada a la basura.
     * @param int    $valor  Nuevo valor/puntuación de la basura.
     *
     * @return int|void Código de error o nada.
     */
    public function modificar($id, $nombre, $items, $velocidad) {
        $this->establecerConexion();
        $sql = 'UPDATE nivel SET nombre = "'.$nombre.'", cantidadItems = "'.$items.'", velocidadBarco = "'.$velocidad.'" WHERE id ='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();
    }
}
?>