import {Vista} from './vista.js'

export class Vista6 extends Vista{

    constructor(controlador, base){
        super(controlador, base)
        this.eventos()
    }

    eventos(){
        //Coger referencias del interfaz
        console.log(this.base.querySelectorAll('a'))
        this.btnSiguienteVista7 = this.base.querySelectorAll('a')[0]

        //Asociar eventos
        this.btnSiguienteVista7.onclick = () => {
            this.controlador.verVista(Vista.VISTA7)
        }
    }

}