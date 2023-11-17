import { Vista } from './vista.js'

/**
 * Clase encargada de la Vista 2
 */
export class Vista2 extends Vista {
  /**
	 * Constructor de la clase. Inicializa los atributos correspondientes
	 * @param controlador {ControladorUsuario} Controlador del Usuario
	 * @param base {Object} Objeto que es una referencia del interfaz
	 */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventosInterfaz()
  }

  /**
	 * Asocia los eventos de la interfaz
	 */
  eventosInterfaz () {
    // Coger referencias del interfaz
    this.enlaceVolverVista1 = document.getElementsByClassName('volverAVista1')[0]

    // Asociar eventos
    this.enlaceVolverVista1.onclick = () => {
      this.controlador.verVista(Vista.VISTA1)
    }
  }
}
