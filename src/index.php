<?php
/**
 * Archivo principal de enrutamiento y ejecución del framework.
 *
 * Este archivo maneja la carga de controladores, la ejecución de métodos y la carga de vistas.
 *
 * @package Index
 */
require_once 'php/config/configdb.php';
require_once 'php/modelos/db.php';

// Verificación de parámetro 'mensaje' en la URL para mostrar mensajes.
$mensaje = "";

if(isset($_GET['mensaje'])) {
    if ($_GET['mensaje'] === "false") {
        $mensaje = 'Algo ha salido mal';
    } else {
        $mensaje = 'Todo ha salido correctamente';
    }
}

$nombreControl = constant("CONTROLADOR_DEFAULT");
$nombreMetodo = constant("METODO_DEFAULT");

if(isset($_GET["control"])) $nombreControl = $_GET["control"];
if(isset($_GET["metodo"])) $nombreMetodo = $_GET["metodo"];

$directorioControlador = 'php/controladores/'.$nombreControl.'.php';

// Comprobar si el controlador existe
if(!file_exists($directorioControlador))
    $directorioControlador = 'php/controladores/'.constant("CONTROLADOR_DEFAULT").'.php';

// Cargar controlador
require_once $directorioControlador;

// Poner la primera letra del nombre del controlador en mayúscula para referir a la clase y crear el objeto controlador
$nombreClase = ucfirst($nombreControl);
$controlador = new $nombreClase();

/* Ver si el método está definido */
$datosVista["datos"] = array();
if (method_exists($controlador, $nombreMetodo)) {
    if($nombreMetodo == "ajax"){
        echo $controlador->{$nombreMetodo}();
        return;
    } else {
        $datosVista["datos"] = $controlador->{$nombreMetodo}();
    }
}
   
/* Cargar vistas */
require_once 'php/vistas/templates/header.php';
require_once 'php/vistas/'.$controlador->vista.'.php';
require_once 'php/vistas/templates/footer.php';
?>