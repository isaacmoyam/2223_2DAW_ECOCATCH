<?php

/**
 * Controlador de poweup
 *
 *
 * @category Controlador
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

require_once 'php/modelos/powerup_mod.php';

/**
* Clase controladora para la gestión de powerup.
 */
class Powerup_con
{

    /**
     * Vista actual que se mostrará en la página.
     * @var string
     */
    public $vista;
    /**
     * Objeto encargado de la conexión con el modelo de powerup.
     * @var Powerup_Mod
     */
    public $obj;
    /**
     * Título de la página.
     * @var string
     */
    public $pagina;

    /**
     * Constructor de la clase Powerup_con.
     */
    public function __construct()
    {
        $this->pagina = "Gestión de powerup"; //Titulo que tiene la pagina inicial
        $this->vista = 'gestion_powerup'; //Nombre de la vista inicial
        $this->obj = new Powerup_Mod();
    }

    /**
     * Muestra la gestión de powerup con la informacion necesaria.
     * @return mixed
     */
    public function mostrar() {
        $this->pagina = "Gestión de powerup";  //Titulo de la página
        return $this->obj->mostrar();
    }

    /**
     * Busca un powerup para modificar y muestra la vista de modificación.
     * @return mixed
     */
    public function buscarModificar() {
        $this->pagina = "Modificar powerup";
        $this->vista = 'modificar_powerup';
        return $this->obj->buscarModificar($_GET["id"]);
    }

    /**
     * Modifica un powerup existente.
     */
    public function modificar() {
        /*
         * Controla si existen o estan vacios los diferentes campos.
         * Si algun campo esta vacio o no existe no se hará la consulta y mostrara un mensaje por pantalla.
         * El campo descripcion no se comprueba si está empty dado que dicho campo admite nulos en la base de datos.
         * Con strlen($_POST["descripcion"]) <= 300 verifico que la variable descripcion tenga como maximo 300 caracteres.
         * Con strlen($_POST["nombre"]) <= 20 compruebo que el nombre no sea mayor de 20
         * Con $_POST["aumento"] <= 255 verifico que el numero introducido en aumento sea menor o igual que 255
         * Con $_POST["aumento"] > 0 verifico que el numero introducido en aumento sea mayor que 0
         * Si esta todo correcto se realiza la consulta. Si se ha introducido un dato incorrecto mostrara un mensaje dado que no puede hacer la consulta
         *  */
        if(
            isset($_GET["id"]) && isset($_POST["nombre"]) && isset($_POST["aumento"]) && isset($_POST["descripcion"]) && isset($_FILES['imagen']['tmp_name'])
            && !empty($_GET["id"]) && !empty($_POST["nombre"]) && !empty($_POST["aumento"]) && !empty($_FILES['imagen']['tmp_name'])
                && strlen($_POST["descripcion"]) <= 300 && strlen($_POST["nombre"]) <= 20
            && $_POST["aumento"] > 0 && $_POST["aumento"] <= 255
        ) {
            $imgEnBinario = file_get_contents($_FILES['imagen']['tmp_name']); //Obtiene el contenido de la imagen, el cual esta en binario

            $extensionPermitida = 'png';
            $infoArchivo = pathinfo($_FILES['imagen']['name']);
            $extensionArchivo = strtolower($infoArchivo['extension']); //Obtiene la extension del archivo introducido para compararla

            if ($extensionArchivo == $extensionPermitida) {
                $imgCodificada = base64_encode($imgEnBinario); //Convierte los datos de textos binarios como una imagen en cadenas de texto para que se pueda almacenar la cadena de texto

                $resultado = $this->obj->modificar($_GET["id"], $_POST["nombre"], $imgCodificada, $_POST["aumento"], $_POST["descripcion"]);
                /*
                 * La funcion modificar solo devuelve true al ocurrir un error en el query.
                 * Si no hay error la funcion devuelve null por lo que la condicion !resultado la da como verdadera
                 * */
                if(!$resultado) {
                    header("Location: index.php?control=powerup_con&mensaje=true");
                } else {
                    header("Location: index.php?control=powerup_con&mensaje=false");
                }
            } else{
                header("Location: index.php?control=powerup_con&mensaje=false");
            }
        } else {
            header("Location: index.php?control=powerup_con&mensaje=false");
        }
    }

    /**/
    public function restarurarValoresPowerup(){
        $rutaImagenPorDefecto = __DIR__ .'/../../../img/Default/velocidad1.png';

        $imagenPorDefecto = file_get_contents($rutaImagenPorDefecto);  //Obtiene el contenido
        $imagenCodificada = base64_encode($imagenPorDefecto); //Convierte los datos de textos binarios como una imagen en cadenas de texto para que se pueda almacenar la cadena de texto

        $this->obj->valoresPorDefecto($imagenCodificada);
    }

    /**
     * Manda los datos de powerup a través de AJAX.
     * @return mixed
     */
    public function ajaxPowerup() {
        return $this->obj->ajaxDatosPowerup();
    }
}