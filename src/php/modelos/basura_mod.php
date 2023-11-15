<?php
class Basura_Mod {
    private $mysqli;

    public function __construct() {
        $this->mysqli = new mysqli('localhost', 'root', '', 'ecocatch');

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
        $sql = "INSERT INTO item (nombre, nombreImagen) VALUES ($nombre, $imagen)";
        $result = $this->mysqli->query($sql);
        $id = $this->mysqli->insert_id;
        if($result->affected_rows = 0)
            return 'Algo ha salido mal';
        else{
            
            $sql = "INSERT INTO basura (id, valor) VALUES ($id, $valor)";
            $result = $this->mysqli->query($sql);
            if($result->affected_rows = 0)
                return 'Algo ha salido mal';
        } 
        echo 'Insertado correctamente';
    }
    public function modificar($id) {
        $sql = 'DELETE * FROM basura WHERE id='.$id;
        $result = $this->mysqli->query($sql);
        $basuras = array();
        while ($row = $result->fetch_assoc()) {
            $basuras[] = $row;
        }
        return $basuras;
    }
}

