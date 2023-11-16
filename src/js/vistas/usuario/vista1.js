import {Vista} from './vista.js'

/**
 * Clase encargada de la Vista 1
 */
export class Vista1 extends Vista{
	/**
	 * Constructor de la clase. Inicializa los atributos correspondientes
	 * @param controlador {ControladorUsuario} Controlador del Usuario
	 * @param base {Object} Objeto que es una referencia del interfaz
	 */
	constructor(controlador, base){
		super(controlador, base)
		this.eventos()
	}

	/**
	 * Método por el cual se obtienen las referencias de la interfaz y se le asocia eventos
	 */
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

	/**
	 * Método que gestiona que vista se muestra según el numero de vista introducido
	 * @param numVista {Number} Número de Vista, posibles valores: 2, 3 y 4
	 */
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
