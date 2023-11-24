<?php

/**
 * Controlador de las páginas de basura
 *
 * PHP version 8.2
 *
 * @category Controlador
 * @package  Basura
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

require_once 'php/modelos/basura_mod.php';

/**
 * Clase controladora para la gestión de basura.
 */
class Basura_con {

   /**
    * Vista actual que se mostrará en la página.
    * @var string
    */
    public $vista;
   /**
    * Objeto encargado de la conexión con el modelo de basura.
    * @var Basura_Mod
    */
    public $obj;
   /**
    * Título de la página.
    * @var string
    */
    public $pagina;

   /**
    * Constructor de la clase Basura_con.
    */
    public function __construct() {
        $this->pagina = "Gestión de basura";        
        $this->vista = 'gestionbasura';
        $this->obj = new Basura_Mod();
    }

   /**
    * Crea una nueva basura.
    */
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

   /**
    * Muestra la vista para crear basura.
    */
    public function vistaCrear() { 
        $this->pagina = "Crear basura"; 
        $this->vista = 'anadirBasura';
    }

   /**
    * Busca una basura para modificar y muestra la vista de modificación.
    * @return mixed
    */
    public function buscarModificar() { 
        $this->pagina = "Modificar basura"; 
        $this->vista = 'modificarBasura';
        return $this->obj->buscarModificar($_GET["id"]);
    }

   /**
    * Modifica una basura existente.
    */
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

   /**
    * Borra una basura con un ID específico.
    */
    public function borrar() {
        $this->obj->borrar($_GET["id"]);
    }

   /**
    * Muestra la gestión de basura con todas las basura.
    * @return mixed
    */
    public function mostrar() {
        $this->pagina = "Gestión de basura"; 
        return $this->obj->mostrar();
    }

   /**
    * Manda datos a través de AJAX.
    * @return mixed
    */
    public function ajax() {
        return $this->obj->ajax();
    }
}
?>