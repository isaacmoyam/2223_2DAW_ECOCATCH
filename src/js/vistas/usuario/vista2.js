import {Vista} from './vista.js'

export class Vista2 extends Vista{
	constructor(controlador, base){
		super(controlador, base)
		this.crearInterfaz()
	}
	crearInterfaz(){
		//Botón
		this.btnVerVista3 = document.createElement('button')
		this.base.appendChild(this.btnVerVista3)
		this.btnVerVista3.textContent = 'Púlsame'
		this.btnVerVista3.onclick = () => {
			this.controlador.verVista(Vista.VISTA3)
		}
		/*
		//Párrafo con las vidas
		this.pVidas = document.createElement('p')
		this.base.appendChild(this.pVidas)*/
	}
	/*
	mostrar(ver){
		let vidas = this.controlador.getVidas()
		this.pVidas.textContent = 'Tienes ' + vidas + ' vidas.'
		super.mostrar(ver)
	}*/
}
