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
        $arrayBidimensional = [];
        $this->pagina = "Crear nivel"; 
        if(isset($_POST["nombre"]) && !empty($_POST["nombre"]) && isset($_POST["cantidadItems"]) && !empty($_POST["cantidadItems"]) && isset($_POST["velocidadBarco"]) && !empty($_POST["velocidadBarco"])
        && isset($_POST["contenido"]) && !empty($_POST["contenido"]) && isset($_POST["puntosHasta"]) && !empty($_POST["puntosHasta"]) && isset($_POST["tipo"]) && !empty($_POST["tipo"])) {
            
            $input1 = $_POST['contenido'];
            $input2 = $_POST['puntosHasta'];
            $input3 = $_POST['tipo'];

            // Iterar sobre los valores de input1 y construir el array bidimensional
            foreach ($input1 as $index => $value) {
                $arrayBidimensional[$index] = [
                    'contenido' => $input1[$index],
                    'puntosHasta' => isset($input2[$index]) ? $input2[$index] : null,
                    'tipo' => $input3[$index],
                ];
            }
            
            // Validar que el primer indice no esté vacío
            if (empty($arrayBidimensional[0]['contenido']) || empty($arrayBidimensional[0]['puntosHasta']) || empty($arrayBidimensional[0]['tipo'])) {
                header("Location: index.php?control=nivel_con&mensaje=false");
                exit();
            }

            $resultado = $this->obj->crear($_POST["nombre"],$_POST["cantidadItems"],$_POST["velocidadBarco"]);

            return $arrayBidimensional;
           /* if(!$resultado) {
                header("Location: index.php?control=nivel_con&mensaje=true");
            } else {
                header("Location: index.php?control=nivel_con&mensaje=false");
            }*/
        } else {
           /* header("Location: index.php?control=nivel_con&mensaje=false");*/
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
            $resultado = $this->obj->modificar($_GET["id"], $_POST["nombre"], $_POST["cantidadItems"], $_POST["velocidadBarco"]);
            if(!$resultado) {
                header("Location: index.php?control=nivel_con&mensaje=true");
            } else {
                header("Location: index.php?control=nivel_con&mensaje=false");
            }
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

    // MENSAJES DE LOS NIVELES
    public function mostrarMensajes() {
        $this->pagina = "Modificar nivel"; 
        $this->vista = 'modificarNivel';
        return $this->obj->mostrarMensajes($_GET["id"]);
    }

    public function borrarMensaje() {
        $this->vista = 'gestionnivel';
        $this->obj->borrarMensaje($_GET["id"]);
        header("Location: index.php?control=nivel_con&metodo=buscarModificar&id=".$_GET['idNivel']);
    }

    public function buscarMensaje() {
        $this->pagina = "Modificar mensaje"; 
        $this->vista = 'modificarMensaje';
        return $this->obj->buscarMensaje($_GET["id"]);
    }

    public function modificarMensaje() {
        if(isset($_GET["id"]) && isset($_POST["tipo"]) && isset($_POST["contenido"]) && isset($_POST["puntosHasta"]) && isset($_POST["nivel"]) && !empty($_GET["id"]) && !empty($_POST["tipo"]) && !empty($_POST["contenido"]) && !empty($_POST["puntosHasta"]) && !empty($_POST["nivel"])) {
            $this->obj->modificarMensaje($_GET["id"], $_POST["tipo"], $_POST["contenido"], $_POST["puntosHasta"], $_POST["nivel"]);
            header("Location: index.php?control=nivel_con&mensaje=true");
        } else {
            header("Location: index.php?control=nivel_con&mensaje=false");
        }
    }
}
?>