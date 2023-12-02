<?php

/**
 * Modelo de la partida
 *
 *
 * @category Modelo
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'php/modelos/db.php';


/**
 * Clase para gestionar la tabla partida.
 */
class Partida_Mod
{

    /**
     * Instancia de la conexión a la base de datos.
     * @var mysqli
     */
    private $conexion;

    /**
     * Constructor de la clase Partida_Mod
     */
    public function __construct()
    {
        $dbObj = new Db();
        $this->conexion = $dbObj->mysqli;
    }

    /**
     * Recoge datos de la tabla partida y los retorna al controlador en json.
     */
    public function ajaxDatosPartida() {
        //Consulta para obtener información de partida
        $sqlPartida = "SELECT p.nombre, p.correo, p.puntuacion, n.nombre FROM partida p INNER JOIN nivel n on p.id = n.idNivel";
        $resultPartida = $this->mysqli->query($sqlPartida);

        $partida = array();
        while ($row = $resultPartida->fetch_assoc()) {
            $partida[] = $row;
        }

        $this->conexion->close(); //Cerrar conexion

        return json_encode($partida);
    }

    /**
     * Inserta en la tabla partida los datos que han sido enviado por ajax.
     */
    public function insertarPartida($nombre,$correo,$puntuacion,$idNivel) {
        //Consulta para obtener información de partida
        try {
            $sql = 'INSERT INTO partida (nombre, correo,puntuacion,idNivel) VALUES ("'.$nombre.'", "'.$correo.'", "'.$puntuacion.'", "'.$idNivel.'")';
            $result = $this->mysqli->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        $this->conexion->close(); //Cerrar conexion
    }
}