import {Vista} from './vista.js'

export class Vista1 extends Vista{
	constructor(controlador, base){
		super(controlador, base)
		this.eventos()
	}

	eventos(){
		//Coger referencias del interfaz
		this.enlaceEmpezarPartida = this.base.querySelectorAll('a')[0]
		this.enlaceRanking = this.base.querySelectorAll('a')[1]
		this.enlaceConocenos = this.base.querySelectorAll('a')[2]

		//Asociar eventos
		this.enlaceEmpezarPartida.onclick = () => this.pulsarEnlace(4)
		this.enlaceRanking.onclick = () => this.pulsarEnlace(3)
		this.enlaceConocenos.onclick = () => this.pulsarEnlace(2)
	}

	pulsarEnlace(numVista){
		switch (numVista) {
			case 4:
				this.controlador.verVista(Vista.VISTA4)
				break
			case 2:
				this.controlador.verVista(Vista.VISTA2)
				break
			case 3:
				this.controlador.verVista(Vista.VISTA3)
				break
		}
	}
}