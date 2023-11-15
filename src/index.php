<?php
    require 'php/controladores/basura_con.php';
    $control = $_GET['control'];
    $metodo = $_GET['metodo'];

    switch ($metodo) {
        case 'crear':
            crear();
            break;
        case 'modificar':
            modificar();
            break;
        case 'borrar':
            borrar();
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
        $obj->crear($nombre,$imagen,$valor);
        header("Location: ../mockups/basura/gestionbasura.php");
    }

    function modificar(){
        //echo 'Funcion modificar<br>';
        $id = $_GET['id'];
        $obj = new Basura_Con();
        $obj->modificar($id);
    }

    function borrar(){
        //echo 'Funcion borrar<br>';
        $id = $_GET['id'];
        $obj = new Basura_Con();
        $obj->borrar($id);
        header("Location: ../mockups/basura/gestionbasura.php");
    }
?>