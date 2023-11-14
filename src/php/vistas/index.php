<?php
    require '../controladores/basura_con.php';
    $control = $_GET['control'];
    $metodo = $_GET['metodo'];
    echo $control;

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
        echo 'Funcion crear<br>';
        $nombre = $_GET['nombre'];
        $imagen = $_GET['imagen'];
        $valor = $_GET['valor'];
        $obj = new Basura_Con();
        $obj->crear($nombre,$imagen,$valor);
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
    }
?>