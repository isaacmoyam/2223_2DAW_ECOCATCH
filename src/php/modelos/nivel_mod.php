<?php

/**
 * Clase Nivel_Mod para la manipulación de datos de niveles en la base de datos.
 *
 * PHP version 7.0
 *
 * @category Nivel
 * @package  Nivel_Mod
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'php/modelos/db.php';

class Nivel_Mod {
    
    private $mysqli;

    // CONSTRUCTOR DE LA CLASE
    public function __construct() {
       
    }
    
    // ESTABLECER CONEXIÓN CON LA BBDD
    public function establecerConexion(){
		$dbObj = new Db();
		$this->mysqli = $dbObj->mysqli;
	}

    // CERRAR LA CONEXIÓN CON LA BBDD
    public function cerrarConexion() {
        if ($this->mysqli) {
            mysqli_close($this->mysqli);
        }
    }

    // METODOS DE NIVEL

    //MOSTRAR NIVELES
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

    // MOSTRAR MENSAJES DE NIVEL CON ID ESPECIFICO
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

    // BORRAR NIVEL CON ID ESPECIFICO
    public function borrar($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM nivel WHERE id='.$id;
        $result = $this->mysqli->query($sql);
        $this->cerrarConexion();

        return;
    }

    // CREAR NIVEL 
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

    // BUSCAR NIVEL CON ID ESPECIFICO
    public function buscarModificar($id) {
        $this->establecerConexion();
        $sql = 'SELECT id,nombre,cantidadItems,velocidadBarco FROM nivel WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();
        return $fila;
    }

    // MODIFICAR NIVEL
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

    // METODOS DE MENSAJES DE NIVELES

    // BORRAR MENSAJE CON ID ESPECIFICO
    public function borrarMensaje($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM mensaje WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        return;
    }

    // BUSCAR MENSAJE CON ID ESPECIFICO
    public function buscarMensaje($id) {
        $this->establecerConexion();
        $sql = 'SELECT id, tipo, contenido, puntosHasta, idNivel FROM mensaje WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();
        return $fila;
    }


    // MODIFICAR MENSAJE CON ID ESPECIFICO
    public function moverMensaje($id, $idNivel) {
        $this->establecerConexion();
        $sql = 'UPDATE mensaje SET idNivel = "'.$idNivel.'" WHERE id ='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();
    }

     // MODIFICAR NIVEL
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

    // CREAR UN MENSAJE
    public function crearMensaje($tipo, $contenido, $puntosHasta, $idNivel) {
        $this->establecerConexion();
        $sql = 'INSERT INTO mensaje (tipo, contenido, puntosHasta, idNivel) VALUES ("'.$tipo.'", "'.$contenido.'", "'.$puntosHasta.'", "'.$idNivel.'")';
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();
    }
}
?>