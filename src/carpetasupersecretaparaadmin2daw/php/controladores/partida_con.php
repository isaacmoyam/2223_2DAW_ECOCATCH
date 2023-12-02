<?php

/**
 * Controlador de partida
 *
 *
 * @category Controlador
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

require_once 'php/modelos/partida_mod.php';

/**
 * Clase controladora para la gestión de partida.
 */
class Partida_con
{

    /**
     * Vista actual que se mostrará en la página.
     * @var string
     */
    public $vista;
    /**
     * Objeto encargado de la conexión con el modelo de partida.
     * @var Partida_Mod
     */
    public $obj;
    /**
     * Título de la página.
     * @var string
     */
    public $pagina;

    /**
     * Constructor de la clase Partida_con.
     */
    public function __construct()
    {
        $this->pagina = "Gestión de Partida"; //Titulo que tiene la pagina inicial
        $this->vista = ''; //Nombre de la vista inicial
        $this->obj = new Partida_Mod();
    }

    /**
     * Manda los datos de partida a través de AJAX.
     * @return mixed
     */
    public function ajaxPartida() {
        return $this->obj->ajaxDatosPartida();
    }

    /**
     * Recibe los datos de la partida y los inserta en la base de datos.
     * @return mixed
     */
    public function ajaxAnadirPartida() {
        $this->obj->insertarPartida($_POST["nombre"], $_POST["correo"], $_POST["puntuacion"], $_POST["idNivel"]);
    }
}