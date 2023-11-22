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

require_once 'php/modelos/nivel_mod.php';

class Nivel_con {

    public $vista;
    public $obj;
    public $pagina;

    /**
     * Constructor de la clase Basura_Con.
     */
    public function __construct() {
        $this->pagina = "Gestión de niveles";        
        $this->vista = 'gestionnivel';
        $this->obj = new Nivel_Mod();
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
        $this->pagina = "Crear nivel"; 
        if(isset($_POST["nombre"]) && !empty($_POST["nombre"]) && isset($_POST["cantidadItems"]) && !empty($_POST["cantidadItems"]) && isset($_POST["velocidadBarco"]) && !empty($_POST["velocidadBarco"])) {
            $this->obj->crear($_POST["nombre"],$_POST["cantidadItems"],$_POST["velocidadBarco"]);
            header("Location: index.php?control=nivel_con&mensaje=true");
        } else {
            header("Location: index.php?control=nivel_con&mensaje=false");
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
        $this->pagina = "Modificar nivel"; 
        $this->vista = 'modificarNivel';
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
        if(isset($_GET["id"]) && isset($_POST["nombre"]) && isset($_POST["cantidadItems"]) && isset($_POST["velocidadBarco"]) && !empty($_GET["id"]) && !empty($_POST["nombre"]) && !empty($_POST["cantidadItems"]) && !empty($_POST["velocidadBarco"])) {
            $this->obj->modificar($_GET["id"], $_POST["nombre"], $_POST["cantidadItems"], $_POST["velocidadBarco"]);
            header("Location: index.php?control=nivel_con&mensaje=true");
        } else {
            header("Location: index.php?control=nivel_con&mensaje=false");
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
        $this->pagina = "Gestión de niveles"; 
        return $this->obj->mostrar();
    }

    public function mostrarMensajes() {
        $this->pagina = "Modificar nivel"; 
        $this->vista = 'modificarNivel';
        return $this->obj->mostrarMensajes($_GET["id"]);
    }
}
?>