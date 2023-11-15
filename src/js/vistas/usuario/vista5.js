import {Vista} from './vista.js'

export class Vista5 extends Vista{

    constructor(controlador, base){
        super(controlador, base)
        this.crearInterfaz()
    }

    crearInterfaz(){
        //Creacion del boton
        this.btnVerVista6 = document.createElement('button')
        this.base.appendChild(this.btnVerVista6)
        this.btnVerVista6.textContent = 'Siguiente'
        this.btnVerVista6.onclick = () => {
            this.controlador.verVista(Vista.VISTA6)
        }
    }

}