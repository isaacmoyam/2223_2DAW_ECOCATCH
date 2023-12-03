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
     * Modifica los valores de la tabla powerup segun los datos introducidos por el usuario.
     */
    public function modificar() {
        /*
         * Controla si existen o estan vacios los diferentes campos.
         * Si algun campo esta vacio o no existe no se hará la consulta y mostrara un mensaje por pantalla.
         * El campo descripcion no se comprueba si está empty dado que dicho campo admite nulos en la base de datos.
         * Con strlen($descripciones[$index]) <= 300 verifico que la variable descripcion tenga como maximo 300 caracteres.
         * Con strlen($nombres[$index]) <= 20 compruebo que un nombre no sea mayor de 20
         * Con $nombres[$index] != "" verifico que un nombre no sea vacio
         * Con $aumentos[$index] <= 255 verifico que el numero introducido en aumento sea menor o igual que 255
         * Con $aumentos[$index] > 0 verifico que el numero introducido en aumento sea mayor que 0
         * Con trim($nombres[$index]) != "" Realizo la funcion trim para quitar espacios vacios y comparo si el resultado es una cadena vacia
         * Si esta todo correcto se realiza la consulta. Si se ha introducido un dato incorrecto mostrara un mensaje dado que no puede hacer la consulta
         *  */
        if(
            isset($_POST["id"]) && isset($_POST["nombre"]) && isset($_POST["aumento"]) && isset($_POST["descripcion"]) && isset($_FILES['imagen']['tmp_name'])
            && !empty($_POST["id"]) && !empty($_POST["nombre"]) && !empty($_POST["aumento"]) && !empty($_FILES['imagen']['tmp_name'])

        ) {
            $ids = $_POST["id"];
            $nombres = $_POST["nombre"];
            $aumentos = $_POST["aumento"];
            $descripciones = $_POST["descripcion"];
            $imagenes = $_FILES['imagen']['tmp_name'];
            $imagenesActuales = $_POST['imagen_actual'];

            // Itera sobre las filas del formulario
            foreach ($ids as $index => $id) {
                if (!empty($imagenes[$index])) {
                    //Se ha introducido una nueva imagen en el input type file
                    $imgEnBinario = file_get_contents($imagenes[$index]);
                    //Convierte los datos de textos binarios como una imagen en cadenas de texto para que se pueda almacenar la cadena de texto
                    $imgCodificada = base64_encode($imgEnBinario);

                    //Verifica la extensión del archivo
                    $infoArchivo = pathinfo($_FILES['imagen']['name'][$index]);
                    $extensionArchivo = strtolower($infoArchivo['extension']);
                } else {
                    //No se ha intoducido una nueva imagen, utiliza la imagen actual guardada en la base de datos
                    $imgEnBinario = $imagenesActuales[$index];

                    //Como esta imagen es cogida de la bd ya se hizo el base64_encode al ser subida por lo que ahora no lo necesita
                    $imgCodificada = $imgEnBinario;

                    $extensionArchivo = 'png';
                    //como esta imagen ha sido cogida de la bd pongo $extensionArchivo = 'png'para que pase el if
                }

                $extensionPermitida = 'png'; //Extension permitida
                $imgTamMax = 16 * 1024 * 1024; //Tamaño maximo medium blob
                //Verificaciones
                if (
                    $extensionArchivo == $extensionPermitida && strlen($imgCodificada) <= $imgTamMax
                    && strlen($nombres[$index]) <= 20 && trim($nombres[$index]) != ""
                    && strlen($descripciones[$index]) <= 300
                    && is_numeric($aumentos[$index]) && $aumentos[$index] > 0 && $aumentos[$index] <= 255
                ) {
                    //Si descripcion es un conjunto de caracteres vacios quito dichos espacios en blanco
                    if (trim($descripciones[$index]) == ""){
                        $descripciones[$index] = trim($descripciones[$index]);
                    }
                    //Se han cumplido las verificaciones. Llamo al metodo modificar del modelo
                    $resultado = $this->obj->modificar(
                        $id,
                        $nombres[$index],
                        $imgCodificada,
                        $aumentos[$index],
                        $descripciones[$index]
                    );
                } else{
                    //No se han cumplido las verificaciones
                    header("Location: index.php?control=powerup_con&mensaje=false");
                }
            }
        } else {
            header("Location: index.php?control=powerup_con&mensaje=false");
        }
    }

    /**
     * Restaura los valores de powerup a unos valores por defecto.
     */
    public function restarurarValoresPowerup(){
        $rutaImagenPorDefecto = __DIR__ .'/../../../img/Default/velocidad1.png';

        $imagenPorDefecto = file_get_contents($rutaImagenPorDefecto);  //Obtiene el contenido
        //Convierte los datos de textos binarios como una imagen en cadenas de texto para que se pueda almacenar la cadena de texto
        $imagenCodificada = base64_encode($imagenPorDefecto);

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