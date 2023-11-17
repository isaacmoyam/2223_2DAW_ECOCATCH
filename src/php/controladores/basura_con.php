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

class Basura_Con
{
    private $obj;
    private $host;
    private $username;
    private $passwd;
    private $bdname;

    /**
     * Constructor de la clase Basura_Con.
     */
    public function __construct()
    {
        require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/modelos/basura_mod.php');
        require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/config/configdb.php');
        $this->host = HOST;
        $this->username = USERNAME;
        $this->passwd = PASSWD;
        $this->bdname = BDNAME;
        $this->obj = new Basura_Mod($this->host, $this->username, $this->passwd, $this->bdname);
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
    public function crear($nombre, $imagen, $valor)
    {
        if ($nombre === '' || $imagen === '' || $valor === '') {
            return 'Rellena todos los campos obligatorios(*)';
        }
        $resultado = $this->obj->crear($nombre, $imagen, $valor);
        return $resultado;
    }

    /**
     * Busca información de basura para modificar.
     *
     * @param int $id ID de la basura a modificar.
     *
     * @return mixed Información de la basura.
     */
    public function buscarModificar($id)
    {
        $resultado = $this->obj->buscarModificar($id);
        return $resultado;
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
    public function modificar($id, $nombre, $imagen, $valor)
    {
        $resultado = $this->obj->modificar($id, $nombre, $imagen, $valor);
        return $resultado;
    }

    /**
     * Borra una basura específica.
     *
     * @param int $id ID de la basura a borrar.
     *
     * @return mixed Mensaje de éxito o error.
     */
    public function borrar($id)
    {
        $resultado = $this->obj->borrar($id);
        return $resultado;
    }

    /**
     * Muestra la información de todas las basuras.
     *
     * @return mixed Información de todas las basuras.
     */
    public function mostrar()
    {
        $resultado = $this->obj->mostrar();
        return $resultado;
    }
}
?>