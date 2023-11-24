<?php
class Menu_con {

    /* VARIABLES PÚBLICAS QUE CONTROLAN LA VISTA A MOSTRAR Y EL TÍTULO DE LA PÁGINA */
    public $vista;
    public $pagina;

    // CONSTRUCTOR DE LA CLASE
    public function __construct() {
        $this->pagina = "Menú administrador";        
        $this->vista = 'menu';
    }
}
?>