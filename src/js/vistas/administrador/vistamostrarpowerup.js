import { Vistaadmins } from '../administrador/vistaadmins.js'

/**
 * Clase encargada de la Vistamostrarpowerup del administrador, hereda de Vistaadmins.
 * @extends Vistaadmins
 */
export class Vistamostrarpowerup extends Vistaadmins {

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
    const botonPorDefecto = document.querySelector("#botonPorDefecto");
    botonPorDefecto.addEventListener('click', (event) => this.emergentePorDefecto(event));
  }

  emergentePorDefecto(event) {
    event.preventDefault();

    const confirmacion = window.confirm("¿Estás seguro de que quieres reestablecer todos los elementos?");

    if (confirmacion) {
        let urlRedireccion = event.target.getAttribute("href");
        window.location.href = urlRedireccion;
    } else {
        // Si el usuario hace clic en "Cancelar", no hacemos nada.
    }
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistamostrarpowerup() }