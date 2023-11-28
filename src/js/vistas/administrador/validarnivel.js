import { VistaAdmin } from '../administrador/vistaAdmin.js'

/**
 * Clase encargada de la Vista 1 del administrador.
 * @extends VistaAdmin
 */
export class Validarnivel extends VistaAdmin {

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
    const itemsInput = document.querySelector('input[name="cantidadItems"]');
    const velocidadInput = document.querySelector('input[name="velocidadBarco"]');

    // Agregamos la validación del formulario al evento submit
    document.getElementById('formNivel').addEventListener('submit', (event) => {
      this.validarFormulario(event);
    });

    this.eventosComprobacion(mensaje, nombreInput, itemsInput, velocidadInput);
  }

  validarFormulario(event) {
    event.preventDefault();
  
    const nombreInput = document.querySelector('input[name="nombre"]');
    const itemsInput = document.querySelector('input[name="cantidadItems"]');
    const velocidadInput = document.querySelector('input[name="velocidadBarco"]');
    const formNivel = document.getElementById('formNivel')

    const nombre = nombreInput.value;
    const items = itemsInput.value;
    const velocidad = velocidadInput.value;

    let mensajeError = null;
    
    if (!nombre) {
        mensajeError = 'Por favor, rellena el campo nombre';
        this.mostrarMensajeError(nombreInput, mensajeError);
    }
    
    if (!items) {
        mensajeError = 'Por favor, rellena el campo items';
        this.mostrarMensajeError(itemsInput, mensajeError);
    }
    
    if (!velocidad) {
        mensajeError = 'Por favor, rellena el campo items';
        this.mostrarMensajeError(velocidadInput, mensajeError);
    }

    let urlForm = formNivel.action

    // Realiza la lógica de validación aquí
    if (this.validarNombre(nombre) && this.validarItems(items) && this.validarVelocidad(velocidad)) {
        formNivel.action = urlForm // Habilitar el botón
  
        // Envía el formulario al servidor
        document.getElementById('formNivel').submit();
    }
  }
  
  mostrarMensajeError(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje) {
      pMensaje.style.color = 'red';
      input.style.borderColor = 'red';
      pMensaje.innerHTML = mensaje;
    }
  }

  validarNombre(nombre) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/;
    return regExp.test(nombre);
  }

  validarItems(items) {
    // Agrega tu lógica de validación para el campo de items
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    return regExp.test(items);
  }

  eventosComprobacion (pMensaje, nombreInput, itemsInput, velocidadInput) {
    nombreInput.onblur = (evento) => this.comprobacionNombre(evento, pMensaje)
    itemsInput.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
    velocidadInput.onblur = (evento) => this.comprobacionValor(evento, pMensaje)
  }

  comprobacionNombre (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/
    let mensaje = "El nombre debe tener máximo 50 caracteres"
    this.validarCampo(evento, pMensaje, mensaje, regExp)
  }

  /**
     * LLama a una función encargada de comprobar si se valida el campo Valor mediante una expresión regular determinada.
     * Se ejecuta con un evento onblur en el campoNombre
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     */
  comprobacionValor (evento, pMensaje) {
    const regExp = /^(1?[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
    let mensaje = "Los valores numéricos deben ser un número entre 1 y 254"
    this.validarCampo(evento, pMensaje, mensaje, regExp)
  }

  /**
     *
     * @param evento {Object} Objeto de evento que desencadenó la llamada a la función.
     * @param pMensaje {Object} Objeto del lugar donde se va a introducir los mensajes necesarios
     * @param regExp {Object} Expresión Regular
     */
  validarCampo (evento, pMensaje, mensaje, regExp) {
    const input = evento.target 
    if (!regExp.test(input.value)) {
      this.mostrarMensajeError(input,mensaje)
    } else {
      input.style.borderColor = 'yellow'
      pMensaje.innerHTML = ""
    }
  }
}

window.onload = () => { new Validarnivel() }