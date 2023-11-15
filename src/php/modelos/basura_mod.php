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
        $basuras = array();
        while ($row = $result->fetch_assoc()) {
            $basuras[] = $row;
        }
        return $basuras;
    }

    public function borrar($id) {
        $sql = 'DELETE FROM item WHERE id='.$id;
        $this->mysqli->query($sql);
        return;
    }

    public function crear($nombre, $imagen, $valor) {
        $sql = 'INSERT INTO item (nombre, nombreImagen) VALUES ("'.$nombre.'", "'.$imagen.'")';
        $result = $this->mysqli->query($sql);
        $id = $this->mysqli->insert_id;
        if(!$result)
            echo 'Algo ha salido mal';
        else{
            
            $sql = 'INSERT INTO basura (id, valor) VALUES ("'.$id.'", "'.$valor.'")';
            $result = $this->mysqli->query($sql);
            if($result)
                return 'Algo ha salido mal'; 
        }
    }

    

    public function buscarModificar($id) {
        $sql = "SELECT basura.id, item.nombre, item.nombreImagen, basura.valor FROM basura INNER JOIN item ON basura.id=item.id";
        $result = $this->mysqli->query($sql);
        $fila = $result->fetch_assoc();
        return $fila;
    }
}

