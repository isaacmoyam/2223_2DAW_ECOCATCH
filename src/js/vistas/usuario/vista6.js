import { Vista } from './vista.js'

/**
 * Clase encargada de la Vista 6
 */
export class Vista6 extends Vista {
  /**
     * Constructor de la clase. Inicializa los atributos correspondientes
     * @param controlador {ControladorUsuario} Controlador del Usuario
     * @param base {Object} Objeto que es una referencia del interfaz
     */
  constructor (controlador, base) {
    super(controlador, base)
    this.x = 325 // Posición inicial en el eje X
    this.eventos()
  }

  /**
     * Método por el cual se obtienen las referencias de la interfaz y se le asocia eventos
     */
  eventos () {
    // Obtener la referencia del contenedor del juego
    this.eventoBarco()

    // Asociar el evento de cambio de vista
    this.enlaceSiguienteVista7 = this.base.querySelector('a')

    // Asociar eventos
    this.enlaceSiguienteVista7.onclick = () => {
      this.controlador.verVista(Vista.VISTA7)
    }
  }

  /**
     * Obtiene referencias de la interfaz y asocia los eventos relacionados con el barco
     */
  eventoBarco () {
    this.gameContainer = document.getElementById('gameContainer')

    // Obtener la referencia de la imagen del barco
    this.barco = document.querySelector('#gameContainer img')
    this.pNivel = document.getElementById('nivelSeleccionado')

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.x -= 8
      } else if (e.key === 'ArrowRight') {
        this.x += 8
      }

      // Actualizar la posición de la imagen con un movimiento más suave
      this.moveBarco(this.barco, this.x)
    })
  }

  /**
     * Hace que el barco se mueva de manera fluida
     * @param barco {Object} Objeto del elemento barco
     * @param x {Number}
     */
  moveBarco (barco, x) {
    // Utilizar setTimeout para crear un movimiento más suave
    setTimeout(() => {
      barco.style.left = x + 'px'
    }, 10)
  }

  /**
     * Muestra el nivel del juego escogido por el usuario y la vista 6
     * @param ver {Boolean} Indica si se muestra o no
     */
  mostrar (ver) {
    const nivel = this.controlador.getNivelJuego()
    this.pNivel.textContent = 'Nivel: ' + nivel
    super.mostrar(ver)
  }
}
