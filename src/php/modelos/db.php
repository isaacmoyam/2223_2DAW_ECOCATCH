<?php 

require_once 'php/config/configdb.php';

class Db {

	private $host;
	private $bdname;
	private $usuario;
	private $passwd;
	public $mysqli;

	public function __construct() {		

		$this->host = constant('HOST');
		$this->bdname = constant('BDNAME');
		$this->usuario = constant('USERNAME');
		$this->passwd = constant('PASSWD');

		$this->mysqli = new mysqli($this->host, $this->usuario, $this->passwd, $this->bdname);

        if ($this->mysqli->connect_error) {
            die("Error de conexión: " . $this->mysqli->connect_error);
        }
	}
}

?>