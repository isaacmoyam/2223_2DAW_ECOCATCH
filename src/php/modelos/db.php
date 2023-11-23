<?php 

require_once 'php/config/configdb.php';

class Db {

	// DATOS DE CONEXIÓN
	private $host;
	private $bdname;
	private $usuario;
	private $passwd;
	public $mysqli;

	// CONSTRUCTOR DE LA CLASE
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