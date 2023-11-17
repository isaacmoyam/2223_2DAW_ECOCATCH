<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
class Basura_Mod {
    
    private $mysqli;

    public function __construct($host, $username, $passwd, $dbname) {
        mysqli_report(MYSQLI_REPORT_ERROR);
        $this->mysqli = new mysqli($host, $username, $passwd, $dbname);

        if ($this->mysqli->connect_error) {
            die ("Error de conexión: " . $this->mysqli->connect_error);
        }
    }
    public function mostrar() {
        $sql = "SELECT basura.id, item.nombre, item.nombreImagen, basura.valor FROM basura INNER JOIN item ON basura.id=item.id";
        $result = $this->mysqli->query($sql);

        if($result === false){
            $errno = $this->mysqli->errno;
            return $errno;
        }

        $basuras = array();
        while ($row = $result->fetch_assoc()) {
            $basuras[] = $row;
        }
        return $basuras;
    }
    public function borrar($id) {
        $sql = 'DELETE FROM item WHERE id='.$id;
        $result = $this->mysqli->query($sql);

        if($result === false){
            $errno = $this->mysqli->errno;
            return $errno;
        }
        return;
    }
    public function crear($nombre, $imagen, $valor) {
        $sql = 'INSERT INTO item (nombre, nombreImagen) VALUES ("'.$nombre.'", "'.$imagen.'")';
        $result = $this->mysqli->query($sql);
        $id = $this->mysqli->insert_id;
            if($result === false){
                $errno = $this->mysqli->errno;
                return $errno;
            }
        else{
            
            $sql = 'INSERT INTO basura (id, valor) VALUES ("'.$id.'", "'.$valor.'")';
            $result = $this->mysqli->query($sql);
            if($result === false){
                $errno = $this->mysqli->errno;
                return $errno;
            }
        }
    }
    public function buscarModificar($id) {
        $sql = 'SELECT basura.id, item.nombre, item.nombreImagen, basura.valor FROM basura INNER JOIN item ON basura.id=item.id WHERE item.id='.$id;
        $result = $this->mysqli->query($sql);
        $fila = $result->fetch_assoc();
        return $fila;
    }
    public function modificar($id, $nombre, $imagen, $valor) {
        $sql = 'UPDATE item SET nombre = "'.$nombre.'", nombreImagen = "'.$imagen.'" WHERE id = '.$id;
        $this->mysqli->query($sql);

        $sql = 'UPDATE basura SET valor = '.$valor.' WHERE id = '.$id;
        $this->mysqli->query($sql);
    }
}

