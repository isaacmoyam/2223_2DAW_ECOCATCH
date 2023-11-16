import {Vista} from './vista.js'

export class Vista3 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        this.eventos()
    }

    eventos(){
        //Coger referencias del interfaz
        this.enlaceVolverVista1= document.getElementsByClassName('volverAVista1')[1]

        //Asociar eventos
        this.enlaceVolverVista1.onclick = () =>{
            this.controlador.verVista(Vista.VISTA1)
        }
    }

}