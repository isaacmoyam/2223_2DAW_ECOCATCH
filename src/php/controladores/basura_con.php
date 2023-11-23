<?php
/**
 * Clase Basura_Con para la gestión de basura.
 *
 * PHP version 7.0
 *
 * @category Basura
 * @package  Basura_Con
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

require_once 'php/modelos/basura_mod.php';

class Basura_con {

    /* VARIABLES PÚBLICAS QUE CONTROLAN LA VISTA A MOSTRAR Y EL TÍTULO DE LA PÁGINA,
    ADEMÁS DE UN OBJETO QUE SE ENCARGA DE HACER LA CONEXIÓN CON EL MODELO */
    public $vista;
    public $obj;
    public $pagina;

   // CONSTRUCTOR DE LA CLASE
    public function __construct() {
        $this->pagina = "Gestión de basura";        
        $this->vista = 'gestionbasura';
        $this->obj = new Basura_Mod();
    }

    // BASURA

    // CREAR BASURA
    public function crear() {
        if(isset($_POST["nombre"]) && !empty($_POST["nombre"]) && isset($_POST["valor"]) && !empty($_POST["valor"])) {
            $resultado = $this->obj->crear($_POST["nombre"],$_POST["imagen"],$_POST["valor"]);
            if(!$resultado) {
                header("Location: index.php?control=basura_con&mensaje=true");
            } else {
                header("Location: index.php?control=basura_con&mensaje=false");
            }
        } else {
            header("Location: index.php?control=basura_con&mensaje=false");
        }

    }

    // MOVER A LA VISTA DE CREAR BASURA
    public function vistaCrear() { 
        $this->pagina = "Crear basura"; 
        $this->vista = 'anadir';
    }

    // MODIFICAR BASURA
    public function buscarModificar() { 
        $this->pagina = "Modificar basura"; 
        $this->vista = 'modificar';
        return $this->obj->buscarModificar($_GET["id"]);
    }

    // MODIFICAR BASURA
    public function modificar() {
        if(isset($_GET["id"]) && isset($_POST["nombre"]) && isset($_POST["valor"]) && !empty($_GET["id"]) && !empty($_POST["nombre"]) && !empty($_POST["valor"])) {
            $resultado = $this->obj->modificar($_GET["id"], $_POST["nombre"], $_POST["imagen"], $_POST["valor"]);
            if(!$resultado) {
                header("Location: index.php?control=basura_con&mensaje=true");
            } else {
                header("Location: index.php?control=basura_con&mensaje=false");
            }
        } else {
            header("Location: index.php?control=basura_con&mensaje=false");
        }
    }

   // BORRAR BASURA CON ID ESPECIFICO
    public function borrar() {
        $this->obj->borrar($_GET["id"]);
    }

    // MOSTRAR BASURA
    public function mostrar() {
        $this->pagina = "Gestión de basura"; 
        return $this->obj->mostrar();
    }

    // DATOS RECOGIDOS POR AJAX
    public function ajax() {
        return $this->obj->ajax();
    }
}
?>