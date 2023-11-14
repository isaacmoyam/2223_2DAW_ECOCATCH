<?php

class Basura_Mod {
    private $mysqli;

    public function __construct($host, $usuario, $contrasena, $baseDeDatos) {
        $this->mysqli = new mysqli($host, $usuario, $contrasena, $baseDeDatos);

        if ($this->mysqli->connect_error) {
            die("Error de conexión: " . $this->mysqli->connect_error);
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

    /*public function obtenerBasuraId($id) {
        $sql = "SELECT * FROM usuarios WHERE id = ?";
        $stmt = $this->mysqli->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_assoc();
    }*/


    public function crear($nombre, $imagen, $valor) {
        $sql = "INSERT INTO item (nombre, nombreImagen) VALUES ($nombre, $imagen)";
        $result = $this->mysqli->query($sql);
        return 'Insertado correctamente';
    }
}
