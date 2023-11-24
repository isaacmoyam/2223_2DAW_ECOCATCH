<?php 

/**
 * Creación del objeto conexión con la base de datos
 *
 * PHP version 7.0
 *
 * @category Conexión
 * @package  ConexionBD
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

require_once 'php/config/configdb.php';

/**
 * Clase para gestionar la conexión a la base de datos.
 */
class Db {

	/**
     * Dirección del host de la base de datos.
     * @var string
     */
	private $host;

	/**
     * Nombre de la base de datos.
     * @var string
     */
	private $bdname;

	/**
     * Nombre de usuario para la conexión a la base de datos.
     * @var string
     */
	private $usuario;

	/**
     * Contraseña para la conexión a la base de datos.
     * @var string
     */
	private $passwd;

	/**
     * Instancia de la conexión a la base de datos.
     * @var mysqli
     */
	public $mysqli;

	/**
     * Constructor de la clase Db.
     */
	public function __construct() {		

		$this->host = constant('HOST');
		$this->bdname = constant('BDNAME');
		$this->usuario = constant('USERNAME');
		$this->passwd = constant('PASSWD');

		$this->mysqli = new mysqli($this->host, $this->usuario, $this->passwd, $this->bdname);

        if ($this->mysqli->connect_error) {
            die("Error de conexión: " . $this->mysqli->connect_error);
        }

		$this->mysqli->set_charset("utf8");
	}
}

?>