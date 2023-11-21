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

    public $vista;
    public $obj;
    public $pagina;

    /**
     * Constructor de la clase Basura_Con.
     */
    public function __construct() {
        $this->pagina = "Gestión de basura";        
        $this->vista = 'gestionbasura';
        $this->obj = new Basura_Mod();
    }

    /**
     * Crea un nuevo registro de basura.
     *
     * @param string $nombre Nombre de la basura.
     * @param string $imagen Imagen asociada a la basura.
     * @param int    $valor  Valor/puntuación de la basura.
     *
     * @return mixed Mensaje de éxito o error.
     */
    public function crear() {
        $this->pagina = "Crear basura"; 
        if(isset($_POST["nombre"]) && !empty($_POST["nombre"]) && isset($_POST["valor"]) && !empty($_POST["valor"])) {
            $this->obj->crear($_POST["nombre"],$_POST["imagen"],$_POST["valor"]);
            header("Location: index.php?mensaje=true");
        } else {
            header("Location: index.php?mensaje=false");
        }
    }

    /**
     * Busca información de basura para modificar.
     *
     * @param int $id ID de la basura a modificar.
     *
     * @return mixed Información de la basura.
     */
    public function buscarModificar() { 
        $this->pagina = "Modificar basura"; 
        $this->vista = 'modificar';
        return $this->obj->buscarModificar($_GET["id"]);
    }

    /**
     * Modifica la información de una basura.
     *
     * @param int    $id     ID de la basura a modificar.
     * @param string $nombre Nuevo nombre de la basura.
     * @param string $imagen Nueva imagen asociada a la basura.
     * @param int    $valor  Nuevo valor/puntuación de la basura.
     *
     * @return mixed Mensaje de éxito o error.
     */
    public function modificar() {
        if(isset($_GET["id"]) && isset($_POST["nombre"]) && isset($_POST["valor"]) && !empty($_GET["id"]) && !empty($_POST["nombre"]) && !empty($_POST["valor"])) {
            $this->obj->modificar($_GET["id"], $_POST["nombre"], $_POST["imagen"], $_POST["valor"]);
            header("Location: index.php?mensaje=true");
        } else {
            header("Location: index.php?mensaje=false");
        }
    }

    /**
     * Borra una basura específica.
     *
     * @param int $id ID de la basura a borrar.
     *
     * @return mixed Mensaje de éxito o error.
     */
    public function borrar() {
        $this->obj->borrar($_GET["id"]);
    }

    /**
     * Muestra la información de todas las basuras.
     *
     * @return mixed Información de todas las basuras.
     */
    public function mostrar() {
        $this->pagina = "Gestión de basura"; 
        return $this->obj->mostrar();
    }
}
?>