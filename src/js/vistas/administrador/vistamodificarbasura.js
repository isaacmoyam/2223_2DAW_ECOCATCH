import { Vistaadmin } from '../administrador/vistaadmin.js'

/**
 * Clase encargada de la Vista 1 del administrador.
 * @extends Vistaadmin
 */
export class Vistamodificarbasura extends Vistaadmin {

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

    const mensaje = document.getElementById('msgCampos');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const imagenInput = document.querySelector('input[name="imagen"]');
    const valorInput = document.querySelector('input[name="valor"]');
    const imagenMiniatura = document.getElementById('imagenMiniatura');

    // Agregamos la validación del formulario al evento submit
    document.getElementById('formBasura').addEventListener('submit', (event) => {
      super.validarFormularioBasura(event);
    });

    super.eventosComprobacionBasura(mensaje, nombreInput, imagenInput, valorInput, imagenMiniatura);
  }
}

window.onload = () => { new Vistamodificarbasura() }