<?php

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
        $this->vista = 'gestionPowerup'; //Nombre de la vista inicial
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
        $this->vista = 'modificarPowerup';
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
         * Si esta todo correcto se realiza la consulta. Si se ha introducido un dato incorrecto mostrara un mensaje dado que no puede hacer la consulta
         *  */
        if(isset($_GET["id"]) && isset($_POST["nombre"]) && isset($_POST["aumento"]) && isset($_POST["descripcion"]) && !empty($_GET["id"]) && !empty($_POST["nombre"]) && !empty($_POST["aumento"])) {
            $resultado = $this->obj->modificar($_GET["id"], $_POST["nombre"], $_POST["imagen"], $_POST["aumento"], $_POST["descripcion"]);
            if(!$resultado) {
                header("Location: index.php?control=powerup_con&mensaje=true");
            } else {
                header("Location: index.php?control=powerup_con&mensaje=false");
            }
        } else {
            header("Location: index.php?control=powerup_con&mensaje=false");
        }
    }
}