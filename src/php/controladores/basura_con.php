<?php
    class Basura_Con{
        private $atributo;

        public function __construct(){
            $this->atributo = 'mostrar.php';
        }
        public function crear($nombre, $imagen, $valor){
            echo $nombre.' | '.$imagen.' | '.$valor;
        }
        public function modificar($id){
            echo 'id de la basura a modificar: '.$id;
        }
        public function borrar($id){
            echo 'id de la basura a borrar: '.$id;
        }
    }
?>