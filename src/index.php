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

/**
 * Función para crear una nueva basura.
 *
 * @return void
 */
function crear()
{
    $nombre = $_POST['nombre'];
    $imagen = $_POST['imagen'];
    $valor = $_POST['valor'];
    $obj = new Basura_Con();
    $resultado = $obj->crear($nombre, $imagen, $valor);
    if ($resultado === false) {
        header("Location: ../mockups/basura/gestionbasura.php?mensaje=false");
    } else {
        header("Location: ../mockups/basura/gestionbasura.php?mensaje=true");
    }
}

/**
 * Función para borrar una basura.
 *
 * @return void
 */
function borrar()
{
    $id = $_GET['id'];
    $obj = new Basura_Con();
    $resultado = $obj->borrar($id);
    if ($resultado === false) {
        header("Location: ../mockups/basura/gestionbasura.php?mensaje=false");
    } else {
        header("Location: ../mockups/basura/gestionbasura.php?mensaje=true");
    }
}

/**
 * Función para buscar y obtener información de una basura para modificar.
 *
 * @return mixed Arreglo asociativo con la información de la basura o nulo.
 */
function buscarModificar()
{
    $id = $_GET['id'];
    $obj = new Basura_Con();
    $fila = $obj->buscarModificar($id);
    return $fila;
}

/**
 * Función para modificar una basura existente.
 *
 * @return void
 */
function modificar()
{
    $id = $_GET['id'];
    $nombre = $_POST['nombre'];
    $imagen = $_POST['imagen'];
    $valor = $_POST['valor'];
    $obj = new Basura_Con();
    $resultado = $obj->modificar($id, $nombre, $imagen, $valor);
    if ($resultado === false) {
        header("Location: ../mockups/basura/gestionbasura.php?mensaje=false");
    } else {
        header("Location: ../mockups/basura/gestionbasura.php?mensaje=true");
    }
}
?>