<?php
        class Basura_Con{
        private $obj;
        private $host;
        private $username;
        private $passwd;
        private $bdname;

        public function __construct(){
            require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/modelos/basura_mod.php');
            require_once ($_SERVER['DOCUMENT_ROOT'].'/2223_2DAW_ECOCATCH/src/php/config/configdb.php');
            $this->host = HOST;
            $this->username = USERNAME;
            $this->passwd = PASSWD;
            $this->bdname = BDNAME;
            $this->obj = new Basura_Mod($this->host, $this->username, $this->passwd, $this->bdname);
        }
        public function crear($nombre, $imagen, $valor){
            //echo $nombre.' | '.$imagen.' | '.$valor;
            if($nombre === '' || $imagen === '' || $valor === ''){
                return 'Rellena todos los campos obligatorios(*)';
            }
            $resultado =$this->obj->crear($nombre, $imagen, $valor);
            return $resultado;

        }
        public function buscarModificar($id){
            //echo 'id de la basura a modificar: '.$id;
            $resultado = $this->obj->buscarModificar($id);
            return $resultado;
        }
        public function modificar($id, $nombre, $imagen, $valor){
            //echo $nombre.' | '.$imagen.' | '.$valor;
            $resultado = $this->obj->modificar($id, $nombre, $imagen, $valor);
            return $resultado;
            
        }
        public function borrar($id){
            //echo 'id de la basura a borrar: '.$id;
                $resultado = $this->obj->borrar($id);
            return $resultado;
            
        }
        public function mostrar(){
            //echo 'llego al controlador';
            $resultado = $this->obj->mostrar();
            return $resultado;
        }
    }
?>