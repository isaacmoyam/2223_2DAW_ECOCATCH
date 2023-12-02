<?php

/**
 * Controlador para las páginas de nivel
 *
 * PHP version 8.2
 *
 * @category Controlador
 * @package  Nivel
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */


require_once 'php/modelos/nivel_mod.php';

/**
 * Clase controladora para la gestión de niveles.
 */
class Nivel_con {

    /**
     * Vista actual que se mostrará en la página.
     * @var string
     */
    public $vista;
    /**
     * Objeto encargado de la conexión con el modelo de nivel.
     * @var Nivel_Mod
     */
    public $obj;
     /**
     * Título de la página.
     * @var string
     */
    public $pagina;

    /**
     * Constructor de la clase Nivel_con.
     */
    public function __construct() {
        $this->pagina = "Gestión de niveles";        
        $this->vista = 'gestionnivel';
        $this->obj = new Nivel_Mod();
    }

    /**
     * Crea un nuevo nivel con sus mensajes asociados.
     * @return array
     */
    public function crear() {
        $arrayBidimensional = [];
        $this->pagina = "Crear nivel"; 
        if(isset($_POST["nombre"]) && !empty($_POST["nombre"]) && isset($_POST["cantidadItems"]) && !empty($_POST["cantidadItems"]) && isset($_POST["velocidadBarco"]) && !empty($_POST["velocidadBarco"])
        && isset($_POST["contenido"]) && !empty($_POST["contenido"]) && isset($_POST["puntosHasta"]) && !empty($_POST["puntosHasta"]) && isset($_POST["tipo"]) && !empty($_POST["tipo"])) {
            
            $input1 = $_POST['contenido'];
            $input2 = $_POST['puntosHasta'];
            $input3 = $_POST['tipo'];

            // Iterar sobre los valores de input y construir el array bidimensional
            foreach ($input1 as $index => $value) {
                $arrayBidimensional[$index] = [
                    'contenido' => $input1[$index],
                    'puntosHasta' => isset($input2[$index]) ? $input2[$index] : null,
                    'tipo' => isset($input3[$index]) ? $input3[$index] : null,
                ];
            }

            // Validar que el primer indice no esté vacío
            if (empty($arrayBidimensional[0]['contenido']) || empty($arrayBidimensional[0]['puntosHasta']) || empty($arrayBidimensional[0]['tipo'])) {
                header("Location: index.php?control=nivel_con&mensaje=false");
                exit();
            }

            $idNivel = $this->obj->crear($_POST["nombre"],$_POST["cantidadItems"],$_POST["velocidadBarco"]);

            // Extraer valores para la función crearMensaje
            foreach ($arrayBidimensional as $mensaje) {
                $tipoMensaje = $mensaje['tipo'];
                $contenidoMensaje = $mensaje['contenido'];
                $puntosHastaMensaje = $mensaje['puntosHasta'];
    
                $this->obj->crearMensaje($tipoMensaje, $contenidoMensaje, $puntosHastaMensaje, $idNivel);
            }

            return $arrayBidimensional;

        } else {
           header("Location: index.php?control=nivel_con&mensaje=false");
        }
    }

    /**
     * Muestra la vista para crear un nivel.
     */
    public function vistaCrear() { 
        $this->pagina = "Crear nivel"; 
        $this->vista = 'anadirNivel';
    }

    /**
     * Busca un nivel para modificar y muestra la vista de modificación.
     * @return mixed
     */
    public function buscarModificar() { 
        $this->pagina = "Modificar nivel"; 
        $this->vista = 'modificarNivel';
        return $this->obj->buscarModificar($_GET["id"]);
    }

