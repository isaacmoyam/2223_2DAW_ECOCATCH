<?php
    require 'basura.php';
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
            echo 'No he entrado en ninguno';
            break;
    }

    function crear(){
        return 'Funcion crear';
    }

    function modificar(){
        return 'Funcion modificar';
    }

    function borrar(){
        return 'Funcion borrar';
    }
?>