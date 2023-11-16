import {Vista} from './vista.js'

export class Vista4 extends Vista{

    constructor(controlador, base){
        super(controlador, base)
        this.crearInterfaz()
    }

    crearInterfaz(){
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