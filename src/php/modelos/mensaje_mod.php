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

class Mensaje_Mod {
    
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
     * Borra una basura específica de la base de datos.
     *
     * @param int $id ID de la basura a borrar.
     *
     * @return int|void Código de error o nada.
     */
    public function borrar($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM mensaje WHERE id='.$id;
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
    public function crear($tipo, $contenido, $puntosHasta, $idNivel) {
        $this->establecerConexion();
        $sql = 'INSERT INTO mensaje (tipo, contenido, puntosHasta, idNivel) VALUES ("'.$tipo.'", "'.$contenido.'", "'.$puntosHasta.'", "'.$idNivel.'")';
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
        $sql = 'SELECT (tipo, contenido, puntosHasta, idNivel) FROM mensaje WHERE id='.$id;
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
    public function modificar($id, $tipo, $contenido, $puntosHasta, $idNivel) {
        $this->establecerConexion();
        $sql = 'UPDATE mensaje SET tipo = "'.$tipo.'", contenido = "'.$contenido.'", puntosHasta = "'.$puntosHasta.'" , idNivel = "'.$idNivel.'" WHERE id ='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();
    }
}
?>