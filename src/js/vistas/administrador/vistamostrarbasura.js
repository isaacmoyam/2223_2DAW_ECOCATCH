import { Vistaadmins } from '../administrador/vistaadmins.js'

/**
 * Clase encargada de la Vistamostrarbasura del administrador, hereda de Vistaadmins.
 * @extends Vistaadmins
 */
export class Vistamostrarbasura extends Vistaadmins {

  /**
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @constructor
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor(controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
   * Asocia los eventos de la interfaz de la vista 1 del administrador.
   * @method
   * @returns {void}
   */
  eventos() {

    const botonesBorrar = document.querySelectorAll("#botonBorrar");

    botonesBorrar.forEach((boton) => {
      boton.addEventListener('click', (event) => super.emergenteBorrar(event));
    });
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistamostrarbasura() }