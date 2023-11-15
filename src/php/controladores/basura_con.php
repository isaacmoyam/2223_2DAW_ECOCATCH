<?php
        class Basura_Con{
        private $atributo;

        public function __construct(){
            $this->atributo = 'mostrar.php';
        }
        public function crear($nombre, $imagen, $valor){
            //echo $nombre.' | '.$imagen.' | '.$valor;
            require_once (getcwd().'/php/modelos/basura_mod.php');
            require_once (getcwd().'/php/config/configdb.php');
            $obj = new Basura_Mod($host, $username, $passwd, $bdname);

            $resultado = $obj->crear($nombre, $imagen, $valor);
            return $resultado;

        }
        public function modificar($id){
            //echo 'id de la basura a modificar: '.$id;
            require_once ($_SERVER['DOCUMENT_ROOT'] . '/basura_mod.php');
            require_once (getcwd().'/php/config/configdb.php');
            $obj = new Basura_Mod($host, $username, $passwd, $bdname);

            $resultado = $obj->buscarModificar($id);
            return $resultado;
        }
        public function borrar($id){
            //echo 'id de la basura a borrar: '.$id;
            require_once ('/2223_2DAW_ECOCATCH/src/php/modelos/basura_mod.php');
            require_once (getcwd().'/php/config/configdb.php');
            $obj = new Basura_Mod($host, $username, $passwd, $bdname);

            $obj->borrar($id);
        }
        public function mostrar(){
            //echo 'llego al controlador';
            require ('../../src/php/modelos/basura_mod.php');
            require ('../../src/php/config/configdb.php');
            $obj = new Basura_Mod($host, $username, $passwd, $bdname);
            
            $resultado = $obj->mostrar();
            return $resultado;
        }
    }
?>