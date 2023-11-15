import {Vista} from './vista.js'

export class Vista5 extends Vista{

    constructor(controlador, base){
        super(controlador, base)
        this.crearInterfaz()
    }

    crearInterfaz(){
        //Coger referencias del interfaz
        this.btnVolverVista4= document.getElementById('volverAVista4')
        this.btnNivel1 = document.querySelectorAll('button')[0]
        this.btnNivel2 = document.querySelectorAll('button')[1]
        this.btnNivel3 = document.querySelectorAll('button')[2]

        //Asociar eventos
        this.btnVolverVista4.onclick = () => {
            this.controlador.verVista(Vista.VISTA4)
        }
        this.btnNivel1.onclick = () => {
            this.controlador.verVista(Vista.VISTA6)
        }
        this.btnNivel2.onclick = () => {
            this.controlador.verVista(Vista.VISTA6)
        }
        this.btnNivel3.onclick = () => {
            this.controlador.verVista(Vista.VISTA6)
        }
    }

}