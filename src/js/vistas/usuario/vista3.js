import {Vista} from './vista.js'

export class Vista3 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        this.eventos()
    }

    eventos(){
        //Coger referencias del interfaz
        this.btnVolverVista1= document.getElementsByClassName('volverAVista1')[1]

        //Asociar eventos
        this.btnVolverVista1.onclick = () =>{
            this.controlador.verVista(Vista.VISTA1)
        }
    }

}