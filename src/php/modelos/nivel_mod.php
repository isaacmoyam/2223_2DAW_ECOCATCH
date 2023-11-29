<?php

/**
 * Modelo de Nivel
 *
 * PHP version 8.2
 *
 * @category Modelo
 * @package  Nivel
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'php/modelos/db.php';


/**
 * Clase para gestionar los niveles y mensajes asociados.
 */
class Nivel_Mod {
    
    /**
     * Instancia de la conexión a la base de datos.
     * @var mysqli
     */
    private $mysqli;

    /**
     * Constructor de la clase Nivel_Mod.
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
     * Muestra la lista de niveles.
     *
     * @return array Arreglo con la información de los niveles.
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

    /**
     * Muestra los mensajes asociados a un nivel específico.
     *
     * @param int $id ID del nivel.
     * @return array Arreglo con la información de los mensajes del nivel.
     */
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
     * Borra un nivel específico.
     *
     * @param int $id ID del nivel a borrar.
     */
    public function borrar($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM nivel WHERE id='.$id;
        $result = $this->mysqli->query($sql);
        $this->cerrarConexion();

        return;
    }

    /**
     * Crea un nuevo nivel.
     *
     * @param string $nombre Nombre del nivel.
     * @param int $items Cantidad de items del nivel.
     * @param int $velocidad Velocidad del barco en el nivel.
     * @return int|null ID del nuevo nivel creado, o null en caso de error.
     */ 
    public function crear($nombre, $items, $velocidad) {
        $this->establecerConexion();
       
        try {
            $sql = 'INSERT INTO nivel (nombre, cantidadItems, velocidadBarco) VALUES ("'.$nombre.'", "'.$items.'", "'.$velocidad.'")';
            $result = $this->mysqli->query($sql);
            $idNivel = $this->mysqli->insert_id;
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        $this->cerrarConexion();

        return $idNivel;
    }

    /**
     * Busca un nivel específico para su modificación.
     *
     * @param int $id ID del nivel a buscar.
     * @return array|null Arreglo con la información del nivel, o null en caso de no encontrarlo.
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
     * Modifica un nivel específico.
     *
     * @param int $id ID del nivel a modificar.
     * @param string $nombre Nuevo nombre del nivel.
     * @param int $items Nueva cantidad de items del nivel.
     * @param int $velocidad Nueva velocidad del barco en el nivel.
     * @return int|null ID del nuevo nivel creado, o null en caso de error.
     */
    public function modificar($id, $nombre, $items, $velocidad) {
        $this->establecerConexion();

        try {
            $sql = 'UPDATE nivel SET nombre = "'.$nombre.'", cantidadItems = "'.$items.'", velocidadBarco = "'.$velocidad.'" WHERE id ='.$id;
            $result = $this->mysqli->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        $this->cerrarConexion();
    }

    /**
     * Borra un mensaje específico.
     *
     * @param int $id ID del mensaje a borrar.
     */
    public function borrarMensaje($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM mensaje WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        return;
    }

    /**
     * Busca un mensaje específico para su modificación.
     *
     * @param int $id ID del mensaje a buscar.
     * @return array|null Arreglo con la información del mensaje, o null en caso de no encontrarlo.
     */
    public function buscarMensaje($id) {
        $this->establecerConexion();
        $sql = 'SELECT id, tipo, contenido, puntosHasta, idNivel FROM mensaje WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();
        return $fila;
    }


    /**
     * Mueve un mensaje a un nuevo nivel.
     *
     * @param int $id ID del mensaje a mover.
     * @param int $idNivel Nuevo ID del nivel al que se mueve el mensaje.
     */
    public function moverMensaje($id, $idNivel) {
        $this->establecerConexion();
        $sql = 'UPDATE mensaje SET idNivel = "'.$idNivel.'" WHERE id ='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();
    }

    /**
     * Modifica un mensaje específico.
     *
     * @param string $tipo Nuevo tipo del mensaje.
     * @param string $contenido Nuevo contenido del mensaje.
     * @param int|null $puntosHasta Nuevos puntos hasta del mensaje.
     * @param int $idMsg ID del mensaje a modificar.
     * @return int|null ID del nuevo mensaje creado, o null en caso de error.
     */
     public function modificarNivelMensaje($tipo, $contenido, $puntosHasta, $idMsg) {
        $this->establecerConexion();

        try {
            $sql = 'UPDATE mensaje SET tipo = "'.$tipo.'", contenido = "'.$contenido.'", puntosHasta = "'.$puntosHasta.'" WHERE id ='.$idMsg;
            $result = $this->mysqli->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error;
        }

        $this->cerrarConexion();
    }

    /**
     * Crea un nuevo mensaje asociado a un nivel.
     *
     * @param string $tipo Tipo del mensaje.
     * @param string $contenido Contenido del mensaje.
     * @param int|null $puntosHasta Puntos hasta del mensaje.
     * @param int $idNivel ID del nivel al que se asocia el mensaje.
     */
    public function crearMensaje($tipo, $contenido, $puntosHasta, $idNivel) {
        $this->establecerConexion();
        $sql = 'INSERT INTO mensaje (tipo, contenido, puntosHasta, idNivel) VALUES ("'.$tipo.'", "'.$contenido.'", "'.$puntosHasta.'", "'.$idNivel.'")';
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();
    }

    public function ajaxNombreNiveles() {
        $this->establecerConexion();

        //Consulta para obtener la informacion del campo de nombre en la tabla niveles
        $sqlNombreNivel = "SELECT nombre FROM nivel;";
        $resultNombreNivel = $this->mysqli->query($sqlNombreNivel);

        $nombreNivel = array();
        while ($row = $resultNombreNivel->fetch_assoc()) {
            $nombreNivel[] = $row;
        }

        $this->cerrarConexion();

        return json_encode($nombreNivel);
    }
}
?>