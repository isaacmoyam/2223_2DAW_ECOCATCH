import {Vista} from './vista.js'

export class Vista2 extends Vista{
	constructor(controlador, base){
		super(controlador, base)
		this.crearInterfaz()
	}
	crearInterfaz(){
		//Coger referencias del interfaz
		this.btnVolverVista1= document.getElementsByClassName('volverAVista1')[0]

		//Asociar eventos
		this.btnVolverVista1.onclick = () =>{
			this.controlador.verVista(Vista.VISTA1)
		}
	}

}
