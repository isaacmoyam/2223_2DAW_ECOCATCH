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

        $basuras = array();
        while ($row = $result->fetch_assoc()) {
            $basuras[] = $row;
        }

        $this->cerrarConexion();

        return $basuras;
    }

}