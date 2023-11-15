import {Vista} from './vista.js'

export class Vista4 extends Vista{

    constructor(controlador, base){
        super(controlador, base)
        this.crearInterfaz()
    }

    crearInterfaz(){
        //Creacion del boton
        this.btnVerVista5 = document.createElement('button')
        this.base.appendChild(this.btnVerVista5)
        this.btnVerVista5.textContent = 'Siguiente'
        this.btnVerVista5.onclick = () => {
            this.controlador.verVista(Vista.VISTA5)
        }
    }

}