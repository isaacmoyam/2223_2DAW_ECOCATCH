import { Vistaadmins } from '../administrador/vistaadmins.js'

/**
 * Clase encargada de la Vistaanadirbasura, hereda de Vistaadmins.
 * @extends Vistaadmins
 */
export class Vistaanadirbasura extends Vistaadmins {

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

  eventosComprobacionBasura (pMensaje, iNombre, iImagen, iValor, imagenMiniatura) {
    iImagen.addEventListener('change', (event) => this.mostrarMiniatura(event, imagenMiniatura))
    iNombre.onblur = (evento) => this.comprobacionNombreBasura(evento, pMensaje)
    iValor.onblur = (evento) => this.comprobacionValorBasura(evento, pMensaje)
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistaanadirbasura() }