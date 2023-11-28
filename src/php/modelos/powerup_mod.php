<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'php/modelos/db.php';

/**
 * Clase modelo para la gestión de powerup.
 */
class Powerup_Mod
{

    /**
     * Instancia de la conexión a la base de datos.
     * @var mysqli
     */
    private $mysqli;

    /**
     * Constructor de la clase Powerup_Mod.
     */
    public function __construct()
    {

    }

    /**
     * Establece la conexión con la base de datos.
     */
    public function establecerConexion()
    {
        $dbObj = new Db();
        $this->mysqli = $dbObj->mysqli;
    }

    /**
     * Cierra la conexión con la base de datos.
     */
    public function cerrarConexion()
    {
        if ($this->mysqli) {
            mysqli_close($this->mysqli);
        }
    }

    /**
     * Consulta la información del power up.
     * @return array
     */
    public function mostrar() {
        $this->establecerConexion();
        $sql = "SELECT p.id, i.nombre, i.nombreImagen, p.aumento, p.descripcion FROM powerup p INNER JOIN item i ON p.id = i.id";
        $result = $this->mysqli->query($sql);

        $powerups = array();
        while ($row = $result->fetch_assoc()) {
            $powerups[] = $row;
        }

        $this->cerrarConexion();

        return $powerups;
    }

    /**
     * Busca un powerup con un ID específico para modificar.
     * @param int $id
     * @return array
     */
    public function buscarModificar($id) {
        $this->establecerConexion();
        $sql = 'SELECT p.id, i.nombre, i.nombreImagen, p.aumento, p.descripcion FROM powerup p INNER JOIN item i ON p.id=i.id WHERE i.id='.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $fila = $result->fetch_assoc();
        return $fila;
    }

    /**
     * Modifica un powerup con un ID específico.
     * @param int $id
     * @param string $nombre
     * @param string $imagen
     * @param int $aumento
     * @return bool
     */
    public function modificar($id, $nombre, $imagen, $aumento, $descripcion) {
        $this->establecerConexion();
        $sql = 'UPDATE item SET nombre = "'.$nombre.'", nombreImagen = "'.$imagen.'" WHERE id = '.$id;
        $result = $this->mysqli->query($sql);

        $this->cerrarConexion();

        $this->establecerConexion();

        try {
            /*
             * Se ha usado una expresion ternaria. En esta expresion se comprueba la condicion
             * $descripcion === "" que evalua si descripcion es una cadena vacia.
             * Esto esta separado por el caracter :, el cual separa
             * si la condicion es verdadera devuelve null y en casso contrario devuelve '"'.$descripcion.'"'
             * */
            $sql = 'UPDATE powerup SET aumento = '.$aumento.' ,descripcion = '.($descripcion === "" ? 'NULL' : '"'.$descripcion.'"').'  WHERE id = '.$id;
            $result = $this->mysqli->query($sql);
        } catch(mysqli_sql_exception $e) {
            $error = true;
            return $error; //Si hay un error devulve true
        }

        $this->cerrarConexion();
    }

    /**
     * Recoge datos de power-ups y los retorna al controlador en json.
     */
    public function ajaxDatosPowerup() {
        $this->establecerConexion();

        /*
         * Consulta para obtener información de power-ups
         * Descripcion no se manda dado que no e necesitara para nada
         * */
        $sqlPowerup = "SELECT p.id, i.nombre, i.nombreImagen, p.aumento FROM powerup p INNER JOIN item i on p.id = i.id";
        $resultPowerup = $this->mysqli->query($sqlPowerup);

        $powerups = array();
        while ($row = $resultPowerup->fetch_assoc()) {
            $powerups[] = $row;
        }

        $this->cerrarConexion();

        return json_encode($powerups);
    }
}