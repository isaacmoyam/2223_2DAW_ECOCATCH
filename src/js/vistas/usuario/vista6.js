import {Vista} from './vista.js'

export class Vista6 extends Vista{

    constructor(controlador, base){
        super(controlador, base)
        this.crearInterfaz()
    }

    crearInterfaz(){
        //Creacion del boton
        this.btnVerVista7 = document.createElement('button')
        this.base.appendChild(this.btnVerVista7)
        this.btnVerVista7.textContent = 'Siguiente'
        this.btnVerVista7.onclick = () => {
            this.controlador.verVista(Vista.VISTA7)
        }
    }

}