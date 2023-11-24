import { Vista } from './vista.js'

/**
 * Clase encargada de la Vista 5
 */
export class Vista5 extends Vista {
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
    if (!this.enlaceVolverVista4) {return}
    this.enlaceVolverVista4 = document.getElementById('volverAVista4')
    this.btnNivel1 = document.querySelectorAll('button')[0]
    this.btnNivel2 = document.querySelectorAll('button')[1]
    this.btnNivel3 = document.querySelectorAll('button')[2]

    // Asociar eventos
    this.enlaceVolverVista4.onclick = () => {
      this.controlador.verVista(Vista.VISTA4)
    }
    this.btnNivel1.onclick = () => {
      this.controlador.setNivelJuego(1)
      this.controlador.verVista(Vista.VISTA6)
    }
    this.btnNivel2.onclick = () => {
      this.controlador.setNivelJuego(2)
      this.controlador.verVista(Vista.VISTA6)
    }
    this.btnNivel3.onclick = () => {
      this.controlador.setNivelJuego(3)
      this.controlador.verVista(Vista.VISTA6)
    }
  }
}
