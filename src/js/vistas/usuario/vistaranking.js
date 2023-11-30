import { Vistausuario } from './vistausuario.js'

/**
 * Clase encargada de la Vista 2
 */
export class Vistaranking extends Vistausuario {
  /**
	 * Constructor de la clase. Inicializa los atributos correspondientes
	 * @param controlador {ControladorUsuario} Controlador del Usuario
	 * @param base {Object} Objeto que es una referencia del interfaz
	 */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
	 * Asocia los eventos de la interfaz
	 */
  eventos () {
    super.modoOscuro()
  }
}

window.onload = () => { new Vistaranking() }