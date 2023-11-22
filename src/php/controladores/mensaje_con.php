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

require_once 'php/modelos/mensaje_mod.php';

class Mensaje_con {

    public $vista;
    public $obj;
    public $pagina;

    /**
     * Constructor de la clase Basura_Con.
     */
    public function __construct() {
        $this->pagina = "Gestión de mensajes";    
        $this->vista = 'gestionnivel';
        $this->obj = new Mensaje_Mod();
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
        $this->pagina = "Crear mensaje"; 
        if(isset($_POST["tipo"]) && !empty($_POST["tipo"]) && isset($_POST["contenido"]) && !empty($_POST["contenido"]) && isset($_POST["puntosHasta"]) && !empty($_POST["puntosHasta"]) && isset($_POST["idNivel"]) && !empty($_POST["idNivel"])) {
            $this->obj->crear($_POST["tipo"], $_POST["contenido"], $_POST["puntosHasta"], $_POST["idNivel"]);
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
        $this->pagina = "Modificar mensaje"; 
        $this->vista = 'modificarMensaje';
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
        if( isset($_POST["id"]) && !empty($_POST["id"]) && isset($_POST["tipo"]) && !empty($_POST["tipo"]) && isset($_POST["contenido"]) && !empty($_POST["contenido"]) && isset($_POST["puntosHasta"]) && !empty($_POST["puntosHasta"]) && isset($_POST["idNivel"]) && !empty($_POST["idNivel"])) {
            $this->obj->modificar($_GET["id"], $_POST["tipo"], $_POST["contenido"], $_POST["puntosHasta"], $_POST["idNivel"]);
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

}
?>