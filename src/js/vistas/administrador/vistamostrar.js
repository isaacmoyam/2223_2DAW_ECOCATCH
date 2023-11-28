import { VistaAdmin } from '../administrador/vistaAdmin.js'

/**
 * Clase encargada de la Vista 1 del administrador.
 * @extends VistaAdmin
 */
export class Vistamostrar extends VistaAdmin {

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
      boton.addEventListener('click', (event) => this.emergenteBorrar(event));
    });
  }

  emergenteBorrar(event) {
    event.preventDefault();

    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar el elemento?");

    if (confirmacion) {
        let urlRedireccion = event.target.getAttribute("href");
        window.location.href = urlRedireccion;
    } else {
        // Si el usuario hace clic en "Cancelar", no hacemos nada.
    }
  }
}

window.onload = () => { new Vistamostrar() }