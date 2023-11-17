<?php
    require 'php/controladores/basura_con.php';
    $control = $_GET['control'];
    $metodo = $_GET['metodo'];

    switch ($metodo) {
        case 'crear':
            crear();
            break;
        case 'buscarModificar':
            buscarModificar();
            break;
        case 'borrar':
            borrar();
            break;
        case 'modificar':
            modificar();
            break;
        default:
            return;
    }
    function crear(){
        //echo 'Funcion crear<br>';
        $nombre = $_POST['nombre'];
        $imagen = $_POST['imagen'];
        $valor = $_POST['valor'];
        $obj = new Basura_Con();
        $resultado = $obj->crear($nombre,$imagen,$valor);
        if($resultado === false){
            header("Location: ../mockups/basura/gestionbasura.php?mensaje=false");
        }
        else
            header("Location: ../mockups/basura/gestionbasura.php?mensaje=true");
    }

    function borrar(){
        //echo 'Funcion borrar<br>';
        $id = $_GET['id'];
        $obj = new Basura_Con();
        $resultado = $obj->borrar($id);
        if($resultado === false){
            header("Location: ../mockups/basura/gestionbasura.php?mensaje=false");
        }
        else
            header("Location: ../mockups/basura/gestionbasura.php?mensaje=true");
    }

    function buscarModificar(){
        //echo 'Funcion modificar<br>';
        $id = $_GET['id'];
        $obj = new Basura_Con();
        $fila = $obj->buscarModificar($id);
        return $fila;
    }
    function modificar(){
        //echo 'Funcion crear<br>';
        print_r($_POST);
        $id = $_GET['id'];
        $nombre = $_POST['nombre'];
        $imagen = $_POST['imagen'];
        $valor = $_POST['valor'];
        $obj = new Basura_Con();
        $resultado = $obj->modificar($id, $nombre, $imagen, $valor);
        if($resultado === false){
            header("Location: ../mockups/basura/gestionbasura.php?mensaje=false");
        }
        else
            header("Location: ../mockups/basura/gestionbasura.php?mensaje=true");
    }
?>