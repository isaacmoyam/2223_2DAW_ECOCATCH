import { Vistaadmins } from '../administrador/vistaadmins.js'

/**
 * Clase encargada de la Vista 1 del administrador.
 * @extends VistaAdmins
 */
export class Vistamostrarbasura extends Vistaadmins {

  /**
   * Constructor de la clase. Inicializa los atributos correspondientes.
   * @param {ControladorUsuario} controlador - Controlador del Usuario.
   * @param {Object} base - Objeto que es una referencia del interfaz.
   */
  constructor(controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
   * Asocia los eventos de la interfaz de la vista 1 del administrador.
   * @returns {void}
   */
  eventos() {

    const botonesBorrar = document.querySelectorAll("#botonBorrar");

    botonesBorrar.forEach((boton) => {
      boton.addEventListener('click', (event) => super.emergenteBorrar(event));
    });
  }

  
}

window.onload = () => { new Vistamostrarbasura() }