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

class Basura_Mod {
    
    private $mysqli;
    
    // CONSTRUCTOR DE LA CLASE
    public function __construct() {
       
    }
    
    // ESTABLECER CONEXIÓN CON LA BBDD
    public function establecerConexion(){
		$dbObj = new Db();
		$this->mysqli = $dbObj->mysqli;
	}

    // CERRAR CONEXIÓN CON LA BBDD
    public function cerrarConexion() {
        if ($this->mysqli) {
            mysqli_close($this->mysqli);
        }
    }

    // MOSTRAR BASURA 
    public function mostrar() {
        $this->establecerConexion();
        $sql = "SELECT basura.id, item.nombre, item.nombreImagen, basura.valor FROM basura INNER JOIN item ON basura.id = item.id";
        $result = $this->mysqli->query($sql);

        $basuras = array();
        while ($row = $result->fetch_assoc()) {
            $basuras[] = $row;
        }

        $this->cerrarConexion();

        return $basuras;
    }

    // BORRAR BASURA CON ID ESPECIFICO
    public function borrar($id) {
        $this->establecerConexion();
        $sql = 'DELETE FROM item WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        return;
    }

    // CREAR BASURA 
    public function crear($nombre, $imagen, $valor) {
        $this->establecerConexion();
        $sql = 'INSERT INTO item (nombre, nombreImagen) VALUES ("'.$nombre.'", "'.$imagen.'")';
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

    // BUSCAR BASURA CON ID ESPECIFICO
    public function buscarModificar($id) {
        $this->establecerConexion();
        $sql = 'SELECT basura.id, item.nombre, item.nombreImagen, basura.valor FROM basura INNER JOIN item ON basura.id=item.id WHERE item.id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();
        return $fila;
    }

    // MODIFICAR BASURA CON ID ESPECIFICO
    public function modificar($id, $nombre, $imagen, $valor) {
        $this->establecerConexion();
        $sql = 'UPDATE item SET nombre = "'.$nombre.'", nombreImagen = "'.$imagen.'" WHERE id = '.$id;
        $result = $this->mysqli->query($sql);

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

    public function ajax() {
        $this->establecerConexion();
    
        // Consulta para obtener información de basuras
        $sqlBasura = "SELECT basura.id, item.nombre, item.nombreImagen, basura.valor FROM basura INNER JOIN item ON basura.id = item.id";
        $resultBasura = $this->mysqli->query($sqlBasura);
    
        $basuras = array();
        while ($row = $resultBasura->fetch_assoc()) {
            $basuras[] = $row;
        }
    
        // Consulta para obtener información de power-ups
        $sqlPowerup = "SELECT powerup.id, powerup.nombre, powerup.nombreImagen, powerup.aumento FROM powerup INNER JOIN item on powerup.id = item.id";
        $resultPowerup = $this->mysqli->query($sqlPowerup);
    
        $powerups = array();
        while ($row = $resultPowerup->fetch_assoc()) {
            $powerups[] = $row;
        }
    
        $this->cerrarConexion();
    
        // Combinar basuras y power-ups en un solo objeto
        $resultado = array(
            'basuras' => $basuras,
            'powerups' => $powerups
        );
    
        echo json_encode($resultado);
    }    
}
?>