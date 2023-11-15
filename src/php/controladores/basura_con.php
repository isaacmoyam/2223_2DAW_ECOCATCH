<?php
        class Basura_Con{
        private $atributo;

        public function __construct(){
            $this->atributo = 'mostrar.php';
        }
        public function crear($nombre, $imagen, $valor){
            //echo $nombre.' | '.$imagen.' | '.$valor;
            require (getcwd().'/php/modelos/basura_mod.php');
            require (getcwd().'/php/config/configdb.php');
            $obj = new Basura_Mod();

            $resultado = $obj->crear($nombre, $imagen, $valor);
            return $resultado;

        }
        public function modificar($id){
            echo 'id de la basura a modificar: '.$id;
            require (getcwd().'/php/modelos/basura_mod.php');
            require (getcwd().'/php/config/configdb.php');
            $obj = new Basura_Mod();

            $resultado = $obj->modificar($id);
            return $resultado;
        }
        public function borrar($id){
            echo 'id de la basura a borrar: '.$id;
            require (getcwd().'/php/modelos/basura_mod.php');
            require (getcwd().'/php/config/configdb.php');
            $obj = new Basura_Mod();

            $obj->borrar($id);
        }
        public function mostrar(){
            //echo 'llego al controlador';
            require ('../../src/php/modelos/basura_mod.php');
            require ('../../src/php/config/configdb.php');
            $obj = new Basura_Mod();
            
            $resultado = $obj->mostrar();
            return $resultado;
        }
    }
?>