import { VistaAdmin } from '../vistas/administrador/vistaAdmin.js'
import { Vista1 } from '../vistas/administrador/vista1.js'
import { Vista2 } from '../vistas/administrador/vista2.js'
/**
 * Clase controlador del usuario. Se encarga de controlar las vistas del usuario.
 * @class
 */
document.addEventListener('DOMContentLoaded', function () {

  /**
   * Controlador para las vistas del administrador.
   * @class
   */
  class ControladorAdmin {

      /**
       * Mapa que almacena las instancias de las vistas.
       * @type {Map<Symbol, Vista>}
       */
      vistas = new Map()

      /**
       * Constructor de la clase ControladorAdmin.
       * @constructor
       * @returns {void}
       */
      constructor() {
          // ... (código omitido para mayor claridad)

          this.vistas.set(VistaAdmin.VISTA1, new Vista1(this, divVista1))
          this.vistas.set(VistaAdmin.VISTA2, new Vista2(this, divVista2))

          this.verVista(VistaAdmin.VISTA1)

          // Agregamos la validación del formulario al evento submit
          document.getElementById('formBasura').addEventListener('submit', (event) => {
              this.validarFormulario(event)
          })

          this.eventosComprobacion(mensaje, nombreInput, imagenInput, valorInput, btnAnadirBasura, imagenMiniatura)
      }

      /**
       * Agrega una nueva fila a la tabla dinámica.
       * @returns {void}
       */
      agregarFila() {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Elimina una fila de la tabla dinámica.
       * @param {HTMLTableRowElement} fila - Fila a eliminar.
       * @returns {void}
       */
      quitarFila(fila) {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Valida el formulario antes de enviarlo al servidor.
       * @param {Event} event - Objeto de evento asociado al envío del formulario.
       * @returns {void}
       */
      validarFormulario(event) {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Muestra un mensaje de error en el campo especificado.
       * @param {HTMLInputElement} input - Campo de entrada.
       * @param {string} mensaje - Mensaje de error.
       * @returns {void}
       */
      mostrarMensajeError(input, mensaje) {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Muestra un mensaje de éxito en el campo especificado.
       * @param {HTMLInputElement} input - Campo de entrada.
       * @returns {void}
       */
      mostrarMensajeExito(input) {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Valida el campo de nombre con una expresión regular.
       * @param {Event} evento - Objeto de evento asociado al campo de nombre.
       * @param {HTMLParagraphElement} pMensaje - Elemento para mostrar mensajes.
       * @returns {void}
       */
      comprobacionNombre(evento, pMensaje) {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Valida el campo de valor con una expresión regular.
       * @param {Event} evento - Objeto de evento asociado al campo de valor.
       * @param {HTMLParagraphElement} pMensaje - Elemento para mostrar mensajes.
       * @returns {void}
       */
      comprobacionValor(evento, pMensaje) {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Muestra la imagen en miniatura seleccionada en el input type="file".
       * @param {Event} event - Objeto de evento asociado a la selección de la imagen.
       * @param {HTMLImageElement} imagenMiniatura - Elemento de imagen en miniatura.
       * @returns {void}
       */
      mostrarMiniatura(event, imagenMiniatura) {
          // ... (código omitido para mayor claridad)
      }

      // ... (código omitido para mayor claridad)

      /**
       * Muestra una vista específica.
       * @param {Symbol} vista - Símbolo que identifica a la vista.
       * @returns {void}
       */
      verVista(vista) {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Oculta todas las vistas.
       * @returns {void}
       */
      ocultarVistas() {
          // ... (código omitido para mayor claridad)
      }

      /**
       * Asocia eventos a los objetos pasados por parámetro.
       * @param {Object} pMensaje - Objeto del lugar donde se introducirán los mensajes necesarios.
       * @param {Object} iNombre - Objeto correspondiente al campo nombre.
       * @param {Object} iImagen - Objeto correspondiente al campo de la imagen.
       * @param {Object} iValor - Objeto correspondiente al campo valor.
       * @param {Object} btnAnadirBasura - Objeto correspondiente al botón de añadir basura.
       * @param {Object} imagenMiniatura - Objeto de la imagen en miniatura.
       * @returns {void}
       */
      eventosComprobacion(pMensaje, iNombre, iImagen, iValor, btnAnadirBasura, imagenMiniatura) {
          // ... (código omitido para mayor claridad)
      }

      // ... (código omitido para mayor claridad)
  }

  /**
   * Evento que se ejecuta cuando la ventana ha cargado completamente.
   */
  window.onload = () => { new ControladorAdmin() }
})