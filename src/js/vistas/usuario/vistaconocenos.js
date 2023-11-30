import { Vistausuario } from './vistausuario.js'

/**
 * Clase encargada de la Vista "Conócenos", hereda de Vistausuario.
 * @class
 */
export class Vistaconocenos extends Vistausuario {

  /**
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @constructor
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor (controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
   * Asocia los eventos de la interfaz, en este caso, activa el modo oscuro.
   * @method
   */
  eventos () {
    super.modoOscuro()
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistaconocenos() }