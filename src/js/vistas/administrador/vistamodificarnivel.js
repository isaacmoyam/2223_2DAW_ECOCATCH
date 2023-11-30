import { Vistaadmins } from '../administrador/vistaadmins.js'

/**
 * Clase encargada de la Vistamodificarnivel del administrador, hereda de Vistaadmins.
 * @extends Vistaadmins
 */
export class Vistamodificarnivel extends Vistaadmins {

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
   * Asocia los eventos de la interfaz de la vistamodificarnivel del administrador.
   * @method
   * @returns {void}
   */
  eventos() {

    const botonesBorrar = document.querySelectorAll("#botonBorrar");

    const btnAgregarFila = document.getElementById('btnAgregarFila');

    const mensaje = document.getElementById('msgCampos');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const itemsInput = document.querySelector('input[name="cantidadItems"]');
    const velocidadInput = document.querySelector('input[name="velocidadBarco"]');
    const contenidoInput = document.querySelector('input[name="contenido[]"]');
    const puntosInput = document.querySelector('input[name="puntosHasta[]"]');

    // Para que no se puedan borrar mensajes si solo hay uno en la tabla
    if (botonesBorrar.length === 1) {
      botonesBorrar[0].addEventListener('click', (event) => {
        event.preventDefault(); // Evitar la redirección
        mensaje.innerHTML = "El nivel debe tener al menos un mensaje"
        mensaje.style.color = "red"
      });
    } else {
      // Botones para borrar filas añadidas
      botonesBorrar.forEach((boton) => {
        mensaje.innerHTML = ""
        boton.addEventListener('click', (event) => super.emergenteBorrar(event));
      });
    }

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
window.onload = () => { new Vistamodificarnivel() }