    /**
     * Modifica niveles y mensajes asociados.
     * @return array
     */
    public function modificarNivelMensaje() {
        $arrayBidimensional = [];
        $this->pagina = "Modificar nivel/mensaje"; 
        if(isset($_GET["id"]) && !empty($_GET["id"]) && isset($_POST["nombre"]) && !empty($_POST["nombre"]) && isset($_POST["cantidadItems"]) && !empty($_POST["cantidadItems"]) && isset($_POST["velocidadBarco"]) && !empty($_POST["velocidadBarco"])
        && isset($_POST["contenido"]) && !empty($_POST["contenido"]) && isset($_POST["puntosHasta"]) && !empty($_POST["puntosHasta"]) && isset($_POST["tipo"]) && !empty($_POST["tipo"])) {
            
            $input1 = $_POST['contenido'];
            $input2 = $_POST['puntosHasta'];
            $input3 = $_POST['tipo'];

            if(isset($_POST['idMsg'])) {
               $input4 = $_POST['idMsg']; 
            } else {
                $input4 = null;
            }
            
            // Iterar sobre los valores de input y construir el array bidimensional 
            foreach ($input1 as $index => $value) {
                $arrayBidimensional[$index] = [
                    'contenido' => $input1[$index],
                    'puntosHasta' => isset($input2[$index]) ? $input2[$index] : null,
                    'tipo' => isset($input3[$index]) ? $input3[$index] : null,
                    'idMsg' => isset($input4[$index]) ? $input4[$index] : null,
                ];
            }


            $this->obj->modificar($_GET["id"],$_POST["nombre"],$_POST["cantidadItems"],$_POST["velocidadBarco"]);

            // Extraer valores para la función modificarNivelMensaje
            foreach ($arrayBidimensional as $mensaje) {
                $tipoMensaje = $mensaje['tipo'];
                $contenidoMensaje = $mensaje['contenido'];
                $puntosHastaMensaje = $mensaje['puntosHasta'];
                $idMsg = $mensaje['idMsg'];

                if ($idMsg === null) {
                    $this->obj->crearMensaje($tipoMensaje, $contenidoMensaje, $puntosHastaMensaje, $_GET["id"]);
                } else {
                    $this->obj->modificarNivelMensaje($tipoMensaje, $contenidoMensaje, $puntosHastaMensaje, $idMsg);
                }
            }
            return $arrayBidimensional;

        } else {
           header("Location: index.php?control=nivel_con&mensaje=false");
        }
    }

    /**
     * Borra un nivel con un ID específico.
     */
    public function borrar() {
        $this->obj->borrar($_GET["id"]);
    }

    /**
     * Muestra la gestión de niveles.
     * @return mixed
     */
    public function mostrar() {
        $this->pagina = "Gestión de niveles"; 
        return $this->obj->mostrar();
    }

    /**
     * Muestra los mensajes asociados a un nivel.
     * @return mixed
     */
    public function mostrarMensajes() {
        $this->pagina = "Modificar nivel"; 
        $this->vista = 'modificarNivel';
        return $this->obj->mostrarMensajes($_GET["id"]);
    }

    /**
     * Borra un mensaje asociado a un nivel.
     */
    public function borrarMensaje() {
        $this->vista = 'gestionnivel';
        $this->obj->borrarMensaje($_GET["id"]);
        header("Location: index.php?control=nivel_con&metodo=buscarModificar&id=".$_GET['idNivel']);
    }

    /**
     * Busca un mensaje para modificar.
     * @return mixed
     */
    public function buscarMensaje() {
        $this->pagina = "Modificar mensaje"; 
        $this->vista = 'modificarMensaje';
        return $this->obj->buscarMensaje($_GET["id"]);
    }

    /**
     * Mueve un mensaje a otro nivel.
     */
    public function moverMensaje() {
        if(isset($_GET["id"]) && isset($_POST["nivel"]) && !empty($_GET["id"]) && !empty($_POST["nivel"])) {
            $this->obj->moverMensaje($_GET["id"], $_POST["nivel"]);
            header("Location: index.php?control=nivel_con&mensaje=true");
        } else {
            header("Location: index.php?control=nivel_con&mensaje=false");
        }
    }

    /**
     * Manda los datos de nivel a través de AJAX.
     * @return mixed
     */
    public function ajaxNivel() {
        return $this->obj->ajaxDatosNivel();
    }

    /**
     * Manda todos los mensajes que tiene un nivel determinado.
     * @return mixed
     */
    public function ajaxMensajesNivel() {
        return $this->obj->ajaxMensajesNiveles($_POST["parametros"]);
    }

    /**
     * Manda los datos de los nombres de los niveles a través de AJAX.
     * @return mixed
     */
    /*PENDIENTE DE SER QUITADO
    public function ajaxNombreNivel() {
        return $this->obj->ajaxNombreNiveles();
    }*/
}
?>