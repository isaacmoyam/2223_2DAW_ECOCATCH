import { Vistausuario } from './vistausuario.js'
import { Rest } from '../../servicios/rest.js'

/**
 * Clase encargada de la Vista del formulario ranking
 */
export class Vistaformranking extends Vistausuario {
  /**
   * Constructor de la clase. Inicializa los atributos correspondientes
   * @param controlador {ControladorUsuario} Controlador del Usuario
   * @param base {Object} Objeto que es una referencia del interfaz
   */
  #puntos = localStorage.getItem('puntuacionFinal')

  constructor (controlador, base) {
    super(controlador, base)
    this.eventos()
  }

  /**
   * Método encargado de asociar los eventos a las referencias de la interfaz de la vista 7
   */
  eventos() {
    super.modoOscuro()
    
    // Coger referencias del interfaz
    let iNick, iCorreo, puntuacion, idNivel

    const mensaje = document.getElementById("msgCampos")

    iNick = document.querySelectorAll('input')[0]
    iCorreo = document.querySelectorAll('input')[1]
    puntuacion = document.getElementById("puntos")
    this.idNivel = localStorage.getItem('id')

    // Insertar puntuación
    puntuacion.innerHTML = this.#puntos

    document.getElementById('formRanking').addEventListener('submit', (event) => {
      this.validarFormularioRanking(event);
    });

    this.eventosComprobacionRanking(mensaje, iNick, iCorreo);
  }

  /**
   * Realiza una llamada POST para mandar datos de la partida.
   * @returns {void}
   */
  llamarPOST = () => {
    Rest.postForm(
      '../../../src/carpetasupersecretaparaadmin2daw/index.php?control=partida_con&metodo=ajaxAnadirPartida',
      { 'nombre': this.nick, 'correo': this.correo, 'puntuacion': this.#puntos, 'idNivel': this.idNivel });
  }

  validarFormularioRanking(event) {
    event.preventDefault();
  
    const nickInput = document.querySelector('input[name="nick"]');
    const correoInput = document.querySelector('input[name="correo"]');
    const formRanking = document.getElementById('formRanking')

    let mensajeError = null;
    
    if (!nickInput.value) {
      mensajeError = 'Por favor, rellena el campo nick';
      this.mostrarMensajeErrorRanking(nickInput, mensajeError);
    }
    
    if (!correoInput.value) {
      mensajeError = 'Por favor, rellena el campo correo';
      this.mostrarMensajeErrorRanking(correoInput, mensajeError);
    }

    let urlForm = formRanking.action

    // Realiza la lógica de validación aquí
    if (this.validarNick(nickInput.value) && this.validarCorreo(correoInput.value)) {
      // Envía el formulario al servidor
      formRanking.action = urlForm
      this.nick = nickInput.value
      this.correo = correoInput.value
      this.llamarPOST()
      this.nick = ""
      this.correo = ""
      document.getElementById('formRanking').submit();
    }
  }

  eventosComprobacionRanking (pMensaje, iNick, iCorreo) {
    iNick.onblur = (evento) => this.comprobacionNick(evento, pMensaje)
    iCorreo.onblur = (evento) => this.comprobacionCorreo(evento, pMensaje)
  }

  validarNick(nick) {
    // Agrega tu lógica de validación para el campo de nombre
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/
    return regExp.test(nick);
  }

  validarCorreo(correo) {
    // Agrega tu lógica de validación para el campo de nombre
    if (correo.trim() === "") {
      return false;
  }
    const regExp = /^(|.*\w{1,61}(\.guadalupe)?@((gmail\.com)|(alumnado\.fundacionloyola\.(net|es))|(fundacionloyola\.(net|es))))$/
    return regExp.test(correo);
  }

  comprobacionNick (evento, pMensaje) {
    const regExp = /^[A-z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]{1,50}$/
    let mensaje = "El nick debe tener máximo 50 caracteres y no tener espacios"
    this.validarCampoRanking(evento, pMensaje, mensaje, regExp)
  }

  comprobacionCorreo (evento, pMensaje) {
    const regExp = /^(\w{1,61}(\.guadalupe)?@((gmail\.com)|(alumnado\.fundacionloyola\.(net|es))|(fundacionloyola\.(net|es))))?$/
    let mensaje = "El correo debe ser válido"
    this.validarCampoRanking(evento, pMensaje, mensaje, regExp)
  }

  validarCampoRanking (evento, pMensaje, mensaje, regExp) {
    const input = evento.target 
    if (!regExp.test(input.value) || input.value.trim() === "") {
      this.mostrarMensajeErrorRanking(input,mensaje)
    } else {
      input.style.borderColor = 'yellow'
      pMensaje.innerHTML = ""
    }
  }

  mostrarMensajeErrorRanking(input, mensaje) {
    const pMensaje = document.getElementById('msgCampos'); // Reemplaza con el ID real de tu elemento
    if (pMensaje) {
      pMensaje.style.color = 'red';
      input.style.borderColor = 'red';
    }
    pMensaje.innerHTML = mensaje;
  }
}
window.onload = () => { new Vistaformranking() }
