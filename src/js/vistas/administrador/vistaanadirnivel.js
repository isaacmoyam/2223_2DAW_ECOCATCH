import { Vistaadmins } from '../administrador/vistaadmins.js'

/**
 * Clase encargada de la Vistaanadirnivel, hereda de Vistaadmins.
 * @extends Vistaadmins
 */
export class Vistaanadirnivel extends Vistaadmins {

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

    const btnAgregarFila = document.getElementById('btnAgregarFila');

    const mensaje = document.getElementById('msgCampos');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const itemsInput = document.querySelector('input[name="cantidadItems"]');
    const velocidadInput = document.querySelector('input[name="velocidadBarco"]');
    const contenidoInput = document.querySelector('input[name="contenido[]"]');
    const puntosInput = document.querySelector('input[name="puntosHasta[]"]');

    // Agregar filas a la tabla dinámica
    if (!btnAgregarFila){}
    else
      btnAgregarFila.addEventListener('click', () => super.agregarFila());

    // Agregamos la validación del formulario al evento submit
    document.getElementById('formNivel').addEventListener('submit', (event) => {
      super.validarFormularioNivel(event);
    });

    super.eventosComprobacionNivel(mensaje, nombreInput, itemsInput, velocidadInput, contenidoInput, puntosInput);
  }
}

/**
 * Se ejecuta cuando la ventana ha cargado completamente.
 */
window.onload = () => { new Vistaanadirnivel() }