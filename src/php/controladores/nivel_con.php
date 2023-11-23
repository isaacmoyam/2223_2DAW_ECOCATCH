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

    /* VARIABLES PÚBLICAS QUE CONTROLAN LA VISTA A MOSTRAR Y EL TÍTULO DE LA PÁGINA,
    ADEMÁS DE UN OBJETO QUE SE ENCARGA DE HACER LA CONEXIÓN CON EL MODELO */
    public $vista;
    public $obj;
    public $pagina;

    // CONSTRUCTOR DE LA CLASE
    public function __construct() {
        $this->pagina = "Gestión de niveles";        
        $this->vista = 'gestionnivel';
        $this->obj = new Nivel_Mod();
    }

    // NIVELES

    // CREAR NIVEL CON SU MENSAJE/MENSAJES
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

    // MOVER A LA VISTA DE CREAR NIVEL
    public function vistaCrear() { 
        $this->pagina = "Crear nivel"; 
        $this->vista = 'anadirNivel';
    }

    // BUSCAR UN NIVEL
    public function buscarModificar() { 
        $this->pagina = "Modificar nivel"; 
        $this->vista = 'modificarNivel';
        return $this->obj->buscarModificar($_GET["id"]);
    }

   // MODIFICAR NIVEL
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

    // MODIFICAR NIVEL/NIVELES DE MENSAJE
    public function modificarNivelMensaje() {
        $arrayBidimensional = [];
        $this->pagina = "Modificar nivel/mensaje"; 
        if(isset($_GET["id"]) && !empty($_GET["id"]) && isset($_POST["idMsg"]) && !empty($_POST["idMsg"]) && isset($_POST["nombre"]) && !empty($_POST["nombre"]) && isset($_POST["cantidadItems"]) && !empty($_POST["cantidadItems"]) && isset($_POST["velocidadBarco"]) && !empty($_POST["velocidadBarco"])
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

            $this->obj->modificar($_GET["id"],$_POST["nombre"],$_POST["cantidadItems"],$_POST["velocidadBarco"]);

            // Extraer valores para la función crearMensaje
            foreach ($arrayBidimensional as $mensaje) {
                $tipoMensaje = $mensaje['tipo'];
                $contenidoMensaje = $mensaje['contenido'];
                $puntosHastaMensaje = $mensaje['puntosHasta'];
    
                $this->obj->modificarNivelMensaje($tipoMensaje, $contenidoMensaje, $puntosHastaMensaje, $_POST["idMsg"]);
            }

            return $arrayBidimensional;

        } else {
           header("Location: index.php?control=nivel_con&mensaje=false");
        }
    }

   // BORRAR NIVEL
    public function borrar() {
        $this->obj->borrar($_GET["id"]);
    }

    // MOSTRAR NIVELES
    public function mostrar() {
        $this->pagina = "Gestión de niveles"; 
        return $this->obj->mostrar();
    }

    // MENSAJES DE LOS NIVELES

    // MOSTRAR NIVELES DE LOS MENSAJES
    public function mostrarMensajes() {
        $this->pagina = "Modificar nivel"; 
        $this->vista = 'modificarNivel';
        return $this->obj->mostrarMensajes($_GET["id"]);
    }

    // BORRAR MENSAJE
    public function borrarMensaje() {
        $this->vista = 'gestionnivel';
        $this->obj->borrarMensaje($_GET["id"]);
        header("Location: index.php?control=nivel_con&metodo=buscarModificar&id=".$_GET['idNivel']);
    }

    // BUSCAR MENSAJE
    public function buscarMensaje() {
        $this->pagina = "Modificar mensaje"; 
        $this->vista = 'modificarMensaje';
        return $this->obj->buscarMensaje($_GET["id"]);
    }

    // MOVER MENSAJE
    public function moverMensaje() {
        if(isset($_GET["id"]) && isset($_POST["nivel"]) && !empty($_GET["id"]) && !empty($_POST["nivel"])) {
            $this->obj->moverMensaje($_GET["id"], $_POST["nivel"]);
            header("Location: index.php?control=nivel_con&mensaje=true");
        } else {
            header("Location: index.php?control=nivel_con&mensaje=false");
        }
    }
}
?>