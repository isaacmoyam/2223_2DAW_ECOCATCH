<?php
/**
 * Controlador del menú administrador
 *
 * PHP version 7.0
 *
 * @category Controlador
 * @package  Menu
 * @author   Equipo A
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

/**
 * Clase controladora para el menú de administrador.
 */
class Menu_con {

    /**
     * Vista actual que se mostrará en la página.
     * @var string
     */
    public $vista;
    /**
     * Título de la página.
     * @var string
     */
    public $pagina;

    /**
     * Constructor de la clase Menu_con.
     */
    public function __construct() {
        $this->pagina = "Menú administrador";        
        $this->vista = 'menu';
    }
}
?>