<?php
/**
 * Controlador principal para la gestión de basura.
 *
 * PHP version 7.0
 *
 * @category EcoCatch
 * @package  Gestion_Basura_Controlador
 * @author   EquipoA
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/config/configdb.php');
require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/modelos/db.php');

$nombreControl = $_GET['control']."_Con";
$nombreMetodo = $_GET['metodo'];

if(!isset($_GET["control"])) $_GET["control"] = constant("CONTROLADOR_DEFAULT");
if(!isset($_GET["metodo"])) $_GET["metodo"] = constant("METODO_DEFAULT");

$directorioControlador = 'php/controladores/'.$nombreControl.'_con.php';

// Comprobar si el controlador existe
if(!file_exists($directorioControlador)) $directorioControlador = 'php/controladores/'.constant("CONTROLADOR_DEFAULT").'_con.php';

// Cargar controlador
require_once $directorioControlador;
$controlador = new $nombreControl();

/* Ver si el método está definido */
$datosVista["datos"] = array();
if (method_exists($controlador, $_GET["metodo"])) 
    $datosVista["datos"] = $controlador->{$_GET["metodo"]}();

/* Cargar vistas */
require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/vistas/templates/header.php');
require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/mockups/basura/'.$controlador->vista.'.php');
require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/vistas/templates/footer.php');
?>