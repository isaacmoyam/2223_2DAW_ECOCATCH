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
     * Constructor de la clase Powerup_con.
     */
    public function __construct()
    {
        $this->pagina = "Gestión de powerup";
        $this->vista = 'gestionPowerup';
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

}