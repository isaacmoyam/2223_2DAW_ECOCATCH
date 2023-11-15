import {Vista} from './vista.js'

export class Vista4 extends Vista{

    constructor(controlador, base){
        super(controlador, base)
        this.crearInterfaz()
    }

    crearInterfaz(){
        //Coger referencias del interfaz
        this.btnJugar = this.base.querySelectorAll('a')[3]
        this.btnVolverVista1= document.getElementsByClassName('volverAVista1')[2]

        //Asociar eventos
        this.btnJugar.onclick = () => {
            this.controlador.verVista(Vista.VISTA5)
        }
        this.btnVolverVista1.onclick = () =>{
            this.controlador.verVista(Vista.VISTA1)
        }
    }

}