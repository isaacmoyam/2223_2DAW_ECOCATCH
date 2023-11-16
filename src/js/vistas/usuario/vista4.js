import {Vista} from './vista.js'

/**
 * Clase encargada de la Vista 4
 */
export class Vista4 extends Vista{

    /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
    constructor(controlador, base){
        super(controlador, base)
        this.eventosInterfaz()
    }

    /**
     * Obtiene las referencias de la interfaz y les asocia eventos
     */
    eventosInterfaz(){
        //Coger referencias del interfaz
        this.enlaceJugar = this.base.querySelectorAll('a')[3]
        this.enlaceVolverVista1= document.getElementsByClassName('volverAVista1')[2]

        //Asociar eventos
        this.enlaceJugar.onclick = () => {
            this.controlador.verVista(Vista.VISTA5)
        }
        this.enlaceVolverVista1.onclick = () =>{
            this.controlador.verVista(Vista.VISTA1)
        }
    }

}