import {Vista} from './vista.js'

/**
 * Clase encargada de la Vista 3
 */
export class Vista3 extends Vista{
    /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
    constructor(controlador, base){
        super(controlador, base)
        this.eventos()
    }

    /**
     * Asocia los eventos de la interfaz
     */
    eventos(){
        //Coger referencias del interfaz
        this.enlaceVolverVista1= document.getElementsByClassName('volverAVista1')[1]

        //Asociar eventos
        this.enlaceVolverVista1.onclick = () =>{
            this.controlador.verVista(Vista.VISTA1)
        }
    }

}